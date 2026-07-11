"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { getToken } from "@/app/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  recommendedSize?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Upload Image",
  recommendedSize,
}: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = getToken();
      if (!token) throw new Error("Authentication required");

      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to upload image");
      }

      onChange(data.data.url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    // In a full implementation, you might want to call the DELETE endpoint here
    // but for now, just removing the reference is safer.
    onChange(null);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-navy mb-1.5">
        {label}
        {recommendedSize && (
          <span className="text-gray-400 font-normal ml-2">({recommendedSize})</span>
        )}
      </label>

      {error && <p className="text-sm text-red-600 mb-2 font-medium">{error}</p>}

      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200 group bg-gray-50 h-48">
          <Image
            src={value}
            alt="Uploaded image preview"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
              title="Remove Image"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 hover:border-coral transition-colors bg-white h-48 group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/jpeg, image/png, image/webp, image/svg+xml"
            className="hidden"
          />
          {loading ? (
            <div className="flex flex-col items-center text-coral">
              <Loader2 className="animate-spin mb-2" size={32} />
              <span className="text-sm font-medium">Uploading...</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-coral/10 text-coral flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm font-medium text-navy mb-1">Click to upload image</p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG, or WebP (Max 5MB)</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
