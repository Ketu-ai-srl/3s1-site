// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
import Eticheta from "./Eticheta";

// Separatorul de subsectiune: eticheta, titlu, apoi o linie care umple restul randului.

type Props = {
  eticheta: string;
  titlu: string;
};

export default function BandaTitlu({ eticheta, titlu }: Props) {
  return (
    <div className="mt-14 mb-6 flex items-baseline gap-4">
      <Eticheta className="text-violet!">{eticheta}</Eticheta>
      <h3 className="font-afis text-[22px] font-semibold  text-cerneala">
        {titlu}
      </h3>
      <span aria-hidden className="h-px flex-1 bg-linie" />
    </div>
  );
}
