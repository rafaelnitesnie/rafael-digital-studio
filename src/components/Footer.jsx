import { brand, footer, nav } from "../content.js";
import { LogoMark } from "./ui.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-white/6">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <a href="#" className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8 text-ink-950" />
              <span className="text-[15px] font-semibold tracking-tight text-white">
                Rafael{" "}
                <span className="font-normal text-zinc-400">
                  Digital Studio
                </span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              {footer.note}
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
              Navegação
            </p>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
              Contato
            </p>
            {footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={brand.contactHref}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Falar sobre um projeto
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/6 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">{footer.copyright}</p>
          <p className="text-xs text-zinc-700">
            Projetado e construído em código — sem templates.
          </p>
        </div>
      </div>
    </footer>
  );
}
