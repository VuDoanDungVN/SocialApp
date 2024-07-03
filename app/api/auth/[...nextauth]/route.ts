import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/app/_utils/prismaSingleton';

const handler = NextAuth({
  theme: {
    colorScheme: 'light',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Nhập email của bạn',
        },
        password: { label: 'Password', type: 'password', placeholder: 'Nhập password của bạn' },
      },
      authorize: async (credentials, req) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      const SESSION_EXPIRES_SECOND = 60 * 60;
      const nowUnixtime = Math.floor(Date.now() / 1000);
      if (account && user) {
        const sessionExpires = nowUnixtime + SESSION_EXPIRES_SECOND;
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.accessTokenExpires,
          sessionExpires: sessionExpires,
        };
      }

      if (token.sessionExpires > nowUnixtime) {
        token.sessionExpires = nowUnixtime + SESSION_EXPIRES_SECOND;
      } else {
        return Promise.reject({
          error: new Error('token has expired. Please log in again.'),
        });
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
