// Fotografiile vitrinei: un singur loc care stie ce fisier exista in `public/img/` si ce
// scrie in textul alternativ al fiecaruia.
//
// DE CE UN REGISTRU, si nu textul alternativ scris in fiecare pagina. Pana acum fotografiile
// erau folosite doar de pagina de start, care si-l scria singura de trei ori. De cand
// deschid toate cele 22 de pagini, acelasi cadru apare pe doua-trei pagini diferite: cu
// textul scris de mana in fiecare, doua descrieri ale ACELEIASI fotografii diverg la prima
// editare, si nimic nu le-ar fi comparat. Aici e o singura descriere per cadru, iar pagina
// alege cheia.
//
// REGULA DE ADEVAR, scrisa in `docs/design/DIRECTIA.md`: sunt fotografii ILUSTRATIVE, de pe
// Pexels, cu licenta in `public/img/LICENTA.md`. Textul alternativ o SPUNE, in litere, si nu
// afirma nicaieri ca ar fi depozitul nostru.
//
// FIECARE SITE ARE SETUL LUI. Site-ul asta a pornit ca o copie a primului si a mostenit
// aceleasi sapte fotografii - toate cele 14 fisiere identice la octet, masurat cu sha256.
// Doua site-uri care se adreseaza acelorasi clienti nu pot arata aceleasi imagini, deci pe
// 2026-09-06 s-au schimbat toate, cu cheile NEATINSE: cheile sunt contractul cu paginile,
// fisierele sunt ale acestui site. Nimic din `public/img/` nu se copiaza de la alt site.
//
// `pozitie` e ancora decupajului, si e o masuratoare, nu o preferinta. Cardul antetului are
// ~555x340 px la 1440 (proportie 1,63), iar fisierul de 1920 e in general 3:2 (1,50), deci
// acolo se taie doar ~8% pe verticala. Sub 768 px se serveste fisierul de 960, care e PORTRET
// 2:3 (0,67) intr-un card de ~358x240 (1,49): acolo se vede o fereastra de numai 45% din
// inaltime, si ea decide unde trebuie sa cada subiectul. Valorile de mai jos sunt alese
// privind pagina construita la 1440 si la 390, cadru cu cadru.
//
// ISTORIC, ca sa nu fie remasurat degeaba: pana la felia asta registrul mai avea doua campuri,
// `filtru` (o desaturare CSS) si `voalBanda` (subtierea voalului de sub text). Amandoua erau
// cifre masurate contra unei pagini de NOAPTE, pe care fotografia acoperea tot ecranul si
// purta text peste ea. In REF-V fotografia sta intr-un card alb cu raza 16 si nu mai poarta
// niciun text, deci nu mai exista nici banda de culoare in care sa fie adusa, nici contrast
// de aparat cu un voal: campurile n-ar mai fi avut ce masura si s-au scos, din registru si
// din tipul `Imagine` al lui `Ecran.tsx`. Cifrele lor vechi stau in istoricul git, la felia 29.

export type Fotografie = {
  /** numele fisierului fara sufixul de marime: `rafturi` -> rafturi-1920.webp / rafturi-960.webp */
  nume: string;
  alt: string;
  pozitie?: string;
};

export const FOTOGRAFII = {
  rafturi: {
    nume: "rafturi",
    alt: "Perete de rafturi albe cu teancuri de hârtii și cutii de carton, fotografie ilustrativă",
    pozitie: "center 50%",
  },
  cutii: {
    nume: "cutii",
    alt: "Cutii de carton stivuite pe un raft metalic, cu etichete de manipulare, fotografie ilustrativă",
    pozitie: "center 50%",
  },
  dosare: {
    nume: "dosare",
    alt: "Fișe de carton cu etichete scrise de mână, într-un sertar de catalog, fotografie ilustrativă",
    pozitie: "center 50%",
  },
  dulapuri: {
    nume: "dulapuri",
    alt: "Sertare de lemn cu etichete scrise de mână pe bandă neagră, fotografie ilustrativă",
    // 30%, nu 50%: pe 390 px cardul arata numai 45% din inaltimea fisierului portret, iar la
    // 50% fereastra incepea la 27,6% - adica exact sub eticheta „cutter" (la 22-26%), deci
    // ramanea o fata de sertar goala. La 30% fereastra e 16,6-61,3% si prinde si eticheta de
    // sus, si manerul, si eticheta „60". Pe 1440 fisierul acopera 92% din inaltimea cardului,
    // deci mutarea aproape nu se vede acolo.
    pozitie: "center 30%",
  },
  sertare: {
    nume: "sertare",
    alt: "Mâini care deschid un sertar dintr-un fișet metalic alb, fotografie ilustrativă",
    // 60%, nu 50%: pe 390 px se vede o fereastra de 44,7% din inaltimea fisierului portret,
    // iar la 50% ea se termina la 72,4% - sub manerul pe care il tine mana (64-75%), deci
    // cadrul ramanea „doua maini pe alb", fara sertarul care e chiar subiectul. La 60%
    // fereastra e 33,2-77,9% si prinde si mana de sus, si manerul, si deschizatura intunecata
    // a sertarului tras. Pe 1440 fisierul de 1920 acopera 92% din card, deci acolo nu se vede.
    pozitie: "center 60%",
  },
  maini: {
    nume: "maini",
    alt: "Mâini care răsfoiesc actele dintr-o mapă cu despărțitoare, pe un birou luminos, fotografie ilustrativă",
    pozitie: "center 50%",
  },
  legatura: {
    nume: "legatura",
    alt: "Cotoare de bibliorafturi roșii aliniate pe raft, cu etichete de cotă, fotografie ilustrativă",
    pozitie: "center 50%",
  },
} as const satisfies Record<string, Fotografie>;

export type CheieFotografie = keyof typeof FOTOGRAFII;
