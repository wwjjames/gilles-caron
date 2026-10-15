import { html } from "../lib/html";

// → single-documentation.php (one shared mock for every entry)
export const render = () => html`
  <main class="editorial-detail">
    <a class="back" href="#documentation">← Documentation</a>
    <section class="editorial-hero">
      <figure><img src="/assets/textile-still-life.png" alt="Mock book cover"></figure>
      <div>
        <p class="label">Book · Mock publication</p>
        <h1>Notes from<br>the Archive</h1>
        <p class="lead">A provisional monograph bringing together photographs, contact sheets and writings from the archive.</p>
        <dl>
          <div><dt>Publisher</dt><dd>Éditions du Regard</dd></div>
          <div><dt>Publication</dt><dd>September 2026</dd></div>
          <div><dt>Format</dt><dd>Hardback · 240 pages</dd></div>
        </dl>
      </div>
    </section>
    <article>
      <p>This mock detail page demonstrates how a book can be introduced beyond the news listing. The final page may include a synopsis, editor and author credits, publication history, cover and spread images, ISBN, language editions and links to distributors.</p>
      <p>The present text and publication data are illustrative only. They should be replaced by approved catalogue information before publication.</p>
    </article>
  </main>`;
