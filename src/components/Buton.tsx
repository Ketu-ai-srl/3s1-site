import Link from "next/link";

// Butoanele directiei REF-V. Patru feluri, si fiecare raspunde la o intrebare diferita:
//
//   plin    actiunea principala pe fundal DESCHIS: violet plin, litera alba (6,20:1).
//   alb     actiunea principala pe fundal INCHIS (eroul, banda de incredere, banda CTA):
//           alb plin, litera cerneala. Pe gradientul eroului nu exista buton violet -
//           violetul pe violet-adanc da 1,9:1 pe muchie si butonul dispare.
//   contur  drumul al doilea, cand chiar e un buton: transparent, litera violet, contur
//           de 1 px `violet-2` desenat ca UMBRA, nu ca chenar, ca sa nu mute asezarea
//           cu un pixel fata de butonul plin de langa el.
//   text    drumul al doilea cand nu merita greutatea unui buton: legatura subliniata.
//
// UN SINGUR BUTON PRIMAR PE ECRAN ramane regula, si o are si REF-V. `plin` si `alb` sunt
// amandoua primare - nu se pun doua pe acelasi ecran, indiferent de fundal.
//
// FORMA, masurata pe REF-V: inaltime 48 px (`py-3` peste 16 px cu inaltime de rand 1,5
// da 48), captuseala orizontala 32 px, raza 8 px, litera 16 px la greutatea 600. Butonul
// mic (40 px) e pentru randurile de card, nu pentru actiunea principala a unui ecran.
//
// Semnatura (href, fel, marime, sageata, className) ramane cea veche, ca paginile altor
// felii sa compileze fara sa fie atinse; `fel="contur"` si-a recapatat conturul, fiindca
// in REF-V doua greutati diferite se disting prin plin contra contur, nu prin absenta.

type Fel = "plin" | "alb" | "contur" | "text";
type Marime = "mic" | "normal" | "mare";

const FEL: Record<Fel, string> = {
  plin: "rounded-buton bg-violet text-alb no-underline hover:bg-violet-2",
  alb: "rounded-buton bg-alb text-cerneala no-underline hover:bg-violet-pal",
  contur:
    "rounded-buton bg-transparent text-violet no-underline shadow-contur hover:bg-violet-pal",
  text: "bg-transparent text-violet underline decoration-violet-2 underline-offset-[5px] hover:text-cerneala",
};

const MARIME: Record<Marime, string> = {
  mic: "px-5 py-2.5 text-nota",
  normal: "px-8 py-3 text-corp",
  mare: "px-8 py-3 text-corp",
};

// Legatura de text nu poarta contur, deci nu poarta nici captuseala orizontala: aliniata
// cu butonul de langa ea, nu impinsa de un chenar inexistent.
const MARIME_TEXT: Record<Marime, string> = {
  mic: "py-2.5 text-nota",
  normal: "py-3 text-corp",
  mare: "py-3 text-corp",
};

const BAZA = "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200";

type Props = {
  href: string;
  children: React.ReactNode;
  fel?: Fel;
  marime?: Marime;
  sageata?: boolean;
  className?: string;
};

export default function Buton({
  href,
  children,
  fel = "plin",
  marime = "normal",
  sageata = false,
  className = "",
}: Props) {
  const cutie = fel !== "text";
  return (
    <Link
      href={href}
      className={`${BAZA} ${FEL[fel]} ${cutie ? MARIME[marime] : MARIME_TEXT[marime]} ${className}`}
    >
      {children}
      {sageata ? <span aria-hidden>→</span> : null}
    </Link>
  );
}
