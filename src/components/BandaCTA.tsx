import Link from "next/link";

// Banda CTA a REF-V: violet plin pe toata latimea, h2 alb de 48 px in stanga, un paragraf,
// si UN buton alb. Albul pe violet da 6,20:1, deci trec si titlul, si paragraful de 16 px.
//
// Butonul e ALB, nu violet cu contur: pe violet plin, un buton violet nu exista.

type Props = {
  titlu: React.ReactNode;
  text?: React.ReactNode;
  actiune: { href: string; text: string };
  nota?: React.ReactNode;
};

export default function BandaCTA({ titlu, text, actiune, nota }: Props) {
  return (
    <section className="bg-violet">
      <div className="mx-auto w-full max-w-vitrina px-4 py-20 md:px-8 md:py-24">
        <div className="md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center md:gap-12">
          <div>
            <h2 className="max-w-[18ch] text-titlu-2 text-alb">{titlu}</h2>
            {text ? <p className="mt-5 max-w-[54ch] text-corp text-alb">{text}</p> : null}
          </div>
          <div className="mt-8 md:mt-0 md:justify-self-end">
            <Link
              href={actiune.href}
              className="inline-flex items-center justify-center rounded-buton bg-alb px-8 py-3 text-corp font-semibold text-cerneala no-underline transition-colors duration-200 hover:bg-violet-pal"
            >
              {actiune.text}
            </Link>
            {nota ? <p className="mt-4 max-w-[34ch] text-nota text-alb">{nota}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
