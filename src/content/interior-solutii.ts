// Textele de INTERFATA ale paginilor de solutii, mecanism si securitate (valul S1-b).
//
// DE CE EXISTA FISIERUL. Gramatica paginii interioare REF-V cere lucruri pe care continutul
// nu le avea: etichete de file-pastila, titluri de grila, textul legaturii cu sageata,
// titlurile benzilor. Ele nu sunt fapte despre client si nu au ce cauta in `segmente.ts`,
// `mecanism.ts` sau `securitate.ts`, care sunt INGHETATE ca text si ca chei in valul asta.
//
// Aici s-a mutat si proza care statea SCRISA DE MANA in `PaginaDeSegment.tsx` si in cele
// patru pagini: titluri si linii de sectiune, notele de sub liste, paragraful care trimite
// la mecanism. Nu s-a pierdut niciun rand - s-a mutat din componenta in continut, unde se
// citeste intr-un singur loc si nu se duplica de sapte ori.
//
// VOCE: propozitii scurte, litera obisnuita, punct la final la PROPOZITII. Etichetele de
// fila si titlurile de lista NU poarta punct - o eticheta cu punct e agramata, si a fost
// defect reparat in S1-a. Adresarea e „dumneavoastra".

/** O fila-pastila de navigare in pagina: eticheta vizibila si ancora catre sectiune. */
export type Ancora = {
  ancora: string;
  eticheta: string;
};

/** Titlul si linia unei sectiuni. Titlul e propozitie, deci are punct; eticheta nu are. */
export type CapSectiune = {
  eticheta: string;
  titlu: string;
  lead?: string;
};

// Cele trei fapte care nu tin de domeniu se scriu deja in `INDIFERENT_DE_DOMENIU`
// (segmente.ts). Randul de incredere de sub antet le arata SCURT, deci foloseste titlurile
// lor; banda de dedesubt arata altceva, ca sa nu se repete acelasi text pe aceeasi pagina.

export const SEGMENT = {
  /** Filele de navigare in pagina. Ordinea lor e ordinea sectiunilor de mai jos. */
  navigare: [
    { ancora: "situatia", eticheta: "Situația" },
    { ancora: "schimbare", eticheta: "Ce se schimbă" },
    { ancora: "dovada", eticheta: "Dovada" },
    { ancora: "temei", eticheta: "Temeiul legal" },
    { ancora: "intrebari", eticheta: "Întrebări" },
  ] as Ancora[],

  situatia: {
    eticheta: "Situația de azi",
    titlu: "Ce se întâmplă acum, înainte să schimbăm ceva.",
  } as CapSectiune,

  // Invitatia la corectie sta SUB carduri, nu inaintea lor: e o reactie la ce tocmai s-a
  // citit. Textul e cel scris in directia anterioara, mutat aici din componenta.
  situatiaNota:
    "Scriem problema așa cum arată ea dintr-un birou. Dacă nu vă recunoașteți în rândurile de mai sus, spuneți-ne: înseamnă că am înțeles greșit domeniul.",

  schimbare: {
    eticheta: "Ce se schimbă",
    titlu: "Aceleași documente, alt mod de a ajunge la ele.",
    lead: "Pașii serviciului sunt aceiași peste tot. Aici scriem numai ce arată altfel în ziua de lucru a acestui domeniu.",
  } as CapSectiune,

  /** Randul text/imagine care duce la pagina de mecanism. */
  spreMecanism: {
    titlu: "Etapele sunt aceleași, în orice domeniu.",
    text: "Fiecare etapă a serviciului se închide cu documentul ei semnat. Pe pagina despre mecanism scrie ce trece în grija noastră, ce rămâne la dumneavoastră și ce hârtie vă rămâne după fiecare pas.",
    legatura: { href: "/cum-functioneaza", text: "Vedeți mecanismul, etapă cu etapă" },
  },

  dovada: {
    eticheta: "Dovada",
    lead: "Într-o relație care începe cu predarea unei arhive, afirmația nesusținută costă mai mult decât tăcerea. Punem pe masă prima listă; pe a doua o scriem tot noi, primii.",
  },

  /** Banda inchisa de sub sectiunea de dovada: ce se poate vedea inainte de semnatura. */
  bandaAratam: {
    eticheta: "Înainte de semnătură",
    titlu: "Ce vă arătăm, ca să nu ne credeți pe cuvânt.",
  },

  listaDeschise: "Ce nu putem susține încă",

  temei: {
    eticheta: "Temeiul legal",
    titlu: "Actele din care vine obligația, numite ca să le puteți citi.",
    lead: "Nu scriem un termen fără să spunem din ce act vine. Unde nu putem cita articolul, rândul rămâne gol și scriem de ce, în loc să punem o cifră care sună bine.",
  } as CapSectiune,

  etichetaTermenGol: "Termenul pe care nu îl scriem",
  etichetaTermenCerere: "Ce se aplică în locul lui",

  intrebari: {
    eticheta: "Întrebări",
    lead: "Apar în prima discuție sau în chestionarul de securitate. Le punem noi primii, ca să nu pierdeți o săptămână pe corespondență.",
  },

  // Eticheta butonului de antet. E scurta DIN MASURATOARE: forma lunga, „Programati o
  // discutie de 30 de minute", are 36 de caractere si se rupe pe doua randuri la 390 px,
  // ducand butonul la 72 px inaltime in loc de 48 cati cere REF-V.md §3. Cu textul de mai
  // jos butonul intra pe un rand si masoara 48. Cererea nu se schimba, doar numarul de
  // cuvinte: ora si durata raman scrise in el.
  butonCta: "Discuție de 30 de minute",
};

