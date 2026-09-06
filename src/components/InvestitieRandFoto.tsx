import type { Fotografie } from "@/content/fotografii";

// Randul text/imagine al paginii interioare REF-V: titlu de bloc de 36 px aliniat la stanga,
// un paragraf, ce mai cere pagina dedesubt, iar fotografia intr-un card cu raza 16 px, in
// dreapta sau in stanga. Randurile se alterneaza, ca in referinta.
//
// DE CE O SINGURA COMPONENTA PENTRU TREI PAGINI. Prefixul `Investitie` numeste FELIA, nu
// pagina: /investitia, /comparatie si /despre sunt cele trei pagini ale ei care au randuri
// text/imagine, si toate trei le vor identice. Trei copii ale acelorasi treizeci de randuri
// ar fi divergat la prima editare, si nimic nu le-ar fi comparat - exact motivul pentru care
// exista si registrul de fotografii.
//
// FOTOGRAFIA E OPTIONALA, si asta nu e comoditate. Pe /despre, randul ADRIEI are un depozit
// care se poate arata, iar randul firmei noi nu are inca nimic de aratat; diferenta de
// tratament E continutul, si a fost o decizie masurata a valului dinainte, pastrata aici.
// Cand lipseste fotografia, textul nu se intinde pe toata latimea: ramane pe o coloana
// citibila, altfel randul ar arata a sectiune, nu a rand.
//
// TITLUL E `h3`. Randurile stau intotdeauna sub un `h2` de sectiune, deci nu exista saritura
// de nivel - poarta S-03 o masoara pe HTML-ul construit.

type Props = {
  titlu: string;
  text?: React.ReactNode;
  imagine?: Fotografie;
  /** Unde sta fotografia pe ecran lat. Pe telefon coboara oricum sub text. */
  foto?: "stanga" | "dreapta";
  /** Liste, butoane, orice mai cere randul, sub paragraf. */
  children?: React.ReactNode;
};

export default function InvestitieRandFoto({
  titlu,
  text,
  imagine,
  foto = "dreapta",
  children,
}: Props) {
  const coloana = (
    <div className={imagine ? "" : "max-w-[68ch]"}>
      <h3 className="max-w-[20ch] text-titlu-3 text-cerneala">{titlu}</h3>
      {text ? <p className="mt-5 max-w-[58ch] text-corp text-cerneala-2">{text}</p> : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  );

  if (!imagine) return coloana;

  return (
    <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
      <div className={foto === "stanga" ? "md:order-2" : ""}>{coloana}</div>
      <div
        className={
          "mt-10 overflow-hidden rounded-card-mare md:mt-0 " +
          (foto === "stanga" ? "md:order-1" : "")
        }
      >
        <picture>
          <source media="(max-width: 767px)" srcSet={"/img/" + imagine.nume + "-960.webp"} />
          <img
            src={"/img/" + imagine.nume + "-1920.webp"}
            alt={imagine.alt}
            className="h-[240px] w-full object-cover md:h-[360px]"
            style={{ objectPosition: imagine.pozitie ?? "center" }}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  );
}
