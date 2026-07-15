"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { TrashBin, Eye, MapPin, Plus, House, Magnifier } from "@gravity-ui/icons";

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

// ─── Inline delete-confirmation modal ───────────────────────────────────────
function DeleteModal({
  onConfirm,
  onCancel,
}: {
  property: Property;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7 text-center">
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <TrashBin className="w-7 h-7 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Listing?</h3>
        <p className="text-sm text-gray-500 font-light mb-6 leading-relaxed">
          Are you sure you want to permanently delete this listing? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function ManageItemsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const isAgent = (user as any)?.role === "agent";

  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Property | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ── Auth guard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPending && (!session || !isAgent)) {
      toast("Access denied: only agents can manage listings.");
      router.push("/login?callbackURL=/items/manage");
    }
  }, [session, isAgent, isPending, router]);

  // ── Fetch this agent's properties ──────────────────────────────────────────
  const loadProperties = useCallback(() => {
    if (!user) return;
    setLoading(true);
    fetch(`http://localhost:8000/api/properties?agentId=${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load properties");
        return res.json();
      })
      .then((data: Property[]) => {
        if (Array.isArray(data)) {
          setAllProperties(data);
          setProperties(data);
        }
      })
      .catch(() => toast("Failed to fetch your listings."))
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  // ── Client-side search filter ──────────────────────────────────────────────
  useEffect(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      setProperties(allProperties);
    } else {
      setProperties(
        allProperties.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q)
        )
      );
    }
  }, [search, allProperties]);

  // ── Delete handler ─────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/properties/${deleteTarget.id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete property");
      toast("Listing deleted successfully!");
      const updated = allProperties.filter((p) => p.id !== deleteTarget.id);
      setAllProperties(updated);
      setProperties(updated.filter((p) => {
        const q = search.trim().toLowerCase();
        return !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      }));
    } catch (err: any) {
      toast(err.message || "Failed to delete. Please try again.");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  // ── Loading / redirect state ───────────────────────────────────────────────
  if (isPending || (!session && !isAgent)) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-on-surface">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
          <div className="w-11 h-11 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-on-surface-variant font-medium">Verifying credentials…</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      {deleteTarget && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="flex flex-col min-h-screen bg-background text-on-surface">
        <Navbar />

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">

          {/* ── Page header ─────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight leading-tight">
                Manage Listings
              </h1>
              <p className="text-sm text-on-surface-variant font-light mt-1">
                All properties listed under your agent account.
              </p>
            </div>
            <Link
              href="/items/add"
              className="inline-flex items-center gap-2 bg-primary hover:opacity-90 active:scale-[0.98] text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </Link>
          </div>

          {/* ── Stats bar ─────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Listings", value: allProperties.length },
              {
                label: "Avg. Price",
                value:
                  allProperties.length > 0
                    ? `৳ ${Math.round(
                        allProperties.reduce((s, p) => s + p.price, 0) /
                          allProperties.length
                      ).toLocaleString()}`
                    : "—",
              },
              {
                label: "Avg. Beds",
                value:
                  allProperties.length > 0
                    ? (
                        allProperties.reduce((s, p) => s + p.beds, 0) /
                        allProperties.length
                      ).toFixed(1)
                    : "—",
              },
              {
                label: "Showing",
                value: `${properties.length} / ${allProperties.length}`,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-container-lowest border border-outline-variant/25 rounded-2xl px-5 py-4"
              >
                <p className="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-1">
                  {stat.label}
                </p>
                <p className="text-xl font-extrabold text-primary">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* ── Search bar ────────────────────────────────────────────────── */}
          <div className="relative mb-6">
            <Magnifier className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/60 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-outline/50"
            />
          </div>

          {/* ── Content ───────────────────────────────────────────────────── */}
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-surface-container-lowest animate-pulse rounded-2xl border border-outline-variant/20"
                />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-[0_2px_16px_rgba(10,37,64,0.04)] overflow-hidden">

              {/* ── Desktop table ─────────────────────────────────────────── */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-surface-container border-b border-outline-variant/20 text-[11px] uppercase tracking-wider text-on-surface-variant">
                      <th className="py-3.5 px-6 font-semibold">#</th>
                      <th className="py-3.5 px-6 font-semibold">Property</th>
                      <th className="py-3.5 px-6 font-semibold">Location</th>
                      <th className="py-3.5 px-6 font-semibold">Price (BDT)</th>
                      <th className="py-3.5 px-6 font-semibold">Specs</th>
                      <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {properties.map((property, idx) => (
                      <tr
                        key={property.id}
                        className="hover:bg-surface/60 transition-colors group"
                      >
                        {/* Row # */}
                        <td className="py-4 px-6 text-on-surface-variant/50 text-xs font-medium tabular-nums">
                          {String(idx + 1).padStart(2, "0")}
                        </td>

                        {/* Image + Title */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3.5">
                            <div className="w-14 h-11 relative rounded-lg overflow-hidden border border-outline-variant/25 shrink-0 bg-surface-container">
                              {property.image ? (
                                <Image
                                  src={property.image}
                                  alt={property.title}
                                  fill
                                  sizes="56px"
                                  unoptimized
                                  className="object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4";
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <House className="w-5 h-5 text-outline/30" />
                                </div>
                              )}
                            </div>
                            <span className="font-bold text-primary line-clamp-1 max-w-[220px]">
                              {property.title}
                            </span>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-4 px-6">
                          <span className="flex items-center gap-1.5 text-on-surface-variant">
                            <MapPin className="w-3.5 h-3.5 text-outline/50 shrink-0" />
                            <span className="line-clamp-1">{property.location || "—"}</span>
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-6 font-extrabold text-secondary tabular-nums">
                          {property.price ? property.price.toLocaleString() : "—"}
                        </td>

                        {/* Specs */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className="bg-surface-container text-on-surface-variant text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                              {property.beds} Bed
                            </span>
                            <span className="bg-surface-container text-on-surface-variant text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                              {property.baths} Bath
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                            <Link
                              href={`/properties/${property.id}`}
                              className="p-2 border border-outline-variant hover:bg-primary/5 hover:border-primary/40 rounded-xl text-primary transition-all active:scale-[0.96] inline-flex"
                              title="View Listing"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => setDeleteTarget(property)}
                              className="p-2 border border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl text-red-500 transition-all active:scale-[0.96] cursor-pointer"
                              title="Delete Listing"
                            >
                              <TrashBin className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Mobile card grid ──────────────────────────────────────── */}
              <div className="flex flex-col divide-y divide-outline-variant/10 md:hidden">
                {properties.map((property, idx) => (
                  <div key={property.id} className="flex gap-4 p-4 items-start">
                    {/* Thumbnail */}
                    <div className="w-18 h-14 relative rounded-xl overflow-hidden border border-outline-variant/25 shrink-0 bg-surface-container w-[72px] h-[56px]">
                      {property.image ? (
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          sizes="72px"
                          unoptimized
                          className="object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1560185127-6ed189bf02f4";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <House className="w-5 h-5 text-outline/30" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-outline/50 font-medium mb-0.5">
                        #{String(idx + 1).padStart(2, "0")}
                      </p>
                      <h4 className="font-bold text-primary text-sm truncate leading-snug">
                        {property.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-0.5 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-outline/50 shrink-0" />
                        {property.location || "—"}
                      </p>
                      <div className="flex items-center justify-between mt-2.5 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-extrabold text-secondary text-sm truncate">
                            ৳{property.price ? property.price.toLocaleString() : "—"}
                          </span>
                          <span className="text-[10px] text-on-surface-variant/60">
                            {property.beds}B/{property.baths}Ba
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Link
                            href={`/properties/${property.id}`}
                            className="p-1.5 border border-outline-variant hover:bg-primary/5 rounded-lg text-primary inline-flex transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(property)}
                            className="p-1.5 border border-red-200 hover:bg-red-50 rounded-lg text-red-500 cursor-pointer transition-all"
                          >
                            <TrashBin className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Table footer ──────────────────────────────────────────── */}
              <div className="px-6 py-3.5 border-t border-outline-variant/15 bg-surface-container/30 flex items-center justify-between">
                <p className="text-xs text-on-surface-variant">
                  {properties.length} listing{properties.length !== 1 ? "s" : ""}
                  {search ? ` matching "${search}"` : " total"}
                </p>
                {deleting && (
                  <div className="flex items-center gap-2 text-xs text-red-500 font-medium">
                    <div className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                    Deleting…
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ── Empty state ──────────────────────────────────────────────── */
            <div className="text-center py-24 bg-surface-container-lowest border border-outline-variant/25 rounded-2xl">
              <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mx-auto mb-5">
                <House className="w-8 h-8 text-outline/40" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-1">
                {search ? "No results found" : "No listings yet"}
              </h3>
              <p className="text-sm text-on-surface-variant font-light mb-7 max-w-xs mx-auto">
                {search
                  ? `No properties match "${search}". Try a different keyword.`
                  : "You haven't added any property listings yet. Get started by clicking Add Property."}
              </p>
              {!search && (
                <Link
                  href="/items/add"
                  className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  List Your First Property
                </Link>
              )}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
