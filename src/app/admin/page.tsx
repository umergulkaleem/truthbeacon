"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Report = {
  id: number;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  status: string;
};

export default function AdminPage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

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

  const handleStatusUpdate = async (
    id: number,
    status: "approved" | "rejected"
  ) => {
    const { error } = await supabase
      .from("reports")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(`Failed to ${status} report:`, error.message);
    } else {
      // Remove from state after update
      setReports(reports.filter((r) => r.id !== id));
    }
  };

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
              <div
                key={report.id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {report.title}
                </h2>
                <p className="text-gray-600 mb-1">
                  <strong>Location:</strong> {report.location}
                </p>
                <p className="text-gray-600 mb-3">
                  <strong>Description:</strong> {report.description}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Submitted at: {new Date(report.timestamp).toLocaleString()}
                </p>

                <div className="flex justify-between">
                  <button
                    onClick={() => handleStatusUpdate(report.id, "approved")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(report.id, "rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Reject
                  </button>
                </div>
              </div>
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
