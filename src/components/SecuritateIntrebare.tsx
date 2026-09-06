import Acordeon from "./Acordeon";
import type { IntrebareDeschisa } from "@/content/securitate";

// Cele sase intrebari deschise ale partii digitale, ca ACORDEON pe linii (REF-V.md §4,
// „Pagina interioara": FAQ, acordeon, linii `linie`).
//
// CE S-A SCHIMBAT LA VALUL S1-b. Fiecare intrebare era un rand de registru pe doua coloane,
// cu starea in marginea din stanga in litera monospatiata. Sase randuri asa ocupau cat o
// pagina, iar sectiunea era ultima inainte de incheiere. Acordeonul le strange la sase linii
// si lasa intrebarile sa se citeasca dintr-o privire - care e chiar scopul lor: cine vine cu
// un chestionar de securitate isi cauta intrebarea in lista, nu citeste eseul.
//
// UNDE A AJUNS STAREA, si ce se pierde. `Acordeon` e inghetat si primeste `intrebare` ca
// SIR, deci in randul de sumar nu incape o pastila: starea a coborat in panoul pliat, langa
// motivul pentru care intrebarea conteaza. Se pierde citirea starii dintr-o privire, pe sase
// randuri deodata. Ce tine locul: titlul sectiunii spune raspunsul colectiv pe fata - sase
// intrebari la care nu avem raspuns in scris - deci cifra care conteaza se vede fara sa
// deschida nimeni nimic; in panou raman cele doua stari care difera de restul. Daca se
// hotaraste vreodata ca randul de sumar trebuie sa poarte pastila, se schimba `Acordeon`, nu
// se dubleaza aici lista in afara lui.
//
// RASPUNSUL E IN HTML-UL SERVIT. `Acordeon` foloseste `details` / `summary`, deci textul
// pliat exista in documentul livrat de server si se citeste cu scripturile oprite. Poarta
// S-17 il masoara.
//
// Componenta primeste TOATA lista, nu o intrebare, fiindca acordeonul e un singur element cu
// linii comune: sase acordeoane de cate un rand ar desena sase chenare.

type Props = {
  intrebari: IntrebareDeschisa[];
  /** eticheta de deasupra pastilei de stare, ca sa se stie ce spune cifra din dreptul ei */
  etichetaStare: string;
};

export default function SecuritateIntrebare({ intrebari, etichetaStare }: Props) {
  return (
    <Acordeon
      elemente={intrebari.map((i) => ({
        intrebare: i.intrebare,
        raspuns: (
          <>
            <p className="m-0">{i.deCeConteaza}</p>
            <p className="m-0 mt-4 flex flex-wrap items-baseline gap-2">
              <span className="text-nota font-semibold text-cerneala">{etichetaStare}</span>
              <span className="rounded-pastila bg-violet-pal px-3 py-1 text-nota font-semibold text-violet">
                {i.stare}
              </span>
            </p>
          </>
        ),
      }))}
    />
  );
}
