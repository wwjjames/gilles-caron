import { exhibitions, exhibitionStatus, statusLabels } from "../data/exhibitions";
import { editorialDetail } from "../components/editorial-detail";

// → single-exhibition.php. Returns undefined for an unknown exhibition so the router can fall back.
export const render = (slug: string) => {
  const x = exhibitions.find(e => e.slug === slug);
  if (!x) return undefined;
  return editorialDetail({
    back: { href: "#exhibition", label: "Exhibition" },
    label: `${statusLabels[exhibitionStatus(x)]} · ${x.dates}`,
    title: x.title,
    image: x.image,
    lead: x.summary,
    facts: [...x.facts, ["Dates", x.dates]],
    body: x.body,
    heroClass: "exhibition-detail-hero",
  });
};
