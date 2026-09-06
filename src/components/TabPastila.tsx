"use client";

import { useEffect, useId, useState } from "react";

// Tab-urile-pastila din REF-V: raza 999, tabul activ INCHIS cu litera alba, celelalte pe
// `ceata` cu cerneala. Sub ele, panoul: imagine in stanga, text in dreapta.
//
// DE CE E COMPONENTA DE CLIENT, si de ce panourile sunt totusi TOATE in HTML. Continutul
// fiecarui tab se randeaza de la inceput si se ascunde cu atributul `hidden`, nu se
// construieste la apasare. Un agent care nu executa JavaScript citeste asa tot textul celor
// trei pasi, nu doar pe al primului - aceeasi regula ca la panoul meniului, si acolo o
// masoara o proba de browser (`tests/browser/meniu.spec.ts`).
//
// Rolurile ARIA sunt cele din contractul de tab-uri: `tablist`, `tab` cu `aria-selected` si
// `aria-controls`, `tabpanel` cu `aria-labelledby`. Fara ele, axe raporteaza `serious` pe
// butoane care arata a tab-uri si nu spun ce sunt.

export type Fila = {
  cheie: string;
  eticheta: string;
  titlu: string;
  text: string;
  legatura?: { href: string; text: string };
  imagine?: { nume: string; alt: string; pozitie?: string };
};

type Props = {
  file: Fila[];
  /**
   * Butonul fiecarei file primeste ca `id` chiar cheia ei, deci `/#store` aterizeaza pe
   * fila Store SI o deschide. Se cere explicit, nu implicit: doua grupuri de file pe
   * aceeasi pagina ar produce doua elemente cu acelasi id, iar poarta de identificatori
   * (ID-04) o prinde pe drept.
   */
  ancore?: boolean;
};

export default function TabPastila({ file, ancore = false }: Props) {
  const [activ, setActiv] = useState(0);
  const baza = useId();

  // Ancora din adresa alege fila. Fara asta, `/#store` scrie in bara de adrese o promisiune
  // pe care pagina nu o tine: sare la grupul de file si arata tot prima.
  useEffect(() => {
    if (!ancore) return;
    const cheie = window.location.hash.replace("#", "");
    const gasit = file.findIndex((f) => f.cheie === cheie);
    if (gasit >= 0) setActiv(gasit);
  }, [ancore, file]);

  return (
    <div>
      <div role="tablist" aria-label="Cele trei etape" className="flex flex-wrap gap-2">
        {file.map((f, i) => (
          <button
            key={f.cheie}
            id={ancore ? f.cheie : baza + "-tab-" + f.cheie}
            role="tab"
            type="button"
            aria-selected={i === activ}
            aria-controls={baza + "-panou-" + f.cheie}
            onClick={() => setActiv(i)}
            className={
              "cursor-pointer rounded-pastila border-0 px-5 py-2.5 text-nota font-semibold transition-colors duration-200 " +
              (i === activ ? "bg-cerneala text-alb" : "bg-ceata text-cerneala hover:bg-violet-pal")
            }
          >
            {f.eticheta}
          </button>
        ))}
      </div>

      {file.map((f, i) => (
        <div
          key={f.cheie}
          id={baza + "-panou-" + f.cheie}
          role="tabpanel"
          aria-labelledby={ancore ? f.cheie : baza + "-tab-" + f.cheie}
          hidden={i !== activ}
          className="mt-10 md:grid md:grid-cols-2 md:items-center md:gap-12"
        >
          {f.imagine ? (
            // `<picture>` cu sursa de 960 sub 768 px, aceeasi forma ca in `Ecran.tsx`:
            // fisierul de 1920 e PEISAJ, si intr-un card de telefon inalt de 240 px se
            // mareste peste 1x si se inmoaie - de aia exista a doua marime, portret.
            <div className="overflow-hidden rounded-card-mare">
              <picture>
                <source media="(max-width: 767px)" srcSet={"/img/" + f.imagine.nume + "-960.webp"} />
                <img
                  src={"/img/" + f.imagine.nume + "-1920.webp"}
                  alt={f.imagine.alt}
                  className="h-[240px] w-full object-cover md:h-[360px]"
                  style={{ objectPosition: f.imagine.pozitie ?? "center" }}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          ) : null}
          <div className={f.imagine ? "mt-8 md:mt-0" : ""}>
            <h3 className="max-w-[18ch] text-titlu-3 text-cerneala">{f.titlu}</h3>
            <p className="mt-4 max-w-[54ch] text-corp text-cerneala-2">{f.text}</p>
            {f.legatura ? (
              <a
                href={f.legatura.href}
                className="mt-6 inline-block text-corp font-semibold text-violet underline decoration-violet-2 underline-offset-[5px]"
              >
                {f.legatura.text}
              </a>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
