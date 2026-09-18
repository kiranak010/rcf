'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface AccessibilityContextValue {
  fontSize: 'normal' | 'large' | 'larger'
  contrast: 'normal' | 'high'
  increaseFont: () => void
  decreaseFont: () => void
  resetAccessibility: () => void
  toggleContrast: () => void
}

const AccessibilityContext = createContext<AccessibilityContextValue>({
  fontSize: 'normal',
  contrast: 'normal',
  increaseFont: () => {},
  decreaseFont: () => {},
  resetAccessibility: () => {},
  toggleContrast: () => {},
})

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('rcf-font-size') as 'normal' | 'large' | 'larger') || 'normal'
    }
    return 'normal'
  })
  const [contrast, setContrast] = useState<'normal' | 'high'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('rcf-contrast') as 'normal' | 'high') || 'normal'
    }
    return 'normal'
  })

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-font-size', fontSize)
    localStorage.setItem('rcf-font-size', fontSize)
  }, [fontSize])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-contrast', contrast)
    localStorage.setItem('rcf-contrast', contrast)
  }, [contrast])

  const increaseFont = () => {
    setFontSize((prev) => (prev === 'normal' ? 'large' : prev === 'large' ? 'larger' : 'larger'))
  }

  const decreaseFont = () => {
    setFontSize((prev) => (prev === 'larger' ? 'large' : prev === 'large' ? 'normal' : 'normal'))
  }

  const resetAccessibility = () => {
    setFontSize('normal')
    setContrast('normal')
  }

  const toggleContrast = () => {
    setContrast((prev) => (prev === 'normal' ? 'high' : 'normal'))
  }

  return (
    <AccessibilityContext.Provider value={{ fontSize, contrast, increaseFont, decreaseFont, resetAccessibility, toggleContrast }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  return useContext(AccessibilityContext)
}
