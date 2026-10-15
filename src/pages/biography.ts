import { html } from "../lib/html";

// → page-biography.php
export const render = () => html`
  <main class="page">
    <div class="page-title"><h1>Biography</h1></div>
    <section class="bio">
      <figure><img src="/assets/gilles-caron-portrait-v2.png" alt="Gilles Caron holding a camera"></figure>
      <div>
        <p class="label">A life in photographs</p>
        <h2>A chronology<br>to be <em>confirmed.</em></h2>
        <p>This page will hold the approved biography, timeline and career milestones.</p>
        <dl>
          <div><dt>1939</dt><dd>Birth and early years — pending verification</dd></div>
          <div><dt>1960s</dt><dd>Photography and reporting practice — pending verification</dd></div>
          <div><dt>Legacy</dt><dd>Foundation and archive record — pending verification</dd></div>
        </dl>
      </div>
    </section>
  </main>`;
