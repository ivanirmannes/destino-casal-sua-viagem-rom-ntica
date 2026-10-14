# DestinoCasal — site institucional

Site de uma página (one-page) da **DestinoCasal**, consultoria de viagens especializada em roteiros personalizados para casais na **Itália, França e Grécia**. O objetivo do site é transformar visitantes em conversas no WhatsApp.

Todo o texto do site está em **português do Brasil**.

---

## O que o site tem

| Seção                     | O que faz                                                          |
| ------------------------- | ------------------------------------------------------------------ |
| Topo fixo                 | Logotipo, menu por âncoras e botão de WhatsApp                     |
| Capa (hero)               | Foto de fundo, chamada principal e dois caminhos de entrada        |
| Quem somos                | Apresentação + quatro números de vitrine                           |
| Nossos destinos           | Um cartão por país, com foto, texto e regiões                      |
| Hotéis & passagens aéreas | Dois cartões: curadoria de hospedagem e emissão de voos            |
| Agenda automatizada       | Formulário que monta o agendamento e abre o WhatsApp já preenchido |
| Como funciona             | As quatro etapas do atendimento                                    |
| Chamada final + rodapé    | Último convite para falar no WhatsApp                              |

**Não há banco de dados nem reserva automática de horários.** O TanStack Start renderiza o site no servidor; o formulário da agenda apenas monta um link `wa.me` com o pedido de conversa escrito. Quem envia é o próprio visitante, apertando "enviar" no WhatsApp, e o atendimento confirma a disponibilidade.

---

## Rodando no seu computador

Pré-requisitos: **Node.js 22.12 ou mais novo** e **Bun**. O projeto usa Vite 8 e versiona `bun.lock`; mantenha esse arquivo para instalações reproduzíveis.

```sh
git clone <URL-copiada-do-botao-Code-no-GitHub>
cd <pasta-do-repositorio>
bun install --frozen-lockfile
bun run dev
```

Abra o endereço que aparecer no terminal (em geral `http://localhost:8080`).

### Scripts

| Comando           | O que faz                                                       |
| ----------------- | --------------------------------------------------------------- |
| `bun run dev`     | Serve o site com recarga automática                             |
| `bun run test`    | Roda os testes de telefone, agenda e navegação                  |
| `bun run build`   | Gera a versão de produção para o destino configurado pelo Nitro |
| `bun run preview` | Abre a prévia local da versão de produção                       |
| `bun run lint`    | Checagem de estilo e de possíveis erros                         |
| `bun run format`  | Organiza a formatação dos arquivos                              |

---

## Onde mudar cada coisa

| Quero mudar…                                   | Arquivo                                                                   |
| ---------------------------------------------- | ------------------------------------------------------------------------- |
| **Número do WhatsApp**                         | `src/config/site.ts` (`WHATSAPP_NUMBER`)                                  |
| Mensagem que já sai escrita nos botões         | `src/config/site.ts` (`CONTACT_MESSAGE`)                                  |
| Texto do agendamento que chega no WhatsApp     | `src/lib/schedule.ts` (`buildScheduleMessage`)                            |
| Horários e destinos da agenda                  | `src/lib/schedule.ts` (`AGENDA_TIME_SLOTS`, `AGENDA_DESTINATION_OPTIONS`) |
| Textos dos três destinos                       | `src/data/destinations.ts`                                                |
| Textos de hotéis e passagens                   | `src/data/services.ts`                                                    |
| As etapas de "Como funciona"                   | `src/data/steps.ts`                                                       |
| Os números de vitrine ("+200 casais")          | `src/components/sections/about.tsx` (`STATS`)                             |
| Fotos                                          | substitua os arquivos em `src/assets/`                                    |
| Cores, fontes, cantos arredondados             | `src/styles.css`                                                          |
| Título e descrição no Google / ao compartilhar | `src/routes/index.tsx` (bloco `head`)                                     |

> O número precisa estar no formato internacional, só dígitos: `5548991920743`.

---

## Estrutura

