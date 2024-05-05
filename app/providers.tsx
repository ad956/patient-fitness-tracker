"use client";

import { NextUIProvider } from "@nextui-org/react";
import ErrorBoundary from "@components/error-boundary"; // Import the ErrorBoundary component

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ErrorBoundary>{children}</ErrorBoundary>
    </NextUIProvider>
  );
}
