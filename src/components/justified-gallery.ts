import { html } from "../lib/html";
import { justifyRows } from "../lib/justify";
import type { GalleryPhoto } from "../data/types";

// → template-parts/justified-gallery.php + a small script. Used by the Archive (10 photos,
// with captions) and the home page (4 photos in one row, linking to the Archive).
// Images are view-only: no zoom, no link to the file, right-click and dragging disabled.
export type GalleryOptions = {
  id: string;
  // Preferred row height in pixels; the real height is adjusted so each row fills the width.
  targetHeight: number;
  mobileTargetHeight: number;
  // Force a number of rows on desktop (home page: one row of four).
  desktopRows?: number;
  captions: boolean;
  href?: string;
};

const GAP = 24;
const MOBILE_GAP = 12;
const MOBILE_BREAKPOINT = 760;

const ratio = (p: GalleryPhoto) => p.width / p.height;

const item = (p: GalleryPhoto, o: GalleryOptions) => html`
  <figure class="jg-item protected" style="flex-grow:${ratio(p).toFixed(4)}">
    <div class="jg-frame" style="aspect-ratio:${p.width} / ${p.height}">
      <img src="${p.image}" alt="${p.title}, ${p.date}" draggable="false" loading="lazy">
    </div>
    ${o.captions ? html`<figcaption><span class="jg-date">${p.date}</span><span class="jg-title">${p.title}</span></figcaption>` : ""}
  </figure>`;

const rowsFor = (photos: GalleryPhoto[], o: GalleryOptions, width: number) => {
  const mobile = width < MOBILE_BREAKPOINT;
  const ratios = photos.map(ratio);
  if (!mobile && o.desktopRows) return justifyRows(ratios, width, (width * o.desktopRows) / ratios.reduce((a, b) => a + b, 0), GAP);
  return justifyRows(ratios, width, mobile ? o.mobileTargetHeight : o.targetHeight, mobile ? MOBILE_GAP : GAP);
};

const rowsHtml = (photos: GalleryPhoto[], o: GalleryOptions, rows: number[][]) =>
  rows.map(row => html`<div class="jg-row">${row.map(i => item(photos[i], o)).join("")}</div>`).join("");

// Server-side style first render, laid out for a typical desktop width; mount() refines it.
export const justifiedGallery = (photos: GalleryPhoto[], o: GalleryOptions) => {
  const inner = rowsHtml(photos, o, rowsFor(photos, o, 1400));
  return o.href
    ? html`<a class="justified-gallery" id="${o.id}" href="${o.href}">${inner}</a>`
    : html`<div class="justified-gallery" id="${o.id}">${inner}</div>`;
};

export const mountJustifiedGallery = (photos: GalleryPhoto[], o: GalleryOptions) => {
  const el = document.getElementById(o.id);
  if (!el) return;
  let current = "";
  const layout = () => {
    const rows = rowsFor(photos, o, el.clientWidth);
    const key = JSON.stringify(rows);
    if (key === current) return;
    current = key;
    el.innerHTML = rowsHtml(photos, o, rows);
  };
  layout();
  const observer = new ResizeObserver(() => (el.isConnected ? layout() : observer.disconnect()));
  observer.observe(el);
  el.addEventListener("contextmenu", e => e.preventDefault());
  el.addEventListener("dragstart", e => e.preventDefault());
};
