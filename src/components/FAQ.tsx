"use client";

import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does NestFind verify property listings?",
    answer: "Every listing on NestFind undergoes a rigorous 5-point verification process, including physical site visits and title deed authentication to ensure total transparency and safety.",
  },
  {
    question: "Are there any fees for using the platform?",
    answer: "Browsing and searching for properties is 100% free for all users. We only charge standard transaction facilitation fees upon the successful closing of a property deal.",
  },
  {
    question: "Can I schedule a virtual tour?",
    answer: "Yes! Many of our listings offer 3D virtual walkthroughs, and you can also schedule live video tours with an agent through our integrated scheduling tool.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 max-w-3xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-neutral-100 mb-12 text-center">
        Frequently Asked Questions
      </h2>

      <Accordion
        variant="splitted"
        className="px-0"
        itemClasses={{
          base: "bg-white dark:bg-neutral-900 border border-gray-150 dark:border-neutral-800 rounded-2xl shadow-sm mb-4 px-4",
          title: "font-bold text-primary dark:text-neutral-200 text-base py-4",
          content: "text-on-surface-variant text-sm border-t border-gray-100 dark:border-neutral-800/80 pt-4 pb-4 leading-relaxed",
          trigger: "hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-xl px-2",
        }}
      >
        {FAQS.map((faq, idx) => (
          <AccordionItem
            key={idx}
            aria-label={faq.question}
            title={faq.question}
          >
            {faq.answer}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
