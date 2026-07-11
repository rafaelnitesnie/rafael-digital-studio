import { demoProjects } from "../content.js";
import { Section, SectionHeading, Reveal, Icon } from "./ui.jsx";

const tagIcons = {
  "Landing page": "layout",
  Dashboard: "chart",
  "Sistema simples": "layers",
  Automação: "workflow",
  Integração: "globe",
  MVP: "rocket",
};

export default function DemoProjects() {
  return (
    <Section id="projetos">
      <SectionHeading
        eyebrow={demoProjects.eyebrow}
        title={demoProjects.title}
        subtitle={demoProjects.subtitle}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {demoProjects.items.map((project, i) => (
          <Reveal
            as="article"
            key={project.title}
            delay={Math.min(i * 0.07, 0.35)}
            className="surface group flex flex-col rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-400/8 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
                <Icon
                  name={tagIcons[project.tag] ?? "layout"}
                  className="h-3 w-3"
                />
                {project.tag}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                {project.delivery}
              </span>
            </div>

            <h3 className="mt-4 text-[17px] font-semibold leading-snug tracking-tight text-white">
              {project.title}
            </h3>

            <dl className="mt-4 flex flex-1 flex-col gap-4 text-sm">
              <div className="border-l-2 border-white/8 pl-3.5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Problema
                </dt>
                <dd className="mt-1 leading-relaxed text-zinc-400">
                  {project.problem}
                </dd>
              </div>
              <div className="border-l-2 border-cyan-300/40 pl-3.5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-cyan-300/80">
                  Solução proposta
                </dt>
                <dd className="mt-1 leading-relaxed text-zinc-400">
                  {project.solution}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/6 pt-4">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-8 flex items-start gap-2.5 rounded-xl border border-white/8 bg-white/[0.02] p-4 text-sm leading-relaxed text-zinc-500">
          <Icon name="target" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
          {demoProjects.disclaimer}
        </p>
        <p className="mt-4 text-sm text-zinc-500">
          Demonstração interativa ao vivo:{" "}
          <a
            href={demoProjects.liveDemo.href}
            className="inline-flex items-center gap-1 text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent-300 hover:decoration-accent-300/40"
          >
            {demoProjects.liveDemo.label}
            <Icon name="arrow" className="h-3.5 w-3.5" />
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
