import Link from "next/link";
import AntetPagina from "./AntetPagina";
import Buton from "./Buton";
import JuridicBlocuri from "./JuridicBlocuri";
import JuridicCuprins from "./JuridicCuprins";
import { FOTOGRAFII, type CheieFotografie } from "@/content/fotografii";
import { BUTON_DISCUTIE, MASURA_ACT } from "@/content/interior-juridic";
import { PAGINI_JURIDICE, type PaginaJuridica, type Sectiune } from "@/content/juridic";

// Forma unei pagini juridice, o singura data pentru toate trei, pe gramatica paginii
// INTERIOARE din REF-V (val S1-b).
//
// CE S-A SCHIMBAT FATA DE VALUL S1-a, si de ce fiecare lucru:
//
//   ACTUL E UN SINGUR DOCUMENT PE ALB. Pana acum fiecare sectiune era o BANDA proprie, cu
//   linie sus si cu fundalul alternand alb / ceata. Alternanta e gramatica paginii de
//   VITRINA, unde fiecare banda spune alt lucru; pe un act de noua sectiuni ea taia un
//   singur text in noua afise si facea din fiecare clauza un capitol. Acum documentul curge
//   pe o singura suprafata alba, iar sectiunile se despart prin spatiu si printr-o linie de
//   1 px - adica prin ce desparte sectiunile intr-un act tiparit.
//
//   CUPRINSUL A IESIT DIN CURGEREA TEXTULUI si a devenit coloana lipicioasa in stanga, la
//   14 px (`JuridicCuprins`). Pe o pagina de noua sectiuni, un cuprins asezat o singura
//   data, sus, se vede treizeci de secunde si pe urma dispare pentru totdeauna; lipicios,
//   spune tot timpul unde esti si cat a mai ramas. Sub 1024 px ramane un acordeon inchis,
//   deasupra textului: acolo o coloana n-are unde sa stea, iar noua intrari deschise ar
//   impinge primul paragraf sub linia de plutire.
//
//   TITLURILE DE SECTIUNE au coborat de la `clamp(1.65rem, 3vw, 2.375rem)` - 38,4 px la
//   1280 - la treapta de 24/32 px a REF-V (`text-titlu-4`). Titlul de 48 px al paginii ramane
//   in antet si e singurul afis de pe pagina; sectiunile unui act sunt titluri de paragraf,
//   nu titluri de pagina repetate de noua ori.
//
//   CIFRELE RAMAN ARABE. Argumentul e cel scris de felia care le-a pus si nu s-a
//   schimbat: pe o pagina de prezentare cota romana e ornament, pe un text juridic cifra e
//   mijloc de trimitere. „Secțiunea 4" se citeaza intr-un mesaj; „Secțiunea IV" se citeaza
//   mai greu. Ce s-a schimbat e locul: cifra nu mai are jgheab propriu de 148 px, sta pe
//   randul de deasupra titlului, in violet, la 14 px.
//
// CADRUL. Documentul sta in `--container-act` (720 px, `max-w-act`), iar coloana de cuprins
// de 200 px se aseaza langa el; perechea se centreaza in containerul de vitrina. Proza din
// interior e plafonata mai strans decat cadrul, la `MASURA_ACT` din continutul feliei: 720 px
// de litera de 16 px dau in jur de 90 de caractere pe rand, iar un act se citeste la 60-75.
// Plafonul e pe PROZA, nu pe cadru: titlurile, casetele si randurile de definitii iau toata latimea,
// deci coloana ramane un dreptunghi, nu o panglica.

// Fotografia de antet, per pagina: cele trei pagini juridice se leaga intre ele in blocul de
// incheiere, deci trebuie sa deschida cu trei cadre diferite.
const FOTO_JURIDIC: Record<string, CheieFotografie> = {
  "/termeni": "legatura",
  "/confidentialitate": "dosare",
  "/cookies": "rafturi",
};

