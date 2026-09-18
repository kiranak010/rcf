import type { Metadata } from 'next'
import './globals.css'
import { SettingsProvider } from '@/components/admin/SettingsProvider'
import { AccessibilityProvider } from '@/components/admin/AccessibilityProvider'

export const metadata: Metadata = {
  title: 'Rashtriya Chemicals and Fertilizers Limited | Government of India Enterprise',
  description: 'Rashtriya Chemicals and Fertilizers Limited - A Government of India Enterprise engaged in the manufacture and marketing of fertilizers and chemicals, supporting agriculture, industry and national development.',
  keywords: 'RCF, Rashtriya Chemicals, Fertilizers, Chemicals, Government of India, PSU, Agriculture, Industry',
  authors: [{ name: 'Rashtriya Chemicals and Fertilizers Limited' }],
  openGraph: {
    title: 'Rashtriya Chemicals and Fertilizers Limited',
    description: 'A Government of India Enterprise engaged in the manufacture and marketing of fertilizers and chemicals.',
    type: 'website',
    url: 'https://www.rcfltd.com',
    siteName: 'Rashtriya Chemicals and Fertilizers Limited',
  },
  twitter: {
    card: 'summary',
    title: 'Rashtriya Chemicals and Fertilizers Limited',
    description: 'A Government of India Enterprise engaged in the manufacture and marketing of fertilizers and chemicals.',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rashtriya Chemicals and Fertilizers Limited',
    alternateName: 'RCF',
    url: 'https://www.rcfltd.com',
    logo: 'https://www.rcfltd.com/images/logo.png',
    description: 'A Government of India Enterprise engaged in the manufacture and marketing of fertilizers and chemicals.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'RCF Bhawan, Administrative Block',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400001',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-22-12345678',
      contactType: 'customer service',
      email: 'info@rcf.gov.in',
    },
    sameAs: [
      'https://www.rcfltd.com',
    ],
  }

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SettingsProvider>
          <AccessibilityProvider>
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
          </AccessibilityProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}
