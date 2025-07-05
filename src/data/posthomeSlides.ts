export type Slide = {
  image: number
  lines: string[]
  bold?: string[]
}

export const SLIDES: Slide[] = [
  {
    image: 0,
    lines: ["Welcome!"],
    bold: ["Welcome"],
  },
  {
    image: 1,
    lines: ["I'm Josh"],
    bold: ["Josh"],
  },
  {
    image: 2,
    lines: ["Check out my work"],
    bold: ["work"],
  },
]
