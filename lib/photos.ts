import fs from "node:fs";
import path from "node:path";

// Photos that are not in the repo yet. Drop a file into /public under the
// path on the left and it replaces the fallback on the next build, no code
// change needed. Pages are statically generated, so the check runs at
// build time. Server components only.
export const PHOTO_SLOTS = {
  heroPortrait: { src: "/photos/portrait-workshop.jpg", fallback: "/photos/profile1.jpg" },
  workshopOverview: { src: "/workshop/overview.jpg", fallback: "/photos/3d-printer.jpg" },
  workshopFdm: { src: "/workshop/fdm-printer.jpg" },
  workshopResin: { src: "/workshop/resin-printer.jpg" },
  workshopCnc: { src: "/workshop/cnc.jpg" },
  workshopElectronics: { src: "/workshop/electronics.jpg" },
} satisfies Record<string, { src: string; fallback?: string }>;

export type PhotoSlot = keyof typeof PHOTO_SLOTS;

function existsInPublic(publicPath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", publicPath));
  } catch {
    return false;
  }
}

type Resolved<K extends PhotoSlot> = (typeof PHOTO_SLOTS)[K] extends { fallback: string }
  ? string
  : string | undefined;

/** Resolved image path for a slot: the new photo if it exists, otherwise
 *  the fallback (undefined for slots without one). */
export function photo<K extends PhotoSlot>(slot: K): Resolved<K> {
  const entry: { src: string; fallback?: string } = PHOTO_SLOTS[slot];
  return (existsInPublic(entry.src) ? entry.src : entry.fallback) as Resolved<K>;
}
