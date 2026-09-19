'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Send, User, ShieldCheck, Clock, AlertCircle, Save, Loader2, MessageSquare } from 'lucide-react'

interface Ticket {
  id: string
  subject: string
  category: string
  priority: string
  status: string
  assignedTo: string | null
  userId: string
  createdAt: string
  user: {
    name: string
    email: string
  }
}

interface Message {
  id: string
  message: string
  createdAt: string
  senderId: string
}

export default function AdminTicketManagement({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [status, setStatus] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadConversation() {
      try {
        const res = await fetch(`/api/admin/tickets/${params.id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to load ticket')
        setTicket(data.ticket)
        setMessages(data.messages)
        setStatus(data.ticket.status)
        setAssignedTo(data.ticket.assignedTo || '')
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadConversation()
  }, [params.id])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    setSending(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/tickets/${params.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send message')

      setMessages([...messages, data.msg])
      setNewMessage('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  const handleUpdateTicket = async () => {
    setUpdating(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/tickets/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, assignedTo }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update ticket')

      setTicket(data.ticket)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-md">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => router.push('/admin/support')}
            className="btn-primary w-full py-3 font-bold"
          >
            Back to Support Hub
          </button>
        </div>
      </div>
    )
  }

  if (!ticket) return null

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{ticket.subject}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-800">
                {ticket.category}
              </span>
              <span className={`text-[10px] font-bold uppercase ${
                ticket.priority === 'URGENT' ? 'text-red-600' : 'text-gray-500'
              }`}>
                Priority: {ticket.priority}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-gray-500">Ticket ID: {ticket.id.slice(0, 12)}...</p>
          <p className="text-xs text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</p>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Conversation */}
        <main className="flex-1 flex flex-col bg-white shadow-sm border-r border-gray-100">
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/50"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 text-xs text-gray-500 shadow-sm">
                <Clock className="h-3 w-3 mr-2" />
                Conversation started on {new Date(ticket.createdAt).toLocaleDateString()}
              </div>
            </div>

            {messages.length === 0 && (
              <div className="text-center py-20">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No messages yet. Start the conversation by sending a reply.</p>
              </div>
            )}

            {messages.map((msg) => {
              // In admin view, we know the user who raised the ticket.
              const isUser = msg.senderId === ticket.userId;
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] flex gap-3 ${isUser ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                      isUser ? 'bg-gray-200 text-gray-600' : 'bg-primary text-white'
                    }`}>
                      {isUser ? <User className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl shadow-sm ${
                      isUser
                      ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                      : 'bg-primary text-white rounded-tr-none'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <p className={`text-[10px] mt-2 ${isUser ? 'text-gray-400' : 'text-primary-foreground/70'} text-right`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <footer className="p-6 border-t border-gray-200 bg-white">
            <form onSubmit={handleSendMessage} className="flex gap-4">
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Reply to user..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !newMessage.trim()}
                className="btn-primary px-6 py-3 font-bold flex items-center disabled:opacity-50"
              >
                {sending ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Send className="h-5 w-5 mr-2" />}
                Reply
              </button>
            </form>
          </footer>
        </main>

        {/* Management Sidebar */}
        <aside className="w-80 bg-gray-50 p-8 border-l border-gray-200 overflow-y-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2 text-primary" /> Ticket Control
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ticket Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none bg-white"
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Assignee</label>
              <input
                type="text"
                value={assignedTo}
                onChange={e => setAssignedTo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none bg-white"
                placeholder="Staff member name..."
              />
            </div>

            <button
              onClick={handleUpdateTicket}
              disabled={updating}
              className="w-full btn-primary py-3 font-bold flex items-center justify-center transition-all shadow-md"
            >
              {updating ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
              Update Ticket
            </button>

            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-4">Customer Info</h4>
              <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{ticket.user.name}</p>
                    <p className="text-xs text-gray-500">{ticket.user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

