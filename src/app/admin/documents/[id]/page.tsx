'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Save, ArrowLeft, Upload } from 'lucide-react'

export default function DocumentForm() {
  const router = useRouter()
  const params = useParams()
  const isEdit = !!params.id
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    fileUrl: '',
    fileName: '',
  })

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/documents/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            title: data.item?.title || '',
            description: data.item?.description || '',
            category: data.item?.category || '',
            fileUrl: data.item?.fileUrl || '',
            fileName: data.item?.fileName || '',
          })
          setLoading(false)
        })
    }
  }, [isEdit, params.id])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/media/upload', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.url) {
      setForm({ ...form, fileUrl: data.url, fileName: file.name })
    }
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch(`/api/documents${isEdit ? `/${params.id}` : ''}`, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    router.push('/admin/documents')
  }

  if (loading) return <div className="text-center py-20 text-gray-600">Loading...</div>

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">{isEdit ? 'Edit' : 'New'} Document</h1>
      </div>

      <form onSubmit={handleSubmit} className="card-base p-8 max-w-3xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">File</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500"
              />
            </div>
            <input
              type="text"
              value={form.fileUrl}
              onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
              placeholder="Or paste file URL"
              className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none mt-2"
            />
          </div>
          <button type="submit" disabled={saving} className="btn-primary">
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
