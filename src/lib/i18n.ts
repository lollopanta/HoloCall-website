export const languages = {
  en: "EN",
  it: "IT",
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = "it";

const languageStorageKey = "holocall-language";

export const translations = {
  en: {
    hero: {
      sectionLabel: "HOLOCALL device reveal",
      siteHeaderLabel: "Site header",
      homeLabel: "HOLOCALL home",
      productSectionsLabel: "Product sections",
      languageLabel: "Language",
      nav: {
        device: "Device",
        system: "System",
        privacy: "Privacy",
        contact: "Contact",
      },
      eyebrow: "Safety and family connection for older adults",
      canvasLabel: "Scroll controlled product animation",
      frames: [
        { at: 0, title: "Product showcase", detail: "Simple product reveal" },
        {
          at: 31,
          title: "Disassembling",
          detail: "Product starts disassembling",
        },
        {
          at: 58,
          title: "Exploded view",
          detail: "Shell, glass, tablet, and cooling module",
        },
        {
          at: 132,
          title: "Reassembly",
          detail: "Precision components returning to form",
        },
      ],
    },
    page: {
      introLabel: "Project overview",
      introEyebrow: "The problem",
      introTitle:
        "Emergency response and loneliness are part of the same care gap.",
      introBody:
        "HoloCall is designed for older adults who need simple daily contact with family and faster support when something goes wrong at home.",
      stats: [
        {
          value: "24%",
          label: "of the Italian population is over 65",
          detail: "A growing group with increasing safety and care needs.",
        },
        {
          value: "30%",
          label: "of older adults live alone",
          detail:
            "Isolation raises the chance that an emergency is discovered too late.",
        },
        {
          value: "1 in 3",
          label: "older adults fall at least once per year",
          detail:
            "Fast intervention during the golden hour can reduce severe consequences.",
        },
      ],
      solutionLabel: "HoloCall system",
      solutionEyebrow: "The solution",
      solutionTitle:
        "A simple system that calls family automatically when help is needed.",
      solutionBody:
        "The necklace detects motion and falls, the Raspberry Pi coordinates the system, and the interface keeps video calls accessible with large one-touch controls.",
      components: [
        {
          title: "Smart necklace",
          body: "A wearable movement sensor detects falls and gives the older adult a physical emergency button.",
        },
        {
          title: "Central device",
          body: "A Raspberry Pi manages detection events, family contacts, and the video call experience.",
        },
        {
          title: "One-touch calls",
          body: "Large controls remove the smartphone barrier and make calling family immediate.",
        },
      ],
      emergencyTitle: "When a fall is detected, HoloCall starts the call.",
      emergencySteps: [
        "Fall detected by the necklace or button press.",
        "The central device receives the alert.",
        "A family video call starts automatically.",
      ],
      privacyLabel: "Privacy model",
      privacyEyebrow: "Private by design",
      privacyTitle: "Family communication stays direct and separated.",
      privacyBody:
        "Unlike standard communication apps, HoloCall is designed around direct peer-to-peer calls and isolated family environments, reducing dependence on large external servers.",
      privacyPoints: [
        "Direct P2P calls",
        "Isolated family spaces",
        "Less third-party data exposure",
      ],
      showcaseLabel: "Showcase section",
      showcaseEyebrow: "Prototype showcase",
      showcaseTitle: "Presented as a school project for RomeCup.",
      showcaseBody:
        "The showcase video documents the HoloCall prototype and the design choices behind the emergency and family-call experience.",
      partnersLabel: "Project partners",
      schoolLogoAlt: "School logo",
      romecupLogoAlt: "RomeCup logo",
      videoTitle: "HoloCall showcase video",
      valueLabel: "Project value",
      valueEyebrow: "Why it matters",
      valueTitle:
        "HoloCall protects without making technology feel complicated.",
      valueItems: [
        {
          title: "Safety",
          body: "Shortens emergency response time when a fall or urgent situation happens.",
        },
        {
          title: "Human connection",
          body: "Keeps regular contact with family easy, especially with children and grandchildren.",
        },
        {
          title: "Accessibility",
          body: "Replaces complex interfaces with a clear, usable experience for older adults.",
        },
      ],
      contactLabel: "Contact section",
      contactEyebrow: "In summary",
      contactTitle:
        "Technology becomes useful when it is simple enough to trust.",
      contactBody:
        "HoloCall creates a bridge between older adults and their families: an accessible system that protects during emergencies and reduces emotional distance.",
      contactAction: "Discuss the project",
    },
  },
  it: {
    hero: {
      sectionLabel: "Presentazione del dispositivo HOLOCALL",
      siteHeaderLabel: "Intestazione del sito",
      homeLabel: "Home HOLOCALL",
      productSectionsLabel: "Sezioni prodotto",
      languageLabel: "Lingua",
      nav: {
        device: "Dispositivo",
        system: "Sistema",
        privacy: "Privacy",
        contact: "Contatto",
      },
      eyebrow: "Sicurezza e connessione familiare per anziani",
      canvasLabel: "Animazione prodotto controllata dallo scorrimento",
      frames: [
        {
          at: 0,
          title: "Presentazione prodotto",
          detail: "Rivelazione semplice del prodotto",
        },
        {
          at: 31,
          title: "Scomposizione",
          detail: "Il prodotto inizia a scomporsi",
        },
        {
          at: 58,
          title: "Vista esplosa",
          detail: "Scocca, vetro, tablet e modulo di raffreddamento",
        },
        {
          at: 132,
          title: "Riassemblaggio",
          detail: "Componenti di precisione che tornano in forma",
        },
      ],
    },
    page: {
      introLabel: "Panoramica del progetto",
      introEyebrow: "Il problema",
      introTitle:
        "Emergenze e solitudine fanno parte dello stesso vuoto di assistenza.",
      introBody:
        "HoloCall è progettato per anziani che hanno bisogno di un contatto semplice con la famiglia e di un supporto più rapido quando qualcosa va storto in casa.",
      stats: [
        {
          value: "24%",
          label: "della popolazione italiana ha più di 65 anni",
          detail:
            "Una fascia in crescita, con bisogni sempre più forti di sicurezza e cura.",
        },
        {
          value: "30%",
          label: "degli anziani vive da solo",
          detail:
            "L’isolamento aumenta il rischio che un’emergenza venga scoperta troppo tardi.",
        },
        {
          value: "1 su 3",
          label: "anziani cade almeno una volta all’anno",
          detail:
            "Intervenire nella golden hour può ridurre conseguenze gravi.",
        },
      ],
      solutionLabel: "Sistema HoloCall",
      solutionEyebrow: "La soluzione",
      solutionTitle:
        "Un sistema semplice che chiama la famiglia automaticamente quando serve aiuto.",
      solutionBody:
        "La collana rileva movimento e cadute, il Raspberry Pi coordina il sistema e l’interfaccia rende le videochiamate accessibili con bottoni grandi e un solo tocco.",
      components: [
        {
          title: "Collana intelligente",
          body: "Un sensore di movimento indossabile rileva le cadute e offre un pulsante fisico di emergenza.",
        },
        {
          title: "Dispositivo centrale",
          body: "Un Raspberry Pi gestisce gli eventi, i contatti familiari e l’esperienza di videochiamata.",
        },
        {
          title: "Chiamate a un tocco",
          body: "Controlli grandi eliminano la barriera dello smartphone e rendono immediato chiamare la famiglia.",
        },
      ],
      emergencyTitle:
        "Quando viene rilevata una caduta, HoloCall avvia la chiamata.",
      emergencySteps: [
        "La collana rileva la caduta o viene premuto il pulsante.",
        "Il dispositivo centrale riceve l’avviso.",
        "La videochiamata con i familiari parte automaticamente.",
      ],
      privacyLabel: "Modello privacy",
      privacyEyebrow: "Privacy by design",
      privacyTitle: "La comunicazione familiare resta diretta e separata.",
      privacyBody:
        "A differenza delle normali app di comunicazione, HoloCall è progettato attorno a chiamate dirette peer-to-peer e ambienti familiari isolati, riducendo la dipendenza da grandi server esterni.",
      privacyPoints: [
        "Chiamate dirette P2P",
        "Spazi familiari isolati",
        "Meno esposizione a terze parti",
      ],
      showcaseLabel: "Sezione showcase",
      showcaseEyebrow: "Showcase del prototipo",
      showcaseTitle: "Presentato come progetto scolastico per RomeCup.",
      showcaseBody:
        "Il video showcase racconta il prototipo HoloCall e le scelte progettuali alla base dell’esperienza di emergenza e videochiamata familiare.",
      partnersLabel: "Partner del progetto",
      schoolLogoAlt: "Logo della scuola",
      romecupLogoAlt: "Logo RomeCup",
      videoTitle: "Video showcase HoloCall",
      valueLabel: "Valore del progetto",
      valueEyebrow: "Perché conta",
      valueTitle: "HoloCall protegge senza rendere la tecnologia complicata.",
      valueItems: [
        {
          title: "Sicurezza",
          body: "Riduce i tempi di intervento quando avviene una caduta o una situazione urgente.",
        },
        {
          title: "Connessione umana",
          body: "Mantiene semplice il contatto continuo con la famiglia, soprattutto con figli e nipoti.",
        },
        {
          title: "Accessibilità",
          body: "Sostituisce interfacce complesse con un’esperienza chiara e utilizzabile dagli anziani.",
        },
      ],
      contactLabel: "Sezione contatto",
      contactEyebrow: "In sintesi",
      contactTitle:
        "La tecnologia diventa utile quando è abbastanza semplice da essere affidabile.",
      contactBody:
        "HoloCall crea un ponte tra anziani e familiari: un sistema accessibile che protegge in caso di emergenza e riduce la distanza emotiva.",
      contactAction: "Parla del progetto",
    },
  },
} as const;

export type Translations = (typeof translations)[Language];

export function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }

  const params = new URLSearchParams(window.location.search);
  const urlLanguage = toSupportedLanguage(params.get("lang"));
  if (urlLanguage) {
    return urlLanguage;
  }

  const storedLanguage = toSupportedLanguage(
    window.localStorage.getItem(languageStorageKey)
  );
  if (storedLanguage) {
    return storedLanguage;
  }

  return defaultLanguage;
}

export function persistLanguage(language: Language) {
  window.localStorage.setItem(languageStorageKey, language);
  document.documentElement.lang = language;

  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.history.replaceState({}, "", url);
}

function toSupportedLanguage(language: string | null): Language | undefined {
  if (!language) {
    return;
  }

  const normalized = language.toLowerCase().split("-")[0];
  return normalized in languages ? (normalized as Language) : undefined;
}
