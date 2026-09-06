// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
// O fisa de segment: titlu si un paragraf, despartite de restul printr-o linie sus, nu
// printr-o cutie. Cutiile identice, una langa alta, sunt tiparul pe care directia il
// refuza; linia pastreaza ritmul fara sa faca "grila de carduri".
//
// `fundal` a ramas in semnatura pentru paginile care il dau inca; nu mai are efect,
// fisa sta pe fundalul sectiunii. Se scoate cand nu-l mai da nimeni.

type Props = {
  titlu: string;
  children: React.ReactNode;
  fundal?: "hartie" | "suprafata";
};

export default function CardSegment({ titlu, children }: Props) {
  return (
    <div className="border-t border-linie pt-5">
      <h3 className="mb-3 font-afis text-[24px] font-semibold  text-cerneala">
        {titlu}
      </h3>
      <p className="text-[16px] leading-[1.55] text-cerneala-2">{children}</p>
    </div>
  );
}
