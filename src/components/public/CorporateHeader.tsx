'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, User, LogOut } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'HR', href: '/hr' },
  { name: 'Vigilance', href: '/vigilance' },
  { name: 'Tender', href: '/tenders' },
  { name: 'Investor Relation', href: '/investors' },
  { name: 'CSR', href: '/csr' },
  { name: 'Kisan Manch', href: '/kisan-manch' },
  { name: 'Portals', href: '/portals' },
  { name: 'Contact', href: '/contact' },
]

export default function CorporateHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [citizenUser, setCitizenUser] = useState<any>(null)

  useEffect(() => {
    fetch('/api/citizen/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setCitizenUser(data.user)
      })
  }, [])

  const handleLogout = async () => {
    await fetch('/api/citizen/auth/session', { method: 'POST' })
    setCitizenUser(null)
    window.location.href = '/'
  }

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="saffron-stripe" />
      <div className="govt-header-bar" style={{ background: 'var(--rcf-green-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-6">
              <span className="text-xs font-medium tracking-wide">Government of India</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-xs text-gray-200">Theme:</span>
                <button className="text-xs font-medium hover:text-white">Green</button>
                <button className="text-xs font-medium hover:text-white">Blue</button>
                <button className="text-xs font-medium hover:text-white">Orange</button>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-xs text-gray-200">Language:</span>
                <button className="text-xs font-medium hover:text-white">English</button>
                <button className="text-xs font-medium hover:text-white">Hindi</button>
              </div>
              {citizenUser ? (
                <div className="hidden md:flex items-center space-x-3">
                  <Link href="/portal" className="flex items-center text-xs font-medium hover:text-white">
                    <User className="h-3 w-3 mr-1" />
                    Portal
                  </Link>
                  <button onClick={handleLogout} className="flex items-center text-xs font-medium hover:text-white">
                    <LogOut className="h-3 w-3 mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/portal/login" className="hidden md:inline-flex items-center text-xs font-medium hover:text-white">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white border border-gray-300 flex items-center justify-center">
                <span className="text-sm font-bold" style={{ color: 'var(--rcf-navy)' }}>RCF</span>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900 leading-tight">Rashtriya Chemicals and Fertilizers Limited</div>
                <div className="text-xs text-gray-500">A Government of India Enterprise</div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-xs font-medium text-gray-700 hover:text-white hover:bg-rcf-green-dark transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button className="lg:hidden p-2 border border-gray-300" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 bg-white">
            <nav className="flex flex-col px-4 pt-3 pb-2 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
