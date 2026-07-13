"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeading,
  AccordionTrigger,
  AccordionPanel,
  AccordionBody
} from "@heroui/react";
import { ChevronDown } from "@gravity-ui/icons";

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

      <div className="flex flex-col gap-4">
        {FAQS.map((faq, idx) => (
          <AccordionItem
            key={idx}
            className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-sm px-6 py-2 transition-all hover:border-gray-300 dark:hover:border-neutral-700"
          >
            <AccordionHeading>
              <AccordionTrigger className="w-full flex items-center justify-between text-left font-bold text-primary dark:text-neutral-200 text-base py-4 focus:outline-none cursor-pointer group">
                <span>{faq.question}</span>
                <ChevronDown className="w-5 h-5 transition-transform duration-300 group-expanded:rotate-180 text-gray-400 shrink-0" />
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionPanel className="overflow-hidden transition-all duration-300 ease-in-out">
              <AccordionBody className="text-on-surface-variant dark:text-neutral-400 text-sm border-t border-gray-100 dark:border-neutral-800 pt-4 pb-4 leading-relaxed">
                {faq.answer}
              </AccordionBody>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}
