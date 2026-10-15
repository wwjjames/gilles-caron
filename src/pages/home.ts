import { html } from "../lib/html";
import { photos } from "../data/photos";
import { photoCard } from "../components/photo-card";

// → front-page.php
export const render = () => html`
  <main>
    <section class="home-intro">
      <div>
        <h1>Gilles<br><em>Caron</em></h1>
        <p>Gilles Caron tells the story of his times through his visual account of the period’s major conflicts: the Six Day War, Vietnam, Biafra, Northern Ireland, May 68, the repression of the Prague Spring… Is it truly enough to be a witness, a mere spectator? He became the subject of the photographic narrative.</p>
        <a class="link" href="#biography">Read biography</a>
      </div>
      <figure><img src="/assets/gilles-caron-portrait-v2.png" alt="Gilles Caron holding a camera"></figure>
    </section>
    <a class="exhibition-feature" href="#exhibition/detail">
      <figure><img src="/assets/mock-exhibition.png" alt="Exhibition view"></figure>
      <div>
        <p class="label">Current / forthcoming exhibition</p>
        <h2>Gilles Caron:<br>The Returning Image</h2>
        <p>Maison de la Photographie · Paris<br>12 Sep — 24 Nov 2026</p>
        <span class="link">View exhibition ↗</span>
      </div>
    </a>
    <section class="selection">
      <button class="rail-arrow rail-arrow-left" id="prev" aria-label="Previous photographs">←</button>
      <div class="rail" id="rail">${photos.map(p => photoCard(p)).join("")}</div>
      <button class="rail-arrow rail-arrow-right" id="next" aria-label="Next photographs">→</button>
    </section>
  </main>`;

// The right arrow scrolls once, then opens the Archive; the left arrow resets the count.
export const mount = () => {
  const rail = document.querySelector<HTMLElement>("#rail")!;
  let nextClicks = 0;
  document.querySelector("#next")?.addEventListener("click", () => {
    nextClicks++;
    if (nextClicks >= 2) {
      location.hash = "archive";
      return;
    }
    rail.scrollBy({ left: rail.clientWidth * 0.9, behavior: "smooth" });
  });
  document.querySelector("#prev")?.addEventListener("click", () => {
    nextClicks = 0;
    rail.scrollBy({ left: -rail.clientWidth * 0.9, behavior: "smooth" });
  });
};
