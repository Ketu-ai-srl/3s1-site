import Link from "next/link";
import Acordeon from "./Acordeon";
import AntetPagina from "./AntetPagina";
import BandaCTA from "./BandaCTA";
import BlocDovada from "./BlocDovada";
import SegmentAncore from "./SegmentAncore";
import SegmentBandaDovezi from "./SegmentBandaDovezi";
import SegmentGrila from "./SegmentGrila";
import SegmentIncredere from "./SegmentIncredere";
import SegmentListaLipsa from "./SegmentListaLipsa";
import SegmentRandTextImagine from "./SegmentRandTextImagine";
import SegmentSectiune from "./SegmentSectiune";
import { FOTOGRAFII, type CheieFotografie } from "@/content/fotografii";
import { NOTA_CONTACT, SEGMENT } from "@/content/interior-solutii";
import { HUB, INDIFERENT_DE_DOMENIU, type PaginaSegment } from "@/content/segmente";

// Corpul unei pagini de segment, o singura data pentru toate cele sapte.
//
// De ce e componenta si nu cod copiat in fiecare `page.tsx`: cerinta feliei e ca urmatorul
// segment sa se adauge FARA sa rescrie cineva paginile. Cu sablonul aici, un segment nou
// inseamna o constanta in `segmente.ts` si un fisier de ruta de vreo douazeci de randuri.
//
// GRAMATICA, dupa valul S1-b (pagina interioara REF-V, §4):
//   antet alb cu fotografia in card la dreapta
//   rand de incredere: cele trei fapte care nu tin de domeniu, scurt
//   file-pastila de navigare in pagina
//   I    situatia    grila de carduri - ce se intampla azi in domeniul asta
//   II   schimbarea  grila de carduri + un rand text / imagine care duce la mecanism
//   III  dovada      ce nu putem sustine inca, intr-un card
//        banda inchisa: ce se poate verifica inainte de semnatura
//   IV   temeiul     actele numite, ca grila, plus cele doua note despre randul gol
//   V    intrebarile acordeon
//        banda CTA violeta
//
// CE INLOCUIESTE. Pana acum pagina era un REGISTRU: sase `SectiuneRegistru` cu cota in cifre
// romane, titluri la stanga, randuri de `dl` cu linii orizontale si intrebarile ca randuri de
// raspundere. Textul e acelasi, pana la virgula - continutul sta in `segmente.ts`, care e
// inghetat in valul asta - dar asezarea e cea masurata pe pagina interioara REF-V. Proza care
// statea scrisa de mana AICI (titluri de sectiune, linii, nota de sub carduri, paragraful care
// trimite la mecanism) s-a mutat in `src/content/interior-solutii.ts`: nu s-a pierdut niciun
// rand, doar nu mai sta intr-o componenta.
//
// FOTOGRAFIA DE ANTET se alege dupa slug, aici si nu in `segmente.ts`, fiindca e o decizie de
// vitrina, nu un fapt despre domeniu.
//
// `constructii` A PRIMIT FOTOGRAFIE, si motivul vechi chiar a disparut. Statea fara cadru
// fiindca `rafturi` era eroul paginii de start si nu avea voie sa reapara: masurat atunci, cele
// doua capturi de prim ecran aveau diferenta medie absoluta ZERO. In directia REF-V eroul
// paginii de start e GRADIENT, fara nicio fotografie (`src/app/page.tsx` cheama `ton="erou"`
// fara `imagine`, iar `tests/directia.test.ts` cere explicit sa ramana asa), deci `rafturi` nu
// mai deschide nimic si nu se mai poate ciocni de nimic. Argumentul a fost verificat, nu
// mostenit.
const FOTO_ANTET: Record<string, CheieFotografie> = {
  notari: "maini",
  primarii: "sertare",
  contabilitate: "cutii",
  avocatura: "dosare",
  constructii: "rafturi",
  logistica: "legatura",
  imobiliare: "dulapuri",
};

// Al doilea cadru al paginii, cel din randul text / imagine. E ALTUL decat cel de antet pe
// fiecare fisa: doua carduri cu aceeasi poza pe acelasi ecran ar arata ca o greseala de
// randare. Intre pagini diferite cadrul se repeta, si asta e in regula acum - fotografia nu
// mai umple ecranul, sta intr-un card de 320 px inaltime.
const FOTO_RAND: Record<string, CheieFotografie> = {
  notari: "dosare",
  primarii: "dulapuri",
  contabilitate: "legatura",
  avocatura: "maini",
  constructii: "cutii",
  logistica: "sertare",
  imobiliare: "rafturi",
};

type Props = {
  segment: PaginaSegment;
  /** Numele domeniului, asa cum apare pe hub. Ultima veriga din firul de navigare. */
  nume: string;
  slug: string;
};

