import Buton from "./Buton";
import type { Fotografie } from "@/content/fotografii";

// Randul text / imagine al paginii interioare (REF-V.md §4.4): titlu de bloc de 36 px la
// stanga, un paragraf de 16 px sub el, o legatura cu sageata, si fotografia intr-un card cu
// raza de 16 px in cealalta jumatate.
//
// Titlul e `h3`, nu `h2`: randul sta INAUNTRUL unei sectiuni care si-a scris deja titlul, si
// o sarita de nivel ar rupe schema paginii.
//
// Fotografia are `loading="lazy"`: randul asta nu apare niciodata pe primul ecran, fiindca
// deasupra lui stau antetul, randul de incredere si cel putin o grila.

type Props = {
  titlu: string;
  text: string;
  legatura: { href: string; text: string };
  imagine?: Fotografie;
  /** imaginea la stanga, textul la dreapta */
  invers?: boolean;
};

export default function SegmentRandTextImagine({
  titlu,
  text,
  legatura,
  imagine,
  invers = false,
}: Props) {
  return (
    <div className="md:grid md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-16">
      <div className={invers ? "md:order-2" : ""}>
        <h3 className="max-w-[20ch] text-titlu-3 text-cerneala">{titlu}</h3>
        <p className="mt-5 max-w-[54ch] text-corp text-cerneala-2">{text}</p>
        <div className="mt-6">
          <Buton href={legatura.href} fel="text" sageata>
            {legatura.text}
          </Buton>
        </div>
      </div>

      {imagine ? (
        <div
          className={
            "mt-10 overflow-hidden rounded-card-mare md:mt-0 " + (invers ? "md:order-1" : "")
          }
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={"/img/" + imagine.nume + "-960.webp"} />
            <img
              src={"/img/" + imagine.nume + "-1920.webp"}
              alt={imagine.alt}
              className="h-[240px] w-full object-cover md:h-[320px]"
              style={{ objectPosition: imagine.pozitie ?? "center" }}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      ) : null}
    </div>
  );
}
