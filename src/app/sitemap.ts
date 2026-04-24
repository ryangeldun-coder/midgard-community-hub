import { MetadataRoute } from 'next';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://midgardhub.com';
  
  // Base static routes
  const staticRoutes = [
    '',
    '/database/monsters',
    '/database/items',
    '/database/maps',
    '/tools/refine',
    '/tools/brewing',
    '/tools/forge',
    '/tools/affix',
    '/tools/elements',
    '/tools/farming',
    '/lore',
    '/skills',
    '/dungeons',
    '/guides',
    '/guides/knight',
    '/guides/assassin',
    '/guides/wizard',
    '/guides/hunter',
    '/guides/priest',
    '/guides/blacksmith',
    '/guides/crusader',
    '/guides/monk',
    '/guides/sage',
    '/guides/rogue',
    '/guides/alchemist',
    '/guides/bard',
    '/guides/dancer',
    '/guides/quests',
    '/guides/farming',
    '/tools/geoguesser',
    '/tools/refine',
    '/tools/brewing',
    '/tools/forge',
    '/tools/affix',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // We only need the IDs for the sitemap, so we bypass the full transformation
    // to avoid timeouts on Vercel.
    const MONSTERS_DB_PATH = join(process.cwd(), "src", "data", "monsters_db.json");
    const ITEMS_DB_PATH    = join(process.cwd(), "src", "data", "items_db.json");
    const MAPS_DB_PATH     = join(process.cwd(), "src", "data", "maps_db.json");

    if (existsSync(MONSTERS_DB_PATH)) {
      const rawMonsters = JSON.parse(readFileSync(MONSTERS_DB_PATH, "utf-8"));
      Object.keys(rawMonsters).forEach((id) => {
        sitemapEntries.push({
          url: `${baseUrl}/database/monsters/${id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        });
      });
    }

    if (existsSync(ITEMS_DB_PATH)) {
      const rawItems = JSON.parse(readFileSync(ITEMS_DB_PATH, "utf-8"));
      Object.keys(rawItems).forEach((id) => {
        sitemapEntries.push({
          url: `${baseUrl}/database/items/${id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.5,
        });
      });
    }

    if (existsSync(MAPS_DB_PATH)) {
      const rawMaps = JSON.parse(readFileSync(MAPS_DB_PATH, "utf-8"));
      Object.keys(rawMaps).forEach((id) => {
        sitemapEntries.push({
          url: `${baseUrl}/database/maps/${id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.5,
        });
      });
    }
  } catch (err) {
    console.error('Failed to generate dynamic sitemap entries:', err);
  }

  return sitemapEntries;
}
