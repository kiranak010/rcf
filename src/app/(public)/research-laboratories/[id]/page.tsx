import { notFound } from 'next/navigation'
import { ArrowLeft, FlaskConical, Microscope, Zap, Info } from 'lucide-react'
import Link from 'next/link'

const LABS_DATA = [
  {
    name: 'Materials Science Laboratory',
    description: 'Focused on developing advanced materials for industrial catalysts and fertilizer coatings.',
    content: 'The Materials Science Lab is dedicated to the research and development of high-performance materials. Our current focus is on nanotechnology for controlled-release fertilizers, which minimizes leaching and maximizes nutrient uptake by crops.',
    details: 'Equipped with scanning electron microscopes (SEM) and X-ray diffraction (XRD) systems, the lab works on synthesizing nano-composites that can withstand extreme environmental conditions while maintaining chemical stability.',
    specialties: ['Nano-coatings', 'Catalyst Optimization', 'Polymer Research']
  },
  {
    name: 'Chemical Synthesis Hub',
    description: 'Specializing in the creation of new chemical intermediates for agricultural and pharmaceutical use.',
    content: 'The Chemical Synthesis Hub bridges the gap between theoretical chemistry and industrial application. We specialize in the synthesis of high-purity intermediates that are used as building blocks for complex specialty chemicals.',
    details: 'Our researchers utilize high-pressure reactors and precision distillation units to achieve purity levels exceeding 99.9%. The hub collaborates with academic institutions to bring cutting-edge synthesis methods to the industrial scale.',
    specialties: ['Organic Synthesis', 'High-Pressure Chemistry', 'Purification Techniques']
  },
  {
    name: 'Environmental Monitoring Lab',
    description: 'Monitoring and mitigating the environmental impact of industrial chemical production.',
    content: 'Sustainability is at the core of our operations. The Environmental Monitoring Lab tracks emissions, water quality, and soil health around our manufacturing units to ensure total compliance with national and international standards.',
    details: 'Using automated sensors and advanced chromatography, the lab provides real-time data on air and water quality. We are currently developing new biological filtration systems to further reduce the ecological footprint of chemical production.',
    specialties: ['Emission Tracking', 'Water Quality Analysis', 'Green Chemistry']
  }
]

export default async function LabDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const lab = LABS_DATA[id - 1]

  if (!lab) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <Link href="/research-laboratories" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Laboratories
            </Link>
            <div className="govt-badge mb-4">
              <span>R&D Division</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight text-white">
              {lab.name}
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-3xl leading-relaxed">
              {lab.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="h-6 w-6 mr-2 text-primary" />
                Research Focus
              </h3>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12 whitespace-pre-wrap">
                {lab.content}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Capabilities</h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                {lab.details}
              </p>
            </div>

            <div className="lg:col-span-1">
              <div className="govt-border-block p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Core Specialties</h3>
                <div className="space-y-4">
                  {lab.specialties.map((spec, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Zap className="h-5 w-5 text-primary mr-3" />
                      <span className="text-sm text-gray-700 font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
