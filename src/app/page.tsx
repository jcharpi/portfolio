"use client"

import ColorBackground from "@/components/ColorBackground"
import Cursor from "@/components/Cursor"
import Intro from "@/pages/intro"
import BreakIt from "@/pages/breakit"
import MadCourses from "@/pages/madcourses"
import { CursorProvider } from "@/contexts/CursorContext"
import { ColorCycleProvider, useColorCycle } from "@/contexts/ColorCycleContext"

export default function Home() {
  return (
    <ColorCycleProvider>
      <CursorProvider>
        <div className="relative h-screen overflow-hidden font-sans">
          <ColorBackground />
          <PageSelector />
          <Cursor />
        </div>
      </CursorProvider>
    </ColorCycleProvider>
  )
}

function PageSelector() {
  const { colorIndex } = useColorCycle()
  if (colorIndex === 1) return <BreakIt />
  if (colorIndex === 2) return <MadCourses />
  return <Intro />
}
