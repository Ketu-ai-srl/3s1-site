// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
// Rama cu colturi de scanare: semnatura vizuala a instrumentelor. Cele patru colturi sunt
// elemente reale, nu pseudo-elemente, ca sa ramana o singura sursa de adevar pentru culoare.
//
// Isi pune SINGURA fundalul (`bg-noapte-2`), deci rastoarna cerneala inapoi pe cea de
// noapte pentru tot ce sta inauntru - si atunci cand cineva o aseaza pe o banda deschisa
// ramasa dintr-o pagina nerescrisa.

type Props = {
  children: React.ReactNode;
  className?: string;
};

const COLT = "pointer-events-none absolute h-[15px] w-[15px] border-violet";

export default function CadruScan({ children, className = "" }: Props) {
  return (
    <div className={`relative border border-linie bg-ceata ${className}`}>
      <span aria-hidden className={`${COLT} -top-px -left-px border-t-2 border-l-2`} />
      <span aria-hidden className={`${COLT} -top-px -right-px border-t-2 border-r-2`} />
      <span aria-hidden className={`${COLT} -bottom-px -left-px border-b-2 border-l-2`} />
      <span aria-hidden className={`${COLT} -bottom-px -right-px border-b-2 border-r-2`} />
      {children}
    </div>
  );
}