function SectiuneJuridica({ sectiune, numar }: { sectiune: Sectiune; numar: number }) {
  return (
    <section
      id={sectiune.id}
      className="border-t border-linie py-12 first:border-t-0 first:pt-0 md:py-16"
    >
      {/* Marcajul de sectiune, ascuns de la cititoarele de ecran: intelesul e purtat de
          titlul h2, iar o cifra citita inaintea lui nu adauga nimic. Cuvantul „Secțiunea"
          se scrie intreg, la orice latime: fara jgheabul care o explica, cifra singura ar
          parea un rest de formatare. */}
      <span aria-hidden className="mb-3 block text-nota font-semibold text-violet">
        Secțiunea {numar}
      </span>
      <h2 className="mb-6 max-w-[30ch] text-titlu-4 text-cerneala">{sectiune.titlu}</h2>
      <JuridicBlocuri blocuri={sectiune.blocuri} />
    </section>
  );
}

function Incheiere({ pagina }: { pagina: PaginaJuridica }) {
  const celelalte = PAGINI_JURIDICE.filter((p) => p.cale !== pagina.cale);

  return (
    <section className="border-t border-linie py-12 md:py-16">
      {/* Nota de redactare e o caseta pe ceata, ca celelalte casete ale actului: spune ce
          NU i s-a facut textului, deci sta la vedere, nu in subsol. */}
      <div className="rounded-card bg-ceata p-6">
        <span className="mb-2 block text-nota font-semibold text-cerneala-2">
          Despre textul acesta
        </span>
        <p className={`${MASURA_ACT} text-corp text-cerneala-2`}>{pagina.redactat}</p>
      </div>

      {/* UN singur buton primar. Celelalte doua acte sunt drumuri secundare, deci legaturi
          de text, nu butoane. */}
      <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
        <Buton href="/#discutie" sageata className="max-sm:w-full">
          {BUTON_DISCUTIE}
        </Buton>
        {celelalte.map((p) => (
          <Buton key={p.cale} href={p.cale} fel="text">
            {p.titluMeta}
          </Buton>
        ))}
      </div>

      <p className={`mt-8 ${MASURA_ACT} text-corp text-cerneala-2`}>
        Dacă ceva din pagina aceasta este neclar sau vă pare greșit, scrieți-ne la{" "}
        <a
          href="mailto:contact@3s.ro"
          className="text-violet underline decoration-violet-2 underline-offset-[3px]"
        >
          contact@3s.ro
        </a>
        . Corectăm în text, nu în corespondență, ca să vadă și următorul cititor corectura.
        Serviciile sunt descrise pe{" "}
        <Link
          href="/solutii"
          className="text-violet underline decoration-violet-2 underline-offset-[3px]"
        >
          pagina de domenii
        </Link>
        .
      </p>
    </section>
  );
}

export default function JuridicPagina({ pagina }: { pagina: PaginaJuridica }) {
  const intrari = pagina.sectiuni.map((s) => ({ id: s.id, titlu: s.titlu }));

  return (
    <main id="continut">
      <AntetPagina
        adresa={pagina.cale}
        forma="banda"
        imagine={FOTOGRAFII[FOTO_JURIDIC[pagina.cale] ?? "legatura"]}
        fir={[{ text: "Pagina de start", href: "/" }, { text: pagina.titluMeta }]}
        eticheta={pagina.eticheta}
        titlu={pagina.h1}
        lead={pagina.lead}
        actiune={{ href: "/#discutie", text: BUTON_DISCUTIE }}
        secundar={pagina.secundar}
      />

      <div className="bg-alb">
        <div className="mx-auto w-full max-w-vitrina px-4 pt-8 pb-20 md:px-8 md:pt-12 md:pb-24">
          <div className="lg:flex lg:justify-center lg:gap-x-16">
            <div className="lg:w-[200px] lg:shrink-0">
              <JuridicCuprins intrari={intrari} />
            </div>

            <div className="w-full max-w-act">
              {pagina.sectiuni.map((s, i) => (
                <SectiuneJuridica key={s.id} sectiune={s} numar={i + 1} />
              ))}
              <Incheiere pagina={pagina} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
