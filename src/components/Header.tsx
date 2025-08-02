"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, loading, signOut } = useAuth();

  return (
    <header className="w-full bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        TruthBeacon
      </Link>

      {!loading && (
        <nav className="flex gap-4 items-center">
          <Link href="/" className="text-gray-700 hover:text-black">
            Home
          </Link>

          <Link href="/submit" className="text-gray-700 hover:text-black">
            Submit Report
          </Link>

          {user ? (
            <>
              <Link
                href="/my-reports"
                className="text-gray-700 hover:text-black"
              >
                My Reports
              </Link>
              <button
                onClick={signOut}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Login
              </Link>
              {/* <Link
                href="/signup"
                className="text-gray-700 hover:text-black underline"
              >
                Sign Up
              </Link> */}
            </>
          )}
        </nav>
      )}
    </header>
  );
}
