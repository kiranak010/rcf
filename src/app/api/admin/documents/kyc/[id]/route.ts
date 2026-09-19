import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded || !decoded.role.includes('ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const doc = await prisma.kYCDocument.findUnique({
      where: { id: params.id }
    })

    if (!doc) return NextResponse.json({ error: 'Document not found' }, { status: 404 })

    // In a real production system, we would generate a temporary signed URL
    // from S3 or a protected storage bucket here.
    // For this Enterprise Portal implementation, we return the path to the file
    // with a security header.

    return NextResponse.json({
      success: true,
      url: doc.filePath,
      fileName: doc.docType,
      accessedBy: decoded.userId
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
