import type { Metadata } from "next";
import Link from "next/link";
import Acordeon from "@/components/Acordeon";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import InvestitiaFactor from "@/components/InvestitiaFactor";
import InvestitieGarantii from "@/components/InvestitieGarantii";
import InvestitieRandFoto from "@/components/InvestitieRandFoto";
import ListaBifa from "@/components/ListaBifa";
import { INVESTITIA as I } from "@/content/comparatie";
import { FOTOGRAFII } from "@/content/fotografii";
import { INVESTITIA_INTERIOR as II } from "@/content/interior-investitia";

// Pagina de investitie, rescrisa pe gramatica paginii interioare REF-V (val S1-b): antet alb
// cu fotografia in card, rand de garantii, sectiune de carduri pe ceata, h2 centrat cu doua
// coloane de bife, doua randuri text/imagine alternate, acordeon de intrebari, banda CTA.
//
// PAGINA NU CONTINE PRETURI si nu contine intervale - nici „de la", nici exemplu de calcul.
// Decizia e a owner-ului si e scrisa in `CLAUDE.md`; pagina o respecta si, mai important,
// spune DE CE, in acordeonul de la final.
//
// UNDE STA ADAPTAREA FATA DE REFERINTA. In REF-V, locul de dupa antet e sectiunea de preturi:
// trei carduri pe ceata, cel din mijloc inchis, cu cifra mare in fiecare. Noi tinem forma si
// schimbam ce sta in ea: in locul cifrei, SCARA - cele doua directii ale fiecarui element de
// cost, „creste cand" si „scade cand". E singurul lucru pe care o pagina fara preturi il poate
// da cinstit.
//
// CELE SAPTE ELEMENTE INTRA IN TREI CARDURI, nu in sapte randuri. Forma dinainte masura 3368
// px la 1280, adica 4,21 ecrane si 561 de cuvinte sub un singur titlu. Gruparea sta in
// `src/content/interior-investitia.ts`, cu indici care acopera multimea de sapte exact o data;
// `tests/interior-felie4.test.ts` o masoara, ca o regrupare viitoare sa nu piarda un element.
//
// Faptele stau in `src/content/comparatie.ts` si nu se ating; aici e numai forma paginii, iar
// titlurile de sectiune care nu existau in continut sunt in fisierul feliei.
export const metadata: Metadata = {
  title: I.titluMeta,
  description: I.descriereMeta,
  alternates: { canonical: "/investitia" },
};

// Raspunsurile acordeonului vin din continutul deja scris. Cheia leaga intrebarea NOUA de
// textul VECHI, ca sa nu existe doua locuri in care se poate scrie acelasi raspuns.
const RASPUNSURI: Record<string, string> = {
  "fara-pret-0": I.deCeFaraPret[0].text,
  "fara-pret-1": I.deCeFaraPret[1].text,
  "fara-pret-2": I.deCeFaraPret[2].text,
  "nota-costuri": I.notaCosturi,
  incheiere: I.incheiere.text,
};

const LEGATURA = "text-violet underline decoration-violet-2 underline-offset-[3px]";

