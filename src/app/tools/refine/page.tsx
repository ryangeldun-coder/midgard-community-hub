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


    </main>
  );
}
