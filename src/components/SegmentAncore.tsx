import type { Ancora } from "@/content/interior-solutii";

// Filele-pastila de navigare IN pagina (REF-V.md §4, „Pagina interioara": tab-uri pastila de
// navigare in pagina, imediat sub randul de incredere).
//
// DE CE NU E `TabPastila`. Aceea comuta PANOURI cu JavaScript: are stare, `role="tab"` si
// `hidden` pe panourile inactive. Aici nu se comuta nimic - fiecare fila e o ancora catre o
// sectiune care sta oricum in pagina, una sub alta. Un `role="tablist"` peste niste legaturi
// ar minti cititorul de ecran, care ar astepta panouri comutabile. Deci: `nav` cu legaturi.
//
// NICIO FILA NU E MARCATA ACTIVA, si asta e o decizie, nu o scapare. In REF-V fila activa e
// inchisa cu litera alba, fiindca acolo ea comuta un panou. Aici, fara JavaScript, serverul
// nu poate sti la ce sectiune a ajuns cititorul: o fila colorata „activ" ar fi o afirmatie
// despre pozitia lui pe care n-o putem sustine. Toate filele arata la fel si se aprind la
// trecerea cu mausul.
//
// FILELE SE ASAZA PE MAI MULTE RANDURI, nu se trag lateral, si asta a fost o reparatie facuta
// pe captura. Prima varianta punea `overflow-x-auto` pe banda: poarta de derapaj ramanea verde
// - se tragea banda, nu pagina - dar la 390 px se vedeau doua file si jumatate din cinci, fara
// niciun semn ca mai exista ceva la dreapta. O navigare care isi ascunde jumatate din intrari
// e mai rea decat lipsa ei: omul crede ca pagina are trei sectiuni. Cu `flex-wrap` incap toate,
// pe doua randuri, si nimic nu iese din latime.
//
// Pastila are fundal ALB tot timpul, nu doar la trecerea cu mausul: pe banda de ceata, o
// eticheta fara fundal se citeste ca text, nu ca lucru pe care se apasa.

type Props = {
  ancore: Ancora[];
  /** Numele benzii pentru cititorul de ecran, ca sa se deosebeasca de bara de sus. */
  eticheta: string;
};

export default function SegmentAncore({ ancore, eticheta }: Props) {
  return (
    <nav aria-label={eticheta} className="border-b border-linie bg-ceata">
      <div className="mx-auto w-full max-w-vitrina px-4 py-5 md:px-8">
        <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0">
          {ancore.map((a) => (
            <li key={a.ancora}>
              <a
                href={"#" + a.ancora}
                className="block rounded-pastila bg-alb px-5 py-2.5 text-nota font-semibold text-cerneala no-underline transition-colors duration-200 hover:bg-violet-pal hover:text-violet"
              >
                {a.eticheta}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
