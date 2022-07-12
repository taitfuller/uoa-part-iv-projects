import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { Project } from "../types";

type ProjectsContextType = {
  projects: Project[];
  supervisors: string[];
  cosupervisors: string[];
  specialisations: string[];
  categories: string[];
  isLoading: boolean;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const ProjectsProvider: React.FC<PropsWithChildren> = ({ children }) => {
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

  const context = data;

  return (
    <ProjectsContext.Provider value={context}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);

  if (context === undefined) {
    throw new Error("useProjects() must be used within a ProjectsProvider");
  }

  return context;
};
