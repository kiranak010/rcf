'use client'

import { useEffect, useState } from 'react'
import { FileText, Download, TrendingUp, ShieldCheck, Globe, ArrowUpRight, Loader2 } from 'lucide-react'

interface InvestorData {
  financials: { year: string; report: string; url: string; size: string }[]
  governance: { title: string; url: string }[]
  stockInfo: { ticker: string; exchange: string; lastPrice: string; change: string; dividendYield: string }
}

export default function InvestorPortal() {
  const [data, setData] = useState<InvestorData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInvestorData() {
      try {
        const res = await fetch('/api/portal/investors')
        const json = await res.json()
        setData(json.data)
      } catch (error) {
        console.error('Fetch investor data error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchInvestorData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (!data) return <div className="p-8 text-center">Failed to load investor data.</div>

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Investor Relations</h1>
            <p className="text-gray-600">Transparent corporate governance and financial performance of RCF.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Market Price ({data.stockInfo.exchange})</p>
              <p className="text-xl font-bold text-gray-900">{data.stockInfo.lastPrice}</p>
            </div>
            <div className={`px-2 py-1 rounded-lg text-xs font-bold ${data.stockInfo.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {data.stockInfo.change}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Financial Reports */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-gray-900">Financial Reports</h3>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {data.financials.map((item, idx) => (
                  <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{item.report} {item.year}</p>
                        <p className="text-xs text-gray-500">{item.size} • PDF Document</p>
                      </div>
                    </div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-secondary px-4 py-2 text-sm font-bold flex items-center">
                      <Download className="h-4 w-4 mr-2" /> Download
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-gray-900">Corporate Governance</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.governance.map((item, idx) => (
                  <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="p-4 border border-gray-100 rounded-xl hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-between group">
                    <span className="font-medium text-gray-700 group-hover:text-primary">{item.title}</span>
                    <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-primary p-8 rounded-3xl shadow-lg text-white">
              <ShieldCheck className="h-10 w-10 mb-6 opacity-80" />
              <h3 className="text-2xl font-bold mb-4">Investor Trust</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                RCF is committed to the highest standards of transparency and accountability in all its financial dealings.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                  <span className="text-xs font-medium">Div. Yield</span>
                  <span className="text-sm font-bold">{data.stockInfo.dividendYield}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                  <span className="text-xs font-medium">Ticker</span>
                  <span className="text-sm font-bold">{data.stockInfo.ticker}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4">Quick Support</h4>
              <div className="space-y-3">
                <button className="w-full text-left p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                  Shareholder Helpdesk
                </button>
                <button className="w-full text-left p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                  Dividend Query
                </button>
                <button className="w-full text-left p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                  Annual Meeting (AGM)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
