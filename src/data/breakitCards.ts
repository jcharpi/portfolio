export type Card = {
  /** Image index used for the initial screenshot */
  image: number
  /** Lines for the title typewriter */
  titleLines: string[]
  /** Lines for the description typewriter */
  descLines: string[]
  /** Words that should be bold in the description */
  bold: string[]
}

export const CARDS: Card[] = [
  {
    image: 0,
    titleLines: ["Welcome to BreakIt!"],
    descLines: [
      "I’ve always believed in building with purpose. One of the strongest motivators for me to create something occurs when I believe I can solve a problem that both myself and others could benefit from. BreakIt was born when my dad pointed out my nail-picking habit, and I thought, 'There has to be a way to track this and stay accountable.' As you explore the app, I’ll walk you through the technologies that bring it to life. Enjoy! 🎉",
    ],
    bold: [
      "purpose",
      "problem",
      "others",
      "could",
      "benefit",
      "from",
      "technologies",
      "Enjoy",
    ],
  },
  {
    image: 1,
    titleLines: ["My Goals"],
    descLines: [
      "When I begin a new project, I start by identifying the technologies I want to learn, though inevitably, additional tools emerge as development unfolds. BreakIt was my first React Native app, building on my existing React experience and giving me hands-on insight into cross-platform mobile development, which offers clear advantages over maintaining separate native codebases. Furthermore, I also set out to deepen my understanding of integrating TypeScript within the React Native library and persisting data on app close.",
    ],
    bold: ["learn", "React", "Native", "TypeScript", "persisting", "data"],
  },
  {
    image: 2,
    titleLines: ["The Challenge"],
    descLines: [
      "My greatest challenge in developing BreakIt was managing several nested Context providers, which quickly led to tangled and confusing state handling. To resolve this, I adopted Redux Toolkit, a library that consolidates state management with persistence, stores, and reducers. Although learning Redux Toolkit required me to step beyond the React material covered in my university’s Building User Interfaces course and refactor much of my codebase, it proved to be the perfect solution for my Context issues and introduced me to a powerful state-management tool I’ll continue using in future projects.",
    ],
    bold: [
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
  },
  {
    image: 3,
    titleLines: ["What's Different?"],
    descLines: [
      "Although many habit-tracking apps exist, I wanted BreakIt to stand out with a more visual, less declarative design free of unnecessary complexity. I created a clean, intuitive interface that places users’ progress front and center—eliminating clutter while keeping the experience engaging thanks to the dynamic art created by my friend. Some features now invite exploration on the user’s part, striking a balance between simplicity and discoverability. 🎨",
    ],
    bold: [
      "clean",
      "intuitive",
      "interface",
      "dynamic",
      "exploration",
      "simplicity",
      "discoverability",
    ],
  },
]
