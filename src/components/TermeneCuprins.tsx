// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
import type { TermenCuAncora } from "@/content/termene-extins";

// Cuprinsul verificatorului de termene: un rand pe categorie, cu actul si articolul ca
// stampila mono chiar pe rand.
//
// DE CE ACTUL A COBORAT SUB NUME, DIN A TREIA COLOANA. Pana pe 2026-09-06 tabelul avea trei
// coloane si a treia - actul normativ - se ascundea sub 768 px, fiindca trei coloane de text
// romanesc la 390 px lasa fiecarei coloane sub douazeci de caractere si randurile se rup
// dupa fiecare cuvant. Costul ascunderii il platea exact cititorul de pe telefon, adica cel
// mai probabil cititor al unei pagini trimise prin mesaj: el vedea cifra fara temeiul ei.
// Actul asezat SUB nume, in aceeasi celula, se citeste la orice latime si nu adauga nicio
// coloana. Masurat dupa mutare, la 390 px: latimea de derulare a tabelului e egala cu cea
// vizibila, deci randul nu se trage lateral.
//
// Stampila e aceeasi cu cea din `StampilaCitare` de pe pagina de start - linie de arama in
// stanga, mono, pe treapta de noapte - fiindca e acelasi gest: raspunsul vine cu sursa lui.
// De asta e si singurul accent de arama de pe rand: numele categoriei e hartie veche, nu
// aramiu, iar sageata e a randului intreg.
//
// Recipientul isi pastreaza derularea proprie pe orizontala. Nu fiindca ar trebui derulat -
// masurat, incape - ci fiindca un tabel e locul clasic in care apare derapajul orizontal al
// PAGINII, iar derapajul paginii muta toata coloana de text sub degetul cititorului. Cu
// recipientul, cel mai rau caz posibil ramane inchis in tabel.

const CELULA = "py-5 pr-6 align-top last:pr-0";

export default function TermeneCuprins({
  termene,
  antetDocument,
  antetTermen,
  antetTemei,
  fara,
  faraTemei,
}: {
  termene: TermenCuAncora[];
  antetDocument: string;
  antetTermen: string;
  antetTemei: string;
  fara: string;
  faraTemei: string;
}) {
  return (
    <div className="overflow-x-auto border-t border-linie">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Termenele de păstrare din pagina aceasta, pe scurt. Fiecare categorie duce la fișa
          ei completă, iar actul normativ este scris pe rând.
        </caption>
        <thead>
          <tr className="border-b border-linie">
            <th
              scope="col"
              className="py-2.5 pr-6 font-mono text-[11px] font-medium  text-cerneala-2"
            >
              {antetDocument} · {antetTemei}
            </th>
            <th
              scope="col"
              className="py-2.5 font-mono text-[11px] font-medium  text-cerneala-2"
            >
              {antetTermen}
            </th>
          </tr>
        </thead>
        <tbody>
          {termene.map((t) => (
            <tr key={t.ancora} className="border-b border-linie last:border-b-0">
              <th scope="row" className={CELULA + " w-[66%] font-normal md:w-[58%]"}>
                <a
                  href={"#" + t.ancora}
                  className="group inline-flex items-baseline gap-3 font-afis text-[clamp(1.15rem,1.9vw,1.6rem)] font-semibold  text-cerneala no-underline transition-colors duration-200 hover:text-violet"
                >
                  {t.scurt}
                  <span
                    aria-hidden="true"
                    className="text-violet transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                {t.lege ? (
                  <span className="mt-2 block w-fit border-l-2 border-violet bg-alb px-3 py-1.5 font-mono text-[12.5px] leading-[1.45] text-violet">
                    {t.lege}
                  </span>
                ) : (
                  <span className="mt-2 block w-fit border-l-2 border-linie bg-ceata px-3 py-1.5 font-mono text-[12.5px] leading-[1.45] text-cerneala-2">
                    {faraTemei}
                  </span>
                )}
              </th>
              <td className={CELULA}>
                {t.termen ? (
                  <span className="font-afis text-[clamp(1.05rem,1.6vw,1.35rem)] font-semibold  text-cerneala">
                    {t.termen}
                  </span>
                ) : (
                  <span className="font-mono text-[12.5px]  text-cerneala-2">
                    {fara}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
