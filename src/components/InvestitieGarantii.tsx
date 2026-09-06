// Randul de garantii de sub antetul paginii interioare: trei randuri scurte de 14 px, cu
// iconita in linie, centrate pe alb. E locul pe care REF-V il da „randului de incredere" -
// in referinta acolo stau o nota de la un site de recenzii si o recomandare; noi nu avem nici
// una, nici alta, si nu punem sigle imprumutate in loc.
//
// Ce punem sunt trei promisiuni pe care le tine chiar site-ul, fiecare scrisa deja altundeva:
// `INVESTITIA.nuPrimiti`, `INVESTITIA.factori[0]` si `ARATAM` de pe /despre. Textele lor stau
// in `src/content/interior-investitia.ts`.
//
// ICONITA E DECOR SI ATAT: `aria-hidden`, deci nu ajunge la cititorul de ecran, iar
// informatia sta in cuvinte. Aceeasi regula ca la bifa din `ListaBifa` - culoarea nu poarta
// niciodata sensul.
//
// Litera e `cerneala-2` (7,06:1 pe alb), nu `cerneala-3`: randul are 14 px, adica text mic.

type Props = {
  elemente: string[];
};

export default function InvestitieGarantii({ elemente }: Props) {
  return (
    <ul className="m-0 flex list-none flex-wrap justify-center gap-x-10 gap-y-3 p-0">
      {elemente.map((e) => (
        <li key={e} className="flex items-start gap-2 text-nota text-cerneala-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
            focusable="false"
            className="mt-[3px] shrink-0 text-violet"
          >
            <path
              d="M8 1.5 L13.5 3.5 V8 c0 3.2 -2.3 5.6 -5.5 6.5 C4.8 13.6 2.5 11.2 2.5 8 V3.5 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <span>{e}</span>
        </li>
      ))}
    </ul>
  );
}
