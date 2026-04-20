"use client";

import { motion } from "framer-motion";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

export default function LoreList({ initialVideos }: { initialVideos: Video[] }) {
  if (initialVideos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
        No scrolls found in the archives today...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {initialVideos.map((video, i) => (
        <motion.a
          key={video.id}
          href={video.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            padding: '1rem', 
            borderRadius: '12px', 
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            border: '1px solid transparent',
            background: '#fff',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fdf2f2';
            e.currentTarget.style.borderColor = 'var(--ro-red)';
            e.currentTarget.style.transform = 'translateX(5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <div style={{ 
            flexShrink: 0, 
            width: '160px', 
            aspectRatio: '16/9', 
            borderRadius: '8px', 
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <img 
              src={video.thumbnail} 
              alt={video.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          
          <div style={{ flexGrow: 1 }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 800, 
              color: '#1e293b', 
              marginBottom: '0.4rem',
              lineHeight: '1.2'
            }}>
              {video.title}
            </h3>
            <p style={{ 
              fontSize: '0.9rem', 
              color: '#64748b', 
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {video.description}
            </p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
