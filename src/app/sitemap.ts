import { MetadataRoute } from 'next';
import { getMonsters, getItems, getMaps } from '@/lib/database';

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
    '/tools/geoguesser',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Fetch all dynamic entities
    const [monsters, items, maps] = await Promise.all([
      getMonsters(),
      getItems(),
      getMaps(),
    ]);

    // Add Monster Pages
    monsters.forEach((m) => {
      sitemapEntries.push({
        url: `${baseUrl}/database/monsters/${m.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    });

    // Add Item Pages
    items.forEach((item) => {
      sitemapEntries.push({
        url: `${baseUrl}/database/items/${item.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      });
    });

    // Add Map Pages
    maps.forEach((map) => {
      sitemapEntries.push({
        url: `${baseUrl}/database/maps/${map.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      });
    });
  } catch (err) {
    console.error('Failed to generate dynamic sitemap entries:', err);
  }

  return sitemapEntries;
}
