import { supabase } from "@/lib/supabase";
import AdminReportClient from "./ClientReport";

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
    return <div className="p-4 text-red-500">Report not found.</div>;
  }

  return <AdminReportClient report={report} />;
}
