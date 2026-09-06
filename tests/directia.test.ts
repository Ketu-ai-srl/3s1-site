import { readFileSync, readdirSync } from 'node:fs'
import { join, sep } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Fundatia directiei REF-V (felia 1, val S1-a): fundal ALB si ceata, un singur violet care
 * duce actiunea, o singura familie de litera, titluri cu litera obisnuita, fotografia in
 * card - niciodata pe tot ecranul.
 *
 * CE CLASA DE DEFECT INCHID PROBELE DE AICI. Portile de browser masoara pagina CONSTRUITA:
 * axe pe 22 de rute plus un build inseamna minute, si raspunde abia dupa. Regulile de mai
 * jos se pot decide pe sursa, in sub o secunda, si sunt exact acelea pe care nicio alta
 * poarta nu le vede:
 *   - o culoare din paleta veche reintrodusa „temporar" in globals.css. Contrastul ei poate
 *     fi impecabil, deci nicio poarta de contrast nu se inroseste; ce se pierde e directia.
 *   - un al doilea font incarcat printr-un nume mostenit (`font-mono`, `font-afis`).
 *   - `cerneala-3` scris pe o suprafata de ceata, unde da 3,97:1. Axe il prinde doar daca
 *     acel text ajunge randat pe o pagina din lista de rute, la latimea masurata.
 *   - doua butoane primare in aceeasi sectiune. Nicio unealta nu numara asta.
 *
 * Cifrele de contrast citate mai jos sunt calculate din valorile paletei (raportul de
 * luminanta WCAG), iar cele de pe gradientul eroului sunt masurate pe captura, cu litera
 * facuta transparenta. Scriptul si valorile: `docs/design/DIRECTIA.md`.
 */

const RADACINA = join(__dirname, '..')
const COMPONENTE = join(RADACINA, 'src', 'components')
const CSS = readFileSync(join(RADACINA, 'src', 'app', 'globals.css'), 'utf8')
const DIRECTIA = readFileSync(join(RADACINA, 'docs', 'design', 'DIRECTIA.md'), 'utf8')

// Cele 14 roluri ale paletei REF-V. Lista e inchisa: o culoare in plus inseamna un rol pe
// care nu l-a numit nimeni, iar rolurile nenumite se aleg dupa gust, nu dupa masuratoare.
const PALETA = [
  'violet',
  'violet-2',
  'violet-clar',
  'violet-pal',
  'violet-adanc',
  'noapte-v',
  'cerneala',
  'cerneala-2',
  'cerneala-3',
  'alb',
  'ceata',
  'ceata-2',
  'linie',
  'succes',
]

// Numele directiei anterioare. `noapte-v` NU e printre ele si nu se potriveste: tiparul cere
// ca dupa `noapte` sa urmeze sfarsitul numelui sau o cratima urmata de cifra.
const PALETA_VECHE = [
  /--color-noapte(-[23])?:/,
  /--color-hartie(-[a-z0-9-]+)?:/,
  /--color-arama(-[a-z0-9-]+)?:/,
  /--color-verde(-[a-z0-9-]+)?:/,
  /--color-tus(-[a-z0-9-]+)?:/,
  /--color-pe-inchis(-[a-z0-9-]+)?:/,
  /--color-suprafata:/,
  /--color-linie-noapte:/,
  /--color-linie-suprafata:/,
  /--color-cerneala-accent:/,
]

// Clasele pe care le-ar scrie cineva care se intoarce, din obisnuinta, la directia veche.
const CLASE_VECHI =
  /\b(?:hover:|group-hover:|focus:)?(?:bg|text|border|decoration|from|to|via)-(?:noapte-[23]|noapte(?![-\w])|hartie|hartie-veche|hartie-veche-[23]|arama|arama-clar|arama-moale|arama-inchis|verde|verde-adanc|verde-moale|tus|tus-[23]|pe-inchis|suprafata|linie-noapte|linie-suprafata|cerneala-accent)\b/g

