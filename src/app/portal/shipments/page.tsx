'use client'

import { useEffect, useState } from 'react'
import { Truck, Package, MapPin, Calendar, Search, Filter, ExternalLink, CheckCircle2, Circle } from 'lucide-react'
import Link from 'next/link'

interface ShipmentEvent {
  status: string
  location: string | null
  timestamp: string
}

interface Shipment {
  id: string
  trackingId: string
  currentStatus: string
  origin: string
  destination: string
  dispatchDate: string | null
  expectedDelivery: string | null
  events: ShipmentEvent[]
}

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchShipments() {
      try {
        const res = await fetch('/api/portal/shipments')
        const data = await res.json()
        setShipments(data.items || [])
      } catch (error) {
        console.error('Fetch shipments error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchShipments()
  }, [])

  const filteredShipments = shipments.filter(s =>
    s.trackingId.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-3xl font-bold text-gray-900">Shipment Tracker</h1>
            <p className="text-gray-600">Track your fertilizer consignments in real-time.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredShipments.length > 0 ? (
            filteredShipments.map((shipment) => (
              <div key={shipment.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{shipment.trackingId}</h3>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Tracking ID</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Current Status</p>
                      <span className={`text-sm font-bold ${
                        shipment.currentStatus === 'DELIVERED' ? 'text-green-600' : 'text-primary'
                      }`}>
                        {shipment.currentStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <Link
                      href={`/portal/shipments/${shipment.id}`}
                      className="btn-secondary px-4 py-2 text-sm font-bold flex items-center"
                    >
                      View Full Timeline <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Origin</p>
                      <p className="text-sm font-medium text-gray-700">{shipment.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Destination</p>
                      <p className="text-sm font-medium text-gray-700">{shipment.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Expected Delivery</p>
                      <p className="text-sm font-medium text-gray-700">
                        {shipment.expectedDelivery ? new Date(shipment.expectedDelivery).toLocaleDateString('en-IN') : 'TBD'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mini Timeline */}
                <div className="px-6 pb-6">
                  <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-1000"
                         style={{ width: shipment.currentStatus === 'DELIVERED' ? '100%' : '40%' }}></div>

                    <div className="relative z-10 flex flex-col items-center">
                      <div className="h-4 w-4 bg-primary rounded-full border-2 border-white shadow-sm"></div>
                      <span className="text-[10px] font-bold text-gray-500 mt-1 uppercase">Origin</span>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`h-4 w-4 rounded-full border-2 border-white shadow-sm ${shipment.currentStatus === 'DELIVERED' ? 'bg-primary' : 'bg-gray-300'}`}></div>
                      <span className="text-[10px] font-bold text-gray-500 mt-1 uppercase">Transit</span>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`h-4 w-4 rounded-full border-2 border-white shadow-sm ${shipment.currentStatus === 'DELIVERED' ? 'bg-primary' : 'bg-gray-300'}`}></div>
                      <span className="text-[10px] font-bold text-gray-500 mt-1 uppercase">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-20 text-center border border-gray-100 shadow-sm">
              <Truck className="h-16 w-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Shipments</h3>
              <p className="text-gray-500">Your current consignments will appear here once they are dispatched.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { ArrowRight } from 'lucide-react'
