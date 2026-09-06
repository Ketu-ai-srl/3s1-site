import Link from "next/link";
import JuridicIdentificare from "./JuridicIdentificare";
import type { Bloc, Frag } from "@/content/juridic";
import { MASURA_ACT } from "@/content/interior-juridic";

// Randarea blocurilor dintr-o sectiune juridica. Un singur loc care stie cum arata un
// paragraf, o enumerare, un rand de definitie si o caseta, ca sa nu se raspandeasca
// stilurile prin trei pagini.
//
// LEGATURILE. Regula e cea din subsol si e mecanica, nu de gust: `Link` pentru o ruta,
// `<a>` cand adresa contine un diez. `Link` trece intre pagini fara reincarcare, dar pe o
// ancora din pagina CURENTA sare peste derularea lina din `globals.css`. Conditia pe diez
// acopera ambele cazuri cu o singura regula, deci nu se poate aplica gresit.
//
// MASURA RANDULUI nu se scrie aici si nu se scrie de doua ori: e `MASURA_ACT` din
// `src/content/interior-juridic.ts`, cu motivul si cifra masurata langa ea. O foloseste si
// blocul de identificare, si incheierea actului, deci un al doilea plafon scris pe elemente
// s-ar abate de la primul - exact defectul masurat inainte, cand h2 statea la 516 px,
// paragraful la 485 si caseta la 547, in aceeasi coloana declarata.

function bucata(f: Frag, i: number) {
  if (typeof f === "string") {
    return <span key={i}>{f}</span>;
  }
  const stil = "text-violet underline decoration-violet-2 underline-offset-[3px] hover:text-cerneala";
  if (f.href.includes("#")) {
    return (
      <a key={i} href={f.href} className={stil}>
        {f.text}
      </a>
    );
  }
  return (
    <Link key={i} href={f.href} className={stil}>
      {f.text}
    </Link>
  );
}

function Text({ parti }: { parti: Frag[] }) {
  return <>{parti.map(bucata)}</>;
}

function Caseta({
  fel,
  eticheta,
  parti,
}: {
  fel: "declaratie" | "limite";
  eticheta: string;
  parti: Frag[];
}) {
  // Aceleasi doua feluri ca in `BlocDovada`: `declaratie` spune ce am ales si de ce,
  // `limite` spune ce nu putem sustine. Nu se refoloseste componenta aceea fiindca ea
  // randeaza un singur `<p>` si aici casetele poarta legaturi si fraze lungi.
  //
  // SUPRAFETELE, la valul S1-b: doua carduri cu raza de 12 px, despartite de pagina prin
  // CULOARE, nu prin chenar si nu prin umbra - regula REF-V pentru orice card. `declaratie`
  // sta pe `violet-pal`, adica pe suprafata de accent a referintei, unde violetul da 5,12:1
  // si cerneala peste 15:1; `limite` sta pe `ceata`, o treapta mai discreta, fiindca e o
  // recunoastere, nu o afirmatie. Inainte amandoua erau dreptunghiuri cu muchii drepte, una
  // pe alb cu o linie in stanga - adica invizibila pe o pagina alba.
  const stil =
    fel === "declaratie" ? "bg-violet-pal" : "bg-ceata";
  const stilEticheta = fel === "declaratie" ? "text-violet" : "text-cerneala-2";
  const stilText = fel === "declaratie" ? "text-cerneala" : "text-cerneala-2";

  return (
    <div className={`my-8 rounded-card p-6 ${stil}`}>
      <span className={`mb-2 block text-nota font-semibold ${stilEticheta}`}>{eticheta}</span>
      <p className={`${MASURA_ACT} text-corp ${stilText}`}>
        <Text parti={parti} />
      </p>
    </div>
  );
}

export default function JuridicBlocuri({ blocuri }: { blocuri: Bloc[] }) {
  return (
    <>
      {blocuri.map((b, i) => {
        switch (b.fel) {
          case "paragraf":
            return (
              <p key={i} className={`mb-4 ${MASURA_ACT} text-corp text-cerneala-2 last:mb-0`}>
                <Text parti={b.text} />
              </p>
            );

          case "lista":
            return (
              <ul key={i} className={`m-0 mb-4 ${MASURA_ACT} list-none p-0 last:mb-0`}>
                {b.elemente.map((e, j) => (
                  <li key={j} className="mb-3 flex gap-3 text-corp text-cerneala-2 last:mb-0">
                    {/* Liniuta e un element real, nu un marcator de lista: se aliniaza pe
                        prima linie oricat de lung ar fi randul. */}
                    <span aria-hidden className="mt-[11px] h-px w-[10px] shrink-0 bg-violet" />
                    <span>
                      <Text parti={e} />
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "randuri":
            return (
              <div key={i} className="my-6 border-t border-linie last:mb-0">
                {b.randuri.map((r) => (
                  <div
                    key={r.titlu}
                    className="grid gap-1.5 border-b border-linie py-4 md:grid-cols-[180px_1fr] md:gap-6"
                  >
                    {/* Randul de definitie: eticheta pe coloana din stanga, textul pe
                        dreapta, despartite doar de linia de 1 px. Titlul a coborat de la
                        19 px la treapta de subtitlu a REF-V (20/28), si e la aceeasi
                        greutate ca restul titlurilor - 400, din regula de baza. */}
                    <h3 className="text-subtitlu text-cerneala">{r.titlu}</h3>
                    <p className="text-corp text-cerneala-2">
                      <Text parti={r.text} />
                    </p>
                  </div>
                ))}
              </div>
            );

          case "declaratie":
          case "limite":
            return <Caseta key={i} fel={b.fel} eticheta={b.eticheta} parti={b.text} />;

          case "identificare":
            return (
              <div key={i} className="my-8">
                <JuridicIdentificare />
              </div>
            );
        }
      })}
    </>
  );
}
