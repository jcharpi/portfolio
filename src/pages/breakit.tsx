"use client"

import Typewriter from "@/components/Typewriter"
import { useCursorContext } from "@/context/CursorContext"
import { useEffect } from "react"

export default function BreakIt() {
  const { setTargets } = useCursorContext()

  useEffect(() => {
    setTargets([])
    return () => setTargets([])
  }, [setTargets])

  return (
    <>
      <main className="flex flex-col h-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg font-light text-black">
        <span className="md:mt-16 sm:mt-8 mt-6 md:ml-8">
          <Typewriter lines={["BreakIt"]} speed={35} />
        </span>
      </main>

      <section className="px-6 mt-8 text-black">
        <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
        <p className="max-w-xl">This section will describe the BreakIt mobile application.</p>
      </section>

      <section className="px-6 mt-8">
        <div className="flex space-x-4 overflow-x-auto py-2">
          <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded-md shrink-0">React</div>
          <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded-md shrink-0">Redux</div>
          <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded-md shrink-0">TS</div>
        </div>
      </section>

      <section className="px-6 mt-8 flex flex-col items-center space-y-4">
        <div className="w-64 h-96 bg-gray-300 flex items-center justify-center">
          Phone screenshot
        </div>
      </section>
    </>
  )
}
