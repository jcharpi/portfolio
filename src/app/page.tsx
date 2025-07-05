"use client"

import ColorBackground from "@/components/ColorBackground"
import Cursor from "@/components/Cursor"
import HomePage from "@/pages/home"
import PostHome from "@/pages/posthome"
import BreakIt from "@/pages/breakit"
import MadCourses from "@/pages/madcourses"
import { CursorProvider } from "@/contexts/CursorContext"
import { ColorCycleProvider, useColorCycle } from "@/contexts/ColorCycleContext"
import { useEffect, useState } from "react"

// Top-level page with global providers.
export default function Root() {
  return (
    <ColorCycleProvider>
      <CursorProvider>
        <div className="relative overflow-hidden font-sans">
          <ColorBackground />
          <PageSelector />
          <Cursor />
        </div>
      </CursorProvider>
    </ColorCycleProvider>
  )
}

// Choose which page to show based on the color index.
function PageSelector() {
  const { colorIndex } = useColorCycle()
  const [showHome, setShowHome] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    if (colorIndex !== 0) setShowHome(false)
  }, [colorIndex])

  if (colorIndex === 1) return <BreakIt />
  if (colorIndex === 2) return <MadCourses />
  return showHome ? <HomePage /> : <PostHome />
}
