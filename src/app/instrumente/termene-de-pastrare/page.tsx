import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import JuridicListaLipsa from "@/components/JuridicListaLipsa";
import JuridicSectiune from "@/components/JuridicSectiune";
import ListaBifa from "@/components/ListaBifa";
import TermeneCuprins from "@/components/TermeneCuprins";
import TermeneFisa from "@/components/TermeneFisa";
import TermeneRegula from "@/components/TermeneRegula";
import { FOTOGRAFII } from "@/content/fotografii";
import { ANCORE_TERMENE, BUTON_DISCUTIE } from "@/content/interior-juridic";
import { PAGINA_TERMENE as P, TERMENE_ROMANIA } from "@/content/termene-extins";

// Verificatorul de termene, ca document de sine statator.
//
// CE FACE, si de ce e singurul loc in care se face: de la reasezarea paginii de start in
// directia noua, widgetul cu clic nu mai exista acolo, deci pagina asta e SINGURUL loc de pe
// site in care se citesc cele opt randuri. Toate sunt in HTML de la prima cerere, fiecare cu
// ancora proprie, deci pagina se poate tipari, trimite prin mesaj cu trimitere la un rand
// anume, si citi de un crawler care nu executa JavaScript.
//
// CE NU FACE, si e o decizie, nu o scapare: nu adauga niciun termen nou. Cifrele raman cele
// din `src/content/termene.ts`, unde le-a scris felia care le-a cules, cu actul pe fiecare
// rand. Un instrument corect pe o jurisdictie bate unul plauzibil pe optsprezece, iar randul
// care nu are articol ramane gol, cu motivul scris pe el.
//
// ASEZAREA, la valul S1-b, si ce s-a schimbat fata de valul de fundatie:
//
//   RANDUL DE ANCORE inlocuieste tabelul de deschidere. Tabelul repeta, in forma stransa,
//   ce scrie mai jos pe fise: categoria, termenul, actul. Ce facea el si nu face fisa e
//   navigarea, iar asta a ramas - opt ancore, patru pe rand la 1440, fiecare cu termenul si
//   cu actul pe ea, deci cele doua propozitii din `cuprins.subTabel` raman adevarate.
//
//   FISELE SUNT CARDURI, doua pe rand la 1440, cu cifra termenului la 36 px. Erau opt
//   articole late cat pagina, despartite de o linie: un perete de text din care nu se vedea
//   unde se termina unul si incepe altul.
//
//   REGULILE DE FOLOSIRE SUNT UN ACORDEON. Patru blocuri deschise, de cate cincizeci de
//   cuvinte, asezate dupa opt fise, erau un al doilea perete exact acolo unde atentia e deja
//   consumata. Textul ramane in HTML-ul servit: acordeonul e `details`/`summary`.
//
//   CE NU E ACOPERIT nu mai poarta bifa. Cinci randuri despre ce lipseste, fiecare bifat, e
//   semnul care spune contrariul textului; forma REF-V pentru ele e liniuta gri
//   (`JuridicListaLipsa`), langa lista cu bife a ce ESTE acoperit.
//
//   INCHEIEREA E BANDA CTA VIOLETA a referintei, nu o a sasea banda de registru cu doua
//   butoane. Butonul e unul singur, alb pe violet, si duce la discutia de treizeci de minute.
//
// SECTIUNILE SI ANCORELE LOR RAMAN CELE VECHI (`pe-scurt`, `randuri`, `acoperire`, `moldova`,
// `folosire`, `discutie`): se citeaza in mesaje si nu se redenumesc la o reasezare.
//
// Canonical auto-referential: fara el pagina ar mosteni canonical-ul layout-ului si ar arata
// spre pagina de start, ceea ce o scoate din index.
export const metadata: Metadata = {
  title: P.titluMeta,
  description: P.descriereMeta,
  alternates: { canonical: "/instrumente/termene-de-pastrare" },
};

const LEGATURA = "text-violet underline decoration-violet-2 underline-offset-[3px]";

