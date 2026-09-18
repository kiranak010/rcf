'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, FileText, Search, Filter, ArrowRight, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface StockRequest {
  id: string
  requestId: string
  productId: string
  quantity: number
  approvedQty?: number
  unit: string
  status: string
  createdAt: string
  requiredDate: string
}

export default function RequestHistoryPage() {
  const [requests, setRequests] = useState<StockRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch('/api/portal/requests')
        const data = await res.json()
        setRequests(data.items || [])
      } catch (error) {
        console.error('Fetch requests error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRequests()
  }, [])

  const filteredRequests = requests.filter(req =>
    req.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.productId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'SUBMITTED': 'bg-blue-100 text-blue-800',
      'UNDER_REVIEW': 'bg-orange-100 text-orange-800',
      'APPROVED': 'bg-green-100 text-green-800',
      'PARTIALLY_APPROVED': 'bg-yellow-100 text-yellow-800',
      'REJECTED': 'bg-red-100 text-red-800',
      'DISPATCHED': 'bg-purple-100 text-purple-800',
      'COMPLETED': 'bg-gray-100 text-gray-800',
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
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
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Stock Request History</h1>
            <p className="text-gray-600">Track and manage your fertilizer supply requests.</p>
          </div>
          <Link href="/portal/requests/new" className="btn-primary flex items-center justify-center py-3 px-6 font-bold">
            Raise New Request
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Request ID or Product..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4">Request ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Requested Qty</th>
                  <th className="px-6 py-4">Approved Qty</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-sm font-bold text-gray-900">{req.requestId}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(req.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">{req.productId}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {req.quantity} {req.unit}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                        {req.approvedQty ? `${req.approvedQty} ${req.unit}` : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusBadge(req.status)}`}>
                          {req.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="View Details">
                            <FileText className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Download PDF">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center text-gray-500">
                      No requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    'SUBMITTED': 'bg-blue-100 text-blue-800',
    'UNDER_REVIEW': 'bg-orange-100 text-orange-800',
    'APPROVED': 'bg-green-100 text-green-800',
    'PARTIALLY_APPROVED': 'bg-yellow-100 text-yellow-800',
    'REJECTED': 'bg-red-100 text-red-800',
    'DISPATCHED': 'bg-purple-100 text-purple-800',
    'COMPLETED': 'bg-gray-100 text-gray-800',
  }
  return styles[status] || 'bg-gray-100 text-gray-800'
}

import { Download } from 'lucide-react'
