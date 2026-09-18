'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'

export default function NewFacility() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', location: '', description: '', status: 'active' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/facilities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false)
    router.push('/admin/facilities')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Facility</h1>
      </div>
      <form onSubmit={handleSubmit} className="card-base p-8 max-w-3xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Name</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
          <input type="text" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
          <textarea rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none" />
        </div>
        <button type="submit" disabled={saving} className="btn-primary">
          <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
