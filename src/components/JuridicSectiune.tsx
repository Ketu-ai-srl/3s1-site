// Sectiunea paginilor feliei juridice, pe gramatica REF-V a paginii INTERIOARE: banda alba
// sau de ceata, eticheta de 14 px in violet deasupra, titlul de sectiune la 48 px cu litera
// obisnuita si punct la final, o linie de 16 px sub el, apoi continutul.
//
// DE CE O COMPONENTA NOUA SI NU `SectiuneRegistru`. Aceea e inghetata la valul asta si
// poarta gramatica directiei ANTERIOARE: cota romana, titlu la greutatea 600, linie de 20
// px si un ritm de `py-24 md:py-36`, adica 96 si 144 px. REF-V masoara 80 px sus/jos pe
// sectiune (104 la cele mari), titlu la greutatea 400 si linie de 16 px. Nu se poate obtine
// una din alta cu un parametru: e alta asezare, nu alta valoare. Regula feliei spune exact
// asta - o componenta inghetata se importa cum e, iar cine are nevoie de alta asezare scrie
// una noua cu prefixul feliei.
//
// TONUL alterneaza alb / ceata de sus in jos pe pagina, si asta e singurul lucru care
// desparte doua sectiuni: fara chenar, fara umbra. Cardurile dinauntru se aseaza invers -
// ceata pe alb, alb pe ceata - deci fiecare sectiune spune componentelor pe ce stau.

type Props = {
  id?: string;
  /** `alb` sau `ceata`; cardurile dinauntru primesc valoarea inversa */
  ton?: "alb" | "ceata";
  eticheta?: string;
  /** Titlul sectiunii, ca `h2`. Lipseste acolo unde h1-ul paginii e chiar titlul ei. */
  titlu?: React.ReactNode;
  lead?: React.ReactNode;
  /** Titlul si linia centrate, ca la sectiunile mari din REF-V. */
  centrat?: boolean;
  children: React.ReactNode;
};

export default function JuridicSectiune({
  id,
  ton = "alb",
  eticheta,
  titlu,
  lead,
  centrat = false,
  children,
}: Props) {
  const antet = titlu || lead || eticheta;

  return (
    <section id={id} className={ton === "ceata" ? "bg-ceata" : "bg-alb"}>
      <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
        {antet ? (
          <div className={centrat ? "mx-auto max-w-[62ch] text-center" : ""}>
            {/* `span`, nu `p`: un cuvant-doua deasupra titlului nu e proza, iar poarta
                S-17 cantareste paragrafele adevarate. Aceeasi regula ca in `Ecran`. */}
            {eticheta ? (
              <span className="mb-4 block text-nota font-semibold text-violet">{eticheta}</span>
            ) : null}
            {titlu ? (
              <h2
                className={
                  "text-titlu-2 text-cerneala " + (centrat ? "mx-auto max-w-[24ch]" : "max-w-[22ch]")
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
        <div className={antet ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}
