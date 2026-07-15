"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, LayoutCellsLarge, BroomMotion } from "@gravity-ui/icons";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  isNew: boolean;
  image: string;
}

interface FeaturedPropertiesProps {
  limit?: number;
}

import { API_BASE_URL } from "@/lib/api";

export default function FeaturedProperties({ limit }: FeaturedPropertiesProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/properties`)
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProperties(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch live properties:", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const displayedProperties = limit ? properties.slice(0, limit) : properties;

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-neutral-100 mb-2">
            Featured Properties
          </h2>
          <p className="text-on-surface-variant text-base">
            Handpicked luxury residences for discerning tastes.
          </p>
        </div>
        <a
          className="text-secondary font-bold flex items-center gap-1 hover:underline transition-all text-sm group"
          href="/properties"
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-[0_4px_20px_rgba(10,37,64,0.05)] overflow-hidden border border-gray-100 dark:border-neutral-800 flex flex-col h-[380px]"
            >
              
              <div className="h-48 bg-gray-200 dark:bg-neutral-800 animate-pulse w-full animate-pulse" />
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div className="h-6 bg-gray-200 dark:bg-neutral-800 animate-pulse w-1/2 rounded-md" />
                    <div className="h-6 bg-gray-200 dark:bg-neutral-800 animate-pulse w-1/4 rounded-md" />
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-neutral-800 animate-pulse w-3/4 rounded-md mb-4" />
                </div>
                <div>
                  <div className="flex items-center gap-4 border-t border-gray-100 dark:border-neutral-800 pt-4 mb-4">
                    <div className="h-4 bg-gray-200 dark:bg-neutral-800 animate-pulse w-16 rounded-md" />
                    <div className="h-4 bg-gray-200 dark:bg-neutral-800 animate-pulse w-16 rounded-md" />
                  </div>
                  <div className="h-10 bg-gray-200 dark:bg-neutral-800 animate-pulse w-full rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : displayedProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProperties.map((property) => (
            <div
              key={property.id}
              className="group bg-white dark:bg-neutral-900 rounded-2xl shadow-[0_4px_20px_rgba(10,37,64,0.05)] hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-neutral-800 flex flex-col justify-between"
            >
              
              <div className="h-48 overflow-hidden relative">
                {property.isNew && (
                  <div className="absolute top-4 left-4 z-10 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    New
                  </div>
                )}
                <Image
                  alt={property.title}
                  src={property.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-bold text-lg text-primary dark:text-neutral-100 line-clamp-1">
                      {property.title}
                    </h3>
                    <span className="text-secondary font-extrabold shrink-0">
                      ${property.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm flex items-center mb-4">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {property.location}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-4 border-t border-gray-100 dark:border-neutral-800 pt-4 mb-4">
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <LayoutCellsLarge className="w-4 h-4 text-gray-400" />
                      {property.beds} Beds
                    </span>
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <BroomMotion className="w-4 h-4 text-gray-400" />
                      {property.baths} Baths
                    </span>
                  </div>

                  <Link
                    href={`/properties/${property.id}`}
                    className="w-full border-2 border-primary text-primary dark:border-neutral-400 dark:text-neutral-300 font-bold py-2 rounded-xl hover:bg-primary hover:text-white transition-colors block text-center text-sm font-sans"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-on-surface-variant font-light text-sm">
          No properties available at the moment.
        </div>
      )}
    </section>
  );
}
