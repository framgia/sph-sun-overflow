import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { Session } from 'next-auth'

export interface ISession extends Session {
    accessToken?: string
}

export default NextAuth({
    debug: true,
    callbacks: {
        jwt({ token, account }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        session({ session, token, user }) {
            // The return type will match the one returned in `useSession()`
            const newSession: ISession = session
            newSession.accessToken = token.accessToken as string

            return newSession
        },
    },
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            httpOptions: {
                timeout: 40000,
            },
        }),
        // ...add more providers here
    ],
})
