import { html } from "../lib/html";
import { homePhotos } from "../data/gallery";
import { exhibitionStatus, featuredExhibition } from "../data/exhibitions";
import { justifiedGallery, mountJustifiedGallery, type GalleryOptions } from "../components/justified-gallery";

// Four photographs ticked "home" in the gallery: one row on desktop, no captions;
// clicking anywhere on them opens the Archive.
const options: GalleryOptions = { id: "home-gallery", targetHeight: 320, mobileTargetHeight: 170, desktopRows: 1, captions: false, href: "#archive" };

// → front-page.php
export const render = () => {
  const x = featuredExhibition();
  const label = exhibitionStatus(x) === "current" ? "Current exhibition" : exhibitionStatus(x) === "upcoming" ? "Forthcoming exhibition" : "Recent exhibition";
  return html`
  <main>
    <section class="home-intro">
      <div>
        <h1>Gilles<br><em>Caron</em></h1>
        <p>Gilles Caron tells the story of his times through his visual account of the period’s major conflicts: the Six Day War, Vietnam, Biafra, Northern Ireland, May 68, the repression of the Prague Spring… Is it truly enough to be a witness, a mere spectator? He became the subject of the photographic narrative.</p>
        <a class="link" href="#biography">Read biography</a>
      </div>
      <figure><img src="/assets/gilles-caron-portrait-v2.png" alt="Gilles Caron holding a camera"></figure>
    </section>
    <a class="exhibition-feature" href="#exhibition/${x.slug}">
      <figure><img src="${x.image}" alt="${x.title}"></figure>
      <div>
        <p class="label">${label}</p>
        <h2>${x.title}</h2>
        <p>${x.venue} · ${x.city}<br>${x.dates}</p>
        <span class="link">View exhibition ↗</span>
      </div>
    </a>
    <section class="selection">${justifiedGallery(homePhotos, options)}</section>
  </main>`;
};

export const mount = () => mountJustifiedGallery(homePhotos, options);
