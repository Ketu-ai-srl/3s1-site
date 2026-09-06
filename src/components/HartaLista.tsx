import Link from "next/link";

// O grupa de rute din harta site-ului, ca GRILA DE CARDURI - gramatica REF-V a sectiunilor
// de domenii, aceeasi cu a grilei de pe pagina de start.
//
// CE ERA INAINTE, si de ce s-a schimbat. Randuri late cat pagina, cu numele condensat si cu
// MAJUSCULE, sageata la capat si descrierea alaturi. Erau douazeci si doua de randuri
// identice, unul sub altul, pe patru sectiuni: la 1440 px numele ocupa sapte coloane din
// saisprezece si intre el si descriere ramanea un gol pe care nu-l umplea nimic. In carduri,
// aceleasi douazeci si doua de rute intra pe trei coloane, deci grupa se vede intreaga
// dintr-o privire - ceea ce e chiar sarcina unei harti.
//
// NUMELE E LEGATURA SI E VIOLET, la 16 px, cu sageata. Adresa ramane sub descriere, fiindca
// harta e singurul loc de pe site unde adresa insasi e informatie: se copiaza intr-un mesaj,
// se lipeste intr-un browser, se compara cu `sitemap.xml`.
//
// CARDUL INTREG E LEGATURA, nu doar numele: pe telefon, o tinta de un cuvant intr-o lista de
// douazeci si doua de randuri se rateaza. Descrierea si adresa raman inauntrul ei.
//
// FUNDALUL se cere explicit, ca la `Card`: sectiunile alterneaza alb si ceata, iar un card
// care nu stie pe ce sta iese ceata pe ceata, adica un dreptunghi invizibil.

export type RandHarta = {
  cale: string;
  scurt: string;
  descriere: string;
};

type Props = {
  rute: RandHarta[];
  /** pe ce sta grila: `alb` = sectiune alba, deci cardul e ceata; `ceata` = invers */
  fundal?: "alb" | "ceata";
  /**
   * Cate coloane la 1024 px in sus. Trei e implicitul grupelor mari din harta; doua e
   * pentru cele patru drumuri ale paginii de 404, unde trei coloane lasa al patrulea card
   * singur pe randul al doilea - masurat pe captura, si e singurul lucru care se vede
   * acolo. Nu e o optiune de gust: se alege dupa cate carduri sunt.
   */
  coloane?: 2 | 3;
};

export default function HartaLista({ rute, fundal = "alb", coloane = 3 }: Props) {
  const card =
    "group flex h-full flex-col rounded-card p-6 no-underline transition-colors duration-200 hover:bg-violet-pal " +
    (fundal === "alb" ? "bg-ceata" : "bg-alb");

  return (
    <ul
      className={
        "m-0 grid list-none gap-4 p-0 md:grid-cols-2 " +
        (coloane === 3 ? "lg:grid-cols-3" : "")
      }
    >
      {rute.map((r) => (
        <li key={r.cale}>
          <Link href={r.cale} className={card}>
            <span className="flex items-baseline justify-between gap-3 text-corp font-semibold text-violet">
              {r.scurt}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
            <span className="mt-2 text-nota text-cerneala-2">{r.descriere}</span>
            <span className="mt-3 text-nota text-cerneala-2">{r.cale}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
