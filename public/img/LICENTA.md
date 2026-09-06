# Imagini ilustrative - proveniență și licență

Toate fotografiile de aici sunt de pe Pexels, sub licența Pexels (folosire comercială permisă, fără
atribuire obligatorie): https://www.pexels.com/license/

| Fișier | Sursă |
|---|---|
| rafturi-*.webp | https://www.pexels.com/photo/7303393/ |
| cutii-*.webp | https://www.pexels.com/photo/6169026/ |
| dosare-*.webp | https://www.pexels.com/photo/11176866/ |
| dulapuri-*.webp | https://www.pexels.com/photo/7482657/ |
| sertare-*.webp | https://www.pexels.com/photo/9574532/ |
| maini-*.webp | https://www.pexels.com/photo/4792285/ |
| legatura-*.webp | https://www.pexels.com/photo/33686677/ |

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

     Măsurat pe 2026-09-06: 14 fișiere aici, 14 dincolo, 0 sume comune. Control pozitiv,
     aceeași comandă cu celălalt site contra lui însuși: 14 din 14 - adică măsurătoarea chiar
     ar fi văzut coincidențele dacă existau. -->

## Cele două mărimi

Fiecare fotografie are o variantă de 1920 px lățime, pentru ecran lat, și una de 960 px, servită
sub 768 px. Cea de 1920 păstrează proporția originalului descărcat de pe Pexels și nu e niciodată
mărită: fiecare sursă avea cel puțin 4342 px lățime.

Variantele de 960 sunt toate PORTRET, 960x1440 (2:3), fiindcă un peisaj întins cu `object-cover` pe
un telefon ținut vertical se mărește de peste o dată și un sfert și se înmoaie. Toate sunt decupaje
din originalul de la aceeași adresă, sub aceeași licență, tăiate pe verticală din zona cu subiectul:
`cutii` e practic întregul cadru (originalul e deja 2:3), `rafturi` ia peretele de rafturi și lasă
afară raftul cu reviste din dreapta, `sertare` ia mâna și sertarul deschis din stânga cadrului,
`dosare` fișele din centru-stânga, `maini` mâinile și mapa, iar `dulapuri` și `legatura` mijlocul
cadrului. Generate cu Pillow, calitate WebP 81, `method=6`.
