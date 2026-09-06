// Eticheta mica de deasupra unui titlu, sau cota unei fise: 14 px la greutatea 600, in
// cerneala secundara. Fara majuscule si fara tracking larg - REF-V scrie etichetele cu
// litera obisnuita, ca pe orice alt text.
//
// De ce `cerneala-2` si nu `cerneala-3`: eticheta ajunge si pe carduri asezate pe `ceata`,
// unde `cerneala-3` da 3,97:1, sub pragul de 4,5:1. O primitiva care ajunge pe doua
// suprafete se scrie cu culoarea care trece pe amandoua.
//
// `inchis` a ramas in semnatura pentru paginile altor felii care il dau inca.

type Props = {
  children: React.ReactNode;
  inchis?: boolean;
  className?: string;
};

export default function Eticheta({ children, className = "" }: Props) {
  return (
    <span className={`text-nota font-semibold text-cerneala-2 ${className}`}>{children}</span>
  );
}
