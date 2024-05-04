import { withAuth } from "next-auth/middleware";

export default withAuth(function () {}, {});

export const config = {
  matcher: ["/post/write", "/post/modify/:path*", "/my"],
};
