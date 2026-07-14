"use client";

import React, { useState } from "react";
import { Button, Modal, ModalBackdrop, ModalContainer, ModalDialog, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log(`Subscribed: ${email}`);
      setIsOpen(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-primary py-16 text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Get Exclusive Property Alerts
          </h2>
          <p className="opacity-80 text-sm md:text-base font-light">
            Be the first to know about new listings in your preferred areas.
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="w-full max-w-md flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            suppressHydrationWarning
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-secondary text-white placeholder:text-white/60 transition-all font-sans"
          />
          <Button
            type="submit"
            className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all text-sm shrink-0"
          >
            Subscribe
          </Button>
        </form>
      </div>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button className="hidden">Hidden Trigger</Button>
        <ModalBackdrop variant="blur">
          <ModalContainer placement="center">
            <ModalDialog>
              <ModalHeader>Subscription Successful</ModalHeader>
              <ModalBody>
                Thank you for subscribing! You will receive property alerts soon.
              </ModalBody>
              <ModalFooter>
                <Button className="bg-primary text-white" onPress={() => setIsOpen(false)}>
                  Close
                </Button>
              </ModalFooter>
            </ModalDialog>
          </ModalContainer>
        </ModalBackdrop>
      </Modal>
    </section>
  );
}