function fisiereTsx(dir: string, acc: string[] = []): string[] {
  for (const intrare of readdirSync(dir, { withFileTypes: true })) {
    const cale = join(dir, intrare.name)
    if (intrare.isDirectory()) fisiereTsx(cale, acc)
    else if (/\.tsx?$/.test(intrare.name)) acc.push(cale)
  }
  return acc
}

function relativa(cale: string) {
  return cale.replace(RADACINA, '').split(sep).join('/').replace(/^\//, '')
}

// Comentariile se scot inainte de a cauta clase: notele istorice ale componentelor
// retintuite numesc pe fata culorile directiei anterioare, si asta e chiar ce vrem sa ramana
// scris. Ce nu are voie sa existe e clasa in COD.
function faraComentarii(text: string) {
  return text.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^[ \t]*\/\/.*$/gm, '')
}

describe('paleta REF-V', () => {
  it('globals.css defineste exact cele 14 roluri ale paletei, si nimic in plus', () => {
    for (const rol of PALETA) {
      expect(CSS, 'globals.css nu defineste --color-' + rol).toContain('--color-' + rol + ':')
    }
    const definite = [...CSS.matchAll(/--color-([a-z0-9-]+):/g)].map((m) => m[1]).sort()
    expect(definite, 'roluri de culoare in plus fata de lista REF-V').toEqual([...PALETA].sort())
  })

  it('paleta directiei anterioare nu mai e definita, nici macar ca alias', () => {
    const ramase: string[] = []
    for (const tipar of PALETA_VECHE) {
      const m = CSS.match(tipar)
      if (m) ramase.push(m[0])
    }
    expect(ramase, 'jetoane ale directiei vechi ramase in globals.css').toEqual([])
    // Si controlul: tiparul chiar prinde ceva, altfel proba de mai sus ar fi verde si oarba.
    expect('--color-noapte-2: #141416;'.match(PALETA_VECHE[0]), 'tiparul nu prinde nici macar forma pe care o vaneaza').not.toBeNull()
    // `noapte-v` e din paleta NOUA si nu are voie sa fie prins de tiparul vechi.
    expect('--color-noapte-v: #110c29;'.match(PALETA_VECHE[0]), 'tiparul vechi inghite si noapte-v').toBeNull()
  })

  it('nicio componenta si nicio pagina nu mai scrie o clasa din paleta veche', () => {
    const abateri: string[] = []
    for (const cale of [
      ...fisiereTsx(COMPONENTE),
      join(RADACINA, 'src', 'app', 'page.tsx'),
      join(RADACINA, 'src', 'app', 'layout.tsx'),
    ]) {
      const cod = faraComentarii(readFileSync(cale, 'utf8'))
      for (const m of cod.matchAll(CLASE_VECHI)) abateri.push(relativa(cale) + ': ' + m[0])
    }
    expect(abateri, 'clase din paleta veche in fisierele feliei 1').toEqual([])
    // Control pozitiv: tiparul trebuie sa prinda forma pe care o vaneaza, inclusiv variantele.
    const martor = 'className="bg-noapte text-hartie-veche-2 hover:text-arama-clar"'
    expect([...martor.matchAll(CLASE_VECHI)].length, 'tiparul de clase vechi nu prinde martorul').toBe(3)
  })

  it('fiecare cerneala trece pragul pe fiecare suprafata deschisa, calculat din valori', () => {
    // Nu numele, VALORILE. Proba citeste hexul din globals.css si calculeaza raportul de
    // luminanta WCAG, deci prinde si cazul in care cineva schimba o culoare fara sa se uite
    // la ce sta sub ea. Clasa de defect e reala si masurata: `cerneala-3` la valoarea din
    // referinta (#797980) dadea 4,32:1 pe alb si a inrosit sapte pagini la axe.
    const valoare = (rol: string) => {
      const m = CSS.match(new RegExp('--color-' + rol + ':\\s*(#[0-9a-f]{6})'))
      expect(m, 'nu gasesc valoarea rolului ' + rol).not.toBeNull()
      return m![1]
    }
    const canal = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
    const luminanta = (hex: string) => {
      const n = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      return 0.2126 * canal(n[0]) + 0.7152 * canal(n[1]) + 0.0722 * canal(n[2])
    }
    const contrast = (a: string, b: string) => {
      const [la, lb] = [luminanta(a), luminanta(b)]
      return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
    }
    // Control: doua valori al caror raspuns se stie dinainte.
    expect(contrast('#ffffff', '#000000'), 'formula de contrast e gresita').toBeCloseTo(21, 2)
    expect(contrast('#ffffff', '#ffffff'), 'formula de contrast e gresita').toBeCloseTo(1, 2)

    const sub: string[] = []
    for (const cerneala of ['cerneala', 'cerneala-2', 'cerneala-3']) {
      for (const suprafata of ['alb', 'ceata', 'ceata-2']) {
        const c = contrast(valoare(cerneala), valoare(suprafata))
        if (c < 4.5) sub.push(cerneala + ' pe ' + suprafata + ': ' + c.toFixed(2))
      }
    }
    expect(sub, 'cerneala sub pragul de 4,5:1 pe o suprafata deschisa').toEqual([])
    // Si perechile de pe fundal inchis, unde scriu banda de incredere si eroul.
    expect(contrast(valoare('alb'), valoare('noapte-v'))).toBeGreaterThan(4.5)
    expect(contrast(valoare('violet-clar'), valoare('noapte-v'))).toBeGreaterThan(4.5)
    expect(contrast(valoare('violet-clar'), valoare('violet-adanc'))).toBeGreaterThan(4.5)
    expect(contrast(valoare('alb'), valoare('violet'))).toBeGreaterThan(4.5)
    // `violet-2` NU trece pe alb, si asta se afirma explicit: daca ar ajunge sa treaca,
    // regula care il tine departe de litera si-a pierdut motivul si trebuie rescrisa.
    expect(contrast(valoare('violet-2'), valoare('alb')), 'violet-2 a devenit culoare de text').toBeLessThan(4.5)
  })

  it('violet-2 nu se scrie ca litera nicaieri in fisierele feliei', () => {
    // `violet-2` da 4,05:1 pe alb: sub pragul de 4,5:1 pentru text mic, si proba de mai sus
    // afirma explicit ca inca e asa. E contur, hover si subliniere, nu litera.
    //
    // Se masoara FISIERELE FELIEI 1, nu tot `src`: paginile altor felii se rescriu la valul
    // urmator, iar o proba care ar cere si acolo s-ar inrosi pe munca pe care nimeni nu are
    // voie sa o atinga acum.
    const gasite: string[] = []
    for (const cale of [
      ...fisiereTsx(COMPONENTE),
      join(RADACINA, 'src', 'app', 'page.tsx'),
      join(RADACINA, 'src', 'app', 'layout.tsx'),
    ]) {
      const cod = faraComentarii(readFileSync(cale, 'utf8'))
      for (const m of cod.matchAll(/\btext-violet-2\b/g)) {
        gasite.push(relativa(cale) + ': ' + m[0])
      }
    }
    expect(gasite, 'violet-2 folosit ca litera').toEqual([])
    // Control pozitiv: tiparul prinde forma pe care o vaneaza, altfel lista goala de mai sus
    // nu spune nimic.
    const martorSubPrag = 'className="text-violet-2 underline"'
    expect(
      [...martorSubPrag.matchAll(/\btext-violet-2\b/g)].length,
      'tiparul nu prinde nici macar martorul',
    ).toBe(1)
    // Si martorul negativ: `decoration-violet-2` e forma LEGITIMA si nu are voie sa fie prinsa.
    expect([...'decoration-violet-2'.matchAll(/\btext-violet-2\b/g)].length).toBe(0)
  })

  it('cifrele de contrast sunt scrise in globals.css si in DIRECTIA.md', () => {
    for (const cifra of ['17,73', '7,06', '6,20', '18,95', '7,61']) {
      expect(CSS, 'globals.css nu scrie contrastul ' + cifra).toContain(cifra)
    }
    expect(DIRECTIA, 'DIRECTIA.md nu scrie contrastul masurat pe captura').toMatch(/5,3[0-9]/)
  })

  it('fiecare jeton definit in globals.css e explicat in DIRECTIA.md', () => {
    const definite = [...CSS.matchAll(/--color-([a-z0-9-]+):/g)].map((m) => m[1])
    expect(definite.length, 'blocul de paleta din globals.css pare gol').toBeGreaterThan(10)
    for (const j of definite) {
      expect(DIRECTIA, 'DIRECTIA.md nu numeste jetonul ' + j).toContain(j)
    }
  })
})

