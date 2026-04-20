"use client";

import { usePathname } from "next/navigation";
import { Play, Scroll } from "lucide-react";

const VIDEO_DATA: Record<string, { id: string, title: string, desc: string }> = {
  "/": {
    id: "0T-i6A7Tcro", 
    title: "Why do monsters drop cards in Ragnarok Online?",
    desc: "Explore the deep lore and the hidden conspiracy behind Ragnarok Online's iconic Card system. From soul crystallization to the mystery of the 'Blank Card'."
  },
  "/tools/refine": {
    id: "_mcb6mTRcOQ", 
    title: "The Poring Mystery & Origins",
    desc: "The surprising environmental history of Midgard's mascot. Far more than just simple slimes."
  },
  "/tools/farming": {
    id: "7QVPMzCbRDI", 
    title: "The Hidden History of Kafra Corp",
    desc: "Beyond simple teleporters, discover the most powerful and mysterious entity in the Ragnarok universe."
  },
  "/tools/brewing": {
    id: "sXUMgb835bo", 
    title: "Ancient Lore of the Assassin Cross",
    desc: "A gritty deep dive into the clandestine history of Morroc and the ancient desert traditions."
  },
  "/lore": {
    id: "futFuWyH3gE", 
    title: "The Tower of Eternal Sorrow",
    desc: "The definitive epic of Thanatos Tower—representing the limit of human strength and the cost of defying gods."
  }
};

export default function LoreVideoSection() {
  const pathname = usePathname();
  const video = VIDEO_DATA[pathname] || VIDEO_DATA["/"];

  return (
    <section style={{ padding: '2rem', borderTop: '1px solid #eee', background: '#fcfcfc' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ro-red)', marginBottom: '1.5rem' }}>
        <Scroll size={20} />
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>KNOWLEDGE OF THE ELDERS (LORE VIDEO)</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
        <div className="video-card">
          <div style={{ position: 'relative', aspectRatio: '16/9' }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#333' }}>{video.title}</h3>
          <p style={{ opacity: 0.7, lineHeight: 1.6, marginBottom: '1.5rem' }}>{video.desc}</p>
          <a 
            href="https://www.youtube.com/channel/UCjFHiVC_IzVBPpXJ4Ao3_gA" 
            target="_blank" 
            className="btn-primary"
            style={{ width: 'fit-content' }}
          >
            <Play size={16} fill="white" />
            Watch More Lore on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
