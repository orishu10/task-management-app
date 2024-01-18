import * as trpcNext from '@trpc/server/adapters/next';
import { verifyToken } from './server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function createContext({
  req,
  res,
}: CreateNextContextOptions){
    const token = jwt.verify( 
      req.headers.authorization,JWT_SECRET
    );
    if (!token) {
    return {
        req,
        res,
        isAdmin: true,
    }}
    return {
        req,
        res,
        isAdmin: false,
    }}



  
export type Context = Awaited<ReturnType<typeof createContext>>;