```text
src/
├─ assets/            fotos usadas no site
├─ components/
│  ├─ logo.tsx        logotipo tipográfico
│  ├─ whatsapp-button.tsx
│  └─ sections/       um arquivo por seção visível na página
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

- **Português no que o cliente vê; inglês no código.** Comentários explicam o _porquê_, não o óbvio.
- Cada seção visível é um arquivo em `src/components/sections/`; `src/routes/index.tsx` só escolhe a ordem.
- Conteúdo (textos, listas, opções) fica em `src/data` e `src/config`, nunca "escondido" dentro do JSX.
- Lógica de negócio é função pura em `src/lib` — sem React, sem DOM — para poder ser testada sozinha.
- Cores e fontes vêm dos tokens de `src/styles.css` (`bg-whatsapp`, `text-primary`, `font-display`). Evite cores fixas no componente.
- `src/components/ui/` é a biblioteca de componentes (shadcn/ui) que veio do gerador. Ela não é usada por estas telas, mas está disponível para novas peças.

---

## Testes

```sh
bun run test
```

Cobrem as regras que o site não pode quebrar: máscara do telefone, o que é número válido, quando o botão da agenda libera, o texto do agendamento e o link gerado.

---

## Publicar

O projeto roda em **TanStack Start** e é empacotado com o [Lovable](https://lovable.dev).

- **Pelo Lovable:** botão _Publish_ no canto superior direito do editor.
- **Pelo GitHub:** o repositório conectado a Lovable sincroniza em dois sentidos — mudanças feitas aqui aparecem no editor, e vice-versa.
- **Domínio próprio:** Lovable → Project Settings → Domains.
- **Auto-hospedagem:** o destino atual do Nitro é Cloudflare. Use `bun run build` e siga as instruções do provedor para esse destino; não trate o projeto como um site estático de arquivos HTML. Para Node, é necessário configurar um destino compatível antes de gerar a versão de produção.

## Correção da foto principal em telas pequenas

A foto carregava normalmente. O problema era visual: `object-cover` centralizava uma foto horizontal em uma área vertical e cortava uma das pessoas; `min-h-screen`, espaços grandes e o título de 48px também alongavam a capa em celulares pequenos.

- **`src/styles.css`:** mantém a proporção com `object-cover`, mas posiciona o foco em 35% no celular, 40% no tablet e no centro no computador. A altura mínima usa `100svh` (com alternativa `100vh`), deixando uma indicação da próxima seção quando o conteúdo cabe; não fixa a altura nem corta texto ampliado.
- **`src/components/sections/hero.tsx`:** reduz título e espaços somente em telas pequenas, organiza os botões em uma coluna e prioriza o carregamento da foto original. A camada de contraste usa tokens, sem cores fixas no componente.
- **`src/components/sections/header.tsx`:** usa duas colunas no celular, um rótulo curto no botão e mostra o menu completo a partir de 1024px, evitando comprimir o logotipo.
- **`src/components/whatsapp-button.tsx`:** reutiliza o componente de botão do projeto, preservando o contato centralizado e respeitando a preferência por movimento reduzido.

Os comentários junto à correção explicam o motivo das decisões. Ao substituir a foto, revise o ponto focal: 35% é específico desta composição. Uma imagem horizontal precisa de recorte em telas verticais; não use `object-fill`, que distorce as pessoas.

### Conferência visual

Abra o site em larguras de 320, 390, 768 e 1301px e confirme:

- A foto carrega, mantém as proporções e conserva o casal dentro do recorte.
- Logotipo e botão de contato não se encostam; os dois botões da capa estão acessíveis.
- Não existe rolagem horizontal; o conteúdo continua acessível com zoom e em paisagem.
- Os botões de contato continuam abrindo o WhatsApp com a mensagem pronta.

## Subir para o GitHub

1. No Lovable, abra a conexão **GitHub** e autorize sua conta.
2. Conecte este projeto e escolha a conta/organização para criar o repositório.
3. Confira no GitHub se `src/`, `public/`, `README.md`, `AGENTS.md`, os arquivos de configuração e `bun.lock` foram sincronizados.
4. Em outra pasta no seu computador, clone o repositório e siga as instruções de instalação acima.
5. Rode `bun run test` e `bun run lint` antes de enviar novas mudanças. No computador ou na integração contínua, rode também `bun run build` antes de publicar.

**Segurança:** `.gitignore` já exclui dependências, saídas geradas, logs, `.dev.vars` e arquivos `*.local`. Este arquivo é protegido pelo ambiente Lovable e não foi alterado nesta revisão. Antes de enviar credenciais no seu computador, acrescente `.env`, `.env.*`, `!.env.example`, `.dev.vars.*`, `.workspace/` e `coverage/` à sua cópia local; nunca inclua senhas ou chaves privadas. Ignorar um arquivo não remove segredos já enviados: nesse caso, revogue a credencial.

O contato no código é o número comercial público, intencionalmente visível no site. As fotos locais devem acompanhar o repositório. Não há licença de código aberto concedida neste projeto: confirme a licença desejada antes de autorizar reutilização pública. A conexão com sua conta e o envio ao GitHub dependem da sua autorização no Lovable; publicar o site é uma ação separada.

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
