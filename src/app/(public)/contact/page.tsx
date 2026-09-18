'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
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
              <span>Contact</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              Get in touch with us.
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              Reach out for inquiries, partnerships, or support. Our team is here to assist you.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="govt-border-block p-8 text-center">
                  <div className="text-green-600 text-5xl mb-4">✓</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you for contacting us.</h2>
                  <p className="text-gray-600">We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="govt-border-block p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-900 mb-1">Name</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-900 mb-1">Email</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Subject</label>
                    <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Message</label>
                    <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"></textarea>
                  </div>
                  <button type="submit" className="btn-primary">Send Message</button>
                </form>
              )}
            </div>
            <div>
              <div className="govt-border-block p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                    <span>RCF Bhawan, Administrative Block, Mumbai - 400001, Maharashtra, India</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 flex-shrink-0 text-primary" />
                    <span>+91-22-12345678</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 flex-shrink-0 text-primary" />
                    <span>info@rcf.gov.in</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-3 flex-shrink-0 text-primary" />
                    <span>Mon - Fri: 9:00 AM - 5:30 PM IST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
