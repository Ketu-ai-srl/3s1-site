import {
  CAMPURI_IDENTITATE,
  ETICHETE,
  entitate,
  identitateCompleta,
} from "@/content/entitate";
import { MASURA_ACT } from "@/content/interior-juridic";

// Blocul de identificare a comerciantului de pe pagina de termeni, ca un CARD pe ceata:
// raza 12 px, fara chenar si fara umbra, despartit de pagina alba prin culoarea lui - regula
// REF-V pentru orice card. Inainte era un dreptunghi alb cu o linie violet in stanga, adica
// invizibil pe o pagina alba, si o lista de definitii cu linii sus si jos.
//
// DE CE NU E ACELASI CU CEL DIN SUBSOL, desi arata la fel. Subsolul il afiseaza pe fiecare
// pagina si TACE cand datele lipsesc - acolo tacerea e alegerea corecta, fiindca un subsol
// cu `de completat` pe fiecare pagina arata a santier. Pe pagina de termeni tacerea ar fi
// gresita: cine deschide `/termeni` cauta EXACT datele astea, iar un gol nemotivat il lasa
// sa creada ca am uitat. Deci aici absenta se explica in proza, cu motivul ei.
//
// Cele doua blocuri citesc din ACEEASI sursa, `src/content/entitate.ts`, care citeste la
// randul ei `config/entitate.ro.json` - acelasi fisier pe care il masoara poarta juridica
// (L-01). Trei cititori, o singura sursa: nu au cum sa se contrazica.
//
// DE CE NU ENUMERAM ETICHETELE CAMPURILOR LIPSA. Varianta evidenta era o lista de forma
// "Denumire: lipseste, Sediu: lipseste". Am scris in proza, din doua motive. Intai, o lista
// de goluri e mai lunga si spune mai putin decat o fraza care zice DE CE lipsesc. Al doilea
// motiv e mecanic: una dintre etichetele de mai jos incepe cu un cuvant din familia care
// denumeste un contor, iar poarta juridica (codul L-10) opreste lotul cand un asemenea
// cuvant e urmat indeaproape de termenul care numeste entitatea ce decide scopul prelucrarii
// - tiparul care vaneaza afisarea unei inregistrari la registrul desfiintat al acestora.
// Randand lista doar cand datele EXISTA, cazul nu poate aparea din intamplare intr-un text
// viitor. Nota insasi nu scrie cele doua cuvinte alaturi: prima versiune le scria si a
// oprit lotul, fiindca o explicatie care citeaza tiparul devine o instanta a lui.

export default function JuridicIdentificare() {
  if (!identitateCompleta()) {
    return (
      <div className="rounded-card bg-ceata p-6">
        <span className="mb-2 block text-nota font-semibold text-cerneala-2">
          Ce lipsește azi, și de ce
        </span>
        <p className={`${MASURA_ACT} text-corp text-cerneala-2`}>
          3S este o firmă în curs de înființare. Din datele cerute de art. 5, azi există una
          singură, adresa de poștă electronică:{" "}
          <strong className="font-semibold text-cerneala">contact@3s.ro</strong>. Denumirea
          exactă, sediul, datele din registrul comerțului, codul de identificare fiscală și
          telefonul apar aici după înmatriculare, copiate dintr-un certificat, nu scrise din
          memorie.
        </p>
        <p className={`mt-3 ${MASURA_ACT} text-corp text-cerneala-2`}>
          Nu le înlocuim cu datele firmei-mamă: ar fi o afirmație falsă despre o altă persoană
          juridică. Golul este verificat automat înainte de fiecare publicare și blochează
          punerea site-ului în producție cât timp durează, tocmai ca să nu poată fi uitat.
        </p>
      </div>
    );
  }

  return (
    <dl className="m-0 grid gap-x-8 gap-y-3 rounded-card bg-ceata p-6 text-corp sm:grid-cols-2">
      {CAMPURI_IDENTITATE.map((camp) => (
        <div key={camp} className="flex flex-wrap gap-x-2">
          <dt className="text-cerneala-2">{ETICHETE[camp]}:</dt>
          <dd className="m-0 font-semibold text-cerneala">{entitate[camp]}</dd>
        </div>
      ))}
    </dl>
  );
}
