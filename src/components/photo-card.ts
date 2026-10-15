import { html } from "../lib/html";
import type { Photo } from "../data/types";

// → template-parts/photo-card.php
// `sale` shows the price and links to the purchase detail; only pass it for
// licensable listings. Call as `.map(p => photoCard(p))`, never `.map(photoCard)`,
// or the array index lands in `sale` and leaks prices.
export const photoCard = (p: Photo, sale = false, staticCard = false) => {
  const body = html`
    <figure><img src="${p.image}" alt="${p.title}"></figure>
    <p>${p.date}</p>
    <h3>${p.title}</h3>
    ${sale ? html`<small>${p.price}</small>` : ""}`;
  const href = sale ? `#contact/${p.id}` : "#archive";
  return html`<article class="photo-card">${staticCard ? body : html`<a href="${href}">${body}</a>`}</article>`;
};
