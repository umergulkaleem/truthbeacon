"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReportDetailPage() {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    const fetchReport = async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching report:", error.message);
      } else {
        setReport(data);
      }
    };

    if (id) fetchReport();
  }, [id]);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-indigo-100">
      <Header />
      <div className="flex-1 p-4 sm:p-6 max-w-3xl mx-auto text-gray-800">
        {report ? (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {report.image_url && (
              <img
                src={report.image_url}
                alt={report.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
            )}

            <h1 className="text-3xl font-bold mb-2">{report.title}</h1>

            <p className="text-sm text-gray-500 mb-1">
              📍 {report.location} · 🏷️ {report.category}
            </p>

            <p className="text-xs text-gray-400 mb-4">
              🕒 {new Date(report.timestamp).toLocaleString()}
            </p>

            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">
              {report.description}
            </p>

            <p className="text-sm text-green-600 font-medium">
              👍 {report.upvotes ?? 0} upvotes
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg">
            Loading report...
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
