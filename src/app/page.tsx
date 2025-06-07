"use client"

import { FaGithub, FaLinkedin } from "react-icons/fa"
import { Typewriter } from "react-simple-typewriter"

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden bg-[#EFF1F3] font-sans">
      {/* ───────────────────────── HEADER ───────────────────────── */}
      <header className="absolute top-0 inset-x-0 h-16 flex items-center justify-end px-6 z-10 text-lg font-medium text-gray-800">
        <p>Resume</p>
      </header>

      {/* ───────────────────────── MAIN CONTENT ───────────────────────── */}
      <main className="flex flex-col h-full max-w-2/3 px-6 text-9xl font-light text-gray-800">
        <span className="mt-16 ml-8">
          <Typewriter
            words={["Hello, I'm Josh, a software developer who loves creating for a purpose."]}
            loop={1}
            cursorStyle='|'
            typeSpeed={30}
            deleteSpeed={Infinity}
            delaySpeed={Number.POSITIVE_INFINITY}
          />
        </span>
      </main>

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
