"use client"

import ColorBackground from "@/components/ColorBackground"
import Cursor from "@/components/Cursor"
import Intro from "@/pages/intro"
import { CursorProvider } from "@/context/CursorContext"

export default function Home() {
  return (
    <CursorProvider>
      <div className="relative h-screen overflow-hidden font-sans">
        <ColorBackground />
        <Intro />
        <Cursor />
      </div>
    </CursorProvider>
  )
}
