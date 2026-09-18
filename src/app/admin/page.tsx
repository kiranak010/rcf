'use client'

import { useEffect, useState } from 'react'
import { BarChart3, FileText, Users, Package, Newspaper, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    announcements: 0,
    tenders: 0,
    recruitment: 0,
    products: 0,
    news: 0,
    enquiries: 0,
  })

  useEffect(() => {
    fetch('/api/stats').then((res) => res.json()).then(setStats)
  }, [])

  const cards = [
    { name: 'Announcements', value: stats.announcements, href: '/admin/announcements', icon: FileText, color: 'bg-blue-600' },
    { name: 'Tenders', value: stats.tenders, href: '/admin/tenders', icon: FileText, color: 'bg-green-600' },
    { name: 'Recruitment', value: stats.recruitment, href: '/admin/recruitment', icon: Users, color: 'bg-purple-600' },
    { name: 'Products', value: stats.products, href: '/admin/products', icon: Package, color: 'bg-orange-600' },
    { name: 'News', value: stats.news, href: '/admin/news', icon: Newspaper, color: 'bg-red-600' },
    { name: 'Enquiries', value: stats.enquiries, href: '/admin/enquiries', icon: TrendingUp, color: 'bg-teal-600' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the RCF Content Management System.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className="card-base p-6 hover:shadow-lg transition-shadow flex items-center"
          >
            <div className={`${card.color} p-3 rounded-sm mr-4`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{card.name}</div>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
