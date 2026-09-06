import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Probele feliei juridice (val S1-b): cele patru acte, instrumentul de termene, harta
 * site-ului si pagina de 404.
 *
 * FISIER NOU, nu adaugiri in `directia.test.ts`. Acela e partajat si inghetat in valul asta;
 * ce se masoara aici e specific feliei, iar o proba scrisa in fisierul altcuiva ar fi o
 * scriere pe un bun comun pentru un motiv local.
 *
 * CE CLASA DE DEFECT INCHID PROBELE DE AICI, si de ce niciuna dintre portile existente nu o
 * vede. Clasele Tailwind sunt SIRURI: `typecheck`, `lint` si `build` nu le citesc, iar `axe`
 * nu le vede nici el cand elementul ramane lizibil din alt motiv. Deci o clasa din paleta
 * veche ramasa intr-unul din fisierele feliei nu inroseste nimic - degradarea e tacuta.
 * `directia.test.ts` masoara `src/components` si pagina de start; PAGINILE feliei (harta,
 * instrumente, not-found, cele trei acte) nu sunt in acoperirea lui.
 *
 * CE NU VERIFICA (reziduuri - un verde de aici nu inseamna ca paginile arata bine)
 * Intrebarea pe care o pune de fapt: "scriu fisierele feliei numai jetoane din paleta noua,
 * si au componentele ei forma pe care o cere directia?" Nu "e pagina asezata corect".
 *   - Nu randeaza nimic si nu deschide niciun browser: masoara SURSA. Asezarea, ritmul si
 *     caracterele pe rand se masoara pe pagina construita, cu stiluri calculate, si cifrele
 *     stau in raportul feliei, nu aici.
 *   - Nu numara butoanele primare pe sectiune: aia o face `directia.test.ts`, si numai pe
 *     pagina de start.
 *   - Numele vechi de culoare se cauta ca sir, deci un jeton compus dintr-o variabila
 *     (`"bg-" + numeVechi`) trece nevazut. Pe felia asta nu exista asemenea constructie, dar
 *     proba nu o poate exclude.
 */

const RADACINA = join(__dirname, '..')

// Fisierele PE CARE LE-A ATINS felia. Lista e scrisa pe litere dinadins: o proba care ar
// baleia tot `src` s-ar inrosi pe munca altor felii, care se rescrie in acelasi val si pe
// care nimeni de aici nu are voie sa o atinga.
const FISIERELE_FELIEI = [
  'src/app/termeni/page.tsx',
  'src/app/confidentialitate/page.tsx',
  'src/app/cookies/page.tsx',
  'src/app/accesibilitate/page.tsx',
  'src/app/instrumente/termene-de-pastrare/page.tsx',
  'src/app/harta-site/page.tsx',
  'src/app/not-found.tsx',
  'src/components/JuridicPagina.tsx',
  'src/components/JuridicBlocuri.tsx',
  'src/components/JuridicIdentificare.tsx',
  'src/components/JuridicCuprins.tsx',
  'src/components/JuridicSectiune.tsx',
  'src/components/JuridicListaLipsa.tsx',
  'src/components/TermeneCuprins.tsx',
  'src/components/TermeneFisa.tsx',
  'src/components/TermeneRegula.tsx',
  'src/components/HartaLista.tsx',
  'src/components/HartaAncore.tsx',
  'src/content/interior-juridic.ts',
  'src/content/termene.ts',
]

// Numele directiei anterioare, ca UTILITARE Tailwind. Tiparul cere ca dupa nume sa NU urmeze
// cratima sau cifra, altfel `bg-noapte-v` - jeton VALID din paleta noua - ar fi prins de
// `bg-noapte` si proba s-ar inrosi exact pe forma corecta.
const CLASE_VECHI =
  /\b(?:hover:|group-hover:|focus:)?(?:bg|text|border|decoration|from|to|via|ring|fill|stroke)-(?:noapte-[23]|noapte(?![-\w])|hartie|hartie-veche|hartie-veche-[23]|arama|arama-clar|arama-moale|arama-inchis|verde|verde-adanc|verde-apasat|verde-moale|tus|tus-[23]|pe-inchis(?:-[23])?|suprafata|linie-noapte|linie-suprafata|linie-fn|linie-inchis|cerneala-accent)(?![-\w])/g

function citeste(cale: string) {
  const intreg = join(RADACINA, cale)
  expect(existsSync(intreg), 'lipseste fisierul feliei: ' + cale).toBe(true)
  return readFileSync(intreg, 'utf8')
}

