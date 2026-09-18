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
    const scheme = await prisma.farmerScheme.findUnique({
      where: { id: params.id }
    })
    if (!scheme) return NextResponse.json({ error: 'Scheme not found' }, { status: 404 })
    return NextResponse.json({ item: scheme })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded || !decoded.role.includes('ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const scheme = await prisma.farmerScheme.update({
      where: { id: params.id },
      data: body
    })
    return NextResponse.json({ item: scheme })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update scheme' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded || !decoded.role.includes('ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    await prisma.farmerScheme.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete scheme' }, { status: 500 })
  }
}
