import { html } from "../lib/html";
import { docEntries } from "../data/documentation";
import type { DocCategory, DocEntry } from "../data/types";

// Categories are fixed by the client for now: Film / Book / Price.
const categories: DocCategory[] = ["Film", "Book", "Price"];

const entry = (d: DocEntry) => html`
  <article data-type="${d.category}">
    <img src="${d.image}" alt="">
    <p>${d.date}</p>
    <small>${d.category}</small>
    <h2>${d.title}</h2>
    <p>A mock documentation entry demonstrating the news-list structure for related archive material.</p>
    <a class="link" href="#documentation/item">Read more ↗</a>
  </article>`;

// → archive-documentation.php
export const render = () => html`
  <main class="page documentation">
    <nav class="subnav">${categories.map((c, i) => html`<button${i === 0 ? ` class="active"` : ""} data-doc="${c}">${c}</button>`).join("")}</nav>
    <section class="doc-grid" id="doc-grid">${docEntries.map(d => entry(d)).join("")}</section>
  </main>`;

export const mount = () => {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-doc]");
  buttons.forEach(b =>
    b.addEventListener("click", () => {
      buttons.forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      document.querySelectorAll<HTMLElement>(".doc-grid article").forEach(x => (x.hidden = x.dataset.type !== b.dataset.doc));
    }),
  );
};
