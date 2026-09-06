# Imagini ilustrative - proveniență și licență

Toate fotografiile de aici sunt de pe Pexels, sub licența Pexels (folosire comercială permisă, fără
atribuire obligatorie): https://www.pexels.com/license/

| Fișier | Sursă |
|---|---|
| rafturi-*.webp | https://www.pexels.com/photo/6549926/ |
| cutii-*.webp | https://www.pexels.com/photo/4792288/ |
| dosare-*.webp | https://www.pexels.com/photo/17846111/ |
| dulapuri-*.webp | https://www.pexels.com/photo/3773984/ |
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

- **numere de inventar ștanțate vertical pe picioarele metalice** ale suporturilor, numai cifre
  (de tipul `0163...`). Se citesc în original, la 1:1. În fișierul de 1920 aceeași zonă a fost
  mărită de 6 ori și cifrele sunt o pată închisă fără contur: nu se mai citesc. Sunt marcaje de
  inventar al mobilierului, din aceeași familie cu ușile numerotate din `dulapuri`.
- **cartonașe de etichetă** în suporturile sertarelor: cele din planul apropiat, estompate de
  adâncimea mică de câmp, au pe ele urme cenușii de literă tipărită; nu s-a putut descifra niciun
  cuvânt la 1:1 în original.
- în fundul sălii, dincolo de un geam, **un afiș sau un cotor mare** din care se vede o formă
  roșiatică ce seamănă cu două litere. La 1:1 în original nu se descifrează, iar în fișierul de
  1920 ocupă în jur de 15 px.

Setul măsoară acum: luminanță între 39,0 (`dulapuri`) și 76,7 (`sertare`), saturație între 10,8
(`rafturi`) și 27,3 (`cutii`) - niciun cadru sub 30 la luminanță, niciunul peste 50 la saturație.
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
     fișiere s-au schimbat ÎN runda asta - ar fi ieșit `0` și dacă nu se schimba nimic acum:
     aceeași comandă cu `HEAD` în loc de `main` trebuie să dea exact `2 x (7 - câte cadre s-au
     schimbat)` sume comune. Măsurat, cu un singur cadru schimbat: 12 din 14 comune cu `HEAD`,
     adică cele șase cadre neatinse, și amândouă fișierele lui `rafturi` noi. -->

## Cele două mărimi

Fiecare fotografie are o variantă de 1920 px lățime, pentru ecran lat, și una de 960 px, servită
sub 768 px. Niciuna nu e mărită: toate cele șapte surse au fost re-descărcate de pe Pexels și
măsurate cu Pillow pe 2026-09-06, iar cea mai îngustă are 3016 px lățime (`dosare`), cea mai lată
6042 px (`dulapuri`) - fiecare peste 1920 cu marjă.

Varianta de 1920 este PEISAJ 3:2 la toate șapte. La cele șase surse peisaj ea păstrează proporția
originalului; `rafturi` (5856x3904) este exact 3:2, deci acolo nu se taie nimic. Rămâne o singură
sursă portret, `dosare` (3016x4021), din care se taie o fereastră peisaj pe toată lățimea sursei,
și asta e o abatere măsurată, nu o preferință: păstrându-i proporția, fișierul ar fi ieșit
1920x2560, cu 281 KB la aceeași calitate 81, adică peste plafonul de 250 KB, și ar fi avut de trei
ori mai mulți pixeli decât cardul de 555x340 în care intră. Fereastra: rândurile 804-2815 din 4021,
alese ca să lase afară formularul tipărit de pe coperta de sus.

Variantele de 960 sunt toate PORTRET, 960x1440 (2:3), fiindcă un peisaj întins cu `object-cover` pe
un telefon ținut vertical se mărește de peste o dată și un sfert și se înmoaie. Toate sunt decupaje
din originalul de la aceeași adresă, sub aceeași licență, cu fereastra așezată pe subiect. La cele
șase surse peisaj fereastra se taie pe toată înălțimea sursei și alege lățimea: `sertare` ia mâna
și sertarul deschis din stânga cadrului, `maini` mâinile și mapa, `cutii` evantaiul de separatoare
din mijlocul cutiei (fereastra 1912-4589 din 6016), `dulapuri` ușa din mijloc, cu eticheta și
cartonașul ei (1706-4386 din 6042), `legatura` capătul cu spirale al teancului (760-2936 din 4928),
iar `rafturi` șirul din stânga, cu sertarul tras afară (0-2603 din 5856) - s-a ales șirul, nu
culoarul din mijloc, fiindcă banda pe care o arată cardul de telefon ar fi căzut acolo pe peretele
gri și pe podea. La sursa portret e invers, fiindcă acolo înălțimea e cea din belșug: `dosare` se
taie pe toată înălțimea și pierde doar 335 px de lățime (fereastra 167-2848 din 3016).

Generate cu Pillow, calitate WebP 81, `method=6`; niciun fișier nu trece de 250 KB, cel mai greu
este `rafturi-1920.webp` cu 160 KB.
