import Google from "next-auth/providers/google";

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
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
}; 