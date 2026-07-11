"use client";

import { useState, useEffect, FormEvent } from "react";
import { getToken } from "@/app/lib/auth";
import ImageUploader from "../components/ImageUploader";
import { Save, Loader2, CheckCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export default function HeroEditor() {
  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    primaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
    heroImage: "",
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_URL}/api/content/hero`);
        const data = await res.json();
        
        if (data.data) {
          setFormData(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch hero content", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/content/hero`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update hero content");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (url: string | null) => {
    setFormData((prev) => ({ ...prev, heroImage: url || "" }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-coral" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-navy">Hero Section</h2>
          <p className="text-sm text-gray-500 mt-1">
            Update the main headline, buttons, and image on your homepage.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Heading */}
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Main Heading
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm bg-warm-gray50 focus:bg-white focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                  placeholder="Transforming Ideas into Digital Realities"
                />
              </div>

              {/* Subheading */}
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Subheading
                </label>
                <textarea
                  rows={4}
                  value={formData.subheading}
                  onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm bg-warm-gray50 focus:bg-white focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                  placeholder="We are a leading web design company..."
                />
              </div>
            </div>

            <div>
              {/* Image Uploader */}
              <ImageUploader 
                label="Hero Image"
                recommendedSize="1200x800px"
                value={formData.heroImage}
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 mt-6">
            <h3 className="text-sm font-bold text-navy mb-4">Call to Action Buttons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Primary Button */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Primary Button (Coral)</h4>
                <div>
                  <label className="block text-xs font-medium text-navy mb-1.5">Label</label>
                  <input
                    type="text"
                    value={formData.primaryButtonText}
                    onChange={(e) => setFormData({ ...formData, primaryButtonText: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm bg-white"
                    placeholder="Get Started"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy mb-1.5">Link (URL or #hash)</label>
                  <input
                    type="text"
                    value={formData.primaryButtonLink}
                    onChange={(e) => setFormData({ ...formData, primaryButtonLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm bg-white"
                    placeholder="#contact"
                  />
                </div>
              </div>

              {/* Secondary Button */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Secondary Button (Outline)</h4>
                <div>
                  <label className="block text-xs font-medium text-navy mb-1.5">Label</label>
                  <input
                    type="text"
                    value={formData.secondaryButtonText}
                    onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm bg-white"
                    placeholder="View Portfolio"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy mb-1.5">Link (URL or #hash)</label>
                  <input
                    type="text"
                    value={formData.secondaryButtonLink}
                    onChange={(e) => setFormData({ ...formData, secondaryButtonLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm bg-white"
                    placeholder="#portfolio"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
          {success && (
            <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <CheckCircle size={16} />
              Saved successfully!
            </span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-coral hover:bg-coral-hover text-white font-medium rounded-lg transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
