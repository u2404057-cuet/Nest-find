"use client";

import React, { useRef } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const locationRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLSelectElement>(null);

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
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        alt="Modern architectural house at twilight"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDETF39B-OOWdG6Iw3cblvRWAsYkyAX-4xyLa1YLFpOO5d6raqHkOm5kIMw3c0q1coAc4Z57YZwIs-las-61tIfeOEekXowUzG-UZs9f7WgZ9TurT8IxNc1OkD3eQVZEAwvW3UEdX5_nBFa3eka8s_AiUPZWL8jTnlE3xz9ocUnZNeAJ02u0dGWISYEUzJ3_5HkfG5IyKbfzhbViETLj2NYJyUXtIJU9zMuH_hb7wdYK3Db-njCM7-QbQ"
        fill
        priority
        className="object-cover"
      />
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000f22]/50 to-[#000f22]/80 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
          Find Your Dream Nest
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90 font-light">
          Discover premium properties in the most desirable locations with the
          architectural precision and reliable guidance of NestFind.
        </p>

        {/* Search Bar Container */}
        <form
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-2 md:p-3 flex flex-col md:flex-row items-stretch gap-2 max-w-4xl mx-auto border border-white/20"
        >
          {/* Location / keyword field */}
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

          {/* Property Type / category field */}
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

          {/* Price Sort field */}
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

          {/* Search Button */}
          <Button
            type="submit"
            className="bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:opacity-95 active:scale-98 transition-all md:w-auto w-full text-base"
          >
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}
