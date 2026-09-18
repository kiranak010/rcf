import nodemailer from 'nodemailer'

export type MailerPayload = {
  to: string
  subject: string
  html: string
  text?: string
  replyTo?: string
}

export type Mailer = {
  sendMail: (payload: MailerPayload) => Promise<{ success: boolean; messageId?: string; error?: string }>
}

export function createMailer(): Mailer {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.EMAIL_FROM || 'RCF Website <noreply@rcf.gov.in>'

  if (!host || !user || !pass) {
    return {
      sendMail: async () => {
        return { success: false, error: 'SMTP is not configured' }
      },
    }
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  return {
    sendMail: async (payload) => {
      try {
        const messageId = await transporter.sendMail({
          from,
          to: payload.to,
          subject: payload.subject,
          text: payload.text,
          html: payload.html,
          replyTo: payload.replyTo || from,
        })
        return { success: true, messageId: messageId.messageId }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' }
      }
    },
  }
}

export const mailer = createMailer()
