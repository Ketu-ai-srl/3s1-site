import Link from "next/link";

// Un domeniu pe hub-ul /solutii: un CARD, in grila de doua coloane.
//
// CE S-A SCHIMBAT LA VALUL S1-b, si de ce. Randul de lista era forma directiei anterioare:
// sapte randuri late, cu numele la 33 px si o linie subtire intre ele, adica un registru.
// REF-V pune aceeasi multime intr-o grila de carduri pe ceata, cu sageata diagonala in
// coltul din dreapta-sus (§4.5). Sageata diagonala e marca „duce in alta parte" si nu se
// repeta ca indemn: nu scrie nimic, e un semn.
//
// Cardul e alb pe sectiune de ceata, fara umbra: separarea se face prin culoarea de fundal,
// ca peste tot in REF-V. `Card`, componenta inghetata, nu poate purta sageata in colt, deci
// cardul asta e scris aici; razele si logica de fundal sunt aceleasi.
//
// CELE DOUA STARI RAMAN, si diferenta e tot o decizie de onestitate, nu de stil:
//   - cu `href`: domeniul are pagina proprie, cardul intreg e legatura;
//   - fara `href`: domeniul e pe lista, dar pagina nu exista inca, deci cardul NU e
//     legatura, iar in coltul lui sta eticheta „In pregatire" in locul sagetii. O legatura
//     catre o pagina care nu exista e o legatura moarta.
// Starea vine din date (`pagina` nenul in `segmente.ts`), nu dintr-un steag scris de mana pe
// hub: asa nu poate exista un card care promite o pagina inexistenta.

type Props = {
  titlu: string;
  href?: string;
  children: React.ReactNode;
};

const CUTIE = "relative block h-full rounded-card-mare p-8 no-underline";
const TITLU = "max-w-[16ch] text-titlu-4 text-cerneala";
const REZUMAT = "mt-3 max-w-[42ch] text-corp text-cerneala-2";

function SageataDiagonala() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute top-7 right-7 text-violet transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    >
      <path d="M6 14 L14 6" />
      <path d="M7 6h7v7" />
    </svg>
  );
}

export default function FisaDomeniu({ titlu, href, children }: Props) {
  if (!href) {
    return (
      <li className="list-none">
        <div className={CUTIE + " bg-alb"}>
          <span className="absolute top-7 right-7 rounded-pastila bg-ceata px-3 py-1 text-nota font-semibold text-cerneala-2">
            În pregătire
          </span>
          <h3 className={TITLU}>{titlu}</h3>
          <p className={REZUMAT}>{children}</p>
        </div>
      </li>
    );
  }

  return (
    <li className="list-none">
      <Link
        href={href}
        className={CUTIE + " group bg-alb transition-colors duration-200 hover:bg-violet-pal"}
      >
        <SageataDiagonala />
        <h3 className={TITLU}>{titlu}</h3>
        <p className={REZUMAT}>{children}</p>
      </Link>
    </li>
  );
}
