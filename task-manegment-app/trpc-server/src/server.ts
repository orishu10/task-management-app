import { sequelize } from './DB';
import Project from "./sequelize/modal";
import { initTRPC  } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { publicProcedure, router,t } from './trpc';
import { z } from 'zod';
import express from 'express';
import cors from 'cors';
import { appRouter } from './index'; // Ensure this import points to the right location of your appRouter

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// tRPC middleware
app.use('/trpc', createExpressMiddleware({
  router: appRouter
}));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export type AppRouter = typeof appRouter;
