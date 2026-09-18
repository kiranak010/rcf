import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.siteSettings.createMany({
    data: [
      { key: 'siteTitle', value: 'Rashtriya Chemicals and Fertilizers Limited' },
      { key: 'siteDescription', value: 'A Government of India Enterprise engaged in the manufacture and marketing of fertilizers and chemicals.' },
      { key: 'contactEmail', value: 'info@rcf.gov.in' },
      { key: 'contactPhone', value: '+91-22-25311234' },
      { key: 'contactAddress', value: 'RCF Limited, Trombay Unit, Chembur, Mumbai - 400074, Maharashtra, India' },
    ],
  })

  const hashedPassword = await bcrypt.hash('RcfAdmin@2025!', 10)
  await prisma.user.upsert({
    where: { email: 'admin@rcf.gov.in' },
    update: {},
    create: {
      email: 'admin@rcf.gov.in',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  })

  await prisma.product.createMany({
    data: [
      { name: 'Urea Gold', slug: 'urea-gold', description: 'High-nitrogen urea for enhanced crop yield.', category: 'Fertilizers', status: 'published' },
      { name: 'Methanol', slug: 'methanol', description: 'Industrial-grade methanol for chemical and pharmaceutical applications.', category: 'Industrial Chemicals', status: 'published' },
      { name: 'Formic Acid', slug: 'formic-acid', description: 'High-purity formic acid for leather, textile, and chemical industries.', category: 'Industrial Chemicals', status: 'published' },
      { name: 'Ammonia', slug: 'ammonia', description: 'Liquid ammonia for agricultural and industrial use.', category: 'Ammonia & Intermediates', status: 'published' },
      { name: 'Complex Fertilizer NPK 20-20-0', slug: 'complex-fertilizer-npk-20-20-0', description: 'Balanced NPK complex fertilizer for improved soil health.', category: 'Fertilizers', status: 'published' },
      { name: 'Methylamines', slug: 'methylamines', description: 'Methylamines for agrochemicals, pharmaceuticals, and water treatment.', category: 'Specialty Products', status: 'published' },
    ],
  })

  await prisma.tender.createMany({
    data: [
      { title: 'Procurement of High-Voltage Electrical Switchgear for Trombay Unit', referenceNumber: 'RCF/TMB/ELEC/2025/001', description: 'Supply and installation of advanced electrical switchgear for the main power distribution center.', deadline: new Date('2025-10-15').toISOString(), status: 'active' },
      { title: 'Outsourcing of Heavy-Duty Transport Services for Thal Unit', referenceNumber: 'RCF/THL/TRANS/2025/003', description: 'Long-term contract for hiring of heavy-duty trucks and specialized tankers for plant logistics.', deadline: new Date('2025-10-20').toISOString(), status: 'active' },
      { title: 'Enterprise IT Infrastructure Maintenance Contract (AMC)', referenceNumber: 'RCF/CORP/IT/2025/012', description: 'Comprehensive Annual Maintenance Contract for corporate servers, cloud networking, and endpoint security.', deadline: new Date('2025-11-01').toISOString(), status: 'active' },
      { title: 'Supply of Specialized Industrial Valves for Ammonia Plant', referenceNumber: 'RCF/TMB/VALV/2025/045', description: 'Procurement of corrosion-resistant industrial valves for the ammonia synthesis unit.', deadline: new Date('2025-11-15').toISOString(), status: 'active' },
    ],
  })

  await prisma.announcement.createMany({
    data: [
      { title: 'Quarterly Financial Results for Q2 FY2025-26', category: 'Financial Results', status: 'published' },
      { title: 'Recruitment Drive for Management Trainees 2025 - Apply Now', category: 'Recruitment', status: 'published' },
      { title: 'Digital Transformation Initiative: New Online Farmer Portal', category: 'Digital India', status: 'published' },
      { title: 'RCF Awarded National Excellence in Public Sector Enterprise', category: 'Awards', status: 'published' },
      { title: 'Operational Expansion of Ammonia Plant at Thal Unit', category: 'Project Update', status: 'published' },
      { title: 'Notice for Procurement of Raw Materials for Q3', category: 'Notice', status: 'published' },
      { title: 'Annual General Meeting Notification - December 2025', category: 'Governance', status: 'published' },
    ],
  })

  await prisma.news.createMany({
    data: [
      { title: 'RCF Introduces Next-Gen Urea Gold for Enhanced Crop Productivity', category: 'Products', status: 'published' },
      { title: 'Strategic Partnership with Global Energy Firms for Green Ammonia', category: 'Sustainability', status: 'published' },
      { title: 'Innovation Hub: RCF Pioneers New Fertilizer Coating Technology', category: 'Technology', status: 'published' },
      { title: 'Kisan Manch Outreach Program Empowers 10,000+ Farmers in Maharashtra', category: 'Outreach', status: 'published' },
      { title: 'Expansion of Logistics Network to Improve Fertilizer Distribution', category: 'Infrastructure', status: 'published' },
      { title: 'RCF Promotes Sustainable Farming Practices through Farmer Training', category: 'Sustainability', status: 'published' },
    ],
  })

  await prisma.recruitment.createMany({
    data: [
      {
        title: 'Management Trainee (Chemical)',
        jobTitle: 'Management Trainee (Chemical)',
        advertisementNo: 'RCF/HR/MT/2025/01',
        department: 'Human Resources',
        location: 'Mumbai',
        qualification: 'B.Tech/B.E. in Chemical Engineering',
        experience: '0-2 years',
        openingDate: '2025-09-01',
        closingDate: '2025-09-30',
        jobDescription: 'RCF invites applications for Management Trainee positions in the Chemical discipline.',
        status: 'published',
        type: 'vacancy',
      },
      {
        title: 'Assistant Manager (Finance)',
        jobTitle: 'Assistant Manager (Finance)',
        advertisementNo: 'RCF/HR/AM/2025/05',
        department: 'Finance',
        location: 'Mumbai',
        qualification: 'CA/ICWA/MBA Finance',
        experience: '3-5 years',
        openingDate: '2025-08-15',
        closingDate: '2025-09-10',
        jobDescription: 'Vacancy for Assistant Manager in Finance for corporate office.',
        status: 'published',
        type: 'vacancy',
      },
    ],
  })

  await prisma.document.createMany({
    data: [
      { title: 'Annual Report 2024-25', category: 'Annual Report', fileUrl: '/documents/annual-report-2024-25.pdf', fileName: 'annual-report-2024-25.pdf' },
      { title: 'Code of Conduct for Directors', category: 'Governance', fileUrl: '/documents/code-of-conduct.pdf', fileName: 'code-of-conduct.pdf' },
      { title: 'Tender Notice - Electrical Materials', category: 'Tender', fileUrl: '/documents/tender-electrical.pdf', fileName: 'tender-electrical.pdf' },
    ],
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
