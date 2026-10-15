// Content types for the demo. Each one is expected to become a WordPress
// custom post type (or WooCommerce product, for licensable photos) with
// matching custom fields when the theme is built.

export type Photo = {
  id: string;
  date: string;
  title: string;
  place: string;
  image: string;
  available: boolean;
  price?: string;
};

export type DocCategory = "Film" | "Book" | "Price";

export type DocEntry = {
  title: string;
  date: string;
  category: DocCategory;
  image: string;
};

export type Exhibition = {
  title: string;
  dates: string;
  venue: string;
};
