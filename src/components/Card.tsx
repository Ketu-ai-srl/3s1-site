import Link from "next/link";

// Cardul REF-V: raza 12 px (16 la cel mare), FARA umbra, si se desparte de vecinatate prin
// CULOARE DE FUNDAL - ceata pe alb, alb pe ceata. Umbra pe card static nu exista in
// referinta si nu se adauga: pe o pagina alba cu multe carduri, umbrele produc exact
// „grila de cartonase" pe care directia o refuza.
//
// De aceea `fundal` are doua valori si nu o implicita frumoasa: cardul trebuie sa stie pe
// ce sta, altfel iese ceata pe ceata, adica un dreptunghi invizibil.

type Props = {
  titlu: string;
  children: React.ReactNode;
  /** pe ce sta cardul: `alb` = sectiune alba, deci cardul e ceata; `ceata` = invers */
  fundal?: "alb" | "ceata";
  eticheta?: string;
  href?: string;
  mare?: boolean;
  className?: string;
};

export default function Card({
  titlu,
  children,
  fundal = "alb",
  eticheta,
  href,
  mare = false,
  className = "",
}: Props) {
  const cutie =
    (fundal === "alb" ? "bg-ceata " : "bg-alb ") +
    (mare ? "rounded-card-mare p-8 " : "rounded-card p-6 ") +
    "block h-full no-underline transition-colors duration-200 " +
    className;

  const continut = (
    <>
      {eticheta ? (
        <span className="mb-3 inline-block rounded-pastila bg-violet-pal px-3 py-1 text-[13px] font-semibold text-violet">
          {eticheta}
        </span>
      ) : null}
      <h3 className={(mare ? "text-titlu-4" : "text-subtitlu") + " text-cerneala"}>{titlu}</h3>
      <div className="mt-2 text-nota text-cerneala-2">{children}</div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cutie + " hover:bg-violet-pal"}>
        {continut}
      </Link>
    );
  }
  return <div className={cutie}>{continut}</div>;
}
