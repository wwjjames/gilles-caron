import { header } from "./components/header";
import { footer } from "./components/footer";
import * as home from "./pages/home";
import * as archive from "./pages/archive";
import * as biography from "./pages/biography";
import * as contact from "./pages/contact";
import * as documentation from "./pages/documentation";
import * as exhibition from "./pages/exhibition";
import * as bookDetail from "./pages/book-detail";
import * as exhibitionDetail from "./pages/exhibition-detail";
import * as photoDetail from "./pages/photo-detail";

type View = { html: string; mount?: () => void };

// Hash routes stand in for WordPress permalinks in the demo.
const resolve = (route: string): View => {
  switch (route) {
    case "home": return { html: home.render(), mount: home.mount };
    case "archive": return { html: archive.render(), mount: archive.mount };
    case "biography": return { html: biography.render() };
    case "contact": return { html: contact.render(), mount: contact.mount };
    case "documentation": return { html: documentation.render(), mount: documentation.mount };
    case "exhibition": return { html: exhibition.render() };
    case "documentation/item": return { html: bookDetail.render() };
    case "exhibition/item":
    case "exhibition/detail": return { html: exhibitionDetail.render() };
  }
  if (route.startsWith("contact/")) return { html: photoDetail.render(route.split("/")[1], true) };
  // Archive cards are display-only; any archive/* route shows the list itself.
  if (route.startsWith("archive/")) return { html: archive.render() };
  // Unknown routes fall back to Documentation without its filter wiring (v0.1 behaviour).
  return { html: documentation.render() };
};

export const render = () => {
  const route = location.hash.slice(1) || "home";
  const view = resolve(route);
  // innerHTML replaces the whole page, so interactions are re-bound on every route change.
  document.querySelector<HTMLDivElement>("#root")!.innerHTML = header() + view.html + footer();
  view.mount?.();
};
