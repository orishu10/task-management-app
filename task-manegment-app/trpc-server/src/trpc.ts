import { initTRPC, TRPCError } from '@trpc/server';
import type {  createContext } from './context';



export const t = initTRPC.context<typeof createContext>().create();

const isAdminMiddleware = t.middleware(({ctx , next}) =>{
    if (!ctx.isAdmin) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
         message : 'Invalid credentials',
      });
    }
    return next();

})

export const publicProcedure = t.procedure;
export const adminProcedures = t.procedure.use(isAdminMiddleware)
export const router = t.router;