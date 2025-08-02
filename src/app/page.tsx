"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("status", "approved")
        .order("timestamp", { ascending: false });

      if (!error && data) {
        setReports(data);
      } else {
        console.error("Error fetching approved reports:", error?.message);
      }
    };

    fetchReports();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-gray-300">
      <Header />
      <div className="flex-1 p-4 sm:p-6 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          🛡️ Verified Reports
        </h1>

        {reports.length === 0 ? (
          <p className="text-gray-600 text-center">
            No approved reports available.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <Link key={report.id} href={`/report/${report.id}`}>
                <div className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col">
                  {report.image_url && (
                    <img
                      src={report.image_url}
                      alt={report.title}
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <div className="p-4 flex flex-col gap-1">
                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {report.title}
                    </h2>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {report.description}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      📍 {report.location || "Unknown location"}
                    </div>
                    <div className="text-xs text-gray-400">
                      🕒 {new Date(report.timestamp).toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600 font-medium mt-2">
                      👍 {report.upvotes ?? 0} upvotes
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
