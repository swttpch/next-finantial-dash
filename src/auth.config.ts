import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    redirect: async ({ url }) => {
      return Promise.resolve(url);
    },
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      if (!isLoggedIn) {
        return false;
      }

      return true;
    },
  },
  secret: process.env.JWT_SECRET,
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
