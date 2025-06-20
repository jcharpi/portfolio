"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import Typewriter from "@/components/Typewriter";
import Image from "next/image";

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

const descriptions_bold = [
  [
    "purpose",
    "problem",
    "others",
    "could",
    "benefit",
    "from",
    "technologies",
    "Enjoy",
  ],
  ["learn", "React", "Native", "TypeScript", "persisting", "data"],
  [
    "challenge",
    "Context",
    "state",
    "Redux",
    "Toolkit",
    "React",
    "Building",
    "User",
    "Interfaces",
  ],
  [
    "clean",
    "intuitive",
    "interface",
    "dynamic",
    "exploration",
    "simplicity",
    "discoverability",
  ],
];

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function ImageSection({
  id,
  scrollRef,
}: {
  id: number;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={scrollRef}
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
  );
}

function TextSection({
  scrollRef,
  title,
  description,
  bold,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  title: string;
  description: string;
  bold: string[];
}) {
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const y = useParallax(scrollYProgress, 300);
  const inView = useInView(scrollRef, {
    margin: "0px 0px -800px 0px",
  });

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
  );
}

function ImageOnlySection({ id }: { id: number }) {
  return (
    <section className="h-screen snap-start grid grid-cols-2 items-center">
      <ImageSection id={id} />
      <div className="col-span-1" />
    </section>
  );
}

function StickyText({
  title,
  description,
  bold,
}: {
  title: string;
  description: string;
  bold: string[];
}) {
  return (
    <div className="fixed top-0 right-0 left-0 pointer-events-none select-none mt-16">
      <div className="text-8xl font-bold tracking-tight text-white">
        <Typewriter lines={[title]} speed={35} bold={[title]} />
        <div className="text-4xl font-medium mt-4 mr-20 text-neutral-100">
          <Typewriter lines={[description]} speed={3} bold={bold} />
        </div>
      </div>
    </div>
  );
}

function BreakItSection({
  id,
  title,
  description,
  bold,
  sectionRef,
}: {
  id: number;
  title: string;
  description: string;
  bold: string[];
  sectionRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const ref = sectionRef ?? innerRef;

  return (
    <section className="h-screen snap-start grid grid-cols-2 items-center">
      <ImageSection id={id} scrollRef={ref} />
      <TextSection
        scrollRef={ref}
        title={title}
        description={description}
        bold={bold}
      />
    </section>
  );
}

export default function Parallax() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.1,
  });

  const [showSticky, setShowSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stickyRef);

  useEffect(() => {
    if (!inView) setShowSticky(true);
    else setShowSticky(false);
  }, [inView]);

  return (
    <main className="flex flex-col h-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg text-white">
      <span className="md:mt-16 sm:mt-8 mt-6 md:ml-8">
        <Typewriter lines={["BreakIt"]} speed={35} bold={["BreakIt"]} />
      </span>

      <div className="snap-y snap-mandatory">
        <BreakItSection
          id={1}
          title={titles[0]}
          description={descriptions[0]}
          bold={descriptions_bold[0]}
        />
        <BreakItSection
          id={2}
          title={titles[1]}
          description={descriptions[1]}
          bold={descriptions_bold[1]}
        />
        <BreakItSection
          id={3}
          title={titles[2]}
          description={descriptions[2]}
          bold={descriptions_bold[2]}
          sectionRef={stickyRef}
        />
        {[4, 5, 6, 7].map((img) => (
          <ImageOnlySection key={img} id={img} />
        ))}
        <motion.div
          className="fixed bottom-12 left-0 right-0 h-1 bg-white origin-left"
          style={{ scaleX }}
        />
      </div>
      {showSticky && (
        <StickyText
          title={titles[2]}
          description={descriptions[2]}
          bold={descriptions_bold[2]}
        />
      )}
    </main>
  );
}
