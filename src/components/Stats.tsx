"use client";

import React, { useEffect, useRef, useState } from "react";

interface CounterProps {
  target: number;
  suffix?: string;
}

function Counter({ target, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const duration = 2000; // 2 seconds

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Ease out quad formula
            const easeOutQuad = progress * (2 - progress);
            setCount(Math.floor(easeOutQuad * target));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, hasAnimated]);

  return (
    <div
      ref={elementRef}
      className="text-4xl md:text-5xl font-extrabold text-primary-fixed mb-2 tracking-tight"
    >
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-primary-container py-16 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center">
          <Counter target={2500} suffix="+" />
          <p className="text-xs font-semibold text-on-primary-container uppercase tracking-widest mt-1">
            Properties Listed
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Counter target={45} suffix="+" />
          <p className="text-xs font-semibold text-on-primary-container uppercase tracking-widest mt-1">
            Cities Covered
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Counter target={12000} suffix="+" />
          <p className="text-xs font-semibold text-on-primary-container uppercase tracking-widest mt-1">
            Happy Clients
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Counter target={150} suffix="+" />
          <p className="text-xs font-semibold text-on-primary-container uppercase tracking-widest mt-1">
            Expert Agents
          </p>
        </div>
      </div>
    </section>
  );
}
