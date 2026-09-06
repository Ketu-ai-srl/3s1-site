// Textele NOI de interfata ale celor patru pagini de decizie: /investitia, /comparatie,
// /despre si /contact. E fisierul de continut al feliei 4, valul S1-b.
//
// CE INTRA AICI SI CE NU. Aici stau numai lucrurile pe care le CERE gramatica paginii
// interioare REF-V si care nu existau in continutul de dinainte: etichete de card, titluri
// de sectiune care nu erau scrise nicaieri, intrebarile acordeonului, gruparea celor sapte
// elemente de cost in trei carduri. Faptele raman unde erau - `src/content/comparatie.ts`,
// `src/content/despre.ts`, `src/content/entitate.ts` - si se citesc de acolo, verbatim.
// Fisierele acelea sunt inghetate in valul asta: nu se rescrie nici textul, nici cheile.
//
// CAZUL CARE ERA GATA SA DEVINA O EXCEPTIE. Banda inchisa de pe /despre cere perechi
// titlu-text, iar `MOSTENIT` din `despre.ts` e o lista de siruri. Tentatia era sa rescriu aici
// cele cinci fapte in forma ceruta - adica sa existe doua versiuni ale aceluiasi fapt, care
// diverg la prima editare a continutului si pe care nimic nu le-ar fi comparat. Aici stau doar
// ETICHETELE, cate una per rand; textele raman in `despre.ts` si se imperecheaza la randare.
// `tests/interior-felie4.test.ts` masoara si ca sunt tot atatea etichete cate randuri, si ca
// niciun text din `MOSTENIT` nu e copiat in fisierul asta.
//
// VOCE: propozitii scurte, litera obisnuita, adresarea „dumneavoastra", diacritice cu
// virgula. Etichetele NU au punct - o eticheta cu punct e agramata, si a fost defect reparat
// in valul S1-a. Propozitiile au punct.

/** O grupa de elemente de cost, adica un card din sectiunea de factori a paginii /investitia. */
export type GrupaFactori = {
  eticheta: string;
  titlu: string;
  lead: string;
  /** Indicii din `INVESTITIA.factori`, in ordinea in care se citesc pe card. */
  indici: number[];
  /** Cardul din mijloc e inchis, ca in REF-V. Unul singur pe rand. */
  inchis?: boolean;
};

/** O intrebare de acordeon: intrebarea e noua, raspunsul vine din continutul existent. */
export type IntrebareInterior = {
  intrebare: string;
  /** Cheia raspunsului, rezolvata in pagina din continutul deja scris. */
  cheie: string;
};

// ---------------------------------------------------------------------------
// /investitia
// ---------------------------------------------------------------------------

