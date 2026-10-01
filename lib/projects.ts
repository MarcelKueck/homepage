import { PROJECT_LINKS } from "./links";

export const PROJECT_CATEGORIES = ["hardware", "robotics", "research", "software", "ventures"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

type ProjectMeta = {
  image: string;
  categories: readonly ProjectCategory[];
  href?: string;
};

// Order here is the order on the projects page. Copy lives in
// messages/*.json under projects.items.<key>.
const PROJECT_DATA = {
  oxfordBioreactor: {
    image: "/projects/oxford-bioreactor.jpg",
    categories: ["research", "hardware"],
  },
  coffeeRoaster: {
    image: "/projects/coffee-roaster.jpg",
    categories: ["hardware"],
    href: PROJECT_LINKS.coffeeRoaster,
  },
  leRobot: {
    image: "/projects/le-robot.jpg",
    categories: ["robotics", "hardware"],
    href: PROJECT_LINKS.leRobot,
  },
  openArm: {
    image: "/projects/open-arm.jpg",
    categories: ["robotics", "research"],
    href: PROJECT_LINKS.openArm,
  },
  laMarcello: {
    image: "/projects/la-marcello.jpg",
    categories: ["hardware"],
    href: PROJECT_LINKS.laMarcello,
  },
  motionSports: {
    image: "/projects/motion-sports-16-10.jpg",
    categories: ["software"],
  },
  mdkEngineeringBot: {
    image: "/projects/mdk-engineering-bot-4-3.jpg",
    categories: ["software"],
    href: PROJECT_LINKS.mdkEngineeringBot,
  },
  rustyRobots: {
    image: "/projects/rusty-robots.jpg",
    categories: ["robotics", "software"],
    href: PROJECT_LINKS.rustyRobots,
  },
  rustML: {
    image: "/projects/rust-ml.jpg",
    categories: ["software"],
    href: PROJECT_LINKS.rustML,
  },
  marieLouCoffee: {
    image: "/projects/marie-lou-coffee-4-3.jpg",
    categories: ["ventures"],
    href: PROJECT_LINKS.marieLouCoffee,
  },
  rechnungsApi: {
    image: "/projects/rechnungs-api.jpg",
    categories: ["ventures", "software"],
    href: PROJECT_LINKS.rechnungsApi,
  },
  shareYourSpace: {
    image: "/projects/share-your-space.jpg",
    categories: ["ventures", "software"],
    href: PROJECT_LINKS.shareYourSpace,
  },
  murph: {
    image: "/projects/murph.jpg",
    categories: ["software"],
    href: PROJECT_LINKS.murph,
  },
  svEsting: {
    image: "/projects/sv-esting.jpg",
    categories: ["software"],
    href: PROJECT_LINKS.svEsting,
  },
} satisfies Record<string, ProjectMeta>;

export type ProjectKey = keyof typeof PROJECT_DATA;
export const PROJECTS: Record<ProjectKey, ProjectMeta> = PROJECT_DATA;
export const PROJECT_KEYS = Object.keys(PROJECTS) as ProjectKey[];

// Shown on the home page, chosen to cover the range: research hardware,
// a connected device, robot learning and an AI system for a client.
export const FEATURED_PROJECTS: ProjectKey[] = [
  "oxfordBioreactor",
  "coffeeRoaster",
  "leRobot",
  "motionSports",
];
