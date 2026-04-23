"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
      <Link 
        href="/" 
        style={{ 
          color: "#94a3b8", 
          textDecoration: "none", 
          display: "flex", 
          alignItems: "center", 
          gap: "4px",
          fontSize: "0.85rem",
          transition: "color 0.2s"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
      >
        <Home size={14} />
        Home
      </Link>
      
      {items.map((item, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ChevronRight size={14} color="#cbd5e1" />
          {item.href ? (
            <Link 
              href={item.href} 
              style={{ 
                color: "#94a3b8", 
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 500,
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 700 }}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
