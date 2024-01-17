import { publicProcedure, router,t } from './trpc';


const appRouter = router({
    getProjects: t.procedure.query(() => {
      return Project.findAll();
    })
  })
  