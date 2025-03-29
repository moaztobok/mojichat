import { clerkClient } from "@clerk/clerk-sdk-node"
import { Request, Response } from "express"
import { decodeClerkToken } from "../middleware/auth";

interface LoginRequest extends Request {
    body: {
        email_address: string;
        password: string;
    }
}

export const UserLogin = async (req: LoginRequest, res: Response) => {
    const { email_address, password } = req.body;
    if (!email_address || !password) {
        res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const users = await clerkClient.users.getUserList({
            emailAddress: [email_address],
        })
        if (users.data.length === 0) {
            res.status(404).json({ error: 'User not found' });
        }
        const signInToken = await clerkClient.signInTokens.createSignInToken({
            userId: users.data[0].id,
            expiresInSeconds: 60 * 60, // 1 hour
        })
        res.status(200).json({ message: 'User logged in', signInToken });
    } catch (error) {
        console.error('Error logging in user:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}   
export const getCurrentUser = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization
    if(!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' })
    }
    const sessionToken = authHeader.split(' ')[1];
  
    try {
        const sessionId = decodeClerkToken(sessionToken).sessionId;
    } catch (error) {
        
    }

}