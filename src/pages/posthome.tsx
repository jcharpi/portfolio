"use client"

import Typewriter from "@/components/Typewriter"
import { mainLayout, mainSpacing, mainTextBlack } from "@/styles/classes"

export default function PostHome() {
  return (
    <main
      className={`${mainLayout} ${mainSpacing} ${mainTextBlack} h-screen flex items-center justify-center`}
    >
      <Typewriter
        lines={["Thanks for visiting!", "Feel free to explore more soon."]}
        speed={35}
        bold={["Thanks", "explore"]}
      />
    </main>
  )
}
