'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pages: 12,
    notices: 8,
    tenders: 5,
    recruitment: 3,
    products: 24,
    documents: 56,
    news: 12,
    users: 18,
    pending: 2,
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the RCF Content Management System.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-base p-6">
          <div className="text-sm text-gray-600">Published Pages</div>
          <div className="text-3xl font-bold text-gray-900">{stats.pages}</div>
        </div>
        <div className="card-base p-6">
          <div className="text-sm text-gray-600">Active Tenders</div>
          <div className="text-3xl font-bold text-gray-900">{stats.tenders}</div>
        </div>
        <div className="card-base p-6">
          <div className="text-sm text-gray-600">Recruitment Notices</div>
          <div className="text-3xl font-bold text-gray-900">{stats.recruitment}</div>
        </div>
        <div className="card-base p-6">
          <div className="text-sm text-gray-600">Pending Approval</div>
          <div className="text-3xl font-bold text-gray-900">{stats.pending}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-base p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div>Published announcement: Annual General Meeting notice</div>
            <div>Updated tender: Trombay Unit procurement</div>
            <div>New recruitment: Management Trainee positions</div>
            <div>Uploaded document: Sustainability Report 2023-24</div>
          </div>
        </div>
        <div className="card-base p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/announcements/new" className="btn-primary text-center">New Announcement</Link>
            <Link href="/admin/tenders/new" className="btn-primary text-center">New Tender</Link>
            <Link href="/admin/recruitment/new" className="btn-primary text-center">New Recruitment</Link>
            <Link href="/admin/news/new" className="btn-primary text-center">New Article</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
