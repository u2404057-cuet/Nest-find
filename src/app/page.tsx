import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import MarketInsights from "@/components/MarketInsights";
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
      
      <Navbar />

      <main className="flex-1">
        
        <Hero />

        <Stats />

        <MarketInsights />

        <FeaturedProperties limit={4} />

        <BrowseByCity />

        <HowItWorks />

        <TopAgents />

        <Testimonials />

        <FAQ />

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
