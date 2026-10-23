import { html } from "../lib/html";
import { legalPages } from "../data/legal";

// → page.php. Empty on purpose: the legal text is written in WordPress.
export const render = (slug: string) => {
  const page = legalPages.find(l => l.slug === slug);
  if (!page) return undefined;
  return html`
    <main class="page">
      <div class="page-title"><h1>${page.title}</h1></div>
      <section class="placeholder-page"><p>Content to be added.</p></section>
    </main>`;
};
