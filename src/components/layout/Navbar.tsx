"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, Hammer, FlaskConical, Star, TrendingUp, BookOpen, Database, Sword, Bug, ChevronDown, Wrench } from "lucide-react";

const navItems = [
  { name: "Home",     href: "/",               icon: Home },
  { name: "Refine",  href: "/tools/refine",    icon: Hammer },
  { name: "Brewing", href: "/tools/brewing",   icon: FlaskConical },
  { name: "Forge",   href: "/tools/forge",     icon: Wrench },
  { name: "Lore",    href: "/lore",            icon: BookOpen },
];

const dbItems = [
  { name: "Monsters", href: "/database/monsters", icon: Bug },
  { name: "Items", href: "/database/items", icon: Sword },
];

export default function Navbar() {
  const pathname = usePathname();
  const [dbOpen, setDbOpen] = useState(false);
  const isDbActive = pathname.startsWith("/database");

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 100, 
      padding: '0.75rem 1rem',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div className="modern-glass" style={{ 
        display: 'flex', 
        padding: '6px', 
        gap: '4px',
        borderRadius: '12px',
        alignItems: 'center'
      }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`tab-btn ${isActive ? 'active' : ''}`}
              style={{ 
                textDecoration: 'none', 
                color: isActive ? 'white' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem'
              }}
            >
              <Icon size={14} />
              {item.name}
            </Link>
          );
        })}

        {/* Database Dropdown */}
        <div style={{ position: 'relative' }} onMouseLeave={() => setDbOpen(false)}>
          <button
            className={`tab-btn ${isDbActive ? 'active' : ''}`}
            onClick={() => setDbOpen(!dbOpen)}
            onMouseEnter={() => setDbOpen(true)}
            style={{ 
              background: isDbActive ? 'var(--ro-red)' : 'transparent',
              color: isDbActive ? 'white' : '#64748b',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '10px',
              fontWeight: 600,
              fontFamily: 'inherit',
            }}
          >
            <Database size={14} />
            Database
            <ChevronDown size={12} style={{ opacity: 0.6 }} />
          </button>
          {dbOpen && (
            <div style={{ 
              position: 'absolute', 
              top: '100%', 
              left: '50%', 
              transform: 'translateX(-50%)',
              marginTop: '4px', 
              background: 'white', 
              borderRadius: '10px', 
              border: '1px solid var(--ro-red)', 
              padding: '6px',
              minWidth: '140px',
              boxShadow: '0 8px 24px rgba(174,32,18,0.12)',
              zIndex: 200
            }}>
              {dbItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setDbOpen(false)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      padding: '8px 12px', 
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: isActive ? 'white' : '#475569',
                      background: isActive ? 'var(--ro-red)' : 'transparent',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#fdf2f2'; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <Icon size={14} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
