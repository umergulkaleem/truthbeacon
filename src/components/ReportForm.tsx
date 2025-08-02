"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ReportForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let image_url = "";

    // Upload image to Supabase Storage
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `reports/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("report-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error("Image upload failed:", uploadError.message);
        alert("Image upload failed.");
        setUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("report-images")
        .getPublicUrl(filePath);

      image_url = publicUrlData?.publicUrl || "";
    }

    // Insert report into the database
    const { error } = await supabase.from("reports").insert([
      {
        title,
        description,
        location,
        image_url,
        timestamp: new Date().toISOString(),
        status: "pending",
        upvotes: 0,
      },
    ]);

    if (error) {
      console.error("Failed to submit report:", error.message);
      alert("Failed to submit report.");
    } else {
      alert("Report submitted successfully and is pending approval.");
      setTitle("");
      setDescription("");
      setLocation("");
      setImageFile(null);
      router.push("/"); // or your desired redirect
    }

    setUploading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold">Submit a New Report</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={4}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {uploading ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}
