"use client"

import Typewriter from "@/components/Typewriter"
import { useCursorContext } from "@/contexts/CursorContext"
import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"

type SectionData = {
  image: string
  lines: string[]
}

const SECTIONS: SectionData[] = Array.from({ length: 9 }, (_, i) => ({
  image: `/breakit/breakit_${i}.png`,
  lines: [`BreakIt ${i + 1}`],
}))

function ScrollSection({
  data,
  index,
  setActive,
}: {
  data: SectionData
  index: number
  setActive: (index: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" })

  useEffect(() => {
    if (inView) setActive(index)
  }, [inView, index, setActive])

  return (
    <section ref={ref} className="h-screen flex items-center justify-center p-6">
      {inView && <Typewriter lines={data.lines} speed={35} bold={data.lines} />}
    </section>
  )
}

export default function BreakIt() {
  const { setTargets } = useCursorContext()
  const [active, setActive] = useState(0)

  useEffect(() => {
    setTargets([])
    return () => setTargets([])
  }, [setTargets])

  const current = SECTIONS[active]

  return (
    <>
      {/* Heading overlay */}
      <header className="absolute top-0 left-0 w-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg font-light text-white">
        <span className="md:mt-16 sm:mt-8 mt-6 md:ml-8 block">
          <Typewriter lines={["BreakIt"]} speed={35} bold={["BreakIt"]} />
        </span>
      </header>

      {/* Sticky image with scrollable text */}
      <div className="flex h-full">
        <div className="sticky top-0 flex items-center justify-center w-1/2 h-full">
          <motion.img
            key={current.image}
            src={current.image}
            alt={`BreakIt screen ${active}`}
            className="w-64 h-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="w-1/2 h-full overflow-y-scroll no-scrollbar">
          {SECTIONS.map((section, i) => (
            <ScrollSection key={i} data={section} index={i} setActive={setActive} />
          ))}
        </div>
      </div>
    </>
  )
}
