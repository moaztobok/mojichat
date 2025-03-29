import { LoginForm } from '@/components/auth/login-form'
import { SignedOut, useAuth } from '@clerk/clerk-react'
import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { isSignedIn } = useAuth()
    const navigate = useNavigate()
    useLayoutEffect(() => {
        if (isSignedIn) {
            navigate('/')
        }
    }, [isSignedIn, navigate])
    return (
        <SignedOut >
            <LoginForm />
        </SignedOut>
    )
}

export default Login