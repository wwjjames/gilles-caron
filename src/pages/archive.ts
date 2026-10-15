import { html } from "../lib/html";
import { photos } from "../data/photos";
import { photoCard } from "../components/photo-card";

// → archive-photo.php. Display only: no prices, availability or purchase links.
export const render = () => html`
  <main class="page works-page">
    <div class="tools">
      <label>Search<input id="search" placeholder="Title, place or reference"></label>
      <small id="count"></small>
    </div>
    <section class="archive-grid" id="grid">${photos.map(p => photoCard(p, false, true)).join("")}</section>
  </main>`;

export const mount = () => {
  const input = document.querySelector<HTMLInputElement>("#search")!;
  const grid = document.querySelector<HTMLElement>("#grid")!;
  const count = document.querySelector<HTMLElement>("#count")!;
  const update = () => {
    const query = input.value.toLowerCase();
    const list = photos.filter(p => Object.values(p).join(" ").toLowerCase().includes(query));
    grid.innerHTML = list.map(p => photoCard(p, false, true)).join("");
    count.textContent = `${list.length} photographs`;
  };
  input.addEventListener("input", update);
  update();
};
