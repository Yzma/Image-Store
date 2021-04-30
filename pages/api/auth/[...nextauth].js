import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const NextAuthProvider = NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_ID_SECRET,
    }),

    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_ID_SECRET,
    }),
  ],

  adapter: Adapters.Prisma.Adapter({ prisma }),
})

export default NextAuthProvider
