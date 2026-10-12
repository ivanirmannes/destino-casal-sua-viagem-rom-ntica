# DestinoCasal — site institucional

Site de uma página (one-page) da **DestinoCasal**, consultoria de viagens especializada em roteiros personalizados para casais na **Itália, França e Grécia**. O objetivo do site é transformar visitantes em conversas no WhatsApp.

Todo o texto do site está em **português do Brasil**.

---

## O que o site tem

| Seção | O que faz |
| --- | --- |
| Topo fixo | Logotipo, menu por âncoras e botão de WhatsApp |
| Capa (hero) | Foto de fundo, chamada principal e dois caminhos de entrada |
| Quem somos | Apresentação + quatro números de vitrine |
| Nossos destinos | Um cartão por país, com foto, texto e regiões |
| Hotéis & passagens aéreas | Dois cartões: curadoria de hospedagem e emissão de voos |
| Agenda automatizada | Formulário que monta o agendamento e abre o WhatsApp já preenchido |
| Como funciona | As quatro etapas do atendimento |
| Chamada final + rodapé | Último convite para falar no WhatsApp |

**Não há servidor nem banco de dados.** O formulário da agenda apenas monta um link `wa.me` com o pedido de conversa escrito; quem envia é o próprio visitante, apertando "enviar" no WhatsApp.

---

## Rodando no seu computador

Pré-requisito: Node.js 20 ou mais novo.

```sh
git clone <url-deste-repositorio>
cd <nome-do-repositorio>
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (em geral `http://localhost:8080`).

### Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Serve o site com recarga automática |
| `npm test` | Roda os testes das regras de telefone e da agenda |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve a versão de produção gerada pelo build |
| `npm run lint` | Checagem de estilo e de possíveis erros |
| `npm run format` | Organiza a formatação dos arquivos |

---

## Onde mudar cada coisa

| Quero mudar… | Arquivo |
| --- | --- |
| **Número do WhatsApp** | `src/config/site.ts` (`WHATSAPP_NUMBER`) |
| Mensagem que já sai escrita nos botões | `src/config/site.ts` (`CONTACT_MESSAGE`) |
| Texto do agendamento que chega no WhatsApp | `src/lib/schedule.ts` (`buildScheduleMessage`) |
| Horários e destinos da agenda | `src/lib/schedule.ts` (`AGENDA_TIME_SLOTS`, `AGENDA_DESTINATION_OPTIONS`) |
| Textos dos três destinos | `src/data/destinations.ts` |
| Textos de hotéis e passagens | `src/data/services.ts` |
| As etapas de "Como funciona" | `src/data/steps.ts` |
| Os números de vitrine ("+200 casais") | `src/components/sections/about.tsx` (`STATS`) |
| Fotos | substitua os arquivos em `src/assets/` |
| Cores, fontes, cantos arredondados | `src/styles.css` |
| Título e descrição no Google / ao compartilhar | `src/routes/index.tsx` (bloco `head`) |

> O número precisa estar no formato internacional, só dígitos: `5548991920743`.

---

## Estrutura

```text
src/
├─ assets/            fotos usadas no site
├─ components/
│  ├─ logo.tsx        logotipo tipográfico
│  ├─ whatsapp-button.tsx
│  └─ sections/       uma pasta-arquivo por seção visível na página
│     ├─ header.tsx        hero.tsx          about.tsx
│     ├─ destinations.tsx  hotels-and-flights.tsx
│     ├─ agenda.tsx        how-it-works.tsx
│     └─ final-cta.tsx     footer.tsx
├─ config/site.ts     marca, número de WhatsApp e mensagens prontas
├─ data/              conteúdo em texto: destinations, services, steps
├─ lib/
│  ├─ whatsapp.ts     regras de telefone brasileiro e montagem do link wa.me
│  └─ schedule.ts     regras da agenda (horários, validação, mensagem)
├─ routes/
│  ├─ __root.tsx      casca do site (fontes, idioma, 404, erro)
│  └─ index.tsx       metadados + ordem das seções
├─ styles.css         tokens de design (cores, fontes, raios)
└─ test/              testes das regras de telefone e da agenda
```

### Como o agendamento funciona

1. O visitante digita nome, WhatsApp, destino, data e horário (`src/components/sections/agenda.tsx`).
2. `isAppointmentReady()` decide se o botão "Confirmar agendamento" pode ser usado.
3. `buildScheduleUrl()` escreve o pedido de conversa e monta o link `wa.me`.
4. O botão abre o WhatsApp do visitante com a mensagem pronta. Nada é salvo no site.

As regras de "que número é um WhatsApp válido" moram só em `src/lib/whatsapp.ts` e são cobertas por testes em `src/test/whatsapp.test.ts`.

---

## Convenções do código

- **Português no que o cliente vê; inglês no código.** Comentários explicam o *porquê*, não o óbvio.
- Cada seção visível é um arquivo em `src/components/sections/`; `src/routes/index.tsx` só escolhe a ordem.
- Conteúdo (textos, listas, opções) fica em `src/data` e `src/config`, nunca "escondido" dentro do JSX.
- Lógica de negócio é função pura em `src/lib` — sem React, sem DOM — para poder ser testada sozinha.
- Cores e fontes vêm dos tokens de `src/styles.css` (`bg-whatsapp`, `text-primary`, `font-display`). Evite cores fixas no componente.
- `src/components/ui/` é a biblioteca de componentes (shadcn/ui) que veio do gerador. Ela não é usada por estas telas, mas está disponível para novas peças.

---

## Testes

```sh
npm test
```

Cobrem as regras que o site não pode quebrar: máscara do telefone, o que é número válido, quando o botão da agenda libera, o texto do agendamento e o link gerado.

---

## Publicar

O projeto roda em **TanStack Start** e é empacotado com o [Lovable](https://lovable.dev).

- **Pelo Lovable:** botão *Publish* no canto superior direito do editor.
- **Pelo GitHub:** o repositório conectado a Lovable sincroniza em dois sentidos — mudanças feitas aqui aparecem no editor, e vice-versa.
- **Domínio próprio:** Lovable → Project Settings → Domains.
- **Auto-hospedagem:** o build (`npm run build`) gera um app padrão que pode ser hospedado em qualquer provedor que rode Cloudflare Workers ou Node.

### Antes de publicar, confira

- [ ] Os números de vitrine da seção "Quem somos" são reais (hoje são de demonstração).
- [ ] As fotos são as definitivas e têm autorização de uso.
- [ ] O endereço e as redes sociais da DestinoCasal estão no rodapé (hoje o rodapé traz só a assinatura).

### Uma observação sobre o WhatsApp

Dentro do preview embutido no editor, o navegador costuma **bloquear a nova aba** que o botão do WhatsApp tenta abrir — o link está certo, é o preview que impede. Teste abrindo o endereço em uma aba normal do navegador, ou no site já publicado.

---

## Tecnologia

- [TanStack Start](https://tanstack.com/start) (React 19 + Vite) — rotas e servidor
- TypeScript estrito
- Tailwind CSS v4 com tokens de design
- [lucide-react](https://lucide.dev) para os ícones
- Vitest para os testes
- Fontes: Cormorant Garamond (títulos) e Karla (texto)
