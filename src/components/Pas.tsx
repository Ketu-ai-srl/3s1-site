// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
// Un pas din mecanism. Numarul sta pe coloana lui, ca intr-un opis: `Pasul 1`, mic, in mono,
// langa text - nu o cifra uriasa de decor. Sirul "01 / 02 / 03" scris mare, ca ornament, e
// chiar tiparul pe care directia il refuza, si diferenta e ca aici numarul se citeste.

type Props = {
  numar: number;
  titlu: string;
  children: React.ReactNode;
};

export default function Pas({ numar, titlu, children }: Props) {
  return (
    <li className="grid grid-cols-[64px_1fr] gap-4 border-t border-linie py-7 last:border-b sm:grid-cols-[96px_1fr] sm:gap-8">
      <span className="pt-[7px] font-mono text-[12px] font-medium  text-violet">
        Pasul {numar}
      </span>
      <div>
        <h3 className="mb-2 font-afis text-[22px] font-semibold  text-cerneala">
          {titlu}
        </h3>
        <p className="max-w-[64ch] text-corp text-cerneala-2">{children}</p>
      </div>
    </li>
  );
}
