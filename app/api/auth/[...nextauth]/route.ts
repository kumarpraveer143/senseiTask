import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.clientId as string,
            clientSecret: process.env.clientSecret as string,
        }),
        // ...add more providers here
    ],
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }