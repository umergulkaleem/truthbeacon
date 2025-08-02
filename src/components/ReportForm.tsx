"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ReportForm() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("You must be logged in to submit a report.");
      return;
    }

    setUploading(true);
    let image_url = "";

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `reports/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("report-images")
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Image upload failed:", uploadError.message);
        alert("Image upload failed.");
        setUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("report-images")
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        console.error("Could not get public URL.");
        alert("Could not get public image URL.");
        setUploading(false);
        return;
      }

      image_url = publicUrlData.publicUrl;
    }

    const { error: insertError } = await supabase.from("reports").insert({
      title,
      description,
      location,
      image_url,
      user_id: user.id,
      timestamp: new Date().toISOString(),
    });

    if (insertError) {
      console.error("Failed to submit report:", insertError.message);
      alert("Failed to submit report.");
    } else {
      alert("Report submitted successfully and is pending approval.");
      setTitle("");
      setDescription("");
      setLocation("");
      setImageFile(null);
      router.push("/");
    }

    setUploading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-xl max-w-3xl mx-auto w-full space-y-6"
    >
      {/* <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center">
        Submit a New Report
      </h2> */}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none"
          />
          {imageFile && (
            <p className="text-sm text-gray-500 mt-2">
              Selected:{" "}
              <span className="font-medium text-gray-700">
                {imageFile.name}
              </span>
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-semibold py-3 rounded-lg shadow-md"
      >
        {uploading ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}
