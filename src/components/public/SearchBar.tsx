'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, X } from 'lucide-react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setSuggestions(data.suggestions || []))
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setOpen(false)
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Search tenders, products, news..."
            className="pl-9 pr-4 py-2 border border-gray-300 text-sm focus:border-primary focus:outline-none w-64"
          />
        </div>
        <button type="submit" className="ml-2 btn-primary">Search</button>
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg mt-1 z-50">
          {suggestions.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              onClick={() => setOpen(false)}
            >
              <div className="font-medium">{item.title}</div>
              <div className="text-xs text-gray-500">{item.type}</div>
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            className="block px-4 py-3 text-sm text-primary hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            View all results for &quot;{query}&quot;
          </Link>
        </div>
      )}
    </div>
  )
}
