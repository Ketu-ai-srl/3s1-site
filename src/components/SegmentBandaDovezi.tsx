// Banda inchisa `noapte-v` a paginii interioare (REF-V.md §4, „Pagina interioara"), cu
// afirmatiile pe care le poate verifica cineva inainte sa ne creada pe cuvant.
//
// DE CE NU E `BandaIncredere`. Aceea cere perechi titlu / text si le aseaza pe patru
// coloane. Listele pe care le poarta banda asta - `aratam` de pe fisele de domeniu,
// `nuDetinem` de pe pagina de securitate - sunt siruri simple, propozitii intregi, fara
// titlu. Le-as fi putut taia in doua ca sa incapa in forma aceea, dar taietura ar fi fost
// text NOU pus in gura continutului inghetat. Componenta e alaturi, nu in locul ei:
// `BandaIncredere` ramane neatinsa si o folosesc mai departe hub-ul si pagina de start.
//
// CONTRAST, din valorile paletei: alb pe `noapte-v` 18,95:1, `violet-clar` pe `noapte-v`
// 7,61:1. Eticheta de 14 px e `violet-clar`, litera listei e alba.

type Props = {
  eticheta: string;
  titlu: React.ReactNode;
  elemente: string[];
  /**
   * Semnul din dreptul fiecarui rand. `bifa` pentru ce se poate verifica, `liniuta` pentru
   * ce LIPSESTE - aceeasi impartire ca intre `ListaBifa` si `SegmentListaLipsa`. O bifa in
   * dreptul unui lucru pe care nu il putem dovedi ar fi o izbanda desenata pe o lipsa.
   */
  semn?: "bifa" | "liniuta";
};

export default function SegmentBandaDovezi({
  eticheta,
  titlu,
  elemente,
  semn = "bifa",
}: Props) {
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
                key={e}
                className="flex gap-3 border-t border-violet-adanc py-4 text-corp text-alb first:border-t-0 first:pt-0"
              >
                {semn === "bifa" ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    aria-hidden="true"
                    focusable="false"
                    className="mt-1 shrink-0 text-violet-clar"
                  >
                    <path
                      d="M3.5 9.5 L7 13 L14.5 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-violet-clar" />
                )}
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
