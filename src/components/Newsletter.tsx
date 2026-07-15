"use client";

import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log(`Subscribed: ${email}`);
      setIsOpen(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-primary py-16 text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Get Exclusive Property Alerts
          </h2>
          <p className="opacity-80 text-sm md:text-base font-light">
            Be the first to know about new listings in your preferred areas.
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="w-full max-w-md flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            suppressHydrationWarning
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-secondary text-white placeholder:text-white/60 transition-all font-sans"
          />
          <button
            type="submit"
            className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all text-sm shrink-0 cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">You&apos;re subscribed!</h3>
            <p className="text-sm text-gray-500 font-light mb-6 leading-relaxed">
              Thank you for subscribing! You&apos;ll receive exclusive property alerts soon.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all cursor-pointer"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
