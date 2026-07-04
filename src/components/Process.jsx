import { process } from "../content.js";
import { Section, SectionHeading, Reveal } from "./ui.jsx";

export default function Process() {
  return (
    <Section id="processo" className="overflow-hidden">
      {/* linha de fundo sutil separando a seção */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />
      <SectionHeading
        eyebrow={process.eyebrow}
        title={process.title}
        subtitle={process.subtitle}
      />
      <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* trilho conectando as etapas (desktop) */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-cyan-400/40 via-white/10 to-transparent lg:block"
          aria-hidden="true"
        />
        {process.steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.number}
            delay={i * 0.12}
            className="relative"
          >
            <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/25 bg-ink-950 font-mono text-sm font-semibold text-cyan-300 shadow-[0_0_20px_-6px_rgba(56,189,248,0.4)]">
              {step.number}
            </div>
            <h3 className="mt-5 text-base font-semibold tracking-tight text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {step.description}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
