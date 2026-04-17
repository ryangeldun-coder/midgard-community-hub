"use client";

import { motion } from "framer-motion";
import { Play, BookOpen, ExternalLink } from "lucide-react";

interface LoreCardProps {
  title: string;
  excerpt: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
}

export default function LoreCard({ title, excerpt, videoUrl, thumbnail, category }: LoreCardProps) {
  return (
    <motion.div 
      className="glass" 
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      whileHover={{ scale: 1.02 }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/9' }}>
        <img src={thumbnail} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ 
          position: 'absolute', 
          top: '12px', 
          left: '12px', 
          background: 'rgba(0,0,0,0.6)', 
          backdropFilter: 'blur(4px)', 
          padding: '4px 10px', 
          borderRadius: '8px', 
          fontSize: '0.7rem', 
          fontWeight: 700,
          color: 'var(--accent-blue)'
        }}>
          {category.toUpperCase()}
        </div>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'rgba(0,0,0,0.3)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          opacity: 0,
          transition: '0.3s'
        }} className="hover-overlay">
          <Play size={48} fill="white" />
        </div>
      </div>
      
      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h3>
        <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '1.5rem', lineHeight: '1.6' }}>{excerpt}</p>
        
        <div style={{ marginTop: 'auto' }}>
          <a 
            href={videoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem', padding: '10px' }}
          >
            Read Scroll
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .glass:hover .hover-overlay {
          opacity: 1;
        }
      `}</style>
    </motion.div>
  );
}
