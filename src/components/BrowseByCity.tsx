"use client";

import React from "react";

interface City {
  id: string;
  name: string;
  count: number;
  image: string;
}

const CITIES: City[] = [
  {
    id: "1",
    name: "New York",
    count: 840,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFk2wHUuqEwRJZEdd3gn9g_NyUl0YCqcyXB2LH5DEAuSB1R6CcUyku0y9mJd83eFX4O5MKSs53E-ScguGNngi1X0z-CGCY27YQwvQTUfVn9ASP5HzJdQMDh8Tol_vvAYuv6ISlN5_-TQbHLbpGfY34AqiCiuvx_jYE7yKwhtHaYR7c7S1KIqEjmeGuYKIQF7RToCgWCFJ6OZQdnZi0DAwdIfYtJnbJdTiS1JXL_lSthJTcFWpjYPFoSA",
  },
  {
    id: "2",
    name: "Los Angeles",
    count: 620,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLvTb94u00bZVqF7nOldTiAUku61Rs8XmjaO1DEwFxoMA2yMFw9hzNzbTRCk5N_lNuEfsDaBCb_2O-GkYaQNSfCdZ68b66Y5JNqHa2y7000t8Qv8GLU9PvKBqmKrrwHf9OKdhrQp5900GL4NJzp0G40PcQbnfNvd3c6RsffDrv3VrJtrThJCAdgSC7-PQGOJ_qeKqtNmkhlojbRziLtRP3u__iZE_gMIR3r2JQyFRYFhLwtr1rnRB-MQ",
  },
  {
    id: "3",
    name: "Miami",
    count: 415,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1pUFBSIEXxKcVzlwo5E7jGEAWXKcfAdq0YC393f__MyNhnVUXsfXwwXKRVDG9VIU77RzF7KN3OqNF69Fz-XjyEIu_9gEFzsKvMsgdDiTg63iyj-G7KU5s9uwlQp2L6oxK2N98ZRQLI-gTF9SNX3-UzOfCEsRXylHxaf2BuXb02i54hGmPQfICVUDkleJ3rAvKJalMgkYjnqYC4IOGdL61g_MPni43HPUBSl3g0jLdws4QUqYCwhqVKQ",
  },
  {
    id: "4",
    name: "San Francisco",
    count: 310,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJYIoI9QsAoBFfT8u4kz-xJhUwD-bKwCRz1tg-_sjr7FWmq_UqTwELulhqRHMlbct1tp5BFyGCfNzcddgO4mxcCFx9JhBo5VjUDdiOiJlGwHarUG75K2Zy9NfsqGK0aHcaFBiIo-XUa-3I2d8ox72BA74gDadGDjAgQBiH_CXdyWsVcMyqwT59RYydwbjzl7WFtq3M0ThlJy2V-f7CiekvmYi7e9LO16zBmSDqsekaa4EN5_HgacRsrQ",
  }
];

export default function BrowseByCity() {
  return (
    <section className="py-20 bg-surface-container-low dark:bg-neutral-900/40">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-neutral-100 mb-12 text-center">
          Browse by City
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CITIES.map((city) => (
            <a
              key={city.id}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow block"
              href="#"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url('${city.image}')` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

              {/* Text info */}
              <div className="absolute bottom-6 left-6 text-white z-10">
                <p className="text-xs uppercase tracking-widest text-secondary-container font-bold mb-1">
                  {city.count} Properties
                </p>
                <h3 className="text-2xl font-bold font-sans tracking-tight">
                  {city.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
