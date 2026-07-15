"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@heroui/react";
import { House, ArrowRight, Person, Calendar } from "@gravity-ui/icons";

export default function AddItemPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const isAgent = (user as any)?.role === "agent";

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      price: 0,
      imageUrl: "",
      bedrooms: 3,
      bathrooms: 3,
      areaSqft: 1500,
      yearBuilt: 2026,
      propertyType: "apartment",
      listingType: "sale",
      city: "Dhaka",
      area: "Gulshan",
      address: ""
    }
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isPending && (!session || !isAgent)) {
      toast("Access denied: Only agents can access this page.");
      router.push(`/login?callbackURL=/items/add`);
    }
  }, [session, isAgent, isPending, router]);

  const onSubmit = async (data: any) => {
    if (!user) return;
    setSubmitting(true);

    const payload = {
      agentId: user.id,
      title: data.title,
      shortDescription: data.shortDescription,
      fullDescription: data.fullDescription,
      price: Number(data.price),
      currency: "BDT",
      images: data.imageUrl ? [data.imageUrl] : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"],
      bedrooms: Number(data.bedrooms),
      bathrooms: Number(data.bathrooms),
      areaSqft: Number(data.areaSqft),
      yearBuilt: Number(data.yearBuilt),
      propertyType: data.propertyType,
      listingType: data.listingType,
      location: {
        city: data.city,
        area: data.area,
        address: data.address || `${data.area}, ${data.city}`
      },
      amenities: [
        "Parking",
        "Generator Backup",
        "Security",
        "Elevator"
      ]
    };

    try {
      const { API_BASE_URL } = require("@/lib/api");
      const res = await fetch(`${API_BASE_URL}/api/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Failed to add property");
      }

      toast("Property added successfully!");
      router.push("/items/manage");
    } catch (err: any) {
      console.error(err);
      toast(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending || (!session && !isAgent)) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-on-surface">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-on-surface-variant font-medium">Verifying credentials...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-12 w-full">
        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(10,37,64,0.05)] border border-outline-variant/30">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
              Add New Property
            </h1>
            <p className="text-xs text-on-surface-variant mt-1 font-light">
              Submit details to list a new property on NestFind catalog.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                Property Title
              </label>
              <input
                type="text"
                placeholder="e.g. Modern 3-Bed Apartment in Gulshan 2"
                required
                {...register("title", { required: true })}
                className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none placeholder:text-outline/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                Short Description
              </label>
              <input
                type="text"
                placeholder="e.g. Bright, fully-tiled apartment with rooftop access..."
                required
                {...register("shortDescription", { required: true })}
                className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none placeholder:text-outline/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                Full Description
              </label>
              <textarea
                placeholder="Enter comprehensive details about the property, rooms, security features, neighborhood, etc..."
                required
                rows={4}
                {...register("fullDescription", { required: true })}
                className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none placeholder:text-outline/50 resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                  Asking Price (BDT)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 18500000"
                  required
                  {...register("price", { required: true, min: 1 })}
                  className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none placeholder:text-outline/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  {...register("imageUrl")}
                  className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none placeholder:text-outline/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  required
                  {...register("bedrooms", { required: true })}
                  className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  required
                  {...register("bathrooms", { required: true })}
                  className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                  Area (Sqft)
                </label>
                <input
                  type="number"
                  required
                  {...register("areaSqft", { required: true })}
                  className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                  Year Built
                </label>
                <input
                  type="number"
                  required
                  {...register("yearBuilt", { required: true })}
                  className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                  Listing Type
                </label>
                <select
                  {...register("listingType")}
                  className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  {...register("city", { required: true })}
                  className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                  Area / Neighborhood
                </label>
                <input
                  type="text"
                  required
                  {...register("area", { required: true })}
                  className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                Full Address
              </label>
              <input
                type="text"
                placeholder="e.g. Road 46, Gulshan 2, Dhaka 1212"
                {...register("address")}
                className="w-full px-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none placeholder:text-outline/50"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:opacity-90 text-white font-bold py-3.5 rounded-xl shadow-sm active:scale-[0.98] transition-all text-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? "Adding Property..." : "Submit Listing"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
