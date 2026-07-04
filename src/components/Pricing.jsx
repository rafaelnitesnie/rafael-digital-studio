import { pricing } from "../content.js";
import { Section, SectionHeading, Reveal, Icon } from "./ui.jsx";

export default function Pricing() {
  return (
    <Section id="faixas">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow={pricing.eyebrow}
            title={pricing.title}
            subtitle={pricing.subtitle}
          />
          <Reveal delay={0.1} className="-mt-6 lg:-mt-8">
            <p className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-500">
              <Icon
                name="target"
                className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600"
              />
              {pricing.disclaimer}
            </p>
          </Reveal>
        </div>

        <Reveal className="surface edge-light overflow-hidden rounded-2xl">
          <ul className="divide-y divide-white/6">
            {pricing.items.map((item, i) => (
              <li
                key={item.label}
                className="group flex items-center justify-between gap-4 px-5 py-5 transition-colors duration-300 hover:bg-white/[0.03] sm:px-7"
              >
                <div className="flex items-center gap-4">
                  <span className="hidden font-mono text-[11px] text-zinc-600 sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium text-zinc-200 transition-colors group-hover:text-white">
                    {item.label}
                  </span>
                </div>
                <span className="shrink-0 whitespace-nowrap font-mono text-sm font-semibold text-cyan-300 sm:text-[15px]">
                  {item.range}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
