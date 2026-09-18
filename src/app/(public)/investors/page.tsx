'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function InvestorsPage() {
  const sections = [
    { title: 'Annual General Meeting', href: '/investors', description: 'AGM notices and details.' },
    { title: 'Annual Reports', href: '/investors', description: 'Annual reports and financial statements.' },
    { title: 'Annual Return', href: '/investors', description: 'Annual return filings.' },
    { title: 'Board Committees', href: '/investors', description: 'Board committee composition.' },
    { title: 'Corporate Governance', href: '/investors', description: 'Governance policies and reports.' },
    { title: 'Code of Conduct', href: '/investors', description: 'Code of conduct for directors.' },
    { title: 'Details of Agreement with Media', href: '/investors', description: 'Media agreements.' },
    { title: 'Disinvestment', href: '/investors', description: 'Disinvestment updates.' },
    { title: 'Disclosure on Related Party Transactions', href: '/investors', description: 'Related party disclosures.' },
    { title: 'Draft Letter of Appointment of Independent Director', href: '/investors', description: 'Appointment letter draft.' },
    { title: 'Familiarization Programme of Independent Directors', href: '/investors', description: 'Familiarization programs.' },
    { title: 'Financial Result', href: '/investors', description: 'Quarterly and annual results.' },
    { title: 'Disclosures under Regulation 46 & 62 of SEBI (LODR) Regulations, 2015', href: '/investors', description: 'SEBI disclosures.' },
    { title: 'Advertisement Published in Newspapers', href: '/investors', description: 'Newspaper advertisements.' },
    { title: 'Intimation for Board Meetings', href: '/investors', description: 'Board meeting intimations.' },
    { title: 'Credit Ratings', href: '/investors', description: 'Credit rating reports.' },
    { title: 'Schedule of Analysts or Institutional Investors Meet and Investors Presentations', href: '/investors', description: 'Investor meets and presentations.' },
    { title: 'Annual Secretarial Compliances', href: '/investors', description: 'Secretarial compliance reports.' },
    { title: 'Memorandum and Articles of Association', href: '/investors', description: 'MoA and AoA documents.' },
    { title: 'General Disclosure', href: '/investors', description: 'General disclosures.' },
    { title: 'Investor Education and Protection Fund', href: '/investors', description: 'IEPF information.' },
    { title: 'Investor Contact', href: '/investors', description: 'Investor contact details.' },
    { title: 'Remuneration to Independent Directors', href: '/investors', description: 'Director remuneration.' },
    { title: 'Criteria of Making Payments to Non-Executive Directors', href: '/investors', description: 'Payment criteria for directors.' },
    { title: 'Shareholding Pattern', href: '/investors', description: 'Shareholding pattern reports.' },
    { title: 'Unclaimed and Unpaid Dividend', href: '/investors', description: 'Unclaimed dividend details.' },
    { title: 'TDS on Dividend', href: '/investors', description: 'TDS information on dividends.' },
    { title: 'Debt Compliance', href: '/investors', description: 'Debt compliance reports.' },
    { title: 'Archive', href: '/investors', description: 'Archived investor information.' },
    { title: 'Saksham Niveshak– 100 Days Campaign', href: '/investors', description: 'Investor awareness campaign.' },
    { title: 'KYC Updation For Shareholders', href: '/investors', description: 'KYC update for shareholders.' },
    { title: 'Business Responsibility & Sustainability Report', href: '/investors', description: 'BRSR reports.' },
  ]

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>Investor Relations</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              Investor Information
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              Access financial reports, annual reports, and investor relations information.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section, index) => (
              <Link key={index} href={section.href} className="govt-border-block group">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary mb-1">{section.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{section.description}</p>
                <span className="link-arrow text-xs">View <ChevronRight className="ml-1 h-3 w-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
