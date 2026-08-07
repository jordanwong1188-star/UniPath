"use client";

import { useState } from "react";
import Link from "next/link";
import universities from "../../data/canadianSchools.json";


export default function UniversitiesPage() {

  const [search, setSearch] = useState("");

  const filtered = universities.filter((u:any) =>
    `${u.name} ${u.shortName} ${u.province} ${u.city}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (

    <main className="min-h-screen bg-slate-950 text-white p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold">
          Canadian Universities
        </h1>

        <p className="text-slate-400 mt-2">
          Explore Canadian universities, programs, and admissions.
        </p>


        <input
          className="
          mt-8
          w-full
          max-w-xl
          rounded-xl
          p-4
          text-black
          "
          placeholder="Search universities..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />


        <div className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
          mt-10
        ">


        {filtered.map((u:any)=>(


          <div
            key={u.id}
            className="
            bg-slate-900
            border
            border-slate-700
            rounded-2xl
            p-6
            hover:border-white
            transition
            "
          >


            <div className="flex items-center gap-4">


              <div
                className="
                h-20
                w-20
                bg-white
                rounded-xl
                flex
                items-center
                justify-center
                p-3
                "
              >

                <img
                  src={`https://www.google.com/s2/favicons?domain=${u.domain}&sz=128`}
                  alt={u.name}
                  className="
                  h-14
                  w-14
                  object-contain
                  "
                />

              </div>


              <div>

                <h2 className="text-xl font-bold">
                  {u.shortName}
                </h2>

                <p className="text-slate-400">
                  {u.type}
                </p>

              </div>


            </div>



            <h3 className="mt-6 text-lg font-semibold">
              {u.name}
            </h3>


            <p className="text-slate-400 mt-2">
              📍 {u.city}, {u.province}
            </p>


            <p className="mt-5 font-semibold">
              Popular Programs
            </p>


            <p className="text-slate-400">
              Business · Engineering · Computer Science
            </p>



            <Link
              href={`/unis/${u.id}`}
              className="
              block
              mt-6
              bg-white
              text-black
              text-center
              rounded-xl
              py-3
              font-semibold
              "
            >
              View Profile →
            </Link>


          </div>


        ))}


        </div>

      </div>


    </main>

  );

}