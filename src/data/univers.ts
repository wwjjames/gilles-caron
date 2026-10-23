import type { Book, Film, PressItem, UniversCategory } from "./types";

// → custom post types (or ACF repeaters) per category. Order of the tabs is fixed.
export const universCategories: { slug: UniversCategory; label: string }[] = [
  { slug: "edition", label: "Edition" },
  { slug: "production", label: "Production" },
  { slug: "parution", label: "Parution" },
];

// Placeholders; the books are added in WordPress.
export const books: Book[] = [
  { title: "Book title", year: "Year", publisher: "Publisher", author: "Author" },
  { title: "Book title", year: "Year", publisher: "Publisher" },
  { title: "Book title", year: "Year" },
];

export const film: Film = {
  title: "Histoire d’un regard",
  credit: "Un film de Mariana Otero",
  youtubeId: "cdJJyFZAHNM",
  startSeconds: 13,
  links: [
    { label: "Watch the full film", title: "mariana-otero.fr", url: "https://mariana-otero.fr/films/histoire-d-un-regard#film-annonce" },
    { label: "Listen", title: "France Culture — Gilles Caron, un regard dans l’histoire", url: "https://www.radiofrance.fr/franceculture/podcasts/le-journal-de-l-histoire/gilles-caron-un-regard-dans-l-histoire-3894208" },
  ],
};

// Placeholders: real logos, placeholder titles and years; links go to each outlet's home page.
export const press: PressItem[] = [
  { outlet: "Le Temps", logo: "/assets/press/le-temps.png", title: "Article title (placeholder)", year: "2025", url: "https://www.letemps.ch/", author: "Author" },
  { outlet: "TV5 Monde", logo: "/assets/press/tv5-monde.png", title: "Interview title (placeholder)", year: "2024", url: "https://www.tv5monde.com/" },
  { outlet: "Photo Trend", logo: "/assets/press/photo-trend.png", title: "Review title (placeholder)", year: "2023", url: "https://phototrend.fr/" },
];
