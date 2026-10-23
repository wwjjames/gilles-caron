import { header } from "./components/header";
import { footer } from "./components/footer";
import * as home from "./pages/home";
import * as archive from "./pages/archive";
import * as biography from "./pages/biography";
import * as collaboration from "./pages/collaboration";
import * as univers from "./pages/univers";
import * as exhibition from "./pages/exhibition";
import * as exhibitionDetail from "./pages/exhibition-detail";
import * as contact from "./pages/contact";
import * as photoDetail from "./pages/photo-detail";
import * as legal from "./pages/legal";
import { universCategories } from "./data/univers";
import type { UniversCategory } from "./data/types";

type View = { html: string; mount?: () => void };

const isUniversCategory = (s: string): s is UniversCategory => universCategories.some(c => c.slug === s);

// Hash routes stand in for WordPress permalinks in the demo:
// #univers/<category>, #exhibition/<slug>, #legal/<slug>, #contact/<photo id>.
const resolve = (parts: string[]): View | undefined => {
  const [section, a, b] = parts;
  switch (section) {
    case "home": return { html: home.render(), mount: home.mount };
    case "archive": return { html: archive.render(), mount: archive.mount };
    case "biography": return { html: biography.render() };
    case "collaboration": return { html: collaboration.render() };
    case "univers":
      if (!a) return { html: univers.render() };
      if (!isUniversCategory(a) || b) return undefined;
      return { html: univers.render(a) };
    case "exhibition":
      if (!a) return { html: exhibition.render(), mount: exhibition.mount };
      return wrap(exhibitionDetail.render(a));
    case "contact":
      if (!a) return { html: contact.render(), mount: contact.mount };
      return { html: photoDetail.render(a, true) };
    case "legal": return wrap(legal.render(a));
  }
  return undefined;
};

const wrap = (html: string | undefined): View | undefined => (html === undefined ? undefined : { html });

// Old Documentation links now point to Univers.
const redirects: Record<string, string> = { documentation: "univers" };

export const render = () => {
  const route = location.hash.slice(1) || "home";
  if (redirects[route]) {
    location.replace(`#${redirects[route]}`);
    return;
  }
  const parts = route.split("/");
  // Unknown routes fall back to the home page.
  const resolved = resolve(parts);
  const view = resolved ?? { html: home.render(), mount: home.mount };
  // innerHTML replaces the whole page, so interactions are re-bound on every route change.
  document.querySelector<HTMLDivElement>("#root")!.innerHTML = header(resolved ? parts[0] : "home") + view.html + footer();
  view.mount?.();
  scrollTo({ top: 0, behavior: "instant" });
};
