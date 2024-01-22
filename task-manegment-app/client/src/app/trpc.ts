import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../trpc-server/src/server.js';
import { error } from 'console';

const token = localStorage.getItem('token');
// `${localStorage.getItem('token')}`

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      headers: {Authorization : token || ''  },
    }),
  ],
});

export interface Project {
  title: string;
  assignments: string[];
  user_id: string;
  project_id? : string | null;

}




export async function main(proj:any) {
  try {
    const result = await client.secretData.query();
    const project = await client.postProject.mutate(proj);
    console.log(result);
    console.log(project);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}
export async function createProject(newProject:Project) {
  if (newProject.title === ""  || newProject.user_id === "") {
  throw new Error
  }
  try {
    const project = await client.postProject.mutate(newProject);
    console.log(project);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}
export async function seeProjects(): Promise<Project[]> {
  try {
    const projects = await client.secretData.query();
    return projects as Project[]; 
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; 
  }
}

