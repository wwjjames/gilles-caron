import { html } from "../lib/html";
import { exhibitionStatus, sortedExhibitions, statusLabels } from "../data/exhibitions";

// → archive-exhibition.php. Index layout: titles on the left; hovering or focusing a
// title highlights it and swaps the image on the right. Upcoming, current, then past.
export const render = () => {
  const list = sortedExhibitions();
  return html`
    <main class="page">
      <div class="page-title"><h1>Exhibition</h1></div>
      <section class="exhibition-index">
        <ol class="exhibition-list">${list.map((x, i) => html`
          <li>
            <a href="#exhibition/${x.slug}" data-image="${x.image}" data-index="${i}"${i === 0 ? ` class="active"` : ""}>
              <span class="exhibition-number">${String(i + 1).padStart(2, "0")}</span>
              <span class="exhibition-name">
                <span class="exhibition-title">${x.title}</span>
                <span class="exhibition-meta">${x.venue} · ${x.city}</span>
              </span>
              <span class="exhibition-when">
                <span class="exhibition-status">${statusLabels[exhibitionStatus(x)]}</span>
                <span>${x.dates}</span>
              </span>
              <img class="exhibition-thumb" src="${x.image}" alt="">
            </a>
          </li>`).join("")}</ol>
        <figure class="exhibition-preview" aria-hidden="true">${list.map((x, i) => html`<img src="${x.image}" alt="" data-index="${i}"${i === 0 ? ` class="active"` : ""}>`).join("")}</figure>
      </section>
    </main>`;
};

export const mount = () => {
  const links = document.querySelectorAll<HTMLAnchorElement>(".exhibition-list a");
  const images = document.querySelectorAll<HTMLImageElement>(".exhibition-preview img");
  const show = (index: string) => {
    links.forEach(a => a.classList.toggle("active", a.dataset.index === index));
    images.forEach(img => img.classList.toggle("active", img.dataset.index === index));
  };
  links.forEach(a => {
    a.addEventListener("mouseenter", () => show(a.dataset.index!));
    a.addEventListener("focus", () => show(a.dataset.index!));
  });
};
