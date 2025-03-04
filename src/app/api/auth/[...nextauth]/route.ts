import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (!account || !profile) {
        console.error("SignIn callback missing account or profile");
        return false;
      }

      if (account.provider === "google") {
        const email = profile.email;
        const allowedEmails = [
          "@growthbdm.com",
          "alberto.balderas@growthbdm.com",
          "adriana.vargas@growthbdm.com"
        ];

        return allowedEmails.some(allowed => 
          email === allowed || (allowed.startsWith("@") && email?.endsWith(allowed))
        );
      }
      return false;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
