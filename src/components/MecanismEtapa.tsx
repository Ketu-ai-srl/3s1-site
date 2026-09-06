// O etapa a mecanismului, ca CARD in grila paginii interioare.
//
// CE S-A SCHIMBAT LA VALUL S1-b. Etapa era un rand lat de registru: numarul in litera
// monospatiata pe o coloana de 7rem, titlul la pana la 40 px si, sub el, o caseta cu bara
// verticala. Sase randuri asa faceau 3494 px la 1280, adica 4,37 ecrane sub un singur titlu.
// REF-V aseaza aceeasi multime in carduri de doua coloane, deci sase etape intra in ceva mai
// mult de un ecran si se citesc doua cate doua.
//
// HARTIA CARE RAMANE E JUMATATE DIN ARGUMENT, deci nu a coborat la 14 px intr-un colt: sta
// sub o linie, cu eticheta ei, in acelasi card. Cine citeste etapa citeste si ce semneaza.
//
// Cardul e scris aici, nu luat din `Card`, dintr-un singur motiv: are trei etaje (pastila,
// corp, hartia de sub linie), iar `Card` are doua. Razele, captuseala si regula „fara umbra
// pe card static" sunt aceleasi.

type Props = {
  numar: number;
  titlu: string;
  text: string;
  urma: string;
  /** pe ce sta cardul: `alb` = sectiune alba, deci cardul e ceata; `ceata` = invers */
  fundal?: "alb" | "ceata";
};

export default function MecanismEtapa({
  numar,
  titlu,
  text,
  urma,
  fundal = "alb",
}: Props) {
  return (
    <li
      className={
        "flex h-full list-none flex-col rounded-card-mare p-8 " +
        (fundal === "alb" ? "bg-ceata" : "bg-alb")
      }
    >
      <span className="mb-4 inline-flex w-fit rounded-pastila bg-violet-pal px-3 py-1 text-nota font-semibold text-violet">
        Etapa {numar}
      </span>

      <h3 className="max-w-[22ch] text-titlu-4 text-cerneala">{titlu}</h3>
      <p className="mt-3 text-corp text-cerneala-2">{text}</p>

      <div className="mt-6 border-t border-linie pt-5">
        <span className="mb-1.5 block text-nota font-semibold text-violet">Rămâne scris</span>
        <p className="text-nota text-cerneala-2">{urma}</p>
      </div>
    </li>
  );
}
