"use client";

import LoreCard from "@/components/lore/LoreCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const LORE_DATA = [
  {
    title: "The Mythology of Moonlight Flower",
    description: "A haunting intersection of Korean folklore and the Ragnarok universe. Explore the tragic story of the Gumiho fox.",
    thumbnail: "https://img.youtube.com/vi/FZ8-G4DM1ys/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=FZ8-G4DM1ys"
  },
  {
    title: "The Poring Mystery & Origins",
    description: "The surprising environmental history of Midgard's mascot. Far more than just simple slimes.",
    thumbnail: "https://img.youtube.com/vi/_mcb6mTRcOQ/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=_mcb6mTRcOQ"
  },
  {
    title: "The Hidden History of Kafra Corp",
    description: "Beyond simple teleporters, discover the most powerful and mysterious entity in the Ragnarok universe.",
    thumbnail: "https://img.youtube.com/vi/7QVPMzCbRDI/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=7QVPMzCbRDI"
  },
  {
    title: "Story of Prontera: The Majestic Capital",
    description: "Explore the ancient origins of Prontera. While most see it as a trade hub, the city's foundations hide deep secrets.",
    thumbnail: "https://img.youtube.com/vi/n-zNIO0Mc-w/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=n-zNIO0Mc-w"
  },
  {
    title: "The Dark Secret of Amatsu",
    description: "Uncover the ancient origins and forbidden history of the land of cherry blossoms.",
    thumbnail: "https://img.youtube.com/vi/eaA40vJZQQw/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=eaA40vJZQQw"
  },
  {
    title: "The Dark Origins of Niflheim",
    description: "Journey into the heart of the Realm of the Dead as we uncover the chilling origins of Niflheim.",
    thumbnail: "https://img.youtube.com/vi/YQGgW8Rw5Do/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=YQGgW8Rw5Do"
  },
  {
    title: "Lore of the Assassin Cross",
    description: "A gritty deep dive into the clandestine history of Morroc and the ancient desert traditions.",
    thumbnail: "https://img.youtube.com/vi/sXUMgb835bo/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=sXUMgb835bo"
  },
  {
    title: "The Secrets of Thanatos Tower",
    description: "The definitive epic of the Ragnarok universe, representing the limit of human strength and the cost of defying gods.",
    thumbnail: "https://img.youtube.com/vi/futFuWyH3gE/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=futFuWyH3gE"
  },
  {
    title: "The Tragedy of Seyren Windsor",
    description: "The fall of the high priest and the creation of the Bio Labs—a dark chapter in Lighthalzen history.",
    thumbnail: "https://img.youtube.com/vi/n-zNIO0Mc-w/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=n-zNIO0Mc-w"
  },
  {
    title: "The Legend of the Golden Thief Bug",
    description: "Why does this creature guard the sewers of Prontera? A story of greed and divine punishment.",
    thumbnail: "https://img.youtube.com/vi/FZ8-G4DM1ys/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=FZ8-G4DM1ys"
  }
];

export default function LorePage() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--ro-red)', marginBottom: '0.5rem' }}
        >
          Lore Archives
        </motion.h1>
        <p style={{ color: '#475569', fontSize: '1rem', fontWeight: 500 }}>
          Digital scrolls preserving the hidden history of Midgard Zero.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {LORE_DATA.map((video, i) => (
          <motion.a
            key={i}
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
      {/* SEO Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          Explore the rich history of the world with the <strong>Ragnarok Zero Lore Archives</strong>. Curated by <strong>Ryan Geldun</strong>, our collection of video deep-dives covers everything from the dark origins of the Bio Labs to the mythologies of Midgard's most iconic bosses. Understanding the story behind the game adds a new layer of depth to your journey through TWRoZ. Our archives are constantly updated with new research and storytelling, ensuring that the legacy of Ragnarok is preserved for all adventurers.
        </p>
      </section>
    </main>
  );
}