export const INVESTITIA_INTERIOR = {
  /**
   * Randul de garantii de sub antet. Fiecare rand rezuma ceva deja scris pe site:
   * primul e chiar al doilea element din `INVESTITIA.nuPrimiti`, al doilea vine din
   * `INVESTITIA.factori[0]`, al treilea din `ARATAM` de pe /despre. Fara punct: sunt
   * etichete, nu propozitii.
   */
  garantii: [
    "Fără ofertă trimisă a doua zi",
    "Măsurăm rafturile înainte de orice cifră",
    "Contract în română, înainte de preluare",
  ],

  factoriEticheta: "Ce intră în cost",
  factoriTitlu: "Șapte elemente, în trei grupe.",
  factoriLead:
    "Nu sunt criterii de listă de prețuri, sunt lucrurile pe care le măsurăm la fața locului. Fiecare are scris în ce condiții crește și în ce condiții scade, ca să vă puteți așeza singur fondul undeva pe scară.",

  /**
   * Cele sapte elemente din `INVESTITIA.factori`, grupate cate doua-trei. Indicii acopera
   * multimea 0-6 exact o data: proba `tests/interior-felie4.test.ts` o masoara, ca o
   * regrupare viitoare sa nu piarda un element si sa nu-l scrie de doua ori.
   */
  grupe: [
    {
      eticheta: "Fondul",
      titlu: "Cât este și în ce stare este.",
      lead: "Primele două se măsoară cu ruleta și cu ochiul, la fața locului, înainte de orice discuție despre bani.",
      indici: [0, 4],
    },
    {
      eticheta: "Timpul",
      titlu: "Cât stă în depozit și cât de des se cere.",
      lead: "Grupa din mijloc hotărăște partea recurentă: un fond care se atinge rar înseamnă depozitare, unul din care se cere zilnic înseamnă muncă.",
      indici: [3, 2],
      inchis: true,
    },
    {
      eticheta: "Ce se cere de la noi",
      titlu: "Câtă muncă cere hârtia până ajunge căutabilă.",
      lead: "Ultimele trei nu depind de mărimea fondului, ci de cât timp de om cere: ce se scanează, pe ce drum ajunge la noi și cine hotărăște termenul.",
      indici: [1, 5, 6],
    },
  ] as GrupaFactori[],

  structuraTitlu: "Ce se plătește o dată și ce se plătește lună de lună.",
  structuraLead:
    "Împărțirea contează mai mult decât suma: partea unică se face o singură dată și rămâne făcută, partea recurentă se adună cât ține contractul. Două oferte cu același total pot fi foarte diferite aici.",

  discutiaEticheta: "Discuția de 30 de minute",
  discutiaTitlu: "Ce iese din jumătatea de oră.",
  discutiaLead:
    "Discuția nu este o prezentare. Se măsoară, se scrie și pleacă la dumneavoastră, chiar dacă la final decideți să rămâneți la dulapul din birou.",
  refuzTitlu: "Ce nu iese, și nici nu promitem.",
  refuzLead:
    "Le scriem aici fiindcă sunt exact lucrurile pe care le cere un cumpărător grăbit, iar un furnizor grăbit le promite.",

  ctaNota:
    "Nu afișăm număr de telefon: solicitările intră prin poșta electronică, ca să rămână o urmă scrisă a cererii dumneavoastră și a răspunsului nostru.",

  intrebariEticheta: "Întrebări despre preț",
  intrebariTitlu: "Ce ne întreabă lumea despre bani.",
  intrebari: [
    { intrebare: "De ce nu scrie un preț pe pagina asta?", cheie: "fara-pret-0" },
    { intrebare: "Ce se schimbă dacă publicați totuși o cifră?", cheie: "fara-pret-1" },
    { intrebare: "Cum comparăm două oferte de arhivare?", cheie: "fara-pret-2" },
    { intrebare: "Ce nu intră nici în costul unic, nici în cel lunar?", cheie: "nota-costuri" },
    { intrebare: "Când primim în sfârșit o cifră?", cheie: "incheiere" },
  ] as IntrebareInterior[],
};

// ---------------------------------------------------------------------------
// /comparatie
// ---------------------------------------------------------------------------

export const COMPARATIE_INTERIOR = {
  varianteEticheta: "Variantele",
  varianteTitlu: "Patru situații reale, nu patru produse de pe un raft.",
  varianteLead:
    "Comparăm ce comparați dumneavoastră de fapt. Nu spațiu de stocare cu alt spațiu de stocare, fiindcă documentele nu sunt încă fișiere. Trei dintre cele patru variante nu sunt ale noastre și sunt descrise așa cum le-ar descrie cine le folosește.",

  tabelEticheta: "Comparația",
  tabelTitlu: "Șase întrebări care se pun oricum.",
  tabelLead:
    "Sunt întrebările care apar în discuție, în ordinea în care apar. Pe ecran lat se citesc pe coloane; pe telefon fiecare întrebare devine un card, iar fiecare răspuns își poartă numele variantei.",

  pierdemEticheta: "Unde pierdem",
  pierdemTitlu: "Rândurile pe care le pierdem, scrise înaintea celor pe care le câștigăm.",

  nuMeritaEticheta: "Când nu merită",
  nuMeritaTitlu: "Patru situații în care răspunsul corect este nu.",
  nuMeritaLead:
    "Le scriem fiindcă le auzim oricum în prima jumătate de oră, iar atunci s-a consumat deja timpul dumneavoastră. Mai bine se citesc aici, gratis.",
};

// ---------------------------------------------------------------------------
// /despre
// ---------------------------------------------------------------------------

