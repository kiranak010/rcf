'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, Plus, Edit, Trash2, Loader2 } from 'lucide-react'

interface FarmerScheme {
  id: string
  schemeName: string
  provider: string
  lastUpdated: string
}

export default function AdminFarmerSupportPage() {
  const [schemes, setSchemes] = useState<FarmerScheme[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSchemes() {
      try {
        const res = await fetch('/api/admin/farmer-schemes')
        const data = await res.json()
        if (data.items) setSchemes(data.items)
      } catch (error) {
        console.error('Error fetching schemes:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSchemes()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scheme?')) return
    try {
      const res = await fetch(`/api/admin/farmer-schemes/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setSchemes(schemes.filter(s => s.id !== id))
      }
    } catch (error) {
      alert('Failed to delete scheme')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farmer Support Management</h1>
            <p className="text-gray-600">Manage subsidies, loans, and financial resources for farmers.</p>
          </div>
          <Link
            href="/admin/farmer-support/new"
            className="btn-primary px-6 py-3 flex items-center font-bold shadow-lg"
          >
            <Plus className="h-5 w-5 mr-2" /> Add New Scheme
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">Scheme Name</th>
                  <th className="px-6 py-4">Provider</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {schemes.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-gray-500">
                      No schemes found. Add your first one!
                    </td>
                  </tr>
                ) : (
                  schemes.map((scheme) => (
                    <tr key={scheme.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">{scheme.schemeName}</td>
                      <td className="px-6 py-4 text-gray-600">{scheme.provider}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(scheme.lastUpdated).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <Link
                          href={`/admin/farmer-support/${scheme.id}`}
                          className="text-primary hover:underline font-semibold"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(scheme.id)}
                          className="text-red-600 hover:underline font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
