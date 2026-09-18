'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, FileText, Users, Package, Newspaper, FolderOpen, Settings, LogOut, Home, Info, Factory, Users2, Briefcase, Shield, Hammer, TrendingUp, HeartHandshake, Leaf, Image, FileCheck, Globe2, MessageSquare, UserCog, ShieldCheck, Navigation2, Search, Cog, ClipboardList } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Homepage', href: '/admin/homepage', icon: Home },
  { name: 'About', href: '/admin/about', icon: Info },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Facilities', href: '/admin/facilities', icon: Factory },
  { name: 'Kisan Manch', href: '/admin/kisan-manch', icon: Users2 },
  { name: 'HR', href: '/admin/hr', icon: Briefcase },
  { name: 'Recruitment', href: '/admin/recruitment', icon: Users },
  { name: 'Vigilance', href: '/admin/vigilance', icon: Shield },
  { name: 'Tenders', href: '/admin/tenders', icon: Hammer },
  { name: 'Support Tickets', href: '/admin/support', icon: MessageSquare },
  { name: 'Farmer Support', href: '/admin/farmer-support', icon: Leaf },
  { name: 'Investor Relations', href: '/admin/investor-relations', icon: TrendingUp },
  { name: 'CSR', href: '/admin/csr', icon: HeartHandshake },
  { name: 'Sustainability', href: '/admin/sustainability', icon: Leaf },
  { name: 'Media', href: '/admin/media', icon: Image },
  { name: 'Documents', href: '/admin/documents', icon: FileCheck },
  { name: 'Portals', href: '/admin/portals', icon: Globe2 },
  { name: 'Contact', href: '/admin/contact', icon: MessageSquare },
  { name: 'Users', href: '/admin/users', icon: UserCog },
  { name: 'Roles', href: '/admin/roles', icon: ShieldCheck },
  { name: 'Navigation', href: '/admin/navigation', icon: Navigation2 },
  { name: 'SEO', href: '/admin/seo', icon: Search },
  { name: 'Settings', href: '/admin/settings', icon: Cog },
  { name: 'Audit Logs', href: '/admin/audit-logs', icon: ClipboardList },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-gray-900 min-h-screen fixed">
          <div className="p-6">
            <Link href="/admin" className="text-white font-bold text-lg block mb-8">
              RCF Admin
            </Link>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="absolute bottom-0 w-full p-6">
            <Link href="/" className="flex items-center text-sm text-gray-400 hover:text-white">
              <LogOut className="h-4 w-4 mr-2" />
              Back to Site
            </Link>
          </div>
        </aside>
        <div className="ml-64 flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
