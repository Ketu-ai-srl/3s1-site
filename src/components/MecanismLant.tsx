import type { Veriga } from "@/content/mecanism";

// Cele cinci verigi ale cautarii: de la intrebarea pusa in romana pana la pagina citita.
//
// DE CE NU E O GRILA DE CARDURI, ca etapele de deasupra. Verigile sunt un LANT: fiecare are
// sens numai dupa cea dinainte, iar argumentul paginii e ca lantul se opreste acolo unde
// lipseste o veriga. O grila de doua coloane citeste in Z si rupe ordinea; o coloana ingusta
// cu numere legate printr-o linie verticala o pastreaza. Doua forme diferite pe aceeasi
// pagina, fiindca poarta doua feluri de continut.
//
// Linia verticala e desenata cu un `span` absolut, nu cu un caracter, si e `aria-hidden`:
// lista se aude ca lista numerotata, nu ca un sir de liniute.

type Props = {
  verigi: Veriga[];
};

export default function MecanismLant({ verigi }: Props) {
  return (
    <ol className="m-0 mx-auto max-w-[46rem] list-none p-0">
      {verigi.map((v, i) => (
        <li key={v.titlu} className="relative flex gap-5 pb-8 last:pb-0 md:gap-7">
          <div className="relative shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-pastila bg-violet-pal text-nota font-semibold text-violet">
              {i + 1}
            </span>
            {i < verigi.length - 1 ? (
              <span
                aria-hidden
                className="absolute top-11 bottom-[-32px] left-1/2 w-px -translate-x-1/2 bg-linie"
              />
            ) : null}
          </div>

          <div className="pt-1.5">
            <h3 className="max-w-[28ch] text-subtitlu text-cerneala">{v.titlu}</h3>
            <p className="mt-2 max-w-[58ch] text-corp text-cerneala-2">{v.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
