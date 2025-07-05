"use client"

import {
  motion,
  useScroll,
  useSpring,
  useInView,
} from "motion/react"
import { useRef, useState, useEffect } from "react"
import Typewriter from "@/components/Typewriter"
import Image from "next/image"
import { CARDS, Card } from "@/data/breakitCards"
import { useCursorContext } from "@/contexts/CursorContext"
import {
  headerLayout,
  headerSpacing,
  headerTextWhite,
  mainLayout,
  mainSpacing,
  mainTextWhite,
  heroMargin,
  progressBar,
} from "@/styles/classes"

// Indices used when cycling through screenshots on hover.
const CYCLE_START = 3
const CYCLE_END = 6

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
  const inView = useInView(ref)

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
    <section className="relative min-h-screen snap-start grid lg:grid-cols-3 items-center">
      <Image
        src={`/icons/${card.icon}`}
        alt="Tech used icon"
        width={512}
        height={512}
        aria-hidden
        className="hidden lg:block pointer-events-none absolute left-1/11 -translate-x-1/2 -translate-y-1/3 w-[30vw] h-[30vw] -z-10 opacity-75 invert"
      />
      <div className="relative mb-24 lg:mb-0 max-h-screen min-w-[315px] w-4/12 justify-self-center m-4 lg:m-0 aspect-[8/16]">
        {isHoverCard ? (
          <motion.div
            className="relative w-full h-full rounded-[3rem] bg-black shadow-2xl"
            whileHover={{ scale: 1.05 }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          >
            <Image
              src={`/breakit/breakit_${imgIndex}.png`}
              alt={`BreakIt ${card.image}`}
              fill
              className="p-2 rounded-[3rem]"
              priority={isFirstImage}
            />
          </motion.div>
        ) : (
          <div className="relative w-full h-full rounded-[3rem] bg-black shadow-2xl">
            <Image
              src={`/breakit/breakit_${imgIndex}.png`}
              alt={`BreakIt ${card.image}`}
              fill
              className="p-2 rounded-[3rem]"
              priority={isFirstImage}
            />
          </div>
        )}
      </div>

      <motion.div
      ref={ref}
      className="min-h-[24rem] lg:col-span-2 text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-white pointer-events-none select-none text-justify"
      >
        {inView && (
          <div>
            <Typewriter
              lines={card.titleLines}
              speed={35}
              bold={[card.titleLines[0]]}
            />
            <div className="text-lg md:text-2xl lg:text-3xl font-medium lg:mr-12 mt-4 text-neutral-100">
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
      <header className={`${headerLayout} ${headerSpacing} ${headerTextWhite}`}>
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

      <main className={`${mainLayout} ${mainSpacing} ${mainTextWhite}`}>
        <span className={heroMargin}>
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
        <motion.div className={`${progressBar} bg-white`} style={{ scaleX }} />
      </div>
    </main>
    </div>
  )
}
