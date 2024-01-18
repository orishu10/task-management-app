import { z } from 'zod';
import Project from './sequelize/modal';
import { adminProcedures, publicProcedure, router, t } from './trpc';


const PostProjectSchema = z.object({
  title: z.string(),
  assignments: z.array(z.string()),
  user_id: z.string(),
});

export const appRouter = router({
  getProjects: adminProcedures.query(() => {
    return Project.findAll();
  }),
    secretData : adminProcedures.query(() => {
      return Project.findAll();
    }),
   postProject: adminProcedures
    .input(PostProjectSchema) 
    .mutation(async ({ input }) => {
      console.log(input,'input from trpc mutation');
      console.log('input from trpc mutation');
      const newProject = await Project.create({
        title: input.title,
        assignments: input.assignments,
        user_id: input.user_id,
      });
      return newProject;
    }),
});
