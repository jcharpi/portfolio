"use client"

import { createContext, useContext, useEffect, useState } from "react"

export const ACCENT_COLORS = ["#EFF1F3", "#586183", "#EA3A35"] as const

interface ColorCycleContextValue {
  colorIndex: number
}

const ColorCycleContext = createContext<ColorCycleContextValue | undefined>(undefined)

export function ColorCycleProvider({ children }: { children: React.ReactNode }) {
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0) return
      setColorIndex((prev) => (prev + 1) % ACCENT_COLORS.length)
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <ColorCycleContext.Provider value={{ colorIndex }}>
      {children}
    </ColorCycleContext.Provider>
  )
}

export function useColorCycle() {
  const ctx = useContext(ColorCycleContext)
  if (!ctx) throw new Error("useColorCycle must be used within ColorCycleProvider")
  return ctx
}
