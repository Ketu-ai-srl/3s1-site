// Lista a ceea ce LIPSESTE, in idiomul REF-V: liniuta gri in loc de bifa verde.
//
// REF-V.md §3 o scrie asa: „Liste de caracteristici: bifa verde `#009e5b` + text 16 px; ce
// lipseste din plan = liniuta gri + text `cerneala-3`." `ListaBifa`, componenta inghetata,
// e jumatatea cu bifa. Asta e cealalta jumatate, si exista fiindca paginile feliei foloseau
// bifa VERDE pe listele „Ce nu putem sustine inca" - o bifa de izbanda in dreptul fiecarui
// lucru pe care nu il putem dovedi.
//
// LINIUTA NU E UN CARACTER, e un dreptunghi de 12 x 1 px. Doua motive, amandoua masurate in
// alta parte: poarta de tipografie refuza liniile lungi, iar un caracter de liniuta ales
// gresit s-ar citi cu voce tare de un cititor de ecran in dreptul fiecarui rand. Marcajul e
// `aria-hidden`, deci lista se aude ca lista.
//
// Litera e `cerneala-2`, nu `cerneala-3`: 7,06:1 pe alb si 6,48:1 pe ceata, fata de 5,22 si
// 4,79. Randurile astea sunt chiar partea onesta a paginii, deci nu se scriu mai palid decat
// restul. Liniuta ramane `cerneala-3`, fiindca e semn, nu litera.

type Props = {
  titlu: string;
  elemente: string[];
};

export default function SegmentListaLipsa({ titlu, elemente }: Props) {
  return (
    <div>
      <h3 className="mb-5 text-titlu-4 text-cerneala">{titlu}</h3>
      <ul className="m-0 list-none p-0">
        {elemente.map((e) => (
          <li key={e} className="mb-3 flex gap-3 text-corp text-cerneala-2">
            <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-cerneala-3" />
            <span>{e}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
