import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding real RCF data...')

  // 1. Tenders
  const tenders = [
    {
      title: 'Contract for dismantling and inspection of Dry Gas Seal',
      referenceNumber: 'T-10512',
      deadline: new Date('2026-10-18'),
      status: 'active',
      description: 'Contract for dismantling and inspection of Dry Gas Seal at RCF Trombay.',
    },
    {
      title: 'Biennial Rate Contract for Fuji electric India Private limited Make VFDs',
      referenceNumber: 'T-10511',
      deadline: new Date('2026-10-18'),
      status: 'active',
      description: 'Rate contract for Fuji electric India Private limited Make VFDs.',
    },
    {
      title: 'Inviting price bids from prequalified parties for transportation contract',
      referenceNumber: 'T-10510',
      deadline: new Date('2026-10-18'),
      status: 'active',
      description: 'Transportation contract for fertilizer products.',
    },
  ]

  for (const t of tenders) {
    await prisma.tender.upsert({
      where: { id: t.referenceNumber }, // Use ref as ID for idempotency
      update: {},
      create: { ...t, id: t.referenceNumber },
    })
  }

  // 2. Recruitment
  const recruits = [
    {
      title: 'Pre-Employment Medical Check-up Shortlist',
      jobTitle: 'Medical Candidate',
      department: 'HR',
      status: 'published',
      type: 'shortlist',
      jobDescription: 'Provisionally Shortlisted Candidates for the Pre-Employment Medical Check-up.',
    },
    {
      title: 'Assistant Officer (Secretarial) E0 Grade',
      jobTitle: 'Assistant Officer',
      department: 'Secretarial',
      status: 'published',
      type: 'vacancy',
      jobDescription: 'Advertisement for the post of Assistant Officer (Secretarial) E0 Grade.',
    },
  ]

  for (const r of recruits) {
    await prisma.recruitment.create({ data: r })
  }

  // 3. News/Announcements
  const news = [
    {
      title: 'CORRIGENDUM-Amendment to revise the Age for PwBD candidates',
      category: 'Recruitment',
      description: 'Amendment to revise the Age for PwBD candidates for current openings.',
      status: 'published',
      date: new Date(),
    },
    {
      title: 'Director (Marketing) Recruitment',
      category: 'Corporate',
      description: 'Application process for Director (Marketing) - Rashtriya Chemicals And Fertilizers Ltd.',
      status: 'published',
      date: new Date(),
    },
  ]

  for (const n of news) {
    await prisma.news.create({ data: n })
  }

  // 4. Products
  const prods = [
    {
      name: 'Urea',
      slug: 'urea',
      category: 'Fertilizer',
      description: 'High-quality nitrogenous fertilizer for various Indian crops.',
      status: 'active',
    },
    {
      name: 'NPK Complex',
      slug: 'npk-complex',
      category: 'Fertilizer',
      description: 'Balanced nutrient fertilizer for optimal crop growth.',
      status: 'active',
    },
    {
      name: 'Industrial Grade Water',
      slug: 'industrial-water',
      category: 'Industrial',
      description: 'Pure industrial grade water for chemical processing.',
      status: 'active',
    },
  ]

  for (const p of prods) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }

  console.log('Real data seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
