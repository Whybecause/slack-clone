"use client";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_CONVEX_DEPLOYMENT_URL : process.env.NEXT_PUBLIC_CONVEX_URL

const convex = new ConvexReactClient(convexUrl!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthNextjsProvider client={convex}>
      {children}
    </ConvexAuthNextjsProvider>
  );
}
