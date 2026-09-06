// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
// Fisa scurta dintr-o insiruire de domenii: un nume si o linie de context, despartite de
// restul printr-o linie sus, nu printr-o cutie. Aceeasi regula ca la `CardSegment`: cutiile
// identice, una langa alta, sunt tiparul pe care directia il refuza.
//
// Nu o importa nimeni azi (verificat cu grep pe `src` si `tests` la felia 25). Ramane cu
// semnatura neatinsa fiindca o cer feliile de pagini care urmeaza; daca trec fara ea, se
// sterge atunci, cu masuratoarea de atunci.

type Props = {
  titlu: string;
  children: React.ReactNode;
};

export default function CardCompact({ titlu, children }: Props) {
  return (
    <span className="block border-t border-linie pt-3 text-[15.5px] leading-[1.5] text-cerneala-2">
      <b className="mb-1 block font-afis text-[19px] font-semibold  text-cerneala">
        {titlu}
      </b>
      {children}
    </span>
  );
}
