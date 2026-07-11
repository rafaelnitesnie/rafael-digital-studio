// Checkout da demo — rota /demo-checkout/checkout.
// Wizard de 3 etapas (Dados → Pagamento → Revisão) com resumo lateral.
// Tudo roda no navegador; "Simular pagamento" só grava o pedido fictício
// em localStorage e navega para a tela de status.
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "../../components/ui.jsx";
import {
  EASE,
  product,
  COUPON,
  methods,
  statusConfig,
  brl,
  maskPhone,
  maskDoc,
  newOrderId,
  saveOrder,
  inputClass,
  Field,
  DemoFrame,
  DemoIcon,
  FakeQr,
} from "./shared.jsx";

const steps = [
  { id: 1, label: "Dados" },
  { id: 2, label: "Pagamento" },
  { id: 3, label: "Revisão" },
];

function StepIndicator({ current }) {
  return (
    <ol className="flex items-center" aria-label="Etapas do checkout">
      {steps.map((s, i) => {
        const done = current > s.id;
        const active = current === s.id;
        return (
          <li key={s.id} className="flex items-center">
            {i > 0 && (
              <span
                className={`mx-2 h-px w-6 sm:mx-3 sm:w-10 ${
                  current > i ? "bg-accent-400/60" : "bg-white/10"
                }`}
              />
            )}
            <span className="flex items-center gap-2">
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[11px] transition-colors duration-300 ${
                  done
                    ? "border-accent-400/40 bg-accent-400/15 text-accent-300"
                    : active
                      ? "border-accent-400/60 bg-accent-400/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-zinc-500"
                }`}
              >
                {done ? <Icon name="check" className="h-3 w-3" /> : s.id}
              </span>
              <span
                className={`hidden text-xs font-medium sm:block ${
                  active ? "text-white" : done ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {s.label}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function StepShell({ step, children }) {
  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function MethodPanel({ method }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={method}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="mt-4 rounded-xl border border-white/8 bg-white/[0.02] p-4"
      >
        {method === "pix" && (
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="rounded-xl border border-white/10 bg-white p-3 text-ink-950">
              <FakeQr className="h-28 w-28" />
            </div>
            <div className="min-w-0 flex-1 text-sm">
              <p className="font-medium text-zinc-200">Pix copia e cola</p>
              <p className="mt-1 leading-relaxed text-zinc-500">
                Em produção, o gateway geraria um QR Code válido com expiração.
                Este código é apenas ilustrativo:
              </p>
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/8 bg-ink-950/60 px-3 py-2">
                <code className="truncate font-mono text-[11px] text-zinc-500">
                  00020126demo0014br.gov.bcb.pix2554demo-checkout...
                </code>
                <DemoIcon
                  name="copy"
                  className="h-3.5 w-3.5 shrink-0 text-zinc-600"
                />
              </div>
            </div>
          </div>
        )}

        {method === "cartao" && (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Número do cartão (demonstração)">
                <input
                  className={`${inputClass} font-mono opacity-60`}
                  value="4242 4242 4242 4242"
                  readOnly
                  disabled
                />
              </Field>
              <Field label="Nome impresso (demonstração)">
                <input
                  className={`${inputClass} opacity-60`}
                  value="USUÁRIO DEMO"
                  readOnly
                  disabled
                />
              </Field>
              <Field label="Validade (demonstração)">
                <input
                  className={`${inputClass} font-mono opacity-60`}
                  value="12/30"
                  readOnly
                  disabled
                />
              </Field>
              <Field label="CVV (demonstração)">
                <input
                  className={`${inputClass} font-mono opacity-60`}
                  value="•••"
                  readOnly
                  disabled
                />
              </Field>
            </div>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-zinc-500">
              <DemoIcon
                name="lock"
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600"
              />
              Campos fictícios e bloqueados. Nenhum dado de cartão é digitado,
              armazenado ou enviado a qualquer gateway nesta demonstração.
            </p>
          </div>
        )}

        {method === "boleto" && (
          <div className="text-sm">
            <p className="font-medium text-zinc-200">
              Linha digitável (fictícia)
            </p>
            <div className="mt-3 rounded-lg border border-white/8 bg-ink-950/60 px-3 py-2.5">
              <code className="break-all font-mono text-[11px] leading-relaxed text-zinc-500">
                23790.00000 00000.000000 00000.000000 0 00000000049700
              </code>
            </div>
            <p className="mt-3 leading-relaxed text-zinc-500">
              Em produção, o gateway emitiria um boleto registrado com
              vencimento e a compensação seria confirmada por webhook.
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", doc: "" });
  const [touched, setTouched] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [method, setMethod] = useState("pix");
  const [result, setResult] = useState("aprovado");

  const discount = couponApplied
    ? Math.round((product.price * COUPON.percent) / 100)
    : 0;
  const total = product.price - discount;
  const methodInfo = methods.find((m) => m.id === method);

  const dataValid =
    form.nome.trim().length >= 2 && /\S+@\S+\.\S+/.test(form.email);

  const set = (key, mask) => (e) =>
    setForm((f) => ({ ...f, [key]: mask ? mask(e.target.value) : e.target.value }));

  const applyCoupon = () => {
    const ok = couponInput.trim().toUpperCase() === COUPON.code;
    setCouponApplied(ok);
    setCouponError(!ok && couponInput.trim() !== "");
  };

  const next = () => {
    if (step === 1 && !dataValid) {
      setTouched(true);
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const simulate = () => {
    const order = {
      id: newOrderId(),
      status: result,
      method,
      methodLabel: methodInfo.label,
      total,
      discount,
      couponApplied,
      nome: form.nome.trim(),
      ts: Date.now(),
    };
    saveOrder(order);
    window.location.href = `/demo-checkout/status?s=${result}`;
  };

  return (
    <DemoFrame back={{ href: "/demo-checkout", label: "Voltar ao produto" }} wide>
      <main className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="flex flex-col gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Finalizar compra
          </h1>
          <StepIndicator current={step} />
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
          {/* Coluna principal — etapas */}
          <div className="surface rounded-2xl p-6 sm:p-7">
            <AnimatePresence mode="wait" initial={false}>
              {step === 1 && (
                <StepShell step={1}>
                  <h2 className="text-sm font-semibold text-white">
                    Dados do comprador
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label="Nome completo">
                      <input
                        className={inputClass}
                        placeholder="Como no documento"
                        value={form.nome}
                        onChange={set("nome")}
                        autoComplete="off"
                      />
                    </Field>
                    <Field label="E-mail">
                      <input
                        className={inputClass}
                        type="email"
                        placeholder="voce@exemplo.com"
                        value={form.email}
                        onChange={set("email")}
                        autoComplete="off"
                      />
                    </Field>
                    <Field label="Telefone">
                      <input
                        className={inputClass}
                        inputMode="numeric"
                        placeholder="(00) 00000-0000"
                        value={form.telefone}
                        onChange={set("telefone", maskPhone)}
                        autoComplete="off"
                      />
                    </Field>
                    <Field label="CPF ou CNPJ" optional>
                      <input
                        className={inputClass}
                        inputMode="numeric"
                        placeholder="000.000.000-00"
                        value={form.doc}
                        onChange={set("doc", maskDoc)}
                        autoComplete="off"
                      />
                    </Field>
                  </div>
                  {touched && !dataValid && (
                    <p className="mt-3 text-xs text-red-300">
                      Preencha nome e um e-mail válido para continuar (podem ser
                      fictícios).
                    </p>
                  )}

                  <div className="mt-6">
                    <Field label="Cupom de desconto" optional>
                      <div className="flex gap-2">
                        <input
                          className={`${inputClass} font-mono uppercase`}
                          placeholder={COUPON.code}
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value);
                            setCouponError(false);
                          }}
                          onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                          autoComplete="off"
                        />
                        <button
                          type="button"
                          onClick={applyCoupon}
                          className="shrink-0 rounded-xl border border-white/12 bg-white/[0.03] px-4 text-sm font-medium text-zinc-200 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
                        >
                          Aplicar
                        </button>
                      </div>
                    </Field>
                    <div className="mt-1.5 min-h-4 text-xs">
                      {couponApplied && (
                        <span className="text-emerald-300">
                          Cupom {COUPON.code} aplicado: {COUPON.percent}% de
                          desconto.
                        </span>
                      )}
                      {couponError && (
                        <span className="text-red-300">
                          Cupom inválido nesta demonstração. Tente {COUPON.code}.
                        </span>
                      )}
                    </div>
                  </div>
                </StepShell>
              )}

              {step === 2 && (
                <StepShell step={2}>
                  <h2 className="text-sm font-semibold text-white">
                    Método de pagamento
                  </h2>
                  <div
                    className="mt-4 grid grid-cols-3 gap-2"
                    role="tablist"
                    aria-label="Método de pagamento"
                  >
                    {methods.map((m) => {
                      const active = method === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setMethod(m.id)}
                          className={`relative flex flex-col items-center gap-1 rounded-xl border px-3 py-3.5 transition-colors duration-300 ${
                            active
                              ? "border-accent-400/40 text-white"
                              : "border-white/8 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="method-bg"
                              className="absolute inset-0 rounded-xl bg-accent-400/10"
                              transition={{ duration: 0.3, ease: EASE }}
                            />
                          )}
                          <span className="relative flex items-center gap-2 text-sm font-medium">
                            <DemoIcon name={m.icon} className="h-4 w-4" />
                            {m.label}
                          </span>
                          <span className="relative hidden text-[10px] text-zinc-500 sm:block">
                            {m.hint}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <MethodPanel method={method} />
                </StepShell>
              )}

              {step === 3 && (
                <StepShell step={3}>
                  <h2 className="text-sm font-semibold text-white">
                    Revisão do pedido
                  </h2>
                  <dl className="mt-4 grid gap-x-6 gap-y-3 rounded-xl border border-white/8 bg-white/[0.02] p-4 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs text-zinc-600">Nome</dt>
                      <dd className="mt-0.5 text-zinc-300">{form.nome || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-600">E-mail</dt>
                      <dd className="mt-0.5 break-all text-zinc-300">
                        {form.email || "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-600">Telefone</dt>
                      <dd className="mt-0.5 text-zinc-300">
                        {form.telefone || "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-600">Método</dt>
                      <dd className="mt-0.5 inline-flex items-center gap-1.5 text-zinc-300">
                        <DemoIcon
                          name={methodInfo.icon}
                          className="h-3.5 w-3.5 text-accent-300"
                        />
                        {methodInfo.label}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    Resultado da simulação
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {Object.entries(statusConfig).map(([key, cfg]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setResult(key)}
                        aria-pressed={result === key}
                        className={`rounded-xl border px-3 py-2.5 text-sm font-medium capitalize transition-all duration-300 ${
                          result === key
                            ? `${cfg.ring} ${cfg.tone}`
                            : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-zinc-200"
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-zinc-500">
                    <DemoIcon
                      name="lock"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600"
                    />
                    Ao simular, o pedido fictício é gravado apenas no seu
                    navegador. Nada é enviado a gateway ou servidor.
                  </p>
                </StepShell>
              )}
            </AnimatePresence>

            {/* Navegação entre etapas */}
            <div className="mt-7 flex items-center justify-between border-t border-white/8 pt-5">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors duration-300 hover:border-white/25 hover:text-white"
                >
                  Voltar
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-8px_rgba(56,189,248,0.45)]"
                >
                  Continuar
                  <Icon
                    name="arrow"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={simulate}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-8px_rgba(56,189,248,0.45)]"
                >
                  Simular pagamento
                  <Icon
                    name="arrow"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Resumo lateral */}
          <aside className="surface edge-light rounded-2xl p-6 lg:sticky lg:top-24">
            <h2 className="text-sm font-semibold text-white">Resumo do pedido</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-zinc-400">{product.name}</dt>
                <dd className="font-mono text-zinc-300">{brl(product.price)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-zinc-500">Subtotal</dt>
                <dd className="font-mono text-zinc-400">{brl(product.price)}</dd>
              </div>
              {couponApplied && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between text-emerald-300"
                >
                  <dt>Desconto ({COUPON.code})</dt>
                  <dd className="font-mono">-{brl(discount)}</dd>
                </motion.div>
              )}
              <div className="flex items-center justify-between border-t border-white/8 pt-3">
                <dt className="font-semibold text-white">Total</dt>
                <dd className="font-mono text-lg font-semibold text-white">
                  {brl(total)}
                </dd>
              </div>
              <div className="flex items-center justify-between text-xs">
                <dt className="text-zinc-500">Método</dt>
                <dd className="inline-flex items-center gap-1.5 text-zinc-300">
                  <DemoIcon
                    name={methodInfo.icon}
                    className="h-3.5 w-3.5 text-accent-300"
                  />
                  {methodInfo.label}
                </dd>
              </div>
            </dl>
            <p className="mt-5 flex items-start gap-2 border-t border-white/8 pt-4 text-[11px] leading-relaxed text-zinc-600">
              <DemoIcon name="lock" className="mt-0.5 h-3 w-3 shrink-0" />
              Fluxo simulado localmente. Nenhuma informação é enviada,
              armazenada em servidor ou processada por gateway de pagamento.
            </p>
          </aside>
        </div>
      </main>
    </DemoFrame>
  );
}
