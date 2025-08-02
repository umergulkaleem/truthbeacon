// src/app/admin/[id]/page.tsx

import { supabase } from "@/lib/supabase";
import AdminReportClient from "./ClientReport";
import { notFound } from "next/navigation";

// ✅ DO NOT define custom type — just destructure `params` inline
export default async function AdminReportPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { data: report, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !report) {
    notFound(); // triggers 404
  }

  return <AdminReportClient report={report} />;
}
