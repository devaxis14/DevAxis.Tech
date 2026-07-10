"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy shadow-lg py-2 lg:py-3"
          : "bg-navy/90 py-3 lg:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 min-h-[44px] min-w-[44px]"
          aria-label="DevAxis — Home"
        >
          {/* DevAxis inline SVG logo mark — matches navbar colors */}
          <span className="w-9 h-9 rounded-lg bg-coral flex items-center justify-center flex-shrink-0">
            <svg
              width="22"
              height="22"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Stylized DA monogram */}
              <path
                d="M4 6h6c5.523 0 10 4.477 10 10s-4.477 10-10 10H4V6z"
                stroke="white"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M18 26l6-16 6 16M20.5 20h7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
          <span className="font-heading font-bold text-white text-lg sm:text-xl tracking-tight">
            Dev<span className="text-coral">Axis</span>
          </span>
        </Link>

        {/* Desktop nav — visible lg and above */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors duration-200 min-h-[44px] flex items-center"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger button — visible below lg */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden flex flex-col items-center justify-center w-11 h-11 rounded-lg hover:bg-white/10 transition-colors ${
            isOpen ? "hamburger-open" : ""
          }`}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className="hamburger-line block w-6 h-0.5 bg-white mb-1.5 rounded-full" />
          <span className="hamburger-line block w-6 h-0.5 bg-white mb-1.5 rounded-full" />
          <span className="hamburger-line block w-6 h-0.5 bg-white rounded-full" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`mobile-menu fixed top-0 right-0 h-full w-72 sm:w-80 bg-navy z-50 lg:hidden flex flex-col shadow-xl ${
          isOpen ? "open" : ""
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={closeMenu}
            className="w-11 h-11 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Close navigation menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile links */}
        <div className="flex flex-col px-4 gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 min-h-[44px] flex items-center"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu footer */}
        <div className="mt-auto p-6 border-t border-white/10">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors min-h-[44px]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            +91 98765 43210
          </a>
          <a
            href="mailto:hello@devaxis.in"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mt-2 min-h-[44px]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
            hello@devaxis.in
          </a>
        </div>
      </div>
    </nav>
  );
}
