import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // NextAuth is going to call this function here whenever one user tries to access route that has been protected. (we specified on matcher (middleware.js)).
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    // This function is called before they're actually signed in to the application.
    async signIn({ user, account, profile }) {
      // What we're gonna do here is to create a new guest when the user signs in for the first time. So when there isn't a guest with that email here yet on the guests supabase table, and while if there is one, then we don't do anything here.
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }

        //  In order to move on in the sign in process, we need to return true here.
        return true;
      } catch (error) {
        return false;
      }
    },
    // it runs after the sign in callback, and also each time that the session is checked out So, for example, when we call that auth function.
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  // Tell our auth.js that instead of going to default login page, go to our custom page.
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
