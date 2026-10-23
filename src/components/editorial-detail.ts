import { html } from "../lib/html";
import type { Fact } from "../data/types";

type EditorialDetail = {
  back: { href: string; label: string };
  label: string;
  title: string;
  image: string;
  lead: string;
  facts: Fact[];
  body: string[];
  heroClass?: string;
};

// → template-parts/editorial-detail.php, shared by Univers entries and exhibitions.
export const editorialDetail = (d: EditorialDetail) => html`
  <main class="editorial-detail">
    <a class="back" href="${d.back.href}">← ${d.back.label}</a>
    <section class="editorial-hero${d.heroClass ? ` ${d.heroClass}` : ""}">
      <figure><img src="${d.image}" alt="${d.title}"></figure>
      <div>
        <p class="label">${d.label}</p>
        <h1>${d.title}</h1>
        <p class="lead">${d.lead}</p>
        <dl>${d.facts.map(([dt, dd]) => html`<div><dt>${dt}</dt><dd>${dd}</dd></div>`).join("")}</dl>
      </div>
    </section>
    <article>${d.body.map(p => html`<p>${p}</p>`).join("")}</article>
  </main>`;
