// Content types for the demo. Each one is expected to become a WordPress
// custom post type (or WooCommerce product, for photos) with matching custom
// fields when the theme is built.

export type Photo = {
  id: string;
  date: string;
  title: string;
  place: string;
  image: string;
  available: boolean;
  price?: string;
};

// Gallery photograph shown on the Archive and home page (not a WooCommerce product).
export type GalleryPhoto = {
  id: string;
  image: string;
  width: number;
  height: number;
  title: string;
  date: string;
  // Ticked each week in WordPress: up to 10 on the Archive, up to 4 on the home page.
  inArchive: boolean;
  onHome: boolean;
};

// Label / value rows shown in a detail page's fact list.
export type Fact = [label: string, value: string];

export type UniversCategory = "edition" | "production" | "parution";

// Edition: books. Publisher and author are optional.
export type Book = {
  title: string;
  year: string;
  cover?: string;
  publisher?: string;
  author?: string;
};

// Production: a documentary shown in a "theatre" player, with links out.
export type Film = {
  title: string;
  credit: string;
  youtubeId: string;
  startSeconds: number;
  links: { label: string; title: string; url: string }[];
};

// Parution: press items listed as rows, each linking to the external article.
export type PressItem = {
  outlet: string;
  logo: string;
  title: string;
  year: string;
  url: string;
  author?: string;
};

export type ExhibitionStatus = "upcoming" | "current" | "past";

export type Exhibition = {
  slug: string;
  title: string;
  venue: string;
  city: string;
  // ISO dates; the status (upcoming / current / past) is derived from them.
  start: string;
  end: string;
  dates: string;
  image: string;
  summary: string;
  facts: Fact[];
  body: string[];
};

export type NavItem = {
  label: string;
  route: string;
  // Hidden items keep their page and route but are left out of menus.
  visible: boolean;
};

export type LegalPage = {
  slug: string;
  title: string;
};
