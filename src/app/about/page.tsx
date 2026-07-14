"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      
      <main className="flex-grow py-20 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight font-sans">
          About NestFind
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-12 max-w-2xl mx-auto font-light">
          NestFind is a premier property listing platform dedicated to connecting clients with exclusive residences and commercial developments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm text-left">
            <h3 className="font-bold text-xl text-primary mb-3">Our Vision</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              To simplify real estate search and client-agent cooperation with absolute transparency.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm text-left">
            <h3 className="font-bold text-xl text-primary mb-3">Integrity</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We verify and audit database property credentials to ensure reliable agent listings.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm text-left">
            <h3 className="font-bold text-xl text-primary mb-3">Innovation</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Leveraging advanced mapping systems, instant inquiries, and optimized digital catalogs.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
