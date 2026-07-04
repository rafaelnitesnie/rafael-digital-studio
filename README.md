# Rafael Digital Studio

Site portfólio estático para propostas em plataformas freelancer e prospecção.

**Stack:** React + Vite + Tailwind CSS 4. Sem backend, sem banco de dados, sem dependências extras.

## Como rodar

```bash
npm install
npm run dev      # servidor local em http://localhost:5173
npm run build    # gera build de produção em dist/
npm run preview  # serve o build localmente para conferir
```

## Estrutura

```
src/
  content.js          ← TODOS os textos do site (edite aqui)
  App.jsx             ← ordem das seções
  index.css           ← tema, animações
  components/
    ui.jsx            ← Section, botões, ícones SVG inline
    Header.jsx  Hero.jsx  Services.jsx  Process.jsx
    DemoProjects.jsx  ProjectTypes.jsx  Pricing.jsx
    FAQ.jsx  CTA.jsx  Footer.jsx
```

## Editando o conteúdo

Todos os textos, valores e links estão em `src/content.js`. Os componentes só cuidam do layout — para mudar título, serviços, faixas de preço ou FAQ, edite apenas esse arquivo.

## Antes de publicar

1. **Link de contato:** em `src/content.js`, troque `brand.contactHref` (hoje `#contato`) pelo link real — WhatsApp (`https://wa.me/55DDDNUMERO`), e-mail (`mailto:...`) ou perfil no 99freelas. O CTA final também usa esse padrão em `cta.button.href`.
2. **Links do rodapé:** adicione GitHub/LinkedIn/99freelas no array `footer.links`.
3. **Faixas de valores:** revise `pricing.items` se quiser ajustar.

## Publicando

**Vercel:** importe o repositório — detecta Vite automaticamente. Build command `npm run build`, output `dist`.

**GitHub Pages:** o `vite.config.js` já usa `base: "./"` (caminhos relativos), então basta rodar `npm run build` e publicar a pasta `dist/` — funciona em qualquer subdiretório.
