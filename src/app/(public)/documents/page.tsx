import { Suspense } from 'react'
import DocumentsClient from './DocumentsClient'

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <DocumentsClient />
    </Suspense>
  )
}
