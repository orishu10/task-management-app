import { gql } from "apollo-server-express";
import { userRegister, userLogin } from "../../dal/usersDal";
import { Request, Response } from 'express';
import { ResponseUserAttributes, RegisterUserAttributes } from '../../types/user';

export type User = {
    username: string;
    email: string;
    password: string;
    token: string;
    id : string;
};


const users = [
    { username: "ori", email: "ori@gmail.com", password: "PASSWORD", token: "" },
    { username: "james", email: "james@gmail.com", password: "PASSWORD", token: "" },
    { username: "james2", email: "james2@gmail.com", password: "PASSWORD", token: "" },
    { username: "james3", email: "james3@gmail.com", password: "PASSWORD", token: "" },
]
    


const resolvers = {
    Query: {
        users: () => {
            return users;
        }

    },
    Mutation: {

        registerUser: async (_:any, args: User) => {
            try {
                console.log("args", args);
                const data = await userRegister(args);
                return data; 
            } catch (error) {
                throw new Error('Failed to register user');
            }
        },
        loginUser: async (_: any, args: User) => {
            try {
                const data = await userLogin(args.email, args.password);
                if (!data) {
                    return null;
                }
                return data;
            } catch (error) {
                throw new Error('Failed to login');
            }
        }
    }
};









export default resolvers;
