import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LoRRI AI | Intelligence Platform for Modern Logistics",
  description: "LoRRI transforms logistics decisions using predictive AI and real-time freight intelligence. Reduce costs, predict delays, optimize routes.",
  keywords: "LoRRI AI, Logistics Intelligence, Freight AI, Supply Chain Optimization, Predictive Logistics",
  openGraph: {
    title: "LoRRI AI | Intelligence Platform for Modern Logistics",
    description: "Predictive AI and real-time freight intelligence for modern logistics networks.",
    type: "website",
    url: "https://lorri.ai",
    siteName: "LoRRI AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "LoRRI AI | Intelligence Platform for Modern Logistics",
    description: "Predictive AI and real-time freight intelligence for modern logistics networks.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
