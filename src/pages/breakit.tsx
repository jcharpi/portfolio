"use client"

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "motion/react"
import { useRef, useState, useEffect } from "react"
import Typewriter from "@/components/Typewriter"
import Image from "next/image"
import { CARDS, Card } from "@/data/breakitCards"
import { useCursorContext } from "@/contexts/CursorContext"

// Indices used when cycling through screenshots on hover.
const CYCLE_START = 3
const CYCLE_END = 6

// Map scroll progress to a vertical offset for parallax motion.
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

// Card displaying a screenshot with parallax title and description.
function ImageCard({
  card,
  isHoverCard,
}: {
  card: Card
  isHoverCard: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [imgIndex, setImgIndex] = useState(card.image)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isFirstImage = card.image === 0
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)
  const inView = useInView(ref, {
    margin: "0px 0px -800px 0px",
  })

  // Begin cycling through additional screenshots on hover.
  const handleHoverStart = () => {
    if (!isHoverCard) return
    let current = CYCLE_START
    setImgIndex(current)
    intervalRef.current = setInterval(() => {
      current = current < CYCLE_END ? current + 1 : CYCLE_START
      setImgIndex(current)
    }, 1000)
  }

  // Stop cycling screenshots when hover ends.
  const handleHoverEnd = () => {
    if (!isHoverCard) return
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setImgIndex(CYCLE_START)
  }

  // Clear any running interval when the component unmounts.
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <section className="relative h-screen snap-start grid grid-cols-1 lg:grid-cols-2 items-center gap-y-8">
      <Image
        src={`/icons/${card.icon}`}
        alt=""
        width={512}
        height={512}
        aria-hidden
        className="pointer-events-none absolute left-1/11 -translate-x-1/2 -translate-y-1/3 w-[30vw] h-[30vw] -z-10 opacity-75 invert"
      />
      <div
        ref={ref}
        className="relative w-[320px] h-[692px] justify-self-center"
      >
        {isHoverCard ? (
          <motion.div
            className="relative w-full h-full rounded-[4rem] bg-black shadow-2xl"
            whileHover={{ scale: 1.05 }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          >
            <Image
              src={`/breakit/breakit_${imgIndex}.png`}
              alt={`BreakIt ${card.image}`}
              fill
              className="p-2 rounded-[4rem]"
              priority={isFirstImage}
            />
          </motion.div>
        ) : (
          <div className="relative w-full h-full rounded-[4rem] bg-black shadow-2xl">
            <Image
              src={`/breakit/breakit_${imgIndex}.png`}
              alt={`BreakIt ${card.image}`}
              fill
              className="p-2 rounded-[4rem]"
              priority={isFirstImage}
            />
          </div>
        )}
      </div>

      <motion.div
        style={{ y }}
        className="col-span-1 text-8xl font-bold tracking-tight text-white pointer-events-none select-none mt-8 lg:mt-0 text-center lg:text-left"
      >
        {inView && (
          <div>
            <Typewriter
              lines={card.titleLines}
              speed={35}
              bold={[card.titleLines[0]]}
            />
            <div className="text-4xl font-medium mt-4 mr-20 text-neutral-100">
              <Typewriter lines={card.descLines} speed={3} bold={card.bold} />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  )
}

// Page presenting BreakIt with parallax scrolling.
export default function BreakIt() {
  const { scrollYProgress } = useScroll()
  const breakItLines = ["BreakIt"]
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
          <Typewriter lines={breakItLines} speed={35} bold={["BreakIt"]} />
        </span>

      <div className="snap-y snap-mandatory">
        {CARDS.map((card, idx) => (
          <ImageCard
            key={idx}
            card={card}
            isHoverCard={idx === CARDS.length - 1}
          />
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