export const HUB_INTERIOR = {
  grila: {
    eticheta: "Domenii",
    titlu: "Fiecare domeniu, cu fișa lui.",
  } as CapSectiune,

  banda: {
    eticheta: "Ce nu se schimbă",
    titlu: "Aceleași reguli, în orice domeniu.",
  },

  reguliLead:
    "Restul paginii vorbește despre diferențe. Astea nu se negociază pe segment, fiindcă țin de felul în care e construit serviciul.",

  onestitate: {
    eticheta: "Ce lipsește dinadins",
    titlu: "Ce nu scriem pe nicio fișă.",
  } as CapSectiune,

  etichetaNota: "Ce nu scriem pe nicio fișă",

  // Textul blocului de onestitate. Formularea nu se atinge: fiecare afirmatie negativa isi
  // poarta negatia lipita de ea, iar poarta de afirmatii citeste fereastra dinaintea
  // potrivirii. Vechimea si autorizarea se scriu ATRIBUIT catre ADRIA, firma-mama.
  nota: "Nu deținem certificare ISO 27001, nu afișăm sigle de clienți, nu publicăm un număr de firme deservite și nu punem preț pe pagină. 3S este o firmă nouă, crescută din ADRIA Servicii Arhivare SRL, care arhivează documente din 2019. Vechimea și autorizarea sunt ale firmei-mamă și se citesc așa.",

  spreTermene: {
    titlu: "Termenul legal se verifică, nu se ține minte.",
    text: "Cât se păstrează fiecare categorie de documente, cu actul normativ din care vine termenul și cu data la care a fost citit, stă într-un tabel pe care îl puteți deschide acum.",
    legatura: { href: "/instrumente/termene-de-pastrare", text: "Verificați un termen legal" },
  },

  cta: {
    titlu: "Discuția începe de la arhiva dumneavoastră.",
    text: "Treizeci de minute în care ne uităm peste umăr la ce aveți azi: câți metri liniari, ce se cere cel mai des și ce vă cere controlul. Plecați cu o estimare a volumului și cu un calendar de preluare scris, nu cu o ofertă trimisă a doua zi pe email.",
    buton: "Cereți estimarea de volum",
  },

  // Aceeasi eticheta scurta ca pe fisele de domeniu, din acelasi motiv masurat: pe un rand
  // la 390 px, deci buton de 48 px.
  butonCta: "Discuție de 30 de minute",
};

