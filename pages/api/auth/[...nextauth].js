import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import prisma from '../../../util/prisma'

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
  callbacks: {
    async session(session, user) {
      return {...session,
        user: {
          ...user,
        },
      }
    }
  },

  secret: process.env.SECRET,
  adapter: Adapters.Prisma.Adapter({ prisma }),
})

export default NextAuthProvider
