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

const CYCLE_START = 3
const CYCLE_END = 6

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
        <Image
          src={`/icons/${card.icon}`}
          alt=""
          width={512}
          height={512}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] -z-10 opacity-20 invert"
        />
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
            <Typewriter
              lines={card.titleLines}
              speed={35}
              bold={[card.titleLines[0]]}
            />
            <div className="text-4xl font-medium mt-4 mr-20 text-neutral-100">
              <Typewriter lines={card.descLines} speed={5} bold={card.bold} />
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
