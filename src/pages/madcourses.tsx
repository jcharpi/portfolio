"use client";

import { motion, useScroll, useSpring, useInView } from "motion/react";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import { CARDS, Card } from "@/data/madcoursesCards";
import { useCursorContext } from "@/contexts/CursorContext";
import {
  headerLayout,
  headerSpacing,
  headerTextWhite,
  mainLayout,
  mainSpacing,
  mainTextWhite,
  heroMargin,
  progressBar,
} from "@/styles/classes";

function ImageCard({ card }: { card: Card }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section className="relative min-h-screen snap-start">
      {card.icon && (
        <Image
          src={`/icons/${card.icon}`}
          alt="Tech used icon"
          width={512}
          height={512}
          aria-hidden
          className="hidden lg:block absolute left-[27%] -translate-x-1/2 -translate-y-1/6 w-[30vw] opacity-75 invert pointer-events-none -z-10"
        />
      )}

      <div className="relative flex justify-center items-center">
        <Image
          src={`/madcourses/madcourses_${card.image}.png`}
          alt="MadCourses screenshot"
          width={1920}
          height={1080}
          priority
          className="max-h-[750px] w-auto m-2 object-contain"
        />
      </div>

      <div 
        ref={ref} 
        className="min-h-[24rem] mt-20 lg:my-20 mx-0 lg:mx-20 text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-white pointer-events-none select-none text-justify"
      >
        {inView && (
          <>
            <Typewriter lines={card.titleLines} speed={35} bold={[card.titleLines[0]]} />
            <div className="text-lg md:text-2xl lg:text-3xl font-medium mt-4 text-neutral-100">
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
    <div className="relative">
      <header className={`${headerLayout} ${headerSpacing} ${headerTextWhite}`}>
        <a ref={resumeRef} href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </header>

      {/* Content */}
      <main className={`${mainLayout} ${mainSpacing} ${mainTextWhite}`}>
        <span className={`${heroMargin} mb-12`}>
          <Typewriter lines={["MadCourses"]} speed={35} bold={["MadCourses"]} />
        </span>

        <div className="snap-y snap-mandatory">
          {CARDS.map((card, idx) => (
            <ImageCard key={idx} card={card} />
          ))}

          {/* Progress bar */}
          <motion.div style={{ scaleX }} className={`${progressBar} bg-white`} />
        </div>
      </main>
    </div>
  );
}
