import { sequelize } from './DB';
import Project from "./sequelize/modal";
import { initTRPC  } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { publicProcedure, router,t } from './trpc';
import { z } from 'zod';
import express from 'express';
import cors from 'cors';
import { appRouter } from './projects'; 
import jwt from 'jsonwebtoken';
import { createContext } from './context';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
  }
}

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());




app.use('/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
}));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export type AppRouter = typeof appRouter;
