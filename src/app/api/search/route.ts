import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''

    if (!q || q.length < 2) {
      return NextResponse.json({ suggestions: [] })
    }

    const [tenders, products, news, announcements] = await Promise.all([
      prisma.tender.findMany({
        where: { title: { contains: q } },
        take: 5,
        select: { id: true, title: true },
      }),
      prisma.product.findMany({
        where: { name: { contains: q } },
        take: 5,
        select: { id: true, name: true },
      }),
      prisma.news.findMany({
        where: { title: { contains: q } },
        take: 5,
        select: { id: true, title: true },
      }),
      prisma.announcement.findMany({
        where: { title: { contains: q } },
        take: 5,
        select: { id: true, title: true },
      }),
    ])

    const suggestions = [
      ...tenders.map((t) => ({ title: t.title, href: `/tenders/${t.id}`, type: 'Tender' })),
      ...products.map((p) => ({ title: p.name, href: `/products/${p.id}`, type: 'Product' })),
      ...news.map((n) => ({ title: n.title, href: `/news/${n.id}`, type: 'News' })),
      ...announcements.map((a) => ({ title: a.title, href: `/announcements/${a.id}`, type: 'Announcement' })),
    ]

    return NextResponse.json({ suggestions: suggestions.slice(0, 10) })
  } catch (error) {
    return NextResponse.json({ suggestions: [] })
  }
}
