import { ClerkProvider } from "@clerk/clerk-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from 'react'
import { Toaster } from "sonner"
import { ThemeProvider } from "./thene-provider"
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
}


const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <QueryClientProvider client={new QueryClient()}>
                <ThemeProvider>

                    <Toaster />
                    {children}
                </ThemeProvider>

            </QueryClientProvider>
        </ClerkProvider>
    )
}

export default Providers