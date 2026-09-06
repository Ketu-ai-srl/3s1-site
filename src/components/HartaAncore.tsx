import type { SectiuneAcasa } from "@/content/rute";

// Ancorele paginii de start, in harta site-ului: nu sunt pagini, sunt locuri dintr-o pagina.
//
// DE CE ARATA ALTFEL DECAT CARDURILE DE RUTA, si de ce trebuie sa arate altfel. Un card de
// ruta poarta nume, descriere si adresa, fiindca fiecare e o pagina cu continutul ei; aici
// nu exista nici descriere, nici adresa proprie - exista doar un nume si un diez. Randate
// cu aceeasi forma, cele cinci ancore ar fi aratat ca inca cinci pagini, adica exact
// afirmatia pe care pagina de fata o dezminte in linia ei. Deci sunt PASTILE: forma REF-V
// pentru un rand de trimiteri scurte, raza 999, litera de 14 px.
//
// Inainte erau randuri late cat pagina, cu numele condensat, cu MAJUSCULE si cu sageata la
// capat - aceeasi forma cu a rutelor, pe o coloana, pe fundal de noapte.

export default function HartaAncore({ sectiuni }: { sectiuni: SectiuneAcasa[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
      {sectiuni.map((s) => (
        <li key={s.ancora}>
          <a
            href={"/#" + s.ancora}
            className="group inline-flex items-center gap-2 rounded-pastila bg-alb px-5 py-2.5 text-nota font-semibold text-cerneala no-underline transition-colors duration-200 hover:bg-violet-pal hover:text-violet"
          >
            {s.scurt}
            <span
              aria-hidden="true"
              className="text-violet transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
