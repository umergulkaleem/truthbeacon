"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { useAuth } from "@/context/AuthContext";

export default function ReportDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [report, setReport] = useState<any>(null);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      // Get report
      const { data: reportData, error: reportError } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .single();

      if (reportError) {
        console.error("Error fetching report:", reportError.message);
      } else {
        setReport(reportData);
      }

      // Check if user has upvoted
      if (user) {
        const { data: voteData, error: voteError } = await supabase
          .from("report_upvotes")
          .select("*")
          .eq("report_id", id)
          .eq("user_id", user.id)
          .single();

        if (voteData) setHasUpvoted(true);
        else if (voteError?.code === "PGRST116") setHasUpvoted(false); // not found
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

    if (error) {
      console.error("Upvote failed:", error.message);
      return;
    }

    setHasUpvoted(true);

    // Optionally re-fetch report to get accurate upvote count
    const { data: upvotes } = await supabase
      .from("report_upvotes")
      .select("*", { count: "exact", head: true })
      .eq("report_id", report.id);

    setReport({ ...report, upvotes: upvotes?.length ?? 0 });
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-indigo-100">
      <div className="flex-1 p-4 sm:p-6 max-w-3xl mx-auto text-gray-800">
        {loading ? (
          <div className="text-center text-gray-600 text-lg">
            Loading report...
          </div>
        ) : report ? (
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

            <div className="flex items-center gap-3">
              <p className="text-sm text-green-600 font-medium">
                👍 {report.upvotes ?? 0} upvotes
              </p>

              {user ? (
                hasUpvoted ? (
                  <span className="text-sm text-gray-400">Already upvoted</span>
                ) : (
                  <button
                    onClick={handleUpvote}
                    className="px-4 py-1 rounded-xl text-sm font-semibold border bg-green-100 text-green-700 hover:bg-green-200"
                  >
                    Upvote
                  </button>
                )
              ) : (
                <span className="text-sm text-gray-400">Login to upvote</span>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg">
            Report not found.
          </div>
        )}
      </div>
    </main>
  );
}
