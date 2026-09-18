'use client'

import { useState } from 'react'
import { MessageSquare } from 'lucide-react'

export default function GrievancePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>Grievance Redressal</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              Share your concerns.
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              We take all feedback seriously. Use this form to submit a grievance or complaint.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {submitted ? (
            <div className="govt-border-block p-8 text-center">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you.</h2>
              <p className="text-gray-600">Your grievance has been submitted. We'll respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="govt-border-block p-6 space-y-4 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">Phone</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">Subject</label>
                  <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">Message</label>
                <textarea rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"></textarea>
              </div>
              <button type="submit" className="btn-primary">Submit Grievance</button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
