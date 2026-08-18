export type UniversityProgram = {
  id: string;
  name: string;
  description: string;
  degree: string;
  admissionAverage: string;
  overview: string;
  whatYouStudy: string[];
  careers: string[];
  officialUrl: string;
};

export const universityPrograms: Record<string, UniversityProgram[]> = {
  ubc: [
    {
      id: "sauder-bcom",
      name: "Sauder School of Business",
      description:
        "UBC Sauder's Bachelor of Commerce combines business fundamentals with practical learning and opportunities to specialize in different areas of business.",
      degree: "Bachelor of Commerce (BCom)",
      admissionAverage: "Highly competitive",
      overview:
        "The Sauder Bachelor of Commerce is a four-year business degree designed to give students a broad understanding of business before allowing them to develop deeper knowledge in a chosen area. Students build skills in communication, leadership, analysis, problem-solving, finance, marketing, accounting and strategy.",
      whatYouStudy: [
        "Accounting",
        "Finance",
        "Marketing",
        "Economics",
        "Business strategy",
        "Entrepreneurship",
        "Business technology",
        "Leadership",
      ],
      careers: [
        "Investment banking",
        "Consulting",
        "Marketing",
        "Accounting",
        "Corporate finance",
        "Entrepreneurship",
        "Business analytics",
        "Real estate",
      ],
      officialUrl:
        "https://org-www.sauder.ubc.ca/programs/bachelors-degrees/bachelor-commerce",
    },

    {
      id: "ubc-computer-science",
      name: "Computer Science",
      description:
        "UBC Computer Science focuses on programming, algorithms, software development, artificial intelligence and computer systems.",
      degree: "Bachelor of Science (BSc)",
      admissionAverage: "Highly competitive",
      overview:
        "Computer Science teaches students how computers work and how computational methods can be used to solve complex problems. Students develop programming, analytical and mathematical skills while learning about software and computer systems.",
      whatYouStudy: [
        "Programming",
        "Algorithms",
        "Data structures",
        "Artificial intelligence",
        "Computer systems",
        "Software development",
        "Databases",
        "Computational theory",
      ],
      careers: [
        "Software engineer",
        "Software developer",
        "Data scientist",
        "AI specialist",
        "Cybersecurity",
        "Technology consulting",
        "Product management",
      ],
      officialUrl: "https://www.cs.ubc.ca/",
    },

    {
      id: "ubc-engineering",
      name: "Applied Science",
      description:
        "UBC Applied Science provides engineering education focused on mathematics, science, engineering design and technical problem-solving.",
      degree: "Bachelor of Applied Science (BASc)",
      admissionAverage: "Highly competitive",
      overview:
        "The Applied Science program gives students a strong foundation in mathematics, science and engineering before they move into specialized engineering disciplines. Students combine theoretical learning with design and practical problem-solving.",
      whatYouStudy: [
        "Mathematics",
        "Physics",
        "Engineering design",
        "Computer programming",
        "Engineering analysis",
        "Technical communication",
      ],
      careers: [
        "Software engineering",
        "Civil engineering",
        "Mechanical engineering",
        "Electrical engineering",
        "Systems engineering",
        "Engineering consulting",
      ],
      officialUrl: "https://engineering.ubc.ca/",
    },

    {
      id: "ubc-arts",
      name: "Faculty of Arts",
      description:
        "UBC Arts offers programs across humanities, social sciences, languages, economics, psychology and many other fields.",
      degree: "Bachelor of Arts (BA)",
      admissionAverage: "Competitive; varies by program",
      overview:
        "The Faculty of Arts allows students to explore a wide range of subjects while developing critical thinking, communication, research and analytical skills. Students can choose from numerous majors and areas of study.",
      whatYouStudy: [
        "Psychology",
        "Economics",
        "Political science",
        "Sociology",
        "History",
        "Philosophy",
        "Languages",
        "Communication",
      ],
      careers: [
        "Business",
        "Government",
        "Marketing",
        "Law",
        "Communications",
        "Education",
        "Research",
        "Public policy",
      ],
      officialUrl: "https://www.arts.ubc.ca/",
    },
  ],

  sfu: [
    {
      id: "beedie-bba",
      name: "Beedie School of Business",
      description:
        "SFU Beedie's Bachelor of Business Administration provides a broad business education with opportunities to specialize in areas such as finance, marketing, accounting and entrepreneurship.",
      degree: "Bachelor of Business Administration (BBA)",
      admissionAverage: "Competitive",
      overview:
        "The Beedie BBA prepares students for careers in business by combining core business education with opportunities to develop specialized knowledge. Students learn how organizations operate while developing analytical, communication and leadership skills.",
      whatYouStudy: [
        "Accounting",
        "Finance",
        "Marketing",
        "Management",
        "Entrepreneurship",
        "Business analytics",
        "Economics",
        "Strategic analysis",
      ],
      careers: [
        "Finance",
        "Marketing",
        "Consulting",
        "Accounting",
        "Entrepreneurship",
        "Business analytics",
        "Management",
        "Investment banking",
      ],
      officialUrl: "https://beedie.sfu.ca/programs/undergraduate",
    },

    {
      id: "sfu-computing",
      name: "Computing Science",
      description:
        "SFU Computing Science covers programming, algorithms, artificial intelligence, software development and computer systems.",
      degree: "Bachelor of Science (BSc)",
      admissionAverage: "Competitive",
      overview:
        "Computing Science teaches students to use computational methods to solve problems and build software. The program develops programming, mathematical and analytical skills that can be applied across the technology industry.",
      whatYouStudy: [
        "Programming",
        "Algorithms",
        "Data structures",
        "Artificial intelligence",
        "Software engineering",
        "Computer systems",
        "Databases",
      ],
      careers: [
        "Software engineer",
        "Software developer",
        "AI specialist",
        "Data scientist",
        "Cybersecurity",
        "Technology consulting",
      ],
      officialUrl: "https://www.sfu.ca/computing.html",
    },

    {
      id: "sfu-engineering",
      name: "Engineering Science",
      description:
        "SFU Engineering Science combines engineering fundamentals with technical problem-solving and specialized engineering study.",
      degree: "Bachelor of Applied Science (BASc)",
      admissionAverage: "Competitive",
      overview:
        "Engineering Science provides students with a strong foundation in mathematics, physics and engineering while preparing them to work on complex technical problems.",
      whatYouStudy: [
        "Mathematics",
        "Physics",
        "Engineering design",
        "Programming",
        "Electronics",
        "Systems",
      ],
      careers: [
        "Engineering",
        "Software",
        "Electronics",
        "Systems engineering",
        "Technology",
        "Research",
      ],
      officialUrl: "https://www.sfu.ca/engineering.html",
    },
  ],

  uvic: [
    {
      id: "uvic-gustavson",
      name: "Gustavson School of Business",
      description:
        "UVic's Gustavson School of Business offers business education focused on management, entrepreneurship, finance, marketing and international business.",
      degree: "Bachelor of Commerce (BCom)",
      admissionAverage: "Competitive",
      overview:
        "The Gustavson BCom develops students' understanding of business while emphasizing leadership, collaboration, international perspectives and practical learning.",
      whatYouStudy: [
        "Accounting",
        "Finance",
        "Marketing",
        "Management",
        "Entrepreneurship",
        "International business",
        "Economics",
      ],
      careers: [
        "Finance",
        "Marketing",
        "Consulting",
        "Management",
        "Accounting",
        "Entrepreneurship",
      ],
      officialUrl: "https://www.uvic.ca/gustavson/",
    },

    {
      id: "uvic-computer-science",
      name: "Computer Science",
      description:
        "UVic Computer Science teaches programming, algorithms, software development and computer systems.",
      degree: "Bachelor of Science (BSc)",
      admissionAverage: "Competitive",
      overview:
        "Students learn computational thinking and software development while developing the mathematical and analytical skills required for modern computing careers.",
      whatYouStudy: [
        "Programming",
        "Algorithms",
        "Software development",
        "Artificial intelligence",
        "Computer systems",
        "Databases",
      ],
      careers: [
        "Software development",
        "Software engineering",
        "Data science",
        "AI",
        "Cybersecurity",
        "Technology",
      ],
      officialUrl: "https://www.uvic.ca/ecs/computerscience/",
    },
  ],

  uoft: [
    {
      id: "rotman-commerce",
      name: "Rotman Commerce",
      description:
        "Rotman Commerce provides a business education focused on commerce, finance, accounting, marketing and management.",
      degree: "Bachelor of Commerce (BCom)",
      admissionAverage: "Highly competitive",
      overview:
        "Rotman Commerce combines business fundamentals with opportunities to study areas such as finance, accounting, management and marketing. Students develop analytical and problem-solving skills while preparing for careers in business.",
      whatYouStudy: [
        "Finance",
        "Accounting",
        "Marketing",
        "Management",
        "Economics",
        "Business strategy",
      ],
      careers: [
        "Investment banking",
        "Consulting",
        "Finance",
        "Marketing",
        "Accounting",
        "Management",
      ],
      officialUrl: "https://rotmancommerce.utoronto.ca/",
    },

    {
      id: "uoft-computer-science",
      name: "Computer Science",
      description:
        "UofT Computer Science focuses on computing theory, programming, algorithms, artificial intelligence and software.",
      degree: "Bachelor of Science (BSc)",
      admissionAverage: "Highly competitive",
      overview:
        "The Computer Science program develops a strong foundation in computational thinking, programming and mathematics while exposing students to areas such as artificial intelligence and software systems.",
      whatYouStudy: [
        "Programming",
        "Algorithms",
        "Artificial intelligence",
        "Computer systems",
        "Data structures",
        "Software",
      ],
      careers: [
        "Software engineering",
        "AI",
        "Data science",
        "Technology",
        "Research",
        "Cybersecurity",
      ],
      officialUrl: "https://web.cs.toronto.edu/",
    },
  ],

  waterloo: [
    {
      id: "waterloo-computer-science",
      name: "Computer Science",
      description:
        "Waterloo Computer Science combines programming, mathematics, algorithms and software development with extensive co-op opportunities.",
      degree: "Bachelor of Computer Science (BCS)",
      admissionAverage: "Extremely competitive",
      overview:
        "Waterloo Computer Science is designed for students interested in computing, software and technology. Students develop strong programming and mathematical foundations and can gain extensive professional experience through Waterloo's co-op system.",
      whatYouStudy: [
        "Programming",
        "Algorithms",
        "Mathematics",
        "Artificial intelligence",
        "Software engineering",
        "Computer systems",
        "Data",
      ],
      careers: [
        "Software engineer",
        "Software developer",
        "AI engineer",
        "Data scientist",
        "Technology entrepreneur",
        "Research",
      ],
      officialUrl: "https://uwaterloo.ca/computer-science/",
    },

    {
      id: "waterloo-engineering",
      name: "Engineering",
      description:
        "Waterloo Engineering combines rigorous technical education with hands-on learning and one of Canada's largest co-op programs.",
      degree: "Bachelor of Applied Science (BASc)",
      admissionAverage: "Extremely competitive",
      overview:
        "Waterloo Engineering prepares students for technical careers through engineering fundamentals, design projects, mathematics and science. The co-op program allows students to gain substantial professional experience during their degree.",
      whatYouStudy: [
        "Engineering design",
        "Mathematics",
        "Physics",
        "Programming",
        "Technical problem-solving",
        "Engineering systems",
      ],
      careers: [
        "Engineering",
        "Technology",
        "Software",
        "Research",
        "Product development",
        "Engineering consulting",
      ],
      officialUrl: "https://uwaterloo.ca/engineering/",
    },
  ],

  mcmaster: [
    {
      id: "degroote-commerce",
      name: "DeGroote School of Business",
      description:
        "DeGroote provides business education in finance, accounting, marketing, management and entrepreneurship.",
      degree: "Bachelor of Commerce (BCom)",
      admissionAverage: "Competitive",
      overview:
        "The DeGroote Commerce program develops business knowledge alongside communication, teamwork, leadership and analytical skills.",
      whatYouStudy: [
        "Accounting",
        "Finance",
        "Marketing",
        "Management",
        "Economics",
        "Business strategy",
      ],
      careers: [
        "Finance",
        "Consulting",
        "Marketing",
        "Accounting",
        "Management",
        "Entrepreneurship",
      ],
      officialUrl: "https://degroote.mcmaster.ca/",
    },

    {
      id: "mcmaster-health-sciences",
      name: "Health Sciences",
      description:
        "McMaster Health Sciences is an interdisciplinary program combining health, science, research and problem-solving.",
      degree: "Bachelor of Health Sciences (BHSc)",
      admissionAverage: "Extremely competitive",
      overview:
        "Health Sciences combines biological science with interdisciplinary study and research. It is particularly popular among students interested in healthcare, medicine and health research.",
      whatYouStudy: [
        "Health science",
        "Biology",
        "Research",
        "Statistics",
        "Medicine",
        "Health policy",
      ],
      careers: [
        "Medicine",
        "Healthcare",
        "Research",
        "Public health",
        "Biotechnology",
        "Health policy",
      ],
      officialUrl: "https://bhsc.mcmaster.ca/",
    },
  ],

  queens: [
    {
      id: "smith-commerce",
      name: "Smith School of Business",
      description:
        "Smith Commerce provides business education in finance, marketing, accounting, strategy and entrepreneurship.",
      degree: "Bachelor of Commerce (BCom)",
      admissionAverage: "Highly competitive",
      overview:
        "Smith Commerce uses a collaborative and case-based approach to business education. Students develop analytical, communication and leadership skills while learning about major areas of business.",
      whatYouStudy: [
        "Finance",
        "Accounting",
        "Marketing",
        "Strategy",
        "Entrepreneurship",
        "Business analytics",
      ],
      careers: [
        "Consulting",
        "Finance",
        "Investment banking",
        "Marketing",
        "Accounting",
        "Entrepreneurship",
      ],
      officialUrl: "https://smith.queensu.ca/",
    },
  ],

  western: [
    {
      id: "ivey-hba",
      name: "Ivey Business School",
      description:
        "Ivey's HBA program emphasizes case-based learning, leadership, strategy, finance and entrepreneurship.",
      degree: "Honours Business Administration (HBA)",
      admissionAverage: "Highly competitive",
      overview:
        "Ivey's HBA program uses case-based learning to teach students how to analyze real business problems and make decisions. Students develop leadership, communication and strategic thinking skills.",
      whatYouStudy: [
        "Strategy",
        "Finance",
        "Marketing",
        "Accounting",
        "Leadership",
        "Entrepreneurship",
        "Business analysis",
      ],
      careers: [
        "Consulting",
        "Investment banking",
        "Finance",
        "Marketing",
        "Entrepreneurship",
        "Management",
      ],
      officialUrl: "https://www.ivey.uwo.ca/",
    },
  ],
};
