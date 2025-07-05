"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Typewriter from "@/components/Typewriter"
import { SLIDES, Slide } from "@/data/posthomeSlides"
import { mainLayout, mainSpacing, mainTextBlack } from "@/styles/classes"

function CarouselSlide({ slide }: { slide: Slide }) {
  return (
    <div className="snap-center shrink-0 w-screen h-screen flex flex-col items-center justify-center space-y-8">
      <div className="relative w-5/6 h-2/3">
        <Image
          src={`/breakit/breakit_${slide.image}.png`}
          alt="Carousel screenshot"
          fill
          className="object-contain rounded-3xl shadow-2xl bg-black p-2"
        />
      </div>
      <div className="text-center">
        <Typewriter lines={slide.lines} speed={35} bold={slide.bold ?? []} />
      </div>
    </div>
  )
}

export default function PostHome() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Keep the carousel scrolling infinitely by resetting the scroll position
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const slideWidth = container.clientWidth
    // Start at the middle copy so users can scroll both directions
    container.scrollLeft = slideWidth * SLIDES.length

    const handleScroll = () => {
      if (container.scrollLeft <= 0) {
        container.scrollLeft += slideWidth * SLIDES.length
      } else if (container.scrollLeft >= slideWidth * SLIDES.length * 2) {
        container.scrollLeft -= slideWidth * SLIDES.length
      }
    }
    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const slides = [...SLIDES, ...SLIDES, ...SLIDES]

  return (
    <main
      ref={containerRef}
      className={`${mainLayout} ${mainSpacing} ${mainTextBlack} flex-row overflow-x-scroll overflow-y-hidden snap-x snap-mandatory whitespace-nowrap h-screen`}
    >
      {slides.map((slide, idx) => (
        <CarouselSlide key={idx} slide={slide} />
      ))}
    </main>
  )
}
