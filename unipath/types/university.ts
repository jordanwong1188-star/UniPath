export interface Program {
  name: string;
  degree: string;
  deadline?: string;
}

export interface Faculty {
  name: string;
  programs: Program[];
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  logo: string;

  province: string;
  city: string;

  type: "Public" | "Private" | "College" | "Polytechnic";

  website: string;
  admissionsWebsite: string;

  admissionAverage?: string;
  acceptanceRate?: string;

  tuitionDomestic?: string;
  tuitionInternational?: string;

  applicationDeadline?: string;

  studentPopulation?: number;

  residence?: boolean;

  coop?: boolean;

  faculties: Faculty[];
}