describe('litera si scara', () => {
  it('se incarca o singura familie, si toate jetoanele de familie arata catre ea', () => {
    const layout = readFileSync(join(RADACINA, 'src', 'app', 'layout.tsx'), 'utf8')
    const importuri = layout.match(/from "next\/font\/google"/g) ?? []
    expect(importuri.length, 'mai mult sau mai putin de un import de font').toBe(1)
    expect(layout, 'fontul nu e DM Sans').toMatch(/DM_Sans\(/)
    // Doua greutati, 400 si 600: 700 nu se incarca, fiindca titlurile REF-V nu sunt bold.
    expect(layout).toMatch(/weight:\s*\["400",\s*"600"\]/)
    const familii = [...CSS.matchAll(/--font-(afis|vitrina|mono|sans|serif):\s*([^;]+);/g)]
    expect(familii.length, 'jetoanele de familie lipsesc din globals.css').toBeGreaterThan(2)
    for (const [, nume, valoare] of familii) {
      expect(valoare, 'jetonul --font-' + nume + ' nu arata catre familia unica').toContain(
        'var(--fnt-text)',
      )
    }
  })

  it('titlurile nu sunt bold si nu sunt majuscule', () => {
    const baza = CSS.match(/h1,\s*\n\s*h2,\s*\n\s*h3,\s*\n\s*h4\s*\{([\s\S]*?)\}/)
    expect(baza, 'nu gasesc regula de baza h1..h4').not.toBeNull()
    expect(baza![1], 'titlurile nu sunt la greutatea 400').toMatch(/font-weight:\s*400\s*;/)
    expect(baza![1], 'titlurile nu declara text-transform: none').toMatch(/text-transform:\s*none\s*;/)
    // Si `uppercase` nu se mai scrie pe niciun titlu din fisierele feliei.
    const cuMajuscule: string[] = []
    for (const cale of [...fisiereTsx(COMPONENTE), join(RADACINA, 'src', 'app', 'page.tsx')]) {
      const cod = faraComentarii(readFileSync(cale, 'utf8'))
      if (/\buppercase\b/.test(cod)) cuMajuscule.push(relativa(cale))
    }
    expect(cuMajuscule, 'clase `uppercase` ramase in fisierele feliei 1').toEqual([])
  })

  it('scara e cea masurata pe REF-V: 72, 48, 36, 24, 20, 16, 14', () => {
    expect(CSS, 'titlul erou nu urca la 72 px (4,5rem)').toMatch(/--text-titlu-1:\s*clamp\([^)]*4\.5rem\)/)
    expect(CSS, 'titlul de sectiune nu urca la 48 px (3rem)').toMatch(/--text-titlu-2:\s*clamp\([^)]*3rem\)/)
    expect(CSS, 'lipseste treapta de 36 px').toMatch(/--text-titlu-3:\s*clamp\([^)]*2\.25rem\)/)
    expect(CSS, 'lipseste treapta de 24 px').toMatch(/--text-titlu-4:\s*24px/)
    expect(CSS, 'lipseste subtitlul de 20 px').toMatch(/--text-subtitlu:\s*20px/)
    expect(CSS, 'corpul nu e 16 px').toMatch(/--text-corp:\s*16px/)
    expect(CSS, 'nota nu e 14 px').toMatch(/--text-nota:\s*14px/)
  })

  it('inaltimea de rand a titlurilor incape diacriticele romanesti', () => {
    // Pragul e cel masurat la directia anterioara, pe fontul real: virgula lui S coboara
    // 0,180 em sub linia de baza, iar A/I cu accent urca 0,889 em, deci 1,069 em e minimul
    // sub care doua randuri se ating. Se pastreaza desi titlurile nu mai sunt cu majuscule -
    // nu costa nimic, iar o regula relaxata fiindca „azi nu mai avem majuscule" se strica la
    // primul titlu scris cu majuscule.
    const PRAG = 1.069
    const pasi: Array<[string, RegExpMatchArray | null]> = [
      ['--text-titlu-1--line-height', CSS.match(/--text-titlu-1--line-height:\s*([0-9.]+)\s*;/)],
      ['--text-titlu-2--line-height', CSS.match(/--text-titlu-2--line-height:\s*([0-9.]+)\s*;/)],
      ['--text-titlu-3--line-height', CSS.match(/--text-titlu-3--line-height:\s*([0-9.]+)\s*;/)],
    ]
    for (const [jeton, m] of pasi) {
      expect(m, 'nu gasesc ' + jeton).not.toBeNull()
      expect(Number(m![1]), jeton + ' e sub pragul diacriticelor').toBeGreaterThanOrEqual(PRAG)
    }
    const baza = CSS.match(/h1,\s*\n\s*h2,\s*\n\s*h3,\s*\n\s*h4\s*\{([\s\S]*?)\}/)
    const pas = baza![1].match(/line-height:\s*([0-9.]+)\s*;/)
    expect(pas, 'regula de baza h1..h4 nu are line-height').not.toBeNull()
    expect(Number(pas![1]), 'line-height de baza sub pragul diacriticelor').toBeGreaterThanOrEqual(PRAG)
  })
})

