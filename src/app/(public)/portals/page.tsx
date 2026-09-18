'use client'

import Link from 'next/link'
import { ChevronRight, Globe, FileText, Users } from 'lucide-react'

export default function PortalsPage() {
  const portals = [
    { name: 'Vendor Invoice Management System', type: 'External', href: '/portals', description: 'Vendor invoice processing and management.' },
    { name: 'Receipt Management System', type: 'External', href: '/portals', description: 'Receipt tracking and management.' },
    { name: 'Fertilizer Information', type: 'External', href: '/portals', description: 'Fertilizer product information and details.' },
    { name: 'Dealer Parivar', type: 'External', href: '/portals', description: 'Dealer network and partnership information.' },
    { name: 'Kisan Care', type: 'External', href: '/portals', description: 'Farmer services and support portal.' },
  ]

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>Portals</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              RCF Digital Portals
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              Access official RCF digital services and portals.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="govt-border-block overflow-x-auto">
            <table className="govt-table w-full">
              <thead>
                <tr>
                  <th>Portal</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {portals.map((portal, index) => (
                  <tr key={index}>
                    <td className="font-medium">{portal.name}</td>
                    <td>{portal.type}</td>
                    <td>{portal.description}</td>
                    <td>
                      <Link href={portal.href} className="text-primary font-semibold hover:underline text-xs">Access</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
