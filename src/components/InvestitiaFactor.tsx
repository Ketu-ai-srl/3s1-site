import type { FactorCost } from "@/content/comparatie";

// Cardul mare al paginii /investitia, pe gramatica REF-V a sectiunii de preturi: trei carduri
// pe ceata, cel din mijloc INCHIS, cu litera alba.
//
// ADAPTAREA, si e singura de fond. In referinta locul acesta poarta pretul: cifra mare, cifra
// barata, butonul, apoi lista cu bife. Noi nu publicam preturi si nu publicam intervale -
// decizia e a owner-ului si /investitia o explica in acordeonul de la finalul paginii. Ce
// punem in locul cifrei e singurul lucru pe care il putem da cinstit: SCARA. Fiecare element
// de cost isi scrie cele doua directii, „creste cand" si „scade cand", asa incat cititorul
// isi aseze singur fondul undeva intre ele.
//
// DE CE TREI CARDURI SI NU SAPTE RANDURI. Forma dinainte era o lista tipografica de sapte
// randuri, cu titlul fiecarui element urcat la litera de afis: 3368 px la 1280, adica 4,21
// ecrane si 561 de cuvinte sub un singur titlu. Gruparea in trei o aduce la ritmul REF-V, iar
// cele trei grupe sunt scrise in `src/content/interior-investitia.ts`, cu indicii care acopera
// multimea de sapte exact o data.
//
// CULORILE PE CARDUL INCHIS nu sunt alese dupa gust: pe `noapte-v` albul da 18,95:1 si
// `violet-clar` 7,61:1, singurele doua permise de directie. Pe cardul alb, `cerneala` da
// 17,73:1 si `cerneala-2` 7,06:1. Linia dintre elemente e `linie` pe alb si `violet-adanc` pe
// inchis, ca in banda de incredere.
//
// FARA UMBRA. Cardul se desparte de sectiunea de ceata prin culoarea lui de fundal, ca in
// `Card.tsx`; o umbra pe card static e chiar tiparul pe care directia il refuza.

type Props = {
  eticheta: string;
  titlu: string;
  lead: string;
  elemente: FactorCost[];
  inchis?: boolean;
};

export default function InvestitiaFactor({
  eticheta,
  titlu,
  lead,
  elemente,
  inchis = false,
}: Props) {
  const cutie = inchis ? "bg-noapte-v" : "bg-alb";
  const pastila = inchis ? "bg-violet text-alb" : "bg-violet-pal text-violet";
  const titluCard = inchis ? "text-alb" : "text-cerneala";
  const corp = inchis ? "text-violet-clar" : "text-cerneala-2";
  const separator = inchis ? "border-violet-adanc" : "border-linie";
  const numeElement = inchis ? "text-alb" : "text-cerneala";
  const etichetaCreste = inchis ? "text-alb" : "text-violet";
  const etichetaScade = inchis ? "text-violet-clar" : "text-cerneala-2";

  return (
    <li className={"h-full rounded-card-mare p-8 " + cutie}>
      <span
        className={
          "inline-block rounded-pastila px-3 py-1 text-nota font-semibold " + pastila
        }
      >
        {eticheta}
      </span>
      <h3 className={"mt-5 max-w-[18ch] text-titlu-4 " + titluCard}>{titlu}</h3>
      <p className={"mt-3 text-nota " + corp}>{lead}</p>

      <ul className="m-0 mt-8 list-none p-0">
        {elemente.map((e) => (
          <li key={e.titlu} className={"border-t py-6 first:pt-0 " + separator}>
            <h4 className={"text-corp font-semibold " + numeElement}>{e.titlu}</h4>
            <p className={"mt-2 text-nota " + corp}>{e.text}</p>

            {/* Cele doua directii raman o lista de definitii, nu doua paragrafe: sunt
                perechi termen-explicatie, si asa se anunta si intr-un cititor de ecran. */}
            <dl className="m-0 mt-4">
              <dt className={"m-0 text-nota font-semibold " + etichetaCreste}>Crește când</dt>
              <dd className={"m-0 mt-1 text-nota " + corp}>{e.creste}</dd>
              <dt className={"m-0 mt-3 text-nota font-semibold " + etichetaScade}>
                Scade când
              </dt>
              <dd className={"m-0 mt-1 text-nota " + corp}>{e.scade}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </li>
  );
}
