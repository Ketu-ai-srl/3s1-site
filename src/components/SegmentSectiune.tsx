// Sectiunea paginii interioare REF-V: titlu de 48 px CENTRAT, un paragraf de 16 px sub el,
// si alternanta alb / ceata pe verticala.
//
// DE CE NU E `SectiuneRegistru`. Aceea aseaza titlul la stanga, il taie la 22ch si pune
// deasupra un rand de cota in litera monospatiata - gramatica directiei anterioare, unde
// pagina era un REGISTRU. REF-V masoara altceva pe pagina interioara: titlurile de sectiune
// sunt centrate, cu un paragraf centrat sub ele de cel mult ~70 de caractere pe rand
// (REF-V.md §2), iar sectiunile se despart prin culoarea de fundal, nu prin linie.
// `SectiuneRegistru` ramane neatinsa si o folosesc mai departe paginile celorlalte felii.
//
// Captuseala: 80 px sus si jos la 1440 (REF-V.md §3), 64 px sub 768.

type Ton = "alb" | "ceata";

const FUNDAL: Record<Ton, string> = {
  alb: "bg-alb",
  ceata: "bg-ceata",
};

type Props = {
  id?: string;
  ton?: Ton;
  eticheta?: string;
  titlu?: React.ReactNode;
  lead?: React.ReactNode;
  /** Titlul la stanga, pentru sectiunile care sunt un singur bloc, nu o grila. */
  aliniere?: "centru" | "stanga";
  children: React.ReactNode;
};

export default function SegmentSectiune({
  id,
  ton = "alb",
  eticheta,
  titlu,
  lead,
  aliniere = "centru",
  children,
}: Props) {
  const centrat = aliniere === "centru";
  const cap = eticheta || titlu || lead;

  return (
    <section id={id} className={FUNDAL[ton] + " scroll-mt-20"}>
      <div className="mx-auto w-full max-w-vitrina px-4 py-16 md:px-8 md:py-20">
        {cap ? (
          <div className={centrat ? "mx-auto max-w-[46rem] text-center" : ""}>
            {/* `span`, nu `p`: o eticheta de doua cuvinte nu e proza, iar poarta S-17
                cantareste paragrafele adevarate. Aceeasi regula ca in `Ecran`. */}
            {eticheta ? (
              <span className="mb-4 block text-nota font-semibold text-violet">{eticheta}</span>
            ) : null}
            {titlu ? (
              <h2
                className={
                  "text-titlu-2 text-cerneala " + (centrat ? "" : "max-w-[22ch]")
                }
              >
                {titlu}
              </h2>
            ) : null}
            {lead ? (
              <p
                className={
                  "mt-5 max-w-[62ch] text-corp text-cerneala-2 " + (centrat ? "mx-auto" : "")
                }
              >
                {lead}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className={cap ? "mt-12 md:mt-14" : ""}>{children}</div>
      </div>
    </section>
  );
}
