"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  image_url: string;
  timestamp: string;
  upvotes: number;
};

export default function ReportDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [report, setReport] = useState<Report | null>(null);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const { data: reportData, error: reportError } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .single();

      if (!reportError && reportData) {
        setReport(reportData);
      }

      if (user) {
        const { data: voteData, error: voteError } = await supabase
          .from("report_upvotes")
          .select("*")
          .eq("report_id", id)
          .eq("user_id", user.id)
          .single();

        if (voteData) setHasUpvoted(true);
        else if (voteError?.code === "PGRST116") setHasUpvoted(false);
      }

      setLoading(false);
    };

    fetchData();
  }, [id, user]);

  const handleUpvote = async () => {
    if (!user || !report || hasUpvoted) return;

    const { error } = await supabase.from("report_upvotes").insert([
      {
        report_id: report.id,
        user_id: user.id,
      },
    ]);

    if (error) return console.error("Upvote failed:", error.message);

    setHasUpvoted(true);

    const { count } = await supabase
      .from("report_upvotes")
      .select("*", { count: "exact", head: true })
      .eq("report_id", report.id);

    setReport({ ...report, upvotes: count ?? 0 });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 md:p-8">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading report...</p>
        ) : report ? (
          <>
            {report.image_url && (
              <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
                <Image
                  src={report.image_url}
                  alt={report.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 700px"
                  priority
                />
              </div>
            )}

            <h1 className="text-3xl font-bold mb-2 text-indigo-800">
              {report.title}
            </h1>

            <div className="text-sm text-gray-500 mb-2">
              📍 {report.location} · 🏷️ {report.category}
            </div>
            <div className="text-xs text-gray-400 mb-4">
              🕒 {new Date(report.timestamp).toLocaleString()}
            </div>

            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">
              {report.description}
            </p>

            <div className="flex items-center justify-between">
              <p className="text-sm text-green-600 font-medium">
                👍 {report.upvotes ?? 0} upvotes
              </p>

              {user ? (
                hasUpvoted ? (
                  <span className="text-sm text-gray-400">Already upvoted</span>
                ) : (
                  <button
                    onClick={handleUpvote}
                    className="px-4 py-1 rounded-xl text-sm font-semibold border border-green-300 bg-green-100 text-green-700 hover:bg-green-200 transition"
                  >
                    Upvote
                  </button>
                )
              ) : (
                <span className="text-sm text-gray-400">Login to upvote</span>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 text-lg">Report not found.</p>
        )}
      </div>
    </main>
  );
}
