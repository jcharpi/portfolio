"use client"

import Typewriter from "@/components/Typewriter"
import { mainLayout, mainSpacing, mainTextBlack } from "@/styles/classes"

export default function PostHome() {
  return (
    <main
      className={`${mainLayout} ${mainSpacing} ${mainTextBlack} h-screen flex items-center justify-center`}
    >
      <Typewriter
        lines={["Learn more about me!"]}
        speed={35}
        bold={["me"]}
      />
    </main>
  )
}
