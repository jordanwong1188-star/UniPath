// No network, AI provider, camera or microphone is used by these tests.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");

function loader(mocks = {}, globals = {}) {
  const cache = new Map();
  function load(file) {
    file = path.resolve(root, file);
    if (cache.has(file)) return cache.get(file).exports;
    const source = fs.readFileSync(file, "utf8");
    const compiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
      fileName: file,
    }).outputText;
    const module = { exports: {} };
    cache.set(file, module);
    function localRequire(id) {
      if (id in mocks) return mocks[id];
      if (id.startsWith("@/") || id.startsWith(".")) {
        const base = id.startsWith("@/") ? path.join(root, id.slice(2)) : path.resolve(path.dirname(file), id);
        const resolved = [base, base + ".ts", base + ".tsx"].find(p => fs.existsSync(p) && fs.statSync(p).isFile());
        return load(resolved);
      }
      return require(id);
    }
    vm.runInNewContext(compiled, { module, exports: module.exports, require: localRequire, console, Response,
      fetch: () => { throw new Error("Network calls are forbidden in offline tests"); }, ...globals }, { filename: file });
    return module.exports;
  }
  return load;
}
const load = loader();
const { applicationProfiles: profiles } = load("data/applicationProfiles.ts");
const { getApplicationRubric, getRubricScale } = load("data/applicationRubrics.ts");
const { supportsVideoInterview } = load("app/components/VideoInterviewSimulator.tsx");

test("all 86 practice profiles have distinct IDs, questions and HTTPS evidence", () => {
  assert.equal(profiles.length, 86);
  assert.equal(new Set(profiles.map(p => p.id)).size, profiles.length);
  for (const p of profiles) {
    assert.ok(p.source.startsWith("https://"), p.id);
    assert.ok(p.practice.written.questions.length, p.id);
    assert.ok(getApplicationRubric(p).criteria.length, p.id);
    if (supportsVideoInterview(p.id)) assert.ok(p.practice.video.questions.length, p.id);
  }
});

test("Queen's written/video rubric separation and timing", () => {
  const p = profiles.find(p => p.id === "queens-commerce");
  assert.equal(p.practice.written.seconds, 600);
  assert.equal(p.practice.written.limit, 335);
  assert.equal(p.practice.video.prepSeconds, 120);
  assert.equal(p.practice.video.responseSeconds, 120);
  assert.equal(getRubricScale(p)[0].label, "Developing");
  assert.equal(getRubricScale(p)[1].label, "Basic");
  assert.ok(getApplicationRubric(p, "written").criteria.some(c => c.name === "Problem-solving"));
  assert.ok(!getApplicationRubric(p, "written").criteria.some(c => c.name.includes("teamwork")));
  assert.ok(getApplicationRubric(p, "video").criteria.some(c => c.name.includes("teamwork")));
});

test("previously missing interviews and McMaster written timing", () => {
  for (const id of ["waterloo-software-engineering", "mcmaster-engineering", "mcmaster-computer-science", "mcmaster-ibiomed", "mcmaster-btech"]) {
    assert.ok(supportsVideoInterview(id), id);
    const p = profiles.find(p => p.id === id);
    if (id.startsWith("mcmaster")) {
      assert.equal(p.practice.written.seconds, 600);
      assert.equal(p.practice.video.responseSeconds, 120);
      assert.equal(p.practice.video.prepSeconds, null);
      assert.match(p.timerAccuracy, /conflicting/);
    }
  }
  assert.equal(supportsVideoInterview("ubc-arts"), false);
});

test("AI routes and checkout fail closed without any network call", async () => {
  const routes = loader({ "next/server": { NextResponse: Response } });
  for (const file of ["app/api/application-feedback/route.ts", "app/api/chat/route.ts", "app/api/stripe/checkout/route.ts"]) {
    const route = routes(file);
    const response = await route.POST(); // No request body or configured credentials needed.
    assert.equal(response.status, 503, file);
    assert.match((await response.json()).error, /paused/);
  }
  const status = await routes("app/api/application-feedback/route.ts").GET();
  assert.equal((await status.json()).enabled, false);
});

test("one writing editor, independent preparation notes, no paid client actions", () => {
  const hub = fs.readFileSync(path.join(root, "app/components/ApplicationHub.tsx"), "utf8");
  assert.ok(!hub.includes("Draft workspace"));
  assert.ok(!hub.includes("useState(500)"));
  assert.ok(hub.includes('value={prepNotes}'));
  assert.ok(hub.includes('prompt.trim() || activeQuestion'));
  assert.ok(hub.includes("!AI_AVAILABLE || !draft.trim()"));
  assert.ok(hub.includes("Restore a saved browser-local draft"));
  const page = fs.readFileSync(path.join(root, "app/applications/[id]/page.tsx"), "utf8");
  assert.ok(page.includes("if (!selected) notFound()"));
});

