"use client";

import { motion, useScroll, useSpring, useInView } from "motion/react";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import { CARDS, Card } from "@/data/madcoursesCards";
import { useCursorContext } from "@/contexts/CursorContext";

function ImageCard({ card }: { card: Card }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -1000px 0px" });

  return (
    <section className="relative flex h-screen flex-col items-center justify-center snap-start">
      {card.icon && (
        <Image
          src={`/icons/${card.icon}`}
          alt=""
          width={512}
          height={512}
          aria-hidden
          className="absolute left-[27%] -translate-x-1/2 -translate-y-1/3 w-[30vw] opacity-75 invert pointer-events-none -z-10"
        />
      )}

      <div ref={ref} className="relative h-8/12">
        <Image
          src={`/madcourses/madcourses_${card.image}.png`}
          alt="MadCourses screenshot"
          width={1920}
          height={1080}
          priority
          className="h-full w-auto p-2 object-contain"
        />
      </div>

      <div className="mt-6 mb-20 flex h-56 w-9/12 flex-col justify-start px-6 text-left text-8xl font-bold tracking-tight text-white pointer-events-none select-none">
        {inView && (
          <>
            <Typewriter lines={card.titleLines} speed={35} bold={[card.titleLines[0]]} />
            <div className="mt-4 text-4xl font-medium text-neutral-100">
              <Typewriter lines={card.descLines} speed={3} bold={card.bold} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// Page presenting MadCourses with parallax scrolling.
export default function MadCourses() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.1,
  });

  const resumeRef = useRef<HTMLAnchorElement>(null);
  const { setTargets } = useCursorContext();

  useEffect(() => {
    setTargets([resumeRef]);
    return () => setTargets([]);
  }, [setTargets]);

  return (
    <div className="relative text-white mb-8">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-10 flex h-16 items-center justify-end px-6 text-lg font-medium">
        <a ref={resumeRef} href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </header>

      {/* Content */}
      <main className="flex flex-col h-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg text-white">
        <span className="md:mt-16 sm:mt-8 mt-6 md:ml-8">
          <Typewriter lines={["MadCourses"]} speed={35} bold={["MadCourses"]} />
        </span>

        <div className="snap-y snap-mandatory">
          {CARDS.map((card, idx) => (
            <ImageCard key={idx} card={card} />
          ))}

          {/* Progress bar */}
          <motion.div
            style={{ scaleX }}
            className="fixed bottom-12 left-0 right-0 h-1 origin-left bg-white"
          />
        </div>
      </main>
    </div>
  );
}
