import {withAuth} from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({token}) => {
      // The token will exist if the user is authenticated
      return !!token
    },
  },
})

export const config = {
  // Protect the /admin route
  matcher: ['/admin'],
}