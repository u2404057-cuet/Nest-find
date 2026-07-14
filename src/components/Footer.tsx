"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-container text-white py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-on-primary-container">
        {/* Branding & Socials */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* Inline SVG logo — no external dependency */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="32" height="32" rx="8" fill="white" fillOpacity="0.15" />
              <path
                d="M16 6L4 16H8V26H14V20H18V26H24V16H28L16 6Z"
                fill="white"
              />
            </svg>
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              NestFind
            </span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed max-w-xs">
            Redefining the real estate experience through architectural precision
            and minimalist design. Your dream home is just a click away.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-secondary-container transition-colors">
              <span className="material-symbols-outlined text-xl">public</span>
            </a>
            <a href="#" className="hover:text-secondary-container transition-colors">
              <span className="material-symbols-outlined text-xl">share</span>
            </a>
            <a href="#" className="hover:text-secondary-container transition-colors">
              <span className="material-symbols-outlined text-xl">mail</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-6">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="#" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">
                Search Houses
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">
                Rentals
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">
                Luxury Collection
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">
                Find an Agent
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-6">
            Resources
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="#" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-6">
            Contact Us
          </h4>
          <ul className="space-y-4 text-sm opacity-85">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-lg text-secondary-container shrink-0 mt-0.5">
                location_on
              </span>
              <span>123 Architecture Blvd, NY 10012</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-secondary-container shrink-0">
                phone
              </span>
              <span>+1 (555) NEST-FIND</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-secondary-container shrink-0">
                mail
              </span>
              <span>hello@nestfind.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs opacity-60">
        © 2026 NestFind. All rights reserved.
      </div>
    </footer>
  );
}
