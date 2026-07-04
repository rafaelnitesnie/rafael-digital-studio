// Primitivas visuais compartilhadas: seção, títulos, botões, ícones e reveal.
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

/** Wrapper de animação de entrada ao rolar. */
export function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  className = "",
  children,
  ...props
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`relative scroll-mt-16 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/** Rótulo pequeno acima dos títulos de seção. */
export function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent-300">
      <span className="h-px w-7 bg-gradient-to-r from-accent-400/80 to-transparent" />
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <Reveal
      className={`mb-14 sm:mb-16 ${
        center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }`}
    >
      {eyebrow && (
        <div className={center ? "flex justify-center" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.7rem] lg:leading-[1.12]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

export function ButtonLink({ href, variant = "primary", children }) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400";
  const variants = {
    primary:
      "bg-white text-ink-950 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_-8px_rgba(56,189,248,0.35)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_12px_40px_-8px_rgba(56,189,248,0.55)] hover:-translate-y-0.5",
    secondary:
      "border border-white/12 bg-white/[0.03] text-zinc-200 backdrop-blur hover:border-white/25 hover:bg-white/[0.06] hover:text-white",
  };
  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {children}
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </a>
  );
}

const paths = {
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  workflow: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15v3M12 10v8M17 6v12" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 15c4-4 5-8 5-11-3 0-7 1-11 5l-3 3 6 6 3-3z" />
      <path d="M6 15l-2 5 5-2" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </>
  ),
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.1 8.1 20 20M8.1 15.9 20 4" />
    </>
  ),
  check: <path d="m4 12 5 5L20 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  arrow: <path d="M4 12h16M14 6l6 6-6 6" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  message: (
    <path d="M21 12a8 8 0 0 1-8 8H4l2.5-3A8 8 0 1 1 21 12z" />
  ),
};

export function Icon({ name, className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/** Monograma da marca. */
export function LogoMark({ className = "h-8 w-8" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[10px] bg-gradient-to-br from-accent-300 via-accent-400 to-sky-600 font-bold text-ink-950 shadow-[0_4px_16px_-4px_rgba(56,189,248,0.5)] ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[55%] w-[55%]">
        <path
          d="M7 19V5h6a4 4 0 0 1 1.8 7.6L18.5 19h-3.4l-3-5.4H10V19H7z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
