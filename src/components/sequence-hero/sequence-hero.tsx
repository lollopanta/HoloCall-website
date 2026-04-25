import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";
import { FRAME_COUNT, getFrameSrc } from "../../lib/frames";
import type { Language, Translations } from "../../lib/i18n";
import "./SequenceHero.css";

gsap.registerPlugin(ScrollTrigger);

type LoadedFrame = HTMLImageElement | undefined;
type HeroCopy = Translations["hero"];

interface FrameLabel {
  readonly at: number;
  readonly detail: string;
  readonly title: string;
}

interface SequenceHeroProps {
  copy: HeroCopy;
  language: Language;
  languages: Record<Language, string>;
  onLanguageChange: (language: Language) => void;
}

export function SequenceHero({
  copy,
  language,
  languages,
  onLanguageChange,
}: SequenceHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<LoadedFrame[]>([]);
  const frameRef = useRef({ value: 0 });
  const activeTitleRef = useRef<string>(copy.frames[0].title);
  const [loaded, setLoaded] = useState(false);
  const [activeLabel, setActiveLabel] = useState<FrameLabel>(copy.frames[0]);

  const drawFrame = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const image = getLoadedFrame(imagesRef.current, frame);

    if (!(canvas && context && image)) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    context.clearRect(0, 0, width, height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    const scale = Math.min(width / image.width, height / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;

    context.drawImage(image, x, y, drawWidth, drawHeight);
  }, []);

  useEffect(() => {
    const nextLabel = getActiveLabel(
      Math.round(frameRef.current.value),
      copy.frames
    );
    activeTitleRef.current = nextLabel.title;
    setActiveLabel(nextLabel);
  }, [copy.frames]);

  useEffect(() => {
    let cancelled = false;

    const loadFrame = (frame: number) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.decoding = "async";
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = getFrameSrc(frame);
      });

    const preloadFrames = async () => {
      const concurrency = 8;
      let nextFrame = 2;

      const worker = async () => {
        while (!cancelled && nextFrame <= FRAME_COUNT) {
          const frame = nextFrame;
          nextFrame += 1;

          await loadFrame(frame)
            .then((loadedImage) => {
              imagesRef.current[frame - 1] = loadedImage;
            })
            .catch(() => undefined);
        }
      };

      await Promise.all(Array.from({ length: concurrency }, worker));
    };

    loadFrame(1).then((image) => {
      if (cancelled) {
        return;
      }
      imagesRef.current[0] = image;
      drawFrame(0);
      setLoaded(true);

      const schedule = window.requestIdleCallback || window.setTimeout;
      schedule(() => preloadFrames());
    });

    return () => {
      cancelled = true;
    };
  }, [drawFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;

    if (!(canvas && section && loaded)) {
      return;
    }

    const resize = () => drawFrame(Math.round(frameRef.current.value));
    window.addEventListener("resize", resize);

    const tween = gsap.to(frameRef.current, {
      value: FRAME_COUNT - 1,
      ease: "none",
      snap: "value",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=520%",
        scrub: 0.65,
        pin: section.querySelector(".hero-pin"),
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        const frame = Math.round(frameRef.current.value);
        const nextLabel = getActiveLabel(frame, copy.frames);

        drawFrame(frame);

        if (nextLabel.title !== activeTitleRef.current) {
          activeTitleRef.current = nextLabel.title;
          setActiveLabel(nextLabel);
        }
      },
    });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", resize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [copy.frames, drawFrame, loaded]);

  return (
    <section
      aria-label={copy.sectionLabel}
      className="sequence-hero"
      ref={sectionRef}
    >
      <div className="hero-pin">
        <div aria-hidden="true" className="hero-atmosphere" />

        <header className="hero-nav">
          <a aria-label={copy.homeLabel} className="brand" href="/">
            HOLOCALL
          </a>
          <nav aria-label={copy.productSectionsLabel}>
            <a href="#device">{copy.nav.device}</a>
            <a href="#system">{copy.nav.system}</a>
            <a href="#privacy">{copy.nav.privacy}</a>
            <a href="#contact">{copy.nav.contact}</a>
          </nav>
          <fieldset className="language-switcher">
            <legend>{copy.languageLabel}</legend>
            {(Object.keys(languages) as Language[]).map((option) => (
              <button
                aria-pressed={language === option}
                key={option}
                onClick={() => onLanguageChange(option)}
                type="button"
              >
                {languages[option]}
              </button>
            ))}
          </fieldset>
        </header>

        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>HOLOCALL</h1>
        </div>

        <canvas
          aria-label={copy.canvasLabel}
          className="sequence-canvas"
          height="720"
          ref={canvasRef}
          width="1280"
        />

        <aside aria-live="polite" className="hero-status">
          <p>{activeLabel.title}</p>
          <span>{activeLabel.detail}</span>
        </aside>
      </div>
    </section>
  );
}

function getActiveLabel(frame: number, frameLabels: readonly FrameLabel[]) {
  return frameLabels.reduce(
    (active, label) => (frame >= label.at ? label : active),
    frameLabels[0]
  );
}

function getLoadedFrame(images: LoadedFrame[], frame: number) {
  for (let index = frame; index >= 0; index -= 1) {
    if (images[index]) {
      return images[index];
    }
  }

  return images[0];
}
