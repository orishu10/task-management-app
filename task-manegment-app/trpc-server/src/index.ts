import { z } from 'zod';
import Project from './sequelize/modal';
import { publicProcedure, router, t } from './trpc';

// Define your input validation schema using Zod
const PostProjectSchema = z.object({
  title: z.string(),
  assignments: z.array(z.string()),
  userId: z.string(),
});

export const appRouter = router({
  getProjects: t.procedure.query(() => {
    return Project.findAll();
  }),
   postProject: t.procedure
    .input(PostProjectSchema) 
    .mutation(async ({ input }) => {
      const newProject = await Project.create({
        title: input.title,
        assignments: input.assignments,
        userId: input.userId,
      });
      return newProject;
    }),
});
