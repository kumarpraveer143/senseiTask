'use client'

import Google from "@/components/logo/google"
import { ModeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

const SignInForm = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <Button onClick={() => signIn('google', { callbackUrl: '/' })} className="flex jutify-center items-center gap-2">
                <Google /> Sign In with Google
            </Button>
        </div>
    )
}

export default SignInForm