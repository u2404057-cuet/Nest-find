"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (!session || (session.user as any).role !== "agent") {
        router.push("/");
      }
    }
  }, [session, isPending, router]);

  if (isPending || !session || (session.user as any).role !== "agent") {
    return (
      <div className="flex flex-col min-h-screen bg-background text-on-surface">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-on-surface-variant animate-pulse font-medium">
            Verifying agent credentials...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-extrabold text-primary mb-2 font-sans tracking-tight">
          Agent Messages & Contacts
        </h1>
        <p className="text-sm text-on-surface-variant mb-10 font-light">
          Review incoming client consultation inquiries and showing schedule alerts.
        </p>

        <div className="space-y-6">
          {[
            {
              id: "1",
              name: "Sarah Jenkins",
              email: "sarah.j@example.com",
              date: "2026-07-15",
              time: "10:00 AM - 12:00 PM",
              property: "Cozy 2-Bed Flat for Rent in Banani",
            },
            {
              id: "2",
              name: "Tanvir Rahman",
              email: "tanvir@example.com",
              date: "2026-07-16",
              time: "02:00 PM - 04:00 PM",
              property: "Modern 3-Bed Apartment in Gulshan 2",
            }
          ].map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4"
            >
              <div>
                <h3 className="font-bold text-lg text-primary">{item.name}</h3>
                <p className="text-xs text-on-surface-variant mb-2">{item.email}</p>
                <div className="text-xs text-on-surface-variant/80">
                  <span className="font-semibold text-primary">Property:</span> {item.property}
                </div>
              </div>
              
              <div className="text-left md:text-right shrink-0">
                <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold inline-block mb-2 uppercase tracking-wider">
                  Showing Request
                </div>
                <p className="text-xs text-on-surface-variant font-medium">
                  Scheduled for {item.date} at {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
