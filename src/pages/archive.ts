import { html } from "../lib/html";
import { archivePhotos, mppUrl } from "../data/gallery";
import { justifiedGallery, mountJustifiedGallery, type GalleryOptions } from "../components/justified-gallery";

const options: GalleryOptions = { id: "archive-gallery", targetHeight: 360, mobileTargetHeight: 200, captions: true };

// → page-archive.php. A weekly selection of 10 view-only photographs from the gallery;
// consultation of the collection itself is referred to the MPP.
export const render = () => html`
  <main class="page works-page">
    <section class="archive-intro">
      <div>
        <p class="label">This week’s selection · ${archivePhotos.length} photographs</p>
        <p class="archive-lead">Each week, ten photographs from the archive are shown here for viewing only. They cannot be downloaded.</p>
      </div>
      <div class="archive-mpp">
        <p>The Gilles Caron collection is held by the Médiathèque du patrimoine et de la photographie (MPP). Researchers, art historians and institutions wishing to consult the photographs are invited to contact the MPP.</p>
        <a class="link" href="${mppUrl}" target="_blank" rel="noopener">Consult the collection at the MPP ↗</a>
      </div>
    </section>
    <section class="archive-gallery">${justifiedGallery(archivePhotos, options)}</section>
  </main>`;

export const mount = () => mountJustifiedGallery(archivePhotos, options);
