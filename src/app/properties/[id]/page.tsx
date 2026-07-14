"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin,
  ChevronLeft,
  LayoutCellsLarge,
  BroomMotion,
  Shield,
  Calendar,
  Gear
} from "@gravity-ui/icons";

interface Property {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  propertyType: string;
  listingType: string;
  price: number;
  currency: string;
  location: {
    city?: string;
    area?: string;
    address?: string;
    lat?: number;
    lng?: number;
  } | string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  yearBuilt: number;
  amenities: string[];
  images: string[];
  image?: string;
  status: string;
  views: number;
  featured: boolean;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: PageProps) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const { data: session } = useSession();
  const [property, setProperty] = useState<Property | null>(null);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const displayLocation: string = property
    ? (typeof property.location === "string"
      ? property.location
      : (property.location.address || `${property.location.area || ""}, ${property.location.city || ""}`))
    : "";

  // Fetch property details & related items
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/properties/${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Property not found");
          }
          throw new Error("Failed to load property details");
        }
        return res.json();
      })
      .then((data) => {
        setProperty(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    // Fetch related properties
    fetch("http://localhost:8000/api/properties")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const filtered = data.filter((item: any) => item.id !== id).slice(0, 3);
          setRelatedProperties(filtered);
        }
      })
      .catch((err) => console.error("Failed to fetch related properties:", err));
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-on-surface">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent dark:border-neutral-200 dark:border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-on-surface-variant animate-pulse font-medium">
            Loading property details...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // Error/Not found state
  if (error || (!loading && !property)) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-on-surface">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-20 px-6">
          <div className="text-center max-w-md bg-surface-container-lowest p-8 rounded-2xl shadow-[0_4px_20px_rgba(10,37,64,0.05)] border border-outline-variant/30">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
            <p className="text-on-surface-variant dark:text-neutral-400 text-sm mb-6">
              {error || "We couldn't find the property you were looking for."}
            </p>
            <Link
              href="/properties"
              className="bg-primary text-white dark:bg-neutral-100 dark:text-neutral-900 px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 inline-block"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Loaded Details View
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface transition-colors duration-200">
      <Navbar />

      {loading || !property ? (
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <main className="flex-grow py-8 max-w-7xl mx-auto px-6 w-full">
          {/* Back button and navigation breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Link
              href="/properties"
              className="flex items-center gap-1.5 text-sm font-semibold text-primary dark:text-neutral-350 hover:text-secondary hover:underline transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Catalog
            </Link>
            <div className="flex items-center gap-3">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                For {property.listingType}
              </span>
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-semibold capitalize">
                {property.propertyType}
              </span>
            </div>
          </div>

          {/* Title & Price Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-primary tracking-tight leading-tight">
                {property.title}
              </h1>
              <p className="flex items-center text-sm text-on-surface-variant mt-2 font-medium">
                <MapPin className="w-4 h-4 mr-1.5 text-neutral-400 shrink-0" />
                {displayLocation}
              </p>
            </div>
            <div className="text-left md:text-right shrink-0 bg-surface-container-lowest px-6 py-4 rounded-2xl border border-outline-variant/30 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest block mb-1">
                Asking Price
              </span>
              <span className="text-3xl font-extrabold text-secondary">
                {property.currency} {property.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Image Gallery Block */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-10">
            {/* Active Display */}
            <div className="lg:col-span-3 h-[300px] sm:h-[450px] relative rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30">
              <Image
                src={property.images[activeImage] || "/placeholder.jpg"}
                alt={property.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 75vw"
                className="object-cover"
              />
              {/* Image Control Badges */}
              <div className="absolute bottom-4 right-4 bg-primary/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                {activeImage + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="lg:col-span-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[450px] pb-2 lg:pb-0 scrollbar-thin scrollbar-thumb-neutral-250 scrollbar-track-transparent">
              {property.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative flex-1 min-w-[80px] lg:min-w-0 h-[80px] lg:h-[102px] rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImage === index
                      ? "border-secondary scale-[0.98]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Property image thumbnail ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 80px, 200px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Specs Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Description & Specs */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Specs Grid */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                    Bedrooms
                  </span>
                  <div className="flex items-center justify-center gap-1.5 font-bold text-lg text-primary dark:text-neutral-100">
                    <LayoutCellsLarge className="w-5 h-5 text-neutral-400" />
                    {property.bedrooms} Beds
                  </div>
                </div>
                <div className="space-y-1 border-l border-gray-100 dark:border-neutral-850">
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                    Bathrooms
                  </span>
                  <div className="flex items-center justify-center gap-1.5 font-bold text-lg text-primary dark:text-neutral-100">
                    <BroomMotion className="w-5 h-5 text-neutral-400" />
                    {property.bathrooms} Baths
                  </div>
                </div>
                <div className="space-y-1 border-l border-gray-100 dark:border-neutral-850">
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                    Area
                  </span>
                  <div className="flex items-center justify-center gap-1.5 font-bold text-lg text-primary dark:text-neutral-100">
                    <Shield className="w-5 h-5 text-neutral-400" />
                    {property.areaSqft} sqft
                  </div>
                </div>
                <div className="space-y-1 border-l border-gray-100 dark:border-neutral-850">
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                    Year Built
                  </span>
                  <div className="flex items-center justify-center gap-1.5 font-bold text-lg text-primary dark:text-neutral-100">
                    <Calendar className="w-5 h-5 text-neutral-400" />
                    {property.yearBuilt}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <h3 className="text-xl font-bold text-primary mb-4 border-b border-outline-variant/10 pb-3">
                  Property Description
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-line">
                  {property.fullDescription || property.shortDescription}
                </p>
              </div>

              {/* Amenities */}
              <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <h3 className="text-xl font-bold text-primary mb-6 border-b border-outline-variant/10 pb-3">
                  Amenities & Facilities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-background p-4 rounded-xl border border-outline-variant/20 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                        <Gear className="w-4 h-4 text-on-primary-container" />
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews & Ratings */}
              <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-center mb-6 border-b border-outline-variant/10 pb-3">
                  <h3 className="text-xl font-bold text-primary">
                    Reviews & Ratings
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-secondary">4.8</span>
                    <span className="text-xs text-on-surface-variant">(2 reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[
                    {
                      id: "1",
                      author: "Sarah Jenkins",
                      rating: 5,
                      date: "June 12, 2026",
                      comment: "Stunning property with exceptional finishes. The location is incredibly convenient and the neighborhood is very peaceful."
                    },
                    {
                      id: "2",
                      author: "David Miller",
                      rating: 4,
                      date: "May 28, 2026",
                      comment: "Very spacious apartment. The bathrooms are modern and the natural light in the living room is fantastic. Highly recommended."
                    }
                  ].map((rev) => (
                    <div key={rev.id} className="border-b border-outline-variant/10 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div>
                          <h4 className="text-sm font-bold text-primary">{rev.author}</h4>
                          <span className="text-[11px] text-on-surface-variant">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 bg-secondary-container/20 px-2 py-0.5 rounded text-secondary font-bold text-xs">
                          {rev.rating} ★
                        </div>
                      </div>
                      <p className="text-sm text-on-surface-variant font-normal leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Widget */}
            <div className="space-y-6">
              {/* Agent card widget */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] sticky top-24">
                <h3 className="text-lg font-bold text-primary mb-5 pb-3 border-b border-outline-variant/10">
                  Schedule a Showing
                </h3>
                
                {/* Agent details */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-secondary-container rounded-full flex items-center justify-center font-bold text-white text-lg">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm">
                      NestFind Agent Team
                    </h4>
                    <p className="text-xs text-on-surface-variant/80">
                      Licensed Real Estate Specialist
                    </p>
                  </div>
                </div>

                {/* Simulated Inquiry Form */}
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Date
                    </label>
                    <input
                      type="date"
                      defaultValue="2026-07-15"
                      className="w-full px-4 py-2.5 bg-background border border-outline-variant/50 rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Preferred Time
                    </label>
                    <select className="w-full px-4 py-2.5 bg-background border border-outline-variant/50 rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none">
                      <option>10:00 AM - 12:00 PM</option>
                      <option>02:00 PM - 04:00 PM</option>
                      <option>04:00 PM - 06:00 PM</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:opacity-90 text-white font-bold py-3.5 rounded-xl shadow-sm active:scale-[0.98] transition-all text-sm cursor-pointer mt-2"
                  >
                    Schedule Private Tour
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Related Items Section */}
          {relatedProperties.length > 0 && (
            <div className="mt-16 pt-10 border-t border-outline-variant/20">
              <h3 className="text-2xl font-bold text-primary mb-8">
                Related Properties
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProperties.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(10,37,64,0.02)] hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-outline-variant/30 flex flex-col justify-between"
                  >
                    {/* Card Image */}
                    <div className="h-44 overflow-hidden relative">
                      <Image
                        alt={item.title}
                        src={item.image || (item.images && item.images[0]) || "/placeholder.jpg"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h4 className="font-bold text-base text-primary line-clamp-1">
                            {item.title}
                          </h4>
                          <span className="text-secondary font-extrabold text-sm shrink-0">
                            ${item.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-on-surface-variant text-xs flex items-center mb-4">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-neutral-400" />
                          {typeof item.location === "string" ? item.location : (item.location.address || `${item.location.area || ""}, ${item.location.city || ""}`)}
                        </p>
                      </div>
                      <Link
                        href={`/properties/${item.id}`}
                        className="w-full border-2 border-primary text-primary font-bold py-2 rounded-xl hover:bg-primary hover:text-white transition-colors block text-center text-xs"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      )}

      <Footer />
    </div>
  );
}
