import { html } from "../lib/html";

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
        <a href="#archive">Archive</a>
        <a href="#biography">Biography</a>
        <a href="#documentation">Documentation</a>
        <a href="#exhibition">Exhibition</a>
      </div>
      <p>© 2026 Gilles Caron Archive<br><span>Preview content — rights and factual records pending confirmation.</span></p>
    </section>
  </footer>`;
