'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'

export default function NewHRItem() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'Policy', content: '', status: 'draft' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/hr', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false)
    router.push('/admin/hr')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New HR Item</h1>
      </div>
      <form onSubmit={handleSubmit} className="card-base p-8 max-w-3xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Title</label>
          <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none">
            <option value="Policy">Policy</option>
            <option value="Rules">Rules</option>
            <option value="Guidelines">Guidelines</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Content</label>
          <textarea rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none" />
        </div>
        <button type="submit" disabled={saving} className="btn-primary">
          <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
