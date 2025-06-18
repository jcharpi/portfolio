import { useState, useEffect, useRef } from "react"
import { motion, useAnimate } from "motion/react"
import useMousePosition from "@/hooks/useMousePosition"
import { useCursorContext } from "@/context/CursorContext"
import { ACCENT_COLORS, useColorCycle } from "@/context/ColorCycleContext"

// Constants and types

type Position = { x: number; y: number }
type Size = { width: number; height: number }

// Custom hook for cursor behavior
function useCursorBehavior(targets: React.RefObject<HTMLElement | null>[]) {
  const { x: mouseX, y: mouseY } = useMousePosition()
  const [displayPosition, setDisplayPosition] = useState<Position>({
    x: mouseX,
    y: mouseY,
  })
  const [isSnapped, setIsSnapped] = useState(false)
  const [snappedElementSize, setSnappedElementSize] = useState<Size>({
    width: 0,
    height: 0,
  })
  const { colorIndex, setColorIndex } = useColorCycle()

  const mousePosRef = useRef<Position>({ x: mouseX, y: mouseY })
  const isSnappedRef = useRef(isSnapped)
  const snappedElementRef = useRef<HTMLElement | null>(null)

  // Update refs with latest values
  useEffect(() => {
    mousePosRef.current = { x: mouseX, y: mouseY }
    isSnappedRef.current = isSnapped
  }, [mouseX, mouseY, isSnapped])

  // Handle mouse interactions
  useMouseInteractions(isSnappedRef, snappedElementRef, setColorIndex)

  // Update cursor position and snapping
  useCursorPositionUpdate(
    targets,
    mousePosRef,
    setDisplayPosition,
    setIsSnapped,
    setSnappedElementSize,
    snappedElementRef
  )

  return {
    displayPosition,
    isSnapped,
    snappedElementSize,
    colorIndex,
  }
}

// Custom hook for mouse interactions
function useMouseInteractions(
  isSnappedRef: React.MutableRefObject<boolean>,
  snappedElementRef: React.MutableRefObject<HTMLElement | null>,
  setColorIndex: React.Dispatch<React.SetStateAction<number>>
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0) return

      if (isSnappedRef.current && snappedElementRef.current) {
        snappedElementRef.current.click()
      } else if (!isSnappedRef.current) {
        setColorIndex((prev) => (prev + 1) % ACCENT_COLORS.length)
      }
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [isSnappedRef, snappedElementRef, setColorIndex])
}

// Custom hook for cursor position updates
function useCursorPositionUpdate(
  targets: React.RefObject<HTMLElement | null>[],
  mousePosRef: React.MutableRefObject<Position>,
  setDisplayPosition: React.Dispatch<React.SetStateAction<Position>>,
  setIsSnapped: React.Dispatch<React.SetStateAction<boolean>>,
  setSnappedElementSize: React.Dispatch<React.SetStateAction<Size>>,
  snappedElementRef: React.MutableRefObject<HTMLElement | null>
) {
  useEffect(() => {
    const updateCursorPosition = () => {
      const { x, y } = mousePosRef.current
      let isCurrentlySnapped = false
      let newPosition = { x, y }
      let newSize = { width: 0, height: 0 }
      snappedElementRef.current = null

      // Check all targets for snapping
      for (const ref of targets) {
        const element = ref.current
        if (!element) continue

        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.hypot(centerX - x, centerY - y)

        if (distance < 60) {
          isCurrentlySnapped = true
          newPosition = { x: centerX, y: centerY }
          newSize = { width: rect.width, height: rect.height }
          snappedElementRef.current = element
          break
        }
      }

      // Update states only if values changed
      setDisplayPosition((prev) =>
        prev.x === newPosition.x && prev.y === newPosition.y
          ? prev
          : newPosition
      )

      setIsSnapped((prev) =>
        prev === isCurrentlySnapped ? prev : isCurrentlySnapped
      )

      if (isCurrentlySnapped) {
        setSnappedElementSize((prev) =>
          prev.width === newSize.width && prev.height === newSize.height
            ? prev
            : newSize
        )
      }
    }

    const rafId = requestAnimationFrame(function loop() {
      updateCursorPosition()
      requestAnimationFrame(loop)
    })

    return () => cancelAnimationFrame(rafId)
  }, [
    targets,
    mousePosRef,
    setDisplayPosition,
    setIsSnapped,
    setSnappedElementSize,
    snappedElementRef,
  ])
}

// Main cursor component
export default function Cursor() {
  const { targets } = useCursorContext()
  const {
    displayPosition,
    isSnapped,
    snappedElementSize,
    colorIndex,
  } = useCursorBehavior(targets)

  return (
    <motion.div
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
      animate={displayPosition}
      transition={{ ease: "easeOut", duration: 0.2 }}
    >
      <div className="relative pointer-events-none">
        {isSnapped ? (
          <SnappedElementVisual size={snappedElementSize} />
        ) : (
          <NormalCursorVisual colorIndex={colorIndex} />
        )}
      </div>
    </motion.div>
  )
}

// Sub-components for better readability
function SnappedElementVisual({ size }: { size: Size }) {
  return (
    <div
      className="rounded-md bg-black opacity-50"
      style={{
        width: size.width + 16,
        height: size.height + 16,
      }}
    />
  )
}

function NormalCursorVisual({ colorIndex }: { colorIndex: number }) {
  const [visualIndex, setVisualIndex] = useState(colorIndex)
  const prevIndexRef = useRef(colorIndex)
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const [, animate] = useAnimate()

  useEffect(() => {
    if (colorIndex === prevIndexRef.current) return

    const rotateAnim = animate(
      containerRef.current!,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { rotate: -120 } as any,
      { duration: 0.3, ease: "easeInOut" }
    )
    const fadeOut = animate(
      leftRef.current!,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { opacity: 0 } as any,
      { duration: 0.3, ease: "easeInOut" }
    )
    const fadeIn = animate(
      topRef.current!,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { opacity: 1 } as any,
      { duration: 0.3, ease: "easeInOut" }
    )

    Promise.all([rotateAnim.finished, fadeOut.finished, fadeIn.finished]).then(() => {
      if (containerRef.current) containerRef.current.style.rotate = "0deg"
      if (leftRef.current) leftRef.current.style.opacity = "1"
      if (topRef.current) topRef.current.style.opacity = "0"
      setVisualIndex(colorIndex)
      prevIndexRef.current = colorIndex
    })
  }, [colorIndex, animate])

  const mapping: [string, string][] = [
    [ACCENT_COLORS[1], ACCENT_COLORS[2]],
    [ACCENT_COLORS[2], ACCENT_COLORS[0]],
    [ACCENT_COLORS[0], ACCENT_COLORS[1]],
  ]
  const [displayLeft, displayRight] = mapping[visualIndex]
  const topColor = ACCENT_COLORS[visualIndex]

  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full bg-black opacity-50" />
      <div ref={containerRef} className="absolute inset-0 origin-center">
        <div
          ref={topRef}
          className="absolute -top-5 left-1/2 w-4 h-4 rounded-full opacity-0 -translate-x-1/2"
          style={{ backgroundColor: topColor }}
        />
        <div
          ref={leftRef}
          className="absolute -bottom-3 -left-5 w-4 h-4 rounded-full"
          style={{ backgroundColor: displayLeft }}
        />
        <div
          ref={rightRef}
          className="absolute -bottom-3 -right-5 w-4 h-4 rounded-full"
          style={{ backgroundColor: displayRight }}
        />
      </div>
    </div>
  )
}
