// Continutul celor doua pagini ale feliei de securitate: `/securitate` si
// `/accesibilitate`.
//
// De ce stau amandoua aici, intr-un singur fisier: sunt doua declaratii despre acelasi
// lucru - ce am masurat si ce nu -, se recitesc impreuna inainte de publicare, iar textul
// e singurul lucru pe care il va parcurge clientul. Forma paginilor sta in `page.tsx`,
// componenta proprie in `src/components/SecuritateIntrebare.tsx`.
//
// REGULA DE CONTINUT A ACESTEI FELII, mai stricta decat pe restul site-ului, si scrisa
// aici fiindca e usor de incalcat din reflex la o pagina de securitate:
//
//   1. ZERO detalii de infrastructura. Nu scriem ce criptare exista, unde stau serverele,
//      ce copii de siguranta se fac, cine are acces administrativ sau ce jurnale raman.
//      Platforma pe care ruleaza cautarea in documente nu e scrisa de noi si nimeni nu
//      ne-a confirmat nimic in scris. O pagina de securitate care insira asemenea
//      detalii pe baza a ce s-a spus intr-o discutie e exact genul de afirmatie care
//      cade la prima intrebare a unui serviciu juridic.
//   2. ZERO certificari. Nu detinem niciuna si nu ne prezentam ca si cum am avea;
//      `poarta-afirmatii.py` masoara asta la fiecare lot.
//   3. Ce NU stim se scrie ca INTREBARE DESCHISA, in pagina, la vedere - nu se omite.
//      Coloana asta e argumentul paginii, nu scuza ei.
//
// Ce PUTEM afirma despre partea digitala e strict ce masoara portile la fiecare lot:
// site-ul acesta nu incarca nimic de la alt domeniu, nu pune cookie-uri, nu scrie in
// memoria browserului si nu are instrument de urmarire (poarta C-01, proba de browser
// `tests/browser/consimtamant.spec.ts`), iar formularul de cerere nu are inca destinatar.
//
// Fiecare afirmatie verificabila de mai jos are o intrare in
// `src/content/afirmatii/securitate.json`, cu stare `neconfirmat`.
//
// VOCE (rescris 2026-09-06): propozitii scurte, concluzia intai. Nicio afirmatie noua
// despre infrastructura - regula 1 de mai sus s-a aplicat si la rescriere.

/** Un rand de fisa: intrebarea sau termenul pe stanga, raspunsul pe dreapta. */
export type Fisa = {
  titlu: string;
  text: string;
};

/** O etapa din drumul unui fond, cu documentul care ramane dupa ea. */
export type Etapa = {
  titlu: string;
  text: string;
  /** Urma scrisa. Fara ea, etapa e o promisiune verbala. */
  urma: string;
};

/** O intrebare la care NU avem inca raspuns scris, plus miza ei. */
export type IntrebareDeschisa = {
  intrebare: string;
  deCeConteaza: string;
  /** Starea de azi, scrisa scurt. Se schimba numai cand vine raspunsul, cu sursa. */
  stare: string;
};

// ---------------------------------------------------------------------------
// /securitate
// ---------------------------------------------------------------------------

