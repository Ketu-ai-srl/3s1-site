// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
// Un rand din sectiunea de raspundere: intrebarea unui serviciu juridic pe prima coloana
// pe ecran lat, raspunsul pe a doua; la 390 px se stivuiesc, si de aceea textul paginilor
// nu trimite niciodata la "stanga" sau "dreapta".

type Props = {
  intrebare: string;
  children: React.ReactNode;
};

export default function RandRaspundere({ intrebare, children }: Props) {
  return (
    <div className="grid gap-3 border-t border-linie py-7 last:border-b lg:grid-cols-[300px_1fr] lg:gap-10">
      <h3 className="font-afis text-[22px] font-semibold  text-cerneala">
        {intrebare}
      </h3>
      <p className="max-w-[64ch] text-corp text-cerneala-2">{children}</p>
    </div>
  );
}
