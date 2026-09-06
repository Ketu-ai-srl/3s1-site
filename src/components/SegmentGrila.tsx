import Card from "./Card";

// Grila de carduri a paginii interioare: doua coloane la 1440, una la 390 (REF-V.md §4.5).
//
// Cardul e `Card`, componenta inghetata a fundatiei, deci razele (12 / 16 px), separarea
// prin culoare de fundal si lipsa umbrei vin de acolo si nu se rescriu aici.
//
// PARAGRAFUL ISI SCRIE MARIMEA. `Card` inveleste continutul intr-un bloc de 14 px, marimea
// notei de card din REF-V. Grila asta poarta insa raspunsuri intregi, nu note, si brieful
// cere corp de 16 px, deci paragraful de dedesubt si-o declara pe a lui: `text-corp` pe `p`
// bate marimea mostenita de la bloc, fara sa atinga nimeni componenta inghetata.

export type ElementGrila = {
  titlu: string;
  text: string;
};

type Props = {
  elemente: ElementGrila[];
  /** pe ce sta grila: `alb` = sectiune alba, deci cardurile sunt ceata; `ceata` = invers */
  fundal?: "alb" | "ceata";
  /** carduri mari: raza 16 px, captuseala 32 px, titlu de 24 px */
  mari?: boolean;
  /**
   * Cate coloane la latime mare. `auto` numara elementele: multiplu de trei -> trei coloane,
   * altfel doua.
   *
   * DE CE SE NUMARA, si nu se scrie. Masurat pe capturile de la 1440: cu doua coloane fixe,
   * fiecare grila de TREI lasa a doua celula a randului al doilea goala - adica pe fiecare
   * fisa de domeniu, de doua ori (situatia si ce se schimba), plus la temeiuri acolo unde
   * sunt trei acte. Gaura aceea e chiar tiparul pe care directia il refuza la sectiunea de
   * fise. Numarul de elemente vine din continut si se schimba fara stirea paginii, deci
   * alegerea trebuie sa vina tot din el: un `coloane={2}` scris de mana ar imbatrani in ziua
   * in care cineva adauga a patra durere.
   */
  coloane?: 2 | 3 | "auto";
};

export default function SegmentGrila({
  elemente,
  fundal = "alb",
  mari = true,
  coloane = "auto",
}: Props) {
  const treiColoane =
    coloane === 3 || (coloane === "auto" && elemente.length % 3 === 0);
  const grila = treiColoane ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <ul className={"m-0 grid list-none gap-5 p-0 " + grila}>
      {elemente.map((e) => (
        <li key={e.titlu}>
          <Card titlu={e.titlu} fundal={fundal} mare={mari}>
            <p className="text-corp text-cerneala-2">{e.text}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
