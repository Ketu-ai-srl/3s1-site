import type { Metadata } from "next";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BlocDovada from "@/components/BlocDovada";
import FisaDomeniu from "@/components/FisaDomeniu";
import SegmentBandaReguli from "@/components/SegmentBandaReguli";
import SegmentIncredere from "@/components/SegmentIncredere";
import SegmentRandTextImagine from "@/components/SegmentRandTextImagine";
import SegmentSectiune from "@/components/SegmentSectiune";
import { FOTOGRAFII } from "@/content/fotografii";
import { HUB_INTERIOR, NOTA_CONTACT } from "@/content/interior-solutii";
import { HUB, INDIFERENT_DE_DOMENIU, SEGMENTE } from "@/content/segmente";

// Hub-ul de domenii. Nu contine continut scris de mana despre vreun segment: grila se
// genereaza din SEGMENTE, deci un domeniu nou apare aici in clipa in care primeste o intrare,
// fara sa atinga nimeni fisierul asta.
//
// CE S-A SCHIMBAT LA VALUL S1-b. Cele sapte domenii erau sapte randuri de registru sub doua
// benzi de subsectiune. Acum sunt o grila de carduri pe ceata, cu sageata diagonala in colt -
// gramatica REF-V §4.5 - iar benzile de subsectiune au disparut odata cu `BandaTitlu`:
// existau ca sa desparta grupul „are fisa" de grupul „urmeaza", si toate cele sapte domenii
// au azi fisa, deci nu mai era nimic de despartit. Componenta nu mai avea niciun apelant si
// s-a sters; daca reapare un domeniu fara pagina, cardul lui poarta eticheta „In pregatire"
// in coltul in care celelalte au sageata.
//
// Canonical auto-referential, ca la pagina de start: fara el, mediul de proba indexat ar
// concura cu productia pe aceleasi cuvinte.
export const metadata: Metadata = {
  title: HUB.titluMeta,
  description: HUB.descriereMeta,
  alternates: { canonical: "/solutii" },
};

// Titlul ecranului, rupt unde l-a rupt autorul in `segmente.ts`. Se citeste dintr-un singur
// loc: sirul poarta ruperea, pagina doar o randeaza.
const TITLU_RUPT = HUB.h1.split("\n").flatMap((rand, i) =>
  i === 0 ? [rand] : [<br key={"rand-" + i} />, rand],
);

export default function Solutii() {
  return (
    <main id="continut">
      {/* Antetul are fotografie, ca celelalte zece pagini interioare ale feliei: DIRECTIA.md,
          la „Cum se construieste o pagina interioara", cere fotografia intr-un card cu raza de
          16 px in dreapta titlului, si nu prevede o varianta fara. Cadrul e `rafturi`, cel mai
          general din registru - o sala de depozitare, fara niciun obiect care sa trimita la o
          meserie anume, iar hub-ul nu are voie sa numeasca unul singur. Criteriul a supravietuit
          schimbarii cadrului in runda a patra: cel vechi era un perete de rafturi, cel de acum
          doua siruri de dulapuri cu sertare, si amandoua nu numesc niciun domeniu. Nu se
          ciocneste cu randul text / imagine de mai jos, care foloseste `dosare`. */}
      <AntetPagina
        adresa="/solutii"
        imagine={FOTOGRAFII.rafturi}
        fir={[{ text: "Pagina de start", href: "/" }, { text: HUB.titluMeta }]}
        eticheta={HUB.eticheta}
        titlu={TITLU_RUPT}
        lead={HUB.lead}
        actiune={{ href: "/#discutie", text: HUB_INTERIOR.butonCta }}
        secundar={{ href: "/cum-functioneaza", text: "Vedeți cum funcționează" }}
      />

      <SegmentIncredere fapte={INDIFERENT_DE_DOMENIU} />

      {/* Grila ESTE navigarea acestei pagini, deci nu poarta si un rand de file-pastila
          deasupra: filele ar trimite catre trei sectiuni, dintre care una e chiar lista de
          sub ele. Paginile de segment, care au cinci sectiuni lungi, le au. */}
      <SegmentSectiune
        id="domenii"
        ton="ceata"
        eticheta={HUB_INTERIOR.grila.eticheta}
        titlu={HUB_INTERIOR.grila.titlu}
        lead={HUB.listaLead}
      >
        <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-2">
          {SEGMENTE.map((s) => (
            <FisaDomeniu
              key={s.slug}
              titlu={s.nume}
              // Legatura exista exact atunci cand exista pagina. Starea vine din date, deci nu
              // poate aparea un card care promite o ruta inexistenta.
              href={s.pagina ? "/solutii/" + s.slug : undefined}
            >
              {s.rezumat}
            </FisaDomeniu>
          ))}
        </ul>
      </SegmentSectiune>

      {/* Banda inchisa a hub-ului sta pe `SegmentBandaReguli`, nu pe `BandaIncredere`: aceea
          aseaza elementele pe patru coloane, iar `INDIFERENT_DE_DOMENIU` are trei fapte, deci
          al patrulea traseu ramanea gol - 308 px de banda goala la 1440. */}
      <SegmentBandaReguli
        eticheta={HUB_INTERIOR.banda.eticheta}
        titlu={HUB_INTERIOR.banda.titlu}
        elemente={INDIFERENT_DE_DOMENIU}
      />

      <SegmentSectiune
        ton="alb"
        eticheta={HUB_INTERIOR.onestitate.eticheta}
        titlu={HUB_INTERIOR.onestitate.titlu}
        lead={HUB_INTERIOR.reguliLead}
      >
        <div className="mx-auto max-w-[46rem]">
          <BlocDovada eticheta={HUB_INTERIOR.etichetaNota}>{HUB_INTERIOR.nota}</BlocDovada>
        </div>

        <div className="mt-16 md:mt-20">
          <SegmentRandTextImagine
            titlu={HUB_INTERIOR.spreTermene.titlu}
            text={HUB_INTERIOR.spreTermene.text}
            legatura={HUB_INTERIOR.spreTermene.legatura}
            imagine={FOTOGRAFII.dosare}
            invers
          />
        </div>
      </SegmentSectiune>

      {/* Butonul NU repeta cererea din antet. Acolo scrie „Programati o discutie de 30 de
          minute"; aici, dupa grila de domenii si dupa ce nu se schimba, omul are ce cere. */}
      <BandaCTA
        titlu={HUB_INTERIOR.cta.titlu}
        text={HUB_INTERIOR.cta.text}
        actiune={{ href: "/contact", text: HUB_INTERIOR.cta.buton }}
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
