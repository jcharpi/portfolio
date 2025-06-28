"use client"

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "motion/react"
import { useRef, useEffect } from "react"
import Image from "next/image"
import Typewriter from "@/components/Typewriter"
import { CARDS, Card } from "@/data/madcoursesCards"
import { useCursorContext } from "@/contexts/CursorContext"

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

function ImageCard({ card }: { card: Card }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)
  const inView = useInView(ref, { margin: "0px 0px -800px 0px" })
  const isFirstImage = card.image === 1

  return (
    <section className="relative h-screen snap-start flex flex-col items-center justify-center">
      {card.icon && (
        <Image
          src={`/icons/${card.icon}`}
          alt=""
          width={512}
          height={512}
          aria-hidden
          className="pointer-events-none absolute left-1/11 -translate-x-1/2 -translate-y-1/3 w-[30vw] h-[30vw] -z-10 opacity-75 invert"
        />
      )}
      <div ref={ref} className="relative w-5/12 h-10/12">
        <div className="relative w-full h-full rounded-[4rem] shadow-2xl">
          <Image
            src={`/madcourses/madcourses_${card.image}.png`}
            alt={`MadCourses ${card.image}`}
            fill
            className="p-2 rounded-[4rem]"
            priority={isFirstImage}
          />
        </div>
      </div>

      <motion.div
        style={{ y }}
        className="text-8xl font-bold tracking-tight text-white pointer-events-none select-none mt-8"
      >
        {inView && (
          <div className="text-center">
            <Typewriter lines={card.titleLines} speed={35} bold={[card.titleLines[0]]} />
            <div className="text-4xl font-medium mt-4 mx-20 text-neutral-100">
              <Typewriter lines={card.descLines} speed={5} bold={card.bold} />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  )
}

export default function MadCourses() {
  const { scrollYProgress } = useScroll()
  const lines = ["MadCourses"]
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.1,
  })

  const resumeRef = useRef<HTMLAnchorElement>(null)
  const { setTargets } = useCursorContext()

  useEffect(() => {
    setTargets([resumeRef])
    return () => setTargets([])
  }, [setTargets])

  return (
    <div className="relative">
      <header className="absolute top-0 inset-x-0 h-16 flex items-center justify-end px-6 z-10 sm:text-lg text-sm font-medium text-white">
        <p>
          <a
            ref={resumeRef}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </p>
      </header>

      <main className="flex flex-col h-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg text-white">
        <span className="md:mt-16 sm:mt-8 mt-6 md:ml-8">
          <Typewriter lines={lines} speed={35} bold={["MadCourses"]} />
        </span>

        <div className="snap-y snap-mandatory">
          {CARDS.map((card, idx) => (
            <ImageCard key={idx} card={card} />
          ))}
          <motion.div
            className="fixed bottom-12 left-0 right-0 h-1 bg-white origin-left"
            style={{ scaleX }}
          />
        </div>
      </main>
    </div>
  )
}
