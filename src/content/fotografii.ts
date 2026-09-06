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
// RUNDA A DOUA, tot pe 2026-09-06, dupa ce cadrele au fost privite pe planse: trei din cele
// sapte s-au schimbat inca o data, fiindca ce era in ele contrazicea povestea paginii. Vechiul
// `cutii` era o scena de curierat (plicuri si cutii de transport, nu arhiva), vechiul
// `dulapuri` un dulap de atelier cu granulatii de slefuit scrise cu creta, iar vechiul
// `legatura` bibliorafturi noi cu eticheta de magazin si cod EAN pe cotor - marfa, nu depozit
// in operare. Al patrulea cadru pe care omul l-a marcat, `dosare` (cel mai intunecat al
// setului), a RAMAS cel vechi: inlocuitorul propus s-a dovedit la privire un teanc de manuale
// tiparite, cu un numar de telefon si o insemnare comerciala lizibile la 1:1, deci ar fi mutat
// defectul, nu l-ar fi reparat. Motivul e scris si in `public/img/LICENTA.md`.
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
    alt: "Mapă cu separatoare de carton, plină cu acte, într-o cutie bleu deschisă pe un birou de lemn, fotografie ilustrativă",
    // 50% e masurat, nu implicit: evantaiul de separatoare umple fisierul de 960 de la 0% la
    // 88,9% din inaltime (banda cu abaterea standard peste 45% din maxim, pe randuri de 10
    // px), cu centrul la 44,5%. Fereastra de 46,6% de pe 390 px cade la 26,7-73,3%, adica in
    // plin subiect indiferent de capat; nicio valoare nu castiga nimic masurabil, deci ramane
    // cea care nu cere explicatie.
    //
    // MASURAT, ca sa nu se remasoare: cutia bleu din alt sta la 0-21,1% (capacul) si
    // 73,6-91,0% (peretele din fata) din inaltimea fisierului de 960, adica in AFARA ferestrei
    // de pe 390 px. S-a incercat 65%, care aduce 7,7 puncte de perete bleu in coltul de jos:
    // privit, cadrul iese mai prost - taie varful evantaiului de separatoare, care e subiectul,
    // ca sa castige o dunga. Alt-ul descrie FOTOGRAFIA, nu decupajul de telefon, si asa ramane.
    pozitie: "center 50%",
  },
  dosare: {
    nume: "dosare",
    alt: "Fișe de carton cu etichete scrise de mână, într-un sertar de catalog, fotografie ilustrativă",
    pozitie: "center 50%",
  },
  dulapuri: {
    nume: "dulapuri",
    alt: "Front de fișete metalice gri-bej, cu uși numerotate și cartonașe galbene prinse în colțare metalice pe fiecare ușă, fotografie ilustrativă",
    // 40%, nu 50%: pe 390 px (innerWidth citit din pagina, /investitia) cardul e 343x240 si
    // arata o fereastra de 46,6% din inaltimea fisierului portret. La 50% fereastra e
    // 26,7-73,3%, iar eticheta numerotata de sus sta la 22,8-24,3% (masurata pe fisier,
    // banda de pixeli deschisi) - adica exact deasupra taieturii, si pe telefon ar fi ramas
    // doar cartonasul galben, fara nicio cifra. Alt-ul spune „usi numerotate", deci numarul
    // trebuie sa se si vada. La 40% fereastra e 21,4-68,0%: prinde eticheta cu 1,4 puncte de
    // margine si cartonasul galben intreg (45,3-57,1%). Pe 1440 se serveste fisierul de 1920,
    // care acopera 93% din inaltimea cardului, deci mutarea aproape nu se vede acolo.
    pozitie: "center 40%",
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
    alt: "Teanc de documente legate cu spirală albă, cu cotoare colorate, pe un birou de lemn deschis, fotografie ilustrativă",
    // 50% e masurat: teancul ocupa 14,6-86,1% din inaltimea fisierului de 960 (aceeasi banda
    // a abaterii standard), cu centrul la 50,4%. Fereastra de 46,6% de pe 390 px (masurat pe
    // /comparatie) cade la 26,7-73,3%, adica simetric pe teanc; peretele crem de sus si
    // biroul de jos raman amandoua afara, ceea ce e si scopul.
    pozitie: "center 50%",
  },
} as const satisfies Record<string, Fotografie>;

export type CheieFotografie = keyof typeof FOTOGRAFII;
