import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { SequenceHero } from "./components/sequence-hero/sequence-hero";
import {
  getInitialLanguage,
  type Language,
  languages,
  persistLanguage,
  translations,
} from "./lib/i18n";
import "./App.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const copy = translations[language];
  const isNextStepsPage = window.location.pathname === "/next-steps";

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.78,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    persistLanguage(language);
  }, [language]);

  if (isNextStepsPage) {
    return (
      <NextStepsPage
        copy={copy}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <main>
      <SequenceHero
        copy={copy.hero}
        language={language}
        languages={languages}
        onLanguageChange={setLanguage}
      />

      <section
        aria-label={copy.page.introLabel}
        className="intro-section content-section"
        id="device"
      >
        <div className="section-heading">
          <p className="eyebrow">{copy.page.introEyebrow}</p>
          <h2>{copy.page.introTitle}</h2>
        </div>
        <p className="section-lede">{copy.page.introBody}</p>
        <div className="stat-grid">
          {copy.page.stats.map((stat) => (
            <article className="stat-card" key={stat.value}>
              <strong>{stat.value}</strong>
              <h3>{stat.label}</h3>
              <p>{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-label={copy.page.solutionLabel}
        className="system-section content-section"
        id="system"
      >
        <div className="section-heading">
          <p className="eyebrow">{copy.page.solutionEyebrow}</p>
          <h2>{copy.page.solutionTitle}</h2>
        </div>
        <p className="section-lede">{copy.page.solutionBody}</p>

        <div className="component-grid">
          {copy.page.components.map((component, index) => (
            <article className="component-card" key={component.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{component.title}</h3>
              <p>{component.body}</p>
            </article>
          ))}
        </div>

        <div className="emergency-flow">
          <h3>{copy.page.emergencyTitle}</h3>
          <ol>
            {copy.page.emergencySteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-label={copy.page.privacyLabel}
        className="privacy-section content-section"
        id="privacy"
      >
        <div className="section-heading">
          <p className="eyebrow">{copy.page.privacyEyebrow}</p>
          <h2>{copy.page.privacyTitle}</h2>
        </div>
        <div className="privacy-copy">
          <p>{copy.page.privacyBody}</p>
          <ul>
            {copy.page.privacyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-label={copy.page.showcaseLabel}
        className="showcase-section content-section"
      >
        <div className="showcase-copy">
          <div className="section-heading">
            <p className="eyebrow">{copy.page.showcaseEyebrow}</p>
            <h2>{copy.page.showcaseTitle}</h2>
          </div>
          <p className="section-lede">{copy.page.showcaseBody}</p>
          <div className="partner-strip">
            <img
              alt={copy.page.schoolLogoAlt}
              height="300"
              src="/img/school.png"
              width="1011"
            />
            <img
              alt={copy.page.romecupLogoAlt}
              height="1313"
              src="/img/Romecup.png"
              width="2560"
            />
          </div>
        </div>
        <div className="video-frame">
          <video
            controls
            playsInline
            preload="metadata"
            src="/video/Showcase.mp4"
            title={copy.page.videoTitle}
          >
            <track
              default
              kind="captions"
              label="Italiano"
              src="/video/showcase-captions-it.vtt"
              srcLang="it"
            />
          </video>
        </div>
      </section>

      <section
        aria-label={copy.page.valueLabel}
        className="value-section content-section"
      >
        <div className="section-heading">
          <p className="eyebrow">{copy.page.valueEyebrow}</p>
          <h2>{copy.page.valueTitle}</h2>
        </div>
        <div className="value-grid">
          {copy.page.valueItems.map((item) => (
            <article className="value-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-label={copy.page.contactLabel}
        className="closing-section content-section"
        id="contact"
      >
        <p className="eyebrow">{copy.page.contactEyebrow}</p>
        <h2>{copy.page.contactTitle}</h2>
        <p>{copy.page.contactBody}</p>
        <a className="contact-link" href="mailto:hello@holocall.local">
          {copy.page.contactAction}
        </a>
        <a className="secondary-link" href="/next-steps">
          {copy.page.nextStepsAction}
        </a>
      </section>
    </main>
  );
}

interface NextStepsPageProps {
  copy: (typeof translations)[Language];
  language: Language;
  setLanguage: (language: Language) => void;
}

function NextStepsPage({ copy, language, setLanguage }: NextStepsPageProps) {
  const pageRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".next-step-card");

      gsap.from(".next-steps-hero > *", {
        autoAlpha: 0,
        y: 34,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });

      for (const card of cards) {
        gsap.from(card, {
          autoAlpha: 0,
          y: 80,
          scale: 0.96,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 78%",
            end: "bottom 58%",
            scrub: 0.55,
          },
        });
      }

      gsap.to(".roadmap-line", {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".next-steps-list",
          start: "top 70%",
          end: "bottom 42%",
          scrub: true,
        },
      });
    },
    { scope: pageRef }
  );

  return (
    <main className="next-steps-page" ref={pageRef}>
      <header className="next-steps-nav">
        <a className="brand" href="/">
          HOLOCALL
        </a>
        <nav aria-label={copy.hero.languageLabel}>
          <fieldset className="language-switcher">
            <legend>{copy.hero.languageLabel}</legend>
            {(Object.keys(languages) as Language[]).map((option) => (
              <button
                aria-pressed={language === option}
                key={option}
                onClick={() => setLanguage(option)}
                type="button"
              >
                {languages[option]}
              </button>
            ))}
          </fieldset>
        </nav>
      </header>

      <section
        aria-label={copy.nextSteps.label}
        className="next-steps-hero content-section"
      >
        <p className="eyebrow">{copy.nextSteps.eyebrow}</p>
        <h1>{copy.nextSteps.title}</h1>
        <p>{copy.nextSteps.body}</p>
      </section>

      <section className="next-steps-list content-section">
        <div aria-hidden="true" className="roadmap-line" />
        {copy.nextSteps.items.map((item) => (
          <article className="next-step-card" key={item.kicker}>
            <span>{item.kicker}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="next-steps-closing content-section">
        <p>{copy.nextSteps.closing}</p>
        <a className="contact-link" href="/">
          HOLOCALL
        </a>
      </section>
    </main>
  );
}

export default App;
