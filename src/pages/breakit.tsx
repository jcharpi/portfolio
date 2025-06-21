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

type Card = {
  /** Image index used for the initial screenshot */
  image: number
  /** Lines for the title typewriter */
  titleLines: string[]
  /** Lines for the description typewriter */
  descLines: string[]
  /** Words that should be bold in the description */
  bold: string[]
}

const CARDS: Card[] = [
  {
    image: 0,
    titleLines: ["Welcome to BreakIt!"],
    descLines: [
      "I’ve always believed in building with purpose. One of the strongest motivators for me to create something occurs when I believe I can solve a problem that both myself and others could benefit from. BreakIt was born when my dad pointed out my nail-picking habit, and I thought, 'There has to be a way to track this and stay accountable.' As you explore the app, I’ll walk you through the technologies that bring it to life. Enjoy! 🎉",
    ],
    bold: [
      "purpose",
      "problem",
      "others",
      "could",
      "benefit",
      "from",
      "technologies",
      "Enjoy",
    ],
  },
  {
    image: 1,
    titleLines: ["My Goals"],
    descLines: [
      "When I begin a new project, I start by identifying the technologies I want to learn, though inevitably, additional tools emerge as development unfolds. BreakIt was my first React Native app, building on my existing React experience and giving me hands-on insight into cross-platform mobile development, which offers clear advantages over maintaining separate native codebases. Furthermore, I also set out to deepen my understanding of integrating TypeScript within the React Native library and persisting data on app close.",
    ],
    bold: ["learn", "React", "Native", "TypeScript", "persisting", "data"],
  },
  {
    image: 2,
    titleLines: ["The Challenge"],
    descLines: [
      "My greatest challenge in developing BreakIt was managing several nested Context providers, which quickly led to tangled and confusing state handling. To resolve this, I adopted Redux Toolkit, a library that consolidates state management with persistence, stores, and reducers. Although learning Redux Toolkit required me to step beyond the React material covered in my university’s Building User Interfaces course and refactor much of my codebase, it proved to be the perfect solution for my Context issues and introduced me to a powerful state-management tool I’ll continue using in future projects.",
    ],
    bold: [
      "challenge",
      "Context",
      "state",
      "Redux",
      "Toolkit",
      "React",
      "Building",
      "User",
      "Interfaces",
    ],
  },
  {
    image: 3,
    titleLines: ["What's Different?"],
    descLines: [
      "Although many habit-tracking apps exist, I wanted BreakIt to stand out with a more visual, less declarative design free of unnecessary complexity. I created a clean, intuitive interface that places users’ progress front and center—eliminating clutter while keeping the experience engaging thanks to the dynamic art created by my friend, Emily. Some features now invite exploration on the user’s part, striking a balance between simplicity and discoverability. Thanks Emily! 🎨",
    ],
    bold: [
      "clean",
      "intuitive",
      "interface",
      "dynamic",
      "exploration",
      "simplicity",
      "discoverability",
    ],
  },
]

// Images 3 through 7 cycle on hover for the final card
const CYCLE_START = 3
const CYCLE_END = 7

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

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

  const handleHoverStart = () => {
    if (!isHoverCard) return
    let current = CYCLE_START
    setImgIndex(current)
    intervalRef.current = setInterval(() => {
      current = current < CYCLE_END ? current + 1 : CYCLE_START
      setImgIndex(current)
    }, 1000)
  }

  const handleHoverEnd = () => {
    if (!isHoverCard) return
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setImgIndex(CYCLE_START)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <section className="h-screen snap-start grid grid-cols-2 items-center">
      <div ref={ref} className="relative w-5/12 h-10/12 justify-self-center">
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
        className="col-span-1 text-8xl font-bold tracking-tight text-white pointer-events-none select-none"
      >
        {inView && (
          <div>
            <Typewriter lines={card.titleLines} speed={35} bold={[card.titleLines[0]]} />
            <div className="text-4xl font-medium mt-4 mr-20 text-neutral-100">
              <Typewriter lines={card.descLines} speed={3} bold={card.bold} />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  )
}

export default function Parallax() {
  const { scrollYProgress } = useScroll()
  const breakItLines = ["BreakIt"]
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.1,
  })

  return (
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
  )
}
