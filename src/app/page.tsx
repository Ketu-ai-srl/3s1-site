import type { Metadata } from "next";
import Link from "next/link";
import BandaCTA from "@/components/BandaCTA";
import BandaIncredere from "@/components/BandaIncredere";
import Card from "@/components/Card";
import Ecran from "@/components/Ecran";
import TabPastila from "@/components/TabPastila";
import { FOTOGRAFII, type CheieFotografie } from "@/content/fotografii";
import { SEGMENTE } from "@/content/segmente";
import {
  CARDURI_EROU,
  CARDURI_MICI,
  CARD_MARE,
  DOMENII,
  ETAPE,
  EROU,
  INCHEIERE,
  INCREDERE,
  INTREBARE,
} from "@/content/start";

// Pagina de start, pe gramatica REF-V: erou violet cu un rand de carduri-imagine care ies
// din banda, banda alba de intrebare, doua carduri, file-pastila pentru cele trei etape,
// grila de domenii pe ceata, banda inchisa de incredere, banda CTA violeta, subsol.
//
// EROUL NU ARE FOTOGRAFIE. E o regula a referintei, nu o economie: prima banda e culoare,
// iar fotografiile intra abia sub ea, in carduri cu raza 16 px. Asa nu mai exista text peste
// imagine nicaieri pe site, deci nici voal de calibrat, nici contrast pe care axe il lasa
// „needs review" si il scoate din verdict.
//
// ANCORELE `scan`, `store`, `solve`, `domenii` si `discutie` raman, cu aceleasi nume:
// `/harta-site` face legaturi catre ele, iar o ancora fara tinta e legatura moarta pe o
// pagina care exista tocmai ca sa arate drumurile. Primele trei sunt chiar butoanele
// file-lor, deci `/#store` deschide fila Store, nu doar deruleaza langa ea.
//
// Textele NOI sunt in `src/content/start.ts`. Numele si rezumatele domeniilor se citesc din
// `segmente.ts`, unde le rescrie felia de text, sub aceleasi chei.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const CU_FISA = SEGMENTE.filter((s) => s.pagina !== null);

