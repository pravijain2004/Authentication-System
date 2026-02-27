import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  try {
    const res = await axios.post("/auth/login", {
      username: credentials?.username,
      password: credentials?.password,
      expiresInMins: 30,
    });

    const user = res.data;
    console.log("API Response:", user); // ← add this to see what API returns

    if (user) {
      return {
        id: String(user.id),
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        image: user.image,
        token: user.accessToken, // ← dummyjson returns accessToken not token
      };
    }
    return null;
  } catch (error) {
    console.error("Auth error:", error); // ← add this to see the error
    return null; // ← return null instead of throwing
  }
},
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token;
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      (session.user as any).id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };