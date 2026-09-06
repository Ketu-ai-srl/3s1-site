// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
// Un rând de fișă: termenul sau întrebarea pe coloana din stânga, răspunsul pe dreapta.
//
// Aceeași formă cu rândurile de temei juridic din `PaginaDeSegment`, scoasă în componentă
// fiindcă o folosesc acum șase secțiuni de pe patru pagini: glosarul de arhivistică, pașii
// selecționării, actele normative, variantele de comparație. Copiată a patra oară, ar fi
// devenit patru locuri care se desincronizează la prima schimbare de lățime a coloanei.
//
// CE S-A SCHIMBAT ÎN DIRECȚIA NOUĂ. Titlul rândului trece pe litera de afiș, condensată
// cu majuscule: la lățimea coloanei din stânga, un titlu de 19 px cu litere mici se
// pierdea lângă răspunsul de aceeași mărime, iar ochiul nu mai vedea unde începe rândul
// următor. Perechea de culori nu se mai alege din pagină: `text-cerneala` și
// `text-cerneala-2` se recalculează pe suprafața de deasupra, deci același rând stă corect
// și pe `noapte`, și pe `noapte-2`. Parametrul `inchis` a dispărut odată cu benzile verzi
// care îl cereau.

type Props = {
  titlu: string;
  children: React.ReactNode;
};

export default function MecanismRandFisa({ titlu, children }: Props) {
  return (
    <div className="grid gap-3 border-t border-linie py-8 last:border-b lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-8 lg:py-10">
      <h3 className="font-afis max-w-[24ch] text-[clamp(1.15rem,1.9vw,1.5rem)] font-semibold  text-cerneala">
        {titlu}
      </h3>
      <p className="max-w-[64ch] text-[17px] leading-[1.6] text-cerneala-2">{children}</p>
    </div>
  );
}
