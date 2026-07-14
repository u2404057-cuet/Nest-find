"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedProperties from "@/components/FeaturedProperties";

export default function PropertiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-neutral-100 tracking-tight font-sans">
              All Properties
            </h1>
            <p className="text-sm text-on-surface-variant mt-2 font-light">
              Browse our complete catalog of premium and exclusive listings
            </p>
          </div>
          <FeaturedProperties />
        </div>
      </main>
      <Footer />
    </div>
  );
}
