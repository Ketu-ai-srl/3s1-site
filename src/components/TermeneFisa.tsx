import { STARI } from "@/content/termene";
import type { TermenCuAncora } from "@/content/termene-extins";

// O fisa de termen, ca un CARD, randata INTREAGA si STATIC pe pagina de instrument.
//
// Fiecare rand e in HTML de la prima cerere, cu ancora lui, deci pagina se poate tipari,
// trimite prin mesaj cu trimitere la un rand anume, si citi de un crawler care nu executa
// JavaScript. Poarta care cere continut in HTML brut il vede pe tot.
//
// FORMA, la valul S1-b. Cardul poarta patru lucruri, in ordinea in care le cauta cineva care
// a deschis pagina cu o intrebare: CATEGORIA, apoi TERMENUL la 36 px - cifra e raspunsul,
// deci e cel mai mare lucru de pe card - apoi TEMEIUL la 14 px, si nota. Inainte fisele erau
// articole late cat pagina, despartite doar de o linie, cu cifra la `clamp(2rem, 3.6vw, 3rem)`
// si cu randurile ca lista de definitii pe doua coloane: opt astfel de blocuri unul sub altul
// dadeau un perete de text din care nu se vedea unde se termina unul si incepe altul. In
// carduri, doua pe rand la 1440, se vad doua fise deodata si granita e cardul insusi.
//
// STAREA e o PASTILA, si isi ia culorile din `STARI` (`src/content/termene.ts`), nu de aici:
// trei perechi de clase, cate una pe stare, refacute pe paleta REF-V odata cu fisierul. Nu se
// citeaza pe litere in niciun comentariu - proba din `tests/directia.test.ts` cauta numele de
// culori in sursa, si citeste fisierul intreg, nu doar codul; un comentariu care scrie clasa
// devine chiar instanta pe care proba o vaneaza.
//
// TEMEIUL E SINGURUL ACCENT VIOLET al cardului. Cifra termenului e in cerneala: daca ar fi
// amandoua violet, accentul n-ar mai arata nimic. Stampila de temei e acelasi gest ca in
// `StampilaCitare` de pe pagina de start - raspunsul vine cu documentul si articolul din care
// a fost scos.

const ETICHETA_RAND = "text-nota font-semibold text-cerneala";

export default function TermeneFisa({
  termen,
  fundal = "ceata",
}: {
  termen: TermenCuAncora;
  /** pe ce sta cardul: `ceata` = sectiune de ceata, deci cardul e alb */
  fundal?: "alb" | "ceata";
}) {
  const stare = STARI[termen.stare];

  return (
    <article
      id={termen.ancora}
      className={
        "flex h-full flex-col rounded-card-mare p-6 md:p-8 " +
        (fundal === "ceata" ? "bg-alb" : "bg-ceata")
      }
    >
      <span
        className={`mb-4 inline-block w-fit rounded-pastila px-3 py-1 text-nota font-semibold ${stare.clase}`}
      >
        {stare.text}
      </span>

      <h3 className="max-w-[24ch] text-titlu-4 text-cerneala">{termen.tip}</h3>

      {termen.termen ? (
        <p className="mt-4 text-titlu-3 text-cerneala">{termen.termen}</p>
      ) : (
        <p className="mt-4 text-subtitlu text-cerneala-2">Rând lăsat gol, intenționat</p>
      )}

      <dl className="m-0 mt-6 border-t border-linie">
        {termen.dela ? (
          <div className="border-b border-linie py-4 last:border-b-0 last:pb-0">
            <dt className={ETICHETA_RAND}>Curge din</dt>
            <dd className="m-0 mt-1 text-corp text-cerneala-2">{termen.dela}</dd>
          </div>
        ) : null}

        {termen.lege ? (
          <div className="border-b border-linie py-4 last:border-b-0 last:pb-0">
            <dt className={ETICHETA_RAND}>Temei legal</dt>
            <dd className="m-0 mt-2">
              <span className="block w-fit rounded-card bg-violet-pal px-3 py-2 text-nota leading-[1.45] break-words text-violet">
                {termen.lege}
              </span>
              <span className="mt-2 block text-corp text-cerneala-2">{termen.legeNota}</span>
            </dd>
          </div>
        ) : null}

        <div className="border-b border-linie py-4 last:border-b-0 last:pb-0">
          <dt className={ETICHETA_RAND}>
            {termen.termen ? "Ce mai trebuie știut" : "De ce este gol"}
          </dt>
          <dd className="m-0 mt-1 text-corp text-cerneala-2">{termen.nota}</dd>
        </div>
      </dl>
    </article>
  );
}
