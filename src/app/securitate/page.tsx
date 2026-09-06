import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BlocDovada from "@/components/BlocDovada";
import ListaBifa from "@/components/ListaBifa";
import MecanismEtapa from "@/components/MecanismEtapa";
import SecuritateIntrebare from "@/components/SecuritateIntrebare";
import SegmentAncore from "@/components/SegmentAncore";
import SegmentBandaDovezi from "@/components/SegmentBandaDovezi";
import SegmentGrila from "@/components/SegmentGrila";
import SegmentIncredere from "@/components/SegmentIncredere";
import SegmentRandTextImagine from "@/components/SegmentRandTextImagine";
import SegmentSectiune from "@/components/SegmentSectiune";
import { FOTOGRAFII } from "@/content/fotografii";
import { NOTA_CONTACT, SECURITATE_INTERIOR as I } from "@/content/interior-solutii";
import { SECURITATE as S } from "@/content/securitate";
import { INDIFERENT_DE_DOMENIU } from "@/content/segmente";

// Pagina de securitate. Ordinea sectiunilor e argumentul ei, deci nu se rearanjeaza fara
// motiv: depozit, drum, acces, iesire - adica tot lantul pe hartie - si abia la sfarsit partea
// digitala, impartita in ce am masurat si ce nu putem sustine.
//
// De ce asa. Un furnizor de software isi scrie pagina de securitate numai despre biti. Aici
// documentul e un obiect: se pierde printr-o cutie asezata gresit, o predare fara
// proces-verbal, o eliminare fara aviz. Lantul de hartie e partea pe care o cunoastem si pe
// care o poate vedea oricine vine in vizita; partea digitala ruleaza pe o platforma care nu e
// scrisa de noi si despre care nu avem inca raspunsuri in scris. Daca ordinea s-ar inversa,
// pagina ar incepe cu ce stim cel mai putin. Valul S1-b a schimbat ASEZAREA, nu ordinea.
//
// CELE SASE INTREBARI DESCHISE au trecut in acordeon, si ce se castiga si ce se pierde e scris
// in `SecuritateIntrebare.tsx`. Ce ramane neschimbat: sunt argumentul paginii, nu subsolul ei,
// si numarul lor e in titlul sectiunii, unde se vede fara sa deschida nimeni nimic.
//
// Continutul sta in `src/content/securitate.ts`; aici e numai forma paginii.
export const metadata: Metadata = {
  title: S.titluMeta,
  description: S.descriereMeta,
  alternates: { canonical: "/securitate" },
};

const LEGATURA = "text-violet underline decoration-violet-2 underline-offset-[3px]";

export default function Securitate() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/securitate"
        imagine={FOTOGRAFII.rafturi}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Securitate" }]}
        eticheta={S.eticheta}
        titlu={S.h1}
        lead={S.lead}
        actiune={{ href: "/#discutie", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/arhivare-fizica", text: "Vedeți depozitul și inventarul" }}
      />

      <SegmentIncredere fapte={INDIFERENT_DE_DOMENIU} />

      <SegmentAncore ancore={I.navigare} eticheta="Secțiunile paginii" />

      <SegmentSectiune
        id="depozit"
        ton="alb"
        eticheta={I.depozit.eticheta}
        titlu={I.depozit.titlu}
        lead={I.depozit.lead}
      >
        <SegmentGrila elemente={S.depozit} fundal="alb" />

        <div className="mx-auto mt-12 max-w-[46rem]">
          <BlocDovada fel="limite" eticheta={I.etichetaNotaDepozit}>
            {S.notaDepozit}
          </BlocDovada>
        </div>

        <div className="mt-16 md:mt-20">
          <SegmentRandTextImagine
            titlu={I.spreFizica.titlu}
            text={I.spreFizica.text}
            legatura={I.spreFizica.legatura}
            imagine={FOTOGRAFII.sertare}
          />
        </div>
      </SegmentSectiune>

      <SegmentSectiune
        id="drum"
        ton="ceata"
        eticheta={I.drum.eticheta}
        titlu={I.drum.titlu}
        lead={I.drum.lead}
      >
        <ol className="m-0 grid list-none gap-5 p-0 md:grid-cols-2">
          {S.drum.map((e, i) => (
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
      </SegmentSectiune>

      <SegmentSectiune
        id="acces"
        ton="alb"
        eticheta={I.acces.eticheta}
        titlu={I.acces.titlu}
        lead={I.acces.lead}
      >
        <SegmentGrila elemente={S.acces} fundal="alb" />
      </SegmentSectiune>

      <SegmentSectiune
        id="iesire"
        ton="ceata"
        eticheta={I.iesire.eticheta}
        titlu={I.iesire.titlu}
        lead={I.iesire.lead}
      >
        <SegmentGrila elemente={S.iesire} fundal="ceata" />

        <div className="mx-auto mt-12 max-w-[46rem]">
          <BlocDovada eticheta={I.etichetaNotaIesire}>{S.notaIesire}</BlocDovada>
        </div>
      </SegmentSectiune>

      <SegmentSectiune
        id="digital"
        ton="alb"
        eticheta={I.digital.eticheta}
        titlu={I.digital.titlu}
        lead={I.digital.lead}
      >
        <div className="mx-auto max-w-[52rem] rounded-card-mare bg-ceata p-8 md:p-10">
          <ListaBifa titlu={I.listaMasurat} elemente={S.masurat} />
        </div>

        <p className="mx-auto mt-10 max-w-[62ch] text-corp text-cerneala-2">
          Prima coloană este descrisă pe larg în{" "}
          <Link href="/cookies" className={LEGATURA}>
            pagina despre ce stocăm în browser
          </Link>
          , iar ce vede găzduirea, chiar când browserul rămâne curat, în{" "}
          <Link href="/confidentialitate" className={LEGATURA}>
            politica de confidențialitate
          </Link>
          .
        </p>
      </SegmentSectiune>

      {/* Liniuta, nu bifa: randurile de mai jos sunt lucruri care LIPSESC. */}
      <SegmentBandaDovezi
        eticheta={I.bandaNuDetinem.eticheta}
        titlu={I.bandaNuDetinem.titlu}
        elemente={S.nuDetinem}
        semn="liniuta"
      />

      <SegmentSectiune
        id="intrebari"
        ton="ceata"
        eticheta={I.intrebari.eticheta}
        titlu={I.intrebari.titlu}
        lead={I.intrebari.lead}
      >
        <div className="mx-auto max-w-[52rem]">
          <SecuritateIntrebare
            intrebari={S.intrebariDeschise}
            etichetaStare={I.etichetaStare}
          />

          <div className="mt-12">
            <BlocDovada eticheta={I.etichetaNotaDigital}>{S.notaDigital}</BlocDovada>
          </div>

          <p className="mt-10 text-corp text-cerneala-2">
            Dacă întrebarea dumneavoastră este despre felul în care se citește site-ul, nu
            despre documente, răspunsul stă în{" "}
            <Link href="/accesibilitate" className={LEGATURA}>
              declarația de accesibilitate
            </Link>
            . Pe ce drum ajunge un mesaj la noi scrie pe{" "}
            <Link href="/contact" className={LEGATURA}>
              pagina de contact
            </Link>
            .
          </p>
        </div>
      </SegmentSectiune>

      <BandaCTA
        titlu={S.incheiere.titlu}
        text={S.incheiere.text}
        actiune={{ href: "/#discutie", text: I.butonCta }}
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
