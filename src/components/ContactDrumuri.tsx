// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
// Registrul drumurilor de contact: fiecare drum pe un rând, cu valoarea lui sau cu motivul
// pentru care nu are încă una.
//
// DE CE UN RÂND CU VALOARE LIPSĂ, ȘI NU RÂNDUL ȘTERS. Un site care nu afișează telefonul
// lasă vizitatorul să creadă că l-a ratat el, și îl trimite să caute prin subsol. Un rând
// care spune „nu există încă, iată de ce” închide întrebarea din prima citire și rezervă
// locul în care numărul intră când firma îl are.
//
// De ce marcajul de lipsă nu este o liniuță: o liniuță se citește ca „necompletat din
// neatenție”. Cuvintele spun că absența este o stare cunoscută, nu o scăpare, iar nota de
// alături spune de ce.
//
// VALOAREA CARE EXISTĂ E O ȘTAMPILĂ MONO, cu linie de aramă în stânga - același obiect cu
// citarea din răspunsuri. Nu e ornament: pe pagina asta, singurul lucru care se copiază
// dintr-o privire este adresa, iar mono este litera în care o cifră sau o adresă se citește
// caracter cu caracter. Rândul fără valoare primește aceeași ștampilă în cenușiu, deci
// absența ocupă exact locul pe care îl va ocupa valoarea.

export type Drum = {
  /** Numele drumului, așa cum îl caută cineva: „Telefon”, „Poștă electronică”. */
  eticheta: string;
  /** Valoarea, când există. `null` înseamnă că nu există încă, și atunci se scrie de ce. */
  valoare: string | null;
  /** Unde duce valoarea, dacă este o legătură. Fără el, valoarea se scrie ca text. */
  href?: string;
  /** Ce se întâmplă pe drumul acesta, sau de ce nu există încă. */
  nota: string;
};

const STAMPILA =
  "inline-block border-l-2 px-3 py-1.5 font-mono text-[14px] break-words";

export default function ContactDrumuri({ drumuri }: { drumuri: Drum[] }) {
  return (
    <div className="border-t border-linie">
      {drumuri.map((d) => (
        <div
          key={d.eticheta}
          className="grid gap-3 border-b border-linie py-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-10"
        >
          <h3 className="font-afis text-[clamp(1.2rem,2vw,1.6rem)] font-semibold  text-cerneala">
            {d.eticheta}
          </h3>
          <div>
            {d.valoare === null ? (
              <span
                className={
                  STAMPILA + " border-linie bg-ceata  text-cerneala-2"
                }
              >
                Nu există încă
              </span>
            ) : d.href ? (
              <a
                href={d.href}
                className={
                  STAMPILA +
                  " border-violet bg-alb text-violet underline underline-offset-[3px]"
                }
              >
                {d.valoare}
              </a>
            ) : (
              <span className={STAMPILA + " border-violet bg-alb text-violet"}>
                {d.valoare}
              </span>
            )}
            <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.55] text-cerneala-2">
              {d.nota}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