export const MECANISM_INTERIOR = {
  navigare: [
    { ancora: "etape", eticheta: "Cele șase etape" },
    { ancora: "digitizare", eticheta: "Ce se scanează" },
    { ancora: "cautare", eticheta: "Căutarea" },
    { ancora: "dovada", eticheta: "Dovada" },
    { ancora: "hartia", eticheta: "Întrebări" },
  ] as Ancora[],

  etape: {
    eticheta: "Etapele 1-6",
    titlu: "Șase etape, fiecare cu hârtia ei.",
    lead: "Nu vă cerem încredere între etape. Fiecare se închide cu un document care spune ce s-a mutat, ce s-a numărat și cine răspunde de fondul dumneavoastră. Unde un pas depinde de un aviz care nu este al nostru, scriem asta pe față.",
  } as CapSectiune,

  spreFizica: {
    titlu: "Primele etape se fac cu rafturi și cu mașină.",
    text: "Cum arată depozitul, cum se măsoară un fond în metri liniari și cum se elimină legal ce nu mai trebuie păstrat sunt scrise pe pagina părții fizice.",
    legatura: { href: "/arhivare-fizica", text: "Vedeți partea fizică" },
  },

  digitizare: {
    eticheta: "Ce se scanează",
    titlu: "Se digitizează ce se caută, în ordinea în care se caută.",
    lead: "Împărțirea de mai jos este punctul de plecare al discuției, nu o regulă fixă. Lista finală o hotărâți dumneavoastră, iar ea intră în contract înainte să se deschidă prima cutie.",
  } as CapSectiune,

  listaDigitizat: "Ce intră la scanat, de obicei",
  listaPeHartie: "Ce rămâne pe hârtie, cel puțin la început",
  etichetaNotaDigitizare: "Ce nu propunem din start",

  cautare: {
    eticheta: "Căutarea",
    titlu: "De la întrebarea pusă în română până la pagina pe care o citiți singur.",
    lead: "Cinci verigi, în ordine. Dacă una lipsește, lanțul se oprește acolo și nu vedeți un răspuns pe care nu îl putem susține cu un document.",
  } as CapSectiune,

  listaNuFace: "Ce nu face căutarea",

  dovada: {
    eticheta: "Dovada",
    titlu: "Ce puteți verifica, și ce nu putem susține încă.",
    lead: "Prima listă se poate vedea înainte de semnătură. Pe a doua o scriem tot noi, primii, fiindcă o afirmație nesusținută costă mai mult decât tăcerea.",
  } as CapSectiune,

  bandaAratam: {
    eticheta: "Înainte de semnătură",
    titlu: "Ce vă arătăm, ca să nu ne credeți pe cuvânt.",
  },

  listaDeschise: "Ce nu putem susține încă",

  hartia: {
    eticheta: "Hârtia",
    titlu: "Întrebările care apar când documentul iese din mâna dumneavoastră.",
    lead: "Sunt întrebările pe care le pune un serviciu juridic sau un auditor intern. Le punem noi primii, cu răspunsul scris, ca să nu pierdeți o săptămână pe corespondență.",
  } as CapSectiune,

  butonCta: "Discuție de 30 de minute",
};

export const FIZICA_INTERIOR = {
  navigare: [
    { ancora: "depozit", eticheta: "Depozitul" },
    { ancora: "preluare", eticheta: "Preluarea" },
    { ancora: "inventar", eticheta: "Cuvintele" },
    { ancora: "selectionare", eticheta: "Selecționarea" },
    { ancora: "temei", eticheta: "Temeiul legal" },
  ] as Ancora[],

  depozit: {
    eticheta: "Depozitul",
    titlu: "Hârtia stă într-un loc care are adresă și poartă.",
    lead: "Un depozit se judecă după ce se vede la fața locului, deci vizita este primul lucru pe care îl propunem, nu ultimul.",
  } as CapSectiune,

  preluare: {
    eticheta: "Preluarea",
    titlu: "Cum pleacă arhiva de la dumneavoastră, în patru pași.",
    lead: "Numărătoarea de la început decide tot ce urmează. Un fond preluat pe ochi se plătește mai târziu, când cineva caută un dosar despre care nimeni nu mai poate spune dacă a plecat vreodată din instituție.",
  } as CapSectiune,

  spreMecanism: {
    titlu: "Partea fizică este jumătatea din față a mecanismului.",
    text: "După ce fondul ajunge pe raft cu cotă, urmează ce se scanează, cum se întreabă în română și ce se întâmplă la încheierea contractului. Mecanismul întreg, cap la cap, stă pe pagina lui.",
    legatura: { href: "/cum-functioneaza", text: "Vedeți mecanismul complet" },
  },

  inventar: {
    eticheta: "Inventarul",
    titlu: "Cinci cuvinte pe care le veți auzi la fiecare discuție.",
    lead: "Sunt cuvintele din contract, din procesul-verbal și din discuția cu Arhivele Naționale. Le scriem aici ca să nu semnați nimic pe baza unei aproximări.",
  } as CapSectiune,

  selectionare: {
    eticheta: "Selecționarea",
    titlu: "Eliminarea documentelor este o procedură, cu comisie și cu aviz.",
    lead: "Este partea în care o scurtătură costă cel mai mult, fiindcă răspunderea rămâne la instituția care a creat documentele. Ordinea de mai jos nu se schimbă și nu se scurtează.",
  } as CapSectiune,

  etichetaNotaSelectionare: "Fără aviz nu se elimină nimic",

  temei: {
    eticheta: "Temeiul legal",
    titlu: "Actele din care vine obligația, numite ca să le puteți citi.",
    lead: "Nu scriem o obligație fără să spunem din ce act vine. Unde nu putem cita articolul, rândul rămâne gol și scriem de ce, în loc să punem o trimitere care sună bine.",
  } as CapSectiune,

  etichetaNotaTemei: "Ce nu scriem aici",

  bandaAratam: {
    eticheta: "La o vizită anunțată",
    titlu: "Ce se vede cu ochii, într-o oră.",
  },

  listaDeschise: "Ce nu putem susține încă",

  butonCta: "Discuție de 30 de minute",
};

