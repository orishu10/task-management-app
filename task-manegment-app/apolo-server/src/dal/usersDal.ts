import { Request, Response } from 'express';
import User from '../sequelize/model';
import {RegisterResponsetBody} from '../types/user'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'secret';


export async function findUserByEmail(email: string) {
    return await User.findOne({ where: { email } });
}
export async function findUserByToken(token: string) {
    //?
}

async function createUser(username: string, email: string, passwordHash: string) {
    return User.create({ username, email, password_hash: passwordHash });
}

async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

function generateToken(userId: number): string {
    return jwt.sign({ id: userId }, JWT_SECRET);
}

async function userRegister(req: Request, res: Response): Promise<Response> {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await createUser(username, email, passwordHash);
        
        const token = generateToken(newUser.id);
        return res.status(201).json({ token, message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


async function login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const existingUser = await findUserByEmail(email);
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await validatePassword(password, existingUser.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(existingUser.id);
        return res.status(200).json({ token, message: 'User logged in successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export { userRegister, login };
