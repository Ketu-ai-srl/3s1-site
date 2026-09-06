# Direcția vizuală 3S

Fundal alb și ceață, un singur violet care duce acțiunea, o singură familie de literă,
titluri cu literă obișnuită și punct la final, fotografia în card cu colțuri. Un ecran spune
un singur lucru și are un singur buton principal.

Regulile de mai jos sunt cele mecanizate: `tests/directia.test.ts` le măsoară pe sursă, în
sub o secundă, iar porțile de browser le măsoară pe pagina construită. Nu sunt preferințe.

## Paleta

Paleta are paisprezece roluri. Lista e închisă: o culoare în plus înseamnă un rol pe care nu
l-a numit nimeni, iar rolurile nenumite se aleg după gust, nu după măsurătoare. Proba refuză
un jeton `--color-*` care nu e în listă.

| Rol | Valoare | Unde se folosește |
|---|---|---|
| `violet` | `#673de6` | acțiunea principală, banda CTA, accentul din titluri |
| `violet-2` | `#7b66ff` | contur de buton, hover, capătul deschis al gradientului |
| `violet-clar` | `#9d99ff` | literă mică pe fundal închis, iconițe |
| `violet-pal` | `#e6e8ff` | pastile, suprafața la trecerea cu mausul |
| `violet-adanc` | `#251951` | capătul de sus al gradientului eroului |
| `noapte-v` | `#110c29` | banda de încredere, capătul de jos al gradientului |
| `cerneala` | `#18181a` | titluri și text principal |
| `cerneala-2` | `#58585e` | text secundar, legături de subsol |
| `cerneala-3` | `#6c6c72` | note și etichete mici |
| `alb` | `#ffffff` | fundalul implicit al site-ului |
| `ceata` | `#f5f5f6` | secțiunile alternative, subsolul, cardurile pe alb |
| `ceata-2` | `#f8f9fa` | cardul așezat pe o secțiune de ceață |
| `linie` | `#e9e9ec` | separatoare și chenare |
| `succes` | `#009e5b` | bifa din liste (icoană, nu literă) |

**Contrastul, calculat din valorile de mai sus** cu raportul de luminanță WCAG. Scriptul e la
finalul acestui document; cifrele sunt scrise aici ca să nu se remăsoare la fiecare
componentă.

    cerneala    pe alb 17,73:1   pe ceata 16,27:1
    cerneala-2  pe alb  7,06:1   pe ceata  6,48:1   pe ceata-2 6,70:1
    cerneala-3  pe alb  5,22:1   pe ceata  4,79:1   pe ceata-2 4,95:1
    violet      pe alb  6,20:1   pe ceata  5,69:1   pe violet-pal 5,12:1
    violet-2    pe alb  4,05:1
    alb         pe violet 6,20:1   pe violet-adanc 15,71:1   pe noapte-v 18,95:1
    violet-clar pe violet-adanc 6,31:1   pe noapte-v 7,61:1
    succes      pe alb  3,48:1

Regulile care decurg, și fiecare are o probă:

- toate cele trei cerneli trec pragul pe toate cele trei suprafețe deschise, iar proba nu o
  ia pe încredere: citește valorile din `globals.css` și calculează raportul;
- `violet-2` nu scrie literă pe deschis: 4,05:1 e sub pragul de 4,5:1;
- pe gradientul eroului se scrie `alb` sau `violet-clar`, și nimic altceva;
- `succes` desenează bifa, nu poartă informație: 3,48:1 nu e culoare de text.

**`cerneala-3` e mai închisă decât în referință, și e o abatere măsurată.** Referința o dă la
`#797980` și o leagă de o condiție: numai pe alb, și numai de la 18,66 px în sus sau la
greutatea 600. Condiția nu se poate impune aici, fiindcă șapte pagini din `src/app` o scriu
la 15,5 px și sunt ale valului următor. Măsurat cu `axe` pe arborele construit, la 1280 px:
4,32:1, adică `serious` pe /accesibilitate, /arhivare-fizica, /comparatie, /cum-functioneaza,
/investitia, /securitate și /solutii - șapte pagini roșii dintr-o singură culoare. Reparația
îngustă e valoarea, nu regula scrisă în proză și nu poarta: `#6c6c72` dă 5,22 pe alb și 4,79
pe ceață. **O regulă care spune „doar peste 18,66 px" nu se aplică singură; o valoare care
trece se aplică singură peste tot.**

