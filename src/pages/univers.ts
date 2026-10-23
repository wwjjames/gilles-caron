import { html } from "../lib/html";
import { books, film, press, universCategories } from "../data/univers";
import type { UniversCategory } from "../data/types";

// Edition: the card grid as before, without detail pages.
const edition = () => html`
  <section class="doc-grid book-grid">${books.map(b => html`
    <article>
      <div class="book-cover">${b.cover ? html`<img src="${b.cover}" alt="${b.title}">` : html`<span>Cover</span>`}</div>
      <p>${b.year}</p>
      <h2>${b.title}</h2>
      ${b.publisher ? html`<p class="book-meta">${b.publisher}</p>` : ""}
      ${b.author ? html`<p class="book-meta">${b.author}</p>` : ""}
    </article>`).join("")}</section>`;

// Production: "theatre" mode — a dark full-width band around the trailer.
const production = () => html`
  <section class="theatre">
    <div class="theatre-player">
      <iframe src="https://www.youtube-nocookie.com/embed/${film.youtubeId}?start=${film.startSeconds}&rel=0" title="${film.title} — trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div class="theatre-info">
      <div>
        <p class="label">Documentary · Trailer</p>
        <h2>${film.title}</h2>
        <p>${film.credit}</p>
      </div>
      <ul>${film.links.map(l => html`<li><span class="label">${l.label}</span><a href="${l.url}" target="_blank" rel="noopener">${l.title} ↗</a></li>`).join("")}</ul>
    </div>
  </section>`;

// Parution: one row per press item — outlet logo on the left, title and year on the right.
const parution = () => html`
  <ul class="press-list">${press.map(p => html`
    <li>
      <span class="press-logo"><img src="${p.logo}" alt="${p.outlet}"></span>
      <span class="press-text">
        <a href="${p.url}" target="_blank" rel="noopener">${p.title} ↗</a>
        <span class="press-meta">${p.year}${p.author ? ` · ${p.author}` : ""}</span>
      </span>
    </li>`).join("")}</ul>`;

const sections: Record<UniversCategory, () => string> = { edition, production, parution };

// → page-univers.php. Each tab is its own route (#univers/edition …).
export const render = (category: UniversCategory = universCategories[0].slug) => html`
  <main class="page univers">
    <nav class="subnav" aria-label="Univers">${universCategories.map(c => html`<a href="#univers/${c.slug}"${c.slug === category ? ` class="active" aria-current="page"` : ""}>${c.label}</a>`).join("")}</nav>
    ${sections[category]()}
  </main>`;
