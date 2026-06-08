import * as fs from 'fs'
import * as path from 'path'
import type { Metadata } from 'next'
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found — Vantage 26',
    }
  }

  const url = `https://www.vantage26.com/blog/${post.slug}`

  return {
    title: `${post.title} — Vantage 26`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
      url,
      images: [
        {
          url: '/og-default.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/og-default.png'],
    },
  }
}

function renderMarkdown(md: string): string {
  // Process bold, italic, links first (inline)
  let html = md
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-gold-400 underline">$1</a>')

  // Split into blocks on double newlines
  const blocks = html.split('\n\n')
  return blocks.map((block: string) => {
    const trimmed = block.trim()
    if (!trimmed) return ''

    // Headings
    if (/^### /.test(trimmed)) return `<h3 class="text-xl font-bold text-white mt-8 mb-3">${trimmed.replace(/^### /, '')}</h3>`
    if (/^## /.test(trimmed)) return `<h2 class="text-2xl font-bold text-white mt-10 mb-4">${trimmed.replace(/^## /, '')}</h2>`
    if (/^# /.test(trimmed)) return `<h1 class="text-3xl font-bold text-white mt-10 mb-4">${trimmed.replace(/^# /, '')}</h1>`

    // List blocks (one or more lines starting with -)
    if (/^- /m.test(trimmed)) {
      const items = trimmed.split('\n').map(l => {
        const clean = l.replace(/^- /, '')
        return `<li class="text-gray-300 ml-5 list-disc mb-1">${clean}</li>`
      }).join('\n')
      return `<ul class="mb-4 space-y-1">${items}</ul>`
    }

    // Horizontal rule (--- alone on a line)
    if (/^---$/.test(trimmed)) return '<hr class="my-8 border-dark-border" />'

    // Regular paragraph — escape remaining HTML, convert single newlines to breaks
    return `<p class="text-gray-300 leading-relaxed mb-4">${trimmed.replace(/\n/g, '<br/>')}</p>`
  }).filter(Boolean).join('\n')
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    keywords: post.keywords?.join(', '),
    datePublished: post.created_at,
    author: { '@type': 'Organization', name: 'Vantage 26' },
    publisher: { '@type': 'Organization', name: 'Vantage 26' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://vantage26.com/blog/${post.slug}` },
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
