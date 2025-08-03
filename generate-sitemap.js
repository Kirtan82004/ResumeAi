import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';


(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://resume-ai-indol.vercel.app/' });
  const writeStream = createWriteStream('./public/sitemap.xml');
  
  sitemap.pipe(writeStream);
  
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/resume', changefreq: 'weekly', priority: 0.8 });
  sitemap.write({ url: '/templates', changefreq: 'monthly', priority: 0.7 });
  
  sitemap.end();

  await streamToPromise(sitemap);
  console.log('✅ Sitemap generated');
})();
