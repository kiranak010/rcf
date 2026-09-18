import CorporateHeader from '@/components/public/CorporateHeader'
import CorporateFooter from '@/components/public/CorporateFooter'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <CorporateHeader />
      <main className="flex-1" id="main-content">{children}</main>
      <CorporateFooter />
    </div>
  )
}
