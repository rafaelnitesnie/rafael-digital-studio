import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { hero } from "../content.js";
import { ButtonLink, Icon } from "./ui.jsx";

const EASE = [0.22, 1, 0.36, 1];

function FadeUp({ delay = 0, children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Título com revelação palavra a palavra ---------- */

function TitleReveal() {
  const reduce = useReducedMotion();
  const words = hero.title.split(" ");
  const hlStart = words.length - hero.titleHighlight.split(" ").length;

  return (
    <h1 className="mt-7 text-balance text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.022em] text-white sm:text-5xl lg:text-[3.7rem]">
      {words.map((word, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom [margin-bottom:-0.14em]">
            <motion.span
              className={`inline-block ${
                i >= hlStart ? "text-gradient-word" : ""
              }`}
              initial={reduce ? false : { y: "115%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.18 + i * 0.05,
                ease: EASE,
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}

/* ---------- Peças do mockup (dashboard construído em código) ---------- */

function Kpi({ label, value, delta, positive = true }) {
  return (
    <div className="rounded-lg border border-white/6 bg-white/[0.03] p-2.5 sm:p-3">
      <p className="text-[9px] uppercase tracking-wider text-zinc-500 sm:text-[10px]">
        {label}
      </p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-sm font-semibold text-white sm:text-base">
          {value}
        </span>
        <span
          className={`text-[9px] font-medium sm:text-[10px] ${
            positive ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {delta}
        </span>
      </div>
    </div>
  );
}

function AreaChart() {
  const reduce = useReducedMotion();
  const line =
    "M0 64 C 24 58, 40 44, 62 46 S 100 30, 122 34 S 158 14, 182 18 S 216 6, 240 10";
  return (
    <svg
      viewBox="0 0 240 80"
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(56 189 248)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="rgb(56 189 248)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[16, 36, 56].map((y) => (
        <line
          key={y}
          x1="0"
          x2="240"
          y1={y}
          y2={y}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
      ))}
      <motion.path
        d={`${line} L 240 80 L 0 80 Z`}
        fill="url(#hero-area)"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 2.4 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="rgb(103 232 249)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1.9, ease: "easeOut" }}
      />
    </svg>
  );
}

function Bars() {
  const reduce = useReducedMotion();
  const bars = [38, 62, 46, 78, 58, 90, 70];
  return (
    <div className="flex h-full items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-sky-500/25 to-cyan-300/60"
          initial={reduce ? false : { height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.7, delay: 1.9 + i * 0.06, ease: EASE }}
        />
      ))}
    </div>
  );
}

function FlowNode({ label }) {
  return (
    <span className="rounded-md border border-white/8 bg-white/[0.04] px-2 py-1 text-[9px] font-medium text-zinc-300 sm:text-[10px]">
      {label}
    </span>
  );
}

function FlowLink() {
  return (
    <svg viewBox="0 0 24 8" className="h-2 w-5 shrink-0" aria-hidden="true">
      <line
        x1="0"
        y1="4"
        x2="24"
        y2="4"
        stroke="rgb(56 189 248)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

/* ---------- Montagem 3D ----------
 * Cada peça nasce "explodida" no espaço (deslocada e rotacionada em Z)
 * e voa para a posição final, como uma montagem progressiva.
 * Depois de montada, a cena inteira reage ao mouse com paralaxe 3D real
 * (as peças têm profundidades diferentes via translateZ).
 */

function Piece({ from, to = {}, delay = 0, className = "", style, children }) {
  const reduce = useReducedMotion();
  const rest = {
    x: 0,
    y: 0,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    ...to,
  };
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, ...rest, ...from }}
      animate={{ opacity: 1, ...rest }}
      transition={{ duration: 1.05, delay, ease: EASE }}
      className={className}
      style={{ transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </motion.div>
  );
}

/** Guias de "blueprint" desenhadas antes da montagem, apagadas depois. */
function Guides() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const brackets = [
    "M2 34 L2 10 Q2 2 10 2 L34 2",
    "M366 2 L390 2 Q398 2 398 10 L398 34",
    "M398 266 L398 290 Q398 298 390 298 L366 298",
    "M34 298 L10 298 Q2 298 2 290 L2 266",
  ];
  return (
    <motion.svg
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.7, duration: 0.9 }}
      aria-hidden="true"
    >
      <motion.rect
        x="1.5"
        y="1.5"
        width="397"
        height="297"
        rx="18"
        fill="none"
        stroke="rgb(103 232 249)"
        strokeOpacity="0.22"
        strokeWidth="1"
        strokeDasharray="5 9"
        vectorEffect="non-scaling-stroke"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      />
      {brackets.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="rgb(103 232 249)"
          strokeOpacity="0.65"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: EASE }}
        />
      ))}
    </motion.svg>
  );
}

function AssemblyScene() {
  const reduce = useReducedMotion();
  const [deep, setDeep] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setDeep(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), {
    stiffness: 90,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 90,
    damping: 16,
  });

  function onPointerMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  // Inclinação de repouso: a cena fica levemente em perspectiva mesmo parada.
  const baseTransform = reduce
    ? "none"
    : deep
      ? "rotateX(7deg) rotateY(-11deg) rotateZ(1.5deg)"
      : "rotateX(5deg)";

  return (
    <div
      className="relative mx-auto w-full max-w-[560px] [perspective:1600px]"
      onPointerMove={reduce || !deep ? undefined : onPointerMove}
      onPointerLeave={reduce || !deep ? undefined : onPointerLeave}
    >
      {/* brilho atrás da cena */}
      <div
        className="absolute -inset-10 rounded-[40px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_65%)] blur-2xl"
        aria-hidden="true"
      />
      {/* sombra de "chão" para ancorar o objeto no espaço */}
      <motion.div
        className="absolute -bottom-14 left-1/2 h-16 w-[72%] -translate-x-1/2 rounded-[100%] bg-black/60 blur-2xl"
        initial={reduce ? false : { opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 1.1, ease: EASE }}
        aria-hidden="true"
      />

      <motion.div
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="animate-float"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            style={{ transform: baseTransform, transformStyle: "preserve-3d" }}
          >
            <Guides />

            {/* etiqueta técnica de montagem */}
            {!reduce && (
              <motion.p
                className="pointer-events-none absolute -top-9 left-0 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-accent-300/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ delay: 0.2, duration: 2.7, times: [0, 0.12, 0.82, 1] }}
                aria-hidden="true"
              >
                <span className="h-1 w-1 rounded-full bg-accent-300" />
                montando interface — v1
              </motion.p>
            )}

            {/* casca da janela — sem overflow-hidden nem backdrop-blur
               para não achatar o espaço 3D das peças internas */}
            <Piece
              from={{ y: 90, z: -220, rotateX: 24, scale: 0.9 }}
              delay={0.3}
              className="edge-light relative rounded-2xl border border-white/10 bg-ink-900/95 shadow-[0_50px_100px_-24px_rgba(0,0,0,0.75)]"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.045] to-transparent"
                aria-hidden="true"
              />

              <div className="relative flex items-center gap-2 border-b border-white/6 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                <span className="ml-3 flex-1 rounded-md border border-white/6 bg-white/[0.03] px-3 py-1 text-[10px] text-zinc-500">
                  app.seunegocio.com.br
                </span>
              </div>

              <div
                className="flex"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* sidebar */}
                <Piece
                  from={{ x: -110, z: 140, rotateY: -32 }}
                  delay={0.75}
                  className="hidden w-32 shrink-0 flex-col gap-1 border-r border-white/6 p-3 sm:flex"
                >
                  <div className="mb-2 flex items-center gap-1.5 px-1">
                    <span className="h-4 w-4 rounded bg-gradient-to-br from-cyan-300 to-sky-500" />
                    <span className="h-1.5 w-12 rounded-full bg-white/15" />
                  </div>
                  {["w-16", "w-12", "w-14", "w-10"].map((w, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-1.5 rounded-md px-1.5 py-1.5 ${
                        i === 0 ? "bg-white/[0.06]" : ""
                      }`}
                    >
                      <span
                        className={`h-3 w-3 rounded ${
                          i === 0 ? "bg-cyan-300/70" : "bg-white/10"
                        }`}
                      />
                      <span className={`h-1.5 ${w} rounded-full bg-white/10`} />
                    </div>
                  ))}
                </Piece>

                {/* conteúdo */}
                <div
                  className="flex-1 space-y-3 p-3.5 sm:p-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Piece
                    from={{ y: -60, z: 120, rotateX: -18 }}
                    delay={0.9}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="h-2 w-24 rounded-full bg-white/20" />
                      <div className="mt-1.5 h-1.5 w-16 rounded-full bg-white/8" />
                    </div>
                    <div className="rounded-md bg-cyan-400/90 px-2.5 py-1 text-[9px] font-semibold text-ink-950">
                      Exportar
                    </div>
                  </Piece>

                  <div
                    className="grid grid-cols-3 gap-2 sm:gap-2.5"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {[
                      { label: "Leads", value: "128", delta: "+18%" },
                      { label: "Conversão", value: "4,9%", delta: "+0,8%" },
                      { label: "Resposta", value: "2min", delta: "-64%" },
                    ].map((kpi, i) => (
                      <Piece
                        key={kpi.label}
                        from={{ y: 70, z: 160, rotateX: 22 }}
                        delay={1.0 + i * 0.1}
                      >
                        <Kpi {...kpi} />
                      </Piece>
                    ))}
                  </div>

                  <div
                    className="grid grid-cols-5 gap-2 sm:gap-2.5"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Piece
                      from={{ x: -70, z: 140, rotateY: 18 }}
                      delay={1.3}
                      className="col-span-3 rounded-lg border border-white/6 bg-white/[0.02] p-2.5"
                    >
                      <p className="mb-1.5 text-[9px] uppercase tracking-wider text-zinc-500">
                        Leads por semana
                      </p>
                      <div className="h-16 sm:h-20">
                        <AreaChart />
                      </div>
                    </Piece>
                    <Piece
                      from={{ x: 80, z: 160, rotateY: -20 }}
                      delay={1.45}
                      className="col-span-2 rounded-lg border border-white/6 bg-white/[0.02] p-2.5"
                    >
                      <p className="mb-1.5 text-[9px] uppercase tracking-wider text-zinc-500">
                        Por canal
                      </p>
                      <div className="h-16 sm:h-20">
                        <Bars />
                      </div>
                    </Piece>
                  </div>
                </div>
              </div>

              {/* varredura de luz quando a montagem termina */}
              {!reduce && (
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                  aria-hidden="true"
                >
                  <motion.div
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
                    style={{ skewX: -12 }}
                    initial={{ x: "-130%" }}
                    animate={{ x: "150%" }}
                    transition={{ delay: 2.6, duration: 1.2, ease: "easeInOut" }}
                  />
                </div>
              )}
            </Piece>

            {/* card flutuante: automação (plano mais próximo) */}
            <Piece
              from={{ x: -120, y: 40, z: 260, rotateY: -28 }}
              to={{ z: 70 }}
              delay={1.75}
              className="absolute left-0 bottom-6 sm:-left-10 sm:bottom-14"
            >
              <div className="animate-float-slow rounded-xl border border-white/10 bg-ink-900/95 p-3 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-medium text-zinc-300">
                    Automação ativa
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  <FlowNode label="WhatsApp" />
                  <FlowLink />
                  <FlowNode label="Planilha" />
                  <FlowLink />
                  <FlowNode label="CRM" />
                </div>
              </div>
            </Piece>

            {/* card flutuante: lead capturado (plano mais próximo ainda) */}
            <Piece
              from={{ x: 120, y: -50, z: 300, rotateY: 28 }}
              to={{ z: 95 }}
              delay={1.95}
              className="absolute right-0 top-1 sm:-right-8 sm:top-8"
            >
              <div className="animate-float rounded-xl border border-white/10 bg-ink-900/95 px-3.5 py-2.5 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold text-white">
                      Novo lead registrado
                    </p>
                    <p className="text-[9px] text-zinc-500">
                      resposta enviada · agora
                    </p>
                  </div>
                </div>
              </div>
            </Piece>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Seção ---------- */

export default function Hero() {
  return (
    <section className="bg-noise relative overflow-hidden">
      {/* fundo: grade + brilhos com deriva lenta */}
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[840px] -translate-x-1/2 animate-drift rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.13),transparent_60%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-160px] top-1/3 h-[360px] w-[360px] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.08),transparent_65%)] blur-3xl"
        aria-hidden="true"
      />
      {/* linha de horizonte */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div>
            <FadeUp delay={0.05}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-300 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
                {hero.badge}
              </span>
            </FadeUp>

            <TitleReveal />

            <FadeUp delay={0.6}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
                {hero.subtitle}
              </p>
            </FadeUp>

            <FadeUp delay={0.72} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </FadeUp>

            <FadeUp delay={0.85}>
              <ul className="mt-10 flex flex-col gap-3 border-t border-white/6 pt-7 sm:flex-row sm:gap-7">
                {hero.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-zinc-400"
                  >
                    <Icon
                      name="check"
                      className="h-3.5 w-3.5 shrink-0 text-cyan-300"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          <AssemblyScene />
        </div>

        {/* indicador de rolagem */}
        <motion.a
          href="#servicos"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-500 transition-colors hover:text-zinc-300 lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.9, duration: 1 }}
          aria-label="Rolar para serviços"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            scroll
          </span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-white/15 pt-1.5">
            <span className="h-1.5 w-[3px] animate-scroll-dot rounded-full bg-accent-300" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
