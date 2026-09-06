# Imagini ilustrative - proveniență și licență

Toate fotografiile de aici sunt de pe Pexels, sub licența Pexels (folosire comercială permisă, fără
atribuire obligatorie): https://www.pexels.com/license/

| Fișier | Sursă |
|---|---|
| rafturi-*.webp | https://www.pexels.com/photo/6549926/ |
| cutii-*.webp | https://www.pexels.com/photo/4792288/ |
| dosare-*.webp | https://www.pexels.com/photo/17846111/ |
| dulapuri-*.webp | https://www.pexels.com/photo/6550460/ |
| sertare-*.webp | https://www.pexels.com/photo/9574532/ |
| maini-*.webp | https://www.pexels.com/photo/4792285/ |
| legatura-*.webp | https://www.pexels.com/photo/272980/ |

**Sunt imagini ILUSTRATIVE, nu fotografii ale depozitului de la Golești.** Se înlocuiesc cu fotografii
reale ale depozitului ADRIA în ziua în care există. Până atunci, site-ul nu afirmă nicăieri că ar fi
depozitul nostru.

## De ce s-a schimbat tot setul pe 2026-09-06

Site-ul a pornit ca o copie a primului site al fabricii și a moștenit de la el aceleași șapte
fotografii: toate cele 14 fișiere erau identice la octet cu ale lui, măsurat cu `sha256sum`. Două
site-uri care se adresează acelorași clienți nu pot arăta aceleași imagini, așa că fiecare site are
de acum cadrele lui. Cheile au rămas neschimbate - `rafturi`, `cutii`, `dosare`, `dulapuri`,
`sertare`, `maini`, `legatura` - deci nicio pagină nu s-a atins; s-au schimbat fișierele și textele
alternative din `src/content/fotografii.ts`.

## Runda a doua, tot pe 2026-09-06: trei cadre schimbate din patru marcate

După ce setul a fost privit pe planșe, patru cadre au fost marcate pentru înlocuire: `cutii` era o
scenă de curierat (plicuri și cutii de transport), `dulapuri` un dulap de atelier cu granulații de
șlefuit scrise cu creta, `legatura` bibliorafturi noi cu etichetă de magazin și cod EAN pe cotor,
iar `dosare` cel mai întunecat cadru al setului (luminanță 19 din 100, măsurată pe eșantion de
160x160 din fișierul de 1920).

Trei au fost schimbate atunci: `cutii` -> 4792288, `dulapuri` -> 3773984, `legatura` -> 272980. Al
patrulea, `dosare`, a rămas cadrul vechi (11176866) încă o rundă: înlocuitorul propus, privit la
1:1 înainte de generare, s-a dovedit un perete de manuale tipărite, cu un număr de telefon și o
însemnare comercială lizibile pe cotoare - adică ar fi mutat defectul dintr-o parte în alta, nu
l-ar fi reparat.

## Runda a treia, tot pe 2026-09-06: ultimele două cadre

Au mai rămas două de închis, și amândouă s-au schimbat.

