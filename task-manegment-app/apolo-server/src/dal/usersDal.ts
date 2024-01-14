import { Request, Response } from 'express';
import User from '../sequelize/model';
import {RegisterUserAttributes,UserInterface} from '../types/user'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import {v4 as uuidv4} from "uuid"


const JWT_SECRET = process.env.JWT_SECRET || 'secret';


export async function findUserByEmail(email: string) {
        return await User.findOne({ where: { email } });
}
export async function findUserByToken(token: string) {
   
}


async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

function generateToken(userId: number): string {
    return jwt.sign({ id: userId }, JWT_SECRET);
}


function verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.log(error);
    }
  }
  async function userRegister(user: UserInterface): Promise<{ token: string, message: string, id: string } | string> {
    const { username, email, password } = user;
    if (email === "") console.log("write email!! not empy string \"\"");
    console.log("email", email);
    
    if (!username || !email || !password) {
      return 'Please provide username, email, and password';
    }
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return 'Email already in use';
      }
      const password_hash = await bcrypt.hash(password, 10);
      const id = uuidv4();
      const newUser = await User.create({ username, email, password_hash, id });
      const userSignd = newUser.get();
      const token = generateToken(userSignd.id as unknown as number);
      return { id, token, message: 'User created successfully' };
    } catch (error) {
      console.error(error);
      return 'Internal server error';
    }
  }
  
  async function userLogin(email: string, password: string): Promise<any> {
    if (!email || !password) {
      return 'Please provide email and password';
    }
    try {
      const existingUser = await findUserByEmail(email);
      const userValdite = existingUser?.get();
      if (!userValdite) {
        throw new GraphQLError('we couldn\'t find this user', {
          extensions: {
            http: { status: 200 },
          },
        });
      }
      const isMatch = await validatePassword(password, userValdite.password_hash);
      if (!isMatch) {
        return 'Invalid email or password';
      }
      return 'User logged in successfully';
    } catch (error) {
      console.error(error);
      return 'Internal server error';
    }
  }
  

export { userRegister, userLogin  };
