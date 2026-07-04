import { projectTypes } from "../content.js";
import { Section, SectionHeading, Icon, Reveal } from "./ui.jsx";

const accents = {
  emerald: {
    chip: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    check: "text-emerald-400/70",
    glow: "rgba(52,211,153,0.07)",
  },
  sky: {
    chip: "border-cyan-300/25 bg-cyan-400/10 text-cyan-300",
    check: "text-cyan-300/70",
    glow: "rgba(56,189,248,0.07)",
  },
  amber: {
    chip: "border-amber-400/25 bg-amber-400/10 text-amber-300",
    check: "text-amber-400/70",
    glow: "rgba(251,191,36,0.06)",
  },
};

export default function ProjectTypes() {
  return (
    <Section id="tipos">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />
      <SectionHeading
        eyebrow={projectTypes.eyebrow}
        title={projectTypes.title}
        subtitle={projectTypes.subtitle}
      />
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
        {projectTypes.groups.map((group, i) => {
          const accent = accents[group.accent] ?? accents.sky;
          return (
            <Reveal
              as="article"
              key={group.title}
              delay={i * 0.1}
              className="surface group relative overflow-hidden rounded-2xl p-6 transition-colors duration-500 hover:border-white/15 sm:p-7"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(380px circle at 50% 0%, ${accent.glow}, transparent 65%)`,
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <div
                  className={`mb-5 inline-flex rounded-xl border p-2.5 ${accent.chip}`}
                >
                  <Icon name={group.icon} className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  {group.description}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-white/6 pt-5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-zinc-300"
                    >
                      <Icon
                        name="check"
                        className={`h-3.5 w-3.5 shrink-0 ${accent.check}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
