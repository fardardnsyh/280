  import NextAuth from "next-auth";
  import { PrismaAdapter } from "@auth/prisma-adapter";
  import  prisma from "./app/libs/db";
  import authConfig from "./auth.config"

 
  export const { handlers, auth, signIn, signOut } = NextAuth({
    
    callbacks: {  
      async session({ token, session}) {
        session.user.accessToken = token.accessToken 
        session.user.id = token.sub ;
       
        return session;
      },
      async jwt({ token, user , account}) {
        if (account?.provider === "Prisma") {
          return { ...token, accessToken: account.access_token }
        }
        if (user && account) { 
          token.id = user.id
          token.accessToken = account.access_token
          token.id = account.id
        }
      
        
        return token
      },
      
      
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    ...authConfig,
  });
