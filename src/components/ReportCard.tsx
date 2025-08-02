import Link from "next/link";

type Report = {
  id: string;
  title: string;
  category: string;
  location: string;
};

export default function ReportCard({ report }: { report: Report }) {
  return (
    <Link
      href={`/report/${report.id}`}
      className="block p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-200"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        {report.title}
      </h3>
      <p className="text-sm text-gray-500">
        {report.category} · {report.location}
      </p>
    </Link>
  );
}
