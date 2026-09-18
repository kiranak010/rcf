'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, User, LogOut, Globe, Phone, Mail, MapPin } from 'lucide-react'

export default function PublicNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [citizenUser, setCitizenUser] = useState<any>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    fetch('/api/citizen/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCitizenUser(data.user)
        }
      })

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/citizen/auth/session', { method: 'POST' })
    setCitizenUser(null)
    window.location.href = '/'
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Announcements', href: '/announcements' },
    { name: 'Tenders', href: '/tenders' },
    { name: 'Recruitment', href: '/recruitment' },
    { name: 'Products', href: '/products' },
    { name: 'News', href: '/news' },
    { name: 'Documents', href: '/documents' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                Government of India
              </span>
              <span className="hidden md:flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                +91-11-12345678
              </span>
              <span className="hidden md:flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                info@example.com
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {citizenUser ? (
                <div className="flex items-center space-x-3">
                  <Link href="/portal" className="flex items-center hover:text-gray-200">
                    <User className="h-4 w-4 mr-1" />
                    Portal
                  </Link>
                  <button onClick={handleLogout} className="flex items-center hover:text-gray-200">
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/portal/login" className="flex items-center hover:text-gray-200">
                  <User className="h-4 w-4 mr-1" />
                  Citizen Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`bg-white shadow-lg transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="h-14 w-14 bg-primary rounded-lg flex items-center justify-center mr-4 border-2 border-primary/20">
                  <span className="text-white text-xl font-bold">RCF</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">RCF</h1>
                  <p className="text-xs text-gray-500">Government Portal</p>
                </div>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
