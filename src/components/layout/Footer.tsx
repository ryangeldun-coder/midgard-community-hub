"use client";

import { MessageCircle, Play } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ marginTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }}>
      <div className="modern-glass" style={{ 
        padding: '3rem 2rem', 
        maxWidth: '1000px', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        border: '1px solid var(--ro-red)',
        background: 'rgba(255,255,255,1)',
        marginBottom: '2rem'
      }}>
        <img 
          src="https://yt3.ggpht.com/iNdglPcknLoRaKFceRV_OMG6Xp7gSE-BkKbfFZYCvundDJXMtLeXo8sa-sIqtYaA7bo8sYTs=s600-c-k-c0x00ffffff-no-rj-rp-mo"
          alt="Ryan Geldun"
          style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid var(--ro-red)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
        />
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800, color: 'var(--ro-red)' }}>
            Midgard Academy
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', fontWeight: 500, marginBottom: '1.5rem' }}>
            Master the secrets of Ragnarok Online. Join our community of explorers and builders on YouTube for the latest lore, builds, and guides.
          </p>
          
          <a 
            href="https://www.youtube.com/channel/UCjFHiVC_IzVBPpXJ4Ao3_gA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ 
              display: 'inline-flex', 
              textDecoration: 'none', 
              background: '#ff0000', 
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 800,
              gap: '10px',
              boxShadow: '0 4px 14px rgba(255, 0, 0, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Play size={20} />
            SUBSCRIBE ON YOUTUBE
          </a>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <a 
          href="https://discord.gg/bFg77WjcHT" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            color: 'var(--ro-red)', 
            fontWeight: 800, 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            fontSize: '1rem',
            padding: '12px 24px',
            border: '2px solid var(--ro-red)',
            borderRadius: '12px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--ro-red)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--ro-red)';
          }}
        >
          <MessageCircle size={20} />
          Join the Official Discord Channel
        </a>

        <div style={{ opacity: 0.4, fontSize: '0.85rem' }}>
          <p style={{ fontWeight: 600 }}>© 2024 Midgard Community Hub. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem' }}>
            This is a fansite ran solely by Ryan Geldun. Not sanctioned by Gravity Co., Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
