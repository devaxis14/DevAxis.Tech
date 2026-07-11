"use client";

import { useState, FormEvent } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const DEFAULT_CONTACT = {
  phone: "+91 98765 43210",
  email: "hello@devaxis.in",
  whatsappNumber: "919876543210",
  whatsappMessage: "Hi DevAxis, I'm interested in your web design services.",
  address: {
    line1: "2nd Floor, Skyline Tower,",
    line2: "Marine Drive, Kochi,",
    line3: "Kerala 682031, India",
  },
  businessHours: {
    weekday: "Mon–Fri 9am–6pm",
    saturday: "Sat 10am–2pm",
  },
};

interface ContactProps {
  contactInfo?: {
    phone?: string;
    email?: string;
    whatsappNumber?: string;
    whatsappMessage?: string;
    address?: { line1?: string; line2?: string; line3?: string };
    businessHours?: { weekday?: string; saturday?: string };
  } | null;
}

export default function Contact({ contactInfo }: ContactProps) {
  const info = {
    phone: contactInfo?.phone || DEFAULT_CONTACT.phone,
    email: contactInfo?.email || DEFAULT_CONTACT.email,
    whatsappNumber: contactInfo?.whatsappNumber || DEFAULT_CONTACT.whatsappNumber,
    whatsappMessage: contactInfo?.whatsappMessage || DEFAULT_CONTACT.whatsappMessage,
    address: {
      line1: contactInfo?.address?.line1 || DEFAULT_CONTACT.address.line1,
      line2: contactInfo?.address?.line2 || DEFAULT_CONTACT.address.line2,
      line3: contactInfo?.address?.line3 || DEFAULT_CONTACT.address.line3,
    },
    businessHours: {
      weekday: contactInfo?.businessHours?.weekday || DEFAULT_CONTACT.businessHours.weekday,
      saturday: contactInfo?.businessHours?.saturday || DEFAULT_CONTACT.businessHours.saturday,
    },
  };

  const whatsappUrl = `https://wa.me/${info.whatsappNumber}?text=${encodeURIComponent(info.whatsappMessage)}`;
  const phoneHref = `tel:${info.phone.replace(/\s/g, "")}`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit");
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      setError((err as Error).message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-warm-gray50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 bg-coral/10 text-coral text-xs sm:text-sm font-semibold rounded-full tracking-wide uppercase mb-3">
            Get In Touch
          </span>
          <h2
            className="font-heading font-bold text-navy"
            style={{
              fontSize: "clamp(1.5rem, 3vw + 0.5rem, 2.5rem)",
            }}
          >
            Ready to Start Your Project?
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
            Tell us about your vision and we&apos;ll help bring it to life. Free
            consultation for businesses in Kochi and Kerala.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Contact form — takes 3/5 columns */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Full Name <span className="text-coral">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 bg-warm-gray50 transition-colors duration-200 min-h-[44px]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Email Address <span className="text-coral">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 bg-warm-gray50 transition-colors duration-200 min-h-[44px]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder={info.phone}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 bg-warm-gray50 transition-colors duration-200 min-h-[44px]"
                  />
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="contact-service"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Service Needed
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 bg-warm-gray50 transition-colors duration-200 min-h-[44px] appearance-none"
                  >
                    <option value="">Select a service</option>
                    <option value="web-design">Web Design</option>
                    <option value="web-development">Web Development</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="seo">SEO Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  Your Message <span className="text-coral">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 bg-warm-gray50 transition-colors duration-200 resize-vertical"
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="mt-3 text-sm text-red-600 font-medium">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full sm:w-auto px-8 py-3.5 bg-coral hover:bg-coral-hover text-white font-semibold rounded-lg transition-colors duration-200 text-sm sm:text-base min-h-[48px] shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : submitted ? "✓ Message Sent!" : "Send Message"}
              </button>

              {submitted && (
                <p className="mt-3 text-sm text-green-600 font-medium">
                  Thank you! We&apos;ll get back to you within 24 hours.
                </p>
              )}
            </form>
          </div>

          {/* Contact info — takes 2/5 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Phone */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-navy text-sm mb-1">Phone</h3>
                  <a href={phoneHref} className="text-sm text-gray-600 hover:text-coral transition-colors">
                    {info.phone}
                  </a>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {info.businessHours.weekday}, {info.businessHours.saturday}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 7L2 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-navy text-sm mb-1">Email</h3>
                  <a href={`mailto:${info.email}`} className="text-sm text-gray-600 hover:text-coral transition-colors">
                    {info.email}
                  </a>
                  <p className="text-xs text-gray-400 mt-0.5">We reply within 24 hours</p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-navy text-sm mb-1">WhatsApp</h3>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-coral transition-colors">
                    Chat with us instantly
                  </a>
                  <p className="text-xs text-gray-400 mt-0.5">Quick responses, even after hours</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-navy text-sm mb-1">Office</h3>
                  <address className="not-italic text-sm text-gray-600 leading-relaxed">
                    {info.address.line1}<br />
                    {info.address.line2}<br />
                    {info.address.line3}
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
