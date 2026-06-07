import * as fs from 'fs'
import * as path from 'path'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.vantage26.com'

interface BlogPost {
  id: string
  slug: string
  status: string
  created_at: string
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/tickets`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/stadiums`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/booking`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/matches`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/restricted-access`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/refund`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Blog posts
  const postsDir = path.resolve(process.cwd(), 'content', 'posts')
  let blogPages: MetadataRoute.Sitemap = []

  if (fs.existsSync(postsDir)) {
    blogPages = fs.readdirSync(postsDir)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        const p = JSON.parse(fs.readFileSync(path.join(postsDir, f), 'utf-8')) as BlogPost
        return {
          url: `${BASE_URL}/blog/${p.slug}`,
          lastModified: new Date(p.created_at),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }
      })
  }

  return [...staticPages, ...blogPages]
}
