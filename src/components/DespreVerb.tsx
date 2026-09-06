// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
// Unul din cele trei verbe ale numelui: cuvantul mare in stanga, ce inseamna el in dreapta.
//
// De ce nu mai sunt trei fise una langa alta. Pe /despre erau doua grile de cate trei fise -
// starea de azi si numele - la doua sectiuni distanta, cu aceeasi forma si aceeasi greutate.
// Doua sectiuni identice ca desen, cu continut diferit, sunt exact „sectiunile
// interschimbabile" pe care directia le refuza: ochiul nu mai citeste a doua, fiindca a
// recunoscut prima.
//
// Verbul e mare fiindca e un NUME, nu un titlu de rubrica: Scan, Store, Solve e chiar numele
// firmei, desfacut. Aceeasi gramatica vizuala cu ecranele Scan / Store / Solve de pe pagina
// de start, la scara unei sectiuni.

export default function DespreVerb({
  verb,
  children,
}: {
  verb: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-baseline gap-x-12 gap-y-3 border-t border-linie py-8 last:border-b md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
      <h3 className="font-afis text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-semibold tracking-[-0.01em]  text-cerneala">
        {verb}
      </h3>
      <p className="max-w-[62ch] text-[16.5px] leading-[1.55] text-cerneala-2">{children}</p>
    </div>
  );
}
