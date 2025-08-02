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
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
        <div className="text-center">
          <p className="text-gray-700 text-lg font-semibold animate-pulse">
            Checking authentication...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-start justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl lg:max-w-3xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">
          Submit a New Report
        </h1>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 transition-all">
          <ReportForm />
        </div>
      </div>
    </main>
  );
}
