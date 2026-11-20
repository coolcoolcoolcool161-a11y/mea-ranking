import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 公開URL（暫定）。Cloudflare Pagesのプロジェクト作成時にサブドメインが確定したら、
// ここを実際の *.pages.dev URLに書き換えること。
export default defineConfig({
  site: 'https://mea-ranking.pages.dev',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
