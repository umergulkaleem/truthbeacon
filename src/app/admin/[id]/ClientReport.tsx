"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  image_url?: string;
  status: string;
};

export default function AdminReportClient({ report }: { report: Report }) {
  const router = useRouter();
  const [status, setStatus] = useState(report.status);
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (newStatus: "approved" | "rejected") => {
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
          <div className="mt-4">
            <img
              src={report.image_url}
              alt="Report Image"
              className="max-w-sm rounded shadow"
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
