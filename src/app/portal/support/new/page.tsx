'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Send, MessageSquare, AlertCircle, Loader2 } from 'lucide-react'

export default function NewTicketPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [ticketId, setTicketId] = useState('')

  const [form, setForm] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'NORMAL',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/portal/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit ticket')
      }

      setSuccess(true)
      setTicketId(data.ticket.id)
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
            <MessageSquare className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ticket Raised!</h1>
          <p className="text-gray-600 mb-6">Your support request has been submitted. Our team will get back to you shortly.</p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Ticket ID</p>
            <p className="text-lg font-mono font-bold text-gray-900">{ticketId.slice(0, 12)}...</p>
          </div>
          <button
            onClick={() => router.push('/portal/support')}
            className="btn-primary w-full py-3 font-bold"
          >
            Back to Support Center
          </button>
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
          <h1 className="text-3xl font-bold text-gray-900">Raise Support Ticket</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                  required
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="">Select Category...</option>
                  <option value="TECHNICAL">Technical Issue</option>
                  <option value="FINANCIAL">Payment & Invoices</option>
                  <option value="STOCK">Stock & Orders</option>
                  <option value="KYC">KYC & Onboarding</option>
                  <option value="GENERAL">General Inquiry</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
                <div className="flex gap-2">
                  {['LOW', 'NORMAL', 'HIGH', 'URGENT'].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm({...form, priority: p})}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                        form.priority === p
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={e => setForm({...form, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="Briefly describe the issue..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Detailed Description</label>
                <textarea
                  required
                  rows={5}
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="Please provide as much detail as possible..."
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
                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Send className="h-5 w-5 mr-2" />}
                Submit Ticket
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

import { Loader2 } from 'lucide-react'
