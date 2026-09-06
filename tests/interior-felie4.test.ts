import { readFileSync } from 'node:fs'
import { join, sep } from 'node:path'
import { describe, expect, it } from 'vitest'
import { COMPARATIE, INVESTITIA } from '../src/content/comparatie'
import { MOSTENIT } from '../src/content/despre'
import {
  CONTACT_INTERIOR,
  DESPRE_INTERIOR,
  INVESTITIA_INTERIOR,
} from '../src/content/interior-investitia'

/**
 * Probele feliei 4 (val S1-b): /investitia, /comparatie, /despre, /contact rescrise pe
 * gramatica paginii interioare REF-V.
 *
 * CE CLASA DE DEFECT INCHID. Rescrierea muta continutul dintr-o forma in alta - sapte randuri
 * devin trei carduri, o lista cu bife devine o banda inchisa - iar mutarea are exact un mod de
 * a esua tacut: un element ramane pe dinafara, sau ajunge in doua locuri. Nicio poarta nu
 * masoara asta. `poarta-evidenta` verifica FORMA registrului de afirmatii, `poarta-limba`
 * verifica diacriticele, `poarta-seo` verifica HTML-ul construit; niciuna nu se uita la
 * corespondenta dintre continut si asezare.
 *
 * Fisier NOU, cum cere regula valului: `tests/directia.test.ts` si `praguri-regresie.json`
 * sunt partajate si inghetate.
 */

const RADACINA = join(__dirname, '..')

function sursa(...cale: string[]) {
  return readFileSync(join(RADACINA, ...cale), 'utf8')
}

// Comentariile se scot inainte de a cauta clase: notele explica pe fata ce nu are voie sa
// existe in cod, si asta e chiar ce vrem sa ramana scris.
function faraComentarii(text: string) {
  return text.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^[ \t]*\/\/.*$/gm, '')
}

const PAGINI = [
  ['src', 'app', 'investitia', 'page.tsx'],
  ['src', 'app', 'comparatie', 'page.tsx'],
  ['src', 'app', 'despre', 'page.tsx'],
  ['src', 'app', 'contact', 'page.tsx'],
]

const COMPONENTE = [
  ['src', 'components', 'InvestitiaFactor.tsx'],
  ['src', 'components', 'InvestitieGarantii.tsx'],
  ['src', 'components', 'InvestitieRandFoto.tsx'],
  ['src', 'components', 'ComparatieTabel.tsx'],
  ['src', 'components', 'ContactDrumuri.tsx'],
]

const FISIERELE_FELIEI = [...PAGINI, ...COMPONENTE]

function relativa(cale: string[]) {
  return cale.join(sep).split(sep).join('/')
}

describe('gruparea celor sapte elemente de cost', () => {
  it('cele trei grupe acopera fiecare element exact o data', () => {
    const toti = INVESTITIA_INTERIOR.grupe.flatMap((g) => g.indici)
    expect(toti.length, 'un element a ajuns in doua grupe sau in niciuna').toBe(
      INVESTITIA.factori.length,
    )
    expect([...toti].sort((a, b) => a - b), 'indicii nu acopera multimea 0..n-1').toEqual(
      INVESTITIA.factori.map((_, i) => i),
    )
    // Si controlul: o grupare gresita TREBUIE sa pice, altfel proba de mai sus nu apara nimic.
    const stricat = [[0, 1], [2, 3], [4, 5]].flat()
    expect(stricat.length, 'martorul pozitiv nu difera de cifra corecta').not.toBe(
      INVESTITIA.factori.length,
    )
  })

  it('un singur card e inchis, ca in REF-V', () => {
    const inchise = INVESTITIA_INTERIOR.grupe.filter((g) => g.inchis)
    expect(inchise.length, 'REF-V are exact un card inchis pe rand').toBe(1)
    // Si e cel din mijloc: pe un rand de trei, cardul accentuat nu sta la capat.
    expect(INVESTITIA_INTERIOR.grupe.findIndex((g) => g.inchis)).toBe(1)
  })

  it('fiecare intrebare din acordeon are un raspuns in continutul existent', () => {
    const pagina = sursa('src', 'app', 'investitia', 'page.tsx')
    const chei = [...pagina.matchAll(/^\s{2}"?([a-z0-9-]+)"?:\s(?:I\.|INVESTITIA\.)/gm)].map(
      (m) => m[1],
    )
    expect(chei.length, 'tabelul de raspunsuri pare gol').toBeGreaterThan(3)
    const lipsa = INVESTITIA_INTERIOR.intrebari.filter((q) => !chei.includes(q.cheie))
    expect(lipsa.map((q) => q.cheie), 'intrebari fara raspuns legat').toEqual([])
  })
})

