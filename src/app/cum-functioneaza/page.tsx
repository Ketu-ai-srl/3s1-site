import type { Metadata } from "next";
import Link from "next/link";
import Acordeon from "@/components/Acordeon";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BlocDovada from "@/components/BlocDovada";
import ListaBifa from "@/components/ListaBifa";
import MecanismEtapa from "@/components/MecanismEtapa";
import MecanismLant from "@/components/MecanismLant";
import SegmentAncore from "@/components/SegmentAncore";
import SegmentBandaDovezi from "@/components/SegmentBandaDovezi";
import SegmentIncredere from "@/components/SegmentIncredere";
import SegmentListaLipsa from "@/components/SegmentListaLipsa";
import SegmentRandTextImagine from "@/components/SegmentRandTextImagine";
import SegmentSectiune from "@/components/SegmentSectiune";
import { FOTOGRAFII } from "@/content/fotografii";
import { MECANISM_INTERIOR as M, NOTA_CONTACT } from "@/content/interior-solutii";
import { CUM_FUNCTIONEAZA as C } from "@/content/mecanism";
import { INDIFERENT_DE_DOMENIU } from "@/content/segmente";

// Pagina de mecanism. Aici ajunge butonul secundar de pe fisele de domeniu si de pe hub, deci
// sarcina ei e sa raspunda o singura data, complet, la intrebarea pe care o pune oricine preda
// o arhiva: ce se intampla cu ea, in ce ordine, si ce hartie imi ramane dupa fiecare pas.
//
// CE S-A SCHIMBAT LA VALUL S1-b. Cele sase etape stateau in DOUA sectiuni de registru, taiate
// la mijlocul drumului (1-3 pleaca, 4-6 se intorc), fiindca intr-un singur bloc faceau 3494 px
// la 1280 px, adica 4,37 ecrane. In grila REF-V de doua coloane incap toate sase intr-o
// singura sectiune, ceva mai lunga de un ecran, si taietura nu mai e nevoie: numerotarea
// continua 1..6 se vede dintr-o privire, asa cum promite h1-ul. Textul e neatins - continutul
// sta in `src/content/mecanism.ts`, inghetat in valul asta.
//
// Cele cinci verigi ale cautarii NU au trecut in grila, si asta e o alegere de forma, nu o
// scapare: sunt un lant, iar o grila care se citeste in Z ii rupe ordinea. Motivul intreg,
// in `MecanismLant.tsx`.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si ar arata
// spre pagina de start, ceea ce o scoate din index.
export const metadata: Metadata = {
  title: C.titluMeta,
  description: C.descriereMeta,
  alternates: { canonical: "/cum-functioneaza" },
};

const LEGATURA = "text-violet underline decoration-violet-2 underline-offset-[3px]";

