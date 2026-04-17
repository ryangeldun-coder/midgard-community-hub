"use client";

import FarmingOptimizer from "@/components/tools/FarmingOptimizer";
import { motion } from "framer-motion";

export default function FarmingPage() {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Midgard Farming Hub</h1>
        <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
          Don't just farm hard, farm smart. Our optimizer helps you find the most profitable spots based on current market trends.
        </p>
      </motion.div>

      <FarmingOptimizer />
    </main>
  );
}
