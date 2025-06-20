"use client"

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { useRef } from "react"
import Typewriter from "@/components/Typewriter"
import Image from "next/image"

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

function ImageCard({ id }: { id: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)

  return (
    <section className="h-screen snap-start flex items-center justify-center relative">
      <div ref={ref} className="relative w-82 h-[700px]">
        <div className="relative w-full h-full rounded-[2.5rem] bg-black shadow-2xl">
          <Image
            src={`/breakit/breakit_${id}.png`}
            alt={`BreakIt ${id}`}
            fill
            className="p-2 rounded-[2.5rem]"
            priority={id === 0}
          />
        </div>
      </div>

      <motion.h2
        style={{ y }}
        className="absolute left-[calc(50%+300px)] top-1/2 -translate-y-1/2
                   text-5xl font-bold tracking-tight text-white
                   pointer-events-none select-none"
      >
        {`#00${id}`}
      </motion.h2>
    </section>
  )
}

export default function Parallax() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.1,
  })

  return (
    <main className="flex flex-col h-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg text-white">
      <span className="md:mt-16 sm:mt-8 mt-6 md:ml-8">
        <Typewriter lines={["BreakIt"]} speed={35} bold={["BreakIt"]} />
      </span>

      <div className="snap-y snap-mandatory">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((img) => (
          <ImageCard key={img} id={img} />
        ))}
        <motion.div
          className="fixed bottom-12 left-0 right-0 h-1 bg-white origin-left"
          style={{ scaleX }}
        />
      </div>
    </main>
  )
}
