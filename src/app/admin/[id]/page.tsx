// src/app/admin/[id]/page.tsx

import { supabase } from "@/lib/supabase";
import AdminReportClient from "./ClientReport";
import { notFound } from "next/navigation";

// ✅ Define the expected props type
type AdminReportPageProps = {
  params: {
    id: string;
  };
};

// ✅ Use the props type in the function signature
export default async function AdminReportPage({
  params,
}: AdminReportPageProps) {
  const { id } = params;

  const { data: report, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !report) {
    notFound(); // this will trigger the 404 page
  }

  return <AdminReportClient report={report} />;
}