### Contrastul pe gradient se măsoară pe captură

Gradientul eroului nu e o culoare, deci tabelul de mai sus nu îl acoperă. Se măsoară pe
captură, cu litera făcută **transparentă**, ca pixelii citiți să fie fundalul, nu amestecul
lui cu litera. Dreptunghiurile sunt cele strânse pe text, luate din pagina randată, iar
culoarea literei vine din stilul calculat.

Măsurat pe pagina de start, la 1440 și la 390 px (`innerWidth` citit din pagină: 1440 și
390), minimul pe pixeli:

    eticheta 14 px / 600, violet-clar    1440: mediu 5,89  minim 5,37
                                          390: mediu 5,94  minim 5,36
    titlu 72 / 36 px, alb                1440: mediu 16,36 minim 13,88
                                          390: mediu 15,91 minim 13,91
    paragraf 16 px, alb                  1440: mediu 17,95 minim 17,65
    rândul de garanție 14 px, violet-clar 1440: mediu 7,43 minim 7,38
    legăturile barei 14 px, alb          1440: mediu 14,04 minim 13,73

**Măsurătoarea are nevoie de un control, și aici a fost nevoie de două.** Prima rulare a dat
1,59 minim pe legăturile barei, adică un defect grav pe o bară care stă pe violet-adânc.
Cauza: legăturile au `transition-colors duration-200`, deci captura luată imediat după ce
litera a fost făcută transparentă a prins glifa încă aproape albă și a măsurat-o drept
fundal. Se opresc tranzițiile și animațiile în același bloc de stil, și se așteaptă 400 ms.
A doua oară, toate blocurile au ieșit exact 21,00 - valoarea martorului - fiindcă serverul
care servea capturile era pornit înaintea reconstruirii și livra o pagină fără foaia de
stil: numele fișierului CSS se schimbase. Semnul care a dat-o de gol: culoarea legăturilor
era `rgb(0, 0, 238)`, albastrul implicit al browserului. **Serverul se repornește după
fiecare build, iar culoarea calculată se citește, nu se presupune.**

O fotografie nouă, un titlu mai înalt sau o mutare a luminii din gradient cer remăsurarea.
Lumina radială din erou stă la 0,22 opacitate tocmai din măsurătoare: la 0,38 eticheta de
14 px cobora la 4,50 minim, adică fix pe pragul de 4,5:1. Un prag așezat pe punctul de eșec
e necrolog, nu avertisment.

## Litera

O singură familie: **DM Sans**, încărcată prin `next/font/google`, cu greutățile **400 și
600**. 700 nu se încarcă: titlurile nu sunt bold. Jetoanele moștenite `font-afis`,
`font-vitrina` și `font-mono` arată toate către aceeași variabilă, deci un nume vechi rămas
într-o componentă nu poate strecura o a doua familie.

Scara, măsurată pe referință, la 1440 și la 390:

| Rol | 1440 | 390 | Jeton |
|---|---|---|---|
| titlu erou (h1) | 72 / 80 px | 36 / 44 px | `text-titlu-1` |
| titlu de secțiune | 48 / 56 px | 24 / 32 px | `text-titlu-2` |
| titlu de bloc | 36 / 44 px | 28 px | `text-titlu-3` |
| titlu de card | 24 / 32 px | - | `text-titlu-4` |
| subtitlu de card | 20 / 28 px | - | `text-subtitlu` |
| corp | 16 / 24 px | 16 / 24 px | `text-corp` |
| notă, etichetă, rând juridic | 14 / 20 px | 14 / 20 px | `text-nota` |

Titlurile stau la greutatea 400, cu `letter-spacing: -0.005em`, literă obișnuită și punct la
final. Înălțimea de rând e cel puțin **1,069 em** pe toate treptele, și e un prag măsurat, nu
un gust: pe fontul real, virgula lui Ș coboară 0,180 em sub linia de bază, iar Â/Î urcă
0,889 em. Pragul se păstrează deși titlurile nu mai sunt cu majuscule - nu costă nimic, iar o
regulă relaxată fiindcă „azi nu mai avem majuscule" se strică la primul titlu cu majuscule.

