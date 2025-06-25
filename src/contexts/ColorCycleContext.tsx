"use client"

import { createContext, useContext, useState } from "react"

// Provides the current accent color and a setter to cycle through them.

// Ordered list of accent colors used throughout the site.
export const ACCENT_COLORS = ["#EFF1F3", "#6F799F", "#EA3A35"] as const

interface ColorCycleContextValue {
  colorIndex: number
  setColorIndex: React.Dispatch<React.SetStateAction<number>>
}

const ColorCycleContext = createContext<ColorCycleContextValue | undefined>(undefined)

// Context provider that exposes the accent color index.
export function ColorCycleProvider({ children }: { children: React.ReactNode }) {
  const [colorIndex, setColorIndex] = useState(0)

  return (
    <ColorCycleContext.Provider value={{ colorIndex, setColorIndex }}>
      {children}
    </ColorCycleContext.Provider>
  )
}

// Hook for accessing the color cycle context.
export function useColorCycle() {
  const ctx = useContext(ColorCycleContext)
  if (!ctx) throw new Error("useColorCycle must be used within ColorCycleProvider")
  return ctx
}
