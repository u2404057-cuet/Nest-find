import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | NestFind",
  description: "Learn how NestFind collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "**Account Information:** When you register, we collect your name, email address, and role (buyer or agent). Passwords are hashed and never stored in plain text.",
      "**Property Listings:** Agents who submit listings provide property details including descriptions, pricing, location data, and images.",
      "**Usage Data:** We may collect anonymized information about how you interact with our platform, such as pages visited, search queries, and session duration, to improve our service.",
      "**Communications:** If you contact us via the contact form or email, we retain those messages to respond to your inquiry.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To create and manage your user account.",
      "To display property listings to prospective buyers and renters.",
      "To send you relevant updates about properties you've saved or inquired about (with your consent).",
      "To improve our platform through analytics and user feedback.",
      "To comply with legal obligations and enforce our Terms of Service.",
    ],
  },
  {
    title: "3. Data Sharing",
    content: [
      "We do not sell your personal information to third parties.",
      "Agent profile information (name, role, and listed properties) is publicly visible to help buyers find suitable representatives.",
      "We may share data with trusted service providers (e.g., cloud hosting, analytics) solely for operating the platform, under strict confidentiality agreements.",
      "We may disclose information if required by law or in response to valid legal processes.",
    ],
  },
  {
    title: "4. Cookies & Tracking",
    content: [
      "NestFind uses essential cookies to maintain your session and authentication state.",
      "We may use analytics cookies to understand aggregate traffic patterns. You can opt out through your browser settings.",
      "We do not use advertising or cross-site tracking cookies.",
    ],
  },
  {
    title: "5. Data Security",
    content: [
      "All data is transmitted over HTTPS using TLS encryption.",
      "Passwords are hashed using bcrypt before storage.",
      "Access to production databases is restricted to authorized personnel only.",
      "While we take security seriously, no system is completely immune to threats. We recommend using a strong, unique password for your NestFind account.",
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      "Account data is retained for as long as your account is active.",
      "If you delete your account, we will delete or anonymize your personal data within 30 days, except where retention is required by law.",
      "Property listing data submitted by agents may be retained for historical reference, attributed to an anonymized agent ID.",
    ],
  },
  {
    title: "7. Your Rights",
    content: [
      "**Access:** You have the right to request a copy of the personal data we hold about you.",
      "**Correction:** You may update your account information at any time through your profile settings.",
      "**Deletion:** You may request deletion of your account and associated data by contacting hello@nestfind.com.",
      "**Portability:** You may request a machine-readable export of your data.",
    ],
  },
  {
    title: "8. Contact",
    content: [
      "If you have questions or concerns about this Privacy Policy, please contact us at hello@nestfind.com or write to: NestFind, 123 Architecture Blvd, NY 10012.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-14 w-full">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Legal</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-on-surface-variant mt-3 font-light leading-relaxed">
            Last updated: <strong>July 15, 2026</strong>. This policy describes how NestFind collects, uses, and protects the personal data of users who access our platform.
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
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
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
