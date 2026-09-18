'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Package,
  Briefcase,
  FileSearch,
  Users,
  Settings,
  Shield,
  LogOut,
  ChevronRight,
  FolderOpen,
  Trophy,
  Award,
  Globe,
  MessageSquare,
  BarChart3,
  Database,
  Image,
  Video,
  Calendar,
  ClipboardList,
  TrendingUp,
  Leaf,
} from 'lucide-react'

function Building2({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

function Menu({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

const navigation = [
  {
    title: 'Dashboard',
    items: [
      { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Content Management',
    items: [
      { name: 'Homepage', href: '/admin/homepage', icon: Globe },
      { name: 'Announcements', href: '/admin/announcements', icon: FileText },
      { name: 'News & Media', href: '/admin/news', icon: Newspaper },
      { name: 'Products', href: '/admin/products', icon: Package },
      { name: 'Facilities', href: '/admin/facilities', icon: Building2 },
      { name: 'Leadership', href: '/admin/leadership', icon: Users },
      { name: 'CSR', href: '/admin/csr', icon: Award },
      { name: 'Kisan Manch', href: '/admin/kisan-manch', icon: Leaf },
      { name: 'Pages', href: '/admin/pages', icon: FileText },
    ],
  },
  {
    title: 'Recruitment',
    items: [
      { name: 'Job Vacancies', href: '/admin/recruitment', icon: Briefcase },
      { name: 'Recruitment Notices', href: '/admin/recruitment/notices', icon: ClipboardList },
      { name: 'Selection Results', href: '/admin/recruitment/results', icon: Trophy },
      { name: 'Sports Recruitment', href: '/admin/recruitment/sports', icon: Award },
    ],
  },
  {
    title: 'Tenders',
    items: [
      { name: 'Active Tenders', href: '/admin/tenders', icon: FileSearch },
      { name: 'Closed Tenders', href: '/admin/tenders/closed', icon: FolderOpen },
      { name: 'Upcoming Tenders', href: '/admin/tenders/upcoming', icon: Calendar },
      { name: 'Tender Documents', href: '/admin/tenders/documents', icon: Database },
    ],
  },
  {
    title: 'Investors',
    items: [
      { name: 'Financial Results', href: '/admin/investors/results', icon: TrendingUp },
      { name: 'Annual Reports', href: '/admin/investors/reports', icon: FileText },
      { name: 'Disclosures', href: '/admin/investors/disclosures', icon: FileSearch },
      { name: 'Investor Documents', href: '/admin/investors/documents', icon: Database },
    ],
  },
  {
    title: 'Documents',
    items: [
      { name: 'Document Library', href: '/admin/documents', icon: FolderOpen },
      { name: 'Categories', href: '/admin/documents/categories', icon: FolderOpen },
      { name: 'Upload Documents', href: '/admin/documents/upload', icon: Database },
    ],
  },
  {
    title: 'Portals',
    items: [
      { name: 'Manage Portals', href: '/admin/portals', icon: Globe },
    ],
  },
  {
    title: 'Contact',
    items: [
      { name: 'Enquiries', href: '/admin/contact', icon: MessageSquare },
      { name: 'Departments', href: '/admin/contact/departments', icon: Users },
      { name: 'Contact Information', href: '/admin/contact/info', icon: MessageSquare },
    ],
  },
  {
    title: 'Website Settings',
    items: [
      { name: 'General Settings', href: '/admin/settings', icon: Settings },
      { name: 'Logo & Branding', href: '/admin/settings/branding', icon: Image },
      { name: 'Navigation', href: '/admin/settings/navigation', icon: Menu },
      { name: 'Footer', href: '/admin/settings/footer', icon: FileText },
      { name: 'Social Links', href: '/admin/settings/social', icon: Globe },
      { name: 'SEO Settings', href: '/admin/settings/seo', icon: TrendingUp },
      { name: 'Language Settings', href: '/admin/settings/language', icon: Globe },
    ],
  },
  {
    title: 'Administration',
    items: [
      { name: 'Users', href: '/admin/users', icon: Users },
      { name: 'Roles & Permissions', href: '/admin/roles', icon: Shield },
      { name: 'Activity Logs', href: '/admin/activity', icon: BarChart3 },
      { name: 'Security', href: '/admin/security', icon: Shield },
      { name: 'Backup', href: '/admin/backup', icon: Database },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-900 text-white">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-800">
          <Link href="/admin/dashboard" className="flex items-center">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">RCF</span>
            </div>
            <span className="font-semibold text-lg">Admin Panel</span>
          </Link>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto py-4">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((group) => (
              <div key={group.title} className="space-y-1">
                <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {group.title}
                </h3>
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                        isActive
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'mr-3 flex-shrink-0 h-5 w-5',
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                        )}
                      />
                      {item.name}
                      {isActive && <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />}
                    </Link>
                  )
                })}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex bg-gray-800 p-4">
          <Link
            href="/api/auth/session"
            className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign out
          </Link>
        </div>
      </div>
    </div>
  )
}
