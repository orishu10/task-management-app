import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../trpc-server/src/server.js';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
     
    }),
  ],
});

export async function main() {
    const result = await client.getProjects.query()
    console.log(result)
}

main();


