import * as fs from 'fs'
import * as path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  keywords: string[]
  status: string
  created_at: string
}

function getPostBySlug(slug: string): BlogPost | null {
  const contentDir = path.resolve(process.cwd(), 'content', 'posts')
  if (!fs.existsSync(contentDir)) return null
  const files = fs.readdirSync(contentDir).filter((f: string) => f.endsWith('.json'))
  for (const f of files) {
    const p = JSON.parse(fs.readFileSync(path.join(contentDir, f), 'utf-8')) as BlogPost
    if (p.slug === slug && p.status === 'published') return p
  }
  return null
}

function renderMarkdown(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mt-10 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-gold-400 underline">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="text-gray-300 ml-5 list-disc">$1</li>')
  const blocks = html.split('\n\n')
  return blocks.map((block: string) => {
    if (block.startsWith('<h') || block.startsWith('<li') || block.startsWith('<')) return block
    return '<p class="text-gray-300 leading-relaxed mb-4">' + block.replace(/\n/g, '<br/>') + '</p>'
  }).join('\n')
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <Link href="/blog" className="mb-8 inline-block text-sm text-gold-400 hover:underline">&larr; Back to articles</Link>
      <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">{post.title}</h1>
      <div className="mb-8 flex flex-wrap gap-2">
        {post.keywords?.map((k: string) => (
          <span key={k} className="rounded-full bg-gold-400/10 px-3 py-1 text-xs text-gold-400">{k}</span>
        ))}
        <span className="text-xs text-gray-600">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
      </div>
      <div className="prose-custom" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      <div className="mt-16 rounded-xl border border-dark-border p-8 text-center">
        <h3 className="mb-2 text-xl font-bold text-gold-400">Ready for the VIP Experience?</h3>
        <p className="mb-6 text-gray-400">Contact our concierge team for a curated proposal.</p>
        <a href="/#contact" className="btn">Book VIP Consultation</a>
      </div>
    </div>
  )
}
