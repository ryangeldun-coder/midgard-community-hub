export async function getLatestVideos(channelId: string, limit = 10) {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      next: { revalidate: 43200 } // Cache for 12 hours
    });
    const xml = await res.text();
    
    const entries = xml.split('<entry>').slice(1);
    return entries.slice(0, limit).map(entry => {
      const id = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] || "";
      const title = entry.match(/<title>(.*?)<\/title>/)?.[1] || "";
      const description = entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] || "";
      
      return {
        id,
        title,
        description: description.slice(0, 150) + (description.length > 150 ? "..." : ""),
        thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
        videoUrl: `https://www.youtube.com/watch?v=${id}`
      };
    });
  } catch (error) {
    console.error("Failed to fetch YouTube feed:", error);
    return [];
  }
}
