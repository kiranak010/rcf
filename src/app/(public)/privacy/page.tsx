'use client'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70 z-10" />
        <div className="relative z-20 container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Privacy Policy</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              How RCF collects, uses, and protects your personal information.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl prose prose-gray">
            <h2>Information Collection</h2>
            <p>RCF collects personal information only when voluntarily provided by users through contact forms, enquiry forms, or other interactive features.</p>
            <h2>Use of Information</h2>
            <p>Collected information is used solely for the purpose for which it was provided, such as responding to enquiries or processing applications.</p>
            <h2>Data Security</h2>
            <p>RCF implements appropriate security measures to protect personal information from unauthorized access, alteration, or disclosure.</p>
            <h2>Cookies</h2>
            <p>This website may use cookies to improve user experience. Users can disable cookies through browser settings.</p>
            <h2>Contact</h2>
            <p>For privacy-related queries, contact the RCF administration at info@rcf.gov.in.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
