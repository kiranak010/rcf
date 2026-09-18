'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button, Input, Label, Textarea, Select, Card, CardHeader, CardTitle, CardContent, CardFooter, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui'
import ImageUpload from '@/components/admin/ImageUpload'
import Link from 'next/link'

export default function EditNewsPage() {
  const params = useParams()
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    image: '',
    date: '',
    category: '',
    documents: '',
    externalLinks: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    status: 'draft',
    sortOrder: 0,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    fetch(`/api/news/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title,
          slug: data.slug,
          description: data.description || '',
          content: data.content || '',
          image: data.image || '',
          date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
          category: data.category || '',
          documents: data.documents || '',
          externalLinks: data.externalLinks || '',
          seoTitle: data.seoTitle || '',
          seoDescription: data.seoDescription || '',
          seoKeywords: data.seoKeywords || '',
          status: data.status,
          sortOrder: data.sortOrder,
        })
        setLoading(false)
      })
  }, [params.id])

  const handleSubmit = async (status: string) => {
    setSaving(true)
    await fetch(`/api/news/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, status }),
    })
    setSaving(false)
  }

  const handleDelete = async () => {
    await fetch(`/api/news/${params.id}`, { method: 'DELETE' })
    router.push('/admin/news')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/news">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit News Article</h1>
            <p className="mt-1 text-sm text-gray-500">Update news article details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSubmit('draft')} disabled={saving}>Save Draft</Button>
          <Button onClick={() => handleSubmit('published')} disabled={saving}>Publish</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>News Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="image">Image</Label>
              <Input id="image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/uploads/image.jpg or upload below" />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Upload Image</Label>
            <ImageUpload onUpload={(url) => setForm({ ...form, image: url })} existingImage={form.image} />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="documents">Documents</Label>
            <Textarea id="documents" value={form.documents} onChange={(e) => setForm({ ...form, documents: e.target.value })} rows={2} />
          </div>
          <div>
            <Label htmlFor="externalLinks">External Links</Label>
            <Textarea id="externalLinks" value={form.externalLinks} onChange={(e) => setForm({ ...form, externalLinks: e.target.value })} rows={2} />
          </div>
          <div>
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input id="seoTitle" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea id="seoDescription" value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} rows={3} />
          </div>
          <div>
            <Label htmlFor="seoKeywords">SEO Keywords</Label>
            <Input id="seoKeywords" value={form.seoKeywords} onChange={(e) => setForm({ ...form, seoKeywords: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input id="sortOrder" type="number" value={form.sortOrder.toString()} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/admin/news')}>Cancel</Button>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => setDeleteOpen(true)}>Delete</Button>
            <Button variant="outline" onClick={() => handleSubmit('draft')} disabled={saving}>Save Draft</Button>
            <Button onClick={() => handleSubmit('published')} disabled={saving}>Publish</Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogHeader>
          <DialogTitle>Delete News Article</DialogTitle>
          <DialogDescription>Are you sure you want to delete this news article? This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