describe('felia juridica: paleta', () => {
  it('niciun fisier al feliei nu mai scrie o clasa din paleta veche, nici in comentarii', () => {
    // In COMENTARII, nu doar in cod, si asta e o alegere masurata: comanda de inventar din
    // `docs/design/DIRECTIA.md` scaneaza fisierul intreg cu `grep`, iar `grep` nu stie ce e
    // proza. Un comentariu care descrie mecanismul vechi citand clasa pe litere devine chiar
    // o instanta a ei si intra in cifra. S-a intamplat o data pe felia asta, in nota de
    // deschidere a paginii de 404, si a fost prins de aceeasi comanda.
    const abateri: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      for (const m of citeste(cale).matchAll(CLASE_VECHI)) abateri.push(cale + ': ' + m[0])
    }
    expect(abateri, 'clase din paleta veche in fisierele feliei juridice').toEqual([])

    // MARTOR POZITIV: tiparul prinde toate cele trei forme pe care le vaneaza.
    const martor = 'className="bg-noapte text-hartie-veche-2 hover:text-arama-clar"'
    expect([...martor.matchAll(CLASE_VECHI)].length, 'tiparul nu prinde martorul').toBe(3)
    // MARTOR NEGATIV: doua jetoane VALIDE ale paletei noi nu au voie sa fie prinse.
    expect([...'bg-noapte-v text-cerneala-2'.matchAll(CLASE_VECHI)].length).toBe(0)
  })

  it('pastilele de stare ale termenelor stau pe perechi din paleta noua', () => {
    // `STARI` da trei perechi de clase, cate una pe stare, si e singurul loc din `content` in
    // care traiesc siruri de clase. Perechile de dinainte numeau culori sterse din
    // `globals.css`, deci pastila isi pierdea si fundalul, si litera.
    const termene = citeste('src/content/termene.ts')
    const perechi = [...termene.matchAll(/clase:\s*"([^"]+)"/g)].map((m) => m[1])
    expect(perechi.length, 'nu mai gasesc cele trei perechi de clase ale starilor').toBe(3)
    const PALETA = [
      'violet', 'violet-2', 'violet-clar', 'violet-pal', 'violet-adanc', 'noapte-v',
      'cerneala', 'cerneala-2', 'cerneala-3', 'alb', 'ceata', 'ceata-2', 'linie', 'succes',
    ]
    for (const pereche of perechi) {
      for (const clasa of pereche.split(/\s+/)) {
        const rol = clasa.replace(/^(bg|text|border)-/, '')
        expect(PALETA, 'rol de culoare in afara paletei REF-V: ' + clasa).toContain(rol)
      }
    }
    // Textele si cheile nu s-au atins: sunt continut, nu stil.
    for (const cheie of ['confirmat', 'orientativ', 'neconfirmat']) {
      expect(termene, 'a disparut starea ' + cheie).toContain(cheie + ': {')
    }
  })
})

describe('felia juridica: forma', () => {
  it('niciun titlu al feliei nu e cu majuscule sau bold', () => {
    // Amandoua sunt scrise in „Ce nu se face" din DIRECTIA.md, si amandoua traiau pe pagina
    // de 404: titlul avea `uppercase` si `font-bold`, intr-un font incarcat doar cu 400 si
    // 600 - deci browserul l-ar fi ingrosat mecanic.
    const gasite: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      const cod = citeste(cale)
      if (/\buppercase\b/.test(cod)) gasite.push(cale + ': uppercase')
      if (/\bfont-bold\b/.test(cod)) gasite.push(cale + ': font-bold')
    }
    expect(gasite, 'majuscule sau bold in fisierele feliei').toEqual([])
    // Control pozitiv, in amandoua formele.
    expect(/\buppercase\b/.test('className="tracking-wide uppercase"')).toBe(true)
    expect(/\bfont-bold\b/.test('className="font-bold"')).toBe(true)
  })

  it('niciun card al feliei nu poarta umbra', () => {
    // Cardurile se despart prin CULOARE DE FUNDAL, nu prin umbra. Singura umbra din sistem e
    // conturul butonului secundar, si el sta in `Buton`, care nu e al feliei.
    const cuUmbra: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      for (const m of citeste(cale).matchAll(/\bshadow-[a-z-]+/g)) cuUmbra.push(cale + ': ' + m[0])
    }
    expect(cuUmbra, 'umbra pe un card al feliei').toEqual([])
    expect([...'className="rounded-card shadow-plutitor"'.matchAll(/\bshadow-[a-z-]+/g)].length).toBe(1)
  })

  it('titlurile de sectiune ale actelor stau pe treapta de 24 px, nu pe cea de afis', () => {
    // Titlul de 48 px al paginii ramane in antet si e singurul afis al unui act; sectiunile
    // sunt titluri de paragraf. Inainte erau `clamp(1.65rem,3vw,2.375rem)`, adica 38,4 px la
    // 1280 - o a doua treapta de afis, repetata de noua ori pe pagina.
    const pagina = citeste('src/components/JuridicPagina.tsx')
    expect(pagina, 'titlul de sectiune nu mai e pe treapta de card (24/32)').toMatch(
      /<h2[^>]*text-titlu-4/,
    )
    expect(pagina, 'a reaparut o marime scrisa de mana pe titlul de sectiune').not.toMatch(
      /<h2[^>]*text-\[clamp/,
    )
  })

  it('masura randului actelor e scrisa o singura data, in continut, si e in pixeli', () => {
    // Un al doilea plafon scris pe elemente s-ar abate de la primul: exact defectul masurat
    // inainte, cand h2 statea la 516 px, paragraful la 485 si caseta la 547, in aceeasi
    // coloana declarata de 952. Si e in PIXELI, nu in `ch`: `ch` e latimea glifei zero, deci
    // `max-w-[74ch]` suna a 74 de caractere si masura 98.
    const continut = citeste('src/content/interior-juridic.ts')
    const m = continut.match(/export const MASURA_ACT = "max-w-\[(\d+)px\]"/)
    expect(m, 'MASURA_ACT lipseste sau nu mai e in pixeli').not.toBeNull()
    const px = Number(m![1])
    expect(px, 'masura actului a iesit din intervalul masurat').toBeGreaterThanOrEqual(460)
    expect(px, 'masura actului a iesit din intervalul masurat').toBeLessThanOrEqual(620)
    // Si cei trei cititori o iau de acolo, nu isi scriu fiecare plafonul lui.
    for (const cale of [
      'src/components/JuridicPagina.tsx',
      'src/components/JuridicBlocuri.tsx',
      'src/components/JuridicIdentificare.tsx',
    ]) {
      const cod = citeste(cale)
      expect(cod, cale + ' nu citeste masura din continut').toContain('MASURA_ACT')
      // Plafonul se cauta DOAR pe paragrafe, si asta e o ingustare masurata: proba scrisa
      // pe tot fisierul se inrosea pe `max-w-[30ch]` de pe titlul de sectiune, care e un
      // plafon legitim si al altui lucru. Un titlu se rupe dupa numarul de cuvinte care
      // incap pe doua randuri, proza dupa masura randului; a doua nu are voie sa fie scrisa
      // de doua ori, prima nu are legatura cu ea.
      expect(cod, cale + ' scrie inca o masura de proza in `ch`').not.toMatch(
        /<p[^>]*max-w-\[\d+ch\]/,
      )
    }
    // Control pozitiv: tiparul prinde forma pe care o vaneaza, si NU prinde plafonul de titlu.
    expect(/<p[^>]*max-w-\[\d+ch\]/.test('<p className="max-w-[74ch] text-corp">')).toBe(true)
    expect(/<p[^>]*max-w-\[\d+ch\]/.test('<h2 className="max-w-[30ch] text-titlu-4">')).toBe(false)
  })
})

