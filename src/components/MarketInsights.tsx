"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface Property {
  id: string;
  price: number;
  beds: number;
  location: string;
}

const PRICE_BUCKETS = [
  { label: "< 50L", min: 0, max: 5_000_000 },
  { label: "50L – 1Cr", min: 5_000_000, max: 10_000_000 },
  { label: "1Cr – 2Cr", min: 10_000_000, max: 20_000_000 },
  { label: "2Cr – 4Cr", min: 20_000_000, max: 40_000_000 },
  { label: "4Cr+", min: 40_000_000, max: Infinity },
];

const PIE_COLORS = ["#1a5c96", "#2e88e0", "#5ba8f5", "#92c9ff", "#c5e3ff"];

function buildPriceData(properties: Property[]) {
  return PRICE_BUCKETS.map((bucket) => ({
    range: bucket.label,
    count: properties.filter((p) => p.price >= bucket.min && p.price < bucket.max).length,
  }));
}

function buildBedroomData(properties: Property[]) {
  const counts: Record<string, number> = {};
  properties.forEach((p) => {
    const key = p.beds <= 0 ? "Studio" : `${p.beds} Bed${p.beds > 1 ? "s" : ""}`;
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function buildCityData(properties: Property[]) {
  const counts: Record<string, number> = {};
  properties.forEach((p) => {
    const city = p.location?.split(",").pop()?.trim() || "Other";
    counts[city] = (counts[city] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 shadow-lg text-sm">
        <p className="font-semibold text-primary mb-0.5">{label ?? payload[0].name}</p>
        <p className="text-secondary font-bold">{payload[0].value} listings</p>
      </div>
    );
  }
  return null;
};

import { API_BASE_URL } from "@/lib/api";

export default function MarketInsights() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/properties`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProperties(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const priceData = buildPriceData(properties);
  const bedroomData = buildBedroomData(properties);
  const cityData = buildCityData(properties);

  return (
    <section className="py-20 bg-surface-container/30">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Data Insights</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-3">
            Market at a Glance
          </h2>
          <p className="text-on-surface-variant text-base max-w-xl mx-auto font-light">
            Real-time statistics drawn directly from our live listings database.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-surface-container-lowest animate-pulse rounded-2xl border border-outline-variant/20" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant text-sm">
            No listing data available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/25 rounded-2xl p-6 shadow-[0_2px_16px_rgba(10,37,64,0.04)]">
              <h3 className="text-base font-bold text-primary mb-1">Price Distribution</h3>
              <p className="text-xs text-on-surface-variant mb-5">Number of listings per price bracket</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={priceData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                  <XAxis
                    dataKey="range"
                    tick={{ fontSize: 11, fill: "var(--color-on-surface-variant)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--color-on-surface-variant)" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(30,100,200,0.05)" }} />
                  <Bar dataKey="count" fill="var(--color-secondary, #2e88e0)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/25 rounded-2xl p-6 shadow-[0_2px_16px_rgba(10,37,64,0.04)]">
              <h3 className="text-base font-bold text-primary mb-1">By Bedrooms</h3>
              <p className="text-xs text-on-surface-variant mb-4">Listing share per bedroom count</p>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={bedroomData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {bedroomData.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "11px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="lg:col-span-3 bg-surface-container-lowest border border-outline-variant/25 rounded-2xl p-6 shadow-[0_2px_16px_rgba(10,37,64,0.04)]">
              <h3 className="text-base font-bold text-primary mb-1">Listings by City</h3>
              <p className="text-xs text-on-surface-variant mb-5">Top cities by number of active listings</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={cityData} layout="vertical" barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "var(--color-on-surface-variant)" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="city"
                    tick={{ fontSize: 11, fill: "var(--color-on-surface-variant)" }}
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(30,100,200,0.05)" }} />
                  <Bar dataKey="count" fill="var(--color-primary, #1a5c96)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
