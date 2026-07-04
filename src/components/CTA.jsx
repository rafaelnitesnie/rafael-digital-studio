import { cta } from "../content.js";
import { ButtonLink, Reveal } from "./ui.jsx";

export default function CTA() {
  return (
    <section id="contato" className="scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="bg-noise edge-light relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 px-6 py-20 text-center sm:px-16 sm:py-24">
          <div
            className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_100%,black,transparent)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 left-1/2 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.16),transparent_60%)] blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
              {cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-zinc-400 sm:text-lg">
              {cta.subtitle}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href={cta.button.href}>{cta.button.label}</ButtonLink>
            </div>
            <p className="mt-6 text-xs text-zinc-600">
              Resposta em até 1 dia útil · primeira conversa sem compromisso
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