describe('faptele mostenite ajung intregi pe banda inchisa', () => {
  it('cate o eticheta pentru fiecare rand din MOSTENIT, nici una in plus', () => {
    expect(DESPRE_INTERIOR.bandaEtichete.length).toBe(MOSTENIT.length)
  })

  it('textele mostenite NU se copiaza in fisierul feliei', () => {
    // Clasa de defect: cineva rescrie faptul in fisierul feliei „ca sa incapa mai bine", si de
    // atunci exista doua versiuni ale aceluiasi fapt, care diverg la prima editare a
    // continutului. Se masoara pe primele sase cuvinte, ca sa prinda si o copie retusata.
    const felie = sursa('src', 'content', 'interior-investitia.ts')
    const copiate = MOSTENIT.filter((rand) => felie.includes(rand.split(' ').slice(0, 6).join(' ')))
    expect(copiate, 'fapt mostenit copiat in fisierul feliei').toEqual([])
    // Control pozitiv: tiparul chiar gaseste ceva cand exista.
    expect(
      MOSTENIT.filter((rand) =>
        (felie + rand).includes(rand.split(' ').slice(0, 6).join(' ')),
      ).length,
      'cautarea nu gaseste nici macar textul pe care il primeste',
    ).toBe(MOSTENIT.length)
  })
})

describe('tabelul de comparatie', () => {
  it('o singura coloana e marcata ca fiind a noastra', () => {
    const ale = COMPARATIE.coloane.filter((c) => c.aNoastra)
    expect(ale.length, 'accentul tabelului se pune o singura data').toBe(1)
    // Si e ULTIMA: pe telefon coltul de jos al cardului se rotunjeste pe ultima celula, iar
    // componenta deduce rotunjirea din pozitie.
    expect(COMPARATIE.coloane[COMPARATIE.coloane.length - 1].aNoastra).toBe(true)
  })

  it('fiecare rand are cate o celula pentru fiecare coloana', () => {
    const stricate = COMPARATIE.randuri
      .filter((r) => r.celule.length !== COMPARATIE.coloane.length)
      .map((r) => r.axa)
    expect(stricate, 'rand incomplet: componenta ar opri constructia').toEqual([])
  })

  it('tabelul sta intr-un card fara umbra si se desparte prin culoare', () => {
    const cod = faraComentarii(sursa('src', 'components', 'ComparatieTabel.tsx'))
    expect(cod, 'cardul tabelului poarta umbra').not.toMatch(/\bshadow-/)
    expect(cod, 'tabelul nu mai sta intr-un card cu raza de 16 px').toContain('rounded-card-mare')
    expect(cod, 'coloana noastra nu mai e marcata cu violet-pal').toContain('bg-violet-pal')
    // Pe telefon randul devine card: fundal de ceata plus colturi. Fara asta, „carduri
    // stivuite" ar fi ramas o intentie scrisa in comentariu.
    expect(cod, 'randul nu mai devine card pe telefon').toMatch(/rounded-t-card/)
  })
})

describe('igiena fisierelor feliei', () => {
  it('nicio clasa din paleta directiei anterioare', () => {
    // Lista e cea din `docs/design/DIRECTIA.md`, sectiunea „Reziduurile paletei vechi".
    const VECHI =
      /\b(?:hover:|group-hover:|focus:)?(?:bg|text|border|decoration|from|to|via|ring|fill|stroke|outline|divide)-(?:noapte-[23]|noapte(?![-\w])|hartie|hartie-2|hartie-veche|hartie-veche-[23]|arama|arama-clar|arama-moale|arama-inchis|verde|verde-adanc|verde-moale|tus|tus-[23]|pe-inchis|suprafata|linie-noapte|linie-suprafata|cerneala-accent)\b/g
    const abateri: string[] = []
    for (const cale of [...FISIERELE_FELIEI, ['src', 'content', 'interior-investitia.ts']]) {
      const cod = faraComentarii(sursa(...cale))
      for (const m of cod.matchAll(VECHI)) abateri.push(relativa(cale) + ': ' + m[0])
    }
    expect(abateri, 'clase din paleta veche in fisierele feliei 4').toEqual([])
    // Control pozitiv, cu toate cele trei forme, si un martor NEGATIV: `bg-noapte-v` e jeton
    // VALID din paleta noua si nu are voie sa fie prins.
    //
    // Martorul se ASAMBLEAZA la rulare, nu se scrie pe litere. Masurat: scris intreg, fisierul
    // asta raporta trei clase moarte la inventarul din `docs/design/DIRECTIA.md` - adica proba
    // devenea ea insasi o instanta a defectului pe care il vaneaza.
    const mort = (prefix: string, rol: string[]) => prefix + '-' + rol.join('-')
    const martor =
      'className="' +
      [
        mort('bg', ['noapte']),
        mort('text', ['hartie', 'veche', '2']),
        mort('border', ['linie', 'suprafata']),
      ].join(' ') +
      '"'
    expect([...martor.matchAll(VECHI)].length, 'tiparul nu prinde martorul').toBe(3)
    expect(
      [...mort('bg', ['noapte', 'v']).matchAll(VECHI)].length,
      'tiparul inghite si noapte-v',
    ).toBe(0)
  })

  it('violet-2 nu se scrie ca litera nicaieri in felie', () => {
    // 4,05:1 pe alb, sub pragul de 4,5:1 pentru text mic. E contur, hover si subliniere.
    const gasite: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      const cod = faraComentarii(sursa(...cale))
      for (const m of cod.matchAll(/\btext-violet-2\b/g)) gasite.push(relativa(cale) + ': ' + m[0])
    }
    expect(gasite, 'violet-2 folosit ca litera').toEqual([])
    expect([...'text-violet-2'.matchAll(/\btext-violet-2\b/g)].length).toBe(1)
    expect([...'decoration-violet-2'.matchAll(/\btext-violet-2\b/g)].length).toBe(0)
  })

  it('cerneala-3 nu scrie pe ceata in fisierele feliei', () => {
    // Pe `ceata` da 4,79:1 cu valoarea de azi, deci ar trece; regula ramane totusi, fiindca
    // valoarea a fost coborata o data si se poate urca la loc. Pe sectiunile de ceata ale
    // feliei se scrie `cerneala` sau `cerneala-2`.
    const gasite: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      const cod = faraComentarii(sursa(...cale))
      for (const m of cod.matchAll(/\btext-cerneala-3\b/g)) gasite.push(relativa(cale) + ': ' + m[0])
    }
    expect(gasite, 'cerneala-3 folosita in felia 4').toEqual([])
  })

  it('componentele sterse nu mai sunt importate nicaieri in felie', () => {
    const moarte = ['CardCompact', 'CardSegment', 'DespreVerb']
    const ramase: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      const cod = faraComentarii(sursa(...cale))
      for (const nume of moarte) {
        if (cod.includes('components/' + nume)) ramase.push(relativa(cale) + ': ' + nume)
      }
    }
    expect(ramase, 'import catre o componenta stearsa').toEqual([])
  })
})

