export type Card = {
  image: number
  icon?: string
  titleLines: string[]
  descLines: string[]
  bold: string[]
}

export const CARDS: Card[] = [
  {
    image: 1,
    titleLines: ["What is MadCourses..."],
    descLines: [
      "MadCourses is a tool I built in my final months in college. I was thinking back on what I  wish I had. I knew I wanted to major in computer science back in elementary school and I knew what many companies were asking for, but what did that mean for me in college? How ccould I maximize my time? I would have loved a tool that told me which class most directly matches job skills with courses from UW-Madison, so I developed MadCourses."
    ],
    bold: [
      "MadCourses",
      "tool",
      "college",
      "computer",
      "science",
      "companies",
      "maximize",
      "job",
      "skills",
      "courses"
    ]
  },
  {
    image: 2,
    icon: "postgresql.svg",
    titleLines: ["...and what’s going on under the hood?"],
    descLines: [
      "I took the publicly available course registry from UW-Madison’s website and turned that into a PostgreSQL database with a python script I wrote. I then used a LLM to transform course descriptions into a set of vectors to be matched against a set of vectors created by user-entered skills. The more similar these vector sets are, the more likely that course corresponds to that skill."
    ],
    bold: [
      "PostgreSQL",
      "database",
      "python",
      "LLM",
      "vectors",
      "skills",
      "course"
    ]
  },
  {
    image: 1,
    icon: "svelte.svg",
    titleLines: ["What I wanted to learn"],
    descLines: [
      "As mentioned, the primary focus for me was the database side of things. I noticed that having experience with PostgreSQL would be useful because of how prevalent it is in the industry. This also helped me avoid having to locally some type of course directory, improving user experience. Furthermore, I wanted more front-end development skill aside from React and React Native alone. I had heard of Svelte as an emerging, arguably more streamlined framework so I decided early on that I would make a user interface with Svelte. My Svelte UI is dynamic and makes filtering courses easy, furthering the capabilities of MadCourses."
    ],
    bold: [
      "database",
      "PostgreSQL",
      "user",
      "experience",
      "front-end",
      "Svelte",
      "dynamic",
      "filtering",
      "courses"
    ]
  }
]
