import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BandaIncredere from "@/components/BandaIncredere";
import BlocDovada from "@/components/BlocDovada";
import Card from "@/components/Card";
import InvestitieRandFoto from "@/components/InvestitieRandFoto";
import ListaBifa from "@/components/ListaBifa";
import {
  ARATAM,
  CONSTRUIT,
  DESPRE,
  MOSTENIT,
  NESCRIS,
  NUMELE,
  STAREA_DE_AZI,
} from "@/content/despre";
import { FOTOGRAFII } from "@/content/fotografii";
import { DESPRE_INTERIOR as DI } from "@/content/interior-investitia";

// Pagina „despre", pe gramatica paginii interioare REF-V (val S1-b), scrisa pe dos fata de
// obicei: incepe cu impartirea dintre cele doua firme, nu cu ce avem.
//
// DE CE ANTETUL SI NU `Ecran`. Sarcina lasa alegerea deschisa, si raspunsul e masurat, nu de
// gust. `Ecran` are DOUA limbaje: `ton="erou"`, adica banda violeta a paginii de start, si
// restul, care da chiar antetul alb - iar `AntetPagina` e chiar `Ecran` cu firul de navigare
// si cu datele structurate `BreadcrumbList` deasupra. Deci alegerea reala nu e intre doua
// desene, ci intre a pastra sau a pierde firul de navigare si `BreadcrumbList`: eroul violet
// e al paginii de start si ramane unic pe site (REF-V §4, punctul 1). Pagina pastreaza
// `AntetPagina`, ca celelalte 21 de pagini interioare.
//
// CE S-A SCHIMBAT LA MIJLOCUL PAGINII. Impartirea dintre ADRIA si 3S statea in doua `Ecran`
// de mijloc de pagina, adica in doua ANTETURI puse una sub alta: fiecare cu rezerva lui de
// 96 px pentru bara fixa de sus, care la mijlocul paginii nu are ce sa rezerve. Acum sunt
// doua randuri text/imagine, forma pe care REF-V o da sectiunilor de mijloc.
//
// ASIMETRIA CELOR DOUA RANDURI RAMANE, si e continut, nu decor: ADRIA are un depozit care se
// poate arata, deci randul ei are fotografie si e urmat imediat de banda inchisa cu cele cinci
// lucruri mostenite; 3S are munca neinceputa, deci randul ei e proza goala, fara fotografie si
// fara lista. Cele doua randuri nu au voie sa se citeasca drept doua jumatati ale aceluiasi
// lucru - asta desface chiar confuzia pentru care exista sectiunea.
//
// CELE CINCI FAPTE MOSTENITE SUNT SCRISE O SINGURA DATA. Stateau intr-o lista cu bife langa
// randul ADRIEI; acum stau pe banda inchisa, care e locul lor in gramatica REF-V. Nu stau in
// amandoua: doua sectiuni cu acelasi continut pe aceeasi pagina inseamna ca a doua nu se mai
// citeste. Textele vin verbatim din `MOSTENIT` (`src/content/despre.ts`, inghetat in valul
// asta); din fisierul feliei vine numai eticheta fiecarui rand, iar `tests/interior-felie4`
// masoara ca sunt tot atatea etichete cate randuri.
//
// Canonical auto-referential, ca pe celelalte pagini: fara el, ruta ar mosteni canonical-ul
// layout-ului, ar arata catre pagina de start si ar iesi din index.
export const metadata: Metadata = {
  title: DESPRE.titluMeta,
  description: DESPRE.descriereMeta,
  alternates: { canonical: "/despre" },
};

const LEGATURA = "text-violet underline decoration-violet-2 underline-offset-[3px]";