export default function TermeneDePastrare() {
  return (
    <main id="continut">
      {/* ANTETUL E O BANDA, NU UN ECRAN PLIN, si actiunea principala e lista, nu o intalnire.
          Pagina asta ESTE unealta. Masurat inainte de scurtare: antet de vitrina de 800 px al
          carui buton principal cerea o intalnire, urmat de o sectiune de 1126 px despre
          acoperire, iar primul rand aparea pe la 1800 px - dupa 2,25 ecrane la 1280 px.
          Discutia n-a disparut: sta in banda de incheiere. */}
      <AntetPagina
        adresa="/instrumente/termene-de-pastrare"
        forma="banda"
        imagine={FOTOGRAFII.sertare}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Termene de păstrare" }]}
        eticheta={P.eticheta}
        titlu={P.h1}
      />

      <JuridicSectiune id="pe-scurt" eticheta={ANCORE_TERMENE.eticheta}>
        <TermeneCuprins
          termene={TERMENE_ROMANIA}
          fara={P.cuprins.fara}
          faraTemei={P.cuprins.faraTemei}
        />

        {P.cuprins.subTabel.map((text) => (
          <p key={text.slice(0, 40)} className="mt-8 max-w-[62ch] text-corp text-cerneala-2">
            {text}
          </p>
        ))}
      </JuridicSectiune>

      <JuridicSectiune
        id="randuri"
        ton="ceata"
        eticheta="Rândurile"
        titlu={P.fise.titlu}
        lead={P.fise.lead}
      >
        <ul className="m-0 grid list-none gap-6 p-0 lg:grid-cols-2">
          {TERMENE_ROMANIA.map((t) => (
            <li key={t.ancora}>
              <TermeneFisa termen={t} />
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[62ch] text-corp text-cerneala-2">
          Ce diferă de la un domeniu la altul, inclusiv rândul lăsat gol la{" "}
          <Link href="/solutii/avocatura" className={LEGATURA}>
            casele de avocatură
          </Link>
          , se citește pe fișele de domeniu.
        </p>
      </JuridicSectiune>

      <JuridicSectiune
        id="acoperire"
        eticheta="Acoperirea"
        titlu={P.acoperire.titlu}
        lead={P.acoperire.lead}
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ListaBifa titlu="Ce este acoperit" elemente={P.acoperire.acoperit} />
          <JuridicListaLipsa
            titlu="Ce nu este acoperit"
            elemente={P.acoperire.neacoperit}
            oColoana
          />
        </div>

        <div className="mt-10 rounded-card bg-violet-pal p-6">
          <span className="mb-2 block text-nota font-semibold text-violet">
            Ce este pagina aceasta
          </span>
          <p className="max-w-[62ch] text-corp text-cerneala">{P.acoperire.nota}</p>
        </div>
      </JuridicSectiune>

      <JuridicSectiune
        id="moldova"
        ton="ceata"
        eticheta="A doua jurisdicție"
        titlu={P.moldova.titlu}
      >
        {P.moldova.paragrafe.map((text) => (
          <p key={text.slice(0, 40)} className="mb-5 max-w-[62ch] text-corp text-cerneala-2">
            {text}
          </p>
        ))}

        <p className="mt-8 max-w-[62ch] text-corp text-cerneala-2">
          Scrieți-ne la{" "}
          <a href="mailto:contact@3s.ro" className={LEGATURA}>
            contact@3s.ro
          </a>
          , cu actul și articolul. Adăugăm rândul și scriem de unde vine.
        </p>
      </JuridicSectiune>

      <JuridicSectiune
        id="folosire"
        eticheta="Folosirea"
        titlu={P.folosire.titlu}
        lead={P.folosire.lead}
      >
        <TermeneRegula reguli={P.folosire.reguli} />

        <div className="mt-14">
          <ListaBifa titlu="Actele pe care le citim" elemente={P.folosire.temeiuri} />
        </div>

        <div className="mt-10 rounded-card bg-ceata p-6">
          <span className="mb-2 block text-nota font-semibold text-cerneala-2">
            Limitele instrumentului
          </span>
          <p className="max-w-[62ch] text-corp text-cerneala-2">{P.folosire.nota}</p>
        </div>

        <p className="mt-10 max-w-[62ch] text-corp text-cerneala-2">
          Cum se face selecționarea, pas cu pas, și ce hârtie rămâne după fiecare etapă sunt
          scrise pe{" "}
          <Link href="/arhivare-fizica" className={LEGATURA}>
            pagina de arhivare fizică
          </Link>
          , iar mecanismul întreg, de la preluare până la răspunsul cu sursa citată, pe{" "}
          <Link href="/cum-functioneaza" className={LEGATURA}>
            pagina de mecanism
          </Link>
          .
        </p>

        <p className="mt-5 max-w-[62ch] text-corp text-cerneala-2">
          Restul paginilor sunt listate în{" "}
          <Link href="/harta-site" className={LEGATURA}>
            harta site-ului
          </Link>
          .
        </p>
      </JuridicSectiune>

      <div id="discutie">
        <BandaCTA
          titlu={P.incheiere.titlu}
          text={P.incheiere.text}
          actiune={{ href: "/contact", text: BUTON_DISCUTIE }}
        />
      </div>
    </main>
  );
}
