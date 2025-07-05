// Structure describing a single info card.
export type Card = {
  /** Image index used for the initial screenshot */
  image: number
  /** Optional icon name . */
  icon?: string
  /** Lines for the title typewriter */
  titleLines: string[]
  /** Lines for the description typewriter */
  descLines: string[]
  /** Words that should be bold in the description */
  bold: string[]
}

// Content used on the BreakIt page.
export const CARDS: Card[] = [
  {
    image: 0,
    titleLines: ["What is MadCourses..."],
    descLines: [
      "MadCourses is a tool I built in my final months in college. I was thinking back on what I would have made my college experience easier. I knew I wanted to major in computer science back in elementary school and I knew what many companies were asking for, but what did that mean for me in college? How ccould I maximize my time? I would have loved a tool that told me which class most directly matches job skills with courses from UW-Madison, so I developed MadCourses.",
    ],
    bold: ["MadCourses", "computer", "science", "job", "skills"],
  },
  {
    image: 1,
    icon: "postgresql.svg",
    titleLines: ["...and what’s going on under the hood?"],
    descLines: [
      "I extracted the public course registry from UW–Madison’s website and converted it into a PostgreSQL database using a custom Python script. Then, I used a large language model to generate vector embeddings for each course description. When a user enters a set of skills, those are similarly embedded and compared against the course vectors using a FastAPI backend hosted on Hugging Face. The closer the vectors, the stronger the match between the course and the skill.",
    ],
    bold: [
      "PostgreSQL",
      "database",
      "Python",
      "large",
      "language",
      "model",
      "embedding",
      "vectors",
      "FastAPI",
      "Hugging",
      "Face",
    ],
  },
  {
    image: 2,
    icon: "svelte.svg",
    titleLines: ["Anything else?"],
    descLines: [
      "While the primary focus of this project was the backend side of things, I wanted to further my front-end development skills to include more than React and React Native alone. I had heard of Svelte as an emerging, arguably more streamlined framework so I decided early on that I would make a user interface with Svelte. My user interface is dynamic and makes filtering courses easy, furthering the capabilities of MadCourses. Ultimately, using Svelte taught me that certain projects benefit from different tools. For something with a simple, one-page UI like MadCourses, Svelte was much more suited for the task than React.",
    ],
    bold: ["backend", "front-end", "Svelte", "dynamic"],
  },
]
