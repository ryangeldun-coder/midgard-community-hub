import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: [
      'https://midgardhub.com/sitemap.xml',
      'https://midgardhub.com/video-sitemap.xml'
    ],
  };
}
