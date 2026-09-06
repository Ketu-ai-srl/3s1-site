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
// de catalog, cu doua siruri de dulapuri de lemn cu sertare mici.
//
// RUNDA A CINCEA, tot pe 2026-09-06, si schimba `dulapuri`: fisetele metalice (3773984)
// purtau pe usa din dreapta-sus o placuta gofrata de producator - pictograma plus un semn
// verbal de doua cuvinte - prezenta in AMANDOUA fisierele livrate, nu doar in original. Locul
// lui il ia 6550460: un perete lung de dulapuri de lemn cu sertare mici de catalog, vazut
// oblic. Setul masoara acum 44,3-76,7 la luminanta si 10,8-27,3 la saturatie, adica niciun
// cadru sub 30 si niciunul peste 50. Motivele, ID-urile, inventarul urmelor de text pe ambele
// fisiere si metoda masuratorii sunt in `public/img/LICENTA.md`.
//
// `pozitie` e ancora decupajului, si e o masuratoare, nu o preferinta. Toate cifrele de mai
// jos sunt citite din pagina CONSTRUITA, nu din CSS: `document.documentElement.clientWidth`
// raportat de browser, 1440 si 390.
//
// PE TELEFON E UN SINGUR CARD. La clientWidth 390 cardul de fotografie masoara 358x240 px pe
// toate paginile care poarta unul - `Ecran`, `TabPastila`, `InvestitieRandFoto`,
// `SegmentRandTextImagine`. Cifra de 343x240 din runda a doua era masurata cu bara de derulare
// clasica pe ecran (innerWidth 390, clientWidth 375), adica un card cu 15 px mai ingust decat
// pe un telefon adevarat; s-a remasurat cu bara ascunsa. Cardurile mici din randul eroului fac
// 171x120 la aceeasi latime - alt card, dar aceeasi fereastra pe practic acelasi procent
// (46,7% fata de 44,6%), deci o singura valoare le serveste pe amandoua.
//
// PE ECRAN LAT SUNT CINCI, si nota de pana la runda a patra scria unul singur, „cardul de
// 555x340", plus „91,9% din inaltime" repetat in trei comentarii ca si cum ar fi o constanta.
// Nu e. Masurat pe pagina construita la clientWidth 1440, cu `getBoundingClientRect` si
// `naturalWidth/naturalHeight`, cat la suta din inaltimea fisierului de 1920 incape in card:
//
//   card                                       marime    acoperire   unde
//   carduri mici de erou                       282x180   95,5-95,7%  `/`
//   rand text/imagine (`InvestitieRandFoto`)   569x360   94,8-95,0%  `/investitia`, `/comparatie`, `/despre`
//   card de fila (`TabPastila`)                577x360   93,7%       `/`
//   antet de pagina (`AntetPagina`)            555x340   91,8-92,5%  toate paginile interioare
//   rand de fisa (`SegmentRandTextImagine`)    569x320   84,3-84,4%  `/solutii`, `/solutii/<domeniu>`, `/arhivare-fizica`, `/cum-functioneaza`, `/securitate`
//
// Acoperirea variaza cu cateva zecimi intre cadre fiindca fisierele de 1920 nu au toate
// aceeasi inaltime (1272-1282 px, proportia sursei). Cel mai strans e randul de fisa, 84,3%:
// acolo `pozitie` chiar se vede, aproape 16% din inaltime fiind taiati, si de aceea cifrele
// de mai jos spun pe CARE card s-a masurat fiecare cadru. Tabelul e masurat pe zece pagini,
// nu pe una: `/`, `/solutii`, `/solutii/notari`, `/investitia`, `/comparatie`, `/despre`,
// `/arhivare-fizica`, `/cum-functioneaza`, `/securitate`, `/contact`.
//
// CE INSEAMNA FEREASTRA. Sub 768 px se serveste fisierul de 960, care e PORTRET 2:3 (0,67)
// intr-un card de 358x240 (1,49): el se intinde pe latime, deci din inaltimea fisierului se
// vede 240 / 537,6 = 44,6%, si `pozitie` alege UNDE cade acea fereastra - de la 0-44,6% (la
// 0%) pana la 55,4-100% (la 100%). Pe ecran lat se serveste fisierul de 1920, peisaj 3:2, iar
// cardurile din tabelul de mai sus arata intre 84,3% si 95,7% din inaltimea lui: pe patru din
// cinci aceeasi valoare aproape ca nu se vede, si de aceea decupajul de telefon e cel care
// decide.
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
    // La 50% fereastra de 44,6% cade la 27,7-72,3% si ia 4,3 puncte de podea goala pe
    // marginea de jos; la 35% ea cade la 19,4-64,0%, adica se opreste in dulapuri. Lemnul din
    // fereastra, masurat din 5 in 5 puncte intre 30% si 60%: maximul e 61,6% chiar la 35%,
    // fata de 57,0% la 50%. Sertarul tras afara, care e detaliul cadrului, sta la 37,5-41,0%
    // din inaltime, deci intra la amandoua. Pe ecran lat cadrul cade pe trei carduri diferite,
    // si cel mai strans dintre ele e randul de fisa de 569x320, care arata 84,4% din inaltimea
    // fisierului de 1920 (`/arhivare-fizica`, `/solutii/imobiliare`); pe antetul de 555x340
    // (`/solutii`, `/securitate`, `/despre`) arata 92,0%. La 35% fereastra taiata de randul de
    // fisa cade la 5,5-89,9%, adica tot in dulapuri, deci mutarea nu strica nimic nici acolo.
    pozitie: "center 35%",
  },
  cutii: {
    nume: "cutii",
    alt: "Mapă cu separatoare de carton, plină cu acte, într-o cutie bleu deschisă pe un birou de lemn, fotografie ilustrativă",
    // 50% e masurat, nu implicit: evantaiul de separatoare umple fisierul de 960 de la 0% la
    // 88,9% din inaltime (banda cu abaterea standard peste 45% din maxim, pe randuri de 10
    // px), cu centrul la 44,5%. Fereastra de 44,6% de pe clientWidth 390 cade la 27,7-72,3%,
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
    // (banda de detaliu 0-100%), deci fereastra de 44,6% cade pe subiect oriunde ar fi pusa.
    // Singurul lucru de tinut afara e formularul tiparit de pe coperta de sus - randurile
    // „Name / Address / Subject / From", necompletate - care sta la 0-6,2% din inaltimea
    // fisierului: la 50% fereastra incepe la 27,7%, deci nu-l prinde. In fisierul de 1920 el
    // nici nu exista, decupajul peisaj pornind sub el, de la randul 804 al sursei.
    pozitie: "center 50%",
  },
  dulapuri: {
    nume: "dulapuri",
    alt: "Perete lung de dulapuri de lemn deschis, cu zeci de sertare mici de catalog unul peste altul, fiecare cu suportul lui metalic de etichetă, văzut oblic de-a lungul sălii, fotografie ilustrativă",
    // 30%, si e o masuratoare pe cadrul NOU, nu cifra mostenita de la fisetele metalice (38%).
    // S-a masurat direct subiectul, ca la `rafturi`: cat la suta din latimea fiecarui rand e
    // lemn cald (rosu peste 90 SI rosu peste albastru cu 18 niveluri; podeaua cenusie si
    // peretele de sticla cad afara). Peretele de dulapuri umple fisierul de 960 pana la 70,6%
    // din inaltime, iar sub el e numai podea. Sus, in sfertul din stanga, ramane o fasie de
    // fundal - geamul si o draperie aurie, iesite din focar - care tine de la 0% la circa 9%.
    //
    // Lemnul din fereastra, masurat din 5 in 5 puncte intre 20% si 40%: 31,3 la 20%, 32,5 la
    // 25%, 33,0 la 30%, 32,7 la 35%, 32,6 la 40% - maximul e la 30%. Acolo fereastra de 44,6%
    // cade la 16,6-61,2% (verificat si in pagina, `objectPosition` 50% 30% pe cardul de
    // 358x240): incepe cu 7,6 puncte sub fasia de fundal si se opreste cu 9,4 puncte inainte
    // de podea. Privit in card la clientWidth 390, pe `/investitia`, sertarele umplu cardul.
    //
    // Pe ecran lat cadrul sta pe antetul de 555x340 (`/investitia`, `/solutii/imobiliare`),
    // care arata 92,0% din inaltimea fisierului de 1920, si pe randul de fisa de 569x320
    // (`/solutii/primarii`), 84,4%; la 30% fereastra stransa cade la 4,7-89,1%, adica taie din
    // fasia de fundal si nu atinge subiectul.
    pozitie: "center 30%",
  },
  sertare: {
    nume: "sertare",
    alt: "Mâini care deschid un sertar dintr-un fișet metalic alb, fotografie ilustrativă",
    // 60%, nu 50%. Deschizatura intunecata a sertarului tras sta la 37,2-49,8% din inaltimea
    // fisierului de 960, iar manerul de metal la 65,4-66,9% (randuri cu peste 5% din latime
    // sub nivelul 110 de gri). La 50% fereastra e 27,7-72,3% si manerul iese chiar pe
    // marginea de jos - privit in card, degetele care il tin sunt taiate. La 60% fereastra e
    // 33,2-77,9%: intra si mana de sus, si manerul intreg, si deschizatura. Pe ecran lat cadrul
    // sta pe antetul de 555x340 (`/contact`, `/instrumente/termene-de-pastrare`), care arata
    // 92,0% din inaltimea fisierului de 1920, si pe randul de fisa de 569x320 (`/securitate`),
    // 84,4%; nici acolo 60% nu taie subiectul - fereastra de 84,4% cade la 9,4-93,8%.
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
    // a abaterii standard), cu centrul la 50,4%. Fereastra de 44,6% de pe clientWidth 390
    // (masurat pe /comparatie) cade la 27,7-72,3%, adica simetric pe teanc; peretele crem de
    // sus si biroul de jos raman amandoua afara, ceea ce e si scopul.
    pozitie: "center 50%",
  },
} as const satisfies Record<string, Fotografie>;

export type CheieFotografie = keyof typeof FOTOGRAFII;
