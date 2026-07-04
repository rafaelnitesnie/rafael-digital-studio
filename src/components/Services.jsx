import { services } from "../content.js";
import { Section, SectionHeading, Icon, Reveal } from "./ui.jsx";

/* Mini-visuais decorativos por tipo de serviço */

function WireframeVisual() {
  return (
    <div
      className="pointer-events-none mt-6 rounded-t-lg border border-b-0 border-white/8 bg-white/[0.02] p-3"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between">
        <span className="h-1.5 w-10 rounded-full bg-white/15" />
        <div className="flex gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-white/8" />
          <span className="h-1.5 w-6 rounded-full bg-white/8" />
          <span className="h-1.5 w-6 rounded-full bg-cyan-300/50" />
        </div>
      </div>
      <div className="mt-4 space-y-1.5">
        <span className="block h-2.5 w-3/5 rounded-full bg-white/20" />
        <span className="block h-1.5 w-2/5 rounded-full bg-white/8" />
      </div>
      <div className="mt-3 flex gap-2">
        <span className="h-5 w-16 rounded-md bg-cyan-400/60" />
        <span className="h-5 w-16 rounded-md border border-white/10" />
      </div>
    </div>
  );
}

function FlowVisual() {
  return (
    <div
      className="pointer-events-none mt-6 flex items-center gap-0 rounded-lg border border-white/8 bg-white/[0.02] p-3"
      aria-hidden="true"
    >
      {["Gatilho", "Processa", "Registra", "Responde"].map((label, i, arr) => (
        <div key={label} className="flex flex-1 items-center">
          <span
            className={`whitespace-nowrap rounded-md border px-2 py-1.5 text-[10px] font-medium ${
              i === 0
                ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-300"
                : "border-white/8 bg-white/[0.04] text-zinc-400"
            }`}
          >
            {label}
          </span>
          {i < arr.length - 1 && (
            <svg
              viewBox="0 0 24 8"
              className="h-2 min-w-3 flex-1"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="4"
                x2="24"
                y2="4"
                stroke="rgb(56 189 248)"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="pointer-events-none mt-6 space-y-2" aria-hidden="true">
      <div className="w-fit max-w-[80%] rounded-lg rounded-bl-sm border border-white/8 bg-white/[0.04] px-2.5 py-1.5 text-[10px] text-zinc-400">
        Qual o status do pedido #482?
      </div>
      <div className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm border border-cyan-300/20 bg-cyan-400/10 px-2.5 py-1.5 text-[10px] text-cyan-200">
        Em separação — previsão de envio hoje às 16h.
      </div>
    </div>
  );
}

function MiniBars() {
  return (
    <div
      className="pointer-events-none mt-6 flex h-14 items-end gap-1.5 rounded-lg border border-white/8 bg-white/[0.02] p-2.5"
      aria-hidden="true"
    >
      {[40, 65, 50, 80, 60, 92, 72, 55].map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%` }}
          className="flex-1 rounded-sm bg-gradient-to-t from-sky-500/20 to-cyan-300/50"
        />
      ))}
    </div>
  );
}

const visuals = {
  layout: WireframeVisual,
  workflow: FlowVisual,
  spark: ChatVisual,
  chart: MiniBars,
};

// Distribuição do bento (grid de 6 colunas no desktop)
const spans = {
  layout: "lg:col-span-4",
  globe: "lg:col-span-2",
  chart: "lg:col-span-2",
  workflow: "lg:col-span-4",
  rocket: "lg:col-span-3",
  spark: "lg:col-span-3",
};

export default function Services() {
  // No desktop reordena para o bento fechar certinho; no mobile segue a ordem natural.
  const order = ["layout", "globe", "chart", "workflow", "rocket", "spark"];
  const items = [...services.items].sort(
    (a, b) => order.indexOf(a.icon) - order.indexOf(b.icon)
  );

  return (
    <Section id="servicos">
      <SectionHeading
        eyebrow={services.eyebrow}
        title={services.title}
        subtitle={services.subtitle}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {items.map((service, i) => {
          const Visual = visuals[service.icon];
          return (
            <Reveal
              key={service.title}
              delay={Math.min(i * 0.08, 0.4)}
              as="article"
              className={`surface group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.05] sm:p-7 ${
                spans[service.icon] ?? ""
              }`}
            >
              {/* brilho no hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(420px circle at 50% 0%, rgba(56,189,248,0.08), transparent 65%)",
                }}
                aria-hidden="true"
              />
              <div className="relative flex flex-1 flex-col">
                <div className="mb-5 inline-flex w-fit rounded-xl border border-white/8 bg-white/[0.04] p-2.5 text-cyan-300 transition-colors duration-300 group-hover:border-cyan-300/25 group-hover:bg-cyan-400/10">
                  <Icon name={service.icon} className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {service.description}
                </p>
                {Visual && (
                  <div className="mt-auto">
                    <Visual />
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
