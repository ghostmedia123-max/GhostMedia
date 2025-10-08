'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  const handleSignOut = () => {
    // Redirect to the homepage after sign out. This is a neutral, non-protected
    // route that provides a better user experience than the login page.
    signOut({ callbackUrl: '/' });
  };

  return (
    <button
      onClick={handleSignOut}
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      Sign Out
    </button>
  );
}