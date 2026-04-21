"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Hammer, Scroll, FlaskConical, Bug, Sword, Wrench, Layers, Zap, Map as MapIcon } from "lucide-react";

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
            Midgardhub.com
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
            <Link href="/tools/planner" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--ro-red)', color: 'white', border: 'none', boxShadow: '0 4px 12px rgba(174,32,18,0.2)' }}>
              <Zap size={18} />
              Ultimate Build Planner
            </Link>
            <Link href="/database/monsters" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bug size={18} />
              Monster Database
            </Link>
            <Link href="/database/items" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sword size={18} />
              Item Database
            </Link>
            <Link href="/database/maps" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapIcon size={18} />
              Map Database
            </Link>
            <Link href="/tools/refine" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0' }}>
              <Hammer size={18} />
              Refine Simulator
            </Link>
            <Link href="/tools/forge" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0' }}>
              <Wrench size={18} />
              Forge Simulator
            </Link>
            <Link href="/tools/brewing" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0' }}>
              <FlaskConical size={18} />
              Alchemist Brewing
            </Link>
            <Link href="/dungeons" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0' }}>
              <Layers size={18} />
              Memorial Dungeons
            </Link>
            <Link href="/lore" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0' }}>
              <Scroll size={18} />
              Lore Archives
            </Link>
          </div>
        </motion.div>
      </section>

      {/* SEO Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          Welcome to the <strong>Midgard Community Hub</strong>, your premier destination for everything <strong>Ragnarok Zero Global</strong>. Our platform provides an extensive database and advanced toolset (data based on <strong>TWRo Zero</strong>) featuring the **Ultimate Build Planner** for real-time character simulation, accurate monster stats, drop tables, and item locations translated directly into English. Whether you're looking for a <strong>refine simulator</strong> to test your luck with Zelunium and Shadowdecon, a <strong>Blacksmith forge calculator</strong> for high-level weapon crafting, or <strong>Alchemist brewing rates</strong>, our tools are designed to optimize your gameplay. Join the community led by <strong>Ryan Geldun</strong> and dive deep into the <strong>Ragnarok Online lore</strong> with our curated video archives. Stay ahead of the game with the most reliable Ragnarok Zero Global tools and information available today.
        </p>
      </section>
    </main>
  );
}
