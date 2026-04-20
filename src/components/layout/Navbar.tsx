"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Home, Hammer, FlaskConical, BookOpen, Database, 
  Sword, Bug, ChevronDown, Wrench, Layers, Menu, X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navGroups = [
  {
    name: "Database",
    icon: Database,
    items: [
      { name: "Monsters", href: "/database/monsters", icon: Bug },
      { name: "Items", href: "/database/items", icon: Sword },
      { name: "Elements", href: "/tools/elements", icon: Sword },
    ]
  },
  {
    name: "Simulators",
    icon: Hammer,
    items: [
      { name: "Refine", href: "/tools/refine", icon: Hammer },
      { name: "Forge", href: "/tools/forge", icon: Wrench },
      { name: "Brewing", href: "/tools/brewing", icon: FlaskConical },
    ]
  },
  {
    name: "Archives",
    icon: BookOpen,
    items: [
      { name: "Dungeons", href: "/dungeons", icon: Layers },
      { name: "Lore", href: "/lore", icon: BookOpen },
    ]
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;
  const isGroupActive = (items: { href: string }[]) => items.some(item => pathname.startsWith(item.href));

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
        alignItems: 'center',
        width: 'auto',
        maxWidth: '100%',
        justifyContent: 'space-between'
      }}>
        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="desktop-nav">
          <Link
            href="/"
            className={`tab-btn ${pathname === '/' ? 'active' : ''}`}
            style={{ 
              textDecoration: 'none', 
              color: pathname === '/' ? 'white' : '#64748b',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem'
            }}
          >
            <Home size={14} />
            <span className="hide-mobile-text">Home</span>
          </Link>

          {navGroups.map((group) => {
            const GroupIcon = group.icon;
            const active = isGroupActive(group.items);
            const isOpen = openGroup === group.name;

            return (
              <div 
                key={group.name} 
                style={{ position: 'relative' }} 
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  className={`tab-btn ${active ? 'active' : ''}`}
                  onClick={() => setOpenGroup(isOpen ? null : group.name)}
                  onMouseEnter={() => setOpenGroup(group.name)}
                  style={{ 
                    background: active ? 'var(--ro-red)' : 'transparent',
                    color: active ? 'white' : '#64748b',
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
                  <GroupIcon size={14} />
                  {group.name}
                  <ChevronDown size={12} style={{ opacity: 0.6, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      style={{ 
                        position: 'absolute', 
                        top: '100%', 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        marginTop: '4px', 
                        background: 'white', 
                        borderRadius: '10px', 
                        border: '1px solid var(--ro-red)', 
                        padding: '6px',
                        minWidth: '160px',
                        boxShadow: '0 8px 24px rgba(174,32,18,0.12)',
                        zIndex: 200
                      }}
                    >
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px', 
                              padding: '10px 12px', 
                              borderRadius: '8px',
                              textDecoration: 'none',
                              color: active ? 'white' : '#475569',
                              background: active ? 'var(--ro-red)' : 'transparent',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = '#fdf2f2'; }}
                            onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                          >
                            <Icon size={14} />
                            {item.name}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none', // Shown via CSS media query
            background: 'transparent',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '80%',
              maxWidth: '300px',
              background: 'white',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
              zIndex: 1000,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, color: 'var(--ro-red)' }}>MENU</span>
              <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'transparent', border: 'none' }}><X size={24} /></button>
            </div>

            <Link href="/" style={{ textDecoration: 'none', color: pathname === '/' ? 'var(--ro-red)' : '#1e293b', fontWeight: 700, fontSize: '1.2rem' }}>Home</Link>

            {navGroups.map(group => (
              <div key={group.name}>
                <h4 style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>{group.name}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {group.items.map(item => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      style={{ 
                        textDecoration: 'none', 
                        color: isActive(item.href) ? 'var(--ro-red)' : '#475569',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '1rem',
                        fontWeight: 500
                      }}
                    >
                      <item.icon size={18} />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
