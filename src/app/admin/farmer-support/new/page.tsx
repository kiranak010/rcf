'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function NewSchemePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    schemeName: '',
    provider: '',
    eligibility: '',
    benefits: '',
    docsRequired: '',
    howToApply: '',
    officialSource: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/farmer-schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create scheme')
      }

      setSuccess(true)
      setTimeout(() => router.push('/admin/farmer-support'), 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-md">
          <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Save className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Scheme Created!</h1>
          <p className="text-gray-600 mb-8">The financial support scheme has been added successfully.</p>
          <p className="text-sm text-gray-400">Redirecting back to list...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Add New Farmer Scheme</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Scheme Name *</label>
                <input
                  type="text"
                  required
                  value={form.schemeName}
                  onChange={e => setForm({...form, schemeName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. PM-Kisan Samman Nidhi"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Provider/Agency *</label>
                <input
                  type="text"
                  required
                  value={form.provider}
                  onChange={e => setForm({...form, provider: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. Ministry of Agriculture"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Eligibility Criteria</label>
                <textarea
                  rows={3}
                  value={form.eligibility}
                  onChange={e => setForm({...form, eligibility: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="Who is eligible for this scheme?"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Benefits & Financial Aid</label>
                <textarea
                  rows={3}
                  value={form.benefits}
                  onChange={e => setForm({...form, benefits: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="Describe the subsidies or loan amounts..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Documents Required</label>
                <textarea
                  rows={3}
                  value={form.docsRequired}
                  onChange={e => setForm({...form, docsRequired: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="List the required documents (e.g. Aadhaar, Land Records)..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">How to Apply</label>
                <textarea
                  rows={3}
                  value={form.howToApply}
                  onChange={e => setForm({...form, howToApply: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="Step-by-step application process..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Official Source URL</label>
                <input
                  type="url"
                  value={form.officialSource}
                  onChange={e => setForm({...form, officialSource: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="https://official-gov-portal.gov.in/scheme"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center text-red-800 text-sm">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-8 py-3 font-bold flex items-center"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
                Create Scheme
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

import { AlertCircle } from 'lucide-react'
