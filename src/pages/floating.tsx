"use client"

import { motion, useAnimationControls } from "motion/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

/**
 * Demo screen showing floating images and text using motion animations.
 * Images and text rise from bottom to top with randomized positions.
 * Text moves faster than images and will not overlap each other.
 */

const TEXTS = [
  "Hello World",
  "Random Motion",
  "Next.js Demo",
  "Flying Text",
]

const IMAGES = [
  "/icons/react.svg",
  "/icons/python.svg",
  "/icons/redux.svg",
]

export default function Floating() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const textPositions = useRef<number[]>([])

  // Track window size for positioning.
  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {TEXTS.map((text, idx) => (
        <MovingItem
          key={`text-${idx}`}
          container={size}
          type="text"
          content={text}
          speed={6}
          track={textPositions}
        />
      ))}
      {IMAGES.map((src, idx) => (
        <MovingItem
          key={`img-${idx}`}
          container={size}
          type="image"
          content={src}
          speed={12}
        />
      ))}
    </div>
  )
}

type MovingItemProps = {
  container: { width: number; height: number }
  type: "text" | "image"
  content: string
  speed: number
  track?: React.MutableRefObject<number[]>
}

function MovingItem({ container, type, content, speed, track }: MovingItemProps) {
  const controls = useAnimationControls()
  const currentX = useRef(0)

  // Pick a random X position, avoiding overlap with existing text positions.
  const getRandomX = useCallback(() => {
    const width = container.width
    const spacing = 120
    if (!track) return Math.random() * (width - spacing)
    let x = 0
    let attempts = 0
    do {
      x = Math.random() * (width - spacing)
      attempts++
    } while (
      track.current.some((px) => Math.abs(px - x) < spacing) &&
      attempts < 20
    )
    return x
  }, [container.width, track])

  useEffect(() => {
    let alive = true
    const positions = track?.current
    const run = async () => {
      while (alive && container.width && container.height) {
        const x = getRandomX()
        if (positions) positions.push(x)
        currentX.current = x
        const startY = container.height + Math.random() * 100
        controls.set({ x, y: startY })
        await controls.start({
          y: -100,
          transition: { duration: speed, ease: "linear" },
        })
        if (positions) {
          const index = positions.indexOf(currentX.current)
          if (index !== -1) positions.splice(index, 1)
        }
      }
    }
    run()
    return () => {
      alive = false
      if (positions) {
        const index = positions.indexOf(currentX.current)
        if (index !== -1) positions.splice(index, 1)
      }
    }
  }, [container.height, container.width, controls, getRandomX, speed, track])

  return (
    <motion.div
      animate={controls}
      style={{ position: "absolute", zIndex: type === "image" ? 2 : 1 }}
      className="pointer-events-none select-none text-white text-xl font-bold whitespace-nowrap"
    >
      {type === "text" ? (
        content
      ) : (
        <Image src={content} alt="" width={80} height={80} />
      )}
    </motion.div>
  )
}

