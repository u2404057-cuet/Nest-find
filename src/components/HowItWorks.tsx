"use client";

import React from "react";
import { Magnifier, Calendar, Key } from "@gravity-ui/icons";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const STEPS: Step[] = [
  {
    number: "1",
    title: "1. Search",
    description: "Browse our curated collection of high-end homes using advanced filters for your exact needs.",
    icon: "search",
  },
  {
    number: "2",
    title: "2. Tour",
    description: "Schedule private tours with our expert agents at your convenience, either in-person or virtually.",
    icon: "calendar",
  },
  {
    number: "3",
    title: "3. Close",
    description: "Our team handles all documentation and negotiations to ensure a seamless and secure transaction.",
    icon: "key",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-neutral-100 mb-2">
          Your Journey to a New Home
        </h2>
        <p className="text-on-surface-variant text-base">
          We simplify the process from discovery to keys in hand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {STEPS.map((step, idx) => (
          <div key={idx} className="text-center group flex flex-col items-center">
            
            <div className="w-20 h-20 bg-primary-fixed dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {step.icon === "search" && <Magnifier className="w-8 h-8 text-primary dark:text-primary-fixed-dim" />}
              {step.icon === "calendar" && <Calendar className="w-8 h-8 text-primary dark:text-primary-fixed-dim" />}
              {step.icon === "key" && <Key className="w-8 h-8 text-primary dark:text-primary-fixed-dim" />}
            </div>
            
            <h3 className="text-xl font-bold text-primary dark:text-neutral-200 mb-3">
              {step.title}
            </h3>
            <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
