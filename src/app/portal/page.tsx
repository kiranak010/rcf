'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LogOut, User, FileText, Briefcase, Package,
  Newspaper, Bell, TrendingUp, Clock,
  Truck, AlertCircle, PlusCircle, ArrowUpRight
} from 'lucide-react'

interface User {
  id: string
  email: string
  name?: string
  role: string
  partnerId?: string
}

interface Profile {
  onboardingStep: number
  status: string
}

export default function EnterprisePortal() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        const sessionRes = await fetch('/api/auth/session')
        const sessionData = await sessionRes.json()

        if (!sessionData.user) {
          router.push('/portal/login')
          return
        }
        setUser(sessionData.user)

        const profileRes = await fetch('/api/portal/profile')
        const profileData = await profileRes.json()
        setProfile(profileData.profile)
      } catch (error) {
        console.error('Data load error:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth/session', { method: 'POST' })
    router.push('/portal/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  // Redirect to onboarding if not completed
  if (profile && profile.onboardingStep < 7) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-lg">
          <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Complete Your Profile</h1>
          <p className="text-gray-600 mb-8">
            Welcome to the RCF Enterprise Portal. To access your business tools, please complete your onboarding process.
          </p>
          <Link href="/portal/onboarding" className="btn-primary w-full flex items-center justify-center py-4 text-lg font-bold">
            Complete Onboarding <ArrowUpRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 text-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">RCF</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Enterprise</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Main</div>
          <Link href="/portal" className="flex items-center px-3 py-2 bg-primary text-white rounded-lg transition-colors">
            <TrendingUp className="h-5 w-5 mr-3" /> Dashboard
          </Link>

          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2 px-3">Operations</div>
          <Link href="/portal/stock" className="flex items-center px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <Package className="h-5 w-5 mr-3" /> My Stock
          </Link>
          <Link href="/portal/requests" className="flex items-center px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <PlusCircle className="h-5 w-5 mr-3" /> Stock Requests
          </Link>
          <Link href="/portal/orders" className="flex items-center px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <Briefcase className="h-5 w-5 mr-3" /> My Orders
          </Link>
          <Link href="/portal/shipments" className="flex items-center px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <Truck className="h-5 w-5 mr-3" /> Freight Tracker
          </Link>

          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2 px-3">Finance</div>
          <Link href="/portal/finance" className="flex items-center px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <FileText className="h-5 w-5 mr-3" /> Invoices & Payments
          </Link>
          <Link href="/portal/bank" className="flex items-center px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <User className="h-5 w-5 mr-3" /> Bank Details
          </Link>

          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2 px-3">Resources</div>
          <Link href="/farmer-support" className="flex items-center px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <FileText className="h-5 w-5 mr-3" /> Farmer Support
          </Link>
          <Link href="/portal/support" className="flex items-center px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <AlertCircle className="h-5 w-5 mr-3" /> Help Center
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-gray-400 hover:text-white hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">Partner Dashboard</h2>
            <div className="px-2 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full uppercase">
              Verified Partner
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                3
              </span>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{user.name || 'Enterprise Partner'}</p>
                <p className="text-xs text-gray-500">{user.partnerId || 'Loading ID...'}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                {user.name?.[0] || 'P'}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name || 'Partner'}!</h1>
            <p className="text-gray-600">Here is what is happening with your business today.</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Package className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
              </div>
              <p className="text-sm font-medium text-gray-500">Available Stock</p>
              <h3 className="text-2xl font-bold text-gray-900">125 MT</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Pending</span>
              </div>
              <p className="text-sm font-medium text-gray-500">Pending Requests</p>
              <h3 className="text-2xl font-bold text-gray-900">3 Requests</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Truck className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">In Transit</span>
              </div>
              <p className="text-sm font-medium text-gray-500">Shipments</p>
              <h3 className="text-2xl font-bold text-gray-900">2 Active</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Urgent</span>
              </div>
              <p className="text-sm font-medium text-gray-500">Outstanding Amount</p>
              <h3 className="text-2xl font-bold text-gray-900">₹ 4,52,000</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Recent Stock Requests</h3>
                <Link href="/portal/requests" className="text-sm text-primary font-semibold hover:underline">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="px-6 py-3">Request ID</th>
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Qty</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { id: 'SR-2026-00123', product: 'Urea', qty: '50 MT', status: 'Approved', date: '2026-09-15' },
                      { id: 'SR-2026-00118', product: 'NPK', qty: '30 MT', status: 'In Review', date: '2026-09-12' },
                      { id: 'SR-2026-00105', product: 'DAP', qty: '100 MT', status: 'Dispatched', date: '2026-09-05' },
                    ].map((req, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{req.id}</td>
                        <td className="px-6 py-4 text-gray-600">{req.product}</td>
                        <td className="px-6 py-4 text-gray-600">{req.qty}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                            req.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            req.status === 'In Review' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{req.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Link href="/portal/requests/new" className="flex items-center p-3 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all group">
                    <PlusCircle className="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform" />
                    <span className="font-semibold text-sm">Raise Stock Request</span>
                  </Link>
                  <Link href="/portal/shipments" className="flex items-center p-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-all">
                    <Truck className="h-5 w-5 mr-3" />
                    <span className="font-semibold text-sm">Track Shipment</span>
                  </Link>
                  <Link href="/portal/finance" className="flex items-center p-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-all">
                    <FileText className="h-5 w-5 mr-3" />
                    <span className="font-semibold text-sm">View Invoices</span>
                  </Link>
                  <Link href="/portal/support" className="flex items-center p-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-all">
                    <AlertCircle className="h-5 w-5 mr-3" />
                    <span className="font-semibold text-sm">Raise Support Ticket</span>
                  </Link>
                </div>
              </div>

              <div className="bg-primary p-6 rounded-2xl shadow-lg text-white">
                <h3 className="font-bold mb-2">Important Notice</h3>
                <p className="text-sm text-primary-foreground/80 mb-4 leading-relaxed">
                  Annual subsidy guidelines for 2026-27 have been released. Please review the updated documents.
                </p>
                <Link href="/portal/resources" className="text-xs font-bold underline hover:text-white/80">
                  Read Guidelines →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
