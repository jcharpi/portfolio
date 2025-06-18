"use client"

import Typewriter from "@/components/Typewriter"
import { useCursorContext } from "@/context/CursorContext"
import { useEffect } from "react"

export default function MadCourses() {
  const { setTargets } = useCursorContext()

  useEffect(() => {
    setTargets([])
    return () => setTargets([])
  }, [setTargets])

  return (
    <>
      <main className="flex flex-col h-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg font-light text-gray-800">
        <span className="md:mt-16 sm:mt-8 mt-6 md:ml-8">
          <Typewriter lines={["MadCourses"]} speed={35} />
        </span>
      </main>

      <section className="px-6 mt-8 text-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
        <p className="max-w-xl">This section will describe the MadCourses desktop application.</p>
      </section>

      <section className="px-6 mt-8">
        <div className="flex space-x-4 overflow-x-auto py-2">
          <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded-md shrink-0">PostgreSQL</div>
          <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded-md shrink-0">Python</div>
          <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded-md shrink-0">Svelte</div>
        </div>
      </section>

      <section className="px-6 mt-8 flex flex-col items-center space-y-4">
        <div className="w-96 h-64 bg-gray-300 flex items-center justify-center">
          Desktop screenshot
        </div>
      </section>
    </>
  )
}
