"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Hammer, Scroll, FlaskConical, Bug, Sword, Wrench, Layers, Zap, 
  Map as MapIcon, BookOpen, PenTool, Youtube, Sparkles, Trophy, Globe
} from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 6rem' }}>
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '6rem 0 4rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ 
            background: 'rgba(225, 29, 72, 0.05)', 
            color: 'var(--ro-red)', 
            padding: '6px 16px', 
            fontSize: '0.7rem', 
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1.5rem',
            display: 'inline-block',
            border: '1px solid rgba(225, 29, 72, 0.2)',
            borderRadius: '100px'
          }}>
            The Definitive Ragnarok Zero Global Resource
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
            fontWeight: 900, 
            lineHeight: 1, 
            marginBottom: '1.5rem',
            color: '#0f172a',
            letterSpacing: '-2px'
          }}>
            Master Your <br /> 
            <span style={{ 
              background: 'linear-gradient(to right, var(--ro-red), var(--ro-accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Midgard Journey</span>
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#64748b', 
            maxWidth: '600px', 
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}>
            From veteran-verified class guides to real-time simulators and data archives. 
            The all-in-one hub for the <strong>Ragnarok Zero</strong> community.
          </p>
        </motion.div>
      </section>

      {/* Main Feature Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '4rem'
        }}
      >
        {/* Flagship: Academy */}
        <motion.div variants={item} style={{ gridColumn: 'span 2' }}>
          <Link href="/guides" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              padding: '2.5rem', 
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
              borderRadius: '24px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ro-red)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '1rem' }}>
                  <Trophy size={16} /> FEATURED RESOURCE
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Midgard Academy</h2>
                <p style={{ opacity: 0.7, marginBottom: '1.5rem', maxWidth: '400px' }}>
                  12 comprehensive class guides with TWROZ-optimized meta builds, gear sets, and leveling paths.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 600 }}>All 2-2 Classes Live</span>
                  <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 600 }}>100% TWROZ Meta</span>
                </div>
              </div>
              <BookOpen size={160} style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.05, color: 'white' }} />
            </div>
          </Link>
        </motion.div>

        {/* Simulator Card */}
        <motion.div variants={item}>
          <Link href="/tools/refine" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              padding: '2rem', 
              background: 'white', 
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s'
            }}>
              <div style={{ width: '48px', height: '48px', background: '#fef2f2', color: 'var(--ro-red)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Hammer size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#1e293b' }}>Refine Simulator</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', flexGrow: 1 }}>Test your luck with server-accurate rates for Zelunium, Shadowdecon, and Enriched ores.</p>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Categories Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem' 
        }}
      >
        {/* Database Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontWeight: 800, fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Global Database</h4>
          <Link href="/database/monsters" className="nav-card">
            <Bug size={18} /> Monster Stats & Drops
          </Link>
          <Link href="/database/items" className="nav-card">
            <Sword size={18} /> Item Search & Effects
          </Link>
          <Link href="/database/maps" className="nav-card">
            <MapIcon size={18} /> World Maps & Spawns
          </Link>
        </div>

        {/* Master Simulators Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontWeight: 800, fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Master Simulators</h4>
          <Link href="/tools/forge" className="nav-card">
            <Wrench size={18} /> Blacksmith Forge Rates
          </Link>
          <Link href="/tools/brewing" className="nav-card">
            <FlaskConical size={18} /> Alchemist Brewing Calculator
          </Link>
          <Link href="/dungeons" className="nav-card">
            <Layers size={18} /> Memorial Dungeon Guide
          </Link>
        </div>

        {/* Creator Hub Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontWeight: 800, fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Creator Hub</h4>
          <Link href="/tools/planner" className="nav-card">
            <PenTool size={18} /> Content & Lore Planner
          </Link>
          <Link href="/lore" className="nav-card">
            <Youtube size={18} /> Video Archives
          </Link>
          <Link href="/roulette" className="nav-card">
            <Sparkles size={18} /> Midgard Roulette
          </Link>
        </div>
      </motion.div>

      <style jsx>{`
        .nav-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 1rem 1.5rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          text-decoration: none;
          color: #475569;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .nav-card:hover {
          border-color: var(--ro-red);
          color: var(--ro-red);
          transform: translateX(4px);
          background: #fffafa;
        }
      `}</style>

      {/* About Section */}
      <section style={{ marginTop: '6rem', padding: '4rem', background: '#f8fafc', borderRadius: '32px', textAlign: 'center' }}>
        <Globe size={40} style={{ color: '#cbd5e1', marginBottom: '1.5rem' }} />
        <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
          Welcome to the <strong>Midgard Community Hub</strong>, the premier destination for <strong>Ragnarok Zero Global</strong>. 
          Powered by data from <strong>TWRo Zero</strong>, our platform offers server-accurate <strong>Refine Simulators</strong>, 
          <strong>Blacksmith Forge Rates</strong>, and the legendary <strong>Midgard Academy</strong>. Whether you're a content creator 
          using our <strong>Lore Planner</strong> or a player chasing the meta, we provide the tools you need to master Midgard.
        </p>
      </section>
    </main>
  );
}
