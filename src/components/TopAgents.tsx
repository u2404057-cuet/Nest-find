"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Agent {
  id: string;
  name: string;
  role: string;
  listings: number;
  image: string;
}

const FALLBACK_AGENTS: Agent[] = [
  {
    id: "1",
    name: "Sarah Kensington",
    role: "Luxury Estates Specialist",
    listings: 142,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANKYAq-CmnmP7LW7b3gmiUW44BsRdOyEJq9kpQwLmWq0yLKgip9BXyShzFOwzeDtnlWYdfezIUK4zXs8kZiPf4U6IE_fYD2k0rL3zRTkOF6UbRaAN0bNH97arBDJs5Z-fUGssH0uX9fcZaG-Z9x9Hi_CEkR3nloE3vgozZU94HZ9pUExV6jwOUps7YAZJSypbtKyGQOsIRGBgbxYpokFhWu7ORLEN3mTdxolEZ7nSZjuDM5Zm0wn8MYw"
  },
  {
    id: "2",
    name: "Marcus Thorne",
    role: "Urban Loft Expert",
    listings: 98,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZEuricKO0ilqfki-QJolibxLhVLIoYROQPk6Wi_0Ej-IJBTGc5MphMUdeGQ6Px0Pe5_IihUJngE9HMBhDHwZnzVFcuSwNe9cvhUWHKlOVwLkJNqYsebbt2xmi9ctV9v2pswO_S181rU2nBdul1MwZN63bI_nkdKIEz_wqc2OwA3DJadc9_AolCBYH-oRqo1uTRIBUHZ6QWv8aki0vQEVCHm0qYNoYmkglI4SfixwfAxgeG_FKxn9meg"
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Investment Portfolio Advisor",
    listings: 115,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCR28PLdjQrSjB_LZhc3apJZHb4Axe6BJa1-qHRWD1fmpawre3n2ASMa74ngwRCh11dePP_HkZEHW9uXyov8EihSR8F7S9QCjkNJfmlXbS5OnQXphTHu4CKZTz_-y2M1XvZGMAIsoJ6K1hfDnrIz7oQxe0Vr4MCF9hN6sm7D0dYkpV1c28tTrGN9yiw1ksepw8cXGC9nC-mcWbhDceW6E6sIdcgd2slvcUGPMf4aKZ0O8gBd545nKKT8g"
  }
];

export default function TopAgents() {
  const [agents, setAgents] = useState<Agent[]>(FALLBACK_AGENTS);

  useEffect(() => {
    fetch("http://localhost:5000/api/agents")
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAgents(data);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch live agents, using fallback data:", err.message);
      });
  }, []);

  return (
    <section className="py-20 bg-surface dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-neutral-100 mb-12 text-center">
          Meet Our Top Agents
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-6 border border-gray-100 dark:border-neutral-800"
            >
              <Image
                className="w-24 h-24 rounded-full object-cover shrink-0"
                alt={agent.name}
                src={agent.image}
                width={96}
                height={96}
              />
              <div>
                <h3 className="text-lg font-bold text-primary dark:text-neutral-100 mb-1">
                  {agent.name}
                </h3>
                <p className="text-on-surface-variant text-sm mb-3">
                  {agent.role}
                </p>
                <div className="flex items-center gap-1.5 text-secondary font-bold text-sm">
                  <span className="material-symbols-outlined text-base">
                    home
                  </span>
                  {agent.listings} Listings
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
