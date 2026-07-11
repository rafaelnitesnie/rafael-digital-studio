// Confirmação da transação simulada — rota /demo-checkout/status.
// Status vem da query (?s=) com fallback no pedido salvo em localStorage;
// acesso direto sem pedido cai em defaults para a página nunca quebrar.
import { useMemo } from "react";
import { motion } from "motion/react";
import { Icon } from "../../components/ui.jsx";
import {
  EASE,
  product,
  statusConfig,
  brl,
  newOrderId,
  readOrder,
  DemoFrame,
  DemoIcon,
} from "./shared.jsx";

function resolveOrder() {
  const saved = readOrder();
  const fromQuery = new URLSearchParams(window.location.search).get("s");
  const status = statusConfig[fromQuery]
    ? fromQuery
    : statusConfig[saved?.status]
      ? saved.status
      : "aprovado";
  return {
    id: saved?.id ?? newOrderId(),
    status,
    methodLabel: saved?.methodLabel ?? "Pix",
    methodIcon:
      { Pix: "qr", Cartão: "card", Boleto: "barcode" }[saved?.methodLabel] ??
      "qr",
    total: saved?.total ?? product.price,
    discount: saved?.discount ?? 0,
    nome: saved?.nome || null,
    ts: saved?.ts ?? Date.now(),
  };
}

export default function StatusPage() {
  const order = useMemo(resolveOrder, []);
  const cfg = statusConfig[order.status];

  return (
    <DemoFrame
      back={{ href: "/demo-checkout", label: "Voltar ao produto" }}
      notice="Esta é uma demonstração técnica. Nenhum pagamento real foi processado."
    >
      <main className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        {/* Card principal de status */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`mt-14 rounded-2xl border p-8 text-center sm:p-10 ${cfg.ring}`}
        >
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
            className={`inline-flex h-16 w-16 items-center justify-center rounded-full border border-current/25 ${cfg.tone}`}
          >
            <DemoIcon name={cfg.icon} className="h-7 w-7" />
          </motion.span>
          <h1 className="mt-5 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {cfg.title}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
            {cfg.subtitle}
          </p>
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-zinc-500">
            <span className="rounded-md border border-white/8 bg-ink-950/40 px-2.5 py-1">
              {order.id}
            </span>
            <span className="rounded-md border border-white/8 bg-ink-950/40 px-2.5 py-1">
              {new Date(order.ts).toLocaleString("pt-BR")}
            </span>
            <span
              className={`rounded-md border border-current/20 px-2.5 py-1 font-sans font-medium ${cfg.tone}`}
            >
              {cfg.badge}
            </span>
          </div>
        </motion.div>

        {/* Detalhes do pedido */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="surface mt-5 rounded-2xl p-6 sm:p-7"
        >
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <DemoIcon name="receipt" className="h-4 w-4 text-accent-300" />
            Detalhes do pedido
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            {order.nome && (
              <div className="flex items-center justify-between">
                <dt className="text-zinc-500">Comprador</dt>
                <dd className="text-zinc-300">{order.nome}</dd>
              </div>
            )}
            <div className="flex items-center justify-between">
              <dt className="text-zinc-500">Produto</dt>
              <dd className="text-zinc-300">{product.name}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-zinc-500">Método de pagamento</dt>
              <dd className="inline-flex items-center gap-1.5 text-zinc-300">
                <DemoIcon
                  name={order.methodIcon}
                  className="h-3.5 w-3.5 text-accent-300"
                />
                {order.methodLabel}
              </dd>
            </div>
            {order.discount > 0 && (
              <div className="flex items-center justify-between text-emerald-300">
                <dt>Desconto aplicado</dt>
                <dd className="font-mono">-{brl(order.discount)}</dd>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-white/8 pt-3">
              <dt className="font-semibold text-white">Total</dt>
              <dd className="font-mono text-lg font-semibold text-white">
                {brl(order.total)}
              </dd>
            </div>
          </dl>
        </motion.div>

        {/* Próximos passos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
          className="mt-5 rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-7"
        >
          <h2 className="text-sm font-semibold text-white">
            Próximos passos (em um fluxo real)
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {cfg.nextSteps.map((step) => (
              <li
                key={step}
                className="flex items-start gap-2.5 leading-relaxed text-zinc-400"
              >
                <Icon
                  name="check"
                  className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${cfg.tone}`}
                />
                {step}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Ações */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="/demo-checkout/checkout"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-8px_rgba(56,189,248,0.45)]"
          >
            Simular nova compra
            <Icon
              name="arrow"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="/demo-checkout"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium text-zinc-300 transition-colors duration-300 hover:border-white/25 hover:text-white"
          >
            Voltar ao produto
          </a>
        </motion.div>

        <p className="mt-10 text-center text-xs text-zinc-600">
          Esta é uma demonstração técnica. Nenhum pagamento real foi processado.
        </p>
      </main>
    </DemoFrame>
  );
}
