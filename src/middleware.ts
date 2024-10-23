import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { auth } from '@/auth';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// export const middleware = auth((request) => {
//   // `callbacks.authorized` will be called as part of the wrapper
//   // You have access to request.auth

//   const headers = new Headers(request.headers);
//   headers.set('x-forwarded', request.url);

//   // ...
// });
