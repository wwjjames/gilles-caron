import type { Exhibition, ExhibitionStatus } from "./types";

// Mock programme — titles, venues, dates and text are placeholders.
export const exhibitions: Exhibition[] = [
  {
    slug: "contact-sheets-public-memory",
    title: "Contact Sheets / Public Memory",
    venue: "Fondation du Regard",
    city: "Lyon",
    start: "2027-02-14",
    end: "2027-05-18",
    dates: "14 Feb — 18 May 2027",
    image: "/assets/stairwell.png",
    summary: "A forthcoming exhibition built around contact sheets and the choices that shaped published images.",
    facts: [["Venue", "Fondation du Regard, Lyon"], ["Curator", "To be confirmed"]],
    body: ["Placeholder text for a forthcoming exhibition: curatorial introduction, visitor information and partners."],
  },
  {
    slug: "the-returning-image",
    title: "Gilles Caron: The Returning Image",
    venue: "Maison de la Photographie",
    city: "Paris",
    start: "2026-09-12",
    end: "2026-11-24",
    dates: "12 Sep — 24 Nov 2026",
    image: "/assets/mock-exhibition.png",
    summary: "A proposed exhibition tracing the movement between assignments, contact sheets and the images that entered public memory.",
    facts: [["Venue", "Maison de la Photographie, Paris"], ["Curator", "To be confirmed"]],
    body: [
      "The exhibition detail template gives room for a curatorial introduction, visitor information, participating partners and a sequence of installation images.",
      "All titles, dates, venues and text shown here are placeholders for client review and do not represent a confirmed programme.",
    ],
  },
  {
    slug: "a-witness-in-the-street",
    title: "A Witness in the Street",
    venue: "Galerie Lumière",
    city: "Brussels",
    start: "2025-10-03",
    end: "2026-01-11",
    dates: "3 Oct 2025 — 11 Jan 2026",
    image: "/assets/hero-pool.png",
    summary: "A past exhibition (mock) of street photographs from the late 1960s.",
    facts: [["Venue", "Galerie Lumière, Brussels"], ["Curator", "To be confirmed"]],
    body: ["Placeholder text for a past exhibition."],
  },
  {
    slug: "folded-time",
    title: "Folded Time",
    venue: "Centre d'art du Littoral",
    city: "Marseille",
    start: "2024-05-17",
    end: "2024-09-01",
    dates: "17 May — 1 Sep 2024",
    image: "/assets/coastal-chair.png",
    summary: "A past exhibition (mock) pairing photographs with archival documents.",
    facts: [["Venue", "Centre d'art du Littoral, Marseille"], ["Curator", "To be confirmed"]],
    body: ["Placeholder text for a past exhibition."],
  },
  {
    slug: "the-reporters-table",
    title: "The Reporter’s Table",
    venue: "Musée de l'Image",
    city: "Geneva",
    start: "2023-02-09",
    end: "2023-06-04",
    dates: "9 Feb — 4 Jun 2023",
    image: "/assets/textile-still-life.png",
    summary: "A past exhibition (mock) on the working tools of photojournalism.",
    facts: [["Venue", "Musée de l'Image, Geneva"], ["Curator", "To be confirmed"]],
    body: ["Placeholder text for a past exhibition."],
  },
];

export const statusLabels: Record<ExhibitionStatus, string> = {
  upcoming: "Upcoming",
  current: "Current",
  past: "Past",
};

// Derived from the dates so the programme moves on by itself (→ the same rule in PHP).
export const exhibitionStatus = (x: Exhibition, today = new Date().toISOString().slice(0, 10)): ExhibitionStatus =>
  today < x.start ? "upcoming" : today > x.end ? "past" : "current";

const statusOrder: ExhibitionStatus[] = ["upcoming", "current", "past"];

// Upcoming first, then current, then past; most recent first within each group.
export const sortedExhibitions = () =>
  [...exhibitions].sort(
    (a, b) => statusOrder.indexOf(exhibitionStatus(a)) - statusOrder.indexOf(exhibitionStatus(b)) || b.start.localeCompare(a.start),
  );

// Home page feature: the current exhibition, otherwise the next upcoming one, otherwise the latest.
export const featuredExhibition = () => {
  const current = exhibitions.filter(x => exhibitionStatus(x) === "current");
  const upcoming = exhibitions.filter(x => exhibitionStatus(x) === "upcoming").sort((a, b) => a.start.localeCompare(b.start));
  return current[0] ?? upcoming[0] ?? sortedExhibitions()[0];
};
