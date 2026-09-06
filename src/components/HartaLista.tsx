// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
import Link from "next/link";

// O grupa de rute din harta site-ului: un RAND pe pagina, nu un cartonas si nici o legatura
// subliniata pierduta intr-un paragraf.
//
// Forma e cea a listelor tipografice ale directiei: numele condensat cu majuscule, sageata
// de arama la capatul randului, descrierea alaturi. Pe /solutii aceeasi forma poarta
// rezumatul unui domeniu; aici poarta descrierea rutei si, pe al treilea rand, adresa ei in
// mono - fiindca harta e singurul loc de pe site unde adresa insasi e informatie: se copiaza
// intr-un mesaj, se lipeste intr-un browser, se compara cu `sitemap.xml`.
//
// Randul intreg e legatura, nu doar numele: pe telefon, o tinta de un cuvant intr-o lista de
// douazeci si doua de randuri se rateaza. Descrierea si adresa raman inauntrul ei, deci
// tinta e cat randul.

export type RandHarta = {
  cale: string;
  scurt: string;
  descriere: string;
};

export default function HartaLista({ rute }: { rute: RandHarta[] }) {
  return (
    <ul className="m-0 list-none border-t border-linie p-0">
      {rute.map((r) => (
        <li key={r.cale} className="border-b border-linie">
          <Link
            href={r.cale}
            className="group grid gap-x-10 gap-y-2 py-6 no-underline md:grid-cols-[minmax(0,7fr)_minmax(0,9fr)_auto]"
          >
            <span className="font-afis text-[clamp(1.35rem,2.2vw,1.95rem)] font-semibold  text-cerneala-2 transition-colors duration-200 group-hover:text-cerneala">
              {r.scurt}
            </span>
            <span>
              <span className="block text-[16px] leading-[1.55] text-cerneala-2">
                {r.descriere}
              </span>
              <span className="mt-1.5 block font-mono text-[12.5px] text-cerneala-2">
                {r.cale}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-violet transition-transform duration-200 group-hover:translate-x-1 md:self-center"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
