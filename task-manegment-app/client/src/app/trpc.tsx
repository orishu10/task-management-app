import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

const client = createTRPCProxyClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      async headers() {
        async function getAuthCookie() {
            
        }
        // Replace `getAuthCookie` with your method of retrieving auth tokens
        return {
          authorization: getAuthCookie(),
        };
      },
    }),
  ],
});
