"use client"

import { createContext, useContext, useState } from "react"

export const ACCENT_COLORS = ["#EFF1F3", "#586183", "#EA3A35"] as const

interface ColorCycleContextValue {
  colorIndex: number
  setColorIndex: React.Dispatch<React.SetStateAction<number>>
}

const ColorCycleContext = createContext<ColorCycleContextValue | undefined>(undefined)

export function ColorCycleProvider({ children }: { children: React.ReactNode }) {
  const [colorIndex, setColorIndex] = useState(0)

  return (
    <ColorCycleContext.Provider value={{ colorIndex, setColorIndex }}>
      {children}
    </ColorCycleContext.Provider>
  )
}

export function useColorCycle() {
  const ctx = useContext(ColorCycleContext)
  if (!ctx) throw new Error("useColorCycle must be used within ColorCycleProvider")
  return ctx
}
