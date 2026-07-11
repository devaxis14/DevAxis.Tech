"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function TestimonialSubmissionPage() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    quote: "",
    rating: 5,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Use the NEXT_PUBLIC_API_URL if defined, otherwise fallback to standard local port
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      
      const res = await fetch(`${apiUrl}/testimonials/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit testimonial.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center p-5">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-navy mb-4">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-8">
            We sincerely appreciate your feedback. Your testimonial has been submitted successfully.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-coral hover:bg-coral-hover text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Back to DevAxis
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Logo Header */}
        <div className="flex justify-center mb-10">
          <Link href="/">
            <Image
              src="/images/devaxis-logo.png"
              alt="DevAxis Logo"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-navy mb-3">
              Share Your Experience
            </h1>
            <p className="text-gray-500">
              Your feedback helps us improve and helps others understand what it&apos;s like working with DevAxis.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div className="flex flex-col items-center justify-center py-4 border-b border-gray-100">
              <label className="text-sm font-medium text-navy mb-3">
                How would you rate your experience?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                    aria-label={`Rate ${star} stars`}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill={star <= formData.rating ? "#E8553A" : "#E8E8E5"}
                      className="transition-colors duration-200"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all bg-gray-50/50"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-navy mb-2">
                  Role & Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all bg-gray-50/50"
                  placeholder="e.g. CEO, TechCorp"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quote" className="block text-sm font-medium text-navy mb-2">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all bg-gray-50/50 resize-none"
                placeholder="Tell us what you loved about working with DevAxis..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-navy hover:bg-navy-light text-white font-medium py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Testimonial"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
