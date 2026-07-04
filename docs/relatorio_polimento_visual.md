# Relatório de Polimento Visual
**Data:** 2026-07-03

---

## 1. Seção Contato (`#contato`)

**Status:** Corrigido.

A âncora `#contato` já existia em `CTA.jsx` (`id="contato"`). O relatório anterior detectou corretamente que o link funcionava, mas o conteúdo da seção não correspondia à intenção de uma seção de contato.

**O que foi feito:**
- `src/content.js` — objeto `cta` reformulado com:
  - `eyebrow: "Contato"`
  - `title: "Vamos falar sobre o seu projeto?"`
  - `subtitle` conversacional e humano
  - `hint` discreto: "Envie uma descrição simples do que você quer construir e eu te retorno com um recorte inicial de escopo."
  - `primaryButton: { label: "Falar sobre um projeto", href: brand.contactHref }`
  - `secondaryButton: { label: "Ver tipos de entrega", href: "#tipos" }`
- `src/components/CTA.jsx` — redesenhado com dois botões (primário + secundário), eyebrow, e hint abaixo dos botões.
- Sem backend. Sem formulário real. `brand.contactHref` permanece `"#contato"` até o usuário configurar link real (WhatsApp, e-mail, etc.).

---

## 2. Mobile 375px

**Status:** Corrigido (posicionamento dos cards) + prevenção global de overflow.

**O que foi feito:**
- `src/index.css` — adicionado `overflow-x: hidden` no `body` para prevenir scroll horizontal causado por elementos decorativos que vazam sutilmente do container.
- `src/components/Hero.jsx` — cards flutuantes reposicionados no mobile:
  - Card esquerdo (automação): `absolute -left-3 bottom-14` → `absolute left-0 bottom-6` (mobile); `sm:-left-10 sm:bottom-14` mantido para ≥ 640px.
  - Card direito (lead): `absolute -right-2 -top-5` → `absolute right-0 top-1` (mobile); `sm:-right-8 sm:top-8` mantido para ≥ 640px.
- Os cards permanecem dentro dos limites do container na largura 375px, sem corte visual.
- A seção hero já tinha `overflow-hidden` que cria contexto de clip; o `overflow-x: hidden` no body é a proteção extra para blocos fora deste contexto.

**Paralaxe:** O efeito de paralaxe 3D com mouse já estava desativado no mobile/tablet (condicional `deep` só ativa em `min-width: 1024px`). O hero continua visual com apenas a leve rotação `rotateX(5deg)` em telas médias e sem transformação no mobile.

---

## 3. Reduced Motion

**Status:** Revisado. Nenhuma mudança necessária.

A implementação já estava correta:

- Todos os componentes animados usam `useReducedMotion()` do `motion/react`.
- Com `reduce = true`:
  - `initial={reduce ? false : { opacity: 0, y: 28 }}` → elementos aparecem diretamente no estado final, sem animação.
  - `TitleReveal`, `FadeUp`, `Piece`, `AreaChart`, `Bars` — todos respeitam `reduce`.
  - `Guides` retorna `null` (sem guias de montagem).
  - Labels técnicos condicionados a `!reduce`.
  - Mouse parallax desativado: `onPointerMove={reduce || !deep ? undefined : onPointerMove}`.
  - `baseTransform = "none"` quando `reduce=true` — cena fica plana e estática.
- CSS global já suprime animações: `@media (prefers-reduced-motion: reduce) { animation-duration: 0.01ms !important; }` — cobre `animate-float`, `animate-drift`, `animate-pulse-dot`, `animate-scroll-dot`.
- **Hierarquia legível com reduced motion:** todos os elementos de conteúdo aparecem em posição final sem depender de animação. A seção hero tem estrutura clara: badge → título → subtítulo → CTAs → highlights → mockup estático.

---

## 4. `@base-ui/react`

**Status:** Removido.

**Análise:** O pacote era usado apenas nos arquivos `src/components/ui/*.tsx` gerados pelo shadcn (accordion, button, badge, separator, tabs). Nenhum desses arquivos é importado por qualquer componente de página (`App.jsx`, `Hero.jsx`, etc.). O projeto usa:
- `@radix-ui/react-accordion` diretamente no `FAQ.jsx`
- `@radix-ui/react-slot` e `@radix-ui/react-tabs` como dependências transitivas do shadcn
- Os componentes reais de UI (`ButtonLink`, `Reveal`, `Icon`, etc.) estão em `src/components/ui.jsx` (sem `@base-ui`)

**Ação:** `npm uninstall @base-ui/react` — removeu 9 pacotes. Build continua passando.

---

## 5. `@theme` e `@theme inline` em `src/index.css`

**Status:** Mantido sem alterações agressivas.

**Análise:**
- `@theme { ... }` (linha 8): define tokens de design próprios do projeto — paleta `ink`/`accent`, fontes com stack completo, keyframes e aliases de animação. Estes geram utilitários Tailwind (`bg-ink-950`, `text-accent-300`, etc.).
- `@theme inline { ... }` (linha 218): define aliases que referenciamvariáveis CSS do shadcn (`--background`, `--foreground`, etc.). `@theme inline` não gera utilitários Tailwind — apenas mapeia tokens para CSS custom properties. Necessário para os componentes Radix/shadcn que usam essas variáveis.
- Conflito de `--font-sans`: definido em `@theme` com stack Geist completo e em `@theme inline` como `'Geist Variable', sans-serif`. Ambos convergem para Geist; sem impacto visual. O `@theme inline` sobrescreve na cascata por vir depois.
- Conflito de `body` entre `body { @apply bg-ink-950 }` (não-layered, linha 108) e `@layer base { body { @apply bg-background } }` (linha 334): o não-layered vence por ter maior prioridade na cascata. Site permanece escuro.
- **Risco real de mexer:** quebrar utilitários Tailwind ou tokens shadcn com reorganização prematura. Sem bug atual, sem mudança.

---

## 6. Build

**Status:** Passou sem erros.

```
vite v6.4.3 — building for production
✓ 456 modules transformed
dist/index.html          0.69 kB │ gzip: 0.41 kB
dist/assets/index.css   80.76 kB │ gzip: 13.79 kB
dist/assets/index.js   336.53 kB │ gzip: 107.69 kB
✓ built in 937ms
```

---

## Arquivos Alterados

| Arquivo | Tipo de mudança |
|---|---|
| `src/content.js` | `cta` reformulado: novo título, dois botões, hint text |
| `src/components/CTA.jsx` | Redesenhado: eyebrow, dois botões (primário + secundário), hint |
| `src/components/Hero.jsx` | Cards flutuantes: posição mobile corrigida (sem negativo em <640px) |
| `src/index.css` | `overflow-x: hidden` adicionado ao `body` |
| `package.json` | `@base-ui/react` removido |
| `package-lock.json` | Atualizado (remoção de 9 pacotes) |
| `docs/relatorio_polimento_visual.md` | Criado (este arquivo) |
