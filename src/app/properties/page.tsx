"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, LayoutCellsLarge, BroomMotion } from "@gravity-ui/icons";
import { API_BASE_URL } from "@/lib/api";

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

const CATEGORIES = [
  { value: "all", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "commercial", label: "Commercial" },
  { value: "villa", label: "Villa" },
  { value: "plot", label: "Plot / Land" },
];

const SORT_OPTIONS = [
  { value: "", label: "Newest First" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

const ITEMS_PER_PAGE = 8;

function PropertiesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const qParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "all";
  const sortParam = searchParams.get("sort") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(qParam);

  const buildApiUrl = useCallback((q: string, category: string, sort: string) => {
    const url = new URL(`${API_BASE_URL}/api/properties`);
    if (q) url.searchParams.set("q", q);
    if (category && category !== "all") url.searchParams.set("category", category);
    if (sort) url.searchParams.set("sort", sort);
    return url.toString();
  }, []);

  useEffect(() => {
    setLoading(true);
    setSearchInput(qParam);

    const apiUrl = buildApiUrl(qParam, categoryParam, sortParam);

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setProperties(data);
      })
      .catch((err) => console.error("Failed to fetch properties:", err.message))
      .finally(() => setLoading(false));
  }, [qParam, categoryParam, sortParam, buildApiUrl]);

  const updateUrl = (overrides: Record<string, string>) => {
    const params = new URLSearchParams();
    const merged = { q: qParam, category: categoryParam, sort: sortParam, page: "1", ...overrides };
    Object.entries(merged).forEach(([k, v]) => { if (v && v !== "all") params.set(k, v); });
    router.push(`/properties?${params.toString()}`);
  };

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(pageParam, totalPages || 1);
  const paginated = properties.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    updateUrl({ page: String(page) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl({ q: searchInput });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight font-sans">
              All Properties
            </h1>
            <p className="text-sm text-on-surface-variant mt-1 font-light">
              Browse our complete catalog of premium and exclusive listings
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-8 items-start md:items-center">
            
            <form onSubmit={handleSearch} className="flex flex-1 gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by title or location…"
                className="flex-1 px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/40 rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all cursor-pointer"
              >
                Search
              </button>
            </form>

            <select
              value={categoryParam}
              onChange={(e) => updateUrl({ category: e.target.value })}
              className="px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/40 rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer min-w-[160px]"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            <select
              value={sortParam}
              onChange={(e) => updateUrl({ sort: e.target.value })}
              className="px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/40 rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer min-w-[180px]"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {(qParam || (categoryParam && categoryParam !== "all") || sortParam) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {qParam && (
                <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                  Search: {qParam}
                  <button onClick={() => updateUrl({ q: "" })} className="ml-1 hover:text-secondary cursor-pointer">✕</button>
                </span>
              )}
              {categoryParam && categoryParam !== "all" && (
                <span className="flex items-center gap-1 bg-secondary-container text-on-secondary-container text-xs font-semibold px-3 py-1 rounded-full capitalize">
                  {categoryParam}
                  <button onClick={() => updateUrl({ category: "all" })} className="ml-1 hover:opacity-70 cursor-pointer">✕</button>
                </span>
              )}
              {sortParam && (
                <span className="flex items-center gap-1 bg-surface-container border border-outline-variant/30 text-on-surface-variant text-xs font-semibold px-3 py-1 rounded-full">
                  {SORT_OPTIONS.find(s => s.value === sortParam)?.label}
                  <button onClick={() => updateUrl({ sort: "" })} className="ml-1 hover:opacity-70 cursor-pointer">✕</button>
                </span>
              )}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 flex flex-col h-[380px]">
                  <div className="h-48 bg-gray-200 dark:bg-neutral-800 animate-pulse w-full" />
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between mb-2 gap-2">
                        <div className="h-6 bg-gray-200 dark:bg-neutral-800 animate-pulse w-1/2 rounded-md" />
                        <div className="h-6 bg-gray-200 dark:bg-neutral-800 animate-pulse w-1/4 rounded-md" />
                      </div>
                      <div className="h-4 bg-gray-200 dark:bg-neutral-800 animate-pulse w-3/4 rounded-md mb-4" />
                    </div>
                    <div>
                      <div className="flex gap-4 border-t border-outline-variant/10 pt-4 mb-4">
                        <div className="h-4 bg-gray-200 dark:bg-neutral-800 animate-pulse w-16 rounded-md" />
                        <div className="h-4 bg-gray-200 dark:bg-neutral-800 animate-pulse w-16 rounded-md" />
                      </div>
                      <div className="h-10 bg-gray-200 dark:bg-neutral-800 animate-pulse w-full rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : paginated.length > 0 ? (
            <>
              <p className="text-xs text-on-surface-variant mb-4">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, properties.length)} of <strong>{properties.length}</strong> results
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {paginated.map((property) => (
                  <div
                    key={property.id}
                    className="group bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(10,37,64,0.02)] hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-outline-variant/30 flex flex-col justify-between"
                  >
                    <div className="h-48 overflow-hidden relative">
                      {property.isNew && (
                        <div className="absolute top-4 left-4 z-10 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          New
                        </div>
                      )}
                      <Image
                        alt={property.title}
                        src={property.image || "https://images.unsplash.com/photo-1560185127-6ed189bf02f4"}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560185127-6ed189bf02f4";
                        }}
                      />
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className="font-bold text-lg text-primary line-clamp-1">{property.title}</h3>
                          <span className="text-secondary font-extrabold shrink-0">${property.price.toLocaleString()}</span>
                        </div>
                        <p className="text-on-surface-variant text-sm flex items-center mb-4">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {property.location}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-4 border-t border-outline-variant/10 pt-4 mb-4">
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
                          className="w-full border-2 border-primary text-primary font-bold py-2 rounded-xl hover:bg-primary hover:text-white transition-colors block text-center text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-sm font-semibold text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition-all cursor-pointer"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "bg-surface-container-lowest border border-outline-variant/30 text-primary hover:bg-primary/10"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-sm font-semibold text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition-all cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-on-surface-variant font-light">
              <p className="text-lg mb-2">No properties found</p>
              <p className="text-sm">
                Try adjusting your filters or{" "}
                <button onClick={() => router.push("/properties")} className="text-primary font-semibold underline cursor-pointer">
                  clear all filters
                </button>
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense>
      <PropertiesContent />
    </Suspense>
  );
}
