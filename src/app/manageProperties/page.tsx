"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@heroui/react";
import { TrashBin, Plus } from "@gravity-ui/icons";
import Image from "next/image";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  image: string;
}

export default function ManagePropertiesPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("2");
  const [baths, setBaths] = useState("2");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const fetchProperties = () => {
    setLoading(true);
    // Fetch specifically for this agent if role matches
    const agentId = session?.user?.id;
    const url = agentId 
      ? `http://localhost:8000/api/properties?agentId=${agentId}`
      : "http://localhost:8000/api/properties";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load properties");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProperties(data);
        }
      })
      .catch((err) => console.error("Error fetching properties:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!isPending) {
      if (!session || (session.user as any).role !== "agent") {
        router.push("/");
      } else {
        fetchProperties();
      }
    }
  }, [session, isPending, router]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !location || !image) {
      toast("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    const payload = {
      title,
      price: Number(price),
      location,
      beds: Number(beds),
      baths: Number(baths),
      image,
      shortDescription: description,
      fullDescription: description,
      propertyType: "apartment",
      listingType: "sale",
      agentId: session?.user?.id || "usr_agent_001",
      isNew: true
    };

    try {
      const res = await fetch("http://localhost:8000/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to create property");
      toast("Property created successfully!");
      // Reset form
      setTitle("");
      setPrice("");
      setLocation("");
      setBeds("2");
      setBaths("2");
      setImage("");
      setDescription("");
      fetchProperties();
    } catch (err: any) {
      toast(err.message || "Failed to create property.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/properties/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete property");
      toast("Property deleted successfully.");
      fetchProperties();
    } catch (err: any) {
      toast(err.message || "Failed to delete property.");
    }
  };

  if (isPending || !session || (session.user as any).role !== "agent") {
    return (
      <div className="flex flex-col min-h-screen bg-background text-on-surface">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-on-surface-variant animate-pulse font-medium">
            Verifying agent credentials...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="flex justify-between items-start mb-8 pb-4 border-b border-outline-variant/20">
          <div>
            <h1 className="text-3xl font-extrabold text-primary font-sans tracking-tight">
              Manage Listings Dashboard
            </h1>
            <p className="text-sm text-on-surface-variant mt-1 font-light">
              Add new homes or modify existing listings registered under your agent profile.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Create Property Form Column */}
          <div className="lg:col-span-1 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
            <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-secondary" />
              Add New Listing
            </h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Luxury 3-Bed Gulshan Duplex"
                  className="w-full px-4 py-2 bg-background border border-outline-variant/50 rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                  Asking Price (USD) *
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 850000"
                  className="w-full px-4 py-2 bg-background border border-outline-variant/50 rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                  Address / Location *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Gulshan 2, Dhaka"
                  className="w-full px-4 py-2 bg-background border border-outline-variant/50 rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Beds
                  </label>
                  <select
                    value={beds}
                    onChange={(e) => setBeds(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-outline-variant/50 rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Baths
                  </label>
                  <select
                    value={baths}
                    onChange={(e) => setBaths(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-outline-variant/50 rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                  >
                    {[1, 1.5, 2, 2.5, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 bg-background border border-outline-variant/50 rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                  Overview Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a brief summary description of the listing..."
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-outline-variant/50 rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl shadow-sm active:scale-[0.98] transition-all text-sm cursor-pointer mt-2"
              >
                {submitting ? "Publishing..." : "Publish Listing"}
              </button>
            </form>
          </div>

          {/* Active Listings Grid Column */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-primary mb-4">
              Your Active Properties ({properties.length})
            </h2>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-xs text-on-surface-variant animate-pulse">Loading listing inventory...</p>
              </div>
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((item) => (
                  <div
                    key={item.id}
                    className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline-variant/30 flex flex-col justify-between"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <Image
                        alt={item.title}
                        src={item.image || "/placeholder.jpg"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 30vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1 gap-2">
                          <h3 className="font-bold text-base text-primary line-clamp-1">
                            {item.title}
                          </h3>
                          <span className="text-secondary font-extrabold text-sm shrink-0">
                            ${item.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-on-surface-variant text-xs mb-3">
                          {item.location}
                        </p>
                      </div>

                      <div className="flex justify-between items-center border-t border-outline-variant/10 pt-3 mt-2">
                        <span className="text-[11px] text-on-surface-variant">
                          {item.beds} Bds | {item.baths} Bths
                        </span>
                        
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                          <TrashBin className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm text-on-surface-variant font-light text-sm">
                No active properties listed under your account. Use the left panel to add your first property listing!
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
