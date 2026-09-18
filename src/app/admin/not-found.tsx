'use client'

export default function AdminNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The admin page you&apos;re looking for doesn&apos;t exist.</p>
        <a href="/admin" className="btn-primary">Back to Dashboard</a>
      </div>
    </div>
  )
}
