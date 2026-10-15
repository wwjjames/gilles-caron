import { html } from "../lib/html";
import { photos } from "../data/photos";

// → single-product.php (WooCommerce). Price and Purchase appear only in sale mode,
// which is reached from Contact. Unknown IDs fall back to the first photo.
export const render = (id: string, sale = false) => {
  const p = photos.find(p => p.id === id) || photos[0];
  return html`
    <main class="detail">
      <a class="back" href="${sale ? "#contact" : "#archive"}">← Back</a>
      <section>
        <figure><img src="${p.image}" alt="${p.title}"></figure>
        <div>
          <p class="label">${p.id} · ${p.date}</p>
          <h1>${p.title}</h1>
          <p>A mock archive description. Final factual captions, place, date and rights metadata must be supplied by the archive.</p>
          <dl>
            <div><dt>Place</dt><dd>${p.place}</dd></div>
            <div><dt>Format</dt><dd>Black-and-white photograph</dd></div>
            ${sale ? html`
              <div><dt>Availability</dt><dd>Available</dd></div>
              <div><dt>Price</dt><dd>${p.price}</dd></div>` : ""}
          </dl>
          ${sale ? html`<button>Purchase rights ↗</button><small>Mock action — no payment connected.</small>` : ""}
        </div>
      </section>
    </main>`;
};
