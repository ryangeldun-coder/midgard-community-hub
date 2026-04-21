import { getLatestVideos } from "@/lib/youtube";
import { Play, ScrollText } from "lucide-react";

export default async function LatestVideoPanel() {
  const videos = await getLatestVideos("UCjFHiVC_IzVBPpXJ4Ao3_gA", 1);
  const video = videos[0];

  if (!video) return null;

  return (
    <div style={{ 
      margin: '0 auto 2rem', 
      maxWidth: '1000px', 
      width: '100%',
      padding: '0 2rem' 
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .lore-video-btn:hover {
          background: rgba(255,255,255,0.2) !important;
        }
        .video-container:hover .hover-overlay {
          background: rgba(0,0,0,0.1) !important;
        }
      `}} />
      <div className="video-container" style={{ 
        background: '#1e293b', 
        borderRadius: '20px', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: '1px solid #334155'
      }}>
        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(90deg, #ae2012, #9b1c10)', 
          padding: '12px 24px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          color: 'white'
        }}>
          <ScrollText size={18} />
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Latest Chronicles from the Lorewalker
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* Video Thumbnail */}
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', position: 'relative' }}>
              <img 
                src={video.thumbnail.replace('mqdefault', 'maxresdefault')} 
                alt={video.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ 
                position: 'absolute', 
                top: '0', 
                left: '0', 
                right: '0', 
                bottom: '0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.3)',
                transition: 'background 0.2s'
              }}
              className="hover-overlay"
              >
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  background: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#ae2012'
                }}>
                  <Play size={24} fill="#ae2012" />
                </div>
              </div>
            </a>
          </div>

          {/* Content */}
          <div style={{ flex: '1 1 300px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '1rem', lineHeight: '1.3' }}>
              {video.title}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {video.description}
            </p>
            <a 
              href={video.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="lore-video-btn"
              style={{ 
                alignSelf: 'flex-start',
                color: 'white', 
                fontWeight: 700, 
                fontSize: '0.85rem', 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.2s'
              }}
            >
              Watch Full Video
              <Play size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
