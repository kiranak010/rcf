import { Suspense } from 'react'
import RecruitmentClient from './RecruitmentClient'

export default function RecruitmentPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <RecruitmentClient />
    </Suspense>
  )
}
