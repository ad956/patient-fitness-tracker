"use client";

import { NextUIProvider } from "@nextui-org/react";
import ErrorBoundary from "@components/ErrorBoundary"; // Import the ErrorBoundary component

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ErrorBoundary>{children}</ErrorBoundary>
    </NextUIProvider>
  );
}
