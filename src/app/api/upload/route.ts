import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {}
    if (search) {
      where.OR = [
        { fileName: { contains: search } },
      ]
    }
    if (category) {
      where.category = category
    }

    const [files, total] = await Promise.all([
      prisma.mediaFile.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.mediaFile.count({ where }),
    ])

    return NextResponse.json({ items: files, total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    console.error('Error fetching media files:', error)
    return NextResponse.json({ error: 'Failed to fetch media files' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const category = formData.get('category') as string

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const url = `/uploads/${filename}`

    const fs = await import('fs')
    const path = await import('path')
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    fs.writeFileSync(path.join(uploadDir, filename), Buffer.from(bytes))

    const mediaFile = await prisma.mediaFile.create({
      data: {
        fileName: filename,
        mimeType: file.type,
        size: file.size,
        url,
      },
    })

    return NextResponse.json(mediaFile)
  } catch (error) {
    console.error('Error uploading media:', error)
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 })
  }
}
