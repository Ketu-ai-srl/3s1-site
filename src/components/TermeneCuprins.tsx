import type { TermenCuAncora } from "@/content/termene-extins";
import { ANCORE_TERMENE } from "@/content/interior-juridic";

// Cuprinsul instrumentului de termene: un RAND DE ANCORE catre cele opt fise, fiecare cu
// termenul si cu actul scrise pe el.
//
// DE CE NU MAI E TABEL. Tabelul avea doua coloane si repeta, in forma stransa, exact ce scrie
// mai jos pe fisa: categoria, termenul, actul. Cu fisele rescrise ca DATE - cifra la 36 px,
// temeiul pe rand, nota dedesubt - tabelul devenise a doua randare a acelorasi opt randuri,
// la un ecran distanta una de alta. Ce facea el si nu face fisa e NAVIGAREA: sa vezi cele opt
// categorii deodata si sa sari la a ta. Aia a ramas, si e tot ce a ramas.
//
// CE NU S-A PIERDUT, si de asta randul poarta trei lucruri, nu unul: actul normativ sta SUB
// numele categoriei, la orice latime, iar numele duce la fisa intreaga. Amandoua sunt scrise
// in `cuprins.subTabel`, adica in continut, deci un rand de pastile cu numele singur ar fi
// facut textul acela fals. O ancora care poarta si temeiul nu il face.
//
// LATIMEA. Patru coloane la 1440, doua la tableta, una pe telefon: opt carduri scurte incap
// pe doua randuri, deci cuprinsul se vede intreg fara derulare. Tabelul de dinainte isi
// pastra derularea proprie pe orizontala tocmai fiindca era tabel; o grila nu se trage
// lateral, deci grija aceea dispare cu el.

export default function TermeneCuprins({
  termene,
  fara,
  faraTemei,
  fundal = "alb",
}: {
  termene: TermenCuAncora[];
  fara: string;
  faraTemei: string;
  /** pe ce sta grila: `alb` = sectiune alba, deci cardul e ceata; `ceata` = invers */
  fundal?: "alb" | "ceata";
}) {
  const card =
    "group flex h-full flex-col rounded-card p-5 no-underline transition-colors duration-200 hover:bg-violet-pal " +
    (fundal === "alb" ? "bg-ceata" : "bg-alb");

  return (
    <nav aria-label={ANCORE_TERMENE.eticheta}>
      <p className="sr-only">{ANCORE_TERMENE.descriere}</p>
      <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-4">
        {termene.map((t) => (
          <li key={t.ancora}>
            <a href={"#" + t.ancora} className={card}>
              <span className="flex items-baseline justify-between gap-3 text-corp font-semibold text-violet">
                {t.scurt}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
              <span className="mt-2 text-nota font-semibold text-cerneala">
                {t.termen ? t.termen : fara}
              </span>
              <span className="mt-1 text-nota text-cerneala-2">
                {t.lege ? t.lege : faraTemei}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
