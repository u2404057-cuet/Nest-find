"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-container text-white py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-on-primary-container">
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="white" fillOpacity="0.15" />
              <path d="M16 6L4 16H8V26H14V20H18V26H24V16H28L16 6Z" fill="white" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-white font-sans">NestFind</span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed max-w-xs">
            Redefining the real estate experience through architectural precision and minimalist design. Your dream home is just a click away.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-secondary-container transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-secondary-container transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-secondary-container transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/properties" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">Search Properties</Link></li>
            <li><Link href="/properties?category=apartment" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">Apartments</Link></li>
            <li><Link href="/properties?sort=price_desc" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">Luxury Collection</Link></li>
            <li><Link href="/about" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">About NestFind</Link></li>
            <li><Link href="/contact" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-6">Resources</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/privacy" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">Terms of Service</Link></li>
            <li><Link href="/properties" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">Browse All Listings</Link></li>
            <li><Link href="/register" className="hover:text-secondary-container opacity-85 hover:opacity-100 transition-all">Create Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm opacity-85">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-lg text-secondary-container shrink-0 mt-0.5">location_on</span>
              <span>123 Architecture Blvd, NY 10012</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-secondary-container shrink-0">phone</span>
              <a href="tel:+15559637463" className="hover:text-secondary-container transition-colors">+1 (555) NEST-FIND</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-secondary-container shrink-0">mail</span>
              <a href="mailto:hello@nestfind.com" className="hover:text-secondary-container transition-colors">hello@nestfind.com</a>
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
