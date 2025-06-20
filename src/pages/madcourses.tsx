"use client"

import Typewriter from "@/components/Typewriter"
import { useCursorContext } from "@/contexts/CursorContext"
import { useEffect } from "react"

export default function MadCourses() {
  const { setTargets } = useCursorContext()

  useEffect(() => {
    setTargets([])
    return () => setTargets([])
  }, [setTargets])

  return (
    <main className="flex flex-col h-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg font-light text-white">
      <span className="md:mt-16 sm:mt-8 mt-6 md:ml-8">
        <Typewriter lines={["MadCourses"]} speed={35} bold={["MadCourses"]}/>
      </span>
    </main>
  )
}