export default function Investitia() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/investitia"
        // Cadrul e `dulapuri` dintr-un motiv masurat, nu de gust: /accesibilitate deschidea cu
        // `dosare` pe aceeasi ancora, si cele doua benzi ieseau identice la octet. Argumentul
        // s-a verificat din nou dupa ce cadrul s-a schimbat in runda a cincea a feliei 6:
        // `dulapuri` nu mai arata fisete metalice cu usi numerotate, ci un perete de dulapuri
        // de lemn cu sertare mici de catalog (vezi `alt`-ul lui in fotografii.ts; `sertare` e
        // alt cadru, mainile care trag un sertar) - si spune la fel de bine, daca nu mai bine,
        // ce masoara pagina asta: un fond impartit in unitati numarabile.
        imagine={FOTOGRAFII.dulapuri}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Investiția" }]}
        eticheta={I.eticheta}
        titlu={I.h1}
        lead={I.lead}
        actiune={{ href: "/contact", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/comparatie", text: "Vedeți comparația" }}
      />

      <section className="bg-alb">
        <div className="mx-auto w-full max-w-vitrina px-4 pb-16 md:px-8 md:pb-20">
          <InvestitieGarantii elemente={II.garantii} />
        </div>
      </section>

      <section id="factori" className="bg-ceata">
        <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
          <div className="mb-12 text-center">
            <span className="mb-4 block text-nota font-semibold text-violet">
              {II.factoriEticheta}
            </span>
            <h2 className="mx-auto max-w-[20ch] text-titlu-2 text-cerneala">
              {II.factoriTitlu}
            </h2>
            <p className="mx-auto mt-5 max-w-[62ch] text-corp text-cerneala-2">
              {II.factoriLead}
            </p>
          </div>

          <ul className="m-0 grid list-none gap-6 p-0 lg:grid-cols-3">
            {II.grupe.map((g) => (
              <InvestitiaFactor
                key={g.eticheta}
                eticheta={g.eticheta}
                titlu={g.titlu}
                lead={g.lead}
                inchis={g.inchis}
                elemente={g.indici.map((n) => I.factori[n])}
              />
            ))}
          </ul>
        </div>
      </section>

      <section id="unic-si-recurent" className="bg-alb">
        <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="mx-auto max-w-[20ch] text-titlu-2 text-cerneala">
              {II.structuraTitlu}
            </h2>
            <p className="mx-auto mt-5 max-w-[62ch] text-corp text-cerneala-2">
              {II.structuraLead}
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ListaBifa titlu="Se plătește o singură dată" elemente={I.costUnic} />
            <ListaBifa titlu="Se plătește recurent" elemente={I.costRecurent} />
          </div>

          <p className="mx-auto mt-12 max-w-[62ch] text-center text-corp text-cerneala-2">
            Termenele legale de păstrare, care hotărăsc cât timp stă fiecare categorie în
            depozit, se pot verifica în{" "}
            <Link href="/instrumente/termene-de-pastrare" className={LEGATURA}>
              verificatorul de termene
            </Link>
            . Ce se întâmplă fizic cu fondul, de la ridicare până la retur, este descris pe{" "}
            <Link href="/cum-functioneaza" className={LEGATURA}>
              pagina de mecanism
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="discutia" className="bg-ceata">
        <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
          <span className="mb-4 block text-nota font-semibold text-violet">
            {II.discutiaEticheta}
          </span>

          <InvestitieRandFoto
            titlu={II.discutiaTitlu}
            text={II.discutiaLead}
            imagine={FOTOGRAFII.maini}
          >
            <ListaBifa titlu="Ce primiți, în scris" elemente={I.primiti} />
          </InvestitieRandFoto>

          <div className="mt-20 md:mt-24">
            <InvestitieRandFoto
              titlu={II.refuzTitlu}
              text={II.refuzLead}
              imagine={FOTOGRAFII.dosare}
              foto="stanga"
            >
              <ListaBifa
                titlu="Ce nu primiți, și nici nu promitem"
                elemente={I.nuPrimiti}
              />
            </InvestitieRandFoto>
          </div>
        </div>
      </section>

      <section id="intrebari" className="bg-alb">
        <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
          <div className="mb-12 text-center">
            <span className="mb-4 block text-nota font-semibold text-violet">
              {II.intrebariEticheta}
            </span>
            <h2 className="mx-auto max-w-[20ch] text-titlu-2 text-cerneala">
              {II.intrebariTitlu}
            </h2>
          </div>

          <div className="mx-auto max-w-registru">
            <Acordeon
              elemente={II.intrebari.map((q) => ({
                intrebare: q.intrebare,
                raspuns: RASPUNSURI[q.cheie],
              }))}
            />
          </div>
        </div>
      </section>

      <div id="discutie">
        <BandaCTA
          titlu={I.incheiere.titlu}
          text={I.incheiere.text}
          actiune={{ href: "/contact", text: "Discuție de 30 de minute" }}
          nota={II.ctaNota}
        />
      </div>
    </main>
  );
}