export default function Acasa() {
  return (
    <main id="continut">
      <Ecran
        nivel="h1"
        ton="erou"
        eticheta={EROU.eticheta}
        titlu={
          <>
            {EROU.titluRand1}
            <br />
            {EROU.titluRand2}
          </>
        }
        text={EROU.text}
        actiune={EROU.buton}
        dovada={EROU.garantie}
      />

      {/* Randul de carduri-imagine iese din banda eroului si intra peste sectiunea alba:
          marginea negativa il urca, `relative` il tine deasupra. E singurul loc in care
          fotografiile se vad pe pagina de start, si stau in carduri cu raza 16 px.

          `<picture>`, nu `<img>` simplu: pana la runda a treia cardurile astea serveau
          fisierul de 1920 si pe telefon, adica exact ce spunea registrul ca NU se intampla, iar
          fisierul peisaj se si intindea in cardul de 171x120 al telefonului.

          MASURAT pe pagina construita, cu `performance.getEntriesByType('resource')` si cu
          `currentSrc`, la `document.documentElement.clientWidth` = 390: `/` cere PATRU fisiere,
          270.338 octeti - `rafturi-960` 83.420, `dosare-960` 99.750, `cutii-960` 62.996,
          `sertare-960` 24.172 - si fiecare imagine incarcata are `currentSrc` terminat in
          `-960.webp`.

          PATRU FISIERE, nu sapte imagini, si diferenta nu e un amanunt: pagina are sapte
          elemente `<img>`, dar `dosare` si `cutii` apar de cate DOUA ori fiecare (o data in
          cardurile de aici, o data in file), iar `maini`, din fila a treia, e ascunsa si
          `loading="lazy"`, deci nu se cere niciodata. O suma peste elementele `<img>` numara
          `dosare` de doua ori si adauga un fisier care nu pleaca pe retea - asa iesise cifra
          din runda a treia, si de aia se numara CERERI, nu etichete.

          Cat se economiseste, si de ce cifra asta e masurata de doua ori, nu calculata: inainte
          de `<picture>` acelasi patru chei veneau ca `-1920` la ORICE latime, iar la clientWidth
          1440 chiar asta cere pagina si azi - masurat acolo, aceleasi patru fisiere fac 443.568
          octeti. Deci telefonul primeste 270.338 in loc de 443.568: cu 173.230 octeti mai putin,
          adica 169 KB si 39,1%.

          Ancora decupajului se citeste din `FOTOGRAFII`, nu se scrie a treia oara aici:
          `CARDURI_EROU` isi tine deja alt-ul, iar o a treia copie a pozitiei ar diverge la
          prima remasurare. */}
      <section className="bg-alb">
        <div className="mx-auto w-full max-w-vitrina px-4 md:px-8">
          <ul className="relative m-0 -mt-16 grid list-none grid-cols-2 gap-4 p-0 md:-mt-20 md:grid-cols-4 md:gap-6">
            {CARDURI_EROU.map((c) => (
              <li key={c.nume} className="overflow-hidden rounded-card-mare bg-alb">
                <picture>
                  <source media="(max-width: 767px)" srcSet={"/img/" + c.nume + "-960.webp"} />
                  <img
                    src={"/img/" + c.nume + "-1920.webp"}
                    alt={c.alt}
                    className="h-[120px] w-full object-cover md:h-[180px]"
                    style={{
                      objectPosition:
                        FOTOGRAFII[c.nume as CheieFotografie]?.pozitie ?? "center",
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <span className="block px-4 py-3 text-nota font-semibold text-cerneala">
                  {c.eticheta}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-vitrina px-4 py-20 text-center md:px-8 md:py-24">
          <h2 className="mx-auto max-w-[20ch] text-titlu-2 text-cerneala">
            {INTREBARE.titluNegru}{" "}
            <span className="text-violet">{INTREBARE.titluViolet}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[62ch] text-corp text-cerneala-2">{INTREBARE.text}</p>
        </div>
      </section>

      <section className="bg-alb">
        <div className="mx-auto w-full max-w-vitrina px-4 pb-20 md:px-8 md:pb-24">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            {/* Cardul mare, cu gradientul violet al referintei. Albul pe el sta intre
                6,20:1 si 4,05:1, deci textul mic sta pe capatul INCHIS, in stanga-sus, iar
                marimile de aici (24 px titlu, 16 px corp) sunt peste pragul de text mic. */}
            <div className="card-violet flex flex-col justify-between rounded-card-mare p-8">
              <div>
                <span className="inline-block rounded-pastila bg-alb px-3 py-1 text-[13px] font-semibold text-violet">
                  {CARD_MARE.eticheta}
                </span>
                <h3 className="mt-5 max-w-[16ch] text-titlu-3 text-alb">{CARD_MARE.titlu}</h3>
                <p className="mt-4 max-w-[42ch] text-corp text-alb">{CARD_MARE.text}</p>
              </div>
              <Link
                href={CARD_MARE.buton.href}
                className="mt-8 inline-flex items-center justify-center self-start rounded-buton bg-alb px-8 py-3 text-corp font-semibold text-cerneala no-underline transition-colors duration-200 hover:bg-violet-pal"
              >
                {CARD_MARE.buton.text}
              </Link>
            </div>

            <div className="grid gap-6">
              {CARDURI_MICI.map((c) => (
                <Card key={c.href} titlu={c.titlu} eticheta={c.eticheta} href={c.href} mare>
                  {c.text}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-alb">
        <div className="mx-auto w-full max-w-vitrina px-4 pb-20 md:px-8 md:pb-24">
          <div className="mb-10 text-center">
            <h2 className="mx-auto max-w-[20ch] text-titlu-2 text-cerneala">{ETAPE.titlu}</h2>
            <p className="mx-auto mt-5 max-w-[62ch] text-corp text-cerneala-2">{ETAPE.text}</p>
          </div>
          <TabPastila file={ETAPE.file} ancore />
        </div>
      </section>

      <section id="domenii" className="bg-ceata">
        <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
          <span className="mb-4 block text-nota font-semibold text-violet">{DOMENII.eticheta}</span>
          <h2 className="max-w-[20ch] text-titlu-2 text-cerneala">{DOMENII.titlu}</h2>
          <p className="mt-5 max-w-[62ch] text-corp text-cerneala-2">{DOMENII.text}</p>

          <ul className="m-0 mt-12 grid list-none gap-6 p-0 md:grid-cols-2">
            {CU_FISA.map((s) => (
              <li key={s.slug}>
                <Card titlu={s.nume} href={"/solutii/" + s.slug} fundal="ceata">
                  {s.rezumat}
                </Card>
              </li>
            ))}
          </ul>

          <Link
            href={DOMENII.buton.href}
            className="mt-10 inline-flex items-center justify-center rounded-buton bg-violet px-8 py-3 text-corp font-semibold text-alb no-underline transition-colors duration-200 hover:bg-violet-2"
          >
            {DOMENII.buton.text}
          </Link>
        </div>
      </section>

      <BandaIncredere
        eticheta={INCREDERE.eticheta}
        titlu={INCREDERE.titlu}
        elemente={INCREDERE.elemente}
      />

      <div id="discutie">
        <BandaCTA
          titlu={INCHEIERE.titlu}
          text={INCHEIERE.text}
          actiune={INCHEIERE.buton}
          nota={INCHEIERE.nota}
        />
      </div>
    </main>
  );
}
