import type { NavItem } from "./types";

// → WordPress menu "Primary". Collaboration is built but stays hidden for the
// early-November launch; set `visible: true` to publish it.
export const navigation: NavItem[] = [
  { label: "Archive", route: "archive", visible: true },
  { label: "Biography", route: "biography", visible: true },
  { label: "Collaboration", route: "collaboration", visible: false },
  { label: "Univers", route: "univers", visible: true },
  { label: "Exhibition", route: "exhibition", visible: true },
];

export const visibleNavigation = navigation.filter(n => n.visible);
