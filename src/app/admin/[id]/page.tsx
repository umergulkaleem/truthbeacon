// src/app/admin/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { notFound } from "next/navigation";

type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  image_url?: string;
  status: string;
};

export default function AdminReportPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [status, setStatus] = useState<string>("pending");
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) {
        notFound();
        return;
      }

      const { data: reportData, error } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !reportData) {
        notFound();
        return;
      }

      setReport(reportData);
      setStatus(reportData.status);
      setLoading(false);
    };

    fetchReport();
  }, [id]);

  const updateStatus = async (newStatus: "approved" | "rejected") => {
    if (!report) return;

    setUpdating(true);
    const { error } = await supabase
      .from("reports")
      .update({ status: newStatus })
      .eq("id", report.id);

    if (error) {
      alert("Failed to update status: " + error.message);
    } else {
      setStatus(newStatus);
      alert(`Report ${newStatus}`);
      router.push("/admin");
    }

    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <p className="text-center text-gray-600 text-lg">Loading report...</p>
      </div>
    );
  }

  if (!report) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Review Report</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold">{report.title}</h2>
        <p className="text-gray-600 mt-2">
          <strong>Location:</strong> {report.location}
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Description:</strong> {report.description}
        </p>
        <p className="text-gray-500 mt-2 text-sm">
          Submitted at: {new Date(report.timestamp).toLocaleString()}
        </p>
        <p className="mt-2">
          <strong>Status:</strong>{" "}
          <span
            className={`${
              status === "pending"
                ? "text-yellow-500"
                : status === "approved"
                ? "text-green-600"
                : "text-red-600"
            } font-semibold`}
          >
            {status}
          </span>
        </p>

        {report.image_url && (
          <div className="mt-4 w-full max-w-2xl">
            <Image
              src={report.image_url}
              alt="Report Image"
              width={400}
              height={200}
              className="w-full h-auto rounded shadow object-cover"
            />
          </div>
        )}

        {status === "pending" && (
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => updateStatus("approved")}
              disabled={updating}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={() => updateStatus("rejected")}
              disabled={updating}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
