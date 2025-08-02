"use client";

import ReportForm from "@/components/ReportForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SubmitPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect to login if not logged in
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-blue-50">
        <p className="text-gray-600 text-lg">Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex-1 p-4 sm:p-6 max-w-3xl mx-auto w-full">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Submit a Report
        </h1> */}
        <ReportForm />
      </div>
    </main>
  );
}
