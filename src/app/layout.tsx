import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import LoreVideoSection from "@/components/layout/LoreVideoSection";

export const metadata: Metadata = {
  title: "Midgard Community Hub | Ragnarok Online Tools & Lore",
  description: "The ultimate companion for Ragnarok Online players. Refine simulators, farming guides, and leveling paths.",
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
            <LoreVideoSection />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
