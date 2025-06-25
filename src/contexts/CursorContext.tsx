"use client"

import { createContext, useContext, useState } from "react"

// Keeps track of DOM elements the custom cursor can snap to.

export type TargetRef = React.RefObject<HTMLElement | null>

interface CursorContextValue {
  targets: TargetRef[]
  setTargets: (targets: TargetRef[]) => void
}

const CursorContext = createContext<CursorContextValue | undefined>(undefined)

// Provides the cursor target list to child components.
export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [targets, setTargets] = useState<TargetRef[]>([])
  return (
    <CursorContext.Provider value={{ targets, setTargets }}>
      {children}
    </CursorContext.Provider>
  )
}

// Hook for accessing the cursor context.
export function useCursorContext() {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error("useCursorContext must be used within CursorProvider")
  return ctx
}

