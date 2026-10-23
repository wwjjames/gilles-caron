import { html } from "../lib/html";
import { visibleNavigation } from "../data/navigation";

// → header.php. `section` is the first part of the current route, for the active link.
export const header = (section: string) => html`
  <header>
    <a class="mark" href="#home"><img src="/assets/brand/fgc-logo.png" alt=""><span>Fondation Gilles Caron</span></a>
    <nav>${visibleNavigation.map(n => html`<a href="#${n.route}"${n.route === section ? ` class="active" aria-current="page"` : ""}>${n.label}</a>`).join("")}</nav>
    <div class="language-switch" aria-label="Language">
      <a class="active" href="?lang=en#home" aria-current="page">EN</a>
      <a href="?lang=fr#home" title="French version coming later">FR</a>
      <a href="?lang=zh#home" title="Chinese version coming later">ZH</a>
    </div>
  </header>`;
