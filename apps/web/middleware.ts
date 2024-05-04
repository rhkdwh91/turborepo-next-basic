import { withAuth } from "next-auth/middleware";

export default withAuth(function (req) {
  console.log(req);
}, {});

export const config = {
  matcher: ["/post/write", "/post/modify/:path*", "/my"],
};
