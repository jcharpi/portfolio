import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import useMousePosition from "@/hooks/useMousePosition"

// Constants and types
const ACCENT_COLORS = ["#EFF1F3", "#586183", "#C01C1C"]

type Position = { x: number; y: number }
type Size = { width: number; height: number }
type CursorProps = { targets: React.RefObject<HTMLElement | null>[] }

// Custom hook for cursor behavior
function useCursorBehavior(targets: React.RefObject<HTMLElement | null>[]) {
  const { x: mouseX, y: mouseY } = useMousePosition()
  const [displayPosition, setDisplayPosition] = useState<Position>({ x: mouseX, y: mouseY })
  const [isSnapped, setIsSnapped] = useState(false)
  const [snappedElementSize, setSnappedElementSize] = useState<Size>({ width: 0, height: 0 })
  const [colorStep, setColorStep] = useState(1)

  const mousePosRef = useRef<Position>({ x: mouseX, y: mouseY })
  const isSnappedRef = useRef(isSnapped)
  const snappedElementRef = useRef<HTMLElement | null>(null)

  // Update refs with latest values
  useEffect(() => {
    mousePosRef.current = { x: mouseX, y: mouseY }
    isSnappedRef.current = isSnapped
  }, [mouseX, mouseY, isSnapped])

  // Handle mouse interactions
  useMouseInteractions(isSnappedRef, snappedElementRef, setColorStep)

  // Update cursor position and snapping
  useCursorPositionUpdate(
    targets,
    mousePosRef,
    setDisplayPosition,
    setIsSnapped,
    setSnappedElementSize,
    snappedElementRef
  )

  // Calculate colors
  const [leftColor, rightColor] = [
    ACCENT_COLORS[colorStep % ACCENT_COLORS.length],
    ACCENT_COLORS[(colorStep + 1) % ACCENT_COLORS.length]
  ]

  return {
    displayPosition,
    isSnapped,
    snappedElementSize,
    leftColor,
    rightColor
  }
}

// Custom hook for mouse interactions
function useMouseInteractions(
  isSnappedRef: React.MutableRefObject<boolean>,
  snappedElementRef: React.MutableRefObject<HTMLElement | null>,
  setColorStep: React.Dispatch<React.SetStateAction<number>>
) {
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return // Only handle left clicks

      if (isSnappedRef.current && snappedElementRef.current) {
        snappedElementRef.current.click()
      }
      else if (!isSnappedRef.current) {
        setColorStep(prev => (prev + 1) % ACCENT_COLORS.length)
      }
    }

    window.addEventListener("mousedown", handleMouseDown)
    return () => window.removeEventListener("mousedown", handleMouseDown)
  }, [isSnappedRef, snappedElementRef, setColorStep])
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
      setDisplayPosition(prev =>
        (prev.x === newPosition.x && prev.y === newPosition.y) ? prev : newPosition
      )

      setIsSnapped(prev =>
        prev === isCurrentlySnapped ? prev : isCurrentlySnapped
      )

      if (isCurrentlySnapped) {
        setSnappedElementSize(prev =>
          (prev.width === newSize.width && prev.height === newSize.height) ? prev : newSize
        )
      }
    }

    const rafId = requestAnimationFrame(function loop() {
      updateCursorPosition()
      requestAnimationFrame(loop)
    })

    return () => cancelAnimationFrame(rafId)
  }, [targets, mousePosRef, setDisplayPosition, setIsSnapped, setSnappedElementSize, snappedElementRef])
}

// Main cursor component
export default function Cursor({ targets }: CursorProps) {
  const {
    displayPosition,
    isSnapped,
    snappedElementSize,
    leftColor,
    rightColor
  } = useCursorBehavior(targets)

  return (
    <motion.div
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
      animate={displayPosition}
      transition={{ ease: "easeOut", duration: 0.2 }}
    >
      <div className="relative pointer-events-none opacity-50">
        {isSnapped ? (
          <SnappedElementVisual size={snappedElementSize} />
        ) : (
          <NormalCursorVisual leftColor={leftColor} rightColor={rightColor} />
        )}
      </div>
    </motion.div>
  )
}

// Sub-components for better readability
function SnappedElementVisual({ size }: { size: Size }) {
  return (
    <div
      className="rounded-md bg-black"
      style={{
        width: size.width + 16,
        height: size.height + 16
      }}
    />
  )
}

function NormalCursorVisual({ leftColor, rightColor }: {
  leftColor: string;
  rightColor: string
}) {
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full bg-black" />
      <div
        className="absolute -bottom-3 -left-5 w-4 h-4 rounded-full"
        style={{ backgroundColor: leftColor }}
      />
      <div
        className="absolute -bottom-3 -right-5 w-4 h-4 rounded-full"
        style={{ backgroundColor: rightColor }}
      />
    </div>
  )
}