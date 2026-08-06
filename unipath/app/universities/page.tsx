import universities from "@/data/universities.json";

export default function UniversitiesPage() {
  return (
    <main className="min-h-screen bg-white px-8 py-16">

      <h1 className="text-5xl font-bold text-center">
        Canadian Universities
      </h1>

      <p className="text-center text-gray-600 mt-4">
        Explore universities, programs, and application requirements.
      </p>


      <div className="grid md:grid-cols-3 gap-8 mt-12">

        {universities.map((university) => (
          <div
            key={university.id}
            className="border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
          >

            <h2 className="text-2xl font-semibold">
              {university.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {university.city}, {university.province}
            </p>

            <p className="mt-4">
              {university.type} University
            </p>

            <button className="mt-6 bg-blue-700 text-white px-5 py-2 rounded-lg">
              View Details
            </button>

          </div>
        ))}

      </div>

    </main>
  );
}
