"use client"

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "motion/react"
import { useRef } from "react"
import Typewriter from "@/components/Typewriter"
import Image from "next/image"

const titles = [
  "Welcome to BreakIt!",
  "My Goals",
  "The Challenge",
  "What's Different?",
  "Scoring summary",
  "New challenge",
  "Achievement unlocked",
  "Share results",
  "Leaderboard",
]

const descriptions = [
  "I’ve always believed in building with purpose. One of the strongest motivators for me to create something occurs when I believe I can solve a problem that both myself and others could benefit from. BreakIt was born when my dad pointed out my nail-picking habit, and I thought, 'There has to be a way to track this and stay accountable.' As you explore the app, I’ll walk you through the technologies that bring it to life. Enjoy! 🎉",
  "When I begin a new project, I start by identifying the technologies I want to learn, though inevitably, additional tools emerge as development unfolds. BreakIt was my first React Native app, building on my existing React experience and giving me hands-on insight into cross-platform mobile development, which offers clear advantages over maintaining separate native codebases. Furthermore, I also set out to deepen my understanding of integrating TypeScript within the React Native library and persisting data on app close.",
  "My greatest challenge in developing BreakIt was managing several nested Context providers, which quickly led to tangled and confusing state handling. To resolve this, I adopted Redux Toolkit, a library that consolidates state management with persistence, stores, and reducers. Although learning Redux Toolkit required me to step beyond the React material covered in my university’s Building User Interfaces course and refactor much of my codebase, it proved to be the perfect solution for my Context issues and introduced me to a powerful state-management tool I’ll continue using in future projects.",
  "Although many habit-tracking apps exist, I wanted BreakIt to stand out with a more visual, less declarative design free of unnecessary complexity. I created a clean, intuitive interface that places users’ progress front and center—eliminating clutter while keeping the experience engaging thanks to the dynamic art created by my friend, Emily. Some features now invite exploration on the user’s part, striking a balance between simplicity and discoverability. Thanks Emily! 🎨",
  "Scoring summary",
  "New challenge",
  "Achievement unlocked",
  "Share results",
  "Leaderboard",
]

const descriptions_bold = [
  ["purpose", "problem", "others", "could", "benefit", "from", "technologies", "Enjoy"],
  ["learn", "React", "Native", "TypeScript", "persisting", "data"],
  ["challenge", "Context", "state", "Redux", "Toolkit", "React", "Building", "User", "Interfaces"],
  ["clean", "intuitive", "interface", "dynamic", "exploration", "simplicity", "discoverability"],
  ["Scoring summary"],
  ["New challenge"],
  ["Achievement unlocked"],
  ["Share results"],
  ["Leaderboard"],
]

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

function ImageCard({
  id,
  title,
  description,
  bold
}: {
  id: number
  title: string
  description: string
  bold: string[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)
  const inView = useInView(ref, {
    margin: "0px 0px -800px 0px",
  })

  return (
    <section className="h-screen snap-start grid grid-cols-2 items-center">
      <div ref={ref} className="relative w-5/12 h-10/12 justify-self-center">
        <div className="relative w-full h-full rounded-[2.5rem] bg-black shadow-2xl">
          <Image
            src={`/breakit/breakit_${id}.png`}
            alt={`BreakIt ${id}`}
            fill
            className="p-2 rounded-[2.5rem]"
            priority={id === 0}
          />
        </div>
      </div>

      <motion.div
        style={{ y }}
        className="col-span-1 text-8xl font-bold tracking-tight text-white pointer-events-none select-none"
      >
        {inView && (
          <div>
            <Typewriter lines={[title]} speed={35} bold={[title]} />
            <div className="text-4xl font-medium mt-4 mr-20 text-neutral-100">
              <Typewriter lines={[description]} speed={3} bold={bold}/>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  )
}

export default function Parallax() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.1,
  })

  return (
    <main className="flex flex-col h-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg text-white">
      <span className="md:mt-16 sm:mt-8 mt-6 md:ml-8">
        <Typewriter lines={["BreakIt"]} speed={35} bold={["BreakIt"]} />
      </span>

      <div className="snap-y snap-mandatory">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((img) => (
          <ImageCard
            key={img}
            id={img}
            title={titles[img]}
            description={descriptions[img]}
            bold={descriptions_bold[img]}
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