describe('cardurile de contact', () => {
  it('fiecare drum are o iconita desenata in componenta', () => {
    const componenta = sursa('src', 'components', 'ContactDrumuri.tsx')
    const pagina = sursa('src', 'app', 'contact', 'page.tsx')
    const alese = [...pagina.matchAll(/iconita:\s*"([a-z]+)"/g)].map((m) => m[1])
    expect(alese.length, 'pagina de contact nu mai alege nicio iconita').toBe(3)
    for (const nume of alese) {
      expect(componenta, 'lipseste desenul iconitei ' + nume).toMatch(
        new RegExp('\\b' + nume + ':\\s*$|\\b' + nume + ':\\s*"', 'm'),
      )
    }
  })

  it('etichetele de interfata nu se termina cu punct', () => {
    // O eticheta cu punct e agramata, si a fost defect reparat in valul S1-a. Se masoara
    // etichetele, nu propozitiile: titlurile si textele lungi au punct pe drept.
    const etichete = [
      ...INVESTITIA_INTERIOR.garantii,
      INVESTITIA_INTERIOR.factoriEticheta,
      INVESTITIA_INTERIOR.discutiaEticheta,
      INVESTITIA_INTERIOR.intrebariEticheta,
      DESPRE_INTERIOR.stareaEticheta,
      DESPRE_INTERIOR.numeleEticheta,
      DESPRE_INTERIOR.limiteEticheta,
      DESPRE_INTERIOR.bandaEticheta,
      ...DESPRE_INTERIOR.bandaEtichete,
      CONTACT_INTERIOR.drumuriEticheta,
      CONTACT_INTERIOR.mesajEticheta,
      CONTACT_INTERIOR.dateleEticheta,
      ...INVESTITIA_INTERIOR.grupe.map((g) => g.eticheta),
    ]
    expect(etichete.length, 'lista de etichete pare goala').toBeGreaterThan(10)
    const cuPunct = etichete.filter((e) => e.trim().endsWith('.'))
    expect(cuPunct, 'eticheta cu punct la final').toEqual([])
    // Control: tiparul chiar prinde forma pe care o vaneaza.
    expect(['Firma-mamă.'].filter((e) => e.trim().endsWith('.')).length).toBe(1)
  })

  it('titlurile de sectiune sunt propozitii, deci au punct', () => {
    const titluri = [
      INVESTITIA_INTERIOR.factoriTitlu,
      INVESTITIA_INTERIOR.structuraTitlu,
      INVESTITIA_INTERIOR.discutiaTitlu,
      INVESTITIA_INTERIOR.intrebariTitlu,
      DESPRE_INTERIOR.stareaTitlu,
      DESPRE_INTERIOR.numeleTitlu,
      DESPRE_INTERIOR.limiteTitlu,
      DESPRE_INTERIOR.bandaTitlu,
      CONTACT_INTERIOR.drumuriTitlu,
      CONTACT_INTERIOR.mesajTitlu,
      CONTACT_INTERIOR.dateleTitlu,
    ]
    const faraPunct = titluri.filter((t) => !t.trim().endsWith('.'))
    expect(faraPunct, 'titlu de sectiune fara punct la final').toEqual([])
  })
})
