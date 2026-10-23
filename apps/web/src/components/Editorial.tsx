import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Small gold label used sparingly — a manuscript rubric, not decoration. */
export function Rubric({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-gold-dark uppercase">
      <span aria-hidden className="inline-block h-px w-8 bg-gold" />
      {children}
    </p>
  );
}

export function SectionHeading({ rubric, title, intro, href, hrefLabel }: {
  rubric: string; title: string; intro?: string; href?: string; hrefLabel?: string;
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <Rubric>{rubric}</Rubric>
          <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">{title}</h2>
          {intro && <p className="mt-3 leading-7 text-navy/65">{intro}</p>}
        </div>
        {href && hrefLabel && (
          <a href={href} className="link-sweep mb-1 text-sm font-semibold text-gold-dark">
            {hrefLabel}
          </a>
        )}
      </div>
      <div className="rule-gold mt-6" aria-hidden />
    </Reveal>
  );
}

/** Editorial opening for interior pages: rubric, display title, lede, hairline. */
export function PageOpening({ rubric, title, lede, children }: {
  rubric: string; title: ReactNode; lede?: string; children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-14 pb-4 sm:px-6 lg:pt-20">
      <Reveal>
        <Rubric>{rubric}</Rubric>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] font-medium text-navy sm:text-5xl lg:text-6xl">{title}</h1>
        {lede && <p className="mt-5 max-w-2xl text-lg leading-8 text-navy/65">{lede}</p>}
        {children}
        <div className="rule-gold mt-10" aria-hidden />
      </Reveal>
    </div>
  );
}
