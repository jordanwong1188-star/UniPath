"use client";

import { useState } from "react";
import universities from "@/data/universities.json";

export default function UniversitiesPage() {
  const [search, setSearch] = useState("");

  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(search.toLowerCase()) ||
    university.shortName.toLowerCase().includes(search.toLowerCase()) ||
    university.province.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 px-8 md:px-20 py-16">

      <section className="text-center">

        <h1 className="text-5xl font-bold">
          Canadian Universities
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Explore universities, programs, faculties, and admission information.
        </p>

        <input
          className="mt-10 w-full max-w-xl mx-auto block rounded-xl border p-4"
          placeholder="Search universities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </section>


      <section className="grid md:grid-cols-3 gap-8 mt-14">

        {filteredUniversities.map((university) => (

          <a
            key={university.id}
            href={`/unis/${university.id}`}
            className="bg-white rounded-2xl p-8 shadow hover:shadow-xl transition block"
          >

            <img
              src={university.logo}
              alt={university.name}
              className="w-20 h-20 object-contain mb-5"
            />

            <h2 className="text-2xl font-bold">
              {university.shortName}
            </h2>

            <p className="text-gray-600 mt-2">
              {university.name}
            </p>

            <p className="text-gray-600 mt-3">
              📍 {university.city}, {university.province}
            </p>

            <p className="text-gray-600 mt-3">
              🏫 {university.type} University
            </p>


            <div className="mt-6">

              <p className="font-semibold">
                Featured Program:
              </p>

              {university.faculties.length > 0 ? (
                <p className="text-gray-600 mt-2">
                  {university.faculties[0].programs[0]?.name}
                </p>
              ) : (
                <p className="text-gray-500 mt-2">
                  More programs coming soon
                </p>
              )}

            </div>


          </a>

        ))}

      </section>

    </main>
  );
}