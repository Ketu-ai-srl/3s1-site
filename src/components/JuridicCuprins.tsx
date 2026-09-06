"use client";

import { useEffect, useState } from "react";
import Acordeon from "./Acordeon";
import { CUPRINS } from "@/content/interior-juridic";

// Cuprinsul unui act, in doua forme, dupa latime:
//
//   de la 1024 px  o coloana LIPICIOASA in stanga documentului, la 14 px, in `cerneala-2`,
//                  cu intrarea sectiunii citite acum in `violet`. Ramane pe ecran cat timp
//                  se deruleaza actul, deci cine cauta o clauza vede unde a ajuns.
//   sub 1024 px    un ACORDEON deasupra textului, inchis. Nu e o coloana ascunsa: o coloana
//                  de noua intrari pusa deasupra unui act de noua sectiuni ar impinge primul
//                  paragraf sub linia de plutire, adica exact costul pe care banda de antet
//                  a fost scurtata ca sa-l evite.
//
// AMANDOUA FORMELE SUNT IN HTML-UL SERVIT. Nu se construieste nimic la apasare si nu se
// randeaza conditionat din JavaScript: ce alege latimea sunt clasele `lg:hidden` si
// `hidden lg:block`, deci cine citeste pagina fara scripturi are cuprinsul intreg. Singurul
// lucru pe care il face scriptul e sa MUTE accentul de pe o intrare pe alta.
//
// DE CE `IntersectionObserver` SI NU POZITIA DERULARII. Observatorul raspunde la ce e pe
// ecran, nu la cati pixeli s-au derulat, deci nu are nevoie sa stie inaltimea sectiunilor si
// nu se strica atunci cand una creste. Fereastra e ingustata sus cu 80 px, cat bara lipicioasa
// de 56 plus rasuflarea ei: fara asta, sectiunea de sub bara ar fi socotita vizibila cat timp
// e chiar acoperita de bara.
//
// Cand scriptul nu ruleaza, prima intrare ramane cea marcata. Nu e o minciuna despre pozitie:
// la incarcare chiar prima sectiune e cea de sus.

export type IntrareCuprins = { id: string; titlu: string };

function Lista({
  intrari,
  activ,
}: {
  intrari: IntrareCuprins[];
  activ: string;
}) {
  return (
    <ol className="m-0 grid list-none gap-y-3 p-0">
      {intrari.map((s, i) => (
        <li key={s.id} className="flex items-baseline gap-3">
          <span aria-hidden className="w-4 shrink-0 text-nota text-cerneala-3">
            {i + 1}
          </span>
          <a
            href={"#" + s.id}
            aria-current={s.id === activ ? "true" : undefined}
            className={
              "text-nota no-underline transition-colors duration-200 hover:text-violet " +
              (s.id === activ ? "text-violet" : "text-cerneala-2")
            }
          >
            {s.titlu}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function JuridicCuprins({ intrari }: { intrari: IntrareCuprins[] }) {
  const [activ, setActiv] = useState(intrari[0]?.id ?? "");

  useEffect(() => {
    const tinte = intrari
      .map((s) => document.getElementById(s.id))
      .filter((e): e is HTMLElement => e !== null);
    if (tinte.length === 0) return;

    const observator = new IntersectionObserver(
      (intrate) => {
        const vizibile = intrate.filter((i) => i.isIntersecting);
        if (vizibile.length === 0) return;
        // Cea mai de sus dintre cele vizibile: aia e sectiunea pe care o citeste omul.
        vizibile.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiv(vizibile[0].target.id);
      },
      { rootMargin: "-80px 0px -55% 0px", threshold: 0 },
    );

    for (const t of tinte) observator.observe(t);
    return () => observator.disconnect();
  }, [intrari]);

  return (
    <>
      <div className="mb-10 lg:hidden">
        <Acordeon
          elemente={[
            {
              intrebare: CUPRINS.eticheta,
              raspuns: <Lista intrari={intrari} activ={activ} />,
            },
          ]}
        />
      </div>

      <nav
        aria-label={CUPRINS.numeNavigatie}
        className="hidden lg:sticky lg:top-[76px] lg:block"
      >
        <span className="mb-4 block text-nota font-semibold text-cerneala">
          {CUPRINS.eticheta}
        </span>
        <Lista intrari={intrari} activ={activ} />
      </nav>
    </>
  );
}
