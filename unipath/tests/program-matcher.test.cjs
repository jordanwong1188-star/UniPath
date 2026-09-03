const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
// Test-only TypeScript loader; no runtime dependency or external API calls.
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }
}).outputText, filename);
const { matchPrograms, academicLabel } = require('../lib/programMatcher.ts');
const { programDetails } = require('../data/programDetails.ts');
const { admissionsEvidence } = require('../data/admissionsEvidence.ts');
const schools = require('../data/canadianSchools.json');
const base = { field: 'Computer Science', average: 78, program: '', school: '', province: '', activities: '' };
const run = overrides => matchPrograms({ ...base, ...overrides }, programDetails, schools);
test('community estimates are labelled, sourced and subordinate to official evidence', () => {
  const estimate = admissionsEvidence.find(e => e.kind === 'research-estimate');
  assert.ok(estimate.additionalSources.length >= 2);
  assert.equal(academicLabel(94, estimate), 'Within estimated range');
  assert.equal(academicLabel(89, estimate), 'Below estimated range');
  assert.equal(academicLabel(99, estimate), 'Above estimated range');
  const official = { ...estimate, kind: 'official', range: [87, 89] };
  const result = matchPrograms({ ...base, field: 'Business', program: 'Commerce', average: 94 }, programDetails, schools, [estimate, official]);
  assert.equal(result.academic.find(r => r.school.id === 'queens').evidence.kind, 'official');
});
test('every sourced reference maps to exactly one catalogue program', () => {
  for (const e of admissionsEvidence) assert.equal(programDetails.filter(p => p.universityId === e.universityId && p.name === e.programName).length, 1, e.programName);
});
test('78 and 92 averages produce different academic ordering and bands', () => {
  const low = run({ average: 78 }), high = run({ average: 92 });
  assert.equal(low.academic[0].school.id, 'laurier');
  assert.equal(high.academic[0].school.id, 'sfu');
  assert.notDeepEqual(low.academic.map(r => r.program.id), high.academic.map(r => r.program.id));
  const sfu = low.academic.find(r => r.school.id === 'sfu');
  assert.equal(sfu.label, 'Below published range');
});
test('desired program and field cannot be overridden by school preference', () => {
  const result = run({ program: 'Psychology', school: 'ubc' });
  // A genuine joint Psychology/Computing degree is allowed; unrelated UBC
  // options must not be inserted just because UBC is preferred.
  assert.ok([...result.academic, ...result.explore].every(r => /psychology/i.test(r.program.name) && /comput/i.test(r.program.name)));
  const cs = run({ program: 'CS' });
  assert.ok(cs.academic.some(r => r.program.name === 'Computing Science'));
  assert.ok([...cs.academic, ...cs.explore].every(r => /comput(er|ing) science/i.test(r.program.name)));
});
test('province filter is strict and preferred university is respected among relevant matches', () => {
  const result = run({ province: 'British Columbia', school: 'tmu' });
  assert.ok([...result.academic, ...result.explore].every(r => r.school.province === 'British Columbia'));
  assert.equal(run({ average: 82, school: 'tmu' }).academic[0].school.id, 'tmu');
});
test('missing grade evidence never receives an academic classification', () => {
  const low = run({ average: 60 }), high = run({ average: 99 });
  assert.deepEqual(low.explore.map(r => r.program.id), high.explore.map(r => r.program.id));
  assert.ok(low.explore.every(r => r.label === 'Admission range not verified'));
  assert.equal(academicLabel(100), 'Admission range not verified');
});
test('ECs affect interest suggestions but never the academic band', () => {
  const blank = run({ field: 'Undecided' });
  const music = run({ field: 'Undecided', activities: 'I play cello in an orchestra' });
  assert.notDeepEqual(blank.explore.map(r => r.program.id), music.explore.map(r => r.program.id));
  const a = run({ activities: 'I am chair of a club' });
  assert.ok([...a.academic, ...a.explore].every(r => !r.reasons.some(s => s.includes('technical projects'))));
  assert.equal(run({ activities: 'Coding and robotics' }).academic.find(r => r.school.id === 'sfu').label, 'Below published range');
});
test('catalogue order does not decide ties and no school fills the list', () => {
  const normal = run({});
  const reverse = matchPrograms(base, [...programDetails].reverse(), schools);
  assert.deepEqual(normal, reverse);
  for (const list of [normal.academic, normal.explore]) {
    for (const school of schools) assert.ok(list.filter(r => r.school.id === school.id).length <= 2);
  }
  assert.ok([...normal.academic, ...normal.explore].every(r => r.program.entryType !== 'Second entry'));
});
test('invalid marks and no-match inputs do not silently fall back', () => {
  for (const average of [NaN, Infinity, -1, 101]) assert.throws(() => run({ average }));
  assert.equal(run({ program: 'not a real program zzxyz' }).total, 0);
});
