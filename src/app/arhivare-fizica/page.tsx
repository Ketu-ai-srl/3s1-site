import type { Metadata } from "next";
import Link from "next/link";
import Acordeon from "@/components/Acordeon";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BlocDovada from "@/components/BlocDovada";
import MecanismEtapa from "@/components/MecanismEtapa";
import SegmentAncore from "@/components/SegmentAncore";
import SegmentBandaDovezi from "@/components/SegmentBandaDovezi";
import SegmentGrila from "@/components/SegmentGrila";
import SegmentIncredere from "@/components/SegmentIncredere";
import SegmentListaLipsa from "@/components/SegmentListaLipsa";
import SegmentRandTextImagine from "@/components/SegmentRandTextImagine";
import SegmentSectiune from "@/components/SegmentSectiune";
import { FOTOGRAFII } from "@/content/fotografii";
import { FIZICA_INTERIOR as F, NOTA_CONTACT } from "@/content/interior-solutii";
import { ARHIVARE_FIZICA as A } from "@/content/mecanism";
import { INDIFERENT_DE_DOMENIU } from "@/content/segmente";

// Pagina partii fizice: depozit, preluare, inventar, selectionare, temei.
//
// Ce face pagina asta si nu apartine niciunei alte pagini: leaga fiecare afirmatie de un
// obiect sau de un act - raftul, cutia, cota, procesul-verbal, avizul. Vechimea si autorizarea
// se scriu ATRIBUIT catre ADRIA, firma-mama, nu la persoana intai: 3S nu e inregistrata inca,
// deci nu are ce sa fie autorizat. Regula sta in `.claude/rules/afirmatii-atribuite.md` si e
// aparata de `poarta-afirmatii.py`.
//
// CE S-A SCHIMBAT LA VALUL S1-b. Sase sectiuni de registru, fiecare cu cota in cifre romane si
// cu randuri de fisa pe doua coloane, au devenit gramatica interioara REF-V: grile de carduri
// pe sectiuni alternate alb / ceata, cei patru pasi ai preluarii ca sirag de carduri numerotate,
// cele cinci cuvinte ca acordeon.
//
// DE CE ACORDEON TOCMAI LA CUVINTE. Sectiunea aceea e un glosar: cine stie deja ce e un metru
// liniar nu are ce citi acolo, si pana acum trecea peste cinci randuri late ca sa ajunga la
// selectionare. Pliate, cele cinci definitii ocupa cinci linii si raman la un clic distanta.
// Textul e in HTML-ul servit oricum - `details` / `summary` - deci nu se pierde pentru cine
// citeste fara scripturi.
//
// Continutul sta in `src/content/mecanism.ts`; aici e numai forma paginii.
export const metadata: Metadata = {
  title: A.titluMeta,
  description: A.descriereMeta,
  alternates: { canonical: "/arhivare-fizica" },
};

const LEGATURA = "text-violet underline decoration-violet-2 underline-offset-[3px]";

export default function ArhivareFizica() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/arhivare-fizica"
        imagine={FOTOGRAFII.cutii}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Arhivare fizică" }]}
        eticheta={A.eticheta}
        titlu={A.h1}
        lead={A.lead}
        actiune={{ href: "/#discutie", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/cum-functioneaza", text: "Vedeți mecanismul complet" }}
      />

      <SegmentIncredere fapte={INDIFERENT_DE_DOMENIU} />

      <SegmentAncore ancore={F.navigare} eticheta="Secțiunile paginii" />

      <SegmentSectiune
        id="depozit"
        ton="alb"
        eticheta={F.depozit.eticheta}
        titlu={F.depozit.titlu}
        lead={F.depozit.lead}
      >
        <SegmentGrila elemente={A.depozit} fundal="alb" />
      </SegmentSectiune>

      <SegmentSectiune
        id="preluare"
        ton="ceata"
        eticheta={F.preluare.eticheta}
        titlu={F.preluare.titlu}
        lead={F.preluare.lead}
      >
        <ol className="m-0 grid list-none gap-5 p-0 md:grid-cols-2">
          {A.preluare.map((e, i) => (
            <MecanismEtapa
              key={e.titlu}
              numar={i + 1}
              titlu={e.titlu}
              text={e.text}
              urma={e.urma}
              fundal="ceata"
            />
          ))}
        </ol>

        <div className="mt-16 md:mt-20">
          <SegmentRandTextImagine
            titlu={F.spreMecanism.titlu}
            text={F.spreMecanism.text}
            legatura={F.spreMecanism.legatura}
            imagine={FOTOGRAFII.rafturi}
            invers
          />
        </div>
      </SegmentSectiune>

      <SegmentSectiune
        id="inventar"
        ton="alb"
        eticheta={F.inventar.eticheta}
        titlu={F.inventar.titlu}
        lead={F.inventar.lead}
      >
        <div className="mx-auto max-w-[52rem]">
          <Acordeon
            elemente={A.cuvinte.map((f) => ({ intrebare: f.titlu, raspuns: f.text }))}
          />
        </div>
      </SegmentSectiune>

      <SegmentSectiune
        id="selectionare"
        ton="ceata"
        eticheta={F.selectionare.eticheta}
        titlu={F.selectionare.titlu}
        lead={F.selectionare.lead}
      >
        <SegmentGrila elemente={A.selectionare} fundal="ceata" />

        <div className="mx-auto mt-12 max-w-[46rem]">
          <BlocDovada eticheta={F.etichetaNotaSelectionare}>{A.notaSelectionare}</BlocDovada>
        </div>
      </SegmentSectiune>

      <SegmentSectiune
        id="temei"
        ton="alb"
        eticheta={F.temei.eticheta}
        titlu={F.temei.titlu}
        lead={F.temei.lead}
      >
        <SegmentGrila elemente={A.temeiuri} fundal="alb" coloane={3} mari={false} />

        <div className="mx-auto mt-12 max-w-[46rem]">
          <BlocDovada fel="limite" eticheta={F.etichetaNotaTemei}>
            {A.notaTemei}
          </BlocDovada>

          <p className="mt-8 text-corp text-cerneala-2">
            Termenele pe care le putem cita pe articol stau în{" "}
            <Link href="/instrumente/termene-de-pastrare" className={LEGATURA}>
              verificatorul de termene
            </Link>
            , fiecare cu actul normativ și cu data la care a fost citit.
          </p>
        </div>
      </SegmentSectiune>

      <SegmentBandaDovezi
        eticheta={F.bandaAratam.eticheta}
        titlu={F.bandaAratam.titlu}
        elemente={A.aratam}
      />

      <SegmentSectiune ton="ceata">
        <div className="mx-auto max-w-[46rem] rounded-card-mare bg-alb p-8 md:p-10">
          <SegmentListaLipsa titlu={F.listaDeschise} elemente={A.deschise} />
        </div>
      </SegmentSectiune>

      <BandaCTA
        titlu={A.incheiere.titlu}
        text={A.incheiere.text}
        actiune={{ href: "/#discutie", text: F.butonCta }}
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
