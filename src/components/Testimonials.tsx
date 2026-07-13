"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: string;
  stars: number;
  text: string;
  name: string;
  role: string;
  image: string;
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    stars: 5,
    text: "NestFind turned a stressful search into an absolute pleasure. Their attention to architectural detail was exactly what I needed for my new studio.",
    name: "David Chen",
    role: "Architectural Designer",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDSHBLjyW5B5BEZSvUtoSCahEvz_qLNUkLPI290RtsYWTHhXsJq933jued5Sypyt9sOuxU90Jn7issmmBG1A1wgNqUpYJHJ_iN_aZXa7ZRywa43MvcPPrmFEMr6vVVYeqmZAcmknR17VZ9LLn-8WIGlGe_7DCI-Ccwel1i3272Ut3S9T1SSP-DX-myAM6kUduhstOYM75kXk7iMnhNksJHQQGGqTqtXwKZbLgH_skltEoSxNtUg-6JQw",
  },
  {
    id: "2",
    stars: 5,
    text: "The level of professionalism and the quality of listings on this platform are unmatched. We found our forever home in just two weeks!",
    name: "The Robertsons",
    role: "New Homeowners",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAohxZgtyBsLeEJnpY4Q6iuoQu3UN8PHyOABRy_NfdsGgzO6EE7PoXYFlQ_K0UfuQGJlYOm6U69O61xfYnhHBHyAWQO0Mh_XWGQx-iYF44knbhQ10CJ1k_AdXTDiT5TTF9BoPv0PbMAzS4EbxkKSLwa7Xbq7BVrfounVd7DPBur2UkpQ5V77WsVdHWqJqrlGa6ltSViRaxMN00Zp8wv2Yv1rOBRj8TKP7CKgmGuPptSfCHFj1Pv_443Fg",
  },
  {
    id: "3",
    stars: 5,
    text: "I've worked with many real estate platforms, but NestFind's data-driven approach and premium interface make it my primary tool now.",
    name: "James Wilson",
    role: "Real Estate Investor",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH1jqohf3Cdx4U37V0h9hCdpBsD1p-ZaPrGNXxOHIMuU1vsnFe9bYaKzEQBLI3w_lEwioak5H8G5D6ZOVqfbjsYjWL9ia9K1xH6PoA4VVunH-AoQLN-VLXe0zrcJSnTMAJonxM05Ooe0-CsJnS2owVrymmeTlFHsrQHkpJynQSDVooRNxQqJx8-gDkSoQNQNgpvJVd1QI781DiObAzTzsIi1f8FBCx3sJ71y_mlD-LuS22g-PzzSPwLA",
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    fetch("http://localhost:5000/api/testimonials")
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch live testimonials, using fallback data:", err.message);
      });
  }, []);

  return (
    <section className="py-20 bg-surface-container-high dark:bg-neutral-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-neutral-100 mb-12 text-center">
          What Our Clients Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border-b-4 border-secondary flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex text-secondary-container mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="italic text-on-surface dark:text-neutral-300 text-sm leading-relaxed mb-6">
                  &quot;{t.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-gray-50 dark:border-neutral-800/55 pt-4">
                <Image
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                  alt={t.name}
                  src={t.image}
                  width={48}
                  height={48}
                />
                <div>
                  <h4 className="font-bold text-primary dark:text-neutral-200 text-sm">
                    {t.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
