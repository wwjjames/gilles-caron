import type { DocEntry } from "./types";
import { photos } from "./photos";

// Mock entries; all of them currently link to the same book detail page.
export const docEntries: DocEntry[] = [
  { title: "Notes from the Archive", date: "18 September 2026", category: "Book", image: photos[0].image },
  { title: "The Photographer’s Eye", date: "06 July 2026", category: "Film", image: photos[1].image },
  { title: "Proof Sheet: An Archive in Motion", date: "28 March 2026", category: "Film", image: photos[2].image },
  { title: "Gilles Caron in Context", date: "12 January 2026", category: "Price", image: photos[3].image },
];
