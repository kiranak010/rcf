'use client'

import { useEffect, useState } from 'react'
import { ShieldAlert, Filter, Clock, User, Activity } from 'lucide-react'

interface AuditLog {
  id: string
  action: string
  entity: string | null
  entityId: string | null
  prevValue: string | null
  newValue: string | null
  ipAddress: string | null
  createdAt: string
  user: {
    name: string
    email: string
  } | null
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [filterAction, setFilterAction] = useState('')

  useEffect(() => {
    async function fetchLogs() {
      try {
        const params = new URLSearchParams()
        if (filterAction) params.append('action', filterAction)

        const res = await fetch(`/api/admin/audit-logs?${params.toString()}`)
        const data = await res.json()
        if (data.items) setLogs(data.items)
      } catch (error) {
        console.error('Error fetching logs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLogs()
  }, [filterAction])

  const getActionColor = (action: string) => {
    if (action.includes('CREATE')) return 'text-green-600 bg-green-50'
    if (action.includes('DELETE')) return 'text-red-600 bg-red-50'
    if (action.includes('UPDATE') || action.includes('CHANGE')) return 'text-blue-600 bg-blue-50'
    return 'text-gray-600 bg-gray-50'
  }

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
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Audit Logs</h1>
              <p className="text-gray-600">Full traceability of administrative actions and security events.</p>
            </div>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterAction}
              onChange={e => setFilterAction(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none appearance-none bg-white"
            >
              <option value="">All Actions</option>
              <option value="TICKET_STATUS_CHANGE">Ticket Status Change</option>
              <option value="BANK_DETAIL_SUBMITTED">Bank Details Submitted</option>
              <option value="STOCK_REQ_APPROVED">Stock Request Approved</option>
              <option value="KYC_VERIFIED">KYC Verified</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Admin</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Entity</th>
                  <th className="px-6 py-4">Changes</th>
                  <th className="px-6 py-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-gray-500">
                      No audit logs found.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {new Date(log.createdAt).toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-gray-400" />
                          <span className="font-medium text-gray-900">{log.user?.name || 'System'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${getActionColor(log.action)}`}>
                          {log.action.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Activity className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600">{log.entity || 'Global'}</span>
                          <span className="text-gray-400 text-[10px]">({log.entityId?.slice(0, 8)}...)</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {log.prevValue && log.newValue ? (
                          <div className="text-xs">
                            <span className="text-red-500 line-through">{log.prevValue}</span>
                            <span className="mx-1">→</span>
                            <span className="text-green-600 font-bold">{log.newValue}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">{log.newValue || 'No value change'}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                        {log.ipAddress || 'Internal'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
