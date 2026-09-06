// Lista lucrurilor care LIPSESC, ca perechea negativa a lui `ListaBifa`.
//
// REF-V are amandoua formele si le tine diferite dinadins: ce e inclus primeste bifa verde,
// ce lipseste dintr-un plan primeste o liniuta gri. Aici fiecare rand e un CARD, fiindca pe
// paginile feliei randurile astea sunt fraze intregi, nu doua cuvinte de plan tarifar: opt
// randuri de cate treizeci de cuvinte intr-o lista cu marcatori se citesc ca un perete.
//
// DE CE NU SE REFOLOSESTE `ListaBifa`. Ea deseneaza bifa, si bifa spune „asta exista".
// Aceleasi randuri cu bifa in fata erau chiar defectul de pe /accesibilitate: opt afirmatii
// despre ce NU am masurat, fiecare bifata, adica semnul care spune contrariul textului.
//
// CULOAREA. Liniuta e `cerneala-3`, textul `cerneala-2`. Nu `cerneala-3` pe text: pe ceata
// da 4,79:1, deci ar trece, dar randurile astea sunt continut, nu note, si stau la aceeasi
// treapta ca restul corpului. Liniuta e ICOANA, ca bifa verde din `ListaBifa`: informatia
// sta in cuvant, nu in ea.

type Props = {
  titlu?: string;
  elemente: React.ReactNode[];
  /** pe ce sta lista: `alb` = sectiune alba, deci cardul e ceata; `ceata` = invers */
  fundal?: "alb" | "ceata";
  /** o singura coloana, cand lista sta langa alta lista intr-o grila deja impartita */
  oColoana?: boolean;
};

export default function JuridicListaLipsa({
  titlu,
  elemente,
  fundal = "alb",
  oColoana = false,
}: Props) {
  const card =
    "flex h-full gap-3 rounded-card p-5 " + (fundal === "alb" ? "bg-ceata" : "bg-alb");

  return (
    <div>
      {titlu ? <h3 className="mb-5 text-titlu-4 text-cerneala">{titlu}</h3> : null}
      <ul
        className={
          "m-0 grid list-none gap-4 p-0 " + (oColoana ? "" : "md:grid-cols-2")
        }
      >
        {elemente.map((e, i) => (
          <li key={i} className={card}>
            <span aria-hidden className="mt-[11px] h-px w-[10px] shrink-0 bg-cerneala-3" />
            <span className="text-corp text-cerneala-2">{e}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
