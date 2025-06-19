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
        <MainContainer />
      </CursorProvider>
    </ColorCycleProvider>
  )
}

function MainContainer() {
  const { colorIndex } = useColorCycle()
  const scrollable = colorIndex === 1

  return (
    <div
      className={`relative h-screen font-sans ${
        scrollable ? "overflow-y-auto" : "overflow-hidden"
      }`}
    >
      <ColorBackground />
      <PageSelector />
      <Cursor />
    </div>
  )
}

function PageSelector() {
  const { colorIndex } = useColorCycle()
  if (colorIndex === 1) return <BreakIt />
  if (colorIndex === 2) return <MadCourses />
  return <Intro />
}