Titlul se rupe unde vrea autorul, cu o rupere de rând explicită. Un `h1` pe pagină, fără
sărituri de nivel. O etichetă de deasupra titlului nu e paragraf: se scrie `span`, niciodată
`p` - poarta S-17 compară textul randat cu cel citit fără JavaScript și cântărește
paragrafele adevărate.

## Forme

Raze: **8 px** butoane, **12 px** carduri mici și casete de intrare, **16 px** carduri mari
și imagini în card, **24 px** cardurile mari de erou, **999 px** pastile (file, etichete de
stare, butonul din bară).

**Umbre: aproape deloc.** Cardurile se despart prin culoare de fundal - ceață pe alb, alb pe
ceață - nu prin umbră. Singurele două umbre definite sunt conturul butonului secundar, care e
umbră tocmai ca să nu miște așezarea cu un pixel față de butonul plin de lângă el, și
elementul plutitor. Pe card static nu se scrie `shadow-`, iar proba o refuză.

Containerul de conținut e **1265 px** într-o fereastră de 1440. Coloana îngustă a
secțiunilor de text curat e `--container-registru`; paginile care sunt ACTE păstrează
`--container-act` (720 px), unde jgheabul cifrei plus coloana de 492 px dau un rând de 68 de
caractere în medie.

Butoanele au patru feluri, și fiecare răspunde la altă întrebare:

```tsx
<Buton href="/contact">Discuție de 30 de minute</Buton>        // primar pe fundal deschis
<Buton href="/contact" fel="alb">Discuție</Buton>              // primar pe fundal închis
<Buton href="/solutii" fel="contur">Vedeți domeniile</Buton>   // al doilea drum, cu contur
<Buton href="/despre" fel="text">Despre noi</Buton>            // al doilea drum, ca legătură
```

**Un singur buton primar pe secțiune.** `plin` și `alb` sunt amândouă primare: nu se pun două
pe același ecran, indiferent de fundal. Al doilea drum e `contur` sau `text`. Proba numără
butoanele primare pe fiecare secțiune a paginii de start și refuză a doua.

## Gramatica paginii de start

1. **Erou** pe gradient violet, centrat: etichetă de 14 px, h1 pe două rânduri, un paragraf
   de 16 px, UN buton alb, și un rând de 14 px cu iconiță sub el. **Fără fotografie** - eroul
   e culoare, iar fotografiile intră abia sub el.
2. **Rândul de carduri-imagine** care iese din banda eroului și intră peste secțiunea albă:
   patru fotografii în carduri de 16 px, cu eticheta sub fiecare.
3. **Banda albă de întrebare**: h2 de 48 px centrat, cu a doua propoziție în `violet`, și un
   paragraf de 16 px sub el.
4. **Două carduri**: unul mare cu gradient violet (pastilă, titlu, paragraf, buton alb), unul
   coloană cu două carduri pe ceață.
5. **Filele-pastilă** ale celor trei etape: fila activă e închisă cu literă albă, panoul are
   imaginea în stânga și textul în dreapta. Toate panourile sunt în HTML-ul servit, doar
   ascunse - cine citește fără JavaScript are tot textul.
6. **Grila de domenii** pe ceață, două coloane, carduri albe.
7. **Banda de încredere** pe `noapte-v`, cu faptele atribuite.
8. **Banda CTA** violetă, cu buton alb.
9. **Subsolul** pe ceață: coloane de legături de 14 px, blocul de identificare cerut de lege,
   rândul juridic de 12 px.

Ancorele paginii de start (`scan`, `store`, `solve`, `domenii`, `discutie`) rămân cu aceleași
nume: harta site-ului trimite la ele, iar o ancoră fără țintă e legătură moartă pe pagina
care există tocmai ca să arate drumurile. Primele trei sunt chiar butoanele filelor, deci
`/#store` deschide fila Store, nu doar derulează lângă ea.

