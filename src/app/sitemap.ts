import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://midgardhub.com';

  const routes = [
    '',
    '/database/monsters',
    '/database/items',
    '/tools/refine',
    '/tools/brewing',
    '/tools/forge',
    '/lore',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