export const SECURITATE = {
  titluMeta: "Cum sunt protejate documentele",
  descriereMeta:
    "Depozitul și accesul în el, transportul, cotele și inventarul, cine vede ce document și pe ce bază, ieșirea din contract, eliminarea cu aviz.",
  eticheta: "Protecția fondului",
  h1: "O cutie pusă greșit pe raft este tot o pierdere de date.",
  // Sub 40 de cuvinte, regula directiei. Ce spunea fraza veche despre cine vede ce document
  // si despre incetarea contractului sta in liniile sectiunilor III si IV, iar impartirea partii
  // digitale in masurat si nemasurat sta in linia sectiunii V. Nimic nu s-a pierdut.
  lead:
    "Lanțul întreg prin care trece un document la noi: depozitul și cine ajunge în el, transportul și predarea, cota după care se cere din raft, ieșirea din contract. Partea digitală vine la final.",

  // --- I. depozitul -------------------------------------------------------
  depozit: [
    {
      titlu: "Fondul are un loc, iar locul este scris.",
      text: "Fondul fiecărei instituții stă separat, cu cota lui și cu inventarul lui. Nu se amestecă nici la depozitare, nici la căutare. Poziția fiecărei unități intră în evidența depozitului, legată de cota din inventar: dosarul se găsește după o adresă scrisă, nu după memoria unui om care s-ar putea să nu mai lucreze aici peste doi ani.",
    },
    {
      titlu: "În spațiul de depozitare nu se intră neînsoțit.",
      text: "Accesul îl are personalul care lucrează efectiv pe fonduri. O vizită, a dumneavoastră sau a unui auditor pe care îl trimiteți, se face însoțit și anunțat din timp. Regula și lista persoanelor cu acces se scriu în contract, nu pe site: o listă de nume publicată îmbătrânește tăcut și rămâne acolo după ce omul a plecat.",
    },
    {
      titlu: "Ce iese din raft lasă o fișă.",
      text: "Scoaterea unei unități arhivistice se face pe cotă, cu fișă de ieșire, iar intrările în depozit se țin într-o evidență. Regula este aceeași pentru personalul nostru. Dacă un dosar lipsește din raft, există un rând care spune cine l-a luat, când și pentru ce cerere.",
    },
    {
      titlu: "Condițiile se văd pe teren, nu se declară pe pagină.",
      text: "Temperatură, umiditate, protecție împotriva focului și a apei, felul rafturilor, spațiul de manipulare. O pagină care le descrie în cuvinte frumoase nu dovedește nimic. Le vedeți la depozitul de la Golești, în ziua vizitei, așa cum sunt atunci.",
    },
  ] as Fisa[],

  notaDepozit:
    "Nu publicăm planul depozitului, lista persoanelor cu acces și nici descrierea sistemelor de protecție. Un document care spune unde sunt punctele slabe ale unui depozit ajută în primul rând pe cine le caută. Le arătăm la vizită și le scriem în contract, unde au și un destinatar, și o răspundere.",

  // --- II. drumul ---------------------------------------------------------
  drum: [
    {
      titlu: "Numărăm înainte să plece ceva.",
      text: "Documentele se așază în cutii de arhivă, se numerotează și se sigilează de față cu persoana pe care o desemnați. Ce lipsește sau este deteriorat se consemnează în ziua aceea, cât timp lipsa mai poate fi explicată de cineva care era acolo.",
      urma: "Lista cutiilor, cu numerotarea și cu observațiile de stare, anexată la procesul-verbal.",
    },
    {
      titlu: "Din clipa semnării, fondul are un custode cu nume.",
      text: "Procesul-verbal de predare-primire spune ce pleacă, în câte cutii, câți metri liniari și pe ce ani. Dumneavoastră aveți hârtia care o dovedește. Fără ea, o discuție de peste un an despre un dosar care lipsește nu are pe ce să se sprijine.",
      urma: "Proces-verbal de predare-primire, în două exemplare semnate.",
    },
    {
      titlu: "Transportul îl facem noi.",
      text: "Nu predăm arhiva unui serviciu de curierat și nu împărțim un lot între două curse decât dacă scrie așa în procesul-verbal. Un colet rătăcit se caută. Un dosar rătăcit nu se mai reface, iar răspunderea pentru el rămâne a creatorului documentelor, adică a dumneavoastră.",
      urma: "Cursa și lotul transportat, notate în procesul-verbal al preluării.",
    },
    {
      titlu: "Originalul se întoarce tot pe hârtie, când îl cereți.",
      text: "Unitatea arhivistică iese pe cotă și se predă cu fișă. Copia digitală nu înlocuiește originalul acolo unde legea sau instanța cere hârtia, iar traseul rămâne scris în ambele sensuri.",
      urma: "Fișă de ieșire și, la întoarcere, consemnarea repunerii în raft.",
    },
  ] as Etapa[],

  // --- III. cine vede ce --------------------------------------------------
  acces: [
    {
      titlu: "Lista de persoane o faceți dumneavoastră.",
      text: "Cine are voie să ceară documente din fondul dumneavoastră se stabilește nominal, de dumneavoastră, și se schimbă tot în scris. Nu adăugăm pe nimeni la cerere verbală, nici dacă persoana lucrează la instituția dumneavoastră și o cunoaștem.",
    },
    {
      titlu: "Cererea se face pe fondul dumneavoastră, nu pe subiect.",
      text: "Un solicitant vede documentele fondului pentru care este trecut pe listă. Nu există căutare care traversează fondurile mai multor clienți: separarea din raft se păstrează și în partea digitală.",
    },
    {
      titlu: "Personalul nostru intră sub aceeași regulă.",
      text: "Arhivarul care manipulează fondul lucrează pe cote, cu fișă, și este ținut de o obligație de confidențialitate asumată în scris. Nu poate scoate un dosar în afara procedurii doar fiindcă are cheia depozitului.",
    },
    {
      titlu: "Împuternicirea se semnează, nu se subînțelege.",
      text: "Dosarele de personal, statele de salarii și documentele medicale conțin date cu caracter personal. Prelucrarea lor de către noi, ca persoană împuternicită, se scrie în anexa la contract și se semnează odată cu el. Dacă anexa lipsește dintr-o ofertă pe care o primiți, de la noi sau de la altcineva, cereți-o înainte de semnătură.",
    },
  ] as Fisa[],

  // --- IV. iesirea --------------------------------------------------------
  iesire: [
    {
      titlu: "La încetarea contractului, fondul se întoarce cu inventar.",
      text: "Plecarea este parte din serviciu, nu o situație neprevăzută. Fondul se restituie pe baza aceluiași inventar cu care a fost preluat, cu proces-verbal de restituire. Termenul și cine suportă transportul se scriu în contract înainte de prima cutie ridicată.",
    },
    {
      titlu: "Ce se întâmplă cu copiile digitale se scrie în contract.",
      text: "Rândul acesta nu se lasă gol: ce primiți, în ce format și ce rămâne sau nu rămâne la noi după încetare se hotărăsc la semnare. O firmă care nu vrea să scrie ce se întâmplă la ieșire vă spune ceva important despre cum va arăta ieșirea.",
    },
    {
      titlu: "Eliminarea nu este decizia firmei de arhivare.",
      text: "Documentele care au împlinit termenul de păstrare se elimină prin comisia de selecționare a instituției dumneavoastră și cu avizul Arhivelor Naționale. Noi pregătim lucrarea și întocmim documentația. Decizia și avizul rămân unde le pune legea, iar până la aviz nu se elimină nimic.",
    },
    {
      titlu: "Urma rămâne și după eliminare.",
      text: "Documentele avizate se scot din evidența fondului și se distrug astfel încât conținutul să nu mai poată fi reconstituit, cu proces-verbal de eliminare. În evidență rămâne ce a fost eliminat și pe baza cărui aviz. Răspunsul la un control nu depinde de cine își mai amintește.",
    },
  ] as Fisa[],

  notaIesire:
    "Eliminarea fără avizul Arhivelor Naționale încalcă Legea Arhivelor Naționale nr. 16/1996, iar răspunderea rămâne a creatorului documentelor. Dacă cineva vă promite eliminare rapidă și fără hârtii, cereți-i să vă arate cu ce document rămâneți în fața unui control.",

  // --- V. partea digitala -------------------------------------------------
  masurat: [
    "Site-ul acesta nu încarcă nimic de la alt domeniu: nici fonturi, nici hărți, nici statistici, nici butoane sociale",
    "Nu pune cookie-uri și nu scrie nimic în memoria locală sau de sesiune a browserului dumneavoastră",
    "Nu există instrument de măsurare a traficului, nici al nostru, nici al altcuiva",
    "Un browser automat deschide fiecare pagină publică înainte de publicare și cere ca listele de cookie-uri, de chei locale și de domenii străine să fie goale, atât fără nicio interacțiune, cât și după apăsarea butoanelor din pagină",
    "Verificarea are martorii ei: o pagină fabricată anume, cu defectul înăuntru, pe care trebuie să o respingă, și una curată, pe care trebuie să o accepte",
    "Formularul de cerere nu are încă destinatar: ce scrieți în el rămâne în pagină, nu pleacă niciun mesaj și nu se salvează nimic",
  ],

  intrebariDeschise: [
    {
      intrebare: "Unde stau, fizic, copiile digitale ale documentelor?",
      deCeConteaza:
        "O instituție publică trebuie să știe în ce țară ajung datele înainte să semneze, iar răspunsul intră în anexa de prelucrare, nu în discuție.",
      stare: "fără răspuns scris",
    },
    {
      intrebare: "Cum sunt protejate copiile la transport și la păstrare?",
      deCeConteaza:
        "Este prima întrebare a oricărui serviciu juridic. Un răspuns dat din memorie, fără document de la furnizorul platformei, nu rezistă la a doua întrebare.",
      stare: "fără răspuns scris",
    },
    {
      intrebare: "Ce copii de siguranță există, cât se păstrează și a fost probată vreodată o restaurare?",
      deCeConteaza:
        "O copie de siguranță din care nu s-a restaurat niciodată nimic este o presupunere, nu o măsură de protecție.",
      stare: "fără răspuns scris",
    },
    {
      intrebare: "Cine are acces administrativ la platformă și ce jurnal rămâne după fiecare acces?",
      deCeConteaza:
        "În depozit, ce iese din raft lasă o fișă. Nu putem afirma că partea digitală are echivalentul ei cât timp nu am văzut cum arată.",
      stare: "fără răspuns scris",
    },
    {
      intrebare: "Ce se întâmplă cu copiile digitale în ziua în care contractul încetează?",
      deCeConteaza:
        "Restituirea hârtiei are proces-verbal. Pentru partea digitală, procedura echivalentă trebuie scrisă înainte, nu descoperită la ieșire.",
      stare: "se scrie în contract, procedura furnizorului nu ne-a fost confirmată",
    },
    {
      intrebare: "A fost supusă platforma unei testări de securitate independente?",
      deCeConteaza:
        "Fără un raport pe care să îl putem arăta, orice afirmație despre rezistența platformei este o părere despre munca altcuiva.",
      stare: "nu avem un raport de arătat",
    },
  ] as IntrebareDeschisa[],

  notaDigital:
    "Întrebările de mai sus sunt scrise ca întrebări fiindcă platforma pe care rulează căutarea nu este scrisă de noi. Despre infrastructura altcuiva nu afirmăm nimic pe baza unei discuții. Le cerem în scris, de la furnizor. Când primim răspunsurile, rândurile trec în coloana măsurată, cu sursa lângă ele. Până atunci rămân aici, unde le citiți înainte să ne întrebați.",

  nuDetinem: [
    "Nu deținem nicio certificare de securitate a informației și nu ne prezentăm ca și cum am avea",
    "Nu dăm o cifră de disponibilitate a serviciului: nu am măsurat-o pe un fond real de client",
    "Nu descriem măsuri tehnice ale platformei pe care nu le-am văzut documentate",
    "Nu dăm nicio instituție ca referință pentru felul în care i-am păstrat arhiva, fiindcă 3S este o firmă nouă",
  ],

  incheiere: {
    titlu: "Veniți cu lista dumneavoastră de întrebări, inclusiv cele de mai sus.",
    text: "La discuția de treizeci de minute aduceți cerințele de securitate ale instituției dumneavoastră, așa cum le formulează serviciul juridic sau auditorul intern. La cele la care avem răspuns, răspundem pe loc. La restul spunem de la cine cerem răspunsul și în cât timp îl aducem.",
  },
};

