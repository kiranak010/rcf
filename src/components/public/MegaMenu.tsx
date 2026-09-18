'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const megaMenus: Record<string, { title: string; href?: string; children?: { title: string; href: string }[] }[]> = {
  'About Us': [
    {
      title: 'About RCF',
      children: [
        { title: 'RCF at Glance', href: '/about' },
        { title: 'Vision, Mission & Values', href: '/about/vision' },
        { title: 'Board of Directors', href: '/about/leadership' },
        { title: "Chairman's Message", href: '/about' },
        { title: 'Policies', href: '/about' },
        { title: 'Corporate Film', href: '/about' },
        { title: 'Citizen Charter', href: '/about' },
        { title: 'MoU', href: '/about' },
        { title: 'Media Center', href: '/news' },
        { title: 'Sustainability at RCF', href: '/sustainability' },
        { title: 'RCF Darpan', href: '/about' },
        { title: 'RCF State Wise GSTN Number', href: '/about' },
        { title: 'Promotion of Digital Payments', href: '/about' },
        { title: 'Certificate', href: '/about' },
        { title: 'New Projects', href: '/about' },
      ],
    },
  ],
  Products: [
    {
      title: 'Our Products',
      children: [
        { title: 'Fertilizer Products', href: '/products' },
        { title: 'Industrial Chemicals - IPD', href: '/products' },
        { title: 'MSDS for Fertilizer Products', href: '/products' },
        { title: 'MSDS for IPD Products', href: '/products' },
        { title: 'Appointment of Actual Users and Dealers for Sale of Industrial Grade Water', href: '/products' },
        { title: 'Advertisement for Appointment of Actual Users of IPD Products', href: '/products' },
      ],
    },
  ],
  HR: [
    {
      title: 'Human Resources',
      children: [
        { title: 'Human Resource', href: '/hr' },
        { title: 'HRD', href: '/hr' },
        { title: 'CDA Rules', href: '/hr' },
        { title: 'Standing Order', href: '/hr' },
        { title: 'HR Policy', href: '/hr' },
        { title: 'RTI', href: '/rti' },
        { title: 'Recruitment', href: '/careers' },
        { title: 'RCF Internal Committee (IC) (POSH)', href: '/hr' },
      ],
    },
  ],
  Vigilance: [
    {
      title: 'Vigilance',
      children: [
        { title: 'Vigilance Measures in RCF', href: '/vigilance' },
        { title: 'Chief Vigilance Officer', href: '/vigilance' },
        { title: 'Systemic Improvement Measures', href: '/vigilance' },
        { title: 'Vigilance Complaint Lodging Systems', href: '/vigilance' },
        { title: 'Vigilance Awards', href: '/vigilance' },
        { title: 'Vigilance Gallery', href: '/vigilance' },
        { title: 'VAW-2024', href: '/vigilance' },
        { title: 'VAW-2025', href: '/vigilance' },
      ],
    },
  ],
  Tender: [
    {
      title: 'Tenders',
      children: [
        { title: 'Trombay Tenders', href: '/tenders' },
        { title: 'Thal Tender', href: '/tenders' },
        { title: 'Marketing Tenders', href: '/tenders' },
        { title: 'For Marketing Office', href: '/tenders' },
        { title: 'Registration of Contractor', href: '/tenders' },
        { title: 'Corporate/Projects', href: '/tenders' },
        { title: 'Help For E-Tenders(NIC)', href: '/tenders' },
        { title: 'RCF E-Tenders', href: '/tenders' },
        { title: 'RCF GEM Tenders', href: '/tenders' },
        { title: 'Details of Awards of Tenders/Contracts', href: '/tenders' },
        { title: 'Prequalification Brokers', href: '/tenders' },
        { title: 'Prequalification of Vendors', href: '/tenders' },
        { title: 'Information for MSE', href: '/tenders' },
        { title: 'Compliance', href: '/tenders' },
        { title: 'Information for Vendors', href: '/tenders' },
        { title: 'Challans', href: '/tenders' },
        { title: 'DoE Manuals', href: '/tenders' },
        { title: 'Integrity Pact and Independent External Monitors', href: '/tenders' },
        { title: 'Debarred Firms', href: '/tenders' },
        { title: 'Blacklisted Parties', href: '/tenders' },
        { title: 'On-Holiday Parties', href: '/tenders' },
        { title: 'Make in India 5 Year Requirement Projection', href: '/tenders' },
        { title: 'NIT Common Annexure', href: '/tenders' },
      ],
    },
  ],
  'Investor Relation': [
    {
      title: 'Investor Information',
      children: [
        { title: 'Annual General Meeting', href: '/investors' },
        { title: 'Annual Reports', href: '/investors' },
        { title: 'Annual Return', href: '/investors' },
        { title: 'Board Committees', href: '/investors' },
        { title: 'Corporate Governance', href: '/investors' },
        { title: 'Code of Conduct', href: '/investors' },
        { title: 'Details of Agreement with Media', href: '/investors' },
        { title: 'Disinvestment', href: '/investors' },
        { title: 'Disclosure on Related Party Transactions', href: '/investors' },
        { title: 'Draft Letter of Appointment of Independent Director', href: '/investors' },
        { title: 'Familiarization Programme of Independent Directors', href: '/investors' },
        { title: 'Financial Result', href: '/investors' },
        { title: 'Disclosures under Regulation 46 & 62 of SEBI (LODR) Regulations, 2015', href: '/investors' },
        { title: 'Advertisement Published in Newspapers', href: '/investors' },
        { title: 'Intimation for Board Meetings', href: '/investors' },
        { title: 'Credit Ratings', href: '/investors' },
        { title: 'Schedule of Analysts or Institutional Investors Meet and Investors Presentations', href: '/investors' },
        { title: 'Annual Secretarial Compliances', href: '/investors' },
        { title: 'Memorandum and Articles of Association', href: '/investors' },
        { title: 'General Disclosure', href: '/investors' },
        { title: 'Investor Education and Protection Fund', href: '/investors' },
        { title: 'Investor Contact', href: '/investors' },
        { title: 'Remuneration to Independent Directors', href: '/investors' },
        { title: 'Criteria of Making Payments to Non-Executive Directors', href: '/investors' },
        { title: 'Shareholding Pattern', href: '/investors' },
        { title: 'Unclaimed and Unpaid Dividend', href: '/investors' },
        { title: 'TDS on Dividend', href: '/investors' },
        { title: 'Debt Compliance', href: '/investors' },
        { title: 'Archive', href: '/investors' },
        { title: 'Saksham Niveshak– 100 Days Campaign', href: '/investors' },
        { title: 'KYC Updation For Shareholders', href: '/investors' },
        { title: 'Business Responsibility & Sustainability Report', href: '/investors' },
      ],
    },
  ],
  'Corporate Social Responsibility': [
    {
      title: 'CSR',
      children: [
        { title: 'Social Responsibility', href: '/csr' },
        { title: 'Swachh Bharat Abhiyan', href: '/csr' },
        { title: 'Sustainability Reports', href: '/sustainability' },
        { title: 'ITEC', href: '/csr' },
        { title: 'Annual Report on CSR Activities', href: '/csr' },
        { title: 'CSR Impact Assessment Reports', href: '/csr' },
      ],
    },
  ],
  'Kisan Manch': [
    {
      title: 'Kisan Manch',
      children: [
        { title: 'Shetipatrika', href: '/kisan-manch' },
        { title: 'RCF Kisan Manch', href: '/kisan-manch' },
        { title: 'Kisan Suvidha Kendra', href: '/kisan-manch' },
        { title: 'Kisan Care', href: '/kisan-manch' },
      ],
    },
  ],
  Portals: [
    {
      title: 'Portals',
      children: [
        { title: 'Vendor Invoice Management System (VIMS)', href: 'https://vims.rcfltd.com/' },
        { title: 'Receipt Management System', href: 'https://rms.rcfltd.com/GlobalUsers/HomePage.aspx' },
        { title: 'Fertilizer Information', href: 'https://fns.rcfltd.com/RCFUsers/Login.aspx' },
        { title: 'Dealer Parivar', href: 'https://dealerparivar.rcfltd.com' },
        { title: 'HSN Code for RCF Products', href: '/portals' },
        { title: 'RCF State Wise GSTN Number', href: '/portals' },
        { title: 'Testing Services', href: '/portals' },
        { title: 'Testing Charges', href: '/portals' },
        { title: 'Payment Details', href: '/portals' },
        { title: 'EPS95', href: 'https://eps95.rcfltd.com' },
        { title: 'Webmail (Outlook)', href: 'https://webmail.rcfltd.com/owa/auth/logon.aspx?replaceCurrent=1&url=https%3a%2f%2fwebmail.rcfltd.com%2fowa' },
        { title: 'EMD Payments', href: 'https://emd.rcfltd.com/GlobalUsers/VendorEmail.aspx' },
        { title: 'RCF Insider Trading Software', href: 'http://rcfits.rcfltd.com' },
        { title: 'Medical (Employees & Ex-Employees)', href: '/portals' },
        { title: 'Download RCF Kisan Care Android App', href: 'http://www.rcfltd.com/apk/RCF-Kisan-Care.apk' },
        { title: 'Guest House & Conference Facility', href: '/portals' },
        { title: 'Grievance Redress And Monitoring System', href: '/grievance' },
      ],
    },
  ],
}

export default function MegaMenu() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <nav className="hidden lg:flex items-center gap-1">
      <Link href="/" className="nav-link text-sm px-2 py-1">Home</Link>
      {Object.keys(megaMenus).map((item) => (
        <div
          key={item}
          className="relative"
          onMouseEnter={() => setOpenMenu(item)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <button
            className="nav-link text-sm px-2 py-1"
            onClick={() => setOpenMenu(openMenu === item ? null : item)}
          >
            {item}
          </button>
          {openMenu === item && (
            <div className="absolute top-full left-0 w-[700px] bg-white border border-gray-200 shadow-lg p-6 z-50">
              <div className="grid grid-cols-2 gap-6">
                {megaMenus[item].map((section) => (
                  <div key={section.title}>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.children?.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="text-sm text-gray-600 hover:text-primary flex items-start">
                            <ChevronRight className="h-3 w-3 mr-1 mt-1 flex-shrink-0" />
                            <span>{child.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      <Link href="/contact" className="nav-link text-sm px-2 py-1">Contact</Link>
    </nav>
  )
}
