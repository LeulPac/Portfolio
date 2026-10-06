import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace with custom domain if attached in the future
const BASE_URL = process.env.VITE_SITE_URL || 'https://portfolio-ruddy-six-86.vercel.app';
const API_URL = process.env.VITE_API_URL || 'https://portfolio-1-8aom.onrender.com/api/v1';

const staticRoutes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/projects', changefreq: 'weekly', priority: 0.9 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/skills', changefreq: 'monthly', priority: 0.8 },
  { url: '/experience', changefreq: 'monthly', priority: 0.8 },
  { url: '/services', changefreq: 'monthly', priority: 0.8 },
  { url: '/education', changefreq: 'monthly', priority: 0.7 },
  { url: '/certificates', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 }
];

async function generate() {
  const today = new Date().toISOString().split('T')[0];
  let dynamicRoutes = [];

  try {
    const res = await fetch(`${API_URL}/projects`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        dynamicRoutes = data.projects
          .filter(p => !p.hidden)
          .map(p => ({
            url: `/projects/${p.slug}`,
            lastmod: p.updatedAt ? p.updatedAt.split('T')[0] : today,
            changefreq: 'monthly',
            priority: 0.8
          }));
      }
    }
  } catch (err) {
    console.warn('Could not fetch remote projects from API, using cached or default routes:', err.message);
  }

  const allRoutes = [
    ...staticRoutes.map(r => ({ ...r, lastmod: today })),
    ...dynamicRoutes
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    route => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
  console.log(`Successfully generated sitemap.xml with ${allRoutes.length} URLs!`);
}

generate();
