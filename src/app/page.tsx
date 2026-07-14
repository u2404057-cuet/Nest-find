import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FeaturedProperties from "@/components/FeaturedProperties";
import BrowseByCity from "@/components/BrowseByCity";
import HowItWorks from "@/components/HowItWorks";
import TopAgents from "@/components/TopAgents";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Banner / Search Hero */}
        <Hero />

        {/* Counters / Stats */}
        <Stats />

        {/* Featured Houses */}
        <FeaturedProperties limit={4} />

        {/* City Categories */}
        <BrowseByCity />

        {/* Workflow Info */}
        <HowItWorks />

        {/* Agency Team Members */}
        <TopAgents />

        {/* Client Reviews */}
        <Testimonials />

        {/* FAQ Accordions */}
        <FAQ />

        {/* Alert Newsletter */}
        <Newsletter />
      </main>

      {/* Footer Navigation */}
      <Footer />
    </div>
  );
}

