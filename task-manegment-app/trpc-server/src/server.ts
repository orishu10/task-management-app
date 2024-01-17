import { sequelize } from './DB';
import Project from "./sequelize/modal";
import { initTRPC  } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { publicProcedure, router,t } from './trpc';
import { z } from 'zod';
import express  from 'express';
import cors from 'cors';


interface PostProject {
  title: string;
  assignements: string[];
  userId : string;
}



const port = process.env.PORT || 3000;

// const project = t.procedure.input(async ({ input }: PostProject) => {
//   const newProject = await Project.create({
//     title: input.title,
//     assignments: input.assignments,
//     userId: input.userId
//   });
//   return newProject; 
// });

const appRouter = router({
  getProjects: t.procedure.query(() => {
    return Project.findAll();
  }),
  // CreatProject :project 
})


const app = express();

app.use(cors());
app.use(express.json());

app.use('/trpc', createExpressMiddleware({router: appRouter}))

app.listen(port);
console.log(`App listening on port ${port}`);



export type AppRouter = typeof appRouter;
