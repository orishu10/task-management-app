import * as trpcNext from '@trpc/server/adapters/next';
import { verifyToken } from './server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET || 'secret';


export async function createContext({
  req,
  res,
}: CreateNextContextOptions){
  try {
    
    const token = req.headers.authorization 
    console.log(token,'test token');
    console.log(JWT_SECRET, 'test token secret');
    if (token) {
        jwt.verify(token, JWT_SECRET);
        console.log(token, 'valid token');
        
        return {
          req,
          res,
          isAdmin: true,
        };
      } else {
      console.log(token, 'not a valid token');
        return {
            req,
            res,
            isAdmin: false,
        };
    }
} catch (error) {
    console.error('Error verifying JWT:', error);
    return {
        req,
        res,
        isAdmin: false,
    };
}
}
export type Context = Awaited<ReturnType<typeof createContext>>;