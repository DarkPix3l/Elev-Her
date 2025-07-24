import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

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
          
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            token: data.token, // the famous token coming from the backend
            avatar: data.user.avatar,
          };
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

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // assigning properties that are required in backend when decoding the token
        token.accessToken = user.token;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.avatar= user.avatar;
      }

      if (account?.provider === "google") {
        const res = await fetch(`${process.env.API_BASE_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_token: account.id_token }),
        });
        const data = await res.json();

        token.id = data.user.id;
        token.avatar = data.user.avatar;
        token.accessToken = data.token;
      }
      return token;
    },
   
    session({ session, token }) {
     
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        avatar: token.avatar,
      };
      session.accessToken = token.accessToken;
      return session;
    },
  },
});