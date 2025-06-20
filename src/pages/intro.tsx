"use client"

import { FaGithub, FaLinkedin } from "react-icons/fa"
import Image from "next/image"
import { useRef, useEffect } from "react"
import Typewriter from "@/components/Typewriter"
import { useCursorContext } from "@/contexts/CursorContext"

export default function Intro() {
  const resumeRef = useRef<HTMLAnchorElement>(null)
  const githubRef = useRef<HTMLAnchorElement>(null)
  const linkedinRef = useRef<HTMLAnchorElement>(null)
  const { setTargets } = useCursorContext()

  useEffect(() => {
    setTargets([githubRef, linkedinRef, resumeRef])
    return () => setTargets([])
  }, [setTargets])

  return (
    <div className="h-screen">
      {/* ───────────────────────── HEADER ───────────────────────── */}
      <header className="absolute top-0 inset-x-0 h-16 flex items-center justify-end px-6 z-10 sm:text-lg text-sm font-medium text-black">
        <p>
          <a
            ref={resumeRef}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </p>
      </header>

      {/* ───────────────────────── MAIN CONTENT ───────────────────────── */}
      <main className="flex flex-col h-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-lg font-light text-black">
        <span className="md:mt-16 sm:mt-8 mt-6 md:ml-8">
          <Typewriter
            lines={[
              "Hello, I'm Josh,",
              "a software developer who loves",
              "creating for a purpose.",
            ]}
            speed={35}
            bold={["Josh", "software", "developer", "purpose"]}
          />
        </span>
      </main>

      {/* ─────────────── GRADUATE IMAGE ─────────────── */}
      <Image
        src="/graduate.svg"
        alt="Graduate"
        width={288}
        height={288}
        priority
        className="absolute bottom-0 right-1/12 h-3/8 sm:h-4/8 md:h-5/8 w-auto z-0"
      />

      {/* ───────────────────────── FOOTER ───────────────────────── */}
      <footer className="absolute bottom-0 inset-x-0 h-12 flex items-center justify-start px-6 z-10 space-x-4">
        <a
          ref={githubRef}
          href="https://github.com/jcharpi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <FaGithub className="w-6 h-6 text-black hover:text-gray-600 transition" />
        </a>
        <a
          ref={linkedinRef}
          href="https://www.linkedin.com/in/josh-charpentier-79b1b9253/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin className="w-6 h-6 text-black hover:text-gray-600 transition" />
        </a>
      </footer>
    </div>
  )
}
