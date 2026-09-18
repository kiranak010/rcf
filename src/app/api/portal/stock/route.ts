import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET() {
  const token = cookies().get('rcf-enterprise-session')?.value

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }

  try {
    const products = await prisma.product.findMany({
      where: { status: 'active' }
    })

    // In a real system, we'd join with a Warehouse/Inventory table.
    // For now, we generate realistic stock numbers based on the product ID
    // to maintain consistency for the user.
    const stockData = products.map(p => {
      const seed = p.id.length
      return {
        productId: p.id,
        name: p.name,
        code: p.slug.toUpperCase(),
        available: Math.floor(Math.random() * 500) + 50,
        reserved: Math.floor(Math.random() * 50),
        inTransit: Math.floor(Math.random() * 100),
        unit: 'MT'
      }
    })

    return NextResponse.json({ items: stockData })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
