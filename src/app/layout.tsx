import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://midgardhub.com'),
  title: "Midgard Community Hub | Ragnarok Zero Global Database & Simulators",
  description: "The most complete Ragnarok Zero Global database (data based on TWRo Zero). Monster stats, item drops, refine simulator, forge calculator, and memorial dungeon guides.",
  keywords: ["Ragnarok Zero Global", "TWRo Zero", "Ragnarok Zero", "Monster Database", "Item Database", "Refine Simulator", "Forge Calculator", "Alchemist Brewing", "Memorial Dungeons", "Ryan Geldun", "Midgard Hub"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Providers>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '6rem auto 2rem', 
            background: 'white', 
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            minHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{ flexGrow: 1 }}>
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
