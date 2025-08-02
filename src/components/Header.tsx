"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { user, signOut, isAdmin } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-extrabold text-blue-700 tracking-tight"
        >
          TruthBeacon
        </Link>

        <button
          className="sm:hidden text-gray-700 focus:outline-none text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className="hidden sm:flex items-center space-x-5">
          <Link
            href="/submit"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Submit Report
          </Link>

          {user && (
            <>
              <Link
                href="/my-reports"
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                My Reports
              </Link>
              <Link
                href="/about"
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                About
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-gray-700 font-semibold hover:text-blue-600 transition"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={signOut}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1.5 rounded-xl transition"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 flex flex-col space-y-3 bg-white border-t border-gray-100">
          <Link href="/submit" className="text-gray-700 hover:text-blue-600">
            Submit Report
          </Link>

          {user && (
            <>
              <Link
                href="/my-reports"
                className="text-gray-700 hover:text-blue-600"
              >
                My Reports
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={signOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-xl w-fit"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl w-fit"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
