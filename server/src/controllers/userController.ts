import { clerkClient } from "@clerk/express"
import { Request, Response } from "express"
// Function to validate user data before creating a user
const validateUserData = (userData: any) => {
    const { email, username, password } = userData
    if (!email || !username || !password) {
        throw new Error('Missing required fields')
    }

    // Additional validation logic can be added here (e.g., email format, password strength)
}

export const createUser = async (req: Request, res: Response) => {
    const userData = req.body
    console.log('User data :', userData)

    try {
        const user = await clerkClient.users.createUser(userData)
        res.status(200).json({ message: 'User created', user  })
    } catch (error: any) {
        console.log('Error:', error)
        if (error.status === 422 && error.errors) {
            console.log('Clerk API Error Details:', error.errors)
            res.status(422).json({ error: 'Unprocessable Entity', details: error.errors })
        } else if (error.message === 'Missing required fields') {
            res.status(400).json({ error: error.message })
        } else {
            res.status(500).json({ error: 'Error creating user' })
        }
    }
}
