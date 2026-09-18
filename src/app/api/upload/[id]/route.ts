import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const mediaFile = await prisma.mediaFile.findUnique({
      where: { id: params.id },
    })

    if (!mediaFile) {
      return NextResponse.json({ error: 'Media file not found' }, { status: 404 })
    }

    return NextResponse.json(mediaFile)
  } catch (error) {
    console.error('Error fetching media file:', error)
    return NextResponse.json({ error: 'Failed to fetch media file' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const mediaFile = await prisma.mediaFile.findUnique({
      where: { id: params.id },
    })

    if (!mediaFile) {
      return NextResponse.json({ error: 'Media file not found' }, { status: 404 })
    }

    await prisma.mediaFile.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting media file:', error)
    return NextResponse.json({ error: 'Failed to delete media file' }, { status: 500 })
  }
}
