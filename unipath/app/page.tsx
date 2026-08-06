"use client";

import { motion } from "framer-motion";
import { Search, GraduationCap, CalendarDays, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      <nav className="flex items-center justify-between px-8 md:px-16 py-6 border-b">

        <h1 className="text-3xl font-bold text-blue-700">
          UniPath
        </h1>

        <div className="hidden md:flex gap-8 text-gray-600">

          <a href="/universities" className="hover:text-blue-700 transition">
            Universities
          </a>

          <a href="#" className="hover:text-blue-700 transition">
            Programs
          </a>

          <a href="#" className="hover:text-blue-700 transition">
            Deadlines
          </a>

          <a href="#" className="hover:text-blue-700 transition">
            AI Assistant
          </a>

        </div>

      </nav>


      <section className="px-8 md:px-20 py-24 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold"
        >
          Your path to university
          <span className="text-blue-700">
            {" "}starts here.
          </span>
        </motion.h2>


        <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto">
          Explore Canadian universities, compare programs,
          track deadlines, and organize your application journey.
        </p>


        <div className="mt-12 max-w-2xl mx-auto flex items-center border rounded-2xl shadow-sm p-2">

          <Search className="ml-4 text-gray-400"/>

          <input
            className="flex-1 p-4 outline-none"
            placeholder="Search universities, programs, or faculties..."
          />

          <button className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition">
            Search
          </button>

        </div>

      </section>


      <section className="grid md:grid-cols-3 gap-8 px-8 md:px-20 pb-24">

        <FeatureCard
          icon={<GraduationCap />}
          title="Explore Universities"
          description="Discover Canadian universities and programs."
        />

        <FeatureCard
          icon={<CalendarDays />}
          title="Track Deadlines"
          description="Stay organized with important application dates."
        />

        <FeatureCard
          icon={<Sparkles />}
          title="AI Assistant"
          description="Get personalized guidance for your applications."
        />

      </section>

    </main>
  );
}


function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="border rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
    >

      <div className="text-blue-700 mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-gray-600">
        {description}
      </p>

    </motion.div>
  );
}