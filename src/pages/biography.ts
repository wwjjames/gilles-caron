import { html } from "../lib/html";

// → page-biography.php
export const render = () => html`
  <main class="page">
    <div class="page-title"><h1>Biography</h1></div>
    <section class="bio">
      <figure><img src="/assets/gilles-caron-rtl-interview.jpg" alt="Gilles Caron interviewé par RTL au retour du troisième reportage au Biafra"></figure>
      <div>
        <h2>Gilles Caron</h2>
        <p>Mémoire visuelle d’une époque, Gilles Caron (1939-1970) a relaté par l’image la chronique des grands conflits contemporains. Il finira par payer cet engagement de sa vie, lors d’un reportage au Cambodge.</p>
        <p>En moins de cinq années, Gilles Caron a imposé un regard d’une rare intensité sur son époque. Mai 68, la guerre des Six Jours, le Biafra, l’Irlande du Nord ou le Vietnam, mais aussi l’effervescence culturelle et politique des années 1960, composent une œuvre où se côtoient l’Histoire et la vie quotidienne, les combats d’émancipation et la guerre.</p>
        <p>Près de soixante ans plus tard, la force de ses images demeure intacte.</p>
        <a class="link" href="https://fr.wikipedia.org/wiki/Gilles_Caron" target="_blank" rel="noopener">Gilles Caron sur Wikipédia ↗</a>
        <small class="bio-credit">Gilles Caron interviewé par RTL au retour du troisième reportage au Biafra</small>
      </div>
    </section>
  </main>`;
