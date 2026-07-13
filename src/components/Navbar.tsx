"use client";

import React, { useState } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button
} from "@heroui/react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#", active: true },
    { name: "Properties", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <HeroNavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_20px_rgba(10,37,64,0.05)] border-b border-surface-container"
      maxWidth="xl"
    >
      <NavbarContent className="pr-3" justify="start">
        <NavbarBrand className="flex items-center gap-2">
          <img
            alt="NestFind Logo"
            className="h-10 w-10 object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhuLUcHqIqU3iA1w28SsbeTDMTaUEj_UCXyraAcSxYcC2k-oJXKkdFIe5hWsW5eWpqKVJM1sPPXBeh1Os40XSBsKKLPvlw_99UeGwv1tBSclNn0qyyjue6zdKDX_FJNYyxMkKOelRhmOzf-cRvSHpSLya5nBU_VW7JHI22zcrX8Jpp7FxBxaNZTKQp3j57C3xdQ_aYTCfPSZ3gGbalxYhsgtEofGbonD1_0vZ-p4vN8FfvbuGNI5iqFQ"
          />
          <span className="font-bold text-xl text-primary font-sans tracking-tight">
            NestFind
          </span>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-8" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                item.active
                  ? "text-primary border-b-2 border-secondary-container pb-1"
                  : "text-on-surface-variant"
              }`}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="solid"
            className="bg-primary text-on-primary rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all px-6"
          >
            Login/Register
          </Button>
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-primary"
        />
      </NavbarContent>

      <NavbarMenu className="bg-surface/95 backdrop-blur-md pt-6 px-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full text-lg py-2 block text-primary hover:text-secondary"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="pt-4">
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="solid"
            className="w-full bg-primary text-on-primary rounded-xl font-semibold py-3"
            onClick={() => setIsMenuOpen(false)}
          >
            Login/Register
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
}
