"use client";

import * as React from "react";
import { Toast } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toast.Provider />
      {children}
    </>
  );
}
