import { sequelize ,connectToDB } from './DB';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';
import { appRouter } from './projects'; 
import jwt from 'jsonwebtoken';
import { createContext } from './context';
import 'dotenv/config'


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
  connectToDB();
  console.log(`Server is running on http://localhost:${port}`);
});

export type AppRouter = typeof appRouter;
