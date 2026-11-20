import { getCollection } from 'astro:content';
import { slugOf } from '../data/site';

export async function GET() {
  const articles = await getCollection('articles');
  const index = articles.map((a) => ({
    slug: slugOf(a.id),
    service: a.data.service,
    category: a.data.category,
    benefit: a.data.benefit,
    code: a.data.code ?? '',
    title: a.data.title,
    description: a.data.description,
    url: `/mea-ranking/articles/${slugOf(a.id)}/`,
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
