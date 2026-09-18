export interface User {
  id: string
  email: string
  username?: string
  name?: string
  role: string
  twoFactorEnabled: boolean
  avatar?: string
  isActive: boolean
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
}

export interface ActivityLog {
  id: string
  userId: string
  action: string
  module: string
  ipAddress?: string
  userAgent?: string
  previousValue?: string
  newValue?: string
  createdAt: string
}

export interface Announcement {
  id: string
  title: string
  description?: string
  category?: string
  publishDate?: string
  expiryDate?: string
  isNew: boolean
  externalUrl?: string
  pdfFile?: string
  status: string
  isFeatured: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface Tender {
  id: string
  title: string
  tenderNumber: string
  department?: string
  description?: string
  publishDate?: string
  closingDate?: string
  status: string
  tenderValue?: string
  contactDetails?: string
  documents?: string
  externalUrl?: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface Recruitment {
  id: string
  jobTitle: string
  advertisementNo?: string
  department?: string
  location?: string
  grade?: string
  qualification?: string
  experience?: string
  openingDate?: string
  closingDate?: string
  jobDescription?: string
  notificationPdf?: string
  applyUrl?: string
  status: string
  type: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  category?: string
  specifications?: string
  applications?: string
  packaging?: string
  brochure?: string
  documents?: string
  images?: string
  isFeatured: boolean
  status: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface News {
  id: string
  title: string
  slug: string
  description?: string
  content?: string
  image?: string
  date?: string
  category?: string
  documents?: string
  externalLinks?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  status: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface Document {
  id: string
  title: string
  description?: string
  category?: string
  filePath: string
  fileType?: string
  fileSize?: number
  publishDate?: string
  isPublic: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface ContactEnquiry {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  department?: string
  status: string
  isRead: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface DashboardStats {
  totalAnnouncements: number
  activeTenders: number
  openRecruitment: number
  totalProducts: number
  publishedNews: number
  documents: number
  contactEnquiries: number
  websiteVisitors: number
}
