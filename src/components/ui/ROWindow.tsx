"use client";

import { motion } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

interface ROWindowProps {
  title: string;
  children: React.ReactNode;
  width?: string;
  icon?: React.ReactNode;
}

export default function ROWindow({ title, children, width = "100%", icon }: ROWindowProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="modern-glass"
      style={{ width, margin: '1.5rem 0', overflow: 'hidden' }}
    >
      {/* Modern Header */}
      <div className="ro-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.85rem' }}>
          {icon}
          {title.toUpperCase()}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '2rem' }}>
        {children}
      </div>
    </motion.div>
  );
}
