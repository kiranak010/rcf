'use client'

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70 z-10" />
        <div className="relative z-20 container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Terms of Use</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Terms of Use
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              Terms and conditions for using the RCF website.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl prose prose-gray">
            <h2>Acceptance of Terms</h2>
            <p>By accessing this website, you agree to be bound by these terms and conditions.</p>
            <h2>Use of Content</h2>
            <p>Content on this website is owned by RCF and is protected by copyright laws. Unauthorized reproduction or distribution is prohibited.</p>
            <h2>Accuracy of Information</h2>
            <p>RCF endeavors to keep information accurate and up-to-date but makes no warranties about completeness, accuracy, or reliability.</p>
            <h2>External Links</h2>
            <p>This website may contain links to external sites. RCF is not responsible for the content or privacy practices of external sites.</p>
            <h2>Modifications</h2>
            <p>RCF reserves the right to modify these terms at any time without notice.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
