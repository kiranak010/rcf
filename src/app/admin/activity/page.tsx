'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function ActivityPage() {
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    setLogs([
      { id: '1', user: 'Admin', action: 'Published', module: 'Announcements', timestamp: '2024-01-15 10:30' },
      { id: '2', user: 'Content Manager', action: 'Updated', module: 'Tenders', timestamp: '2024-01-15 09:15' },
      { id: '3', user: 'HR Admin', action: 'Created', module: 'Recruitment', timestamp: '2024-01-14 16:45' },
    ])
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-600 mt-2">Track administrative actions and changes.</p>
      </div>

      <div className="card-base overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Module</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.user}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.action}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.module}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
