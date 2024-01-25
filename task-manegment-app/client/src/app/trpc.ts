import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../trpc-server/src/server.js';
import { Project, createProjectType, ProjectFromDB } from './types/projects.js';


const token = localStorage.getItem('token');


const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      headers: { Authorization: token || '' },
    }),
  ],
});




export async function createProject(newProject: createProjectType): Promise<ProjectFromDB> {
  if (newProject.title === "" || newProject.user_id === "") {
    throw new Error
  }
  try {
    const project = await client.postProject.mutate(newProject);
    console.log(project);
    return project as ProjectFromDB;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}
export async function addAssignmentsToProject(updateProject: ProjectFromDB): Promise<ProjectFromDB> {
  if (updateProject.title === "" || updateProject.user_id === "") {
    throw new Error("Invalid project data");
  }
  try {
    const project = await client.updateProject.mutate(updateProject);
    console.log(project);
    return project as ProjectFromDB;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}


export async function seeProjects(): Promise<ProjectFromDB[]> {
  try {
    const projects = await client.secretData.query();
    return projects as ProjectFromDB[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}
export async function seeProjectsByUserId(user_id:any): Promise<ProjectFromDB[]> {
  try {
    const projects = await client.getAllMyProjects.query(user_id);
    return projects as ProjectFromDB[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function getProject(project_id:any): Promise<Project> {
  try {
    const projects = await client.getProject.query(project_id);
    return projects as Project;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}


