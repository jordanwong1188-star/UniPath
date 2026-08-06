export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-10 py-6 border-b">
        <h1 className="text-2xl font-bold text-blue-700">
          UniPath
        </h1>

        <div className="space-x-6">
          <button>Universities</button>
          <button>Programs</button>
          <button>Deadlines</button>
          <button>AI Assistant</button>
        </div>
      </nav>

      <section className="text-center py-20 px-5">
        <h2 className="text-5xl font-bold">
          Your path to university starts here.
        </h2>

        <p className="mt-6 text-lg text-gray-600">
          Explore Canadian universities, compare programs,
          track deadlines, and organize your application journey.
        </p>

        <input
          className="mt-10 w-full max-w-xl rounded-lg border p-4"
          placeholder="Search universities, programs, or faculties..."
        />
      </section>

      <section className="grid md:grid-cols-3 gap-6 px-10">
        <div className="border rounded-xl p-6">
          🎓 Explore Universities
        </div>

        <div className="border rounded-xl p-6">
          📅 Track Deadlines
        </div>

        <div className="border rounded-xl p-6">
          🤖 AI Application Assistant
        </div>
      </section>
    </main>
  );
}
