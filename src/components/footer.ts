import { html } from "../lib/html";
import { visibleNavigation } from "../data/navigation";
import { legalPages } from "../data/legal";

// → footer.php
export const footer = () => html`
  <footer>
    <section>
      <p class="label">Newsletter</p>
      <h3>Receive archive news<br>and exhibition updates.</h3>
      <div class="subscribe">
        <input placeholder="Your email address">
        <button>Subscribe ↗</button>
      </div>
      <small>Occasional news only. Unsubscribe at any time.</small>
    </section>
    <section class="footer-links">
      <div>
        <p class="label">Contact</p>
        <a href="#contact">Licensing enquiries</a>
        <a href="mailto:archive@example.com">archive@example.com</a>
      </div>
      <div>
        <p class="label">Explore</p>
        ${visibleNavigation.map(n => html`<a href="#${n.route}">${n.label}</a>`).join("")}
      </div>
      <div>
        <p class="label">Legal</p>
        ${legalPages.map(l => html`<a href="#legal/${l.slug}">${l.title}</a>`).join("")}
      </div>
      <p>© 2026 Fondation Gilles Caron<br><span>Preview content — rights and factual records pending confirmation.</span></p>
    </section>
  </footer>`;
