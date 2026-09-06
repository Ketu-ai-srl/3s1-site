// Textele NOI de interfata cerute de gramatica paginii interioare REF-V pe paginile
// feliei juridice: acte (/termeni, /confidentialitate, /cookies), declaratia de
// accesibilitate, instrumentul de termene, harta site-ului si pagina de 404.
//
// DE CE UN FISIER NOU SI NU O ADAUGARE IN `juridic.ts` SAU `termene-extins.ts`. Alea
// poarta CONTINUTUL - clauzele, termenele, actele citate - si sunt inghetate ca text si
// ca chei la valul asta. Ce se scrie aici nu e continut: sunt etichetele de interfata pe
// care le cere asezarea noua si care nu existau in directia veche, fiindca nu exista nici
// cuprinsul lipicios, nici randul de ancore, nici pastilele de stare. Tinute separat, se
// vede dintr-o privire ce a adaugat valul S1-b si ce a mostenit.
//
// VOCEA: propozitii scurte, litera obisnuita, „dumneavoastra" ca adresare. Eticheta NU are
// punct la final - o eticheta cu punct e agramata, si a fost defect reparat la valul S1-a.
// Propozitiile intregi au punct.

/** Cuprinsul unui act: coloana lipicioasa la 1440, acordeon deasupra textului la 390. */
export const CUPRINS = {
  /** Eticheta coloanei. Fara punct: e o eticheta, nu o propozitie. */
  eticheta: "Cuprins",
  /** Numele navigatiei, pentru cine citeste pagina cu un cititor de ecran. */
  numeNavigatie: "Cuprinsul documentului",
};

/** Randul de ancore de pe instrumentul de termene, deasupra fiselor. */
export const ANCORE_TERMENE = {
  eticheta: "Săriți la o categorie",
  /** Rezumatul listei de ancore, pentru cititorul de ecran. Nu e tabel: vezi `TermeneCuprins`. */
  descriere:
    "Cele opt categorii de documente din pagina aceasta, fiecare cu termenul și cu actul normativ din care vine. Numele categoriei duce la fișa ei întreagă.",
};

/** Randul cu ancorele paginii de start, din harta site-ului. */
export const ANCORE_ACASA = {
  eticheta: "Locuri din pagina de start",
};

/** Lista lucrurilor care lipsesc: liniuta, nu bifa. */
export const LIPSA = {
  /** Numele listei, cand sectiunea nu il da ea. */
  eticheta: "Ce lipsește",
};

/**
 * Pagina de 404. Textele sunt cele scrise deja in `src/app/not-found.tsx`, mutate aici
 * cuvant cu cuvant: nu s-a rescris niciun rand, s-a schimbat doar locul in care sta.
 */
export const NEGASITA = {
  eticheta: "Adresă negăsită",
  titlu: "Adresa asta nu duce la nicio pagină.",
  text: "Fie adresa a fost scrisă altfel, fie pagina pe care o căutați nu există pe acest site. Mai jos sunt patru drumuri scurte.",
  drumuri: "Drumuri",
  buton: "Înapoi la pagina de start",
};

/**
 * Masura randului pe paginile care sunt ACTE, ca sir de clasa, intr-un singur loc.
 *
 * Cadrul actului are 720 px (`--container-act`), dar proza nu se scrie pe toata latimea lui:
 * la 16 px, 672 px de coloana dau in jur de 90 de caractere pe rand, iar un act se citeste la
 * 60-75. Deci PROZA are plafonul de mai jos, in pixeli, iar titlurile, casetele si randurile
 * de definitii raman pe toata latimea cadrului - altfel coloana ar deveni o panglica ingusta
 * plutind intr-un dreptunghi gol.
 *
 * DE CE IN PIXELI SI NU IN `ch`. Unitatea `ch` e latimea glifei ZERO, printre cele mai late
 * ale fontului, deci raspunde la alta intrebare decat cea pusa. Capcana e masurata pe chiar
 * paginile astea: plafonul dinainte era scris `max-w-[74ch]` si suna a „74 de caractere pe
 * rand"; masurat cu un `Range` peste fiecare rand vizual, dadea 98 de caractere in medie, cu
 * varf la 103. Nicio poarta nu se inrosea, fiindca niciuna nu numara caractere. Cifra de mai
 * jos e masurata la fel, pe pagina randata.
 */
export const MASURA_ACT = "max-w-[540px]";

/**
 * Eticheta butonului primar de pe actele juridice si de pe instrumentul de termene. Aceeasi
 * cu a fiselor de domeniu (`interior-solutii.ts`), si scurta dintr-un motiv masurat, nu de
 * gust: „Programați o discuție de 30 de minute" se rupea pe doua randuri la 390 si dadea un
 * buton de 72 px pe /termeni, /confidentialitate si /cookies (de doua ori pe fiecare), fata
 * de 48 px cat are butonul peste tot in rest. Masurat la reconcilierea lotului S1-b, dupa ce
 * un raport spusese 48 px „pe toate cele 7 pagini".
 */
export const BUTON_DISCUTIE = "Discuție de 30 de minute";
