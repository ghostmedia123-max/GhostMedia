export { default } from "next-auth/middleware"

// This configures the middleware to run on the specified paths.
// It will protect the /admin route and all of its sub-routes.
export const config = {
  // Match all routes under /admin, except for the /admin/login page.
  // This protects:
  // 1. The root /admin page.
  // 2. All sub-paths (/admin/...) except for /admin/login.
  matcher: ['/admin', '/admin/:path((?!login).*)'],
};