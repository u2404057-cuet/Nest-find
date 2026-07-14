"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, LayoutCellsLarge, BroomMotion } from "@gravity-ui/icons";

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

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 4 properties per page for visible pagination

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/properties")
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
        console.error("Failed to fetch properties:", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Pagination Math
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Page Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-neutral-100 tracking-tight font-sans">
              All Properties
            </h1>
            <p className="text-sm text-on-surface-variant mt-2 font-light">
              Browse our complete catalog of premium and exclusive listings
            </p>
          </div>

          {/* Skeletons Loading Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(10,37,64,0.02)] overflow-hidden border border-outline-variant/30 flex flex-col h-[380px]"
                >
                  <div className="h-48 bg-gray-200 dark:bg-neutral-800 animate-pulse w-full" />
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div className="h-6 bg-gray-200 dark:bg-neutral-800 animate-pulse w-1/2 rounded-md" />
                        <div className="h-6 bg-gray-200 dark:bg-neutral-800 animate-pulse w-1/4 rounded-md" />
                      </div>
                      <div className="h-4 bg-gray-200 dark:bg-neutral-800 animate-pulse w-3/4 rounded-md mb-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-4 border-t border-outline-variant/10 pt-4 mb-4">
                        <div className="h-4 bg-gray-200 dark:bg-neutral-800 animate-pulse w-16 rounded-md" />
                        <div className="h-4 bg-gray-200 dark:bg-neutral-800 animate-pulse w-16 rounded-md" />
                      </div>
                      <div className="h-10 bg-gray-200 dark:bg-neutral-800 animate-pulse w-full rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedProperties.length > 0 ? (
            <>
              {/* Properties Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {paginatedProperties.map((property) => (
                  <div
                    key={property.id}
                    className="group bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(10,37,64,0.02)] hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-outline-variant/30 flex flex-col justify-between"
                  >
                    {/* Card Image */}
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

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className="font-bold text-lg text-primary line-clamp-1">
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
                          className="w-full border-2 border-primary text-primary font-bold py-2 rounded-xl hover:bg-primary hover:text-white transition-colors block text-center text-sm font-sans"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  {/* Prev Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-sm font-semibold text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition-all cursor-pointer"
                  >
                    Previous
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
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

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-sm font-semibold text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition-all cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-on-surface-variant font-light">
              No properties found in our catalog.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
