"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function MyReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const { data } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", user?.id)
        .order("timestamp", { ascending: false });

      setReports(data || []);
    };

    if (user) fetchReports();
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Submitted Reports</h1>
        {reports.length === 0 ? (
          <p>No reports yet.</p>
        ) : (
          <ul className="space-y-4">
            {reports.map((r) => (
              <li key={r.id} className="bg-white p-4 shadow rounded space-y-2">
                <h2 className="font-semibold text-lg">{r.title}</h2>
                <p className="text-gray-600">{r.description}</p>
                <p className="text-sm text-gray-500">📍 {r.location}</p>
                <p className="text-sm italic">Status: {r.status}</p>
                {r.image_url && (
                  <img
                    src={r.image_url}
                    alt="Report Image"
                    className="mt-2 max-h-64 object-cover rounded border"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}