## Cum se construiește o pagină interioară

Antetul e ALB și scurt: firul de navigare, eticheta, titlul de 48 px, o linie, butonul violet
și, în dreapta, fotografia într-un card cu raza de 16 px.

```tsx
import AntetPagina from "@/components/AntetPagina";
import ListaBifa from "@/components/ListaBifa";
import { FOTOGRAFII } from "@/content/fotografii";

export const metadata = { alternates: { canonical: "/arhivare-fizica" } };

export default function Pagina() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/arhivare-fizica"
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Arhivare fizică" }]}
        eticheta="Depozit și preluare"
        titlu="Hârtia stă pe raft, cu cotă."
        lead="O linie, sub 40 de cuvinte, care spune ce găsește omul pe pagina asta."
        actiune={{ href: "/contact", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/cum-functioneaza", text: "Vedeți mecanismul" }}
        imagine={FOTOGRAFII.rafturi}
      />

      <ListaBifa titlu="Ce aducem" elemente={["Cutii", "Etichete", "Proces-verbal"]} />
    </main>
  );
}
```

`titlu` primește și noduri, nu doar șiruri, deci ruperea de rând se scrie acolo unde o vreți.
`forma="banda"` scurtează antetul paginilor care sunt documente sau unelte. Fotografia vine
din registrul `src/content/fotografii.ts`, cu textul alternativ scris acolo o singură dată.

Componentele de pagină moștenite (`PaginaDeSegment`, `Fisa*`, `Juridic*`, `Mecanism*`,
`Termene*`, `Comparatie*`) au fost **retintuite mecanic** la felia de fundație: li s-a
schimbat paleta și greutatea literei, nu așezarea. Notele lor lungi descriu direcția
anterioară, cu măsurătorile ei pe fundal închis, și fiecare fișier o spune în primele rânduri.
Gramatica lor se rescrie la valul următor.

## Ce nu se face

- **Fotografie pe tot ecranul.** Fotografia stă în card, cu colțuri, și nu poartă text peste
  ea. Așa dispare tot mecanismul de voal: nu mai există contrast peste imagine, adică exact
  cazul pe care `axe` îl marchează „needs review" și îl lasă în afara verdictului.
- **Majuscule pe titluri.** Nici din CSS, nici scrise în text. Titlul e o propoziție.
- **Umbre pe carduri.** Separarea se face cu culoarea de fundal.
- **Al doilea buton primar** în aceeași secțiune.
- **Culori din direcția anterioară**, nici măcar definite „pentru orice eventualitate": o
  culoare definită și nefolosită e gaura prin care direcția veche supraviețuiește tăcut.
- **Emoji, gradiente decorative, grilă de fișe identice cu icoane, numere mari de ornament.**
- **Sigilii despre propria noastră rigoare**, de felul unei date de verificare tipărite în
  subsol.

Conținutul nu se inventează și nu se pierde. Fiecare afirmație verificabilă are o intrare în
`src/content/afirmatii/`, iar ce nu putem susține rămâne scris ca atare. Cifre, certificări
sau clienți nu se adaugă. Ce se taie din pagină se taie și din registrul ei.

## Reziduurile paletei vechi - inventar MĂSURAT

Felia 1 a schimbat paleta, dar nu a rescris toate paginile interioare. Clasele Tailwind rămase
sunt **șiruri**, nu identificatori: `typecheck`, `lint` și `build` nu le văd, iar `axe` nu le
vede nici el atunci când elementul rămâne lizibil din alt motiv (o legătură subliniată
satisface 1.4.1 chiar dacă și-a pierdut culoarea). Degradarea e tăcută, deci inventarul se
face cu o comandă, nu din memorie.