`dosare` -> 17846111 (dosare vechi de carton, stivuite, cu filele ieșind dintre coperți). Era cel
mai întunecat cadru al setului: luminanță 19,3 din 100 pe eșantion de 160x160 din fișierul de
1920; cadrul nou măsoară 44,3. Privit la 1:1 înainte de generare: nicio față, niciun logo, niciun
cod de bare. Poartă un formular tipărit necompletat pe coperta de sus („Name / Address / Subject /
From") și o însemnare de creion pe muchia unui dosar, indescifrabilă - formularul rămâne complet în
afara fișierului de 1920, fiindcă decupajul peisaj pornește sub el.

`rafturi` -> 29533962 (rafturi pline cu dosare și volume vechi puse în picioare, culoar îngust,
adâncime de câmp mică). Vechiul cadru (7303393) nu se vedea rău la 1920, dar originalul purta la
1:1 lăzi de vin cu textul lor comercial, titluri de reviste și un cod QR.

**Corectat în runda a patra, și cadrul înlocuit:** nota de aici spunea că titlurile în chirilică
de pe cotoarele din prim-plan sunt „lizibile numai în original, la 1:1". Nu era așa. Zona a fost
mărită de 5 ori din chiar fișierul livrat de 1920, iar literele gofrate de pe un cotor se
disting una câte una. Afirmația a fost scrisă din decupaj, nu din fișierul livrat. Vezi runda a
patra, mai jos.

## Runda a patra, tot pe 2026-09-06: `rafturi`, a doua oară

Cadrul 29533962, intrat în runda a treia, a ieșit tot pentru text. Nota de atunci spunea că
titlurile în chirilică se citesc „numai în original, la 1:1"; măsurat din nou, un nume de autor
gofrat pe un cotor din primul plan se citește **și în fișierul livrat de 1920**, iar textul
alternativ le zicea „dosare" unor volume legate. Sunt două lucruri diferite și amândouă greșite:
o urmă de text lizibilă într-un fișier care ajunge la vizitator, și o descriere care nu se
potrivea cu obiectul.

`rafturi` -> 6549926: o sală de catalog, cu două șiruri lungi de dulapuri de lemn cu sertare
mici, culoar central, un sertar tras afară cu fișele în el. Sursa are 5856x3904, adică exact 3:2,
deci fișierul de 1920 este cadrul întreg, fără decupaj. Privit înainte de generare la 1200 px și
la 1:1 pe zonele cu text: nicio față, niciun logo, niciun cod de bare, niciun nume de firmă.

Ce poartă totuși cadrul, scris aici pentru că e o urmă de text, nu pentru că ar fi o marcă:

- **numere de inventar ștanțate vertical pe picioarele metalice** ale suporturilor, numai cifre.
  Sunt marcaje de inventar al mobilierului. **Corectat în runda a cincea:** rândul de aici spunea
  că în fișierul de 1920, mărită de 6 ori, zona e „o pată închisă fără contur: nu se mai citesc".
  Nu e adevărat, și afirmația nu fusese măsurată pe fișierul livrat. Ce se măsoară: banda de
  glife ocupă rândurile 998-1081 din `rafturi-1920.webp`, adică 84 px, pe un picior aflat în
  umbră (fundalul piciorului are nivelul 27 de gri, glifele coboară la 5); la mărire se disting
  șapte-opt semne separate, iar primul de jos este un zero închis. În `rafturi-960.webp` aceeași
  bandă cade la 78-88% din înălțime, piciorul stă pe podeaua luminoasă, iar primele trei cifre
  de jos se citesc. Detaliul complet, pe amândouă fișierele, în inventarul din runda a cincea.
- **cartonașe de etichetă** în suporturile sertarelor: cele din planul apropiat, estompate de
  adâncimea mică de câmp, au pe ele urme cenușii de literă tipărită; nu s-a putut descifra niciun
  cuvânt la 1:1 în original.
- în fundul sălii, dincolo de un geam, **un afiș sau un cotor mare** din care se vede o formă
  roșiatică ce seamănă cu două litere. La 1:1 în original nu se descifrează, iar în fișierul de
  1920 ocupă în jur de 15 px.

Setul măsura atunci: luminanță între 39,0 (`dulapuri`) și 76,7 (`sertare`), saturație între 10,8
(`rafturi`) și 27,3 (`cutii`) - niciun cadru sub 30 la luminanță, niciunul peste 50 la saturație.
(Cifrele de acum, după schimbarea lui `dulapuri`, sunt în secțiunea rundei a cincea.)
Cadrul care a ieșit măsura 48,2 și 16,0; cel care intră, 46,6 și 10,8.

**Cum se măsoară, ca să nu iasă altă cifră data viitoare.** „Eșantion de 160x160" înseamnă
**întregul fișier de 1920 redus la 160x160** (Pillow, LANCZOS), apoi media pe pixeli a lui `L` și
`S` din `colorsys.rgb_to_hls`, înmulțite cu 100. NU înseamnă un decupaj de 160x160 din mijlocul
fișierului: pe același set, decupajul din mijloc dă `dulapuri` saturație 85,5 în loc de 19,6 și
`maini` luminanță 27,4 în loc de 60,3, adică ar aprinde de două ori praguri care nu sunt depășite.
Metoda a fost aleasă rulând amândouă variantele pe cele șase cadre nemodificate: miniatura
reproduce cifră cu cifră valorile scrise mai sus, 6 din 6; decupajul din mijloc, niciuna.

Proveniența celor șapte a fost verificată din nou după schimbare, în afara probei de unitate, cum
cere nota din `tests/fotografii.test.ts`: semnătura de 32x32 în tonuri de gri a fiecărui `-1920`
s-a comparat cu toate cele șapte surse re-descărcate. Pentru fiecare cadru, cea mai apropiată sursă
este cea declarată în tabelul de mai sus, 7 din 7. La sursa portret rămasă (`dosare`) comparația
s-a făcut pe fereastra decupată, nu pe cadrul întreg. Distanța la sursa proprie este între 0,00005
și 0,00029, față de cel puțin 1,47 la oricare alta.

<!-- Dovada unicității, măsurată pe 2026-09-06 pe arborele acestei felii.

     `ALT` e rădăcina celuilalt site, oriunde e clonată local - de aceea nu e scrisă aici o
     cale fixă. Comanda tipărește și câte sume s-au citit de fiecare parte, fiindcă varianta
     scurtă MINTE: pe o cale greșită `sha256sum` eșuează pe stderr, `comm` primește o listă
     goală, conducta tipărește chiar `0` și iese cu cod 0 - adică exact răspunsul „bun", fără
     să se fi comparat nimic. Reprodus pe 2026-09-06: cod=0, ieșire 0, deci vechea formă de
     aici dădea cifra promisă fără să compare nimic. Un rând care nu arată 14 de fiecare parte
     invalidează cifra de dedesubt.

       ALT=../celalalt-site
       sha256sum public/img/*.webp | cut -c1-64 | sort > /tmp/aici.txt
       ( cd "$ALT" && sha256sum public/img/*.webp | cut -c1-64 | sort ) > /tmp/acolo.txt
       wc -l < /tmp/aici.txt ; wc -l < /tmp/acolo.txt  # trebuie 14 și 14
       comm -12 /tmp/aici.txt /tmp/acolo.txt | wc -l   # sume comune

     Măsurat din nou pe 2026-09-06, după runda a patra: 14 fișiere aici, 14 dincolo, 0 sume
     comune. Control pozitiv, aceeași comandă cu celălalt site contra lui însuși: 14 din 14 -
     adică măsurătoarea chiar ar fi văzut coincidențele dacă existau.

     A doua direcție, contra versiunii de pe `main` a acestei felii, fiindcă nici un cadru
     vechi al site-ului nu are voie să supraviețuiască sub același nume:

       for f in $(cd public/img && ls *.webp); do
         git show "main:public/img/$f" | sha256sum | cut -c1-64
       done | sort > /tmp/main.txt
       wc -l < /tmp/main.txt                          # trebuie 14
       comm -12 /tmp/aici.txt /tmp/main.txt | wc -l   # sume comune

     Măsurat: 14 sume citite din `main`, 0 comune cu arborele de aici. Control pozitiv, aceeași
     comandă cu `main` contra lui însuși: 14 din 14.

     A treia direcție, adăugată în runda a patra, fiindcă `0 comune` de mai sus nu spune care
     fișiere s-au schimbat ÎN runda asta - ar fi ieșit `0` și dacă nu se schimba nimic acum.
     **Rescrisă în runda a cincea, fiindcă forma de atunci era falsă din clipa commit-ului:**
     era scrisă contra lui `HEAD`, iar după commit `HEAD` E chiar arborele ăsta, deci comanda
     rulată literal dă 14 din 14, nu 12. Se scrie contra COMMIT-ULUI DINAINTEA schimbării, cu
     SHA fix, ca să rămână adevărată și mâine:

       for f in $(cd public/img && ls *.webp); do
         git show "3543da5:public/img/$f" | sha256sum | cut -c1-64
       done | sort > /tmp/inainte.txt
       wc -l < /tmp/inainte.txt                            # trebuie 14
       comm -12 /tmp/aici.txt /tmp/inainte.txt | wc -l     # sume comune

     Așteptat: exact `2 x (7 - câte cadre s-au schimbat în rundă)`. Măsurat pe 2026-09-06, cu
     un singur cadru schimbat (`dulapuri`): 14 sume citite din `3543da5`, 12 comune - adică
     cele șase cadre neatinse, și amândouă fișierele lui `dulapuri` noi. -->

## Cele două mărimi

Fiecare fotografie are o variantă de 1920 px lățime, pentru ecran lat, și una de 960 px, servită
sub 768 px. Niciuna nu e mărită: toate cele șapte surse au fost re-descărcate de pe Pexels și
măsurate cu Pillow pe 2026-09-06, după schimbarea lui `dulapuri`. Măsurat, sursă cu sursă:
`rafturi` 5856x3904, `cutii` 6016x4016, `dosare` 3016x4021, `dulapuri` 3685x5527, `sertare`
5599x3733, `maini` 5487x3663, `legatura` 4928x3264. Cea mai îngustă are 3016 px (`dosare`), cea
mai lată 6016 px (`cutii`) - fiecare peste 1920 cu marjă.

Varianta de 1920 este PEISAJ 3:2 la toate șapte. La cele cinci surse peisaj ea păstrează
proporția originalului; `rafturi` (5856x3904) este exact 3:2, deci acolo nu se taie nimic.
Rămân DOUĂ surse portret, și din amândouă se taie o fereastră peisaj pe toată lățimea sursei:

- `dosare` (3016x4021), rândurile 804-2815 din 4021. Abaterea e măsurată, nu o preferință:
  păstrându-i proporția, fișierul ar fi ieșit 1920x2560, cu 281 KB la aceeași calitate 81, adică
  peste plafonul de 250 KB, și ar fi avut de trei ori mai mulți pixeli decât cardul de 555x340 în
  care intră. Fereastra e așezată ca să lase afară formularul tipărit de pe coperta de sus.
- `dulapuri` (3685x5527, exact 2:3), rândurile 1720-4177 din 5527. Aici motivul nu e mărimea, ci
  conținutul: partea de sus a originalului arată, dincolo de un perete de sticlă, o frescă mare
  cu figuri pictate și cu text în chirilică pe pergamentele din ea. Fereastra pornește sub ea,
  deci fresca nu ajunge în niciun fișier livrat.

Variantele de 960 sunt toate PORTRET, 960x1440 (2:3), fiindcă un peisaj întins cu `object-cover`
pe un telefon ținut vertical se mărește de peste o dată și un sfert și se înmoaie. Toate sunt
decupaje din originalul de la aceeași adresă, sub aceeași licență, cu fereastra așezată pe
subiect. La cele cinci surse peisaj fereastra se taie pe toată înălțimea sursei și alege lățimea:
`sertare` ia mâna și sertarul deschis din stânga cadrului, `maini` mâinile și mapa, `cutii`
evantaiul de separatoare din mijlocul cutiei (fereastra 1912-4589 din 6016), `legatura` capătul cu
spirale al teancului (760-2936 din 4928), iar `rafturi` șirul din stânga, cu sertarul tras afară
(0-2603 din 5856) - s-a ales șirul, nu culoarul din mijloc, fiindcă banda pe care o arată cardul
de telefon ar fi căzut acolo pe peretele gri și pe podea. La sursele portret e invers, fiindcă
acolo înălțimea e cea din belșug: `dosare` se taie pe toată înălțimea și pierde doar 335 px de
lățime (fereastra 167-2848 din 3016), iar `dulapuri` ia un dreptunghi de 2400x3600 din colțul din
dreapta-jos (1285-3685 pe lățime, 1620-5220 pe înălțime). Sursa lui `dulapuri` e exact 2:3, deci
cadrul întreg ar fi încăput fără nicio tăiere - dar atunci fresca ar fi intrat în fișier, așa că
fereastra e strânsă deliberat pe peretele de sertare.

Generate cu Pillow, calitate WebP 81, `method=6`; niciun fișier nu trece de 250 KB, cel mai greu
este `dulapuri-1920.webp` cu 189 KB.

## Runda a cincea, tot pe 2026-09-06: `dulapuri`, și inventarul urmelor de text

Un singur cadru schimbat. Fișetele metalice (3773984) purtau pe ușa din dreapta-sus o plăcuță
gofrată de producător - o pictogramă plus un semn verbal de două cuvinte - iar plăcuța se vede în
AMÂNDOUĂ fișierele livrate, nu doar în original. Regula pe care o încalcă e cea de la începutul
fișierului: nicio marcă lizibilă într-un fișier care ajunge la vizitator.

`dulapuri` -> 6550460: un perete lung de dulapuri de lemn deschis, cu zeci de sertare mici de
catalog unul peste altul, fiecare cu suportul lui metalic de etichetă, văzut oblic de-a lungul
sălii. Privit înainte de generare la 1200 px și la 1:1 pe zonele cu text: nicio față de om, niciun
logo, niciun cod de bare, niciun nume de firmă. Ce ARE originalul și nu intră în fișierele
livrate: în partea de sus, dincolo de un perete de sticlă, o frescă mare cu figuri pictate ținând
pergamente cu text în chirilică - la 1:1 în original literele se disting una câte una. Fereastra
fișierului de 1920 pornește sub ea, iar decupajul de 960 e luat din colțul din dreapta-jos, deci
fresca nu apare în niciunul.

**Măsurătoarea de luminanță și saturație a setului, după schimbare** (metoda e cea scrisă la runda
a patra: întregul fișier de 1920 redus la 160x160 cu LANCZOS, apoi media pe pixeli a lui `L` și
`S` din `colorsys.rgb_to_hls`, x100):

| cheie | luminanță | saturație |
|---|---|---|
| rafturi | 46,6 | 10,8 |
| cutii | 44,5 | 27,3 |
| dosare | 44,3 | 16,0 |
| dulapuri | 55,5 | 12,4 |
| sertare | 76,7 | 18,8 |
| maini | 60,3 | 24,6 |
| legatura | 56,8 | 21,4 |

Niciun cadru sub 30 la luminanță, niciunul peste 50 la saturație. Cadrul care a ieșit măsura 39,0
și 19,6; cel care intră, 55,5 și 12,4.

**Proveniența re-verificată după schimbare**, în afara probei de unitate: semnătura de 32x32 în
tonuri de gri a fiecărui `-1920` (media scăzută, împărțită la 128) s-a comparat cu toate cele
șapte surse re-descărcate, iar la cele două surse portret comparația s-a făcut pe fereastra
decupată, nu pe cadrul întreg. Pentru fiecare cadru, cea mai apropiată sursă este cea declarată în
tabelul de sus, 7 din 7. Distanța pătratică medie la sursa proprie este între 0,00001 și 0,00002,
față de cel puțin 0,0897 la oricare alta.

### Inventarul urmelor de text, pe AMÂNDOUĂ fișierele livrate

Refăcut în runda a cincea. Motivul: până acum urmele se descriau pe fișierul de 1920, iar `-960`
nici nu era privit - deși el e fișierul servit pe telefon, iar decupajul lui schimbă scara. Nu
există o regulă simplă „960 mărește cu 12%": depinde de cât de strânsă e fereastra. Măsurat, în
pixeli de sursă pe pixel de fișier: la `rafturi` decupajul de 960 arată sursa cu 12,5% mai mare
decât cel de 1920 (0,369 față de 0,328), iar la `dulapuri` cu 23% mai MIC (0,400 față de 0,521).
Deci fiecare cadru se privește pe amândouă.

**Metoda.** Fiecare zonă suspectă a fost decupată din fișierul livrat și mărită de 6 ori cu
LANCZOS. La zonele unde nici așa nu se decidea (numerele de pe picioarele lui `rafturi`, eticheta
cu numărul sertarului la `dulapuri`) s-a mers la 10-24x, cu rotire și autocontrast, ca să nu
scape cifre scrise pe verticală. Se scrie ce SE DISTINGE și ce NU, nu ce știu eu din original.
Unde am citit un cuvânt după ce văzusem originalul la 1:1, o spun.

| cheie | în `-1920` | în `-960` |
|---|---|---|
| rafturi | numere de inventar ștanțate vertical pe un picior metalic: bandă de 84 px (rândurile 998-1081), pe fond aflat în umbră; se disting șapte-opt semne separate, primul de jos e un zero închis, restul nu se identifică. Cartonașele din suporturile sertarelor: pete cenușii, nicio literă. În fundul sălii, dincolo de un geam, o formă roșiatică de vreo 15 px: nu se descifrează. | aceeași bandă de cifre, la 78-88% din înălțime, cu piciorul pe podeaua luminoasă: primele trei cifre de jos se citesc (`016...`). Cartonașele, la fel, fără literă. Banda de cifre cade în afara ferestrei cardului de telefon la `pozitie` 35% (fereastra 19,4-64,0%), dar este în fișier. |
| cutii | nicio urmă de text. Separatoarele de carton și foliile sunt goale. | nicio urmă de text. |
| dosare | însemnare de mână cu creionul pe cotorul unui dosar: la 5x se disting patru-cinci litere cursive, cuvântul nu se descifrează. Formularul tipărit de pe coperta de sus NU e în fișier - decupajul peisaj pornește sub el. | formularul tipărit de pe coperta de sus ESTE în fișier, la 0-6,2% din înălțime, și se citește cuvânt cu cuvânt chiar la 3x: `Name`, `Address`, `Subject`, cu rândurile de completat GOALE. Sunt cuvinte generice de formular, nu un nume de firmă și nicio dată completată. **Lăsat deliberat:** la `pozitie` 50% fereastra cardului de telefon începe la 27,7%, deci nu-l prinde. Plus aceeași însemnare de creion. |
| dulapuri | cartonașele din suporturile sertarelor: la 6x sunt linii cenușii ondulate, nicio literă nu se distinge. Etichetele mici cu numărul sertarului, lipite pe muchie: dreptunghiuri de vreo 15x10 px; la 6x cu LANCZOS se citesc cele patru cifre (`1340` și vecinele) - sunt numere de sertar, nu marcă și nu text de firmă; rămân. Un cartonaș alb ridicat deasupra dulapurilor, sus în cadru: intră doar vârful lui, o linie subțire. | aceleași cartonașe de etichetă, tot fără literă; etichetele cu numărul sertarului se citesc la 4x (cinci etichete, câte patru cifre) - numere de sertar, nu marcă. Cartonașul alb ridicat intră întreg și poartă o singură literă desenată cu contur, un `P`/`Р` - o literă, fără cuvânt. Măsurate la reconcilierea lotului, după ce criticul rundei a cincea a contrazis afirmațiile „nu se identifică nicio cifră". |
| sertare | nicio urmă de text. Suportul metalic de etichetă de pe sertarul de jos este GOL. | nicio urmă de text. |
| maini | pe o coală albă dintre despărțitoare, o linie subțire de cerneală și un grup de două-trei semne întunecate: la 6x nu se identifică nicio literă. | aceeași zonă, la fel: semne, nicio literă. |
| legatura | nicio urmă de text. Se văd numai muchiile filelor și spiralele. | nicio urmă de text. |

Ce rămâne nemăsurat, scris ca atare: nu am rulat OCR pe fișiere, deci „nu se distinge nicio
literă" înseamnă ce am văzut privind mărirea, nu un rezultat de recunoaștere automată. Și pentru
`dulapuri`, unde am văzut originalul la 1:1 înainte de a decupa, nu pot demonta complet ce știu
deja - de aceea la eticheta cu numărul sertarului am scris și ce scrie în original, și că din
fișier nu se poate citi.
