import { authMiddleware } from "@clerk/nextjs";
import { getLink } from "./utils/postgres/actions";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  async beforeAuth(req) {
    const parsedUrl = new URL(req.url);

    if (parsedUrl.pathname.includes("/l/")) {
      // pathname is like "/l/alias"
      // split gives ['', 'l', 'alias']
      const alias = parsedUrl.pathname.split("/")[2];

      const result = await getLink(alias);
      if (result.ok) {
        return NextResponse.redirect(result.value);
      } else {
        return NextResponse.redirect(parsedUrl.origin + "/404");
      }
    }
  },
  publicRoutes: ["/", "/404"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
