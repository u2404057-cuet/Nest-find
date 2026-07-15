"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687920-4e2a09be1587?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
];

export default function Hero() {
  const router = useRouter();
  const locationRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLSelectElement>(null);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Auto-sliding background logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    const q = locationRef.current?.value.trim();
    const category = categoryRef.current?.value;
    const sort = priceRef.current?.value;

    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-[#000f22]">
      {/* Background Image Slider with Fade Transition */}
      {HERO_IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImgIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            alt={`Hero architectural view ${index + 1}`}
            src={src}
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-[#000f22]/60 to-[#000f22]/90 z-0" />

      <div className="relative z-10 w-full max-w-5xl px-6 text-center text-white">
        {/* Animated Entrance Text */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
            Find Your Dream Nest
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90 font-light">
            Discover premium properties in the most desirable locations with the
            architectural precision and reliable guidance of NestFind.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-2 md:p-3 flex flex-col md:flex-row items-stretch gap-2 max-w-4xl mx-auto border border-white/20 animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both"
        >
          <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
            <span className="material-symbols-outlined text-primary mr-3 text-2xl">
              location_on
            </span>
            <input
              ref={locationRef}
              type="text"
              placeholder="Location or keyword…"
              className="w-full bg-transparent border-none outline-none focus:ring-0 text-gray-800 placeholder:text-gray-400 font-sans text-base"
            />
          </div>

          <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
            <span className="material-symbols-outlined text-primary mr-3 text-2xl">
              home
            </span>
            <select
              ref={categoryRef}
              className="w-full bg-transparent border-none outline-none focus:ring-0 text-gray-800 font-sans text-base appearance-none cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="commercial">Commercial</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot / Land</option>
            </select>
          </div>

          <div className="flex-1 flex items-center px-4 py-2">
            <span className="material-symbols-outlined text-primary mr-3 text-2xl">
              payments
            </span>
            <select
              ref={priceRef}
              className="w-full bg-transparent border-none outline-none focus:ring-0 text-gray-800 font-sans text-base appearance-none cursor-pointer"
            >
              <option value="">Price (default)</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </select>
          </div>

          <Button
            type="submit"
            className="bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:opacity-95 active:scale-98 transition-all md:w-auto w-full text-base"
          >
            Search
          </Button>
        </form>

        {/* Slider Indicators */}
        <div className="flex justify-center gap-2 mt-8 animate-in fade-in duration-1000 delay-500 fill-mode-both">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImgIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentImgIndex ? "bg-secondary w-6" : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