describe('forma: raze, umbre, un singur buton primar', () => {
  it('razele REF-V exista ca jetoane, iar cardurile nu poarta umbra', () => {
    for (const raza of ['buton', 'card', 'card-mare', 'pastila']) {
      expect(CSS, 'lipseste raza --radius-' + raza).toContain('--radius-' + raza + ':')
    }
    expect(CSS, 'butonul nu are 8 px').toMatch(/--radius-buton:\s*8px/)
    expect(CSS, 'cardul mare nu are 16 px').toMatch(/--radius-card-mare:\s*16px/)
    // Cardul se desparte prin culoare de fundal, nu prin umbra. Umbra ramane definita pentru
    // conturul butonului secundar, care nu misca asezarea; pe carduri nu se scrie.
    const card = faraComentarii(readFileSync(join(COMPONENTE, 'Card.tsx'), 'utf8'))
    expect(card, 'cardul static poarta umbra').not.toMatch(/\bshadow-/)
    expect(card, 'cardul nu se desparte prin culoare de fundal').toMatch(/bg-ceata|bg-alb/)
  })

  it('fiecare sectiune a paginii de start are cel mult un buton primar', () => {
    const pagina = faraComentarii(readFileSync(join(RADACINA, 'src', 'app', 'page.tsx'), 'utf8'))
    // Butonul primar e recunoscut dupa forma lui: raza de buton plus o suprafata plina.
    const bucati = pagina.split(/<section\b/)
    const prea: string[] = []
    bucati.forEach((bucata, i) => {
      const cate = [...bucata.matchAll(/rounded-buton bg-(?:violet|alb)\b/g)].length
      if (cate > 1) prea.push('sectiunea ' + i + ': ' + cate + ' butoane primare')
    })
    expect(prea, 'doua butoane primare in aceeasi sectiune').toEqual([])
    // Si controlul: forma chiar se recunoaste undeva, altfel proba numara zero peste tot.
    expect(
      [...pagina.matchAll(/rounded-buton bg-(?:violet|alb)\b/g)].length,
      'nu s-a recunoscut niciun buton primar: tiparul nu mai potriveste forma',
    ).toBeGreaterThan(0)
  })

  it('butonul are cele patru feluri REF-V, si cel de pe fundal inchis e alb', () => {
    const buton = readFileSync(join(COMPONENTE, 'Buton.tsx'), 'utf8')
    for (const fel of ['plin', 'alb', 'contur', 'text']) {
      expect(buton, 'lipseste felul de buton ' + fel).toContain(fel + ':')
    }
    expect(buton, 'butonul primar nu e violet plin cu litera alba').toMatch(/plin:\s*"[^"]*bg-violet[^"]*text-alb/)
    expect(buton, 'butonul de pe fundal inchis nu e alb cu litera cerneala').toMatch(
      /alb:\s*"[^"]*bg-alb[^"]*text-cerneala/,
    )
    expect(buton, 'butonul secundar nu are conturul violet-2').toMatch(/contur:[\s\S]{0,120}shadow-contur/)
  })
})

describe('gramatica paginilor', () => {
  it('antetul e alb, de 56 px, si e transparent doar peste eroul paginii de start', () => {
    const nav = readFileSync(join(COMPONENTE, 'Navigatie.tsx'), 'utf8')
    expect(nav, 'bara nu are 56 px').toContain('h-[56px]')
    expect(nav, 'bara nu e alba in starea ei obisnuita').toMatch(/bg-alb/)
    expect(nav, 'transparenta nu e legata de pagina de start').toMatch(/cale === "\/"/)
    // Panoul pliabil ramane HTML servit, cu contractul pe care il masoara proba de browser.
    expect(nav, 'panoul pliabil si-a pierdut identificatorul').toContain('id="meniu-pliabil"')
    expect(nav, 'butonul nu mai controleaza panoul').toContain('aria-controls="meniu-pliabil"')
  })

  it('eroul paginii de start e culoare, nu fotografie', () => {
    const pagina = readFileSync(join(RADACINA, 'src', 'app', 'page.tsx'), 'utf8')
    const dupaErou = pagina.slice(pagina.indexOf('ton="erou"'))
    const pana = dupaErou.slice(0, dupaErou.indexOf('/>'))
    expect(pana, 'eroul primeste o fotografie, desi REF-V il da ca gradient').not.toMatch(/imagine=/)
    expect(CSS, 'lipseste gradientul eroului').toMatch(/\.erou-violet\s*\{/)
    expect(CSS, 'gradientul nu merge de la violet-adanc la noapte-v').toMatch(/#251951[\s\S]{0,80}#110c29/)
    const ecran = readFileSync(join(COMPONENTE, 'Ecran.tsx'), 'utf8')
    expect(ecran, 'ecranul randeaza fotografie si pe erou').toMatch(/Boolean\(imagine\) && !erou/)
  })

  it('nu mai exista voal: fotografia nu mai poarta text peste ea', () => {
    // Voalul era mecanismul prin care textul statea peste fotografie, si el cerea calibrare
    // per cadru, plus o masuratoare pe captura pentru fiecare fotografie noua, fiindca axe
    // lasa contrastul peste imagine in afara verdictului. In REF-V fotografia sta in card,
    // fara text peste ea, deci mecanismul intreg dispare.
    for (const clasa of ['.voal', '.voal-banda', '.voal-bara']) {
      expect(CSS, 'a ramas definit ' + clasa).not.toContain(clasa + ' {')
    }
    // `voalBanda` ramane acceptat de tipuri, ca paginile altor felii sa compileze, si de
    // aceea tiparul il scoate din cautare: ce nu are voie sa existe e CLASA de voal.
    const ecran = faraComentarii(readFileSync(join(COMPONENTE, 'Ecran.tsx'), 'utf8'))
    expect(ecran, 'Ecran inca pune un voal').not.toMatch(/voal(?!Banda)/)
    expect(ecran, 'fotografia nu mai sta in card cu raza de 16 px').toMatch(/rounded-card-mare/)
  })

  it('ancorele paginii de start raman, fiindca harta site-ului trimite la ele', () => {
    const rute = readFileSync(join(RADACINA, 'src', 'content', 'rute.ts'), 'utf8')
    const ancore = [...rute.matchAll(/ancora:\s*"([a-z-]+)"/g)].map((m) => m[1])
    expect(ancore.length, 'registrul de ancore pare gol').toBeGreaterThan(3)
    const pagina = readFileSync(join(RADACINA, 'src', 'app', 'page.tsx'), 'utf8')
    const start = readFileSync(join(RADACINA, 'src', 'content', 'start.ts'), 'utf8')
    const lipsa = ancore.filter(
      (a) => !pagina.includes('id="' + a + '"') && !start.includes('cheie: "' + a + '"'),
    )
    expect(lipsa, 'ancore fara tinta pe pagina de start').toEqual([])
  })

  it('fotografiile paginii de start exista in ambele marimi si se declara ilustrative', () => {
    const start = readFileSync(join(RADACINA, 'src', 'content', 'start.ts'), 'utf8')
    const nume = [...start.matchAll(/nume:\s*"([a-z]+)"/g)].map((m) => m[1])
    expect(nume.length, 'pagina de start nu mai foloseste nicio fotografie').toBeGreaterThan(3)
    const existente = new Set(readdirSync(join(RADACINA, 'public', 'img')))
    for (const n of nume) {
      for (const marime of ['1920', '960']) {
        expect(existente.has(n + '-' + marime + '.webp'), 'lipseste ' + n + '-' + marime).toBe(true)
      }
    }
    const alturi = [...start.matchAll(/alt:\s*"([^"]+)"/g)].map((m) => m[1])
    expect(alturi.length, 'fotografii fara text alternativ').toBe(nume.length)
    for (const a of alturi) expect(a, 'alt fara mentiunea ilustrativa: ' + a).toMatch(/ilustrativ/)
  })

  it('registrul de fotografii numeste doar fisiere care exista, in ambele marimi', () => {
    const registru = readFileSync(join(RADACINA, 'src', 'content', 'fotografii.ts'), 'utf8')
    const nume = [...registru.matchAll(/nume:\s*"([a-z]+)"/g)].map((m) => m[1])
    expect(nume.length, 'registrul de fotografii pare gol').toBeGreaterThan(5)
    const existente = new Set(readdirSync(join(RADACINA, 'public', 'img')))
    for (const n of nume) {
      for (const marime of ['1920', '960']) {
        expect(existente.has(n + '-' + marime + '.webp'), 'lipseste ' + n + '-' + marime).toBe(true)
      }
    }
  })

  it('textele noi ale paginii de start stau in continut, nu in componenta', () => {
    const start = readFileSync(join(RADACINA, 'src', 'content', 'start.ts'), 'utf8')
    for (const cheie of ['EROU', 'INTREBARE', 'CARD_MARE', 'ETAPE', 'DOMENII', 'INCREDERE', 'INCHEIERE']) {
      expect(start, 'lipseste blocul de text ' + cheie).toContain('export const ' + cheie)
    }
    // Si pagina chiar le citeste de acolo, in loc sa-si scrie propriile siruri.
    const pagina = readFileSync(join(RADACINA, 'src', 'app', 'page.tsx'), 'utf8')
    expect(pagina, 'pagina de start nu citeste textele din continut').toContain('@/content/start')
    // Domeniile raman citite din `segmente.ts`, unde le rescrie cealalta felie.
    expect(pagina, 'pagina de start si-a copiat domeniile in loc sa le citeasca').toContain(
      '@/content/segmente',
    )
  })

  it('subsolul si banda de incredere scriu doar culori care trec pragul pe fundalul lor', () => {
    const subsol = faraComentarii(readFileSync(join(COMPONENTE, 'Subsol.tsx'), 'utf8'))
    expect(subsol, 'subsolul nu mai sta pe ceata').toMatch(/bg-ceata/)
    // Pe ceata trec doar cerneala (16,27:1) si cerneala-2 (6,48:1).
    expect(subsol, 'text sub prag pe ceata, in subsol').not.toMatch(/text-cerneala-3|text-violet-2/)
    const banda = faraComentarii(readFileSync(join(COMPONENTE, 'BandaIncredere.tsx'), 'utf8'))
    expect(banda, 'banda de incredere nu sta pe noapte-v').toMatch(/bg-noapte-v/)
    // Tiparul cere ca dupa nume sa NU urmeze cratima: altfel `text-violet-clar`, singura
    // culoare mica permisa pe noapte-v, ar fi prinsa de `text-violet` si proba s-ar inrosi
    // exact pe forma corecta.
    expect(banda, 'pe noapte-v se scrie alb sau violet-clar, nimic altceva').not.toMatch(
      /text-(?:cerneala|violet)(?![-\w])/,
    )
    expect(banda, 'banda de incredere nu foloseste violet-clar pentru textul mic').toMatch(
      /text-violet-clar/,
    )
  })
})
