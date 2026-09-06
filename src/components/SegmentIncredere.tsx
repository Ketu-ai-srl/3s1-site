import type { Fapt } from "@/content/segmente";

// Randul de incredere de sub antet (REF-V.md §4, „Pagina interioara": erou alb scurt, apoi
// un rand de incredere, apoi filele-pastila).
//
// CE PUNE IN EL. In sursa, randul acela poarta un rating si un „recomandat de". Noi nu avem
// nici rating, nici recomandare, si nu inventam: randul poarta cele trei fapte care nu tin
// de domeniu, scrise deja in `INDIFERENT_DE_DOMENIU` (segmente.ts). Aici se vad SCURT, doar
// titlurile lor; textul intreg sta pe hub, la sectiunea care le explica. Acelasi text nu
// apare de doua ori pe aceeasi pagina.
//
// ICONITELE SUNT DESENATE AICI, nu importate. REF-V.md §6 spune „la noi Lucide (MIT),
// aceeasi grosime" (1,5 px), dar `lucide-react` NU e in `package.json` si `pnpm-lock.yaml`
// nu e un fisier al feliei mele: nu adaug o dependinta ca sa desenez trei contururi. Sunt
// `svg` in linie, cu grosimea de 1,5 px ceruta, ca bifa din `ListaBifa` si scutul din
// `Ecran`. Daca vreodata intra Lucide in proiect, se schimba aici, intr-un singur loc.
//
// Culoarea conturului e `violet`: 6,20:1 pe alb. Litera e `cerneala-2`: 7,06:1 pe alb.

const CONTURURI = [
  // cutie de arhiva cu capac
  <>
    <rect x="3" y="4" width="18" height="4" rx="1" />
    <path d="M5 8v11h14V8" />
    <path d="M10 12h4" />
  </>,
  // document cu bifa
  <>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 15l2 2 4-4" />
  </>,
  // balanta
  <>
    <path d="M12 4v16" />
    <path d="M6 8h12" />
    <path d="M6 8l-3 6h6z" />
    <path d="M18 8l3 6h-6z" />
    <path d="M8 20h8" />
  </>,
];

type Props = {
  fapte: Fapt[];
};

export default function SegmentIncredere({ fapte }: Props) {
  return (
    <section className="bg-alb">
      <div className="mx-auto w-full max-w-vitrina px-4 pb-14 md:px-8 md:pb-16">
        <ul className="m-0 flex list-none flex-col items-start gap-4 p-0 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-10 md:gap-y-4">
          {fapte.map((f, i) => (
            <li key={f.titlu} className="flex items-start gap-2.5 text-nota text-cerneala-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-[1px] shrink-0 text-violet"
              >
                {CONTURURI[i % CONTURURI.length]}
              </svg>
              <span>{f.titlu}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
