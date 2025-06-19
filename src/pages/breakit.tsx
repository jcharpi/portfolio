"use client"

import Typewriter from "@/components/Typewriter"
import { useCursorContext } from "@/contexts/CursorContext"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react"
import { useEffect, useRef, useState } from "react"

const IMAGES = Array.from({ length: 9 }, (_, i) => `/breakit/breakit_${i}.png`)

const LINES = [
  "BreakIt helps you quit bad habits.",
  "Track your progress each day.",
  "Set personalized goals.",
  "Connect with friends for support.",
  "Share achievements and milestones.",
  "Earn rewards for consistency.",
  "View detailed statistics.",
  "Get reminders and tips.",
  "Start breaking habits today.",
]

export default function BreakIt() {
  const { setTargets } = useCursorContext()

  useEffect(() => {
    setTargets([])
    return () => setTargets([])
  }, [setTargets])

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const step = useTransform(scrollYProgress, [0, 1], [0, IMAGES.length - 1])
  const [index, setIndex] = useState(0)
  useMotionValueEvent(step, "change", (v) => {
    const next = Math.min(IMAGES.length - 1, Math.max(0, Math.floor(v)))
    setIndex(next)
  })

  return (
    <div
      ref={containerRef}
      style={{ height: `${IMAGES.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center p-6">
        <div className="w-1/2 flex justify-center">
          <motion.img
            key={index}
            src={IMAGES[index]}
            alt={`BreakIt screenshot ${index}`}
            className="max-h-full w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="w-1/2 pl-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg font-light text-white">
          <Typewriter key={index} lines={[LINES[index]]} speed={35} bold={["BreakIt"]} />
        </div>
      </div>
    </div>
  )
}
