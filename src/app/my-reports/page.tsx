"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";

// ✅ Define a proper TypeScript type for your report
type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  image_url?: string;
  timestamp: string;
  user_id: string;
};

export default function MyReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]); // ✅ No more "any[]"

  useEffect(() => {
    const fetchReports = async () => {
      const { data } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", user?.id)
        .order("timestamp", { ascending: false });

      setReports((data as Report[]) || []);
    };

    if (user) fetchReports();
  }, [user]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            My Submitted Reports
          </h1>

          {reports.length === 0 ? (
            <div className="text-center text-gray-500 text-lg mt-20">
              You haven’t submitted any reports yet.
            </div>
          ) : (
            <ul className="space-y-6">
              {reports.map((r) => (
                <li
                  key={r.id}
                  className="bg-white rounded-xl shadow p-6 border border-gray-200"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {r.title}
                  </h2>

                  <p className="text-gray-700 mb-2">{r.description}</p>

                  <div className="text-sm text-gray-600 mb-2">
                    📍 <span className="font-medium">{r.location}</span>
                  </div>

                  <div className="text-sm text-gray-500 italic">
                    Status: {r.status}
                  </div>

                  {r.image_url && (
                    <div className="mt-4 overflow-x-auto">
                      <Image
                        src={r.image_url}
                        alt="Report Image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto h-auto max-w-full rounded-lg border image-pixelated"
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
