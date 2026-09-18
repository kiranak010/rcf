'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button, Input, Label, Textarea, Select, Card, CardHeader, CardTitle, CardContent, CardFooter, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui'
import Link from 'next/link'

export default function EditRecruitmentPage() {
  const params = useParams()
  const router = useRouter()
  const [form, setForm] = useState({
    jobTitle: '',
    advertisementNo: '',
    department: '',
    location: '',
    grade: '',
    qualification: '',
    experience: '',
    openingDate: '',
    closingDate: '',
    jobDescription: '',
    notificationPdf: '',
    applyUrl: '',
    status: 'draft',
    type: 'vacancy',
    sortOrder: 0,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    fetch(`/api/recruitment/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          jobTitle: data.jobTitle,
          advertisementNo: data.advertisementNo || '',
          department: data.department || '',
          location: data.location || '',
          grade: data.grade || '',
          qualification: data.qualification || '',
          experience: data.experience || '',
          openingDate: data.openingDate ? new Date(data.openingDate).toISOString().split('T')[0] : '',
          closingDate: data.closingDate ? new Date(data.closingDate).toISOString().split('T')[0] : '',
          jobDescription: data.jobDescription || '',
          notificationPdf: data.notificationPdf || '',
          applyUrl: data.applyUrl || '',
          status: data.status,
          type: data.type,
          sortOrder: data.sortOrder,
        })
        setLoading(false)
      })
  }, [params.id])

  const handleSubmit = async (status: string) => {
    setSaving(true)
    await fetch(`/api/recruitment/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, status }),
    })
    setSaving(false)
  }

  const handleDelete = async () => {
    await fetch(`/api/recruitment/${params.id}`, { method: 'DELETE' })
    router.push('/admin/recruitment')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/recruitment">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Recruitment</h1>
            <p className="mt-1 text-sm text-gray-500">Update job posting details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSubmit('draft')} disabled={saving}>Save Draft</Button>
          <Button onClick={() => handleSubmit('published')} disabled={saving}>Publish</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input id="jobTitle" value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="advertisementNo">Advertisement Number</Label>
            <Input id="advertisementNo" value={form.advertisementNo} onChange={(e) => setForm({ ...form, advertisementNo: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Input id="grade" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={form.type} onChange={(value) => setForm({ ...form, type: value })}>
                <option value="vacancy">Vacancy</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="qualification">Qualification</Label>
              <Input id="qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Input id="experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="openingDate">Opening Date</Label>
              <Input id="openingDate" type="date" value={form.openingDate} onChange={(e) => setForm({ ...form, openingDate: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="closingDate">Closing Date</Label>
              <Input id="closingDate" type="date" value={form.closingDate} onChange={(e) => setForm({ ...form, closingDate: e.target.value })} />
            </div>
          </div>
          <div>
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea id="jobDescription" value={form.jobDescription} onChange={(e) => setForm({ ...form, jobDescription: e.target.value })} rows={6} />
          </div>
          <div>
            <Label htmlFor="notificationPdf">Notification PDF</Label>
            <Input id="notificationPdf" value={form.notificationPdf} onChange={(e) => setForm({ ...form, notificationPdf: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="applyUrl">Apply URL</Label>
            <Input id="applyUrl" type="url" value={form.applyUrl} onChange={(e) => setForm({ ...form, applyUrl: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input id="sortOrder" type="number" value={form.sortOrder.toString()} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/admin/recruitment')}>Cancel</Button>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => setDeleteOpen(true)}>Delete</Button>
            <Button variant="outline" onClick={() => handleSubmit('draft')} disabled={saving}>Save Draft</Button>
            <Button onClick={() => handleSubmit('published')} disabled={saving}>Publish</Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogHeader>
          <DialogTitle>Delete Recruitment Entry</DialogTitle>
          <DialogDescription>Are you sure you want to delete this recruitment entry? This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
