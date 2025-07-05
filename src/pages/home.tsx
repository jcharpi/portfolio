"use client"

import { FaGithub, FaLinkedin } from "react-icons/fa"
import Image from "next/image"
import { useRef, useEffect } from "react"
import Typewriter from "@/components/Typewriter"
import { useCursorContext } from "@/contexts/CursorContext"
import {
  headerLayout,
  headerSpacing,
  headerTextBlack,
  mainLayout,
  mainSpacing,
  mainTextBlack,
  footerLayout,
  footerSpacing,
  iconStyle,
  heroMargin,
  graduatePosition,
  graduateSize,
  graduateZ,
} from "@/styles/classes"

export default function Home() {
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
      <header className={`${headerLayout} ${headerSpacing} ${headerTextBlack}`}>
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

      <main className={`${mainLayout} ${mainSpacing} ${mainTextBlack}`}>
        <span className={heroMargin}>
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

      <Image
        src="/graduate.svg"
        alt="Graduate"
        width={288}
        height={288}
        priority
        className={`${graduatePosition} ${graduateSize} ${graduateZ}`}
      />

      <footer className={`${footerLayout} ${footerSpacing}`}>
        <a
          ref={githubRef}
          href="https://github.com/jcharpi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <FaGithub className={`${iconStyle} text-black`} />
        </a>
        <a
          ref={linkedinRef}
          href="https://www.linkedin.com/in/josh-charpentier-79b1b9253/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin className={`${iconStyle} text-black`} />
        </a>
      </footer>
    </div>
  )
}
