// ─────────────────────────────────────────────────────────────
//  All the words on the site live here. Edit freely.
//  Each `panels` entry opens when its paper cutout is clicked.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Daniel",
  title: "Daniel — Designer & Developer",
  tagline: "product design · development · 3D",
  description:
    "Daniel's paper portfolio — product design, development and 3D work.",
  introHint: "scroll / drag up & down to wander around",
};

export const panels = {
  about: {
    title: "About me",
    kicker: "hello!",
    body: [
      "I'm Daniel, a solo founder and designer based in Dar es Salaam.",
      "I work across product design, development and 3D in Blender — usually all three on the same project.",
      "Replace this paragraph with what you care about, how you work, and what you're looking for.",
    ],
    links: [],
  },

  willem: {
    title: "Willem",
    kicker: "desktop app · Mac + Windows",
    body: [
      "A desktop productivity companion built with Electron and React.",
      "Write a sentence or two about the problem it solves, your role, and one decision you're proud of.",
    ],
    links: [],
  },

  accountable: {
    title: "Accountable",
    kicker: "mobile app",
    body: [
      "A mobile app built around accountability.",
      "Describe the core loop, who it's for, and where it is today.",
    ],
    links: [],
  },

  bridgeai: {
    title: "BridgeAI",
    kicker: "social venture",
    body: [
      "A social venture connecting young people who have ideas with real opportunities, with a Socratic AI guide along the way.",
      "Add the outcome or a number that shows impact.",
    ],
    links: [],
  },

  rise: {
    title: "Rise Finalist 2023",
    kicker: "recognition",
    body: ["Finalist in 2023 for climate change awareness work. Add a line about the project."],
    links: [],
  },

  blender: {
    title: "3D & Blender",
    kicker: "renders · toon shading · motion",
    body: [
      "Stylised renders and animation made in Blender and composited in After Effects.",
      "Drop in a few stills or a reel link here.",
    ],
    links: [],
  },

  contact: {
    title: "Say hi",
    kicker: "contact",
    body: ["Open to collaborations and freelance design + dev work."],
    links: [
      { label: "GitHub — @Mchawikaraba", href: "https://github.com/Mchawikaraba" },
      { label: "Email (add yours in src/content.js)", href: "mailto:you@example.com" },
    ],
  },
};
