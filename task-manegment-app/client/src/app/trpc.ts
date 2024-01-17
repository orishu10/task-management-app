import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../trpc-server/src/server.js';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      async headers() {
        const token = await getAuthCookie();
        return {
          authorization: token ? `Bearer ${token}` : '',
        };
      },
    }),
  ],
});


const proj ={
  title:'Project',
  assignments: ['assignment','project'],
  userId : 'user'
}
async function getAuthCookie() {
  const token = localStorage.getItem('token');
  return token;
}

export async function main() {
  try {
    const result = await client.getProjects.query();
    const project = await client.postProject.mutate(proj);
    console.log(result);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

main();
