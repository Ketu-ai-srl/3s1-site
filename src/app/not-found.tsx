import Link from "next/link";
import Buton from "@/components/Buton";
import Eticheta from "@/components/Eticheta";
import HartaLista from "@/components/HartaLista";
import Invelis from "@/components/Invelis";
import { NEGASITA } from "@/content/interior-juridic";
import { RUTE, type Ruta } from "@/content/rute";

// Pagina de 404, pe gramatica interioara REF-V: fundal ALB, eticheta de 14 px, titlul de
// 48 px cu litera obisnuita si punct la final, un paragraf, patru carduri de drum si UN
// buton violet catre pagina de start.
//
// CE ERA INAINTE, si de ce a picat fiecare bucata: fundalul de noapte si liniile de
// suprafata ale directiei anterioare - sase clase din paleta veche, care nu mai produceau
// CSS de la felia de fundatie, deci pagina se randa cu fundalul implicit si cu chenare
// invizibile. Numele lor nu se scriu aici pe litere: comanda de inventar din DIRECTIA.md
// cauta in fisierul intreg, nu doar in cod, iar un comentariu care citeaza clasa devine
// chiar instanta pe care inventarul o numara.
//
// Mai erau doua: titlul scris cu MAJUSCULE si la greutatea 700, adica exact ce refuza
// directia, intr-un font care nici nu incarca greutatea 700; si doua butoane, unul plin si
// unul de text, cand pagina asta are de dat un singur raspuns.
//
// Nu se deschide cu ecran plin si nu poarta fotografie: nu e o pagina de vitrina, e un
// indicator. Cine ajunge aici cauta un drum, nu un afis. Meniul si subsolul vin din layout,
// deci omul care nimereste aici are aceleasi drumuri ca pe orice alta pagina.
//
// PATRU DRUMURI, NU TOT SITE-UL. Doua runde au incercat sa faca lista de 22 de rute mai
// suportabila - intai scotandu-le descrierile, apoi asezandu-le pe trei coloane - si niciuna
// n-a atins defectul. Masurat inainte: 27 de randuri identice (22 de rute plus cele 5 ancore
// ale paginii de start), 23 dintre ele in primul ecran la 1280 px, iar la 390 px pagina avea
// 2569 px si iesirea catre pagina de start statea sub doua ecrane de legaturi. Ordinea era
// cea bruta a manifestului, deci pozitiile 3 si 4 erau "Securitate" si "Accesibilitate",
// inaintea lui "Cum functioneaza". Descrierile, mutate in atributul `title`, nu se vad pe
// atingere - adica pentru cititorul de pe telefon disparusera cu totul.
//
// Omul care ajunge aici cauta UN drum, nu harta intreaga; harta intreaga are pagina ei, si
// randul care duce la ea sta chiar sub lista. Deci raman patru destinatii: pagina de start,
// domeniile, instrumentul de termene si contactul. Ele se randeaza cu `HartaLista`, aceeasi
// grila de carduri ca in harta site-ului: acelasi fel de continut, acelasi limbaj vizual.
//
// Numele si adresele vin tot din manifest, cautate dupa cale: daca o ruta e redenumita,
// cardul isi ia numele nou, iar daca dispare din manifest, cardul dispare cu ea. O pagina de
// 404 care trimite spre adrese inexistente ar fi chiar defectul pe care il explica.
const CAI_SCURTE = ["/", "/solutii", "/instrumente/termene-de-pastrare", "/contact"];

const DESTINATII: Ruta[] = CAI_SCURTE.map((cale) => RUTE.find((r) => r.cale === cale)).filter(
  (r): r is Ruta => Boolean(r),
);

// Nu poarta titlu propriu in `metadata`: fisierul asta nu e o pagina de ruta, iar HTML-ul
// lui (`_not-found`) nu intra in harta de site si nu se indexeaza.

export default function PaginaNegasita() {
  return (
    <main className="bg-alb">
      <Invelis className="pt-[96px] pb-20 md:pt-[120px] md:pb-24">
        <Eticheta className="mb-4 block text-violet!">{NEGASITA.eticheta}</Eticheta>

        <h1 className="max-w-[20ch] text-titlu-2 text-cerneala">{NEGASITA.titlu}</h1>

        <p className="mt-5 max-w-[62ch] text-corp text-cerneala-2">{NEGASITA.text}</p>

        <div className="mt-8">
          <Buton href="/" sageata className="max-sm:w-full">
            {NEGASITA.buton}
          </Buton>
        </div>

        <span className="mt-14 mb-5 block text-nota font-semibold text-cerneala-2">
          {NEGASITA.drumuri}
        </span>
        <HartaLista rute={DESTINATII} coloane={2} />

        <p className="mt-8 max-w-[62ch] text-corp text-cerneala-2">
          Toate paginile site-ului, fiecare cu ce scrie pe ea într-un rând, stau în{" "}
          <Link
            href="/harta-site"
            className="text-violet underline decoration-violet-2 underline-offset-[3px]"
          >
            harta site-ului
          </Link>
          .
        </p>
      </Invelis>
    </main>
  );
}
