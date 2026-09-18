'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, Clock, FileText, User, ShieldCheck, AlertCircle } from 'lucide-react'

export default function KYCReviewPage() {
  const [partners, setPartners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPending() {
      try {
        const res = await fetch('/api/admin/kyc')
        const data = await res.json()
        setPartners(data.items || [])
      } catch (error) {
        console.error('Fetch KYC error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPending()
  }, [])

  const handleStatusUpdate = async (id: string, status: string) => {
    setActionLoading(id)
    try {
      const res = await fetch('/api/admin/kyc', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partnerId: id, status })
      })

      if (res.ok) {
        setPartners(partners.filter(p => p.id !== id))
      }
    } catch (error) {
      alert('Failed to update status')
    } finally {
      setActionLoading(null)
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
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">KYC Verification Hub</h1>
            <p className="text-gray-600">Review and approve partner onboarding applications.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
            <span className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-bold text-gray-700">{partners.length} Pending Applications</span>
          </div>
        </div>

        {partners.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-gray-100 shadow-sm">
            <ShieldCheck className="h-16 w-16 text-green-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-500">There are no pending KYC applications to review.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:border-primary/30 transition-all">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{partner.businessName}</h3>
                        <p className="text-sm text-gray-500">{partner.user.email} • {partner.partnerId}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleStatusUpdate(partner.id, 'REJECTED')}
                        disabled={actionLoading === partner.id}
                        className="flex items-center px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                      >
                        <XCircle className="h-4 w-4 mr-2" /> Reject
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(partner.id, 'VERIFIED')}
                        disabled={actionLoading === partner.id}
                        className="flex items-center px-4 py-2 text-sm font-bold text-green-600 bg-green-50 hover:bg-green-100 rounded-xl transition-colors disabled:opacity-50"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" /> Approve
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Business Details</p>
                      <p className="text-sm font-medium text-gray-700">{partner.businessType}</p>
                      <p className="text-xs text-gray-500">{partner.city}, {partner.state}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Documents</p>
                      <div className="flex flex-wrap gap-2">
                        {partner.kycDocuments.map((doc: any, i: number) => (
                          <span key={i} className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                            doc.status === 'VERIFIED' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {doc.docType}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Submission Date</p>
                      <p className="text-sm text-gray-700">{new Date(partner.createdAt).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
