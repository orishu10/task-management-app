import { gql } from "apollo-server-express";
import { userRegister, userLogin, findUserById } from "../../dal/usersDal";
import { Request, Response } from 'express';
import { ResponseUserAttributes, RegisterUserAttributes } from '../../types/user';

export type User = {
    username: string;
    email: string;
    password: string;
    token: string;
    id: string;
};


const users = [
    { username: "ori", email: "ori@gmail.com", password: "PASSWORD", token: "" },
    { username: "james", email: "james@gmail.com", password: "PASSWORD", token: "" },
    { username: "james2", email: "james2@gmail.com", password: "PASSWORD", token: "" },
    { username: "james3", email: "james3@gmail.com", password: "PASSWORD", token: "" },
]



const resolvers = {
    Query: {
        // userName:async (_:any, args:any) => {
        //     const user = findUserById(args.id);
        //     return user;
        // }

    },
    Mutation: {

        signIn: async (_: any, args: User) => {
            try {
                const data = await userLogin(args.email, args.password);
                //   console.log(data,'from resolvers');
                if (!data) {
                    console.log('no data found');
                    return { success: false, message: "Login failed" };
                }
                const token = data.token;
                return { success: true, token, user: data.user };
            } catch (error) {
                throw new Error('Failed to login');
            }
        },

        signUp: async (_: any, args: User) => {
            console.log(args.username, args.email, args.password, 'hi from reslovers ');
            const username = args.username
            const email = args.email
            const password = args.password
            try {
                console.log('in resolver:', username, email, password);
                const data = await userRegister(username, email, password);
                console.log(data);
                return (data);
            } catch (error) {
                throw new Error('Failed to register user');
            }

        }
    }
}









export default resolvers;
