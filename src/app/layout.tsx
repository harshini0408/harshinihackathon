import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LogisticsNow | India's National Logistics Intelligence Grid",
  description: "Powering India's National Logistics Intelligence Grid with autonomous AI agents. Procurement, optimization, and sustainability at national scale.",
  keywords: "LogisticsNow, National Logistics Grid, AI Agents, LoRRI, Supply Chain Intelligence, Logistics Optimization, Freight Benchmarking",
  openGraph: {
    title: "LogisticsNow | India's National Logistics Intelligence Grid",
    description: "Autonomous AI agents orchestrating procurement, route optimization, and sustainability across India's logistics network.",
    type: "website",
    url: "https://logisticsnow.in",
    siteName: "LogisticsNow",
  },
  twitter: {
    card: "summary_large_image",
    title: "LogisticsNow | National Logistics Intelligence Grid",
    description: "Autonomous AI agents orchestrating India's logistics network at national scale.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        <meta name="theme-color" content="#0a0e1a" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme') || 'dark';
              document.documentElement.setAttribute('data-theme', theme);
              if (theme === 'light') {
                document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f8fafc');
              }
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
