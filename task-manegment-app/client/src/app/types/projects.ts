


export interface Assignment {
      title: string;
      description: string;
      id: string;
      isComplete: boolean;
    }
  

export interface Project {
    title: string;
    assignments?:Assignment[];
    user_id: string;
    project_id?: string | null;
  }

  export interface createProjectType{
    title: string;
    user_id: string;
  }



  export interface ProjectFromDB {
    title: string;
    assignments:Assignment[] ;
    user_id: string;
    project_id: string;
  }
  

  export interface projectForAllProjects {
    title: string;
    assignments:Assignment[] | undefined;
    user_id: string;
    project_id: string;
  }
  
  