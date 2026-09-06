"use client";

// Bara de sus, randata din `src/app/layout.tsx`, deci prezenta pe fiecare pagina.
//
// REF-V: ALBA, 56 px, ramane la derulare, sigla in stanga, legaturi de 14 px la 24 px
// distanta, iar in dreapta un buton-pastila cu contur violet. Peste eroul paginii de start
// e transparenta, cu litera alba.
//
// CAND E TRANSPARENTA, si de ce regula e atat de ingusta. Un singur ecran din tot site-ul
// are fundal inchis: eroul paginii de start. Paginile interioare deschid cu antet ALB
// (REF-V, pagina interioara), deci acolo litera alba ar fi alb pe alb. Regula e prin urmare
// „pagina de start, nederulata, meniu inchis", nu „orice pagina cunoscuta" cum era in
// directia anterioara, unde toate ecranele de deschidere erau inchise la culoare.
//
// Bara e FIXA, nu lipita in flux (`sticky`), fiindca altfel ar ocupa loc deasupra eroului si
// n-ar mai putea sta peste el transparenta. Rezerva de sub ea o pun ecranele, in `Ecran`.
//
// Panoul de sub 768 px e HTML servit de la inceput, doar ascuns: cine citeste pagina fara
// JavaScript vede toate legaturile. Proba `tests/browser/meniu.spec.ts` masoara exact asta,
// plus deschiderea, inchiderea cu Escape si intoarcerea focalizarii pe buton.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CALE_DISCUTIE, rutePentruMeniu } from "@/content/rute";

const LEGATURA = "text-nota no-underline transition-colors duration-200 whitespace-nowrap";

export default function Navigatie() {
  const cale = usePathname();
  const pagini = rutePentruMeniu();
  const [deschis, setDeschis] = useState(false);
  const [derulat, setDerulat] = useState(false);
  const butonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDeschis(false);
  }, [cale]);

  useEffect(() => {
    const laDerulare = () => setDerulat(window.scrollY > 24);
    laDerulare();
    window.addEventListener("scroll", laDerulare, { passive: true });
    return () => window.removeEventListener("scroll", laDerulare);
  }, []);

  // Panoul acopera tot ecranul, deci pagina de sub el nu are voie sa se mai deruleze:
  // altfel degetul care cauta un rand din meniu muta pagina, nu meniul.
  useEffect(() => {
    if (!deschis) return;
    const inainte = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = inainte;
    };
  }, [deschis]);

  useEffect(() => {
    if (!deschis) return;
    const laTasta = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDeschis(false);
        butonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", laTasta);
    return () => document.removeEventListener("keydown", laTasta);
  }, [deschis]);

  const peErou = cale === "/" && !derulat && !deschis;
  const fundal = peErou ? "bg-transparent" : "border-b border-linie bg-alb";
  const litera = peErou ? "text-alb" : "text-cerneala";
  const literaStinsa = peErou ? "text-alb" : "text-cerneala-2";
  const conturButon = peErou ? "border-alb text-alb" : "border-violet-2 text-violet";

  return (
    <header className={"fixed inset-x-0 top-0 z-40 transition-colors duration-300 " + fundal}>
      <div className="mx-auto flex h-[56px] max-w-vitrina items-center gap-6 px-4 md:px-8">
        <Link href="/" className={"flex items-baseline gap-2 no-underline " + litera}>
          <span className="text-[22px] leading-none font-semibold tracking-[-0.01em]">3S</span>
          <span className={"hidden text-[13px] sm:inline " + literaStinsa}>
            Scan · Store · Solve
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-5" aria-label="Meniu principal">
          <div className="hidden items-center gap-6 md:flex">
            {pagini.map((r) => (
              <Link
                key={r.cale}
                href={r.cale}
                title={r.descriere}
                aria-current={cale === r.cale ? "page" : undefined}
                className={
                  LEGATURA + " " + litera + (cale === r.cale ? " font-semibold" : "")
                }
              >
                {r.scurt}
              </Link>
            ))}
          </div>

          <Link
            href={CALE_DISCUTIE}
            className={
              "hidden shrink-0 rounded-pastila border px-4 py-1.5 text-nota font-semibold no-underline transition-colors duration-200 sm:inline-block " +
              conturButon
            }
          >
            Discuție
          </Link>

          <button
            ref={butonRef}
            type="button"
            onClick={() => setDeschis((d) => !d)}
            aria-expanded={deschis}
            aria-controls="meniu-pliabil"
            className={"-mr-1 shrink-0 cursor-pointer border-0 bg-transparent p-1.5 md:hidden " + litera}
          >
            <span className="sr-only">{deschis ? "Închideți meniul" : "Deschideți meniul"}</span>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
              {deschis ? (
                <path d="M5 5 L17 17 M17 5 L5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M3 6 H19 M3 11 H19 M3 16 H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Inaltimea panoului e calculata, nu `bottom-0`: bara e fixa, deci `bottom-0` ar fi
          insemnat marginea de jos a barei, nu a ecranului. */}
      <div
        id="meniu-pliabil"
        hidden={!deschis}
        className="fixed inset-x-0 top-[56px] h-[calc(100dvh-56px)] overflow-y-auto border-t border-linie bg-alb md:hidden"
      >
        <div className="mx-auto flex min-h-full max-w-vitrina flex-col px-4 pt-2 pb-10">
          {pagini.map((r) => (
            <Link
              key={r.cale}
              href={r.cale}
              aria-current={cale === r.cale ? "page" : undefined}
              className="border-b border-linie py-4 text-subtitlu text-cerneala no-underline"
            >
              {r.scurt}
            </Link>
          ))}
          <Link
            href={CALE_DISCUTIE}
            className="mt-8 inline-flex items-center justify-center self-start rounded-buton bg-violet px-8 py-3 text-corp font-semibold text-alb no-underline"
          >
            Discuție de 30 de minute
          </Link>
        </div>
      </div>
    </header>
  );
}
