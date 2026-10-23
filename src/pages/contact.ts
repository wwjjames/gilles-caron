import { html } from "../lib/html";
import { photos } from "../data/photos";
import { photoCard } from "../components/photo-card";

// → page-contact.php. Lists only available photos; their detail pages carry price and Purchase.
export const render = () => html`
  <main class="page contact">
    <section class="contact-top">
      <div>
        <p class="label">Contact & licensing</p>
        <h1>Begin an<br>enquiry.</h1>
        <p>For research, publication, exhibition or rights enquiries.</p>
      </div>
      <form id="contact-form">
        <label>Name<input required placeholder="Your name"></label>
        <label>Email<input required type="email" placeholder="you@organisation.com"></label>
        <label>Subject<input placeholder="Licensing, research, exhibition…"></label>
        <label class="full">Message<textarea placeholder="Tell us about your intended use."></textarea></label>
        <button>Send enquiry ↗</button>
        <small id="form-note"></small>
      </form>
    </section>
    <section class="available">
      <div>
        <p class="label">Selected rights</p>
        <h2>Photographs available to license.</h2>
      </div>
      <div class="sale-grid">${photos.filter(p => p.available).map(p => photoCard(p)).join("")}</div>
    </section>
  </main>`;

export const mount = () => {
  document.querySelector("form")?.addEventListener("submit", e => {
    e.preventDefault();
    document.querySelector("#form-note")!.textContent = "Thank you — this preview does not send messages yet.";
  });
};
