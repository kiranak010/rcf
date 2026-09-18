import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const stats = {
      announcements: await prisma.announcement.count(),
      tenders: await prisma.tender.count(),
      recruitment: await prisma.recruitment.count(),
      products: await prisma.product.count(),
      news: await prisma.news.count(),
      enquiries: await prisma.contactEnquiry.count(),
    }
    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({
      announcements: 0,
      tenders: 0,
      recruitment: 0,
      products: 0,
      news: 0,
      enquiries: 0,
    })
  }
}