export const SECURITATE_INTERIOR = {
  navigare: [
    { ancora: "depozit", eticheta: "Depozitul" },
    { ancora: "drum", eticheta: "Drumul" },
    { ancora: "acces", eticheta: "Accesul" },
    { ancora: "iesire", eticheta: "Ieșirea" },
    { ancora: "digital", eticheta: "Partea digitală" },
    { ancora: "intrebari", eticheta: "Întrebări deschise" },
  ] as Ancora[],

  depozit: {
    eticheta: "Depozitul",
    titlu: "Unde stă hârtia și cine ajunge la ea.",
    lead: "Riscul care mută un dosar din locul lui rareori vine dintr-o rețea. Vine dintr-un raft greșit, dintr-o cutie deschisă fără fișă și dintr-o cheie care circulă.",
  } as CapSectiune,

  etichetaNotaDepozit: "Ce nu publicăm, dinadins",

  spreFizica: {
    titlu: "Depozitul se vede, nu se descrie.",
    text: "Cum arată, cum se măsoară un fond în metri liniari și ce înseamnă cota unei unități arhivistice sunt scrise pe pagina părții fizice, cu tot cu ce vă arătăm la o vizită.",
    legatura: { href: "/arhivare-fizica", text: "Vedeți depozitul și inventarul" },
  },

  drum: {
    eticheta: "Drumul",
    titlu: "Mutarea este momentul în care se pierde arhiva, nu depozitul.",
    lead: "Un lot împărțit între două curse, o cutie nenumărată, o predare fără hârtie: de aici vin discuțiile de peste un an despre un dosar care lipsește. Fiecare pas se închide cu un document semnat, iar documentul rămâne la dumneavoastră.",
  } as CapSectiune,

  acces: {
    eticheta: "Accesul",
    titlu: "Cine vede ce document, și pe ce bază.",
    lead: "Un depozit bine păzit din care oricine poate cere orice dosar nu păzește nimic. Regula de acces se scrie nominal, se schimbă în scris și se aplică la fel personalului nostru.",
  } as CapSectiune,

  iesire: {
    eticheta: "Ieșirea",
    titlu: "Ce se întâmplă când plecați, și când un document nu mai trebuie păstrat.",
    lead: "Sunt cele două momente în care un fond poate dispărea legal, deci exact cele două care se scriu înainte, nu la nevoie. Unul ține de contract, celălalt de o comisie și de un aviz care nu sunt ale noastre.",
  } as CapSectiune,

  etichetaNotaIesire: "Temeiul",

  digital: {
    eticheta: "Partea digitală",
    titlu: "Ce am măsurat pe site, și ce nu scriem despre noi.",
    lead: "Prima listă se măsoară automat înainte de fiecare publicare, iar dacă o verificare se înroșește, versiunea aceea nu ajunge la dumneavoastră.",
  } as CapSectiune,

  listaMasurat: "Ce se măsoară la fiecare publicare",

  bandaNuDetinem: {
    eticheta: "Lista scurtă",
    titlu: "Ce nu scriem despre noi, fiindcă nu putem dovedi.",
  },

  intrebari: {
    eticheta: "Ce nu putem susține încă",
    titlu: "Șase întrebări la care încă nu avem răspuns în scris.",
    lead: "Căutarea în documente rulează pe o platformă care nu este scrisă de noi. Despre infrastructura altcuiva nu afirmăm nimic pe baza a ce s-a spus într-o discuție, deci întrebările stau aici, formulate așa cum le pune un serviciu juridic.",
  } as CapSectiune,

  etichetaNotaDigital: "De ce sunt scrise ca întrebări",
  etichetaStare: "Stare",

  butonCta: "Discuție de 30 de minute",
};

/** Nota de contact, aceeasi pe paginile feliei. Nu se rescrie de patru ori. */
export const NOTA_CONTACT = {
  inainte: "Scrieți-ne și direct, dacă preferați: ",
  adresa: "contact@3s.ro",
  dupa: ". Nu afișăm număr de telefon: solicitările intră prin formular sau prin poștă electronică, ca să rămână o urmă scrisă a cererii dumneavoastră și a răspunsului nostru.",
};
