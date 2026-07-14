"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars, Xmark } from "@gravity-ui/icons";
import logoImg from "@/assets/logo.png";
import { useSession, authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user;

  const menuItems = [
    { name: "Home", href: "#", active: true },
    { name: "Properties", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-[0_4px_20px_rgba(10,37,64,0.05)] border-b border-gray-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand/Logo */}
        <div className="flex items-center gap-2">
          <Image
            alt="NestFind Logo"
            className="h-10 w-10 object-contain"
            src={logoImg}
          />
          <span className="font-bold text-xl text-primary dark:text-neutral-100 font-sans tracking-tight">
            NestFind
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                item.active
                  ? "text-primary dark:text-neutral-100 border-b-2 border-secondary-container pb-1"
                  : "text-on-surface-variant dark:text-neutral-400"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions / CTA */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="hidden sm:block w-24 h-10 bg-surface-container animate-pulse rounded-xl" />
          ) : user ? (
             <div className="hidden sm:flex items-center gap-3">
               <div className="flex items-center gap-2">
                 {user?.image ? (
                   <Image
                     src={user.image}
                     alt={user.name || "User Avatar"}
                     width={32}
                     height={32}
                     className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-neutral-700"
                   />
                 ) : (
                   <div className="w-8 h-8 rounded-full bg-secondary-container text-white flex items-center justify-center font-bold text-sm uppercase">
                     {user?.name ? user.name[0] : (user?.email ? user.email[0] : "U")}
                   </div>
                 )}
                 <span className="hidden sm:inline-block text-xs font-bold text-neutral-800 dark:text-neutral-200">
                   {user?.name || user?.email}
                 </span>
               </div>
              <button
                onClick={async () => {
                  await authClient.signOut();
                  window.location.href = "/";
                }}
                className="bg-surface-container hover:bg-red-50 hover:text-red-600 dark:bg-neutral-850 dark:hover:bg-red-950/40 dark:hover:text-red-400 text-on-surface-variant rounded-xl font-semibold active:scale-[0.98] transition-all px-4 py-2.5 text-xs cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden sm:block">
              <Link
                href="/login"
                className="bg-primary text-on-primary dark:bg-neutral-100 dark:text-neutral-900 rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all px-6 py-2.5 text-sm inline-block text-center"
              >
                Login/Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary dark:text-neutral-200 focus:outline-none"
            aria-label="Toggle menu"
          >
              {isMenuOpen ? (
                <Xmark className="w-6 h-6" />
              ) : (
                <Bars className="w-6 h-6" />
              )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-950 border-t border-gray-100 dark:border-neutral-800 py-4 px-6 flex flex-col gap-4 animate-fade-in">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-semibold text-primary dark:text-neutral-200 hover:text-secondary py-1"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-50 dark:border-neutral-800">
            {isPending ? (
              <div className="w-full h-12 bg-surface-container animate-pulse rounded-xl" />
            ) : user ? (
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3 px-1 py-2">
                   {user?.image ? (
                     <Image
                       src={user.image}
                       alt={user.name || "User Avatar"}
                       width={36}
                       height={36}
                       className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-neutral-700"
                     />
                   ) : (
                     <div className="w-9 h-9 rounded-full bg-secondary-container text-white flex items-center justify-center font-bold text-sm uppercase">
                       {user?.name ? user.name[0] : (user?.email ? user.email[0] : "U")}
                     </div>
                   )}
                   <div className="flex flex-col">
                     <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                       {user?.name || "User"}
                     </span>
                     <span className="text-xs text-neutral-500 dark:text-neutral-400">
                       {user?.email}
                     </span>
                   </div>
                 </div>
                <button
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await authClient.signOut();
                    window.location.href = "/";
                  }}
                  className="w-full bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50 rounded-xl font-semibold py-3 flex justify-center text-sm cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="w-full bg-primary text-on-primary dark:bg-neutral-100 dark:text-neutral-900 rounded-xl font-semibold py-3 flex justify-center text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Login/Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

