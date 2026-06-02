import * as fs from 'fs'
import * as path from 'path'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  keywords: string[]
  status: string
  created_at: string
}

function getPublishedPosts(): BlogPost[] {
  const dir = path.resolve(process.cwd(), 'content', 'posts')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')))
    .filter((p: BlogPost) => p.status === 'published')
    .sort((a: BlogPost, b: BlogPost) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export default function BlogIndex() {
  const posts = getPublishedPosts()

  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <h1 className="mb-2 text-4xl font-bold text-white">Vantage 26 Insider</h1>
      <p className="mb-12 text-gray-400">Expert guides for the FIFA 2026 VIP experience</p>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dark-border p-12 text-center">
          <p className="text-lg text-gray-500">No articles yet. Check back soon.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(p => (
            <Link key={p.id} href={`/blog/${p.slug}`} className="block rounded-xl border border-dark-border p-6 transition hover:border-gold-400/30 hover:bg-dark-card/50">
              <div className="mb-2 flex items-center gap-3">
                {p.keywords?.slice(0, 2).map(k => (
                  <span key={k} className="rounded-full bg-gold-400/10 px-3 py-1 text-xs text-gold-400">{k}</span>
                ))}
                <span className="text-xs text-gray-600">{new Date(p.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{p.title}</h2>
              {p.excerpt && <p className="mt-2 text-gray-400">{p.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