export default function Despre() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/despre"
        imagine={FOTOGRAFII.rafturi}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Despre noi" }]}
        eticheta={DESPRE.eticheta}
        titlu={
          <>
            Firma este nouă.
            <br />
            Depozitul din care a crescut lucrează din 2019.
          </>
        }
        lead={DESPRE.lead}
        actiune={{ href: "/contact", text: "Scrieți-ne" }}
      />

      <section id="impartirea" className="bg-alb">
        <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
          {/* Sectiunea are titlu de nivel `h2`, si nu din simetrie: fara el, primul titlu de
              dupa `h1` ar fi `h3`-ul randului, adica o saritura de nivel - poarta S-03 o
              masoara pe HTML-ul construit si a raportat-o pe drept. */}
          <div className="mb-12 text-center">
            <span className="mb-4 block text-nota font-semibold text-violet">
              {DI.impartireaEticheta}
            </span>
            <h2 className="mx-auto max-w-[22ch] text-titlu-2 text-cerneala">
              {DI.impartireaTitlu}
            </h2>
            <p className="mx-auto mt-5 max-w-[62ch] text-corp text-cerneala-2">
              {DI.impartireaLead}
            </p>
          </div>

          <InvestitieRandFoto
            titlu={DI.adriaTitlu}
            text="Vechimea, autorizațiile și depozitul aparțin firmei-mamă, deci o afirmație despre ele se verifică la ea, nu la noi. Cele cinci lucruri care vin de acolo sunt scrise pe banda de mai jos."
            imagine={FOTOGRAFII.maini}
          />

          <div className="mt-20 md:mt-24">
            <InvestitieRandFoto
              titlu={DI.treiSTitlu}
              text="Ce urmează este muncă nouă și nu are în spate niciun an de funcționare. Riscul ei ni-l asumăm noi, nu firma-mamă."
            >
              <p className="max-w-[62ch] text-corp text-cerneala-2">{CONSTRUIT}</p>
            </InvestitieRandFoto>
          </div>
        </div>
      </section>

      {/* Faptele mostenite, verbatim din `MOSTENIT`. Eticheta fiecaruia vine din fisierul
          feliei; textul NU se copiaza nicaieri, deci nu are cum sa divearga de continut. */}
      <div id="mostenit">
        <BandaIncredere
          eticheta={DI.bandaEticheta}
          titlu={DI.bandaTitlu}
          elemente={MOSTENIT.map((text, i) => ({
            titlu: DI.bandaEtichete[i],
            text,
          }))}
        />
      </div>

      <section id="starea" className="bg-ceata">
        <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
          <div className="mb-12 text-center">
            <span className="mb-4 block text-nota font-semibold text-violet">
              {DI.stareaEticheta}
            </span>
            <h2 className="mx-auto max-w-[22ch] text-titlu-2 text-cerneala">
              {DI.stareaTitlu}
            </h2>
            <p className="mx-auto mt-5 max-w-[62ch] text-corp text-cerneala-2">
              {DI.stareaLead}
            </p>
          </div>

          <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
            {STAREA_DE_AZI.map((f) => (
              <li key={f.titlu}>
                <Card titlu={f.titlu} fundal="ceata" mare>
                  {f.text}
                </Card>
              </li>
            ))}
          </ul>

          <BlocDovada className="mt-10">
            <strong className="font-semibold text-cerneala">De ce citiți asta aici:</strong>{" "}
            starea juridică a unui furnizor se află oricum, la prima verificare de dosar.
            Scrisă de noi, costă o secțiune. Descoperită de dumneavoastră după trei discuții,
            costă discuțiile.
          </BlocDovada>
        </div>
      </section>

      <section id="numele" className="bg-alb">
        <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
          <div className="mb-12 text-center">
            <span className="mb-4 block text-nota font-semibold text-violet">
              {DI.numeleEticheta}
            </span>
            <h2 className="mx-auto max-w-[22ch] text-titlu-2 text-cerneala">
              {DI.numeleTitlu}
            </h2>
            <p className="mx-auto mt-5 max-w-[62ch] text-corp text-cerneala-2">
              {DI.numeleLead}
            </p>
          </div>

          <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
            {NUMELE.map((f) => (
              <li key={f.titlu}>
                <Card titlu={f.titlu} mare>
                  {f.text}
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="limite" className="bg-ceata">
        <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
          <div className="mb-12 text-center">
            <span className="mb-4 block text-nota font-semibold text-violet">
              {DI.limiteEticheta}
            </span>
            <h2 className="mx-auto max-w-[22ch] text-titlu-2 text-cerneala">
              {DI.limiteTitlu}
            </h2>
            <p className="mx-auto mt-5 max-w-[62ch] text-corp text-cerneala-2">
              {DI.limiteLead}
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ListaBifa titlu="Ce nu scriem pe site" elemente={NESCRIS} />
            <ListaBifa titlu="Ce vă arătăm în schimb" elemente={ARATAM} />
          </div>

          <p className="mx-auto mt-12 max-w-[62ch] text-center text-corp text-cerneala-2">
            Termenele de păstrare, cu actul normativ din care provin, stau în{" "}
            <Link href="/instrumente/termene-de-pastrare" className={LEGATURA}>
              instrumentul de termene
            </Link>
            . Sunt un punct de plecare, nu un aviz: confirmarea lor de către un arhivist
            autorizat se face înainte de publicare.
          </p>
        </div>
      </section>

      <div id="discutie">
        <BandaCTA
          titlu="Dacă v-a rămas o întrebare, scrieți-ne-o pe ea."
          text="Pagina de contact spune pe ce drum ajunge un mesaj la noi și pe care încă nu ajunge. Sunt trei rânduri și se citesc în jumătate de minut, înainte să vă apucați să scrieți."
          actiune={{ href: "/contact", text: "Pagina de contact" }}
          nota={
            <>
              Fișele pe domenii spun ce diferă la un birou notarial față de o primărie:{" "}
              <Link
                href="/solutii"
                className="text-alb underline decoration-violet-clar underline-offset-[3px]"
              >
                domenii
              </Link>
              .
            </>
          }
        />
      </div>
    </main>
  );
}
