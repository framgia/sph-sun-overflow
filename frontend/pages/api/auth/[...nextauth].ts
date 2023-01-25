import { setUserToken } from "@/helpers/localStorageHelper";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  debug: true,
  callbacks: {
    jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    },
    session({ session, token, user }) {
      // The return type will match the one returned in `useSession()`
      session.accessToken = token.accessToken
      session.user.id = token.id
      
      return session
    },
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 40000,
      },
    }),
    // ...add more providers here
  ],
})