function recorderHarness() {
  let cursor = 0;
  const slots = [], pending = [];
  let stoppedTracks = 0, blobId = 0;
  const tracks = [{ readyState: "live", stop() { stoppedTracks++; this.readyState = "ended"; } }];
  const stream = { getTracks: () => tracks };
  const React = {
    useState(initial) {
      const i = cursor++;
      if (!(i in slots)) slots[i] = typeof initial === "function" ? initial() : initial;
      return [slots[i], next => { slots[i] = typeof next === "function" ? next(slots[i]) : next; }];
    },
    useRef(initial) { const i = cursor++; return slots[i] ??= { current: initial }; },
    useMemo(fn) { return fn(); },
    useEffect(fn, deps) {
      const i = cursor++, prev = slots[i];
      if (!prev || deps.some((v, j) => !Object.is(v, prev.deps[j]))) {
        pending.push(() => { prev?.cleanup?.(); slots[i] = { deps, cleanup: fn() }; });
      }
    },
  };
  class Recorder {
    state = "inactive"; mimeType = "video/webm";
    start() { this.state = "recording"; }
    stop() { this.state = "inactive"; Promise.resolve().then(() => this.onstop?.()); }
  }
  const localLoad = loader({ react: React }, {
    navigator: { mediaDevices: { getUserMedia: async () => stream } },
    MediaRecorder: Recorder, Blob,
    URL: { createObjectURL: () => "blob:test-" + ++blobId, revokeObjectURL() {} },
    window: { setTimeout: () => 1, clearTimeout() {} },
  });
  const Component = localLoad("app/components/VideoInterviewSimulator.tsx").default;
  let tree;
  function render() {
    cursor = 0;
    tree = Component({ profile: profiles.find(p => p.id === "queens-commerce") });
    pending.splice(0).forEach(fn => fn());
  }
  function nodes(node) {
    if (!node || typeof node !== "object") return [];
    if (Array.isArray(node)) return node.flatMap(nodes);
    return [node, ...nodes(node.props?.children)];
  }
  function text(node) {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(text).join("");
    return node && typeof node === "object" ? text(node.props?.children) : "";
  }
  function button(label) {
    const found = nodes(tree).find(n => n.type === "button" && text(n).includes(label));
    assert.ok(found, label); return found;
  }
  render();
  return { render, nodes: () => nodes(tree), button, stopped: () => stoppedTracks,
    unmount() { slots.forEach(slot => slot?.cleanup?.()); } };
}

test("recording replay keeps camera live; next-question callbacks do not corrupt new attempt", async () => {
  const h = recorderHarness();
  await h.button("Enable camera").props.onClick(); h.render();
  h.button("Start prep timer").props.onClick(); h.render();
  h.button("Start video response").props.onClick(); h.render();
  h.button("Stop video response").props.onClick(); await Promise.resolve(); h.render();
  assert.equal(h.stopped(), 0);
  assert.ok(h.nodes().some(n => n.type === "video" && n.props.src === "blob:test-1"));
  h.button("Start prep timer").props.onClick(); h.render();
  h.button("Start video response").props.onClick(); h.render();
  h.button("New question").props.onClick(); await Promise.resolve(); h.render();
  assert.equal(h.stopped(), 0);
  assert.ok(!h.nodes().some(n => n.type === "video" && n.props.src));
  h.unmount();
  assert.equal(h.stopped(), 1);
});

test("editable transcript works without camera or speech recognition", () => {
  const h = recorderHarness();
  let field = h.nodes().find(n => n.type === "textarea");
  assert.equal(field.props.disabled, false);
  field.props.onChange({ target: { value: "Synthetic offline transcript." } }); h.render();
  field = h.nodes().find(n => n.type === "textarea");
  assert.equal(field.props.value, "Synthetic offline transcript.");
  assert.equal(h.stopped(), 0);
});

if (process.env.UNIPATH_TEST_BASE_URL) {
  let server;
  const base = process.env.UNIPATH_TEST_BASE_URL === "local"
    ? "http://127.0.0.1:3102" : process.env.UNIPATH_TEST_BASE_URL;
  test.before(async () => {
    if (process.env.UNIPATH_TEST_BASE_URL !== "local") return;
    const { spawn } = require("node:child_process");
    server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3102"], { cwd: root });
    await new Promise((resolve, reject) => {
      server.stdout.on("data", data => { if (data.toString().includes("Ready")) resolve(); });
      server.stderr.on("data", data => process.stderr.write(data));
      server.once("error", reject);
      server.once("exit", code => reject(new Error("Local server exited: " + code)));
    });
  });
  test.after(() => { server?.kill(); });
  test("production HTTP smoke test: every practice route and disabled status", async () => {
    const status = await fetch(base + "/api/application-feedback");
    assert.equal(status.status, 200);
    assert.equal((await status.json()).enabled, false);
    // Bounded concurrency; GET only, never submit feedback or start checkout.
    for (let i = 0; i < profiles.length; i += 6) {
      await Promise.all(profiles.slice(i, i + 6).map(async profile => {
        const response = await fetch(base + "/applications/" + profile.id);
        assert.equal(response.status, 200, profile.id);
        const html = await response.text();
        assert.ok(html.includes("AI feedback paused"), profile.id);
        assert.ok(html.includes("Restore a saved") || html.includes("Save draft") || html.includes("Save with Pro"), profile.id);
      }));
    }
    const missing = await fetch(base + "/applications/not-a-real-program");
    const html = await missing.text();
    assert.ok(missing.status === 404 || html.includes("NEXT_HTTP_ERROR_FALLBACK;404"));
    assert.ok(!html.includes("Commerce (Sauder)"));
  });
}
