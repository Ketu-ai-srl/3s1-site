// Acordeonul de intrebari: linii `linie`, fara cutii si fara umbre, ca in REF-V.
//
// Se construieste din `details`/`summary`, nu din stare React, si nu e comoditate: asa
// intrebarea SI raspunsul sunt in HTML-ul servit, deci le citeste si un agent care nu
// executa JavaScript, iar deschiderea merge din tastatura fara sa scriem noi nimic.

type Intrebare = { intrebare: string; raspuns: React.ReactNode };

type Props = {
  elemente: Intrebare[];
};

export default function Acordeon({ elemente }: Props) {
  return (
    <div className="border-t border-linie">
      {elemente.map((e) => (
        <details key={e.intrebare} className="group border-b border-linie">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-subtitlu text-cerneala">
            {e.intrebare}
            <span
              aria-hidden
              className="mt-1 shrink-0 text-violet transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="max-w-[70ch] pb-6 text-corp text-cerneala-2">{e.raspuns}</div>
        </details>
      ))}
    </div>
  );
}
