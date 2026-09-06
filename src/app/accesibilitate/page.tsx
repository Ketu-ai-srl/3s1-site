import type { Metadata } from "next";
import Link from "next/link";
import Acordeon from "@/components/Acordeon";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import Card from "@/components/Card";
import JuridicListaLipsa from "@/components/JuridicListaLipsa";
import JuridicSectiune from "@/components/JuridicSectiune";
import { ACCESIBILITATE as A } from "@/content/securitate";
import { FOTOGRAFII } from "@/content/fotografii";

// Declaratia de accesibilitate, scrisa ca lista de masuratori si nu ca declaratie de
// conformitate.
//
// Distinctia e tot continutul paginii. „Zero incalcari gasite de o unealta automata" si
// „conform cu un nivel dintr-un standard" sunt doua afirmatii diferite, iar a doua nu
// decurge din prima: unealta acopera o parte din criterii, restul se judeca de un om, si
// niciun om nu a facut inca auditul. Pagina spune amandoua lucrurile, in ordinea asta,
// si nu foloseste litera unui nivel nicaieri.
//
// ASEZAREA, la valul S1-b, si de ce fiecare bloc si-a schimbat forma:
//
//   CE SE MASOARA - carduri pe ceata, trei pe rand la 1440. Cele sase randuri sunt perechi
//   titlu-si-explicatie, deci nu incap intr-o lista cu bife: `ListaBifa` primeste siruri, iar
//   a-i da titlurile ar fi insemnat sa pierd explicatiile. Cardul poarta amandoua.
//
//   CE NU AM MASURAT - carduri cu LINIUTA, nu cu bifa (`JuridicListaLipsa`). Pana acum cele
//   opt randuri stateau intr-o `ListaBifa`, adica opt afirmatii despre ce NU am masurat,
//   fiecare cu o bifa verde in fata - semnul care spune exact contrariul textului de langa el.
//   REF-V are amandoua formele si le tine diferite dinadins.
//
//   SEMNALAREA - acordeon pe linii. Patru pasi deschisi, dupa doua sectiuni de liste, se
//   citesc ca inca un perete; intrebarea „cum va semnalez o problema" se raspunde cu un rand
//   pe care omul il deschide. Textul ramane in HTML-ul servit: `details`/`summary`.
//
//   INCHEIEREA - banda CTA violeta a referintei. Erau doua butoane pe aceeasi sectiune, unul
//   plin si unul de text; banda are unul singur, alb pe violet.
//
// Continutul sta in `src/content/securitate.ts`; aici e numai forma paginii.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si ar
// arata spre pagina de start, ceea ce o scoate din index.
export const metadata: Metadata = {
  title: A.titluMeta,
  description: A.descriereMeta,
  alternates: { canonical: "/accesibilitate" },
};

const LEGATURA = "text-violet underline decoration-violet-2 underline-offset-[3px]";

export default function Accesibilitate() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/accesibilitate"
        forma="banda"
        imagine={FOTOGRAFII.dosare}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Accesibilitate" }]}
        eticheta={A.eticheta}
        titlu={A.h1}
        lead={A.lead}
        actiune={{ href: "/contact", text: "Semnalați-ne o problemă" }}
        secundar={{ href: "/securitate", text: "Vedeți pagina de securitate" }}
      />

      <JuridicSectiune
        id="masurat"
        ton="ceata"
        eticheta="Ce se măsoară"
        titlu="Ce rulează automat, pe fiecare pagină, înainte de fiecare publicare."
        lead="Nu sunt intenții și nu au fost făcute o singură dată, la lansare. Rulează automat înaintea fiecărei publicări, pe fiecare pagină publică, iar dacă una dintre ele se înroșește, versiunea aceea nu ajunge la dumneavoastră."
      >
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {A.masurat.map((f) => (
            <li key={f.titlu}>
              <Card titlu={f.titlu} fundal="ceata">
                {f.text}
              </Card>
            </li>
          ))}
        </ul>
      </JuridicSectiune>

      <JuridicSectiune
        id="nemasurat"
        eticheta="Ce nu am măsurat"
        titlu="Zero încălcări găsite automat nu înseamnă conform."
        lead="Declarațiile de accesibilitate se scriu de obicei ca o promisiune de conformitate. Aici se încheie ce putem susține: rândurile de mai jos sunt lucrurile pe care o asemenea declarație le trece sub tăcere, fiindcă niciunul nu arată bine scris pe față."
      >
        <JuridicListaLipsa
          titlu="Ce nu putem afirma despre site-ul acesta"
          elemente={A.neMasurat}
        />

        <p className="mt-12 max-w-[62ch] text-corp text-cerneala-2">
          Distincția are o consecință practică pentru dumneavoastră: dacă instituția
          dumneavoastră are nevoie de o declarație de conformitate ca document de achiziție,
          pagina asta nu ține locul ei și nu vă lăsăm să credeți că ține. Spuneți-ne ce
          formă vă trebuie și vă spunem ce e nevoie ca să existe.
        </p>
      </JuridicSectiune>

      <JuridicSectiune
        id="semnalare"
        ton="ceata"
        eticheta="Semnalarea"
        titlu="Dacă ceva nu funcționează pentru dumneavoastră, spuneți-ne."
        lead="Partea pe care nu o poate măsura nicio unealtă este dacă pagina se poate folosi. Aceea se află numai de la cine o folosește, deci drumul până la noi este scris aici, pe scurt, și nu trece prin niciun formular care nu are destinatar."
      >
        <Acordeon
          elemente={A.semnalare.map((f) => ({ intrebare: f.titlu, raspuns: f.text }))}
        />

        <div className="mt-10 rounded-card bg-alb p-6">
          <span className="mb-2 block text-nota font-semibold text-cerneala-2">Adresa</span>
          <p className="max-w-[62ch] text-corp text-cerneala-2">
            Ne scrieți la{" "}
            <a href="mailto:contact@3s.ro" className={LEGATURA}>
              contact@3s.ro
            </a>
            . Nu afișăm număr de telefon, iar drumurile care există și cele care încă nu
            există sunt scrise pe pagina de contact, ca să nu așteptați răspuns pe un canal
            pe care nu îl citim.
          </p>
        </div>

        <p className="mt-10 max-w-[62ch] text-corp text-cerneala-2">
          Același fel de împărțire, între ce am măsurat și ce nu, stă și în{" "}
          <Link href="/securitate" className={LEGATURA}>
            pagina despre protecția documentelor
          </Link>{" "}
          și în{" "}
          <Link href="/cookies" className={LEGATURA}>
            pagina despre ce stocăm în browser
          </Link>
          .
        </p>
      </JuridicSectiune>

      <BandaCTA
        titlu={A.incheiere.titlu}
        text={A.incheiere.text}
        actiune={{ href: "/contact", text: "Vedeți cum ne scrieți" }}
      />
    </main>
  );
}
