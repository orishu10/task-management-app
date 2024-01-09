import { gql } from "apollo-server-express";
import {userRegister,login} from "../../dal/usersDal";
import { Request, Response } from 'express';
import {RegisterResponsetBody,RegisterRequestBody}  from '../../types/user';

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    token: string;
};

export interface Res extends Response  {
    id: number;
    username: string;
    email: string;
    password: string;
    token: string;
};


const resolvers = {
    Query: {
        user: async (_: any, _args: any, context: any): Promise<User[]> => {
            const req: Request = context.req;
            const res: Response = context.res;
            try {
                const data = await userRegister(req, res);
                return Array.isArray(data) ? data : [];
            } catch (error) {
                throw new Error("Error fetching users");
            }
        }
    },
    Mutation: {
        login: async (_: any, args: { email: string; password: string }, context: any) => {
            // const req: Request = {...context.req, body: args} as Request;
            // const res: Res = context.res;
            // try {
            //     const data = await login(req, res);
            //     if (res.statusCode === 200) {
            //         return data;
            //     } else {
            //         throw new Error('failed to login');
            //     }
            // } catch (error) {
            //     throw new Error('failed to login');
            // }
            return 5;
        }
    }
};

export default resolvers;
