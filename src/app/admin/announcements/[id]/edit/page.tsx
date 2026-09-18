'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button, Input, Label, Textarea, Select, Card, CardHeader, CardTitle, CardContent, CardFooter, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui'
import ImageUpload from '@/components/admin/ImageUpload'

export default function EditAnnouncementPage() {
  const params = useParams()
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    publishDate: '',
    expiryDate: '',
    isNew: false,
    externalUrl: '',
    pdfFile: '',
    status: 'draft',
    isFeatured: false,
    sortOrder: 0,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    fetch(`/api/announcements/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title,
          description: data.description || '',
          category: data.category || '',
          publishDate: data.publishDate ? new Date(data.publishDate).toISOString().split('T')[0] : '',
          expiryDate: data.expiryDate ? new Date(data.expiryDate).toISOString().split('T')[0] : '',
          isNew: data.isNew,
          externalUrl: data.externalUrl || '',
          pdfFile: data.pdfFile || '',
          status: data.status,
          isFeatured: data.isFeatured,
          sortOrder: data.sortOrder,
        })
        setLoading(false)
      })
  }, [params.id])

  const handleSubmit = async (status: string) => {
    setSaving(true)
    await fetch(`/api/announcements/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, status }),
    })
    setSaving(false)
  }

  const handleDelete = async () => {
    await fetch(`/api/announcements/${params.id}`, { method: 'DELETE' })
    router.push('/admin/announcements')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/announcements">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Announcement</h1>
            <p className="mt-1 text-sm text-gray-500">Update announcement details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSubmit('draft')} disabled={saving}>Save Draft</Button>
          <Button onClick={() => handleSubmit('published')} disabled={saving}>Publish</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcement Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="publishDate">Publish Date</Label>
              <Input id="publishDate" type="date" value={form.publishDate} onChange={(e) => setForm({ ...form, publishDate: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input id="expiryDate" type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
            </div>
          </div>
          <div>
            <Label htmlFor="externalUrl">External URL</Label>
            <Input id="externalUrl" type="url" value={form.externalUrl} onChange={(e) => setForm({ ...form, externalUrl: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="pdfFile">PDF Document</Label>
            <Input id="pdfFile" value={form.pdfFile} onChange={(e) => setForm({ ...form, pdfFile: e.target.value })} placeholder="/uploads/document.pdf or upload below" />
          </div>
          <div>
            <Label>Upload PDF</Label>
            <ImageUpload onUpload={(url) => setForm({ ...form, pdfFile: url })} existingImage={form.pdfFile} accept={['application/pdf']} />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} />
              <span className="text-sm">Mark as New</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
              <span className="text-sm">Featured</span>
            </label>
          </div>
          <div>
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input id="sortOrder" type="number" value={form.sortOrder.toString()} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/admin/announcements')}>Cancel</Button>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => setDeleteOpen(true)}>Delete</Button>
            <Button variant="outline" onClick={() => handleSubmit('draft')} disabled={saving}>Save Draft</Button>
            <Button onClick={() => handleSubmit('published')} disabled={saving}>Publish</Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogHeader>
          <DialogTitle>Delete Announcement</DialogTitle>
          <DialogDescription>Are you sure you want to delete this announcement? This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
