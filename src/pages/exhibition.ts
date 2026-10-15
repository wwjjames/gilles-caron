import { html } from "../lib/html";
import { exhibitions } from "../data/exhibitions";

// → archive-exhibition.php
export const render = () => html`
  <main class="page">
    <div class="page-title"><h1>Exhibition</h1></div>
    <section class="exhibitions">${exhibitions.map(x => html`
      <a href="#exhibition/item">
        <img src="/assets/mock-exhibition.png" alt="Mock exhibition view">
        <div>
          <p class="label">${x.dates}</p>
          <h2>${x.title}</h2>
          <p>${x.venue}</p>
          <span class="link">View exhibition ↗</span>
        </div>
      </a>`).join("")}</section>
  </main>`;
