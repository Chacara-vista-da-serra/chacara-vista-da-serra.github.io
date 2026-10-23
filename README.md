# Chácara Vista da Serra

Landing page de locação da Chácara Vista da Serra (Congonhas - MG).

**Site:** https://chacara-vista-da-serra.github.io/

Stack: React + TypeScript + Vite, CSS próprio, ícones Lucide. Site 100% estático, sem backend.

## O que editar

Tudo fica em **`src/config/site.ts`**:

| O quê | Onde |
| --- | --- |
| Número do WhatsApp | `WHATSAPP_NUMBER` (somente dígitos: 55 + DDD + número) |
| Telefone exibido | `PHONE_DISPLAY` |
| Textos principais | `TEXTS` |
| Estrutura do espaço | `AMENITIES` |
| Sugestões de uso | `EXPERIENCES` |
| Perguntas frequentes | `FAQ` |
| Fotos da galeria | `PHOTOS` |
| Fotos de destaque (capa etc.) | `FEATURE_PHOTOS` |

### Fotos

Ficam em `public/fotos/`, cada uma em dois tamanhos:

- `nome.webp` (até 1600 px)
- `nome-800.webp` (até 800 px)

Para **trocar** uma foto, substitua os dois arquivos mantendo o nome.
Para **adicionar**, coloque os dois arquivos na pasta e inclua um item em `PHOTOS`.
Se uma foto faltar, o site mostra um aviso discreto no lugar, sem quebrar.

A imagem de compartilhamento (WhatsApp, redes sociais) é `public/og-image.jpg` (1200×630).

## Comandos

```bash
npm install      # instalar dependências
npm run dev      # rodar localmente
npm test         # testes de datas e WhatsApp
npm run lint     # verificação de código
npm run build    # gerar a versão de produção em dist/
```

## Publicação

Para publicar uma nova versão no GitHub Pages:

```bash
npm run deploy
```

O comando roda lint, testes e build, e envia a pasta `dist/` para a branch `gh-pages`.
O código-fonte fica na branch `main`.

Se mudar para um domínio próprio, atualize o endereço em `index.html`, `public/robots.txt`, `public/sitemap.xml` e `SITE.url`.
