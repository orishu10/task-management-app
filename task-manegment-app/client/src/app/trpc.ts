import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../trpc-server/src/server.js';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      headers: {Authorizition: `${localStorage.getItem('token')}`},
    }),
  ],
});


const proj ={
  title:'Project',
  assignments: ['assignment','project'],
  user_id : 'user'
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
export async function createProject(proj:any) {
  try {
    const result = await client.getProjects.query();
    const project = await client.postProject.mutate(proj);
    console.log(result);
    console.log(project);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

createProject(proj);
