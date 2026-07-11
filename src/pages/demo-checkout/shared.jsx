// Infra comum da demo de checkout (produto fictício, utilitários, casca).
// Autocontida de propósito: nada aqui depende do copy do site (content.js)
// para a demo continuar neutra, portável e reutilizável.
// Nenhum dado sai destas páginas — não há gateway, backend ou envio de rede.
import { useMemo } from "react";
import { Icon } from "../../components/ui.jsx";

export const EASE = [0.22, 1, 0.36, 1];

// ---------------------------------------------------------------
// Conteúdo fictício da demo
// ---------------------------------------------------------------

export const product = {
  name: "Plano Digital Pro",
  price: 49700, // centavos
  description:
    "Produto fictício usado apenas para demonstrar um fluxo de compra online.",
  headline: "Organize sua rotina digital em um único plano",
  subheadline:
    "Acesso a conteúdos, ferramentas e atualizações em uma assinatura única — tudo fictício, criado para demonstrar como uma página de venda com checkout integrado funciona.",
  benefits: [
    {
      icon: "layers",
      title: "Área de membros completa",
      description:
        "Conteúdo organizado por módulos, com progresso salvo e acesso imediato após a confirmação (fictício).",
    },
    {
      icon: "bolt",
      title: "Atualizações mensais",
      description:
        "Novos materiais e ferramentas adicionados todos os meses, sem custo extra (fictício).",
    },
    {
      icon: "message",
      title: "Suporte por e-mail",
      description:
        "Canal direto para dúvidas sobre o conteúdo, com resposta em até 2 dias úteis (fictício).",
    },
    {
      icon: "target",
      title: "Certificado de conclusão",
      description:
        "Certificado digital emitido automaticamente ao concluir os módulos (fictício).",
    },
  ],
  items: [
    "Acesso vitalício à área de membros (fictício)",
    "12 módulos com atualizações mensais (fictício)",
    "Modelos e ferramentas prontas para uso (fictício)",
    "Suporte por e-mail (fictício)",
    "Certificado digital de conclusão (fictício)",
  ],
  faq: [
    {
      q: "O acesso é imediato após o pagamento?",
      a: "Em um fluxo real, sim: o webhook do gateway confirmaria o pagamento e o acesso seria liberado automaticamente. Nesta demo, a confirmação é simulada na tela de status.",
    },
    {
      q: "Quais formas de pagamento são aceitas?",
      a: "O checkout demonstra Pix, cartão de crédito e boleto — os três métodos mais comuns no Brasil. Nenhum deles processa pagamento real nesta demonstração.",
    },
    {
      q: "Posso usar cupom de desconto?",
      a: "Sim. No checkout, o cupom DEMO10 aplica 10% de desconto sobre o valor do produto fictício.",
    },
    {
      q: "Este produto existe de verdade?",
      a: "Não. O Plano Digital Pro é um produto fictício, criado apenas para demonstrar a estrutura de uma página de venda com checkout integrado.",
    },
  ],
};

export const COUPON = { code: "DEMO10", percent: 10 };

export const methods = [
  { id: "pix", label: "Pix", icon: "qr", hint: "Aprovação em segundos" },
  { id: "cartao", label: "Cartão", icon: "card", hint: "Até 12x (fictício)" },
  { id: "boleto", label: "Boleto", icon: "barcode", hint: "Compensa em 1-2 dias" },
];

export const statusConfig = {
  aprovado: {
    title: "Pagamento aprovado na simulação",
    subtitle:
      "Em um fluxo real, o webhook do gateway confirmaria a transação e o pedido seria liberado automaticamente.",
    tone: "text-emerald-300",
    ring: "border-emerald-400/25 bg-emerald-400/5",
    dot: "bg-emerald-400",
    icon: "check",
    badge: "Aprovado",
    nextSteps: [
      "O acesso ao produto seria liberado imediatamente.",
      "Um e-mail de confirmação com o comprovante seria enviado.",
      "O pedido apareceria como pago no painel do lojista.",
    ],
  },
  pendente: {
    title: "Pagamento pendente na simulação",
    subtitle:
      "Em um fluxo real, o pedido ficaria aguardando compensação (ex.: boleto emitido ou Pix não pago) até o gateway notificar.",
    tone: "text-amber-300",
    ring: "border-amber-400/25 bg-amber-400/5",
    dot: "bg-amber-400",
    icon: "clock",
    badge: "Pendente",
    nextSteps: [
      "O sistema aguardaria a confirmação do gateway via webhook.",
      "Lembretes de pagamento poderiam ser enviados ao comprador.",
      "O pedido seria liberado automaticamente após a compensação.",
    ],
  },
  recusado: {
    title: "Pagamento recusado na simulação",
    subtitle:
      "Em um fluxo real, o gateway retornaria o motivo (saldo, dados incorretos, antifraude) e o comprador poderia tentar novamente.",
    tone: "text-red-300",
    ring: "border-red-400/25 bg-red-400/5",
    dot: "bg-red-400",
    icon: "x",
    badge: "Recusado",
    nextSteps: [
      "O comprador seria orientado a revisar os dados informados.",
      "Outro método de pagamento poderia ser oferecido na hora.",
      "Nenhuma cobrança seria efetuada no cartão.",
    ],
  },
};

