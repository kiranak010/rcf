import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    })

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
  ${pages.map((page) => `<url>
    <loc>${baseUrl}${page.slug}</loc>
    <lastmod>${page.updatedAt.toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>`).join('\n  ')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: { 'Content-Type': 'application/xml' },
    })
  } catch (error) {
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { 'Content-Type': 'application/xml' },
    })
  }
}
