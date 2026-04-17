"use client";

import LoreCard from "@/components/lore/LoreCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const LORE_DATA = [
  {
    title: "The Mythology of Moonlight Flower",
    excerpt: "A haunting intersection of Korean folklore and the Ragnarok universe. Explore the tragic story of the Gumiho fox.",
    thumbnail: "https://img.youtube.com/vi/FZ8-G4DM1ys/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=FZ8-G4DM1ys",
    category: "Mythology"
  },
  {
    title: "The Poring Mystery & Origins",
    excerpt: "The surprising environmental history of Midgard's mascot. Far more than just simple slimes.",
    thumbnail: "https://img.youtube.com/vi/_mcb6mTRcOQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=_mcb6mTRcOQ",
    category: "Chronicles"
  },
  {
    title: "The Hidden History of Kafra Corp",
    excerpt: "Beyond simple teleporters, discover the most powerful and mysterious entity in the Ragnarok universe.",
    thumbnail: "https://img.youtube.com/vi/7QVPMzCbRDI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=7QVPMzCbRDI",
    category: "History"
  },
  {
    title: "Story of Prontera: The Majestic Capital",
    excerpt: "Explore the ancient origins of Prontera. While most see it as a trade hub, the city's foundations hide deep secrets.",
    thumbnail: "https://img.youtube.com/vi/n-zNIO0Mc-w/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=n-zNIO0Mc-w",
    category: "History"
  },
  {
    title: "The Dark Secret of Amatsu",
    excerpt: "Uncover the ancient origins and forbidden history of the land of cherry blossoms.",
    thumbnail: "https://img.youtube.com/vi/eaA40vJZQQw/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=eaA40vJZQQw",
    category: "Science"
  },
  {
    title: "The Dark Origins of Niflheim",
    excerpt: "Journey into the heart of the Realm of the Dead as we uncover the chilling origins of Niflheim.",
    thumbnail: "https://img.youtube.com/vi/YQGgW8Rw5Do/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=YQGgW8Rw5Do",
    category: "Chronicles"
  },
  {
    title: "Lore of the Assassin Cross",
    excerpt: "A gritty deep dive into the clandestine history of Morroc and the ancient desert traditions.",
    thumbnail: "https://img.youtube.com/vi/sXUMgb835bo/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=sXUMgb835bo",
    category: "History"
  },
  {
    title: "The Secrets of Thanatos Tower",
    excerpt: "The definitive epic of the Ragnarok universe, representing the limit of human strength and the cost of defying gods.",
    thumbnail: "https://img.youtube.com/vi/futFuWyH3gE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=futFuWyH3gE",
    category: "Chronicles"
  }
];

export default function LorePage() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
        >
          The Librarian's Desk
        </motion.h1>
        <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
          Centuries of history preserved in digital scrolls. Each video is a deep dive into the secrets of the world.
        </p>
      </header>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '3rem'
      }}>
        <div className="glass" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0.75rem 1.5rem', 
          width: '100%', 
          maxWidth: '500px',
          gap: '12px'
        }}>
          <Search size={20} opacity={0.5} />
          <input 
            type="text" 
            placeholder="Search the archives..." 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              width: '100%', 
              outline: 'none',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>

      <div className="card-grid">
        {LORE_DATA.map((lore, i) => (
          <motion.div
            key={lore.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <LoreCard {...lore} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}
