'use client'

import { useEffect, useState } from 'react'
import { Save, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'

interface HomepageContent {
  hero?: {
    title?: string
    description?: string
    image?: string
    ctaText?: string
    ctaLink?: string
  }
  stats?: Array<{ label: string; value: string }>
  featuredProducts?: string[]
  featuredTenders?: string[]
  news?: string[]
  [key: string]: any
}

export default function HomepagePage() {
  const [content, setContent] = useState<HomepageContent>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/homepage')
      .then((res) => res.json())
      .then((data) => {
        setContent(data)
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await fetch('/api/homepage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    })
    setSaving(false)
    alert('Homepage content saved')
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homepage Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage homepage content and sections</p>
        </div>
        <div className="flex items-center space-x-3">
          <a href="/" target="_blank" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </a>
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 disabled:opacity-50">
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Title</label>
              <input
                type="text"
                value={content.hero?.title || ''}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Description</label>
              <textarea
                value={content.hero?.description || ''}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CTA Button Text</label>
              <input
                type="text"
                value={content.hero?.ctaText || ''}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaText: e.target.value } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Image</label>
              <input
                type="text"
                value={content.hero?.image || ''}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, image: e.target.value } })}
                placeholder="/uploads/hero.jpg or upload below"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Hero Image</label>
              <ImageUpload onUpload={(url) => setContent({ ...content, hero: { ...content.hero, image: url } })} existingImage={content.hero?.image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
