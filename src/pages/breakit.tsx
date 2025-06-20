"use client"

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "motion/react"
import { useRef, createRef, RefObject, useState, useEffect } from "react"
import { useCursorContext } from "@/contexts/CursorContext"
import Typewriter from "@/components/Typewriter"
import Image from "next/image"

const titles = [
  "Welcome to BreakIt!",
  "My Goals",
  "The Challenge",
  "What's Different?",
]

const descriptions = [
  "I’ve always believed in building with purpose. One of the strongest motivators for me to create something occurs when I believe I can solve a problem that both myself and others could benefit from. BreakIt was born when my dad pointed out my nail-picking habit, and I thought, 'There has to be a way to track this and stay accountable.' As you explore the app, I’ll walk you through the technologies that bring it to life. Enjoy! 🎉",
  "When I begin a new project, I start by identifying the technologies I want to learn, though inevitably, additional tools emerge as development unfolds. BreakIt was my first React Native app, building on my existing React experience and giving me hands-on insight into cross-platform mobile development, which offers clear advantages over maintaining separate native codebases. Furthermore, I also set out to deepen my understanding of integrating TypeScript within the React Native library and persisting data on app close.",
  "My greatest challenge in developing BreakIt was managing several nested Context providers, which quickly led to tangled and confusing state handling. To resolve this, I adopted Redux Toolkit, a library that consolidates state management with persistence, stores, and reducers. Although learning Redux Toolkit required me to step beyond the React material covered in my university’s Building User Interfaces course and refactor much of my codebase, it proved to be the perfect solution for my Context issues and introduced me to a powerful state-management tool I’ll continue using in future projects.",
  "Although many habit-tracking apps exist, I wanted BreakIt to stand out with a more visual, less declarative design free of unnecessary complexity. I created a clean, intuitive interface that places users’ progress front and center—eliminating clutter while keeping the experience engaging thanks to the dynamic art created by my friend, Emily. Some features now invite exploration on the user’s part, striking a balance between simplicity and discoverability. Thanks Emily! 🎨",
]

const descriptions_bold = [
  ["purpose", "problem", "others", "could", "benefit", "from", "technologies", "Enjoy"],
  ["learn", "React", "Native", "TypeScript", "persisting", "data"],
  ["challenge", "Context", "state", "Redux", "Toolkit", "React", "Building", "User", "Interfaces"],
  ["clean", "intuitive", "interface", "dynamic", "exploration", "simplicity", "discoverability"],
]

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

function ImageCard({ id, innerRef }: { id: number; innerRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div className="relative w-5/12 h-10/12 justify-self-center">
      <div ref={innerRef} className="relative w-full h-full rounded-[4rem] bg-black shadow-2xl">
        <Image
          src={`/breakit/breakit_${id}.png`}
          alt={`BreakIt ${id}`}
          fill
          className="p-2 rounded-[4rem]"
          priority={id === 0}
        />
      </div>
    </div>
  )
}

function SnappableImageCard({ innerRef }: { innerRef: RefObject<HTMLDivElement | null> }) {
  const images = [3, 4, 5, 6, 7]
  const [index, setIndex] = useState(0)

  const handleClick = () => {
    setIndex((i) => (i + 1) % images.length)
  }

  const id = images[index]

  return (
    <div className="relative w-5/12 h-10/12 justify-self-center">
      <div
        ref={innerRef}
        className="relative w-full h-full rounded-[4rem] bg-black shadow-2xl"
        onClick={handleClick}
      >
        <Image
          src={`/breakit/breakit_${id}.png`}
          alt={`BreakIt ${id}`}
          fill
          className="p-2 rounded-[4rem]"
        />
      </div>
    </div>
  )
}

function TextCard({
  scrollRef,
  title,
  description,
  bold,
}: {
  scrollRef: RefObject<HTMLDivElement | null>
  title: string
  description: string
  bold: string[]
}) {
  const { scrollYProgress } = useScroll({ target: scrollRef })
  const y = useParallax(scrollYProgress, 300)
  const inView = useInView(scrollRef, {
    margin: "0px 0px -800px 0px",
  })

  return (
    <motion.div
      style={{ y }}
      className="col-span-1 text-8xl font-bold tracking-tight text-white pointer-events-none select-none"
    >
      {inView && (
        <div>
          <Typewriter lines={[title]} speed={35} bold={[title]} />
          <div className="text-4xl font-medium mt-4 mr-20 text-neutral-100">
            <Typewriter lines={[description]} speed={3} bold={bold} />
          </div>
        </div>
      )}
    </motion.div>
  )
}


export default function Parallax() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.1,
  })
  const refs = useRef(
    Array.from({ length: titles.length }, () => createRef<HTMLDivElement>())
  ).current

  const { setTargets } = useCursorContext()

  useEffect(() => {
    setTargets([refs[3]])
    return () => setTargets([])
  }, [refs, setTargets])

  return (
    <main className="flex flex-col h-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg text-white">
      <span className="md:mt-16 sm:mt-8 mt-6 md:ml-8">
        <Typewriter lines={["BreakIt"]} speed={35} bold={["BreakIt"]} />
      </span>

      <div className="snap-y snap-mandatory">
        {[0, 1, 2, 3].map((img) => (
          <section key={img} className="h-screen snap-start grid grid-cols-2 items-center">
            {img === 3 ? (
              <SnappableImageCard innerRef={refs[img]} />
            ) : (
              <ImageCard id={img} innerRef={refs[img]} />
            )}
            <TextCard
              scrollRef={refs[img]}
              title={titles[img]}
              description={descriptions[img]}
              bold={descriptions_bold[img]}
            />
          </section>
        ))}
        <motion.div
          className="fixed bottom-12 left-0 right-0 h-1 bg-white origin-left"
          style={{ scaleX }}
        />
      </div>
    </main>
  )
}
