"use client"

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { useRef } from "react"
import { PhoneMockup } from 'phone-mockup-react';
import 'phone-mockup-react/dist/styles.css';
import Image from "next/image"

/**
 * Map a scroll progress value (0 → 1) to a symmetric translate‑Y range
 * so that the element moves up when scrolling down and vice‑versa.
 */
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

interface ImageCardProps {
  id: number
}

function ImageCard({ id }: ImageCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)

  return (
    <section className="h-screen snap-start flex justify-center items-center relative">
      {/* Image wrapper that acts as the scroll target */}
      <div
        ref={ref}
        className="relative w-72 h-[400px] md:w-72 md:h-[400px] sm:w-44 sm:h-52 m-5 bg-gray-100 overflow-hidden"
      >
        <PhoneMockup model="iphone-16">
          <Image
            src={`/breakit/breakit_${id}.png`}
            alt={`Breakout #00${id}`}
            fill
            sizes="(max-width: 640px) 176px, 288px"
            className="object-cover"
            priority={id === 0}
          />
        </PhoneMockup>
      </div>

      {/* Floating index that glides vertically with the scroll */}
      <motion.h2
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
        className="absolute font-mono font-bold leading-none text-5xl tracking-tight text-[#8df0cc]
                   top-1/2 left-[calc(50%+120px)] -translate-y-1/2 select-none pointer-events-none"
      >
        {`#00${id}`}
      </motion.h2>
    </section>
  )
}

/**
 * Parallax showcase: full‑viewport sections that snap while scrolling and
 * a progress bar that fills horizontally as the page is scrolled.
 */
export default function Parallax() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    // Enable vertical snap behaviour on the whole page
    <div id="parallax-demo" className="snap-y snap-mandatory">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((img) => (
        <ImageCard key={img} id={img} />
      ))}

      {/* Scroll-position progress bar */}
      <motion.div
        className="fixed bottom-12 left-0 right-0 h-1 bg-[#8df0cc] origin-left"
        style={{ scaleX }}
      />
    </div>
  )
}
