// Landing do produto fictício — rota /demo-checkout.
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal, Icon } from "../../components/ui.jsx";
import {
  EASE,
  product,
  brl,
  productionSteps,
  gateways,
  DemoFrame,
  DemoIcon,
} from "./shared.jsx";

const CHECKOUT_URL = "/demo-checkout/checkout";

function CtaButton({ className = "" }) {
  return (
    <a
      href={CHECKOUT_URL}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_-8px_rgba(56,189,248,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_12px_40px_-8px_rgba(56,189,248,0.55)] ${className}`}
    >
      Continuar para checkout
      <Icon
        name="arrow"
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </a>
  );
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] transition-colors duration-300 hover:border-white/12">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-zinc-200"
      >
        {q}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="shrink-0 text-zinc-500"
        >
          <Icon name="chevron" className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-zinc-500">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <DemoFrame back={{ href: "/", label: "Voltar ao site" }}>
      <main className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        {/* Hero do produto */}
        <section className="relative pt-16 sm:pt-24">
          <div
            className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent-500/8 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-400/8 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
                <Icon name="layers" className="h-3 w-3" />
                Produto digital fictício
              </span>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl sm:leading-[1.1]">
                {product.headline}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
                {product.subheadline}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CtaButton />
                <span className="text-xs text-zinc-600">
                  Fluxo simulado · nada é cobrado
                </span>
              </div>
            </Reveal>

            {/* Card de preço */}
            <Reveal delay={0.12}>
              <div className="surface edge-light relative overflow-hidden rounded-2xl p-7">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-400/10 blur-2xl"
                  aria-hidden="true"
                />
                <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  {product.name}
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {brl(product.price)}
                  </span>
                  <span className="text-xs text-zinc-500">pagamento único</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {product.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-zinc-400">
                      <Icon
                        name="check"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-300"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-white/8 pt-5">
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="inline-flex items-center gap-1.5">
                      <DemoIcon name="qr" className="h-3.5 w-3.5" /> Pix
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <DemoIcon name="card" className="h-3.5 w-3.5" /> Cartão
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <DemoIcon name="barcode" className="h-3.5 w-3.5" /> Boleto
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Benefícios */}
        <section className="mt-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              O que você recebe
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
              Benefícios fictícios de exemplo, estruturados como em uma página
              de venda real.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {product.benefits.map((b, i) => (
              <Reveal
                key={b.title}
                delay={Math.min(i * 0.07, 0.3)}
                className="surface group rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-400/8 text-accent-300">
                  <Icon name={b.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-white">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                  {b.description}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Dúvidas rápidas */}
        <section className="mt-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Dúvidas rápidas
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {product.faq.map((f, i) => (
              <Reveal key={f.q} delay={Math.min(i * 0.05, 0.2)}>
                <FaqItem
                  q={f.q}
                  a={f.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA final + bloco de demonstração */}
        <Reveal className="mt-24">
          <div className="surface edge-light rounded-2xl p-8 text-center sm:p-10">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Pronto para testar o fluxo de compra?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
              {product.description} Nenhum valor é cobrado em nenhuma etapa.
            </p>
            <div className="mt-7 flex justify-center">
              <CtaButton />
            </div>
          </div>
        </Reveal>

        {/* Como seria em produção */}
        <Reveal className="mt-24">
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-500">
              Nota técnica
            </span>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">
              Como seria em produção
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
              Esta demonstração roda inteiramente no navegador. Em um projeto
              real, o fluxo de pagamento seguiria estas etapas:
            </p>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {productionSteps.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-sm leading-relaxed text-zinc-400"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] font-mono text-[10px] text-accent-300">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-7 border-t border-white/6 pt-5">
              <p className="text-xs text-zinc-600">
                Gateways que podem ser usados nesse tipo de integração:
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {gateways.map((g) => (
                  <span
                    key={g}
                    className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                  >
                    {g}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">
                Esta página não está conectada a nenhum gateway e não processa
                pagamentos. O produto exibido é fictício.
              </p>
            </div>
          </div>
        </Reveal>
      </main>
    </DemoFrame>
  );
}
