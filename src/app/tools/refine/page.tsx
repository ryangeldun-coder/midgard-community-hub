"use client";

import RefineSimulator from "@/components/tools/RefineSimulator";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function RefinePage() {
  return (
    <main style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '4rem 2rem' 
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>The Kafra's Gamble</h1>
        <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
          Test your luck before wasting Zeny in-game. Our simulator uses authentic success rates from the official servers.
        </p>
      </motion.div>

      <RefineSimulator />

      {/* SEO Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem', width: '100%' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          The <strong>Ragnarok Zero Refine Simulator</strong> is a powerful tool for calculating your success rates when upgrading gear. Specifically tuned for Ragnarok Zero Global (data based on TWRo Zero), it supports refining with Elunium, Oridecon, and the newer <strong>Zelunium and Shadowdecon</strong> ores. Our simulator includes the unique <strong>Blessed Blacksmith Ore (BSB) pity system</strong>, allowing you to run Monte Carlo simulations to estimate the total cost and material requirements for reaching +10, +12, or even +20. Don't leave your refines to chance—calculate your risks and optimize your zeny spending.
        </p>
      </section>
    </main>
  );
}
