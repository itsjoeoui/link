import { authMiddleware } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getLink } from "./utils/postgres/actions";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  async beforeAuth(req) {
    const parsedUrl = new URL(req.url);
    if (parsedUrl.pathname.includes("/l/")) {
      const alias = parsedUrl.pathname.split("/l/")[1];
      console.log(alias);

      const destination = await getLink(alias);
      return NextResponse.rewrite(destination);
    }
  },
  publicRoutes: ["/", "/l"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
