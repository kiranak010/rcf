import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const record = await prisma.homepageContent.findFirst()
    return NextResponse.json({ hero: record })
  } catch (error) {
    return NextResponse.json({ hero: null })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const hero = await prisma.homepageContent.upsert({
      where: { id: 'homepage' },
      update: { ...body, updatedAt: new Date() },
      create: { id: 'homepage', ...body, updatedAt: new Date() },
    })
    return NextResponse.json({ hero })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save homepage content' }, { status: 500 })
  }
}
