import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createCitizenUser, hashCitizenPassword } from '@/lib/citizen-auth'

export async function POST(request: NextRequest) {
  try {
    const { email, name, phone, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const existing = await prisma.citizenUser.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const hashedPassword = await hashCitizenPassword(password)

    const user = await prisma.citizenUser.create({
      data: {
        email: email.toLowerCase(),
        name,
        phone,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Citizen registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
