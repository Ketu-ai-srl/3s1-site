import Link from "next/link";
import type { ReactNode } from "react";

// Ecranul de deschidere al unei pagini, in doua limbaje, si diferenta dintre ele e chiar
// diferenta dintre pagina de start si o pagina interioara in REF-V:
//
//   ton="erou"   fundal violet-adanc cu gradient spre noapte-v (clasa `.erou-violet` din
//                `globals.css`), text ALB centrat, h1 de 72 px pe doua randuri, un paragraf
//                de 16 px, UN buton alb si un rand de 14 px cu o iconita sub el.
//                FARA FOTOGRAFIE - o da chiar REF-V: eroul e culoare, nu imagine.
//   restul       antet ALB, scurt: titlu la stanga, linia, butonul violet, iar fotografia,
//                cand pagina da una, intra intr-un CARD cu raza 16 px in dreapta. Asta e
//                gramatica paginii interioare din REF-V, si ea rezolva dintr-o data si
//                problema care a costat trei felii in directia anterioara: nu mai exista
//                text peste fotografie, deci nu mai exista voal de calibrat pe fiecare
//                cadru, nici contrast nemasurabil de axe.
//
// FOTOGRAFIA e mica si are colturi. Nu se mai intinde pe tot ecranul, si nu mai poarta voal.
// Campurile `filtru` si `voalBanda` erau acceptate aici doar ca paginile altor felii sa
// compileze, cu nota ca „se scot atunci" - adica la valul care rescrie paginile interioare.
// Valul acela a aterizat, deci s-au scos, si de aici si din registru: erau cifre masurate
// contra unei pagini de noapte cu saturatia 0,044, iar acea referinta nu mai exista.
//
// INALTIMEA. Bara de sus e FIXA si are 56 px, deci fiecare forma isi pune singura rezerva:
// 96 px la antetul alb (56 plus o rasuflare de 40), mai mult la erou, unde textul trebuie sa
// stea in mijlocul unei benzi inalte.

type Imagine = {
  /** numele fisierului fara sufixul de marime, ex. `rafturi` -> rafturi-1920.webp */
  nume: string;
  alt: string;
  /** unde sa se ancoreze decupajul cand cardul are alta proportie decat fotografia */
  pozitie?: string;
};

type Legatura = { href: string; text: string };

type Props = {
  id?: string;
  imagine?: Imagine;
  eticheta: string;
  titlu: ReactNode;
  text?: ReactNode;
  /** UN buton pe ecran. */
  actiune?: Legatura;
  /** o legatura de text langa buton, pentru drumul al doilea; nu e al doilea buton */
  secundar?: Legatura;
  /** o linie mica sub buton, de ex. garantia sau atribuirea catre firma-mama */
  dovada?: ReactNode;
  /** deasupra etichetei: firul de navigare al paginilor interioare */
  inainte?: ReactNode;
  /** `h1` doar pe primul ecran */
  nivel?: "h1" | "h2";
  /** continut suplimentar sub linie (de ex. stampila de citare) */
  children?: ReactNode;
  /**
   * `erou` = banda violeta a paginii de start. `foto` si `plin` dau amandoua antetul ALB;
   * numele lor raman pentru paginile altor felii, care le scriu deja.
   */
  ton?: "foto" | "plin" | "erou";
  /** `banda` scurteaza antetul: paginile care sunt documente sau unelte */
  forma?: "ecran" | "banda";
  className?: string;
};

// Butonul ecranului, exportat fiindca il refolosesc sectiunile paginii de start care nu
// trec prin `Ecran`. Alb pe fundal inchis: pe gradientul eroului un buton violet ar avea
// 1,9:1 fata de fundal si ar disparea.
export const CLASA_BUTON_ECRAN =
  "inline-flex items-center justify-center rounded-buton bg-alb px-8 py-3 text-corp font-semibold text-cerneala no-underline transition-colors duration-200 hover:bg-violet-pal";

const CLASA_BUTON_VIOLET =
  "inline-flex items-center justify-center rounded-buton bg-violet px-8 py-3 text-corp font-semibold text-alb no-underline transition-colors duration-200 hover:bg-violet-2";

