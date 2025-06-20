import { useRef } from "react"
 * Parallax.tsx – FIXED overlay logic (v2)
 *
 * The overlay for index 3 now uses start/end sentinels so it stays visible
 * from the moment **breakit_3** scrolls in until **breakit_7** is off‑screen.
 */

"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "motion/react";
import { useRef } from "react";
import Typewriter from "@/components/Typewriter";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*  Static copy                                                               */
/* -------------------------------------------------------------------------- */

const titles = [
  "Welcome to BreakIt!",
  "My Goals",
  "The Challenge",
  "What's Different?",
];

const descriptions = [
  "I’ve always believed in building with purpose. One of the strongest motivators for me to create something occurs when I believe I can solve a problem that both myself and others could benefit from. BreakIt was born when my dad pointed out my nail-picking habit, and I thought, 'There has to be a way to track this and stay accountable.' As you explore the app, I’ll walk you through the technologies that bring it to life. Enjoy! 🎉",
  "When I begin a new project, I start by identifying the technologies I want to learn, though inevitably, additional tools emerge as development unfolds. BreakIt was my first React Native app, building on my existing React experience and giving me hands-on insight into cross-platform mobile development, which offers clear advantages over maintaining separate native codebases. Furthermore, I also set out to deepen my understanding of integrating TypeScript within the React Native library and persisting data on app close.",
  "My greatest challenge in developing BreakIt was managing several nested Context providers, which quickly led to tangled and confusing state handling. To resolve this, I adopted Redux Toolkit, a library that consolidates state management with persistence, stores, and reducers. Although learning Redux Toolkit required me to step beyond the React material covered in my university’s Building User Interfaces course and refactor much of my codebase, it proved to be the perfect solution for my Context issues and introduced me to a powerful state-management tool I’ll continue using in future projects.",
  "Although many habit-tracking apps exist, I wanted BreakIt to stand out with a more visual, less declarative design free of unnecessary complexity. I created a clean, intuitive interface that places users’ progress front and center—eliminating clutter while keeping the experience engaging thanks to the dynamic art created by my friend, Emily. Some features now invite exploration on the user’s part, striking a balance between simplicity and discoverability. Thanks Emily! 🎨",
];

const descriptionsBold: string[][] = [
  ["purpose", "problem", "others", "could", "benefit", "from", "technologies", "Enjoy"],
  ["learn", "React", "Native", "TypeScript", "persisting", "data"],
  ["challenge", "Context", "state", "Redux", "Toolkit", "React", "Building", "User", "Interfaces"],
  ["clean", "intuitive", "interface", "dynamic", "exploration", "simplicity", "discoverability"],
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

/* -------------------------------------------------------------------------- */
/*  Card Components                                                           */
/* -------------------------------------------------------------------------- */

interface ImageCardProps {
  id: number;
  title: string;
  description: string;
  bold: string[];
}

function ImageCard({ id, title, description, bold }: ImageCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);
  const inView = useInView(ref, { margin: "0px 0px -800px 0px" });

  return (
    <section className="h-screen snap-start grid grid-cols-2 items-center">
      <div
        ref={ref}
        className="relative w-5/12 h-10/12 justify-self-center"
      >
        <div className="relative w-full h-full rounded-[4rem] bg-black shadow-2xl">
          <Image
            src={`/breakit/breakit_${id}.png`}
            alt={`BreakIt ${id}`}
            fill
            className="p-2 rounded-[4rem]"
            priority={id === 0}
          />
        </div>
      </div>

      {inView && (
        <motion.div
          style={{ y }}
          className="col-span-1 text-8xl font-bold tracking-tight text-white pointer-events-none select-none"
  const startInView = useInView(startRef, { margin: "0px 0px -100% 0px" })
  const endInView = useInView(endRef, { margin: "0px 0px -100% 0px" })
  const show = startInView && !endInView
  );
}

function ImageOnlyCard({ id }: { id: number }) {
  return (
    <section className="h-screen snap-start grid grid-cols-2 items-center">
      <div className="relative w-5/12 h-10/12 justify-self-center">
        <div className="relative w-full h-full rounded-[4rem] bg-black shadow-2xl">
          <Image
            src={`/breakit/breakit_${id}.png`}
            alt={`BreakIt ${id}`}
            fill
            className="p-2 rounded-[4rem]"
          />
        </div>
      </div>
      <div className="col-span-1" />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Extra Images Section                                                      */
/* -------------------------------------------------------------------------- */

function ExtraSection({ ids }: { ids: number[] }) {
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Sentinels visibility
  const startVisible = useInView(startRef, { amount: 0.01 });
  const endVisible = useInView(endRef, { amount: 0.01 });
  const showOverlay = startVisible && !endVisible;

  return (
    <>
      {/* Top sentinel just before breakit_3 */}
      <div ref={startRef} className="h-0.5" />

      {ids.map((id) => (
        <ImageOnlyCard key={id} id={id} />
      ))}



      {showOverlay && (
        <motion.div className="fixed inset-y-0 right-0 w-1/2 flex items-center pointer-events-none select-none pr-20">
          <div>
            <Typewriter lines={[titles[3]]} speed={35} bold={[titles[3]]} />
            <div className="text-4xl font-medium mt-4 text-neutral-100">
              <Typewriter
                lines={[descriptions[3]]}
                speed={3}
                bold={descriptionsBold[3]}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Bottom sentinel right after breakit_7 */}
      <div ref={endRef} className="h-0.5" />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Root Component                                                             */
/* -------------------------------------------------------------------------- */

export default function Parallax() {
  const { scrollYProgress } = useScroll();

  // Progress bar animation at the bottom.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.1,
  });

  return (
    <main className="flex flex-col h-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg text-white">
      {/* Top title */}
      <span className="md:mt-16 sm:mt-8 mt-6 md:ml-8">
        <Typewriter lines={["BreakIt"]} speed={35} bold={["BreakIt"]} />
      </span>

      {/* Scroll Snap Container */}
      <div className="snap-y snap-mandatory">
        {/* Intro cards */}
        {[0, 1, 2].map((id) => (
          <ImageCard
            key={id}
            id={id}
            title={titles[id]}
            description={descriptions[id]}
            bold={descriptionsBold[id]}
          />
        ))}

        {/* Extra images with persistent overlay */}
        <ExtraSection ids={[3, 4, 5, 6, 7]} />

        {/* Progress bar */}
        <motion.div
          className="fixed bottom-12 left-0 right-0 h-1 bg-white origin-left"
          style={{ scaleX }}
        />
      </div>
    </main>
  );
}
