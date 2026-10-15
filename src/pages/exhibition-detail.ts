import { html } from "../lib/html";

// → single-exhibition.php (one shared mock for every entry)
export const render = () => html`
  <main class="editorial-detail">
    <a class="back" href="#exhibition">← Exhibition</a>
    <section class="editorial-hero exhibition-detail-hero">
      <figure><img src="/assets/mock-exhibition.png" alt="Mock exhibition view"></figure>
      <div>
        <p class="label">12 September — 24 November 2026</p>
        <h1>The Returning<br>Image</h1>
        <p class="lead">A proposed exhibition tracing the movement between assignments, contact sheets and the images that entered public memory.</p>
        <dl>
          <div><dt>Venue</dt><dd>Maison de la Photographie, Paris</dd></div>
          <div><dt>Curator</dt><dd>To be confirmed</dd></div>
          <div><dt>Status</dt><dd>Mock exhibition for V0.1</dd></div>
        </dl>
      </div>
    </section>
    <article>
      <p>The exhibition detail template gives the archive room for a curatorial introduction, visitor information, participating partners and a sequence of installation images.</p>
      <p>All titles, dates, venues and descriptive text shown here are placeholders for client review and do not represent a confirmed programme.</p>
    </article>
  </main>`;
