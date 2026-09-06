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
// in operare. Al patrulea cadru marcat atunci, `dosare`, a ramas cel vechi o runda in plus:
// inlocuitorul propus s-a dovedit la privire un teanc de manuale tiparite, cu un numar de
// telefon si o insemnare comerciala lizibile la 1:1.
//
// RUNDA A TREIA, tot pe 2026-09-06, si ea inchide amandoua cadrele ramase in discutie:
// `dosare` era cel mai intunecat al setului (luminanta 19,3 din 100, masurata pe esantion
// 160x160 din fisierul de 1920) si a trecut la 44,3; `rafturi` purta la 1:1, in ORIGINAL,
// lazi de vin cu textul lor comercial, titluri de reviste si un cod QR - nelizibile la 1920,
// dar sursa insasi era de magazin.
//
// RUNDA A PATRA, tot pe 2026-09-06, si e a doua oara cand se schimba `rafturi`: cadrul de la
// runda a treia (29533962) purta pe un cotor din prim-plan, gofrat, un nume de autor in
// chirilica, lizibil la 1:1 chiar in fisierul de 1920 - nu doar in original, cum spunea nota
// de atunci - iar alt-ul ii zicea „dosare" unor volume legate. Locul lui il ia 6549926: o sala
// de catalog, cu doua siruri de dulapuri de lemn cu sertare mici. Setul masoara acum 39,0-76,7
// la luminanta si 10,8-27,3 la saturatie, adica niciun cadru sub 30 si niciunul peste 50.
// Motivele, ID-urile si metoda masuratorii sunt in `public/img/LICENTA.md`.
//
// `pozitie` e ancora decupajului, si e o masuratoare, nu o preferinta. Toate cifrele de mai
// jos sunt citite din pagina CONSTRUITA, nu din CSS: `document.documentElement.clientWidth`
// raportat de browser, 1440 si 390.
//
// UN SINGUR CARD, ca sa nu mai fie doua cifre in acelasi fisier. La clientWidth 390 cardul de
// fotografie masoara 358x240 px pe toate paginile care poarta unul - `Ecran`, `TabPastila`,
// `InvestitieRandFoto`, `SegmentRandTextImagine`. Cifra de 343x240 din runda a doua era
// masurata cu bara de derulare clasica pe ecran (innerWidth 390, clientWidth 375), adica un
// card cu 15 px mai ingust decat pe un telefon adevarat; s-a remasurat cu bara ascunsa.
// Cardurile mici din randul eroului fac 171x120 la aceeasi latime - alt card, dar aceeasi
// fereastra pe practic acelasi procent (46,8% fata de 44,7%), deci o singura valoare le
// serveste pe amandoua.
//
// CE INSEAMNA FEREASTRA. Sub 768 px se serveste fisierul de 960, care e PORTRET 2:3 (0,67)
// intr-un card de 358x240 (1,49): el se intinde pe latime, deci din inaltimea fisierului se
// vede 240 / (1440 x 358/960) = 44,7%, si `pozitie` alege UNDE cade acea fereastra - de la
// 0-44,7% (la 0%) pana la 55,3-100% (la 100%). La 1440 se serveste fisierul de 1920, peisaj
// 3:2, iar cardul de 555x340 arata 91,9% din inaltimea lui: acolo aceeasi valoare aproape ca
// nu se vede, si de aceea decupajul de telefon e cel care decide.
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
    alt: "Două șiruri lungi de dulapuri de lemn cu sertare mici, fiecare cu suportul lui de etichetă, de o parte și de alta a unui culoar central; un sertar este tras afară, cu fișele înăuntru, fotografie ilustrativă",
    // 35%, si e o masuratoare pe cadrul NOU, nu cifra mostenita. Aici banda de detaliu
    // (abaterea standard pe randuri) NU serveste la nimic: ea gaseste 65-90%, adica MUCHIA
    // dintre dulapuri si podea, unde contrastul e maxim, in timp ce sertarele insele sunt o
    // textura marunta si uniforma. S-a masurat direct subiectul - cat la suta din latimea
    // fiecarui rand e lemn cald (rosu peste albastru cu 18 niveluri, rosu peste 90; podeaua si
    // peretele sunt gri, deci cad afara). Lemnul umple fisierul de 960 pana la 68% din
    // inaltime, iar sub 70% e numai podea.
    //
    // La 50% fereastra de 44,7% cade la 27,7-72,3% si ia 4,3 puncte de podea goala pe
    // marginea de jos; la 35% ea cade la 19,4-64,0%, adica se opreste in dulapuri. Lemnul din
    // fereastra, masurat din 5 in 5 puncte intre 30% si 60%: maximul e 61,6% chiar la 35%,
    // fata de 57,0% la 50%. Sertarul tras afara, care e detaliul cadrului, sta la 37,5-41,0%
    // din inaltime, deci intra la amandoua. Pe 1440 se serveste fisierul de 1920, care acopera
    // 91,9% din inaltimea cardului, deci acolo mutarea aproape nu se vede.
    pozitie: "center 35%",
  },
  cutii: {
    nume: "cutii",
    alt: "Mapă cu separatoare de carton, plină cu acte, într-o cutie bleu deschisă pe un birou de lemn, fotografie ilustrativă",
    // 50% e masurat, nu implicit: evantaiul de separatoare umple fisierul de 960 de la 0% la
    // 88,9% din inaltime (banda cu abaterea standard peste 45% din maxim, pe randuri de 10
    // px), cu centrul la 44,5%. Fereastra de 44,7% de pe clientWidth 390 cade la 27,7-72,3%,
    // adica in plin subiect indiferent de capat; nicio valoare nu castiga nimic masurabil,
    // deci ramane cea care nu cere explicatie.
    //
    // MASURAT, ca sa nu se remasoare: cutia bleu din alt sta la 0-22,8% (capacul) si
    // 74,8-90,3% (peretele din fata) din inaltimea fisierului de 960 - pixeli cu albastrul
    // peste rosu cu 30 de niveluri, pe cel putin 15% din latimea randului - adica amandoua in
    // AFARA ferestrei. S-a incercat 65%, care muta fereastra la 35,9-80,6% si aduce 5,8 puncte
    // de perete bleu in coltul de jos: privit, cadrul iese mai prost - taie varful evantaiului
    // de separatoare, care e subiectul, ca sa castige o dunga. Alt-ul descrie FOTOGRAFIA, nu
    // decupajul de telefon, si asa ramane.
    pozitie: "center 50%",
  },
  dosare: {
    nume: "dosare",
    alt: "Teanc de dosare vechi de carton maro și crem, cu file îngălbenite ieșind dintre coperțile uzate, prim-plan, fotografie ilustrativă",
    // 50%, si tot masurat: teancul e prim-plan si umple fisierul de 960 pe toata inaltimea
    // (banda de detaliu 0-100%), deci fereastra de 44,7% cade pe subiect oriunde ar fi pusa.
    // Singurul lucru de tinut afara e formularul tiparit de pe coperta de sus - randurile
    // „Name / Address / Subject / From", necompletate - care sta la 0-6,2% din inaltimea
    // fisierului: la 50% fereastra incepe la 27,7%, deci nu-l prinde. In fisierul de 1920 el
    // nici nu exista, decupajul peisaj pornind sub el, de la randul 804 al sursei.
    pozitie: "center 50%",
  },
  dulapuri: {
    nume: "dulapuri",
    alt: "Front de fișete metalice maro cald, cu uși numerotate și cartonașe galbene prinse în colțare metalice pe fiecare ușă, fotografie ilustrativă",
    // 38%, nu 50%, si nici 40% cat scria pana acum. Eticheta numerotata de sus sta la
    // 22,8-24,3% din inaltimea fisierului de 960 (randuri cu peste 20 de pixeli avand toate
    // cele trei canale peste 205), iar cartonasul galben la 45,2-57,1%. La 50% fereastra e
    // 27,7-72,3%: eticheta ramane afara, si pe telefon s-ar fi vazut doar cartonasul galben,
    // fara nicio cifra - dar alt-ul spune „usi numerotate", deci numarul trebuie sa se si
    // vada. Valoarea de 40% din runda a doua fusese aleasa contra unei ferestre de 46,6%,
    // masurata cu bara de derulare pe ecran; la fereastra reala de 44,7% ea da 22,1-66,8%,
    // adica eticheta trece cu 0,7 puncte, aproape 10 px de fisier, iar privita in card se
    // atinge de marginea de sus. La 38% fereastra e 21,0-65,7%: eticheta intra cu 1,8 puncte
    // de margine si cartonasul galben ramane intreg. Pe 1440 se serveste fisierul de 1920,
    // care acopera 91,9% din inaltimea cardului, deci mutarea aproape nu se vede acolo.
    pozitie: "center 38%",
  },
  sertare: {
    nume: "sertare",
    alt: "Mâini care deschid un sertar dintr-un fișet metalic alb, fotografie ilustrativă",
    // 60%, nu 50%. Deschizatura intunecata a sertarului tras sta la 37,2-49,8% din inaltimea
    // fisierului de 960, iar manerul de metal la 65,4-66,9% (randuri cu peste 5% din latime
    // sub nivelul 110 de gri). La 50% fereastra e 27,7-72,3% si manerul iese chiar pe
    // marginea de jos - privit in card, degetele care il tin sunt taiate. La 60% fereastra e
    // 33,2-77,9%: intra si mana de sus, si manerul intreg, si deschizatura. Pe 1440 fisierul
    // de 1920 acopera 91,9% din card, deci acolo nu se vede.
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
    // a abaterii standard), cu centrul la 50,4%. Fereastra de 44,7% de pe clientWidth 390
    // (masurat pe /comparatie) cade la 27,7-72,3%, adica simetric pe teanc; peretele crem de
    // sus si biroul de jos raman amandoua afara, ceea ce e si scopul.
    pozitie: "center 50%",
  },
} as const satisfies Record<string, Fotografie>;

export type CheieFotografie = keyof typeof FOTOGRAFII;
