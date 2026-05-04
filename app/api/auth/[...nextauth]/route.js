import { connectDB } from "@/lib/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        const { email, password } = credentials || {}
        const db = await connectDB()
        const user = await db.collection('users').findOne({email})
        if(!user) {
          throw new Error("Email not found")
        }

        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid){
          throw new Error("Invalid password")
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages:{
    signIn: "/login",
  }
});

export { handler as GET, handler as POST };