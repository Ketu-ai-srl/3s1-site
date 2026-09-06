// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
// O regula de folosire a listei de termene: numele regulii pe coloana din stanga, textul ei
// pe dreapta.
//
// De ce nu mai foloseste pagina `MecanismRandFisa`, care are aceeasi forma. Componenta aceea
// e a feliei mecanismului si scrie inca litera paletei vechi, cu un titlu care nu e cu
// majuscule condensate. Pe pagina de instrument, cele patru reguli sunt lucrurile care pot
// opri o eliminare gresita: se citesc ca titluri, nu ca randuri de tabel. Copiata a doua
// oara ar fi fost un al doilea loc de intretinut; scrisa aici, e a paginii care o arata, si
// se muta odata cu ea.

export default function TermeneRegula({
  titlu,
  children,
}: {
  titlu: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 border-t border-linie py-7 last:border-b lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-10">
      <h3 className="max-w-[24ch] font-afis text-[clamp(1.2rem,2vw,1.6rem)] font-semibold  text-cerneala">
        {titlu}
      </h3>
      <p className="max-w-[70ch] text-[16px] leading-[1.55] text-cerneala-2">{children}</p>
    </div>
  );
}
