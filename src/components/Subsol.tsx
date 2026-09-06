// Subsolul, randat din `src/app/layout.tsx`, deci prezent pe fiecare pagina.
//
// REF-V: pe `ceata`, coloane de legaturi de 14 px cu titlu de coloana la 600, randul cu
// sigla si adresa de posta electronica, si un rand juridic de 12 px la baza.
//
// COLOANELE SE COMPUN DIN MANIFEST, dupa cale, nu se scriu de mana: o cale care ar disparea
// din `RUTE` ar disparea si de aici, in loc sa ramana o legatura moarta pe toate cele 22 de
// pagini - subsolul sta in layout, deci un rand gresit aici e gresit peste tot. Grupurile
// sunt trei, si sunt intrebarile pe care si le pune cineva in subsol: „ce faceti",
// „cine sunteti", „ce semnez".
//
// Nu se repeta tot site-ul. Pentru asta exista `/harta-site`, care e chiar una dintre
// legaturi. Aici a stat si „Pagină verificată la <data>", si nu se intoarce: nimeni nu
// verificase nimic, iar odata ce subsolul a trecut in layout, sigiliul a ajuns si pe
// pagini pe care nu le citise nimeni. O data fara verb e un sigiliu, nu o informatie.

import Link from "next/link";
import {
  CAMPURI_IDENTITATE,
  ETICHETE,
  entitate,
  identitateCompleta,
} from "@/content/entitate";
import { RUTE } from "@/content/rute";

const GRUPURI: Array<{ titlu: string; cai: string[] }> = [
  {
    titlu: "Ce facem",
    cai: ["/solutii", "/arhivare-fizica", "/cum-functioneaza", "/instrumente/termene-de-pastrare"],
  },
  { titlu: "Firma", cai: ["/despre", "/contact", "/investitia", "/comparatie"] },
  { titlu: "Documente", cai: ["/termeni", "/confidentialitate", "/cookies", "/securitate"] },
];

const CAI_JURIDICE = ["/accesibilitate", "/harta-site"];

function legaturi(cai: string[]) {
  return cai.flatMap((cale) => RUTE.filter((r) => r.cale === cale));
}

const LEGATURA =
  "text-nota text-cerneala-2 no-underline transition-colors duration-200 hover:text-cerneala";

/**
 * Blocul de identificare a comerciantului, cerut de Legea 365/2002 art. 5 alin. (1).
 *
 * Se randeaza numai cand TOATE campurile au valoare. Cat timp unul e necompletat, blocul
 * lipseste cu totul: textul `de completat` ajuns pe un site public arata a santier si, mai
 * rau, pare o valoare. Absenta lui e vizibila si mecanic - poarta juridica o trateaza ca
 * avertisment pe mediul de proba si ca oprire la productie, deci site-ul nu poate fi
 * publicat cu identitatea pe jumatate.
 *
 * Telefonul apare aici fiindca il cere art. 5 alin. (1) lit. c). Nu contrazice decizia
 * comerciala de a nu folosi telefonul drept canal de contact: una e datul de identificare
 * al firmei, alta e canalul prin care se primesc cererile.
 */
function Identificare() {
  if (!identitateCompleta()) {
    return null;
  }
  return (
    <dl className="mt-8 grid gap-x-8 gap-y-1.5 border-t border-linie pt-6 text-nota sm:grid-cols-2 lg:grid-cols-3">
      {CAMPURI_IDENTITATE.map((camp) => (
        <div key={camp} className="flex flex-wrap gap-x-2">
          <dt className="text-cerneala-2">{ETICHETE[camp]}:</dt>
          <dd className="m-0 text-cerneala">{entitate[camp]}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Subsol() {
  return (
    <footer className="bg-ceata">
      <div className="mx-auto w-full max-w-vitrina px-4 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Link href="/" className="flex items-baseline gap-2 no-underline text-cerneala">
              <span className="text-[22px] leading-none font-semibold tracking-[-0.01em]">3S</span>
              <span className="text-nota text-cerneala-2">Scan · Store · Solve</span>
            </Link>
            <p className="mt-4 max-w-[38ch] text-nota text-cerneala-2">
              3S este proiectul ADRIA Servicii Arhivare SRL, Golești, județul Argeș, firma-mamă
              care arhivează documente din 2019. Contract în limba română, sub lege română.
            </p>
            <a
              href="mailto:contact@3s.ro"
              className="mt-4 inline-block text-corp font-semibold text-violet no-underline"
            >
              contact@3s.ro
            </a>
          </div>

          {GRUPURI.map((grup) => (
            <nav key={grup.titlu} aria-label={grup.titlu}>
              <h2 className="mb-4 text-nota font-semibold text-cerneala">{grup.titlu}</h2>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {legaturi(grup.cai).map((r) => (
                  <li key={r.cale}>
                    <Link href={r.cale} title={r.descriere} className={LEGATURA}>
                      {r.scurt}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Identificare />

        {/* Randul juridic: 12 px, cel mai mic text de pe site, si sta pe `ceata` - deci se
            scrie cu `cerneala-2` (6,48:1), niciodata cu `cerneala-3`, care pe ceata da
            3,97:1 si pica pragul de 4,5:1 pentru text mic. */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-linie pt-6 text-[12px] text-cerneala-2">
          <span>© {new Date().getFullYear()} ADRIA Servicii Arhivare SRL</span>
          {legaturi(CAI_JURIDICE).map((r) => (
            <Link key={r.cale} href={r.cale} className="text-cerneala-2 no-underline hover:text-cerneala">
              {r.scurt}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
