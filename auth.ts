import NextAuth from 'next-auth';
import BangumiProvider from './lib/bangumiProvider';

type Session = {
  user: {
    name: string;
    email: undefined;
    image: string;
  };
  expires: string;
  accessToken: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    BangumiProvider({
      clientId: process.env.NEXT_PUBLIC_BANGUMI_CLIENT_ID,
      clientSecret: process.env.BANGUMI_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // 如果需要在 Session 中保留 Bangumi 的 access_token，可以在这里处理
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // 将 access_token 传递到前端 session 中
      if (token.accessToken) {
        const customSession = session as unknown as Session;
        customSession.accessToken = token.accessToken as string;
        console.log('session', session);
      }
      return session;
    },
  },
});
