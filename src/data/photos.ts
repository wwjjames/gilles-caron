import type { Photo } from "./types";

// Mock records — dates, titles, places and prices are placeholders, not archive data.
export const photos: Photo[] = [
  { id: "GC-1967-014", date: "15 May 1967", title: "Rue des Saints-Pères", place: "Paris, France", image: "/assets/hero-pool.png", available: true, price: "€650" },
  { id: "GC-1967-021", date: "02 June 1967", title: "A pause between scenes", place: "Paris, France", image: "/assets/textile-still-life.png", available: false },
  { id: "GC-1968-041", date: "19 January 1968", title: "Low tide", place: "Naxos, Greece", image: "/assets/coastal-chair.png", available: true, price: "€780" },
  { id: "GC-1968-052", date: "08 March 1968", title: "The stairwell", place: "Valencia, Spain", image: "/assets/stairwell.png", available: true, price: "€720" },
  { id: "GC-1968-064", date: "24 April 1968", title: "A room of water", place: "Lisbon, Portugal", image: "/assets/hero-pool.png", available: false },
  { id: "GC-1969-003", date: "03 January 1969", title: "Folded cloth", place: "Milan, Italy", image: "/assets/textile-still-life.png", available: true, price: "€610" },
  { id: "GC-1969-019", date: "18 February 1969", title: "White horizon", place: "Naxos, Greece", image: "/assets/coastal-chair.png", available: false },
  { id: "GC-1969-027", date: "06 March 1969", title: "Afternoon geometry", place: "Valencia, Spain", image: "/assets/stairwell.png", available: true, price: "€690" },
];
