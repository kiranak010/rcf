import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const CITIZEN_JWT_SECRET = process.env.CITIZEN_JWT_SECRET || 'citizen-secret-key-change-in-production'
const CITIZEN_JWT_EXPIRES = '7d'

export async function hashCitizenPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyCitizenPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateCitizenToken(userId: string): string {
  return jwt.sign({ userId, type: 'citizen' }, CITIZEN_JWT_SECRET, { expiresIn: CITIZEN_JWT_EXPIRES })
}

export function verifyCitizenToken(token: string) {
  try {
    const payload = jwt.verify(token, CITIZEN_JWT_SECRET) as any
    if (payload.type !== 'citizen') return null
    return payload
  } catch {
    return null
  }
}

export async function createCitizenUser(data: { email: string; name?: string; phone?: string; password: string }) {
  const hashedPassword = await hashCitizenPassword(data.password)
  return prisma.citizenUser.create({
    data: {
      email: data.email.toLowerCase(),
      name: data.name,
      phone: data.phone,
      password: hashedPassword,
    },
  })
}

export async function authenticateCitizen(email: string, password: string) {
  const user = await prisma.citizenUser.findUnique({
    where: { email: email.toLowerCase() },
  })

  if (!user || !user.isActive) {
    return null
  }

  const isValid = await verifyCitizenPassword(password, user.password)
  if (!isValid) {
    return null
  }

  await prisma.citizenUser.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  })

  return user
}