export default function Ecran({
  id,
  imagine,
  eticheta,
  titlu,
  text,
  actiune,
  secundar,
  dovada,
  inainte,
  nivel = "h2",
  children,
  ton = "foto",
  forma = "ecran",
  className = "",
}: Props) {
  const Titlu = nivel;
  const erou = ton === "erou";
  const banda = forma === "banda";
  const cuFoto = Boolean(imagine) && !erou;

  const captuseala = erou
    ? "pt-[136px] pb-24 md:pt-[168px] md:pb-28"
    : banda
      ? "pt-[96px] pb-10 md:pt-[112px] md:pb-12"
      : "pt-[96px] pb-14 md:pt-[120px] md:pb-16";

  return (
    <section
      id={id}
      className={
        "relative isolate " + (erou ? "erou-violet " : "bg-alb ") + className
      }
    >
      <div
        className={
          "mx-auto w-full max-w-vitrina px-4 md:px-8 " +
          captuseala +
          (erou ? " text-center" : "")
        }
      >
        <div
          className={
            cuFoto
              ? "md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:items-center md:gap-x-12 lg:gap-x-16"
              : ""
          }
        >
          <div className={erou ? "mx-auto max-w-[64rem]" : ""}>
            {inainte}
            {/* Eticheta e `span`, nu `p`, si nu e cosmetica de markup: un cuvant-doua
                deasupra titlului nu e proza, iar poarta S-17 cantareste paragrafele
                adevarate, comparand textul randat cu cel citit fara JavaScript. */}
            <span
              className={
                "mb-4 block text-nota font-semibold " +
                (erou ? "text-violet-clar" : "text-violet")
              }
            >
              {eticheta}
            </span>
            <Titlu
              className={
                erou
                  ? "mx-auto text-titlu-1 text-alb"
                  : "max-w-[20ch] text-titlu-2 text-cerneala"
              }
            >
              {titlu}
            </Titlu>
            {text ? (
              <p
                className={
                  "mt-5 max-w-[62ch] text-corp " +
                  (erou ? "mx-auto text-alb" : "text-cerneala-2")
                }
              >
                {text}
              </p>
            ) : null}
            {children}
            {actiune ? (
              <div
                className={
                  "mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" +
                  (erou ? " justify-center" : "")
                }
              >
                <Link
                  href={actiune.href}
                  className={erou ? CLASA_BUTON_ECRAN : CLASA_BUTON_VIOLET}
                >
                  {actiune.text}
                </Link>
                {secundar ? (
                  <Link
                    href={secundar.href}
                    className={
                      "text-corp font-semibold underline underline-offset-[5px] " +
                      (erou
                        ? "text-alb decoration-violet-clar hover:text-violet-clar"
                        : "text-violet decoration-violet-2 hover:text-cerneala")
                    }
                  >
                    {secundar.text}
                  </Link>
                ) : null}
              </div>
            ) : null}
            {dovada ? (
              <p
                className={
                  "mt-5 flex max-w-[60ch] items-start gap-2 text-nota " +
                  (erou ? "mx-auto justify-center text-violet-clar" : "text-cerneala-2")
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  focusable="false"
                  className="mt-[3px] shrink-0"
                >
                  <path
                    d="M8 1.5 L13.5 3.5 V8 c0 3.2 -2.3 5.6 -5.5 6.5 C4.8 13.6 2.5 11.2 2.5 8 V3.5 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{dovada}</span>
              </p>
            ) : null}
          </div>

          {cuFoto && imagine ? (
            // Fotografia paginii interioare: card cu raza 16 px in dreapta, nu fond de
            // ecran. Nu poarta text peste ea, deci nu are nevoie de voal si nu intra in
            // niciun calcul de contrast.
            <div className="mt-10 overflow-hidden rounded-card-mare md:mt-0">
              <picture>
                <source media="(max-width: 767px)" srcSet={"/img/" + imagine.nume + "-960.webp"} />
                <img
                  src={"/img/" + imagine.nume + "-1920.webp"}
                  alt={imagine.alt}
                  className="h-[240px] w-full object-cover md:h-[340px]"
                  style={{ objectPosition: imagine.pozitie ?? "center" }}
                  loading={nivel === "h1" ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
