"use client";

import LevelingPath from "@/components/tools/LevelingPath";
import { motion } from "framer-motion";

export default function LevelingPage() {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Path to Glory</h1>
        <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
          Stop wondering where to go next. Use our navigator to find the perfect map for your current power level.
        </p>
      </motion.div>

      <LevelingPath />
    </main>
  );
}
