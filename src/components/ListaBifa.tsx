// Lista cu bifa verde a REF-V: `succes` (#009e5b) deseneaza semnul, textul ramane la 16 px
// in cerneala secundara. Bifa e ICOANA, nu litera: contrastul ei fata de alb e 3,48:1, sub
// pragul de text, si de aceea informatia nu sta niciodata in culoarea ei, ci in cuvant.
//
// `inchis` a ramas in semnatura pentru paginile altor felii care il dau inca; nu mai are
// efect, fiindca nu mai exista suprafata inchisa sub liste.

type Props = {
  titlu: string;
  elemente: string[];
  inchis?: boolean;
};

export default function ListaBifa({ titlu, elemente }: Props) {
  return (
    <div>
      <h3 className="mb-5 text-titlu-4 text-cerneala">{titlu}</h3>
      <ul className="m-0 list-none p-0">
        {elemente.map((e) => (
          <li key={e} className="mb-3 flex gap-3 text-corp text-cerneala-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              aria-hidden="true"
              focusable="false"
              className="mt-[3px] shrink-0 text-succes"
            >
              <path
                d="M3.5 9.5 L7 13 L14.5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{e}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
