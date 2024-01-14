import { sequelize } from './DB';
import Project from "./sequelize/modal";
import { publicProcedure, router } from './trpc';
import { z } from 'zod';

const appRouter = router({
  userList: {
input: z.object({
      // Define your input schema here
      // For example, if you have a 'title' and 'assignments' field
      title: z.string(),
      assignments: z.array(z.string()),
    }),
    resolve: async ({ input }:any) => {
      const newProject = await Project.create({
        title: input.title,
        assignments: input.assignments,
      });
      return newProject;
    },    
  },
});

export type AppRouter = typeof appRouter;
