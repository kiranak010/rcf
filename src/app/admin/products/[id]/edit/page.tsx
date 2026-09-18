'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button, Input, Label, Textarea, Select, Card, CardHeader, CardTitle, CardContent, CardFooter, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui'
import ImageUpload from '@/components/admin/ImageUpload'
import Link from 'next/link'

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    specifications: '',
    applications: '',
    packaging: '',
    brochure: '',
    documents: '',
    images: '',
    isFeatured: false,
    status: 'published',
    sortOrder: 0,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name,
          slug: data.slug,
          description: data.description || '',
          category: data.category || '',
          specifications: data.specifications || '',
          applications: data.applications || '',
          packaging: data.packaging || '',
          brochure: data.brochure || '',
          documents: data.documents || '',
          images: data.images || '',
          isFeatured: data.isFeatured,
          status: data.status,
          sortOrder: data.sortOrder,
        })
        setLoading(false)
      })
  }, [params.id])

  const handleSubmit = async (status: string) => {
    setSaving(true)
    await fetch(`/api/products/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, status }),
    })
    setSaving(false)
  }

  const handleDelete = async () => {
    await fetch(`/api/products/${params.id}`, { method: 'DELETE' })
    router.push('/admin/products')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
            <p className="mt-1 text-sm text-gray-500">Update product details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSubmit('draft')} disabled={saving}>Save Draft</Button>
          <Button onClick={() => handleSubmit('published')} disabled={saving}>Publish</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="specifications">Specifications</Label>
            <Textarea id="specifications" value={form.specifications} onChange={(e) => setForm({ ...form, specifications: e.target.value })} rows={4} />
          </div>
          <div>
            <Label htmlFor="applications">Applications</Label>
            <Textarea id="applications" value={form.applications} onChange={(e) => setForm({ ...form, applications: e.target.value })} rows={4} />
          </div>
          <div>
            <Label htmlFor="packaging">Packaging</Label>
            <Textarea id="packaging" value={form.packaging} onChange={(e) => setForm({ ...form, packaging: e.target.value })} rows={3} />
          </div>
          <div>
            <Label htmlFor="brochure">Brochure</Label>
            <Input id="brochure" value={form.brochure} onChange={(e) => setForm({ ...form, brochure: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="documents">Documents</Label>
            <Textarea id="documents" value={form.documents} onChange={(e) => setForm({ ...form, documents: e.target.value })} rows={2} />
          </div>
          <div>
            <Label htmlFor="images">Product Images</Label>
            <Input id="images" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} placeholder="Comma-separated URLs or upload below" />
          </div>
          <div>
            <Label>Upload Product Image</Label>
            <ImageUpload onUpload={(url) => setForm({ ...form, images: url })} existingImage={form.images.split(',')[0]} />
          </div>
          <div className="flex items-center gap-6">
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
          <Button variant="outline" onClick={() => router.push('/admin/products')}>Cancel</Button>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => setDeleteOpen(true)}>Delete</Button>
            <Button variant="outline" onClick={() => handleSubmit('draft')} disabled={saving}>Save Draft</Button>
            <Button onClick={() => handleSubmit('published')} disabled={saving}>Publish</Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>Are you sure you want to delete this product? This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
