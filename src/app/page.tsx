"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

// Define report type
type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  image_url?: string;
  upvotes?: number;
  status: string;
};

export default function HomePage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("status", "approved")
        .order("timestamp", { ascending: false });

      if (!error && data) {
        setReports(data as Report[]);
      } else {
        console.error("Error fetching approved reports:", error?.message);
      }
    };

    fetchReports();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-gray-800">
          Verified Reports
        </h1>

        {reports.length === 0 ? (
          <div className="text-center text-gray-600 text-lg mt-20">
            No approved reports available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Link key={report.id} href={`/report/${report.id}`}>
                <div className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col border border-gray-100">
                  {report.image_url && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={report.image_url}
                        alt={report.title}
                        fill
                        className="object-cover"
                      />
                    </div>
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
    </main>
  );
}
