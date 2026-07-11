"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export default function SubmitTestimonial() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    quote: "",
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/testimonials/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit testimonial");
      }

      setSubmitted(true);
      setFormData({ name: "", role: "", quote: "", rating: 5 });
    } catch (err) {
      setError((err as Error).message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-12">
        <span className="w-10 h-10 rounded-lg bg-coral flex items-center justify-center flex-shrink-0">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M4 6h6c5.523 0 10 4.477 10 10s-4.477 10-10 10H4V6z" stroke="white" strokeWidth="2.5" fill="none" />
            <path d="M18 26l6-16 6 16M20.5 20h7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </span>
        <span className="font-heading font-bold text-navy text-2xl tracking-tight">
          Dev<span className="text-coral">Axis</span>
        </span>
      </Link>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-navy px-6 py-10 sm:px-10 text-center">
          <h1 className="text-3xl font-heading font-bold text-white mb-3">
            Share Your Experience
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Thank you for working with DevAxis! We&apos;d love to hear about your experience. Your feedback helps us grow and helps others make confident decisions.
          </p>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-navy mb-3">Thank you for your review!</h2>
              <p className="text-gray-600 mb-8">Your testimonial has been submitted and is currently under review by our team.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-coral font-semibold hover:text-coral-hover transition-colors"
              >
                Submit another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  How would you rate your experience? <span className="text-coral">*</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-sm transition-transform hover:scale-110"
                      aria-label={`Rate ${star} out of 5 stars`}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill={star <= formData.rating ? "#E8553A" : "#E8E8E5"} className="transition-colors duration-200">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name and Role Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
                    Your Name <span className="text-coral">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm bg-warm-gray50 min-h-[44px]"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-navy mb-1.5">
                    Your Role / Company <span className="text-coral">*</span>
                  </label>
                  <input
                    type="text"
                    id="role"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="CEO, Example Corp"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm bg-warm-gray50 min-h-[44px]"
                  />
                </div>
              </div>

              {/* Quote */}
              <div>
                <label htmlFor="quote" className="block text-sm font-medium text-navy mb-1.5">
                  Your Review <span className="text-coral">*</span>
                </label>
                <textarea
                  id="quote"
                  required
                  rows={6}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Tell us what you liked about working with DevAxis..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm bg-warm-gray50 resize-vertical min-h-[100px]"
                />
              </div>

              {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-3.5 bg-coral hover:bg-coral-hover text-white font-semibold rounded-lg transition-colors duration-200 min-h-[48px] shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
        </div>
      </div>
      
      {/* Footer text */}
      <p className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} DevAxis. All rights reserved.
      </p>
    </div>
  );
}
