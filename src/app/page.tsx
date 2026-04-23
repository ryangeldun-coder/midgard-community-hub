"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Hammer, Scroll, FlaskConical, Bug, Sword, Wrench, Layers, Zap, 
  Map as MapIcon, BookOpen, Video, Sparkles, Trophy, Globe, Search, ArrowRight
} from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 8rem' }}>
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '8rem 0 5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div style={{ 
            background: 'linear-gradient(90deg, rgba(225, 29, 72, 0.1) 0%, rgba(225, 29, 72, 0.02) 100%)', 
            color: 'var(--ro-red)', 
            padding: '8px 20px', 
            fontSize: '0.75rem', 
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '2rem',
            display: 'inline-block',
            borderLeft: '4px solid var(--ro-red)',
            borderRadius: '4px'
          }}>
            Midgard Community Hub
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
            fontWeight: 900, 
            lineHeight: 1, 
            marginBottom: '2rem',
            color: '#0f172a',
            letterSpacing: '-3px'
          }}>
            Ragnarok <br /> 
            <span style={{ 
              background: 'linear-gradient(135deg, var(--ro-red) 0%, #be123c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Zero Global Hub</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#475569', 
            maxWidth: '600px', 
            margin: '0 auto 4rem',
            lineHeight: 1.6,
            fontWeight: 500
          }}>
            The definitive resource for <strong>Ragnarok Zero Global</strong>. 
            High-authority guides, server-accurate databases, and master simulators.
          </p>
        </motion.div>
      </section>

      {/* Primary Pillars */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2rem',
          marginBottom: '5rem'
        }}
      >
        {/* Academy Pillar */}
        <motion.div variants={item}>
          <Link href="/guides" style={{ textDecoration: 'none' }}>
            <div className="pillar-card academy">
              <div className="pillar-content">
                <div className="pillar-tag">FEATURED</div>
                <h3>Midgard Academy</h3>
                <p>12-class master library with TWROZ-optimized meta builds and gear sets.</p>
                <div className="pillar-action">Explore Academy <ArrowRight size={16} /></div>
              </div>
              <BookOpen className="pillar-icon" size={140} />
            </div>
          </Link>
        </motion.div>

        {/* Database Pillar */}
        <motion.div variants={item}>
          <Link href="/database/monsters" style={{ textDecoration: 'none' }}>
            <div className="pillar-card database">
              <div className="pillar-content">
                <div className="pillar-tag">REAL-TIME</div>
                <h3>Global Database</h3>
                <p>Search over 4,000 monsters, items, and maps with accurate drop rates.</p>
                <div className="pillar-action">Browse Data <ArrowRight size={16} /></div>
              </div>
              <Search className="pillar-icon" size={140} />
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Utility Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem' 
        }}
      >
        <Link href="/tools/refine" className="utility-btn">
          <div className="u-icon"><Hammer size={20} /></div>
          <div className="u-text">
            <span>Refine Simulator</span>
            <small>Test your luck on +10 gear</small>
          </div>
        </Link>
        <Link href="/tools/forge" className="utility-btn">
          <div className="u-icon"><Wrench size={20} /></div>
          <div className="u-text">
            <span>Forge Mastery</span>
            <small>Blacksmith success rates</small>
          </div>
        </Link>
        <Link href="/tools/brewing" className="utility-btn">
          <div className="u-icon"><FlaskConical size={20} /></div>
          <div className="u-text">
            <span>Alchemist Brewing</span>
            <small>Optimal potion formulas</small>
          </div>
        </Link>
        <Link href="/guides/quests" className="utility-btn">
          <div className="u-icon"><Scroll size={20} /></div>
          <div className="u-text">
            <span>Epic Quest Path</span>
            <small>Lv. 1-99 quest timeline</small>
          </div>
        </Link>
        <Link href="/lore" className="utility-btn">
          <div className="u-icon"><Video size={20} /></div>
          <div className="u-text">
            <span>Video Archives</span>
            <small>Lore & strategy guides</small>
          </div>
        </Link>
      </motion.div>

      <style jsx>{`
        .pillar-card {
          position: relative;
          padding: 3rem;
          border-radius: 32px;
          color: white;
          overflow: hidden;
          height: 320px;
          display: flex;
          align-items: center;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .pillar-card:hover {
          transform: translateY(-10px) scale(1.02);
        }
        .pillar-card.academy {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        }
        .pillar-card.database {
          background: linear-gradient(135deg, var(--ro-red) 0%, #991b1b 100%);
        }
        .pillar-content {
          position: relative;
          z-index: 2;
          max-width: 260px;
        }
        .pillar-tag {
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 1.5px;
          opacity: 0.6;
          margin-bottom: 1rem;
        }
        .pillar-card h3 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .pillar-card p {
          font-size: 0.95rem;
          line-height: 1.6;
          opacity: 0.8;
          margin-bottom: 2rem;
        }
        .pillar-action {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          font-size: 0.9rem;
          color: white;
        }
        .pillar-icon {
          position: absolute;
          right: -20px;
          bottom: -20px;
          opacity: 0.1;
          z-index: 1;
        }

        .utility-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 1.5rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .utility-btn:hover {
          border-color: var(--ro-red);
          box-shadow: 0 10px 20px rgba(225, 29, 72, 0.05);
          transform: translateY(-2px);
        }
        .u-icon {
          padding: 12px;
          background: #f8fafc;
          border-radius: 12px;
          color: #64748b;
          transition: all 0.2s;
        }
        .utility-btn:hover .u-icon {
          background: rgba(225, 29, 72, 0.1);
          color: var(--ro-red);
        }
        .u-text span {
          display: block;
          font-weight: 800;
          color: #1e293b;
          font-size: 1rem;
        }
        .u-text small {
          display: block;
          color: #94a3b8;
          font-size: 0.75rem;
          font-weight: 500;
        }
      `}</style>
    </main>
  );
}
