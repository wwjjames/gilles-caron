import { html } from "../lib/html";

// → header.php
export const header = () => html`
  <header>
    <a class="mark" href="#home">GILLES<br><i>CARON</i></a>
    <nav>
      <a href="#archive">Archive</a>
      <a href="#biography">Biography</a>
      <a href="#contact">Contact</a>
      <a href="#documentation">Documentation</a>
      <a href="#exhibition">Exhibition</a>
    </nav>
    <div class="language-switch" aria-label="Language">
      <a class="active" href="?lang=en#home" aria-current="page">EN</a>
      <a href="?lang=fr#home" title="French version coming later">FR</a>
      <a href="?lang=zh#home" title="Chinese version coming later">ZH</a>
    </div>
  </header>`;
