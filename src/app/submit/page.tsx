"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReportForm from "@/components/ReportForm";

export default function SubmitPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      <div className="flex-1 p-4 sm:p-6 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Submit a Report
        </h1>
        <ReportForm />
      </div>
      <Footer />
    </main>
  );
}
