import { supabase } from "@/lib/supabase";
import AdminReportClient from "./ClientReport";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function AdminReportPage({ params }: Props) {
  const { id } = params;

  const { data: report, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !report) {
    notFound(); // ✅ Better fallback than inline <div>
  }

  return <AdminReportClient report={report} />;
}
