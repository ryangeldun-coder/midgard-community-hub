"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Hammer, Scroll, FlaskConical, Star, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '6rem 0', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <span className="ro-window" style={{ 
            color: 'var(--ro-red)', 
            padding: '4px 12px', 
            fontSize: '0.75rem', 
            fontWeight: 800,
            marginBottom: '1rem',
            display: 'inline-block',
            background: '#fff',
            borderRadius: '6px'
          }}>
            MIDGARD ZERO GLOBAL HUB
          </span>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: '1rem',
            background: 'linear-gradient(to right, var(--ro-red), var(--ro-accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1.5px'
          }}>
            Master the World <br /> of Ragnarok Zero
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            opacity: 0.8, 
            maxWidth: '650px', 
            marginBottom: '3rem', 
            lineHeight: 1.6,
            margin: '0 auto 3rem',
            color: '#475569',
            fontWeight: 400
          }}>
            Explore the deep history of Midgard with <strong>Ryan Geldun</strong>. 
            The ultimate companion hub for lore seekers and master blacksmiths.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
            <Link href="/tools/refine" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Hammer size={18} />
              Refine Simulator
            </Link>
            <Link href="/tools/brewing" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FlaskConical size={18} />
              Alchemist Brewing
            </Link>
            <Link href="/tools/farming" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={18} />
              Farming Optimizer
            </Link>
            <Link href="/tools/leveling" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} />
              Leveling Path
            </Link>
            <Link href="/lore" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scroll size={18} />
              Lore Archives
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