export const DESPRE_INTERIOR = {
  impartireaEticheta: "Împărțirea",
  impartireaTitlu: "Două firme, două vechimi diferite.",
  impartireaLead:
    "O firmă care se înființează acum și care se sprijină pe depozitul firmei-mamă are două vechimi, nu una. Cititorul care le confundă semnează cu impresia greșită despre cine îi ține hârtia, deci scriem întâi împărțirea.",

  adriaTitlu: "ADRIA ține hârtia. Din 2019.",
  treiSTitlu: "3S construiește răspunsul. Din anul acesta.",

  stareaEticheta: "Starea de azi",
  stareaTitlu: "3S nu are încă personalitate juridică, și asta se vede în pagină.",
  stareaLead:
    "Dosarul de înmatriculare este în lucru. Până se încheie, firma nu are cod fiscal, număr de registru, sediu declarat sau telefon, iar acolo unde ar trebui să fie, site-ul scrie că lipsesc.",

  numeleEticheta: "Numele",
  numeleTitlu: "Scan, Store, Solve: trei verbe, în ordinea în care se întâmplă.",
  numeleLead:
    "Cele trei verbe sunt lucrurile care se fac cu un document, de la cutia din subsol până la răspunsul de pe telefon. Fiecare are în spate un furnizor cu nume, iar împărțirea de mai sus spune care pe care.",

  limiteEticheta: "Limite",
  limiteTitlu: "Ce nu putem susține, scris de noi, primii.",
  limiteLead:
    "Într-o achiziție publică, afirmația nesusținută costă mai mult decât tăcerea. Prima listă adună lucrurile care lipsesc de pe site fiindcă nu le putem dovedi; a doua este ce punem în loc.",

  /**
   * Banda inchisa: faptele atribuite firmei-mama. `BandaIncredere` cere perechi titlu-text,
   * iar `MOSTENIT` din `src/content/despre.ts` e o lista de siruri - deci aici stau NUMAI
   * etichetele, cate una pentru fiecare rand, in aceeasi ordine. Textele raman cele din
   * `despre.ts`, verbatim: pagina le imperecheaza la randare, si asa nu exista nicaieri o a
   * doua copie a lor care sa poata diverge. Proba masoara ca lungimile coincid.
   */
  bandaEticheta: "Firma-mamă",
  bandaTitlu: "Ce aparține ADRIEI, și se verifică la ea.",
  bandaEtichete: ["Vechimea", "Depozitul", "Autorizațiile", "Preluarea", "Oamenii"],
};

// ---------------------------------------------------------------------------
// /contact
// ---------------------------------------------------------------------------

/** Iconita cardului de drum. Desenul e in componenta; aici sta numai alegerea. */
export type IconitaDrum = "posta" | "telefon" | "sediu";

export const CONTACT_INTERIOR = {
  drumuriEticheta: "Drumuri",
  drumuriTitlu: "Trei drumuri, din care unul singur ajunge la noi azi.",
  drumuriLead:
    "Cardurile de mai jos se citesc din configurarea firmei, nu se scriu de mână în pagină. Unde valoarea lipsește, scrie că lipsește: nici substituent, nici datele firmei-mamă puse în locul lor.",

  mesajEticheta: "Primul mesaj",
  mesajTitlu: "Cinci rânduri de la dumneavoastră scurtează discuția cu o săptămână.",
  mesajLead:
    "Scrieți cât vreți și în ce ordine vreți. Prima listă este ce ne trebuie oricum ca să vă putem răspunde cu ceva concret din primul mesaj, în loc să cerem detalii pe încă două.",

  dateleEticheta: "Datele din mesaj",
  dateleTitlu: "Ce facem cu ce ne scrieți.",
  dateleLead:
    "Un mesaj către un furnizor de arhivare conține adesea mai mult decât un salut: numele instituției, ce se caută des, uneori un termen de control. Deci merită spus dinainte ce se întâmplă cu el.",
  dateleIntrebari: [
    "Ce se întâmplă cu mesajul pe care ni-l trimiteți?",
    "Ce nu vă cerem în primul mesaj?",
  ],
};
