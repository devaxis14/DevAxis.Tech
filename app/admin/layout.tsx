"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import { isAuthenticated } from "@/app/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    setMounted(true);
    
    // Auth check on mount and path change
    if (!isAuthenticated() && !isLoginPage) {
      router.push("/admin/login");
    } else if (isAuthenticated() && isLoginPage) {
      router.push("/admin");
    }
  }, [pathname, isLoginPage, router]);

  // Don't render anything until mounted to prevent hydration mismatch with cookies
  if (!mounted) return null;

  if (isLoginPage) {
    return <div className="min-h-screen bg-warm-white">{children}</div>;
  }

  // Only render sidebar layout if authenticated
  if (!isAuthenticated()) return null;

  return (
    <div className="min-h-screen bg-warm-gray50">
      <Sidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-8 shadow-sm">
          <h1 className="text-xl font-heading font-bold text-navy capitalize">
            {pathname.split("/").pop() === "admin" ? "Dashboard" : pathname.split("/").pop()?.replace("-", " ")}
          </h1>
        </header>
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
