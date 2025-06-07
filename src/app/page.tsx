"use client"

import Image from "next/image"
import Typewriter from "@/components/Typewriter"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden bg-[#EFF1F3] font-sans">
      {/* ───────────────────────── HEADER ───────────────────────── */}
      <header className="absolute top-0 inset-x-0 h-16 flex items-center justify-end px-6 z-10 sm:text-lg text-sm font-medium text-gray-800">
        <p>Resume</p>
      </header>

      {/* ───────────────────────── MAIN CONTENT ───────────────────────── */}
      <main className="flex flex-col h-full px-6 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-light text-gray-800">
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
        className="absolute bottom-0 right-1/12 sm:right-1/6 w-sm sm:w-md md:w-2xl h-auto z-0"
      />

      {/* ───────────────────────── FOOTER ───────────────────────── */}
      <footer className="absolute bottom-0 inset-x-0 h-12 flex items-center justify-start px-6 z-10 space-x-4">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <FaGithub className="w-6 h-6 text-gray-800 hover:text-gray-600 transition" />
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin className="w-6 h-6 text-gray-800 hover:text-gray-600 transition" />
        </a>
      </footer>
    </div>
  )
}
