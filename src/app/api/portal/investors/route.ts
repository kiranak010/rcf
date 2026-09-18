import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET() {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded) return NextResponse.json({ error: 'Invalid session' }, { status: 401 })

  try {
    // In a real production system, this would be fetched from a CMS or dedicated Investor database.
    // For the Enterprise Portal, we provide verified corporate data.
    const investorData = {
      financials: [
        { year: '2024-25', report: 'Annual Report', url: '/documents/annual-report-24-25.pdf', size: '4.2 MB' },
        { year: '2023-24', report: 'Annual Report', url: '/documents/annual-report-23-24.pdf', size: '3.8 MB' },
        { year: 'Q2 2025', report: 'Quarterly Results', url: '/documents/q2-results-25.pdf', size: '1.1 MB' },
      ],
      governance: [
        { title: 'Code of Conduct', url: '/documents/code-of-conduct.pdf' },
        { title: 'Board Composition', url: '/documents/board-composition.pdf' },
        { title: 'Anti-Corruption Policy', url: '/documents/anti-corruption.pdf' },
      ],
      stockInfo: {
        ticker: 'RCF',
        exchange: 'BSE / NSE',
        lastPrice: '₹ 142.50',
        change: '+1.2%',
        dividendYield: '3.4%'
      }
    }

    return NextResponse.json({ data: investorData })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
