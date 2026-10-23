import { html } from "../lib/html";
import type { Photo } from "../data/types";

// → template-parts/photo-card.php. Licensable listing on Contact: shows the price and
// opens the purchase detail. Archive and home photographs use the justified gallery instead.
export const photoCard = (p: Photo) => html`
  <article class="photo-card">
    <a href="#contact/${p.id}">
      <figure><img src="${p.image}" alt="${p.title}"></figure>
      <p>${p.date}</p>
      <h3>${p.title}</h3>
      <small>${p.price}</small>
    </a>
  </article>`;
