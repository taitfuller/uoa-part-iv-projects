export type Data = {
  projects: Project[];
  supervisors: string[];
  cosupervisors: string[];
  specialisations: string[];
  categories: string[];
};

export type Project = {
  id: string;
  title: string;
  allocated: boolean;
  description: string[];
  outcomes: string[];
  supervisors: string[];
  cosupervisors: string[];
  categories: string[];
  specialisations: string[];
  url: string;
};
