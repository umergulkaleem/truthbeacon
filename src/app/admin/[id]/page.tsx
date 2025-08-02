// src/app/admin/[id]/page.tsx
import { supabase } from "@/lib/supabase";
import AdminReportClient from "./ClientReport";
import { notFound } from "next/navigation";
import { NextPage } from "next";

// Define the Report type to match ClientReport.tsx
type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  image_url?: string;
  status: string;
};

// Use NextPage for proper typing
const Page: NextPage<{ params: { id: string } }> = async ({ params }) => {
  const { id } = params;

  const { data: report, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !report) {
    notFound();
  }

  return <AdminReportClient report={report as Report} />;
};

export default Page;
