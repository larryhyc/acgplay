// import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   secret:
//     process.env.AUTH_SECRET ||
//     process.env.NEXTAUTH_SECRET ||
//     'acgplay_secret_key_2026',
//   providers: [
//     Credentials({
//       id: 'bangumi',
//       name: 'Bangumi',
//       credentials: {
//         code: { label: 'Code', type: 'text' },
//       },
//       async authorize(credentials) {
//         const code = credentials?.code as string;
//         if (!code) return null;

//         try {
//           // 1. 拿着 code 去 Bangumi 换 access_token
//           const tokenRes = await fetch('https://bgm.tv/oauth/access_token', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//               'User-Agent': 'ACGPlay/1.0.0 (https://github.com/acgplay)',
//             },
//             body: new URLSearchParams({
//               grant_type: 'authorization_code',
//               client_id: process.env.NEXT_PUBLIC_BANGUMI_CLIENT_ID!,
//               client_secret: process.env.BANGUMI_CLIENT_SECRET!,
//               code: code,
//               redirect_uri: 'http://localhost:3000/api/auth/callback/bangumi',
//             }),
//           });

//           if (!tokenRes.ok) return null;
//           const tokenData = await tokenRes.json();

//           // 2. 拿着 access_token 去拿用户信息
//           const userRes = await fetch('https://api.bgm.tv/v0/me', {
//             headers: {
//               Authorization: `Bearer ${tokenData.access_token}`,
//               'User-Agent': 'ACGPlay/1.0.0 (https://github.com/acgplay)',
//             },
//           });

//           if (!userRes.ok) return null;
//           const userData = await userRes.json();

//           // 3. 返回用户信息给 Auth.js 建立 Session
//           return {
//             id: String(userData.id || userData.username),
//             name: userData.nickname || userData.username,
//             image: userData.avatar?.large || userData.avatar?.medium || '',
//             accessToken: tokenData.access_token,
//           };
//         } catch (error) {
//           console.error('Bangumi OAuth Error:', error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.accessToken = (user as any).accessToken;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         accessToken: token.accessToken as string,
//       };
//     },
//   },
//   pages: {
//     signIn: '/login',
//   },
// });
