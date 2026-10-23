import type { GalleryPhoto } from "./types";

// → a WordPress gallery (custom post type or media library with custom fields), no longer
// WooCommerce. The foundation uploads photographs here and ticks, each week, which 10 appear
// on the Archive page and which 4 appear on the home page. Width / height come from the
// uploaded file and drive the justified layout.
export const ARCHIVE_LIMIT = 10;
export const HOME_LIMIT = 4;

export const gallery: GalleryPhoto[] = [
  { id: "affrontements-quartier-latin-1968", image: "/assets/photos/affrontements-quartier-latin-1968.jpg", width: 1600, height: 1064, title: "Affrontements CRS/étudiants avec le camion à eau. Quartier latin, Paris", date: "6 mai 1968", inArchive: true, onHome: true },
  { id: "etudiant-vieux-colombier-1968", image: "/assets/photos/etudiant-vieux-colombier-1968.jpg", width: 1600, height: 1056, title: "Étudiant pourchassé par un CRS. Paris, rue du Vieux-Colombier", date: "6 mai 1968", inArchive: true, onHome: false },
  { id: "cohn-bendit-sorbonne-1968", image: "/assets/photos/cohn-bendit-sorbonne-1968.jpg", width: 1077, height: 1600, title: "Daniel Cohn-Bendit devant la Sorbonne face à un CRS. Paris", date: "6 mai 1968", inArchive: true, onHome: true },
  { id: "manifestation-londonderry-1969", image: "/assets/photos/manifestation-londonderry-1969.jpg", width: 1600, height: 1110, title: "Manifestation catholique. Londonderry, Irlande du Nord", date: "12 août 1969", inArchive: true, onHome: false },
  { id: "guerre-des-6-jours-1967", image: "/assets/photos/guerre-des-6-jours-1967.jpg", width: 1600, height: 1060, title: "Guerre des 6 jours. Israël", date: "Juin 1967", inArchive: true, onHome: true },
  { id: "rue-saint-jacques-1968", image: "/assets/photos/rue-saint-jacques-1968.jpg", width: 1600, height: 1033, title: "Mai 68. Rue Saint-Jacques, Paris", date: "10 juin 1968", inArchive: true, onHome: false },
  { id: "prague-1969", image: "/assets/photos/prague-1969.jpg", width: 1600, height: 1083, title: "Manifestation antisoviétique réprimée par l’armée tchécoslovaque. Prague", date: "19 août 1969", inArchive: true, onHome: false },
  { id: "patrouille-a-shau-1967", image: "/assets/photos/patrouille-a-shau-1967.jpg", width: 1600, height: 1065, title: "Patrouille américaine de la 173e brigade aéroportée, vallée de A Shau. Sud-Vietnam", date: "Décembre 1967", inArchive: true, onHome: false },
  { id: "romy-schneider-1969", image: "/assets/photos/romy-schneider-1969.jpg", width: 1100, height: 1600, title: "Romy Schneider pour une émission de télévision Dim, Dam, Dom. Paris", date: "17 février 1969", inArchive: true, onHome: true },
  { id: "soldat-americain-vietnam-1967", image: "/assets/photos/soldat-americain-vietnam-1967.jpg", width: 1076, height: 1600, title: "Soldat américain. Guerre du Vietnam", date: "Novembre 1967", inArchive: true, onHome: false },
];

export const archivePhotos = gallery.filter(p => p.inArchive).slice(0, ARCHIVE_LIMIT);
export const homePhotos = gallery.filter(p => p.onHome).slice(0, HOME_LIMIT);

// The originals are held by the Médiathèque du patrimoine et de la photographie.
export const mppUrl = "https://mediatheque-patrimoine.culture.gouv.fr/";
