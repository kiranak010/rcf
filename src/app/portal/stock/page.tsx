'use client'

import { useEffect, useState } from 'react'
import { Package, ArrowUpRight, Download, Filter, Search, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface StockItem {
  productId: string
  name: string
  code: string
  available: number
  reserved: number
  inTransit: number
  unit: string
}

export default function MyStockPage() {
  const [stock, setStock] = useState<StockItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchStock() {
      try {
        const res = await fetch('/api/portal/stock')
        const data = await res.json()
        setStock(data.items || [])
      } catch (error) {
        console.error('Fetch stock error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStock()
  }, [])

  const filteredStock = stock.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Stock Inventory</h1>
            <p className="text-gray-600">Real-time view of your current fertilizer stock levels.</p>
          </div>
          <Link href="/portal/requests/new" className="btn-primary flex items-center justify-center py-3 px-6 font-bold">
            <PlusCircle className="h-5 w-5 mr-2" />
            Raise Stock Request
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product or code..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4 mr-2" /> Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Available Stock</th>
                  <th className="px-6 py-4">Reserved</th>
                  <th className="px-6 py-4">In Transit</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStock.length > 0 ? (
                  filteredStock.map((item) => (
                    <tr key={item.productId} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-3">
                            <Package className="h-5 w-5" />
                          </div>
                          <span className="font-bold text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">{item.code}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">{item.available}</span>
                          <span className="text-xs text-gray-500">{item.unit}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.reserved} {item.unit}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.inTransit} {item.unit}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          item.available > 100 ? 'bg-green-100 text-green-800' :
                          item.available > 20 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.available > 100 ? 'Sufficient' : item.available > 20 ? 'Low' : 'Critical'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-gray-500">
                      No stock data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// Adding missing PlusCircle import
import { PlusCircle } from 'lucide-react'
