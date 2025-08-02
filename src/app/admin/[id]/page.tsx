// src/app/admin/[id]/page.tsx

import { supabase } from "@/lib/supabase";
import AdminReportClient from "./ClientReport";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const { id } = params;

  const { data: report, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !report) {
    notFound();
  }

  return <AdminReportClient report={report} />;
}
