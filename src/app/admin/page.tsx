"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // make sure this exists

type Report = {
  id: number;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  status: string;
};

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);

  // Block unauthorized users
  useEffect(() => {
    if (!loading && user?.email !== "demo@abc.com") {
      router.push("/");
    }
  }, [user, loading]);

  useEffect(() => {
    if (user?.email === "demo@abc.com") {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("status", "pending")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error.message);
    } else {
      setReports(data as Report[]);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (user?.email !== "demo@abc.com") return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">
          TruthBeacon Admin Panel
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Pending Reports
        </h2>

        {reports.length === 0 ? (
          <p className="text-center text-gray-500">No pending reports.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <Link
                key={report.id}
                href={`/admin/${report.id}`}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {report.title}
                </h2>
                <p className="text-gray-600 mb-1">
                  <strong>Location:</strong> {report.location}
                </p>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  <strong>Description:</strong> {report.description}
                </p>
                <p className="text-sm text-gray-400">
                  Submitted: {new Date(report.timestamp).toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t px-6 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TruthBeacon. All rights reserved.
      </footer>
    </div>
  );
}
