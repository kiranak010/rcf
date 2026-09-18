'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface SettingsContextValue {
  settings: Record<string, string>
}

const SettingsContext = createContext<SettingsContextValue>({ settings: {} })

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => setSettings(data.settings || {}))
      .catch(() => setSettings({}))
  }, [])

  return <SettingsContext.Provider value={{ settings }}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  return useContext(SettingsContext)
}