export default function PaginaDeSegment({ segment, nume, slug }: Props) {
  const adresa = "/solutii/" + slug;

  return (
    <main id="continut">
      <AntetPagina
        adresa={adresa}
        imagine={FOTOGRAFII[FOTO_ANTET[slug]]}
        fir={[
          { text: "Pagina de start", href: "/" },
          { text: HUB.titluMeta, href: "/solutii" },
          { text: nume },
        ]}
        eticheta={segment.eticheta}
        titlu={segment.h1}
        lead={segment.lead}
        actiune={{ href: "/#discutie", text: SEGMENT.butonCta }}
        secundar={{ href: "/solutii", text: "Vedeți toate domeniile" }}
      />

      <SegmentIncredere fapte={INDIFERENT_DE_DOMENIU} />

      <SegmentAncore ancore={SEGMENT.navigare} eticheta="Secțiunile paginii" />

      <SegmentSectiune
        id="situatia"
        ton="alb"
        eticheta={SEGMENT.situatia.eticheta}
        titlu={SEGMENT.situatia.titlu}
        // Restul deschiderii, mutat de pe ecran (campul `continuare` din `segmente.ts`):
        // ecranul pastreaza prima propozitie, aici vine ce nu incapea in cele 40 de cuvinte.
        lead={segment.continuare}
      >
        <SegmentGrila elemente={segment.durere} fundal="alb" />

        {/* Invitatia la corectie sta SUB carduri: e o reactie la ce tocmai s-a citit. */}
        <p className="mx-auto mt-10 max-w-[62ch] text-corp text-cerneala-2">
          {SEGMENT.situatiaNota}
        </p>
      </SegmentSectiune>

      <SegmentSectiune
        id="schimbare"
        ton="ceata"
        eticheta={SEGMENT.schimbare.eticheta}
        titlu={SEGMENT.schimbare.titlu}
        lead={SEGMENT.schimbare.lead}
      >
        <SegmentGrila elemente={segment.schimbare} fundal="ceata" />

        <div className="mt-16 md:mt-20">
          <SegmentRandTextImagine
            titlu={SEGMENT.spreMecanism.titlu}
            text={SEGMENT.spreMecanism.text}
            legatura={SEGMENT.spreMecanism.legatura}
            imagine={FOTOGRAFII[FOTO_RAND[slug]]}
          />
        </div>
      </SegmentSectiune>

      <SegmentSectiune
        id="dovada"
        ton="alb"
        eticheta={SEGMENT.dovada.eticheta}
        titlu={segment.titluDovada}
        lead={SEGMENT.dovada.lead}
      >
        <div className="mx-auto max-w-[46rem] rounded-card-mare bg-ceata p-8 md:p-10">
          <SegmentListaLipsa titlu={SEGMENT.listaDeschise} elemente={segment.deschise} />
        </div>
      </SegmentSectiune>

      <SegmentBandaDovezi
        eticheta={SEGMENT.bandaAratam.eticheta}
        titlu={SEGMENT.bandaAratam.titlu}
        elemente={segment.aratam}
      />

      <SegmentSectiune
        id="temei"
        ton="ceata"
        eticheta={SEGMENT.temei.eticheta}
        titlu={SEGMENT.temei.titlu}
        lead={SEGMENT.temei.lead}
      >
        <SegmentGrila
          elemente={segment.temeiuri.map((t) => ({ titlu: t.act, text: t.ce }))}
          fundal="ceata"
        />

        {/* Doua blocuri, nu unul. Masurat pe cele sapte fise, nota asta era SINGURUL bloc care
            trecea de cele 60 de cuvinte ale directiei - intre 70 si 115 - si e chiar blocul pe
            care pagina isi sprijina onestitatea, deci cel mai pagubos de sarit. Taietura e la
            granita celor doua miscari ale ei: de ce randul ramane gol, si ce se aplica in
            locul lui. */}
        <div className="mx-auto mt-12 max-w-[46rem]">
          <BlocDovada eticheta={SEGMENT.etichetaTermenGol}>{segment.notaTermene}</BlocDovada>
          <BlocDovada eticheta={SEGMENT.etichetaTermenCerere} className="mt-5">
            {segment.notaCerere}
          </BlocDovada>

          <p className="mt-8 text-corp text-cerneala-2">
            Termenele pe care le putem cita pe articol stau în{" "}
            <Link
              href="/instrumente/termene-de-pastrare"
              className="text-violet underline decoration-violet-2 underline-offset-[3px]"
            >
              verificatorul de termene
            </Link>
            , fiecare cu actul normativ și cu data la care a fost citit.
          </p>
        </div>
      </SegmentSectiune>

      <SegmentSectiune
        id="intrebari"
        ton="alb"
        eticheta={SEGMENT.intrebari.eticheta}
        titlu={segment.titluIntrebari}
        lead={SEGMENT.intrebari.lead}
      >
        <div className="mx-auto max-w-[52rem]">
          <Acordeon
            elemente={segment.intrebari.map((i) => ({
              intrebare: i.intrebare,
              raspuns: i.raspuns,
            }))}
          />
        </div>
      </SegmentSectiune>

      {/* UN buton, si spune ce se cere AICI: nu repeta „Programati o discutie de 30 de minute"
          din antet. Fiecare fisa isi scrie textul butonului din propriul paragraf de
          incheiere. */}
      <BandaCTA
        titlu={segment.incheiere.titlu}
        text={segment.incheiere.text}
        actiune={{ href: "/contact", text: segment.incheiere.buton }}
        nota={
          <>
            {NOTA_CONTACT.inainte}
            <a href={"mailto:" + NOTA_CONTACT.adresa} className="text-alb underline underline-offset-[3px]">
              {NOTA_CONTACT.adresa}
            </a>
            {NOTA_CONTACT.dupa}
          </>
        }
      />
    </main>
  );
}
