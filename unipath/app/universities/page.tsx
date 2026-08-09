"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  ArrowRight,
  GraduationCap,
  Building2,
} from "lucide-react";
import schools from "@/data/canadianSchools.json";

export default function UniversitiesPage() {
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("All");
  const [type, setType] = useState("All");

  const provinces = [
    "All",
    ...Array.from(new Set(schools.map((school) => school.province))),
  ];

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const searchMatch =
        search.trim() === "" ||
        school.name.toLowerCase().includes(search.toLowerCase()) ||
        school.shortName.toLowerCase().includes(search.toLowerCase()) ||
        school.city.toLowerCase().includes(search.toLowerCase()) ||
        school.province.toLowerCase().includes(search.toLowerCase());

      const provinceMatch =
        province === "All" || school.province === province;

      const typeMatch =
        type === "All" || school.type === type;

      return searchMatch && provinceMatch && typeMatch;
    });
  }, [search, province, type]);

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#172126]">

      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <Link href="/" className="text-2xl font-bold">
            UniPath
          </Link>

          <nav className="hidden gap-8 text-sm md:flex">
            <Link href="/universities" className="font-semibold">
              Universities
            </Link>

            <Link href="/programs" className="text-gray-500 hover:text-black">
              Programs
            </Link>

            <Link href="/deadlines" className="text-gray-500 hover:text-black">
              Deadlines
            </Link>

            <Link href="/ai-assistant" className="text-gray-500 hover:text-black">
              Assistant
            </Link>
          </nav>

          <Link
            href="/"
            className="rounded-full bg-[#172126] px-5 py-2 text-sm font-semibold text-white"
          >
            Home
          </Link>

        </div>
      </header>


      <section className="mx-auto max-w-7xl px-6 pb-10 pt-14 lg:px-10">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Explore Canada
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Canadian Universities
        </h1>

        <p className="mt-4 max-w-2xl text-gray-500">
          Explore universities and colleges across Canada and find the
          schools that fit your goals.
        </p>


        <div className="mt-9 grid gap-3 md:grid-cols-[1fr_auto_auto]">

          <div className="flex items-center rounded-xl border border-black/10 bg-white px-4">

            <Search className="mr-3 h-5 w-5 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search schools, cities, or provinces..."
              className="w-full bg-transparent py-4 text-sm outline-none"
            />

          </div>


          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none"
          >
            {provinces.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>


          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none"
          >
            <option>All</option>
            <option>University</option>
            <option>College</option>
          </select>

        </div>


        <div className="mt-6 text-sm text-gray-500">
          Showing <strong>{filteredSchools.length}</strong> schools
        </div>

      </section>


      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {filteredSchools.map((school) => (

            <Link
              key={school.id}
              href={`/unis/${school.id}`}
              className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f1f4f4] p-2">

                  <img
                    src={`https://www.google.com/s2/favicons?domain=${school.domain}&sz=128`}
                    alt={`${school.name} logo`}
                    className="h-10 w-10 object-contain"
                  />

                </div>

                <ArrowRight className="h-5 w-5 text-gray-300 transition group-hover:translate-x-1 group-hover:text-black" />

              </div>


              <div className="mt-6">

                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {school.shortName}
                </div>

                <h2 className="mt-2 text-xl font-semibold">
                  {school.name}
                </h2>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  {school.city}, {school.province}
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  {school.type === "College" ? (
                    <Building2 className="h-4 w-4" />
                  ) : (
                    <GraduationCap className="h-4 w-4" />
                  )}

                  {school.type}
                </div>

              </div>

            </Link>

          ))}

        </div>


        {filteredSchools.length === 0 && (
          <div className="rounded-2xl bg-white p-12 text-center">
            <h2 className="text-xl font-semibold">
              No schools found
            </h2>

            <p className="mt-2 text-gray-500">
              Try another school, city, or province.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}