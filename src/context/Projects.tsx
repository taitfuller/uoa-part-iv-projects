import React, { createContext, useContext, useEffect, useState } from "react";
import { Project } from "../types";

interface ProjectsContextType {
  projects: Project[];
  supervisors: string[];
  cosupervisors: string[];
  specialisations: string[];
  categories: string[];
  isLoading: boolean;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const ProjectsProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ProjectsContextType>({
    projects: [],
    supervisors: [],
    cosupervisors: [],
    specialisations: [],
    categories: [],
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(
        process.env.REACT_APP_PROJECTS_URL as string
      );
      const data = await response.json();
      data.isLoading = false;
      setData(data);
    })();
  }, []);

  return (
    <ProjectsContext.Provider value={data}>{children}</ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const projectsInstance = useContext(ProjectsContext);

  if (projectsInstance === undefined) {
    throw new Error("useProjects() must be used within a ProjectsProvider");
  }

  return projectsInstance;
};
