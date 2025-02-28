import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Aquí puedes agregar más usuarios según necesites
        const validUsers = [
          { id: "1", name: "Admin", email: "admin@growthbdm.com", password: "admin123" }
        ];

        const user = validUsers.find(
          (user) => 
            credentials?.username === user.email && 
            credentials?.password === user.password
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/dashboard/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
})

export { handler as GET, handler as POST }
