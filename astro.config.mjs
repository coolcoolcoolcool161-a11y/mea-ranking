import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 公開URL：GitHub Pages（プロジェクトサイト）。
// Cloudflare Pages等へ移行する場合は site / base を移行先に合わせて書き換えること。
export default defineConfig({
  site: 'https://coolcoolcoolcool161-a11y.github.io',
  base: '/mea-ranking',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
