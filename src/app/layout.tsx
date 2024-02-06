"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [client] = useState(new QueryClient());

  return (
    <html lang="en">
      <QueryClientProvider client={client}>
        <body className={inter.className}>{children}</body>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </html>
  );
}
