import { Suspense } from 'react'
import AnnouncementsClient from './AnnouncementsClient'

export default function AnnouncementsPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <AnnouncementsClient />
    </Suspense>
  )
}
