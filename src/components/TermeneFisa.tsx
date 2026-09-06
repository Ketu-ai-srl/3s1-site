// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
import { STARI } from "@/content/termene";
import type { TermenCuAncora } from "@/content/termene-extins";

// Un rand de termen, randat INTREG si STATIC, pe pagina de instrument.
//
// De ce nu se randeaza aici widgetul cu clic de pe pagina de start. Widgetul tine sapte
// randuri din opt ascunse in spatele unui clic: e forma potrivita pentru o sectiune de
// prezentare, unde omul cauta un singur raspuns. Pagina de instrument are alta sarcina - sa
// fie citita ca document, tiparita, trimisa prin mesaj si citita de un crawler care nu
// executa JavaScript. Deci fiecare rand e in HTML de la inceput, cu ancora lui, iar poarta
// care cere continut in HTML brut il vede pe tot.
//
// STAREA NU MAI E O PASTILA DESCHISA. `STARI` din `src/content/termene.ts` da trei perechi
// de clase pe suprafete deschise (`bg-verde-moale`, `bg-arama-moale`, `bg-hartie-2`), venite
// din directia in lumina. Pe fundal de noapte erau trei pete albe pe rand, cu colturi
// rotunjite - adica exact cele doua lucruri pe care directia le refuza. Aici se ia doar
// TEXTUL starii, si se scrie ca eticheta mono, cu chenar. Culorile lui `STARI` nu se sterg
// din `termene.ts`: fisierul e al feliei care a cules cifrele, iar textul e singurul lucru
// de care are nevoie pagina asta. Ce se pierde vizual - codul de culoare pe stare - nu se
// pierde ca informatie: starea e scrisa in litere, intreaga, pe fiecare rand.
//
// UN SINGUR ACCENT DE ARAMA PE FISA, si e temeiul legal. Cifra termenului e hartie veche,
// nu aramie: daca ar fi amandoua, accentul n-ar mai arata nimic. Stampila de temei e
// aceeasi cu cea din `StampilaCitare` - linie de arama in stanga, mono, pe noapte-3 -
// fiindca e acelasi gest: raspunsul vine cu documentul si articolul din care a fost scos.

const RAND =
  "grid gap-1 border-t border-linie py-4 sm:grid-cols-[180px_1fr] sm:gap-6";
const ETICHETA_RAND =
  "pt-[3px] font-mono text-[11px]  text-cerneala-2";

export default function TermeneFisa({ termen }: { termen: TermenCuAncora }) {
  const stare = STARI[termen.stare];

  return (
    <article
      id={termen.ancora}
      className="border-t border-linie py-10 first:border-t-0 first:pt-0"
    >
      <div className="mb-4 flex flex-wrap items-baseline gap-x-5 gap-y-3">
        <h3 className="max-w-[30ch] font-afis text-[clamp(1.35rem,2.4vw,2rem)] font-semibold  text-cerneala">
          {termen.tip}
        </h3>
        <span className="border border-linie px-3 py-1 font-mono text-[11px]  text-cerneala-2">
          {stare.text}
        </span>
      </div>

      {termen.termen ? (
        <p className="mb-6 font-afis text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] font-semibold tracking-[-0.01em]  text-cerneala">
          {termen.termen}
        </p>
      ) : (
        <p className="mb-6 font-afis text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.1] font-semibold  text-cerneala-2">
          Rând lăsat gol, intenționat
        </p>
      )}

      <dl className="m-0">
        {termen.dela ? (
          <div className={RAND}>
            <dt className={ETICHETA_RAND}>Curge din</dt>
            <dd className="m-0 max-w-[70ch] text-[16px] leading-[1.55] text-cerneala-2">
              {termen.dela}
            </dd>
          </div>
        ) : null}

        {termen.lege ? (
          <div className={RAND}>
            <dt className={ETICHETA_RAND}>Temei legal</dt>
            <dd className="m-0 max-w-[70ch]">
              <span className="mb-2 block w-fit border-l-2 border-violet bg-alb px-3 py-2 font-mono text-[13.5px] leading-[1.45] break-words text-violet">
                {termen.lege}
              </span>
              <span className="block text-[16px] leading-[1.55] text-cerneala-2">
                {termen.legeNota}
              </span>
            </dd>
          </div>
        ) : null}

        <div className={RAND}>
          <dt className={ETICHETA_RAND}>
            {termen.termen ? "Ce mai trebuie știut" : "De ce este gol"}
          </dt>
          <dd className="m-0 max-w-[70ch] text-[16px] leading-[1.55] text-cerneala-2">
            {termen.nota}
          </dd>
        </div>
      </dl>
    </article>
  );
}
