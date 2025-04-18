// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }

import { auth } from "./app/_lib/auth";
// auth search
export const middleware = auth;

export const config = {
  // specify the routes that middleware should run by default it gonna run on every route.
  matcher: ["/account"],
};
