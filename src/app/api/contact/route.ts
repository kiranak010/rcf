import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mailer } from '@/lib/mailer'
import { withSecurityHeaders, validateContactForm, sanitizeString, getClientIP } from '@/lib/security'

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)

    if (!checkRateLimit(ip)) {
      return withSecurityHeaders(NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 }))
    }

    const body = await request.json()
    const sanitizedData = {
      name: sanitizeString(body.name || ''),
      email: sanitizeString(body.email || ''),
      subject: sanitizeString(body.subject || ''),
      message: sanitizeString(body.message || ''),
    }

    const validation = validateContactForm(sanitizedData)
    if (!validation.valid) {
      return withSecurityHeaders(NextResponse.json({ error: validation.errors.join(', ') }, { status: 400 }))
    }

    const item = await prisma.contactEnquiry.create({
      data: {
        ...sanitizedData,
        status: 'new',
        createdAt: new Date(),
      },
    })

    const emailResult = await mailer.sendMail({
      to: process.env.EMAIL_TO || 'info@rcf.gov.in',
      subject: `New Contact Enquiry: ${sanitizedData.subject}`,
      text: `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nSubject: ${sanitizedData.subject}\nMessage: ${sanitizedData.message}`,
      html: `<p><strong>Name:</strong> ${sanitizedData.name}</p><p><strong>Email:</strong> ${sanitizedData.email}</p><p><strong>Subject:</strong> ${sanitizedData.subject}</p><p><strong>Message:</strong> ${sanitizedData.message}</p>`,
      replyTo: sanitizedData.email,
    })

    return withSecurityHeaders(NextResponse.json({ item, emailSent: emailResult.success }))
  } catch (error) {
    return withSecurityHeaders(NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 }))
  }
}
