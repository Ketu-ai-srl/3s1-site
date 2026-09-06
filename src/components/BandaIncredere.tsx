// Banda de incredere: `noapte-v`, cea mai inchisa suprafata a paletei. Albul pe ea da
// 18,95:1 si `violet-clar` 7,61:1, deci amandoua trec pragul de text mic cu marja.
//
// Ce scrie pe ea sunt afirmatii ATRIBUITE, din registrul `src/content/afirmatii/`: ce face
// ADRIA, firma-mama, si ce se intampla la preluare. Nu se adauga cifre noi si nu se scrie
// „avem X ani" - poarta de adevar refuza forma cu persoana intai, si pe drept: firma 3S nu
// e inregistrata inca.

type Element = { titlu: string; text: string };

type Props = {
  eticheta?: string;
  titlu: React.ReactNode;
  elemente: Element[];
};

// Coloanele urmeaza NUMARUL de elemente, nu un patru fix. Pana la S1-b grila era `lg:grid-cols-4`
// pentru orice lista, si /despre, cu cele cinci fapte mostenite de la ADRIA, lasa al cincilea
// singur pe randul al doilea la 1440 (masurat de critic, 06.09). Numele claselor sunt scrise
// intregi, nu compuse: Tailwind genereaza doar clasele pe care le gaseste literal in sursa.
const COLOANE: Record<number, string> = {
  3: "md:grid-cols-3",
  5: "md:grid-cols-3 lg:grid-cols-5",
};
const COLOANE_IMPLICIT = "md:grid-cols-2 lg:grid-cols-4";

export default function BandaIncredere({ eticheta, titlu, elemente }: Props) {
  const coloane = COLOANE[elemente.length] ?? COLOANE_IMPLICIT;
  return (
    <section className="bg-noapte-v">
      <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
        {eticheta ? (
          <span className="mb-4 block text-nota font-semibold text-violet-clar">{eticheta}</span>
        ) : null}
        <h2 className="max-w-[22ch] text-titlu-2 text-alb">{titlu}</h2>
        <ul className={"m-0 mt-12 grid list-none gap-8 p-0 " + coloane}>
          {elemente.map((e) => (
            <li key={e.titlu} className="border-t border-violet-adanc pt-5">
              <h3 className="text-subtitlu text-alb">{e.titlu}</h3>
              <p className="mt-2 text-nota text-violet-clar">{e.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
