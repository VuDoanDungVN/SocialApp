import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    sessionExpires: number;
  }
}
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      refreshToken: string;
      accessTokenExpires: string;
      sessionExpires: number;
    } & DefaultSession['user'];
  }
}
