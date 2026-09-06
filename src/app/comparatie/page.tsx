import type { Metadata } from "next";
import Link from "next/link";
import Acordeon from "@/components/Acordeon";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BandaIncredere from "@/components/BandaIncredere";
import BlocDovada from "@/components/BlocDovada";
import Card from "@/components/Card";
import ComparatieTabel from "@/components/ComparatieTabel";
import InvestitieRandFoto from "@/components/InvestitieRandFoto";
import { COMPARATIE as C } from "@/content/comparatie";
import { FOTOGRAFII } from "@/content/fotografii";
import { COMPARATIE_INTERIOR as CI } from "@/content/interior-investitia";

// Pagina de comparatie, rescrisa pe gramatica paginii interioare REF-V (val S1-b): antet alb
// cu fotografia in card, grila de carduri pentru cele patru variante, tabelul intr-un card
// mare pe ceata, banda inchisa cu randurile pe care le pierdem, rand text/imagine, acordeonul
// situatiilor in care raspunsul e nu, banda CTA.
//
// COMPARA CE COMPARA CLIENTUL: dulapul din birou, colegul care se ocupa si de arhiva, un
// depozit fara cautare si o arhiva administrata. Nu compara spatii de stocare intre ele - aia
// e comparatia altcuiva, pentru un om care are deja documentele scanate, iar clientul nostru
// are hartie.
//
// TABELUL RAMANE TABEL. E cel mai bun lucru de pe pagina si singura forma in care sase
// intrebari cu patru raspunsuri se citesc ca raspunsuri. Ce s-a schimbat e suprafata pe care
// sta - un card alb cu raza de 16 px, pe ceata - si felul in care se reaseaza pe telefon:
// fiecare rand devine un card. Motivul pentru care e o grila si nu un `<table>` e masurat si
// scris in `ComparatieTabel.tsx`.
//
// „UNDE PIERDEM" RAMANE O BANDA INCHISA, si ramane inaintea situatiilor in care raspunsul e
// nu. E decizia de continut a paginii: o comparatie care iese in avantajul nostru pe fiecare
// rand nu convinge un cumparator institutional, il alerteaza. Pe `noapte-v` se vede ca bloc de
// la distanta, iar albul de pe ea da 18,95:1 si `violet-clar` 7,61:1.
//
// FOTOGRAFIA e `legatura`: /comparatie si /cum-functioneaza se leaga una de alta, iar cadrul
// lor de deschidere nu are voie sa fie acelasi.
//
// Faptele stau in `src/content/comparatie.ts` si nu se ating; titlurile de sectiune care nu
// existau in continut sunt in fisierul feliei.
export const metadata: Metadata = {
  title: C.titluMeta,
  description: C.descriereMeta,
  alternates: { canonical: "/comparatie" },
};

const LEGATURA = "text-violet underline decoration-violet-2 underline-offset-[3px]";

export default function Comparatie() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/comparatie"
        imagine={FOTOGRAFII.legatura}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Comparație" }]}
        eticheta={C.eticheta}
        titlu={C.h1}
        lead={C.lead}
        actiune={{ href: "/contact", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/investitia", text: "Ce determină costul" }}
      />

      <section id="variante" className="bg-alb">
        <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
          <div className="mb-12 text-center">
            <span className="mb-4 block text-nota font-semibold text-violet">
              {CI.varianteEticheta}
            </span>
            <h2 className="mx-auto max-w-[20ch] text-titlu-2 text-cerneala">
              {CI.varianteTitlu}
            </h2>
            <p className="mx-auto mt-5 max-w-[62ch] text-corp text-cerneala-2">
              {CI.varianteLead}
            </p>
          </div>

          <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2">
            {C.variante.map((v) => (
              <li key={v.titlu}>
                <Card titlu={v.titlu} mare>
                  {v.text}
                </Card>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-12 max-w-[62ch] text-center text-corp text-cerneala-2">
            Ce se întâmplă concret în varianta a patra, pas cu pas, de la ridicarea cutiilor
            până la restituire, este scris pe{" "}
            <Link href="/cum-functioneaza" className={LEGATURA}>
              pagina de mecanism
            </Link>
            , iar partea cu rafturi și depozit pe{" "}
            <Link href="/arhivare-fizica" className={LEGATURA}>
              pagina de arhivare fizică
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="tabel" className="bg-ceata">
        <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
          <div className="mb-12 text-center">
            <span className="mb-4 block text-nota font-semibold text-violet">
              {CI.tabelEticheta}
            </span>
            <h2 className="mx-auto max-w-[20ch] text-titlu-2 text-cerneala">
              {CI.tabelTitlu}
            </h2>
            <p className="mx-auto mt-5 max-w-[62ch] text-corp text-cerneala-2">
              {CI.tabelLead}
            </p>
          </div>

          <ComparatieTabel coloane={C.coloane} randuri={C.randuri} />

          <BlocDovada fel="limite" eticheta="Ce nu măsoară tabelul" className="mt-10">
            {C.notaTabel}
          </BlocDovada>
        </div>
      </section>

      <div id="pierdem">
        <BandaIncredere
          eticheta={CI.pierdemEticheta}
          titlu={CI.pierdemTitlu}
          elemente={C.pierdem}
        />
      </div>

      <section id="cand-nu-merita" className="bg-alb">
        <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
          <InvestitieRandFoto
            titlu={CI.nuMeritaTitlu}
            text={CI.nuMeritaLead}
            imagine={FOTOGRAFII.cutii}
            foto="stanga"
          >
            <p className="max-w-[58ch] text-corp text-cerneala-2">
              Cât timp trebuie păstrată legal fiecare categorie, cu actul normativ din care
              vine termenul, se vede în{" "}
              <Link href="/instrumente/termene-de-pastrare" className={LEGATURA}>
                verificatorul de termene
              </Link>
              . Din el se vede și ce se poate elimina legal chiar acum.
            </p>
          </InvestitieRandFoto>

          <div className="mx-auto mt-16 max-w-registru">
            <Acordeon
              elemente={C.nuMerita.map((n) => ({
                intrebare: n.titlu,
                raspuns: n.text,
              }))}
            />
          </div>
        </div>
      </section>

      <div id="discutie">
        <BandaCTA
          titlu={C.incheiere.titlu}
          text={C.incheiere.text}
          actiune={{ href: "/contact", text: "Discuție de 30 de minute" }}
          nota={
            <>
              Dacă vreți întâi să vedeți ce se schimbă la fondul dumneavoastră în funcție de
              domeniu, fișele stau la{" "}
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
