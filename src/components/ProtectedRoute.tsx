"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth(); // ✅ include loading state
  const router = useRouter();

  // ✅ Fix: Add 'router' to dependencies
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p className="p-4">Loading...</p>; // ✅ prevent premature render
  if (!user) return null;

  return <>{children}</>;
}
