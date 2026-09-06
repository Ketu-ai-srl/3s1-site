import type { IconitaDrum } from "@/content/interior-investitia";

// Cele trei drumuri de contact, ca trei carduri cu iconita, pe gramatica REF-V: card alb pe
// sectiune de ceata, raza 12 px, iconita intr-un patrat `violet-pal`, fara umbra.
//
// DE CE UN CARD CU VALOARE LIPSA, SI NU CARDUL STERS. Un site care nu afiseaza telefonul lasa
// vizitatorul sa creada ca l-a ratat el, si il trimite sa caute prin subsol. Un card care
// spune „nu exista inca, iata de ce" inchide intrebarea din prima citire si rezerva locul in
// care numarul intra cand firma il are.
//
// De ce marcajul de lipsa nu este o liniuta: o liniuta se citeste ca „necompletat din
// neatentie". Cuvintele spun ca absenta este o stare cunoscuta, nu o scapare, iar nota de
// dedesubt spune de ce.
//
// VALOAREA CARE EXISTA E CHIAR TITLUL CARDULUI, nu un rand de sub el. Pe pagina asta singurul
// lucru care se copiaza dintr-o privire este adresa, deci ea sta in `h3`, pe treapta cea mai
// mare a cardului, in violet cand e legatura. Eticheta merge deasupra, la marimea de nota:
// numele drumului se citeste o data, valoarea se cauta cu ochii.
//
// CAND VALOAREA LIPSESTE, tot `h3` o spune, in cenusiu: absenta ocupa exact locul si exact
// marimea pe care le va ocupa valoarea. Textul de lipsa il scrie pagina, prin `lipsa`, si e
// specific drumului - doua carduri cu acelasi titlu „Nu exista inca" ar da doua trepte de
// titlu care nu spun despre ce e vorba, iar cine navigheaza din titlu in titlu s-ar opri la
// un rand gol de inteles.
//
// ICONITELE sunt desenate aici, cu linie de 1,5 px, si sunt `aria-hidden`: informatia sta in
// eticheta si in nota, niciodata in desen.

export type Drum = {
  /** Numele drumului, asa cum il cauta cineva: „Telefon", „Posta electronica". */
  eticheta: string;
  /** Valoarea, cand exista. `null` inseamna ca nu exista inca, si atunci se scrie de ce. */
  valoare: string | null;
  /** Ce sta in titlu cand valoarea lipseste. Se scrie in pagina, ca sa numeasca chiar drumul. */
  lipsa?: string;
  /** Unde duce valoarea, daca este o legatura. Fara el, valoarea se scrie ca text. */
  href?: string;
  /** Ce se intampla pe drumul acesta, sau de ce nu exista inca. */
  nota: string;
  /** Care desen sta in patratul de deasupra. */
  iconita: IconitaDrum;
};

const CAI: Record<IconitaDrum, string> = {
  posta: "M2.5 5.5 h15 v11 h-15 Z M2.5 6 L10 11.5 L17.5 6",
  telefon:
    "M6.2 2.8 h3 l1.2 3 -1.8 1.4 c0.9 1.9 2.5 3.5 4.4 4.4 l1.4 -1.8 3 1.2 v3 c0 0.6 -0.5 1.1 -1.1 1.1 C9.6 15.1 4.9 10.4 4.1 3.9 c0 -0.6 0.5 -1.1 1.1 -1.1 Z",
  sediu: "M3 17.5 V6.5 L10 2.5 L17 6.5 V17.5 M8 17.5 V11.5 h4 v6",
};

export default function ContactDrumuri({ drumuri }: { drumuri: Drum[] }) {
  return (
    <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
      {drumuri.map((d) => (
        <li key={d.eticheta} className="h-full rounded-card bg-alb p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-card bg-violet-pal text-violet">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <path
                d={CAI[d.iconita]}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <p className="mt-5 text-nota font-semibold text-cerneala-2">{d.eticheta}</p>

          <h3 className="mt-1 text-subtitlu break-words">
            {d.valoare === null ? (
              <span className="text-cerneala-2">{d.lipsa ?? "Nu există încă"}</span>
            ) : d.href ? (
              <a
                href={d.href}
                className="text-violet underline decoration-violet-2 underline-offset-[5px] hover:text-cerneala"
              >
                {d.valoare}
              </a>
            ) : (
              <span className="text-cerneala">{d.valoare}</span>
            )}
          </h3>

          <p className="mt-4 text-nota text-cerneala-2">{d.nota}</p>
        </li>
      ))}
    </ul>
  );
}
