"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      richColors
      position="top-right"
      closeButton
      toastOptions={{
        className: "font-sans",
      }}
    />
  );
}
