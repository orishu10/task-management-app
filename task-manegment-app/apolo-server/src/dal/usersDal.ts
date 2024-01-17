import { Request, Response } from 'express';
import User from '../sequelize/model';
import {RegisterUserAttributes,UserInterface} from '../types/user'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

export type UserInterfaceForLogIn = {
  username: string;
  email: string;
  password?: string;
  id : string;
};
interface LoginResponse {
  success: boolean;
  message: string;
  user: UserInterfaceForLogIn | null; 
  token?: string;
}



const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function findUserByEmail(email: string) {
        return await User.findOne({ where: { email } });
}
export async function findUserById(id: string) {
        return await User.findOne({ where: { id } });
}


async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

function generateToken(userId: string): string {
    return jwt.sign({ id: userId }, JWT_SECRET);
}

function verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.log(error);
    }
  }
  async function userRegister(username:string,email:string,password:string): Promise<{  message: string,userSignd :any,success :Boolean} | string> {
    if (email === "") console.log("write email!! not empy string \"\"");
    if (!username || !email || !password) {
      return 'Please provide username, email, and password';
    }
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        console.log(existingUser, 'user already exist');
        return 'Email already in use';
      }
      const password_hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password_hash });
      const user = newUser.get();
      console.log(user, "user signd");
      return { userSignd: user, message: 'User created successfully' ,success: true};
    } catch (error) {
      console.error(error);
      return 'Internal server error';
    }
  }

  
  async function userLogin(email: string, password: string): Promise<LoginResponse> {
    if (!email || !password) {
      return { success: false, message: 'Please provide email and password', user: null };
    }
    try {
      const existingUser = await findUserByEmail(email);
      const user = existingUser?.get();
      if (!user) {
        return { success: false, message: 'Invalid email or password', user: null };
      }
      const isMatch = await validatePassword(password, user.password_hash);
      if (!isMatch) {
        return { success: false, message: 'Invalid email or password', user: null };
      }
      const token = generateToken(user.id);
      return { success: true, message: 'User logged in successfully', user:user, token: token };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal server error', user: null };
    }
  }
    

export { userRegister, userLogin  };
