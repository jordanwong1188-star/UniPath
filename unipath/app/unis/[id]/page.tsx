import { universities } from "@/data/universities";

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const university = universities.find(
    (school) => school.id === id
  );


  if (!university) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          University not found
        </h1>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-gray-50 px-8 md:px-20 py-16">

      <div className="bg-white rounded-3xl p-10 shadow">


        <div className="flex items-center gap-6">

          <img
            src={university.logo}
            alt={university.name}
            className="w-32 h-32 object-contain"
          />


          <div>

            <h1 className="text-4xl font-bold">
              {university.name}
            </h1>


            <p className="text-gray-600 mt-2">
              {university.city}, {university.province}
            </p>

          </div>

        </div>


        <div className="grid md:grid-cols-3 gap-6 mt-10">


          <div>
            <h3 className="font-semibold">
              Type
            </h3>

            <p>
              {university.type}
            </p>
          </div>


          <div>
            <h3 className="font-semibold">
              Admission Average
            </h3>

            <p>
              {university.admissionAverage || "Coming soon"}
            </p>
          </div>


          <div>
            <h3 className="font-semibold">
              Tuition
            </h3>

            <p>
              {university.tuitionDomestic || "Coming soon"}
            </p>
          </div>


        </div>



        <h2 className="text-2xl font-bold mt-12">
          Programs
        </h2>


        {university.faculties.length > 0 ? (

          university.faculties.map((faculty) => (

            <div
              key={faculty.name}
              className="mt-5"
            >

              <h3 className="font-semibold text-lg">
                {faculty.name}
              </h3>


              {faculty.programs.map((program) => (

                <p
                  key={program.name}
                  className="text-gray-600"
                >
                  {program.name} ({program.degree})
                </p>

              ))}

            </div>

          ))

        ) : (

          <p className="text-gray-500 mt-4">
            Programs coming soon.
          </p>

        )}



        <a
          href={university.admissionsWebsite}
          target="_blank"
          className="inline-block mt-10 bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800"
        >
          Admissions
        </a>


      </div>

    </main>
  );
}