Lista se reface din **diferența** dintre culorile paletei vechi și cele de acum, nu dintr-o
listă scrisă de mână. Baza de comparație este `be2893c`, ultimul commit cu paleta veche
(părintele lui `b47d24a`, „Fundația vizuală REF-V"), scrisă explicit: prima versiune a
comenzii compara cu `main`, iar din clipa în care `main` a primit paleta nouă (lotul
`s1-a`, 06.09) diferența ieșea goală, alternarea din regex devenea `-()` și expresia
potrivea orice `text-`/`bg-` - trei agenți au raportat, independent, 97-110 „apariții"
false. De aceea comanda refuză să continue cu o listă goală:

```bash
git show be2893c:src/app/globals.css | grep -oP '^\s*--color-\K[a-z0-9-]+' | sort -u > /tmp/culori_vechi
grep -oP '^\s*--color-\K[a-z0-9-]+' src/app/globals.css | sort -u > /tmp/culori_head
ALT=$(comm -23 /tmp/culori_vechi /tmp/culori_head | paste -sd'|')
test -n "$ALT" || { echo "lista de roluri dispărute e goală: baza e greșită"; exit 1; }
grep -rnoP "\b(bg|text|border|from|to|via|ring|fill|stroke|decoration|outline|divide|placeholder|caret|accent)-($ALT)(?![-a-zA-Z0-9])" src/
```

**Măsurat la reconcilierea lotului `s1-b` (06.09):** 28 de roluri dispărute, **0 apariții**
în `src/`, cu control pozitiv fabricat la rulare (un șir cu `text-hartie-veche-2` și
`border-linie-suprafata`: 2 prinse) și controlul negativ de mai jos (`bg-noapte-v`: 0).
Proba `tests/directia.test.ts` ține cifra la 0 pe tot `src/` de la același lot.

**Măsurat la felia 1** (starea de plecare a paginilor interioare): 28 de roluri de culoare
dispărute, **52 de apariții** în `src/`, din care **44 în cod viu** și 8 în comentarii.

| Fișier | Clase vii |
|---|---|
| `src/app/instrumente/termene-de-pastrare/page.tsx` | 12 |
| `src/app/harta-site/page.tsx` | 8 |
| `src/content/termene.ts` | 6 |
| `src/app/not-found.tsx` | 6 |
| `src/app/solutii/page.tsx` | 4 |
| `src/app/despre/page.tsx` | 4 |
| `src/app/contact/page.tsx` | 4 |

Cele 8 din comentarii, care descriu mecanisme pe culori care nu mai există și trebuie
rescrise odată cu fișierul: `TermeneFisa.tsx` (3), `JuridicPagina.tsx` (2), `CadruScan.tsx`,
`ComparatieTabel.tsx`, `SecuritateIntrebare.tsx` (câte unul).

Jetoanele moarte, după frecvență: `text-hartie-veche-2` (12), `text-arama-clar` (10),
`border-linie-suprafata` (8), `text-hartie-veche-3` (3), `border-linie-noapte` (2), apoi câte
unul din `text-verde`, `text-tus-2`, `text-hartie-veche`, `text-arama-inchis`,
`bg-verde-moale`, `bg-noapte`, `bg-linie-suprafata`, `bg-hartie-2`, `bg-arama-moale`.

**Controlul regexului**, obligatoriu înainte de a te încrede în cifră: `bg-noapte-v` de pe
`BandaIncredere.tsx` este un jeton **valid** din paleta nouă și NU trebuie să apară în listă -
de asta expresia se termină cu `(?![-a-zA-Z0-9])`. Fără el, orice `-v`, `-2`, `-clar` lipit de
un nume mort ar fi numărat greșit.

## Scriptul de contrast

Cifrele din acest document se pot reface. Raportul de luminanță WCAG, din valorile paletei:

```python
def canal(v):
    v = v / 255.0
    return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4

def luminanta(rgb):
    r, g, b = rgb
    return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)

def contrast(a, b):
    la, lb = luminanta(a), luminanta(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)
```

Pe gradient se măsoară pe captură: se citesc dreptunghiurile strânse pe text și culoarea
calculată a fiecărui bloc, se opresc tranzițiile și animațiile, se face litera transparentă,
se așteaptă, se face captura, apoi se calculează contrastul pe fiecare pixel de sub literă.
Lângă rezultat se pune întotdeauna un martor cu răspuns cunoscut - alb pe negru, care trebuie
să dea 21,00 - și se verifică pe pagină o culoare pe care o cunoașteți dinainte, ca să se
vadă dacă foaia de stil chiar s-a aplicat.
