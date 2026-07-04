import * as Accordion from "@radix-ui/react-accordion";
import { faq } from "../content.js";
import { Section, SectionHeading, Icon, Reveal } from "./ui.jsx";

export default function FAQ() {
  return (
    <Section id="faq">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />
      <SectionHeading eyebrow={faq.eyebrow} title={faq.title} center />
      <Reveal className="mx-auto max-w-3xl">
        <Accordion.Root
          type="single"
          collapsible
          className="surface edge-light divide-y divide-white/6 overflow-hidden rounded-2xl"
        >
          {faq.items.map((item, i) => (
            <Accordion.Item key={item.question} value={`item-${i}`}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.02] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-400 sm:px-7 sm:text-base">
                  {item.question}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all duration-300 group-hover:border-white/20 group-hover:text-white group-data-[state=open]:rotate-180 group-data-[state=open]:border-cyan-300/30 group-data-[state=open]:text-cyan-300">
                    <Icon name="chevron" className="h-3.5 w-3.5" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="px-5 pb-6 text-sm leading-relaxed text-zinc-400 sm:px-7 sm:text-[15px]">
                  {item.answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Reveal>
    </Section>
  );
}
