import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | NestFind",
  description: "Read the Terms of Service governing your use of the NestFind platform.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using the NestFind platform, you agree to be bound by these Terms of Service and our Privacy Policy.",
      "If you do not agree with any part of these terms, you must not use our platform.",
      "We reserve the right to update these terms at any time. Continued use after any modifications constitutes acceptance of the new terms.",
    ],
  },
  {
    title: "2. User Accounts",
    content: [
      "You must be at least 18 years old to create an account on NestFind.",
      "You are responsible for maintaining the security of your account credentials. Do not share your password with others.",
      "You must provide accurate, current, and complete information during registration.",
      "NestFind reserves the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.",
    ],
  },
  {
    title: "3. Agent Responsibilities",
    content: [
      "Agents who list properties on NestFind confirm that they have legal authorization to represent or advertise the listed properties.",
      "All property listings must contain accurate, truthful information. Misleading or fraudulent listings are strictly prohibited.",
      "Agents are responsible for keeping their listings up to date, including removing sold or rented properties promptly.",
      "NestFind is not a party to any transaction between agents and buyers/renters. We are a technology platform only.",
    ],
  },
  {
    title: "4. Buyer Responsibilities",
    content: [
      "Buyers and renters use the NestFind platform to discover and inquire about properties. All transactions must be conducted independently.",
      "NestFind does not guarantee the accuracy of any listing. Always perform independent due diligence before making financial commitments.",
      "Contacting agents through the platform must be done in good faith. Harassment or spamming of agents is prohibited.",
    ],
  },
  {
    title: "5. Prohibited Activities",
    content: [
      "Posting false, misleading, or fraudulent property listings.",
      "Scraping, copying, or redistributing platform content without written permission.",
      "Attempting to gain unauthorized access to other user accounts or our server infrastructure.",
      "Using the platform to facilitate illegal transactions or money laundering.",
      "Uploading malicious software, viruses, or any content that disrupts normal platform operation.",
    ],
  },
  {
    title: "6. Intellectual Property",
    content: [
      "The NestFind brand, logo, design, and proprietary code are the intellectual property of NestFind and may not be used without express permission.",
      "Property images and descriptions submitted by agents remain the property of the submitting party but grant NestFind a non-exclusive license to display them on the platform.",
      "Feedback or suggestions you submit to us may be incorporated into the platform without compensation.",
    ],
  },
  {
    title: "7. Disclaimers and Limitation of Liability",
    content: [
      "NestFind is provided on an 'as-is' and 'as-available' basis without warranties of any kind.",
      "We do not guarantee uninterrupted access, error-free operation, or the accuracy of third-party property data.",
      "To the maximum extent permitted by law, NestFind shall not be liable for indirect, incidental, special, or consequential damages arising from your use of the platform.",
    ],
  },
  {
    title: "8. Governing Law",
    content: [
      "These terms shall be governed by the laws of the State of New York, without regard to conflict of law principles.",
      "Any dispute arising from these terms shall be submitted to binding arbitration in New York, NY.",
    ],
  },
  {
    title: "9. Contact",
    content: [
      "For questions about these Terms of Service, contact us at hello@nestfind.com or write to: NestFind, 123 Architecture Blvd, NY 10012.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-14 w-full">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Legal</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">Terms of Service</h1>
          <p className="text-sm text-on-surface-variant mt-3 font-light leading-relaxed">
            Last updated: <strong>July 15, 2026</strong>. Please read these terms carefully before using the NestFind platform.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title} className="bg-surface-container-lowest border border-outline-variant/25 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold text-primary mb-4">{section.title}</h2>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="text-sm text-on-surface-variant leading-relaxed flex gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-secondary rounded-full shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
