import type { Fapt } from "@/content/segmente";

// Banda inchisa `noapte-v` a hub-ului de domenii: regulile care nu se schimba de la un
// domeniu la altul, cu titlul si explicatia fiecareia.
//
// DE CE NU `BandaIncredere`. In valul S1-b aceea aseza elementele pe patru coloane fixe
// (`lg:grid-cols-4`) si era INGHETATA. Lista pe care o poarta banda asta - `INDIFERENT_DE_DOMENIU`
// - are TREI intrari, deci pe patru coloane al patrulea traseu ramanea gol: masurat la 1440,
// grila se termina la x=1321 iar ultimul card la x=1012, adica 308 px de banda goala. Nu se
// repara nici prin inventarea unui al patrulea fapt - ar fi o afirmatie noua scrisa ca sa umple
// un gol. La reconcilierea lotului `BandaIncredere` a primit coloane dupa numarul de elemente;
// componenta asta ramane fiindca forma ei e alta - cap de sectiune in stanga, lista in dreapta,
// ca la `SegmentBandaDovezi` de pe fisele de domeniu - si hub-ul o tine in aceeasi familie cu ele.
//
// DE CE NU `SegmentBandaDovezi`. Aceea primeste siruri simple si le pune una sub alta cu o
// bifa in fata. Faptele de aici sunt perechi titlu / text: taiate la un singur sir, ori pierd
// explicatia, ori repeta exact titlurile pe care randul de incredere de sub antet le arata
// deja pe aceeasi pagina. Componenta asta e sora ei: aceeasi banda, acelasi cap de sectiune
// in stanga, aceeasi lista in dreapta, dar randul poarta pereche, nu sir.
//
// LISTA VERTICALA, deci numarul de elemente nu mai poate lasa traseu gol: trei, patru sau
// sapte fapte incap la fel de bine.
//
// CONTRAST, din valorile paletei: alb pe `noapte-v` 18,95:1, `violet-clar` pe `noapte-v`
// 7,61:1. Eticheta si textul de sub fiecare titlu sunt `violet-clar`, titlurile albe.

type Props = {
  eticheta: string;
  titlu: React.ReactNode;
  elemente: Fapt[];
};

export default function SegmentBandaReguli({ eticheta, titlu, elemente }: Props) {
  return (
    <section className="bg-noapte-v">
      <div className="mx-auto w-full max-w-vitrina px-4 py-16 md:px-8 md:py-20">
        <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-start md:gap-x-16">
          <div>
            <span className="mb-4 block text-nota font-semibold text-violet-clar">
              {eticheta}
            </span>
            <h2 className="max-w-[18ch] text-titlu-2 text-alb">{titlu}</h2>
          </div>

          <ul className="m-0 mt-10 list-none p-0 md:mt-0">
            {elemente.map((e) => (
              <li
                key={e.titlu}
                className="border-t border-violet-adanc py-5 first:border-t-0 first:pt-0"
              >
                <h3 className="text-subtitlu text-alb">{e.titlu}</h3>
                <p className="mt-2 max-w-[62ch] text-nota text-violet-clar">{e.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