export const productionSteps = [
  "O backend cria a sessão ou preferência de pagamento no gateway.",
  "O gateway recebe a transação em ambiente seguro e certificado.",
  "O usuário retorna para uma tela de confirmação do pedido.",
  "Um webhook notifica o sistema quando o pagamento é confirmado.",
  "O sistema atualiza o status do pedido automaticamente.",
  "Notificações podem ser enviadas, se fizer parte do escopo.",
];

export const gateways = ["Mercado Pago", "Pagar.me", "Stripe", "PagSeguro"];

// ---------------------------------------------------------------
// Utilitários
// ---------------------------------------------------------------

export const brl = (cents) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const maskPhone = (v) =>
  v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");

export const maskDoc = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 11) {
    return d
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return d
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
};

export const newOrderId = () =>
  `PED-DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

// Pedido simulado — vive só no navegador (localStorage), nada é enviado.
const ORDER_KEY = "demo-checkout-order";

export function saveOrder(order) {
  try {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  } catch {
    // storage indisponível (modo privado etc.) — query string cobre o status
  }
}

export function readOrder() {
  try {
    return JSON.parse(localStorage.getItem(ORDER_KEY)) ?? null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------
// Primitivas visuais da demo
// ---------------------------------------------------------------

export const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 transition-colors duration-300 focus:border-accent-400/50 focus:bg-white/[0.05] focus:outline-none";

export function Field({ label, optional = false, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-xs font-medium text-zinc-400">
        {label}
        {optional && (
          <span className="text-[10px] uppercase tracking-wider text-zinc-600">
            opcional
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

// Ícones específicos da demo (fora do set global de ui.jsx de propósito).
const demoPaths = {
  qr: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20 14h1M14 20h1M18 18h3v3h-3z" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 15h4" />
    </>
  ),
  barcode: <path d="M4 6v12M8 6v12M11 6v8M14 6v12M17 6v8M20 6v12" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  receipt: (
    <>
      <path d="M5 3h14v18l-2.3-1.5L14.4 21l-2.4-1.5L9.6 21l-2.3-1.5L5 21V3z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
};

export function DemoIcon({ name, className = "h-4 w-4" }) {
  if (demoPaths[name]) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {demoPaths[name]}
      </svg>
    );
  }
  return <Icon name={name} className={className} />;
}

// QR fictício, gerado por padrão determinístico — não codifica nada.
export function FakeQr({ className = "" }) {
  const cells = useMemo(() => {
    const grid = [];
    for (let y = 0; y < 17; y++) {
      for (let x = 0; x < 17; x++) {
        const corner =
          (x < 5 && y < 5) || (x > 11 && y < 5) || (x < 5 && y > 11);
        if (corner) continue;
        if ((x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0) grid.push([x, y]);
      }
    }
    return grid;
  }, []);
  const finder = (cx, cy) => (
    <>
      <rect
        x={cx}
        y={cy}
        width="5"
        height="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <rect x={cx + 1.5} y={cy + 1.5} width="2" height="2" />
    </>
  );
  return (
    <svg
      viewBox="0 0 17 17"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      {finder(0.5, 0.5)}
      {finder(11.5, 0.5)}
      {finder(0.5, 11.5)}
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="0.85" height="0.85" rx="0.15" />
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------
// Casca comum: topbar + aviso + footer
// ---------------------------------------------------------------

export function DemoFrame({ back, notice, children, wide = false }) {
  return (
    <div className="min-h-screen bg-ink-950 text-zinc-400">
      <header className="sticky top-0 z-40 border-b border-white/6 bg-ink-950/85 backdrop-blur">
        <div
          className={`mx-auto flex items-center justify-between px-5 py-4 sm:px-8 ${
            wide ? "max-w-6xl" : "max-w-5xl"
          }`}
        >
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent-300">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            Demo técnica
          </span>
          {back && (
            <a
              href={back.href}
              className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
            >
              ← {back.label}
            </a>
          )}
        </div>
      </header>

      <div className="border-b border-white/6 bg-white/[0.02]">
        <p
          className={`mx-auto px-5 py-2.5 text-center text-xs text-zinc-500 sm:px-8 ${
            wide ? "max-w-6xl" : "max-w-5xl"
          }`}
        >
          {notice ??
            "Esta é uma demonstração técnica. Nenhum pagamento real é processado nesta página."}
        </p>
      </div>

      {children}

      <footer className="border-t border-white/6 py-8">
        <p className="mx-auto max-w-5xl px-5 text-center text-xs text-zinc-600 sm:px-8">
          Demonstração técnica de fluxo de compra com checkout integrado. O
          produto exibido é fictício e nenhum pagamento real é processado.
        </p>
      </footer>
    </div>
  );
}