// ---------------------------------------------------------------------------
// /accesibilitate
// ---------------------------------------------------------------------------
//
// Ce se poate AFIRMA aici e strict ce ruleaza mecanic la fiecare lot, in
// `tests/browser/accesibilitate.spec.ts`, `tests/browser/derapaj.spec.ts` si
// `tests/browser/html-brut.spec.ts`. Ce NU se poate afirma e conformitatea cu un nivel
// WCAG: nimeni nu a facut un audit, iar verificarea automata acopera o parte din
// criterii, nu pe toate. Distinctia asta e continutul paginii, nu o nota de subsol.

export const ACCESIBILITATE = {
  titluMeta: "Declarația de accesibilitate",
  descriereMeta:
    "Ce se măsoară mecanic la fiecare livrare a site-ului, ce nu a fost măsurat niciodată și cum ne semnalați o problemă de accesibilitate pe care ați întâlnit-o.",
  eticheta: "Accesibilitate",
  h1: "Ce am măsurat din accesibilitatea site-ului, și ce nu.",
  // Sub 40 de cuvinte. Fraza despre felul in care se scriu de obicei declaratiile de
  // accesibilitate sta in linia sectiunii II, unde e chiar argumentul ei, iar cuprinsul
  // paginii il dau titlurile sectiunilor. Nimic nu s-a pierdut.
  lead:
    "O listă de măsurători. Verificările de mai jos rulează automat pe fiecare pagină publică înainte de fiecare publicare, iar dacă una se înroșește, versiunea aceea nu ajunge la dumneavoastră.",

  masurat: [
    {
      titlu: "Un motor de verificare deschide fiecare pagină.",
      text: "Evaluează regulile de accesibilitate pe care le poate judeca o mașină. Pragul cerut este zero încălcări de gravitate mare, adică nicio problemă serioasă sau critică. Ce apare la gravitate mică se tipărește în raport și se citește, dar nu oprește publicarea.",
    },
    {
      titlu: "Contrastul textului trece de 4,5 la 1.",
      text: "Aceeași verificare măsoară contrastul dintre text și fundal și cere cel puțin atât pentru textul de dimensiune normală. Culorile au fost alese pornind de la prag, iar perechile care nu îl treceau s-au schimbat înainte de publicare. Verificarea judecă perechi de culori; textul așezat peste o fotografie nu intră în ea, iar rândul acela stă mai jos, la nemăsurat.",
    },
    {
      titlu: "Pe un ecran de 390 de puncte nu apare derapaj.",
      text: "Fiecare pagină este deschisă la lățimea unui telefon obișnuit și se cere să nu existe nimic care să vă oblige să trageți pagina lateral ca să citiți un rând. Verificarea a și schimbat site-ul, nu doar l-a confirmat: bara de sus a rămas cu puține intrări fiindcă altfel depășea lățimea măsurată.",
    },
    {
      titlu: "Paginile se citesc fără JavaScript.",
      text: "Conținutul fiecărei pagini există în documentul livrat de server, deci se citește și când scripturile sunt oprite, blocate sau nu se încarcă. Nu există text care să apară abia după rularea unui script.",
    },
    {
      titlu: "Prima legătură duce direct la conținut.",
      text: "Cine navighează de la tastatură nu trece prin bara de sus la fiecare pagină; legătura devine vizibilă în clipa în care ajunge pe ea focalizarea. Automat se verifică doar că ținta ei există pe fiecare pagină publică. Cât de bine se simte la folosire nu am măsurat, iar rândul acela stă mai jos.",
    },
    {
      titlu: "Fiecare verificare are martorii ei.",
      text: "O pagină fabricată anume, cu defectul înăuntru, pe care trebuie să o respingă, și una corectă, pe care trebuie să o accepte. Fără martori, o verificare care nu găsește nimic nu dovedește că pagina este bună, ci doar că verificarea tace.",
    },
  ] as Fisa[],

  neMasurat: [
    "Nu declarăm conformitatea cu un nivel dintr-un standard de accesibilitate: nu s-a făcut niciun audit al site-ului, nici de noi, nici de altcineva",
    "Contrastul textului așezat peste fotografie nu este judecat de verificarea automată: motorul îl marchează drept nesigur și îl lasă în afara verdictului, fiindcă nu poate ști ce pixel ajunge sub fiecare literă. Îl măsurăm noi, pe captura paginii, cu literele ascunse, deci cifra aceea vine de la noi și nu oprește singură o publicare",
    "Verificarea automată acoperă o parte din criteriile de accesibilitate, nu pe toate; multe se pot judeca numai de un om",
    "Nu am parcurs site-ul cu un cititor de ecran real, pe tot fluxul, și nu putem spune cum sună",
    "Nu am parcurs site-ul exclusiv de la tastatură, pagină cu pagină, ca probă separată",
    "Nu l-am dat spre încercare niciunei persoane cu dizabilități, deci nu avem nicio observație venită din folosire reală",
    "Nu există versiune în limbaj simplificat, nici variantă audio a textelor",
    "Nu invocăm aici niciun act normativ: nu am stabilit care obligații de accesibilitate ni se aplică, iar o trimitere nesigură la o lege este mai rea decât lipsa ei",
  ],

  semnalare: [
    {
      titlu: "Scrieți-ne pe adresa de poștă electronică.",
      text: "Cea de pe pagina de contact. Nu avem încă un formular dedicat pentru semnalările de accesibilitate și nu pretindem că avem: adresa aceea este citită, un formular fără destinatar nu ar fi.",
    },
    {
      titlu: "Ce ne ajută să scrieți",
      text: "Adresa paginii, ce încercați să faceți acolo și cu ce citiți pagina, dacă vă este comod să ne spuneți: browserul, cititorul de ecran, mărimea textului. O propoziție despre ce nu a mers ne ajută mai mult decât un raport tehnic.",
    },
    {
      titlu: "Reparăm și adăugăm o verificare.",
      text: "Răspundem la mesaj, iar dacă problema ține de site, o reparăm și, unde se poate, punem o verificare automată care să o prindă dacă revine. Nu promitem un termen, fiindcă nu am măsurat unul. Promitem răspuns.",
    },
    {
      titlu: "Dacă răspunsul nostru nu vă mulțumește, spuneți-ne direct.",
      text: "În același fir. Nu vă trimitem către o procedură de reclamație pe care nu am pus-o încă la punct, ca să nu vă plimbăm pe un drum care nu duce nicăieri.",
    },
  ] as Fisa[],

  incheiere: {
    titlu: "Declarația se schimbă atunci când se schimbă măsurătoarea.",
    text: "Rândurile din coloana nemăsurată nu sunt un plan de intenții: fiecare trece la măsurat în ziua în care apare verificarea care îl susține, nici o zi mai devreme. Dacă între timp întâlniți ceva ce nu funcționează pentru dumneavoastră, scrieți-ne. Este singura măsurătoare pe care nu o putem face singuri.",
  },
};
