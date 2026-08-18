export type ProgramDetail = {
  id: string;
  universityId: string;
  school: string;
  name: string;
  degree: string;
  duration: string;
  overview: string;
  description: string;
  careers: string[];
};

export const programDetails: ProgramDetail[] = [
  {
    id: "ubc-sauder-bcom",
    universityId: "ubc",
    school: "Sauder School of Business",
    name: "Bachelor of Commerce",
    degree: "BCom",
    duration: "4 years",
    overview: "A business degree covering accounting, finance, marketing, strategy, entrepreneurship, and business analytics.",
    description: "Students develop a broad business foundation and can pursue different areas of business while building analytical and professional skills.",
    careers: ["Finance", "Consulting", "Marketing", "Accounting", "Investment Banking", "Entrepreneurship"]
  },
  {
    id: "ubc-arts",
    universityId: "ubc",
    school: "Faculty of Arts",
    name: "Bachelor of Arts",
    degree: "BA",
    duration: "4 years",
    overview: "A flexible degree covering humanities, social sciences, languages, psychology, economics, politics, and related fields.",
    description: "Students specialize in an area of interest while developing research, communication, writing, and analytical skills.",
    careers: ["Law", "Education", "Government", "Communications", "Public Policy", "Research"]
  },
  {
    id: "ubc-engineering",
    universityId: "ubc",
    school: "Faculty of Applied Science",
    name: "Bachelor of Applied Science",
    degree: "BASc",
    duration: "4 years",
    overview: "Engineering education covering civil, mechanical, electrical, computer, chemical, and other engineering disciplines.",
    description: "Students apply mathematics and science to engineering design, technology, and real-world problems.",
    careers: ["Engineering", "Technology", "Software", "Construction", "Energy", "Research"]
  },
  {
    id: "ubc-science",
    universityId: "ubc",
    school: "Faculty of Science",
    name: "Bachelor of Science",
    degree: "BSc",
    duration: "4 years",
    overview: "Science programs covering biology, chemistry, physics, mathematics, statistics, computer science, and earth sciences.",
    description: "Students develop scientific and quantitative skills through coursework, laboratories, research, and specialized study.",
    careers: ["Research", "Technology", "Data Science", "Healthcare", "Biotechnology", "Graduate Studies"]
  },

  {
    id: "sfu-beedie-bba",
    universityId: "sfu",
    school: "Beedie School of Business",
    name: "Bachelor of Business Administration",
    degree: "BBA",
    duration: "4 years",
    overview: "Business education covering finance, accounting, marketing, management, entrepreneurship, and business analytics.",
    description: "Students build business fundamentals and develop expertise relevant to modern business careers.",
    careers: ["Finance", "Marketing", "Accounting", "Consulting", "Management", "Entrepreneurship"]
  },
  {
    id: "sfu-computing",
    universityId: "sfu",
    school: "School of Computing Science",
    name: "Computing Science",
    degree: "BSc",
    duration: "4 years",
    overview: "A computing program covering programming, algorithms, software development, artificial intelligence, databases, and computer systems.",
    description: "Students develop programming and mathematical foundations before exploring advanced areas of computing.",
    careers: ["Software Engineering", "Artificial Intelligence", "Data Science", "Cybersecurity", "Technology", "Research"]
  },
  {
    id: "sfu-arts",
    universityId: "sfu",
    school: "Faculty of Arts and Social Sciences",
    name: "Bachelor of Arts",
    degree: "BA",
    duration: "4 years",
    overview: "Programs covering psychology, economics, political science, sociology, communication, history, and other humanities and social sciences.",
    description: "Students specialize in an academic field while developing research, writing, communication, and analytical skills.",
    careers: ["Government", "Law", "Education", "Communications", "Business", "Research"]
  },

  {
    id: "uvic-business",
    universityId: "uvic",
    school: "Gustavson School of Business",
    name: "Bachelor of Commerce",
    degree: "BCom",
    duration: "4 years",
    overview: "Business education covering finance, accounting, marketing, entrepreneurship, management, and related fields.",
    description: "Students combine business fundamentals with practical learning and professional development.",
    careers: ["Finance", "Marketing", "Accounting", "Consulting", "Management", "Entrepreneurship"]
  },
  {
    id: "uvic-arts",
    universityId: "uvic",
    school: "Faculty of Humanities and Social Sciences",
    name: "Bachelor of Arts",
    degree: "BA",
    duration: "4 years",
    overview: "A flexible arts degree covering humanities, social sciences, languages, history, psychology, economics, and political science.",
    description: "Students develop communication, research, writing, and critical-thinking skills while specializing in an area of interest.",
    careers: ["Education", "Law", "Government", "Communications", "Research", "Public Policy"]
  },
  {
    id: "uvic-engineering",
    universityId: "uvic",
    school: "Faculty of Engineering and Computer Science",
    name: "Engineering",
    degree: "BEng",
    duration: "4 years",
    overview: "Engineering programs covering computer, electrical, mechanical, civil, biomedical, and related technical fields.",
    description: "Students apply mathematics and science to engineering design and real-world technical problems.",
    careers: ["Engineering", "Technology", "Software", "Design", "Manufacturing", "Research"]
  },

  {
    id: "bcit-business",
    universityId: "bcit",
    school: "School of Business + Media",
    name: "Business",
    degree: "Diploma / Degree",
    duration: "2–4 years",
    overview: "Applied business education covering accounting, finance, marketing, management, entrepreneurship, and business technology.",
    description: "BCIT emphasizes practical and career-focused learning designed around workplace skills.",
    careers: ["Accounting", "Finance", "Marketing", "Management", "Business", "Entrepreneurship"]
  },
  {
    id: "bcit-computing",
    universityId: "bcit",
    school: "School of Computing and Academic Studies",
    name: "Computing",
    degree: "Diploma / Degree",
    duration: "2–4 years",
    overview: "Computing education covering software development, cybersecurity, networking, cloud systems, data, and information technology.",
    description: "Students develop practical technical skills for careers in computing and information technology.",
    careers: ["Software Development", "Cybersecurity", "IT", "Networking", "Cloud Computing", "Data"]
  },
  {
    id: "bcit-engineering",
    universityId: "bcit",
    school: "School of Energy",
    name: "Engineering Technology",
    degree: "Diploma",
    duration: "2 years",
    overview: "Applied technical education covering engineering technologies, electronics, energy, construction, and industrial systems.",
    description: "Students focus on practical technical skills and applied problem solving.",
    careers: ["Engineering Technology", "Construction", "Energy", "Electronics", "Manufacturing"]
  },

  {
    id: "kpu-business",
    universityId: "kpu",
    school: "Melville School of Business",
    name: "Business",
    degree: "BBA",
    duration: "4 years",
    overview: "Business programs covering accounting, finance, marketing, management, entrepreneurship, and human resources.",
    description: "Students develop practical business knowledge and professional skills.",
    careers: ["Finance", "Marketing", "Accounting", "Management", "Entrepreneurship"]
  },

  {
    id: "capu-business",
    universityId: "capu",
    school: "School of Business",
    name: "Business Administration",
    degree: "BBA",
    duration: "4 years",
    overview: "Business education covering management, marketing, finance, entrepreneurship, and organizational studies.",
    description: "Students build business knowledge while developing leadership, communication, and analytical skills.",
    careers: ["Management", "Marketing", "Finance", "Entrepreneurship", "Business"]
  },

  {
    id: "ufv-business",
    universityId: "ufv",
    school: "School of Business",
    name: "Business Administration",
    degree: "BBA",
    duration: "4 years",
    overview: "Business education covering accounting, finance, marketing, management, entrepreneurship, and business analytics.",
    description: "Students build a broad foundation in business and develop professional skills.",
    careers: ["Accounting", "Finance", "Marketing", "Management", "Business Analytics"]
  },

  {
    id: "tru-business",
    universityId: "tru",
    school: "School of Business and Economics",
    name: "Business Administration",
    degree: "BBA",
    duration: "4 years",
    overview: "Business education covering management, accounting, finance, marketing, economics, and entrepreneurship.",
    description: "The program combines business theory with practical learning and professional development.",
    careers: ["Business", "Finance", "Accounting", "Marketing", "Management"]
  },

  {
    id: "viu-business",
    universityId: "viu",
    school: "Faculty of Management",
    name: "Business Administration",
    degree: "BBA",
    duration: "4 years",
    overview: "Business studies covering management, accounting, marketing, finance, and entrepreneurship.",
    description: "Students develop practical business knowledge and transferable professional skills.",
    careers: ["Business", "Marketing", "Finance", "Management", "Accounting"]
  },

  {
    id: "langara-business",
    universityId: "langara",
    school: "School of Business",
    name: "Business",
    degree: "Diploma / Degree",
    duration: "2–4 years",
    overview: "Business studies covering accounting, management, marketing, finance, and entrepreneurship.",
    description: "Career-oriented business education with pathways toward further university study.",
    careers: ["Business", "Accounting", "Marketing", "Management", "Finance"]
  },

  {
    id: "douglas-business",
    universityId: "douglas",
    school: "School of Business",
    name: "Business",
    degree: "Diploma / Degree",
    duration: "2–4 years",
    overview: "Business programs covering accounting, finance, marketing, management, and entrepreneurship.",
    description: "Students develop practical business knowledge and professional skills.",
    careers: ["Accounting", "Finance", "Marketing", "Management", "Business"]
  },

  {
    id: "ualberta-business",
    universityId: "ualberta",
    school: "Alberta School of Business",
    name: "Bachelor of Commerce",
    degree: "BCom",
    duration: "4 years",
    overview: "Commerce education covering accounting, finance, marketing, operations, strategy, entrepreneurship, and business economics.",
    description: "Students develop broad business knowledge before selecting areas of specialization.",
    careers: ["Finance", "Accounting", "Marketing", "Consulting", "Management"]
  },

  {
    id: "ucalgary-business",
    universityId: "ucalgary",
    school: "Haskayne School of Business",
    name: "Bachelor of Commerce",
    degree: "BCom",
    duration: "4 years",
    overview: "Commerce education covering accounting, finance, marketing, entrepreneurship, management, and business strategy.",
    description: "Students develop business fundamentals and professional skills with opportunities to specialize.",
    careers: ["Finance", "Accounting", "Marketing", "Consulting", "Management"]
  },

  {
    id: "ulethbridge-business",
    universityId: "ulethbridge",
    school: "Dhillon School of Business",
    name: "Management",
    degree: "BManagement",
    duration: "4 years",
    overview: "Business and management education covering finance, marketing, accounting, human resources, and organizational leadership.",
    description: "Students develop business knowledge and leadership skills.",
    careers: ["Management", "Marketing", "Finance", "Human Resources", "Consulting"]
  },

  {
    id: "mru-business",
    universityId: "mru",
    school: "Bissett School of Business",
    name: "Business Administration",
    degree: "BBA",
    duration: "4 years",
    overview: "Business education covering accounting, finance, marketing, entrepreneurship, human resources, and management.",
    description: "Students develop practical business knowledge and professional skills.",
    careers: ["Business", "Finance", "Marketing", "Accounting", "Management"]
  },

  {
    id: "macewan-business",
    universityId: "macewan",
    school: "School of Business",
    name: "Commerce",
    degree: "BCom",
    duration: "4 years",
    overview: "Commerce education covering accounting, finance, marketing, management, and business strategy.",
    description: "Students develop a foundation in business and can pursue different business career paths.",
    careers: ["Finance", "Accounting", "Marketing", "Management", "Business"]
  },

  {
    id: "usask-business",
    universityId: "usask",
    school: "Edwards School of Business",
    name: "Bachelor of Commerce",
    degree: "BCom",
    duration: "4 years",
    overview: "Business education covering accounting, finance, marketing, management, entrepreneurship, and operations.",
    description: "Students develop a broad business foundation and professional skills.",
    careers: ["Finance", "Accounting", "Marketing", "Consulting", "Management"]
  },

  {
    id: "uregina-business",
    universityId: "uregina",
    school: "Faculty of Business Administration",
    name: "Business Administration",
    degree: "BBA",
    duration: "4 years",
    overview: "Business education covering accounting, finance, marketing, management, human resources, and entrepreneurship.",
    description: "Students develop business knowledge and practical professional skills.",
    careers: ["Business", "Finance", "Marketing", "Accounting", "Management"]
  },

  {
    id: "umanitoba-business",
    universityId: "umanitoba",
    school: "Asper School of Business",
    name: "Bachelor of Commerce",
    degree: "BComm",
    duration: "4 years",
    overview: "Commerce education covering accounting, finance, marketing, supply chain, human resources, and management.",
    description: "Students build business fundamentals and specialize in areas aligned with their career goals.",
    careers: ["Finance", "Accounting", "Marketing", "Consulting", "Management"]
  },

  {
    id: "uoft-rotman-commerce",
    universityId: "uoft",
    school: "Rotman Commerce",
    name: "Bachelor of Commerce",
    degree: "BCom",
    duration: "4 years",
    overview: "Business education covering finance, accounting, management, marketing, economics, and strategic decision-making.",
    description: "Students combine business education with the broader academic opportunities at UofT.",
    careers: ["Investment Banking", "Consulting", "Finance", "Accounting", "Marketing"]
  },

  {
    id: "waterloo-afm",
    universityId: "waterloo",
    school: "School of Accounting and Finance",
    name: "Accounting and Financial Management",
    degree: "BA",
    duration: "4 years",
    overview: "A combined accounting and finance program with strong analytical, business, and professional components.",
    description: "Students study accounting, finance, economics, business strategy, technology, and financial decision-making.",
    careers: ["Accounting", "Finance", "Investment Banking", "Consulting", "Financial Analysis"]
  },

  {
    id: "mcmaster-commerce",
    universityId: "mcmaster",
    school: "DeGroote School of Business",
    name: "Bachelor of Commerce",
    degree: "BCom",
    duration: "4 years",
    overview: "Commerce education covering finance, accounting, marketing, operations, management, and strategy.",
    description: "Students develop business fundamentals and practical skills for business careers.",
    careers: ["Finance", "Marketing", "Accounting", "Consulting", "Management"]
  },

  {
    id: "queens-commerce",
    universityId: "queens",
    school: "Smith School of Business",
    name: "Bachelor of Commerce",
    degree: "BCom",
    duration: "4 years",
    overview: "A collaborative commerce program focused on business fundamentals, teamwork, leadership, strategy, and problem solving.",
    description: "Students develop business knowledge through collaborative and analytical learning.",
    careers: ["Consulting", "Finance", "Marketing", "Investment Banking", "Accounting"]
  },

  {
    id: "western-ivey",
    universityId: "western",
    school: "Ivey Business School",
    name: "Honours Business Administration",
    degree: "HBA",
    duration: "2 years after pre-Ivey",
    overview: "A case-based business program emphasizing strategy, leadership, finance, marketing, and decision-making.",
    description: "Students analyze real-world business cases and develop the ability to make and defend decisions.",
    careers: ["Consulting", "Investment Banking", "Finance", "Marketing", "Strategy"]
  }
];

export function getProgramsForUniversity(
  universityId: string
): ProgramDetail[] {
  return programDetails.filter(
    (program) => program.universityId === universityId
  );
}
