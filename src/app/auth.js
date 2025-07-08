import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import jwt from "jsonwebtoken";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },

      authorize: async (credentials) => {
        let { email, password } = credentials;
  
        try {
          let response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
            method: "POST",

            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          let data = await response.json();

          if (!response.ok) throw new Error(data.message);

          return data;
        } catch (error) {
        
          throw new Error(error.message);
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  jwt: {
    async encode(params) {
      // params.token is the token returned in the jwt callback
      return jwt.sign(
        { id: params.token?.id, accessToken: params.token?.accessToken },
        process.env.AUTH_SECRET
      );
    },
    async decode(params) {
      return jwt.verify(params.token, process.env.AUTH_SECRET);
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // assigning properties that are required in backend when decoding the token
        token.id = user.id;
        token.accessToken = user.token;
      }

      if (account?.provider === "google") {
        const res = await fetch(`${process.env.API_BASE_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_token: account.id_token }),
        });
        const data = await res.json();

        token.id = data.id;
        token.accessToken = data.token;
      }
      return token;
    },
    // encode function is called between jwt and session
    // token is the encoded object in the encode function
    session({ session, token }) {
      // session.access_token is the token generated in our custom api
      session.accessToken = token.accessToken;
      session.id = token.id;
      return session;
    },
  },
});