export default function CumFunctioneaza() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/cum-functioneaza"
        // Ancora de decupaj ramane la 20%, dar din motivul care a supravietuit directiei
        // vechi, nu din cel care a murit odata cu ea. Baleiat atunci pe `maini-1920.webp`
        // (portret, 1920x2880): la ancora implicita de 50% mana - subiectul cadrului - iese
        // aproape complet din banda vazuta, iar la 20% se vede cu de 2,6 ori mai multa lumina
        // in cadranul liber. ATAT ramane valabil. Cealalta jumatate a masuratorii de atunci -
        // contrastul etichetei de 12 px asezate PESTE fotografie - nu mai are obiect: in
        // REF-V fotografia sta intr-un card la dreapta si nu poarta niciun text peste ea.
        imagine={{ ...FOTOGRAFII.maini, pozitie: "center 20%" }}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Cum funcționează" }]}
        eticheta={C.eticheta}
        titlu={C.h1}
        lead={C.lead}
        actiune={{ href: "/#discutie", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/arhivare-fizica", text: "Vedeți partea fizică" }}
      />

      <SegmentIncredere fapte={INDIFERENT_DE_DOMENIU} />

      <SegmentAncore ancore={M.navigare} eticheta="Secțiunile paginii" />

      <SegmentSectiune
        id="etape"
        ton="alb"
        eticheta={M.etape.eticheta}
        titlu={M.etape.titlu}
        lead={M.etape.lead}
      >
        <ol className="m-0 grid list-none gap-5 p-0 md:grid-cols-2">
          {C.etape.map((e, i) => (
            <MecanismEtapa
              key={e.titlu}
              numar={i + 1}
              titlu={e.titlu}
              text={e.text}
              urma={e.urma}
              fundal="alb"
            />
          ))}
        </ol>

        <div className="mt-16 md:mt-20">
          <SegmentRandTextImagine
            titlu={M.spreFizica.titlu}
            text={M.spreFizica.text}
            legatura={M.spreFizica.legatura}
            imagine={FOTOGRAFII.cutii}
          />
        </div>
      </SegmentSectiune>

      <SegmentSectiune
        id="digitizare"
        ton="ceata"
        eticheta={M.digitizare.eticheta}
        titlu={M.digitizare.titlu}
        lead={M.digitizare.lead}
      >
        {/* Amandoua listele poarta bifa, si asta e corect aici: nu e „ce avem" contra „ce nu
            avem", ci doua drumuri legitime, alese impreuna. Lista cu liniuta e rezervata
            lucrurilor care LIPSESC. */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card-mare bg-alb p-8">
            <ListaBifa titlu={M.listaDigitizat} elemente={C.digitizat} />
          </div>
          <div className="rounded-card-mare bg-alb p-8">
            <ListaBifa titlu={M.listaPeHartie} elemente={C.peHartie} />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-[46rem]">
          <BlocDovada eticheta={M.etichetaNotaDigitizare}>{C.notaDigitizare}</BlocDovada>
        </div>
      </SegmentSectiune>

      <SegmentSectiune
        id="cautare"
        ton="alb"
        eticheta={M.cautare.eticheta}
        titlu={M.cautare.titlu}
        lead={M.cautare.lead}
      >
        <MecanismLant verigi={C.lant} />

        <div className="mx-auto mt-14 max-w-[46rem] rounded-card-mare bg-ceata p-8 md:p-10">
          <SegmentListaLipsa titlu={M.listaNuFace} elemente={C.nuFace} />
        </div>
      </SegmentSectiune>

      <SegmentSectiune
        id="dovada"
        ton="ceata"
        eticheta={M.dovada.eticheta}
        titlu={M.dovada.titlu}
        lead={M.dovada.lead}
      >
        <div className="mx-auto max-w-[46rem] rounded-card-mare bg-alb p-8 md:p-10">
          <SegmentListaLipsa titlu={M.listaDeschise} elemente={C.deschise} />
        </div>
      </SegmentSectiune>

      <SegmentBandaDovezi
        eticheta={M.bandaAratam.eticheta}
        titlu={M.bandaAratam.titlu}
        elemente={C.aratam}
      />

      <SegmentSectiune
        id="hartia"
        ton="alb"
        eticheta={M.hartia.eticheta}
        titlu={M.hartia.titlu}
        lead={M.hartia.lead}
      >
        <div className="mx-auto max-w-[52rem]">
          <Acordeon
            elemente={C.hartie.map((f) => ({ intrebare: f.titlu, raspuns: f.text }))}
          />

          <p className="mt-10 text-corp text-cerneala-2">
            Termenele de păstrare, cu actul normativ din care vin, stau în{" "}
            <Link href="/instrumente/termene-de-pastrare" className={LEGATURA}>
              verificatorul de termene
            </Link>
            . Ce diferă de la un domeniu la altul se citește pe{" "}
            <Link href="/solutii" className={LEGATURA}>
              fișele de domeniu
            </Link>
            .
          </p>
        </div>
      </SegmentSectiune>

      <BandaCTA
        titlu={C.incheiere.titlu}
        text={C.incheiere.text}
        actiune={{ href: "/#discutie", text: M.butonCta }}
        nota={
          <>
            {NOTA_CONTACT.inainte}
            <a
              href={"mailto:" + NOTA_CONTACT.adresa}
              className="text-alb underline underline-offset-[3px]"
            >
              {NOTA_CONTACT.adresa}
            </a>
            {NOTA_CONTACT.dupa}
          </>
        }
      />
    </main>
  );
}