describe('felia juridica: continutul nu se pierde', () => {
  it('cuprinsul unui act numeste toate sectiunile lui', () => {
    // Cuprinsul se construieste din `pagina.sectiuni`, nu dintr-o lista scrisa alaturi: o a
    // doua lista s-ar desincroniza la prima sectiune adaugata, iar intrarile ar duce in gol
    // fara ca nimic sa se planga.
    const pagina = citeste('src/components/JuridicPagina.tsx')
    expect(pagina, 'cuprinsul nu se mai deriva din sectiunile actului').toMatch(
      /pagina\.sectiuni\.map\(\(s\) => \(\{ id: s\.id, titlu: s\.titlu \}\)\)/,
    )
  })

  it('cele opt ancore ale instrumentului poarta si termenul, si actul', () => {
    // Randul de ancore a inlocuit tabelul, iar `cuprins.subTabel` - text inghetat - spune ca
    // actul normativ sta sub numele categoriei, la orice latime, si ca numele duce la fisa.
    // Daca ancorele ar purta doar numele, propozitia aceea ar deveni falsa.
    const cuprins = citeste('src/components/TermeneCuprins.tsx')
    expect(cuprins, 'ancora nu mai poarta termenul').toMatch(/t\.termen \? t\.termen : fara/)
    expect(cuprins, 'ancora nu mai poarta actul normativ').toMatch(/t\.lege \? t\.lege : faraTemei/)
    expect(cuprins, 'ancora nu mai duce la fisa').toMatch(/href=\{"#" \+ t\.ancora\}/)
  })

  it('regulile de folosire raman in HTML-ul servit, nu in stare de browser', () => {
    // Acordeonul se construieste din `details`/`summary`, deci si intrebarea, si raspunsul
    // ajung la cine citeste pagina fara scripturi. Un acordeon facut din stare React ar fi
    // ascuns trei reguli din patru.
    const regula = citeste('src/components/TermeneRegula.tsx')
    expect(regula, 'regulile nu mai trec prin acordeonul de linii').toContain('Acordeon')
    expect(regula, 'componenta a devenit componenta de client').not.toContain('use client')
    const acordeon = readFileSync(join(RADACINA, 'src/components/Acordeon.tsx'), 'utf8')
    expect(acordeon, 'acordeonul nu mai e din details/summary').toMatch(/<details/)
  })

  it('cele patru drumuri ale paginii de 404 vin din manifest, nu scrise de mana', () => {
    const negasita = citeste('src/app/not-found.tsx')
    expect(negasita, '404 si-a scris destinatiile in loc sa le caute in manifest').toMatch(
      /RUTE\.find\(\(r\) => r\.cale === cale\)/,
    )
    // Si un singur buton primar: pagina asta are de dat un singur raspuns.
    expect([...negasita.matchAll(/<Buton\b/g)].length, 'au reaparut doua butoane pe 404').toBe(1)
  })
})
