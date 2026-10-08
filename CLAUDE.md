# CLAUDE.md — contexto do projeto "Site do TrAce"

Este arquivo existe para que quem for mexer no site (principalmente o Claude Code) tenha todo o contexto do que foi
decidido, por quê, e o que ainda está pendente. Leia inteiro antes de alterar qualquer coisa. Se mudar decisões
importantes, **atualize este arquivo no mesmo trabalho**.

---

## 1. O que é o projeto

- Site do **TrAce (Tradução e Acessibilidade)**, grupo de pesquisa do Instituto de Letras da UFBA (Salvador, BA).
- Funciona como **banco de projetos, produções (artigos, capítulos, TCCs, dissertações, videolivros) e membros** do grupo.
- Feito com **Jekyll** (site estático), pensado para ser publicado no **GitHub Pages**.
- O site antigo era HTML + CSS + JavaScript puros, com dados em JSON, cabeçalho e rodapé copiados em todas as páginas,
  listas montadas por JavaScript e um CSS de 140 KB. Foi refeito do zero neste pacote (o site antigo não está no repositório).

### Quem pede as mudanças
- Pessoa do grupo, **sem experiência em desenvolvimento web**. Escreve em **português do Brasil**.
- **Explique tudo de forma simples**, passo a passo, sem jargão. Diga o que mudou e como conferir.
- Gosta de ver o resultado e aprovar o visual. Para mudanças visuais grandes, mostre antes (captura de tela ou
  pré-visualização) e peça confirmação quando houver mais de um caminho razoável.
- Se algo der erro, prefira explicar em linguagem simples e dizer exatamente o que ela precisa copiar/colar.

### Onde o site está
- Repositório de teste no GitHub: **`site-trace-teste`** (público). Endereço esperado:
  `https://<usuario>.github.io/site-trace-teste/`.
- `_config.yml` está com `baseurl: "/site-trace-teste"`. **Se o repositório mudar de nome ou ganhar domínio próprio, trocar
  o `baseurl`** (vazio `""` para `usuario.github.io` ou domínio próprio).
- Publicação: Settings → Pages → "Deploy from a branch" → `main` → `/ (root)`. O GitHub roda o Jekyll sozinho.
  Erros de build aparecem na aba Actions. **A pessoa liberou a publicação na `main` em 07/10** (e a branch `backup-main-antes-da-atualizacao` guarda a `main` antiga). **Autorização permanente (07/10, "pode sempre publicar"): depois de conferir a mudança, pode publicar na `main` sem perguntar de novo.** Trabalhar na branch `claude/loving-cannon-31788f`, enviar a branch e **depois** a `main` em comandos separados, e sempre avisar a pessoa do que foi publicado e para conferir a aba Actions. **Quando for publicar, envie a `main` num `git push` separado** (`git push origin HEAD:main`); mandar a branch e a `main` juntas no mesmo comando fez o GitHub não rodar o build do Pages (visto na aba Actions).

---

## 2. Regras de ouro (o que a pessoa pediu e não pode ser desrespeitado)

> **Atualização (07/10):** a pessoa disse "em relação a textos e imagens: ignore isso por enquanto. Tudo isso é placeholder." Ou seja: **não avisar mais sobre conteúdo provisório** (Lorem ipsum, capas, fotos genéricas, carrossel repetido) nem condicionar o design a isso. Mesmo assim, não reescrever os textos que o grupo já escreveu.

1. **Não gerar texto de conteúdo nem imagens.** Os textos e as imagens são do grupo. O **"Lorem ipsum" é placeholder
   intencional**: não remover, não reescrever. Textos de interface mínimos (rótulos de botões, títulos de seção) são ok.
2. **Não corrigir os textos do grupo por conta própria** (mesmo com erros de digitação). Avise a pessoa e deixe ela decidir.
   Erros conhecidos: "Prince Lindworm" e "século XIX é originalmente" (projeto Lindworm), "Liguagem Fácil" (membros).
3. **Razoavelmente leve, mas a beleza vem primeiro.** (Esclarecido pela pessoa em 07/10: "acessível e leve" é a proposta, **não para seguir ao extremo**.) Sem frameworks pesados, sem scripts de terceiros/CDN, fontes e imagens no próprio site, páginas que carregam bem. Mas **pode** usar mais imagens, fontes extras, ilustrações em SVG, formas, camadas e mais cor quando isso deixar o site mais bonito: não cortar um visual melhor só para economizar uns KB. (Última medição antiga: início ~200 KB; hoje mais.)
4. **Acessível: nível WCAG AA no mínimo** (contraste 4,5:1 no texto e 3:1 em bordas/ícones, foco visível, teclado, leitor de tela, `alt`, reflow). **Não é preciso chegar ao AAA nem esvaziar o design** por causa disso; AA é o piso, não o teto do cuidado. Ver seção 6.
5. **O objetivo de design: site BONITO, MODERNO e ESTILOSO, com personalidade** (prioridade máxima, dita pela pessoa em 07/10). Não precisa ter visual acadêmico nem ser contido: a pessoa acha o site atual "enxuto, sem vida, pouco atraente" e quer mais impacto visual. Ainda valem: evitar clichês de template genérico (gradiente roxo padrão, emojis decorativos). Ela rejeitou, até agora: a divisão da inicial em faixas de cores diferentes, formas geométricas no fundo da inicial, busca solta no meio da página, informação demais na mesma tela, e a página de teste `/inicio-novo/` ("ficou pior": layout minimalista de 3 blocos).
6. **Sem animações quando a página abre** (foi pedido explicitamente para tirar). Só pequenas transições ao passar o mouse e
   o aparecer suave dos submenus. Tudo isso é desligado pela opção "Menos movimento" e por `prefers-reduced-motion`.
7. **O site é sempre claro por padrão**, mesmo se o aparelho estiver em modo escuro. O tema escuro é **opcional**, pelo painel
   "Acessibilidade". (Antes ele seguia o aparelho e a pessoa estranhou o fundo escuro.)

---

## 3. Estrutura de arquivos

```
_config.yml            título, baseurl, coleções, formulário, redes sociais, textos do rodapé, exclude
Gemfile                gem "github-pages" (mesmo Jekyll do GitHub Pages) + webrick
index.html             página inicial          quem-somos.md   Sobre nós
membros.html           membros                 projetos.html   lista de projetos (com filtros)
producoes.html         lista de produções      contato.html    formulário (demonstrativo)
busca.html             busca (usa search.json) 404.html        página de erro
search.json            índice de busca (gerado pelo Jekyll)
_projetos/*.md         1 arquivo por projeto (coleção "projetos")
_producoes/*.md        1 arquivo por produção (coleção "producoes")
_data/membros.yml      pessoas (categoria: orientacao | membros | consultoria)
_data/egressos.yml     nomes de egressos
_data/galeria_grupo.yml fotos da galeria de "Quem somos"
_data/navegacao.yml    menu principal (com submenus)
_data/imagens.yml      índice das imagens otimizadas (largura/altura/tamanhos) — gerado por ferramentas/otimizar-imagens.py
_layouts/              default, pagina, projeto, producao
_includes/             head, header, footer, topo, img, galeria, video, projeto-item, producao-item,
                       pessoa, contatos-pessoa, icones, icone-tipo, carrossel
assets/css/main.css    TODO o CSS (cerca de 40 KB, organizado em 10 seções)
assets/js/main.js      TODO o JavaScript (vanilla, sem dependências)
assets/img/            imagens em WebP, várias larguras (ex.: projetos/lindworm-capa-480.webp, -960, -1600)
assets/fonts/          Poppins (400, 500, 700) em .woff + LICENSE-fontes.txt
assets/docs/           placeholder-projeto.pdf
ferramentas/otimizar-imagens.py   gera as versões WebP e cadastra em _data/imagens.yml
README.md              guia de uso para a pessoa do grupo
TUTORIAL-GITHUB.md     passo a passo para publicar
CLAUDE.md              este arquivo
```

`README.md`, `TUTORIAL-GITHUB.md`, `CLAUDE.md`, `ferramentas/` etc. estão em `exclude:` no `_config.yml` para não irem ao site.

---

## 4. Como o conteúdo funciona

### Projetos (`_projetos/*.md`)
Campos do front matter: `title`, `subtitulo`, `resumo` (usado em listas), `ano` (número ou texto, ex.: "Em breve"),
`situacao`, `temas` (lista), `ordem` (número; **obrigatório**, define a ordem), `destaque` (true = aparece na página inicial),
`imagem` (capa das listas), `capa` + `capa_alt` (imagem do cabeçalho da página), `ficha` (lista de `rotulo`/`valor`),
`galeria` (lista de `imagem`/`alt`/`legenda`), `video` (só o código do YouTube; vazio = esconde a seção),
`pdf` (caminho do PDF; botão na ficha) (cada versão LLA tem o seu `pdf` no próprio arquivo), `equipe` (lista de `nome`/`texto`/`foto`/`alt`). O corpo do arquivo é o texto de "Sobre o projeto".
Os nomes de imagem são **sem tamanho e sem `.webp`** (ex.: `projetos/lindworm-capa`).

### Produções (`_producoes/*.md`)
`title`, `tipo` (Artigo, Capítulo, TCC, Dissertação, Videolivro...), `ano` (número), `projeto` (**tem que ser igual ao `title`
de um projeto** para a produção aparecer na página dele e ganhar link; se não existir projeto com esse título, só mostra o texto),
`autoria`, `resumo`, `citacao`, `palavras_chave`, `pdf` (opcional; caminho do PDF; se existir, aparece o botão "Baixar PDF" no fim da ficha bibliográfica). O corpo é o resumo.

### Membros (`_data/membros.yml`)
`nome`, `categoria`, `funcao`, `areas`, `foto`, `email`, `lattes`, `linkedin`, opcional `bio`. Campos vazios (`""`) não aparecem.
Há comentários marcando quem usa foto genérica.

### Menu (`_data/navegacao.yml`)
Itens com `titulo`, `url`, `tema`, `secao` (prefixos que deixam o item marcado como "página atual"), `filhos` (submenu fixo)
ou `auto: projetos` (submenu que lista os projetos sozinho, na ordem de `ordem`).

### Imagens
Sempre via `{% include img.html nome="grupo/nome" alt="..." sizes="..." %}`: gera `<img>` com `srcset`, `width`/`height`
(evita "pulos" de layout), `loading="lazy"` (ou `eager=true` para a imagem principal da página) e `decoding="async"`.
Para imagem nova: `python3 ferramentas/otimizar-imagens.py foto.jpg grupo/nome 480,960,1600` (precisa de pillow e pyyaml).
Nas listas/cartões, a imagem é decorativa (`alt=""`) porque o título está ao lado.

---

## 5. Design (decisões e motivos)

### Tipografia
- **Poppins** (400/500/700), hospedada em `assets/fonts/` (subconjunto latino, ~9 KB cada). Foi escolhida porque a pessoa pediu
  uma fonte "mais arredondada". A Poppins é redonda, mas não tem pontas arredondadas de verdade.
- **Nunito** (realmente arredondada, a que o site antigo pedia) **não foi incluída por falta de internet** na época. O `main.css`
  já tem o `@font-face` comentado e a pilha `--texto` já lista "Nunito" primeiro. Para ativar: baixar a Nunito (OFL), converter
  para `.woff2`, salvar como `assets/fonts/nunito.woff2` e descomentar. **Se tiver acesso à internet, vale oferecer isso.**
- Botão "Fonte de leitura" do painel: usa **Atkinson Hyperlegible** (feita para baixa visão; `assets/fonts/atkinson-hyperlegible-400.woff2` e `-700.woff2`, ~17 KB cada, SIL OFL, licença em `assets/fonts/LICENSE-Atkinson.txt`), hospedada no site e **baixada só quando a opção está ligada**; senão Verdana/Tahoma. (A "Atkinson Hyperlegible Next" não foi usada.)
- Histórico: já tentamos Lora+Carlito e Lora sozinha; a pessoa não gostou. Não voltar para serifa sem perguntar.

### Cores — **cada página tem a sua cor, mas o fundo é um só**
| Página | Cor | tokens (`--f`, `--i`, `--s`, `--b`) |
|---|---|---|
| Início, Busca, 404 | verde-azulado | `inicio` |
| Sobre nós | rosa framboesa (antes dourado; ficava parecido com o fundo creme) | `sobre` |
| Membros | verde pastel (os **cartões** de pessoas têm cor própria: violeta/azul) | `membros` |
| Projetos (e cada projeto) | **azul-índigo** (`#4a56c4`; 07/10: o azul antigo, acinzentado, não agradou; ajustado também no tema escuro e no alto contraste) | `projetos` |
| Produções (e cada produção) | roxo | `producoes` |
| Contato | laranja queimado (antes terracota, parecido com o fundo creme) | `contato` |

- Definidas no começo de `main.css` (seção 2). Para cada tema: `--f-x` botões/bordas (texto branco ≥ 5:1), `--i-x` texto e links
  (≥ 8:1 no branco), `--s-x` fundo suave de etiquetas, `--b-x` faixa do topo (tom pastel mais forte).
- **Fundo único** (decisão nova, substitui "fundo pastel por página"): todas as páginas usam `--fundo` (**areia (cinza quente) `#f6f3ee`**, com degradê
  vertical bem leve até `--fundo-2` `#efebe4`; histórico: creme `#fff8e5` → névoa azulada `#eef3f7` → areia, sempre a pedido da pessoa; opções vistas e não escolhidas: branco, menta pálida, lavanda). Tema escuro: `#121f20`; alto contraste: branco/preto puro. As variáveis `--g-*` e `--t-fundo` foram removidas.
  A cor de cada página continua na faixa do topo, botões, bordas, links e menu. **Faixas do topo mais fortes** (tom `--b-*` mais saturado); por isso os `--i-*` (texto/links) ficaram mais escuros, mantendo ≥ 5,2:1 sobre a faixa. Ao mudar uma cor de página, atualize **também** os blocos de tema escuro, alto contraste e o bloco `html[data-escuro] .cabecalho`.
- `body[data-tema="..."]` escolhe o tema; `_layouts/default.html` define `data-tema` a partir de `page.tema` (ou da coleção).
  Páginas novas ganham cor com `tema: projetos` (etc.) no front matter.
- **Membros era rosa e a pessoa pediu verde pastel**; por isso Sobre nós, que era verde, virou amarelo (para não haver dois verdes). Depois, com o fundo creme, amarelo e terracota se confundiam com ele: Sobre nós virou **rosa framboesa** e Contato **laranja queimado** (com o fundo azulado). Rosa não é mais usado em Membros (verde).
- A pessoa achou o tema claro **"muito claro"**: por isso o fundo da página é creme (`--fundo`) e os **textos ficam em caixas brancas
  (classe `.caixa`)**; cartões e ficha também são brancos. Cabeçalho e rodapé são brancos. (O banner da página inicial continua amarelo `#ffe486`, é uma imagem do grupo.)
- **FAIXA DO TOPO PADRONIZADA (07/10, pedido da pessoa):** todas as páginas internas usam `topo.html`, que desenha um **cartão arredondado dentro do container** (`.faixa-card`), igual ao cartão verde da `/inicio-moderno/` (pontinhos + brilho amarelo no canto, título em branco, subtítulo/migalha atual em amarelo), mas na **cor temática da página** (`color-mix` da `--t-forte` com quase preto). **Não criar faixas próprias por página** (o protótipo `/projetos-criativo/` já usa a padrão). Alto contraste: cartão preto com borda branca.
- (Histórico) **Visual "moderno" nas páginas internas (07/10):** a faixa do topo (`.faixa-titulo:not(.abertura)`) era uma **versão escura da cor da própria página** (`color-mix` da `--t-forte` com quase preto), com pontinhos e brilho amarelo no canto, título grande em branco, subtítulo em amarelo, migalhas claras e **cantos de baixo arredondados**; os **cartões** (`.cartao`) ficaram mais arredondados, sem borda e com sombra. Alto contraste: faixa preta com borda branca. O texto abaixo da descrição desta faixa (descrição antiga "tom pastel") vale só para o histórico.
- **Layouts refeitos das páginas internas (07/10, a pedido: "pensei que você fosse refazer os layouts também"):**
  - **Projetos / Produções (listas):** filtros **na coluna da esquerda** (a pessoa preferiu à barra em cima; coluna fixa ao rolar no computador); as opções viram **chips clicáveis** (a caixa de seleção real fica invisível por cima do chip, então teclado e leitor de tela continuam funcionando; marcado = chip cheio com ✓).
  - **Página de projeto:** faixa com **chips de resumo** (ano em amarelo, situação, temas — `topo.html` aceita `chips=`), **capa larga centralizada com bloco colorido deslocado atrás** (`.projeto-capa`, sem cortar a imagem), depois texto + ficha.
  - **Página de produção:** chips na faixa (tipo com ícone, ano, até 3 palavras-chave).
  - **Quem somos:** imagem grande com bloco colorido atrás + texto em cartão (`.historia`), botão do Instagram centralizado, galeria com título grande e cartões arredondados (`.galeria-sec`).
  - **Membros:** títulos de seção grandes com barrinha (`section.bloco > h2`), introdução em cartão de largura total, egressos em **chips** (sem caixa).
  - **Contato:** cartão colorido com o texto e o Instagram + formulário em cartão branco ao lado (`.contato-grade`; o cartão colorido fica fixo ao rolar no computador).
  - Tudo com versão para celular, tema escuro e alto contraste; sem rolagem lateral em 8 páginas × 4 larguras.
- **PROTÓTIPO CRIATIVO `/projetos-criativo/`** (`projetos-criativo.html`, fora do menu; `/projetos/` oficial **não** alterada). Histórico: a pessoa disse "faltou criatividade" nos layouts refeitos; uma 1ª versão ousada (lista editorial em zigue-zague, números gigantes) foi **rejeitada: "too much e não é prático"** — o site vai ter **muitos projetos** (a lista precisa ser densa) e **faltou o filtro**. Versão atual: faixa **padrão** do site + **filtros na esquerda com chips** (mesma lógica de `/projetos/`) + **grade compacta** (`.cr-grade`) de cartões **simétricos** (cantos iguais; o bloco colorido deslocado atrás e os cantos assimétricos foram rejeitados: "deixe simétricos"). Os **números 01, 02...** e a faixa com título gigante/blobs foram **rejeitados** ("não entendi esses números, tira"). Regra: **qualquer layout novo precisa funcionar com dezenas de itens e manter os filtros.** Prefixo CSS `.cr-`. Se aprovado, levar a mesma linguagem às demais páginas; se rejeitado, apagar `projetos-criativo.html` e o bloco "Protótipo criativo" do CSS.
- Faixa do topo (`.faixa-titulo`) — descrição anterior: tom pastel com degradê, texto escuro, **sem bolinhas** (a pessoa pediu para tirar), com linha colorida embaixo e **duas faixas geométricas inclinadas** na cor da página, só à direita (`::before`/`::after`, opacidade baixa para não atrapalhar o texto; somem no alto contraste, impressão e `forced-colors`).
- Tema escuro (opcional, `html[data-escuro]`) e alto contraste (`html[data-contraste="alto"]`) têm seus próprios valores.

### Layout e componentes
- **Cabeçalho branco e fixo** (`position: sticky`), **branco também no tema escuro e no alto contraste escuro** (por causa da logo): em `main.css`, `html[data-escuro] .cabecalho` redeclara os valores do tema claro (`--tinta`, `--papel`, `--linha`, `--borda`, `--f-*`, `--i-*`...) e o `--t-*` da página; menu, busca, submenus e painel de acessibilidade leem essas variáveis. Se criar uma cor de página nova, repita-a lá; logo grande (~70 px no computador, ~43 px no celular; a pessoa achou a logo
  pequena demais para ler o "Tradução e Acessibilidade"). Altura: ~94 px (computador) e 61–67 px (celular). Em janelas muito baixas
  (`max-height: 30rem`) ele deixa de ser fixo. `scroll-padding-top` evita que links de âncora fiquem escondidos.
- **Menu com submenus**: "TrAce" ▾ (Sobre nós, Membros) e "Projetos" ▾ (Todos os projetos + cada projeto).
  Com JavaScript, o item com submenu é **um botão só** (texto + seta juntos, `.sub-botao`): Tab chega nele e Enter/Espaço abre o submenu; Esc fecha;
  no computador também abre ao passar o mouse. Para ir à página do item, usa-se o 1º link do submenu ("Todos os projetos", "Sobre nós").
  Sem JavaScript, aparece o link normal (`.link-sem-js`) e o submenu abre por `:hover`/`:focus-within`; no celular fica visível.
  No celular, o botão "Menu" vem **antes** de "Acessibilidade". **Ordem do Tab = ordem visual**: no HTML o botão "Acessibilidade" vem *depois* do bloco do menu/busca (a posição visual é dada por `order` no CSS).
- **Voltar ao topo**: só o botão redondo fixo no canto (`.topo-botao`, aparece depois de rolar 600 px, via JS); ao passar o mouse ou focar, mostra a dica "Voltar ao topo" (`.topo-dica`). **Não há mais link de texto no rodapé** (decisão da pessoa). Usa `href="#"` e JS
  (o `#topo` não rola nada porque o cabeçalho é fixo). O foco vai para a logo.
- **Rodapé**: botão do Instagram (e YouTube, se houver) fica **embaixo dos textos** da primeira coluna (a pessoa pediu para voltar para essa posição), abre em nova guia (`target="_blank" rel="noopener noreferrer"` + texto "abre em outra guia" para leitor de tela).
  Mesma regra para links externos de Lattes/LinkedIn e o botão de Instagram de "Sobre nós".
- **Card da orientadora** (`.destaque-pessoa` em `membros.html`): painel de cor da página com formas geométricas e foto grande em círculo com anel; ao lado nome grande, função em etiqueta, "Áreas de atuação", bio e contatos como botões com texto (E-mail, Lattes, LinkedIn: `contatos-pessoa.html` com `rotulos=true`); no celular a foto fica em cima. A **função em etiqueta** (`.etiqueta-funcao`) também aparece nos cartões dos outros membros. O card **não tem faixa colorida à esquerda** (só o divisor entre foto e texto). **Formas geométricas** (as mesmas da faixa do topo) também estão nos cartões de membros, no topo dos cartões de produção, no título da ficha (Membros: a introdução `.membros-intro` voltou a ser uma caixa simples, 1º parágrafo maior e 2º com linha separadora; a versão com formas e caixa lateral foi rejeitada.)
- **Rodapé escuro**: fundo escuro (`.rodape`) no tema claro e no escuro, com os valores do tema escuro redeclarados dentro dele (inclusive `color`); no alto contraste segue as regras de alto contraste.
- **Títulos das páginas** (`.faixa-titulo h1`): Poppins 700, grande e com entrelinha curta, no mesmo estilo do título da página inicial (a pessoa pediu).
- **Caixas** (`.caixa`, `.ficha-card`, `.filtros`, `.destaque-pessoa`): estilo único — borda fina, **faixa de 5 px na cor da página à esquerda** e cantos arredondados só à direita (`--raio-caixa`). Espaços entre caixas e faixa do topo foram reduzidos (`--e4`/`--e5`).
- **Imagem colada na caixa** (`.bloco-colado`): em "Quem somos" (imagem ao lado do texto no computador, em cima no celular) e no topo dos projetos. Um bloco só, cantos arredondados por fora, linha na cor da página entre imagem e texto. O botão do Instagram fica **fora** da caixa (`.acoes-fora`). A galeria de "Quem somos" agora é uma caixa.
- **Botões** (`.botao`, `.botao-sec`, `.botao-peq`): mesmo tamanho, forma e comportamento. No hover/clique mudam de cor e sobem 2 px (sem subir em "Menos movimento"). Principal: hover vira `--t-tinta` com texto `--papel` (nunca branco fixo: no tema escuro `--t-tinta` é claro). Secundário: hover enche com `--t-banda` (branco dentro da faixa colorida). No alto contraste o hover inverte preto/branco. Varredura de contraste de todos os estados feita nos 4 temas: mínimo 5,0:1.
- **Etiquetas** (`.temas li`, palavras-chave): preenchidas com `--t-banda`, sem borda, texto `--t-tinta` em negrito suave, cantos assimétricos (contraste ≥ 4,9:1; no alto contraste voltam a ter borda). Os cards de **produção** mostram até 3 `palavras_chave` e, embaixo, "Projeto" + nome do projeto em destaque (linha separadora). Os filtros usam caixas de seleção, não etiquetas (não foi alterado).
- **PDF**: o botão "Baixar PDF" (projetos e produções, `a[data-pdf]`) **abre o PDF em outra guia** no computador; em aparelhos de toque (`pointer: coarse`) o JS troca para download direto.
- **Copiar citação** (`producao.html`): botão "Copiar citação" na ficha bibliográfica (só com JavaScript, `iniciarCopiarCitacao`); copia o texto de `citacao`, muda o rótulo para "Citação copiada" e avisa leitor de tela (`role="status"`). Usa a área de transferência do navegador, com alternativa `execCommand`.
- **Ícones por tipo de produção** (`_includes/icone-tipo.html` + sprite `i-tipo-*` em `icones.html`): artigo, capítulo, TCC, dissertação e videolivro (traço simples, decorativos, o nome do tipo vem escrito ao lado); aparecem no topo dos cartões e na ficha. Tipo novo cai no ícone de artigo; para ter ícone próprio, criar o `symbol` e uma linha no `case`.
- **Busca grande na inicial: REMOVIDA.** Foi testada solta no meio da página ("muito jogada") e depois dentro da faixa de abertura ("faixa com muita informação", e repetia a busca do menu). A busca do menu (`.busca-topo`) continua. O CSS `.busca-home` e o ícone `i-lupa` ficaram no código sem uso (podem ser apagados).
- **Faixa "Apoio" no rodapé**: lista em `_data/apoio.yml` (nome, imagem, url). **Enquanto a lista estiver vazia a faixa não aparece.** Os logos ficam sobre caixinha branca (para qualquer logo ler bem no rodapé escuro). A pessoa precisa fornecer os logos (não gerar).
- **Cartões** para projetos, produções e membros (a pessoa pediu cartões lado a lado, não listas). Cartão inteiro clicável (link esticado).
- **Membros**: foto em **círculo**, com ícones de contato (e-mail, Lattes, LinkedIn) que só aparecem se o dado existir.
  O ícone de e-mail abre uma **janela** (`<dialog>`) com o endereço, "Copiar e-mail" e "Escrever e-mail"; sem JavaScript vira `mailto:`.
  Motivo: `mailto:` puro não funciona para quem usa e-mail pelo navegador. Ícones vêm de um sprite SVG (`_includes/icones.html`).
- **Ficha** de projeto/produção: **cartão ao lado do texto** (coluna de ~19,5 rem, sticky) no computador; no celular vem logo
  depois do texto principal. A ordem no HTML é: bloco A (imagem + texto), ficha, bloco B (galeria, vídeo, equipe, relacionadas),
  para a ordem de leitura/tabulação ser a mesma no celular. (Já tentamos ficha na margem esquerda e ficha em faixa horizontal no
  topo; a pessoa achou "estranho", então ficou o cartão à direita.)
- **Início**: a **faixa de abertura** (`.abertura`: título, texto e botões) vem **primeiro**, logo abaixo do menu; o **banner (imagem) vem depois dela**, antes das seções (a pessoa pediu para inverter a ordem). O banner é **menor** (`.banner-topo`: máx. 64 rem, dentro do `.container`, cantos arredondados, borda fina, espaço em volta, fundo neutro `--t-suave`, **não mais de ponta a ponta da tela**) porque a imagem vai ser trocada no futuro: não amarrar o layout às cores da imagem atual; no celular recorta em 5:3. Testados e descartados: banner em cima com onda, corte diagonal, degradê transparente, faixa sobreposta ao banner com borda inclinada/branca (a borda inclinada ficou serrilhada).
  A faixa de abertura é **baixa** e só tem o título **"Portal TrAce"** (h1) e o subtítulo **"Tradução, acessibilidade e pesquisa"**; o selo foi retirado a pedido da pessoa. O parágrafo "Reunimos projetos, pesquisas e produções..." (texto original, intacto) saiu da faixa (ficava estranho ao lado) e agora fica **centralizado logo abaixo da faixa do topo, antes do carrossel** (`.apresentacao`; já esteve embaixo do carrossel, a pessoa pediu para testar aqui). O carrossel aparece logo na primeira tela. Ela tem **sempre o visual escuro, mesmo no tema claro** (decisão da pessoa; no alto contraste vira faixa branca/preta normal).
  Os botões "Explorar projetos" e "Ver produções" da faixa de abertura foram **removidos** (a pessoa achou informação demais; o acesso fica pelo menu e pelas seções abaixo). As seções "Projetos em destaque" e "Produções recentes" ficam **no mesmo fundo** (a pessoa não gostou da divisão em duas cores), dentro de `.miolo` (sem forma geométrica no fundo: a pessoa não gostou);
  título grande com barra colorida e botão "ver tudo" (`.botao-peq`).
- **Carrossel** (teste, na página inicial, no lugar do banner único; título visível **"Avisos e novidades"** (centralizado, com barrinha colorida embaixo; os outros títulos de seção continuam à esquerda com barra ao lado), escolhido pela pessoa — não usar "Destaques" porque já existe "Projetos em destaque"; o carrossel é para novidades, eventos, avisos e apresentar projetos/produções): `_includes/carrossel.html` + `_data/carrossel.yml` (hoje a **mesma imagem 3 vezes**, para teste; trocar por imagens reais, todas com a mesma proporção e com `alt` de verdade). Acessível e sem biblioteca: faixa com rolagem horizontal e encaixe (`scroll-snap`) que **funciona até sem JavaScript**; com JavaScript (`iniciarCarrossel`) ganha botões Anterior/Próximo (voltam do último ao primeiro), indicadores (botões de 44 px), aviso "Slide X de Y" só para leitor de tela (`so-leitor` + `aria-live="polite"`, falado só depois de trocar de slide; não aparece na tela: a pessoa achou desnecessário, os indicadores já mostram a posição; o `alt` da imagem descreve só a imagem, a posição vem do `aria-label` "1 de 3" de cada slide), setas ← → no teclado, e só o slide atual fica exposto a leitor de tela (`aria-hidden` nos outros). **Não troca sozinho** (de propósito: regra de "sem animação" e acessibilidade); se um dia ganhar troca automática, precisa de botão de pausa e desligar em "Menos movimento"/`prefers-reduced-motion`. A rolagem suave também é desligada nessas opções. Só a 1ª imagem carrega ao abrir (as outras são `lazy`). Para voltar ao banner único, trocar o include em `index.html` por um `<figure>` com `img.html`.
- **EXPERIMENTO ("dar vida" à inicial; a pessoa disse que provavelmente vai rejeitar, só queria ver):** (1) faixa **"Quem faz o TrAce"** (`.quem-faz`, antes de "Projetos em destaque"): até 14 fotos redondas dos membros (pula quem usa foto genérica `placeholders/` e os consultores) + "+N" e botão "Conhecer o grupo" para Membros; fotos decorativas (`alt=""`); (2) **projeto principal em destaque grande** (`.projeto-destaque`: o 1º de `destaque: true` por `ordem`, imagem de um lado, resumo, etiquetas e botão "Conhecer o projeto"), e os demais em cartões menores (2 colunas). Para desfazer, voltar ao commit anterior a "Inicio: faixa Quem faz o TrAce". A causa real do site "sem vida" é o **conteúdo ainda provisório** (mesma imagem 3x no carrossel, capas e textos placeholder, fotos genéricas): trocar por conteúdo real do grupo ajuda mais que qualquer ajuste de layout.
- **PÁGINA DE TESTE `/inicio-novo/`** (`inicio-novo.html`, fora do menu e do mapa do site; **a inicial atual (`index.html`) não foi alterada**): novo desenho com só 3 momentos — (1) abertura com texto à esquerda ("Portal TrAce", subtítulo, parágrafo, **um** botão) e o carrossel à direita; (2) "Projetos" em 3 cartões iguais; (3) "Produções recentes" em **lista leve** (`.lista-prod`: ícone do tipo, título, projeto, ano; linha toda clicável). Melhorias já feitas: carrossel maior (coluna 1,4fr), bloco colorido deslocado atrás da imagem (só no computador), seta que anima na lista de produções, mais espaço entre seções. Motivo: a inicial atual ficou com informação demais (sete blocos). Se a pessoa aprovar, copiar o conteúdo para `index.html`; se rejeitar, apagar `inicio-novo.html` e o bloco "Layout de teste da inicial" do CSS.
- **PÁGINA DE TESTE `/inicio-moderno/`** (`inicio-moderno.html`, fora do menu; a inicial atual **não** foi alterada) — direção **"moderno e colorido"** escolhida pela pessoa entre 3 estilos: abertura em **cartão grande verde-escuro (`#073f3e`) com pontinhos e brilho amarelo no canto** (fundo "B", escolhido pela pessoa entre 4 opções: A gradiente verde→azul→roxo, B verde com pontinhos, C pôr do sol roxo→laranja, D claro suave) **só com texto** (os botões foram retirados a pedido da pessoa); o carrossel fica **embaixo da faixa, SEM sobrepor** (`.mod-carrossel-area`; a versão sobreposta foi rejeitada) como **imagem arredondada com setas redondas e bolinhas por cima** (no celular os controles ficam embaixo da imagem), rótulo "Avisos e novidades" (**grande**, a pessoa achou o pequeno demais) no **mesmo visual da etiqueta de função dos membros** (fundo na cor da página, texto branco, cantos assimétricos), (o cartão branco ao redor foi rejeitado: "carrossel estranho"); **5 atalhos coloridos** (Projetos, Produções, Membros, Quem somos, Contato, cada um na cor da sua página, com ícone grande); títulos de seção grandes, em negrito, com **barrinha colorida embaixo** (o marca-texto atrás do título foi rejeitado: "títulos estranhos"); cartões de projeto/produção mais arredondados e com sombra; faixa final com **avatares sobrepostos** dos membros, no **mesmo verde-escuro com pontinhos** da abertura. Tudo dentro de `.mod` (CSS "Direção moderno e colorido"). Texto branco sobre as cores fixas escuras (≥ 7:1); alto contraste vira preto/branco com borda. Se aprovada, copiar para `index.html`; se rejeitada, apagar `inicio-moderno.html` e esse bloco do CSS.
- **QUEM SOMOS REFEITA (07/10, aprovada a proposta):** layout `_layouts/pagina.html`, 3 blocos simétricos: (1) **apresentação** — imagem e texto lado a lado com a **mesma altura** e cantos iguais (`.historia`; sem o bloco colorido deslocado); (2) ~~dois cartões "Nossa missão" e "Linhas de pesquisa"~~ **REMOVIDOS a pedido da pessoa** (o layout `pagina.html` ainda suporta uma lista opcional `blocos:` com `titulo`/`texto` no front matter, que hoje não é usada); (3) **galeria** em grade regular de miniaturas **quadradas** (2 por linha no celular) com a janela de ampliação de sempre; e a faixa final **"Onde nos encontrar"** (`.encontre`, mesmo cartão verde da faixa do topo, na cor da página) com botões Instagram (nova guia) e "Fale com a gente" (Contato). O include `redes-botao.html` foi **apagado** (o botão do Instagram agora mora nessa faixa). Miniaturas de galeria têm cantos iguais em todo o site. Não inventar missão/linhas de pesquisa: o texto vem do grupo.
- **Quem somos, extras aplicados (07/10, "mete isso tudo aí"):** (1) faixa **"Quem faz o TrAce"** com 9 fotos redondas dos membros + botão "Conhecer o grupo" (ligada por `pessoas: true` no front matter; mesmo cartão verde na cor da página); (2) **abertura do texto em destaque** (`::first-line` maior e em negrito leve, só estilo, nenhuma palavra mudada); (3) **legenda da miniatura** visível ao passar o mouse/foco (só ≥ 40em; no celular só na ampliação; `aria-hidden` porque o leitor de tela já lê a legenda no link); (4) **faixa "Apoio"** com logos de `_data/apoio.yml` na própria página (**só aparece se a lista tiver itens**, hoje vazia); (5) **imagem maior que o texto** na apresentação (colunas 1,25fr / 1fr).
- **Quem somos, ajuste de layout (07/10, "dá pra melhorar o layout"):** a faixa "Quem faz o TrAce" virou **cartão claro** (branco, anel colorido nas fotos, botão na cor da página) para não haver duas faixas escuras coladas (a outra é "Onde nos encontrar"); a galeria usa **3 colunas fixas** no computador (3 fotos preenchem a linha, sem vazio) e 2 no celular, miniaturas 4:3.
- **Para tirar capturas de página inteira que fiquem boas** (a pessoa reclamou das anteriores): injetar `.cabecalho{position:static!important}.topo-botao{display:none!important}`, forçar `loading="eager"` + `decode()` nas imagens e esperar antes de fotografar (script `cap.js`).
- **Membros (07/10):** a orientadora (`.destaque-pessoa`) agora é um cartão verde-escuro com pontinhos e brilho (mesmo da faixa "Quem faz o TrAce"), etiqueta de função amarela e botões de contato brancos; os egressos são chips em tom suave (`--t-banda`). Sem busca por nome (a pessoa recusou). Cartões de membros e consultores inalterados. **A pessoa gosta da assimetria das etiquetas** (`.etiqueta-funcao`, temas): manter.
- **Versões PP / LLA do projeto (07/10):** a página do projeto pode ter **duas versões**, cada uma com seu endereço (a pessoa escolheu duas páginas em vez de um botão com JavaScript). A versão em **Português padrão** é o arquivo normal (`_projetos/o-principe-lindworm.md`); a versão **Linguagem literária acessível** é outro arquivo (`_projetos/o-principe-lindworm-lla.md`, `permalink: /projetos/o-principe-lindworm/lla/`) com o campo **`par:` igual ao título da página PP** e título "... (versão LLA)". Um seletor "Português padrão | Linguagem literária acessível" (`.versao-troca`, são links, funciona sem JavaScript; `aria-current` marca a versão atual) aparece acima da capa nas duas páginas. A capa e a estrutura são as mesmas; troca-se o texto de tudo no arquivo LLA. **Na lista de Projetos e na busca as duas versões aparecem como DOIS CARTÕES, cada um com um selinho no canto da imagem (PP em VERDE `#1f7a4a`, LLA em amarelo; só na lista; `.selo-versao`, **botão maior (44 px) que abre uma janelinha `popover` HTML nativa (`#info-versao` em `projetos.html`, sem JavaScript) explicando o que são PP e LLA**; em navegadores muito antigos sem `popover` o botão não abre nada, mas o aviso com as siglas continua na página do projeto)** — pedido da pessoa. **Menu, rodapé e inicial listam só a versão PP** (filtro `where_exp: "p", "p.par == nil"`; todo lugar novo que listar `site.projetos` e não deva repetir o projeto precisa do mesmo filtro). A versão LLA precisa de `ordem` (usei 1.5, logo depois da PP). O texto do arquivo LLA do Lindworm é **cópia provisória** do PP (comentário no arquivo): trocar pelo texto do grupo.
- **Contato (07/10):** cartão colorido da esquerda com **lista de canais** (`.contato-canais`, botões brancos de cantos assimétricos) — **Instagram, E-mail e Endereço, cada um só aparece se preenchido** (`redes.instagram`, `contato.email` e `contato.endereco` no `_config.yml`; hoje Instagram e o e-mail provisório da pessoa, andrealexandrinoribeiro@gmail.com — trocar pelo e-mail do grupo quando houver); formulário em cartão da mesma altura, com **título "Envie uma mensagem"** (texto de interface) e uma **lista "Assunto"** (`<select>`, opções em `contato.assuntos` no `_config.yml`: Dúvida, Sugestão, Parceria, Outro assunto — **sugestão minha, a pessoa deve confirmar/editar**; lista vazia = campo some), com Nome e E-mail lado a lado no computador e botão "Enviar" maior; aviso de resultado em amarelo. **`formulario_url` agora está preenchida com o Formspree da pessoa (`https://formspree.io/f/mvkzkkpo`), então o formulário ENVIA de verdade** (antes era demonstrativo); quando preenchida, o JS (`iniciarFormularioReal`) envia sem sair da página e mostra "Mensagem enviada. Obrigado pelo contato!" (sem JavaScript o envio normal do navegador funciona). **O título do e-mail que chega é `[Assunto] - Nome (dd/mm hh:mm)`** (a data e a hora deixam cada título único, para o Gmail não empilhar as mensagens na mesma conversa) (campo escondido `_subject` do Formspree, preenchido pelo JS no envio; sem JavaScript o título é "[Contato pelo site] - Nova mensagem"); o corpo do e-mail segue o modelo fixo do Formspree (não dá para mudar no plano gratuito). **O envio real foi testado pela pessoa em 07/10 e FUNCIONA** (título e e-mail chegando certo; no começo o navegador mostrava a versão antiga da página, resolvido com recarregar). Ícone novo `i-local`.
- **Seletor PP | LLA na faixa do topo (07/10):** o seletor ficou **dentro da faixa do topo** por um tempo, mas a pessoa preferiu **embaixo da faixa**, entre a faixa e o banner (`.versao-troca`, cápsula clara com a versão atual na cor da página). O `topo.html` ainda aceita `extra=` (sem uso). **Consultores (cartões de Membros) passaram a ciano `#0f7f93`** (antes usavam o azul de Projetos, que ficou parecido com o violeta dos membros).
- **ATENÇÃO — o título do projeto é uma "chave" (07/10):** o campo `par:` da versão LLA e o campo `projeto:` de cada produção precisam ser **exatamente iguais ao `title` do projeto**. A pessoa editou o título do Lindworm pelo GitHub para "O Príncipe Lindworm (versão PP)" e o seletor PP/LLA e as produções relacionadas **sumiram** até eu acertar `par:` (em `o-principe-lindworm-lla.md`) e `projeto:` (em `capitulo-placeholder-de-livro-multiformato.md`) para o título novo. **Se alguém mudar um título de projeto, trocar também esses campos** (procure o título antigo com busca em todo o repositório). **Decisão da pessoa (07/10): o título "O Príncipe Lindworm (versão PP)" é de propósito — manter** (aparece no menu, no rodapé e nos cartões). **A pessoa também tirou o vídeo da versão PP e disse para deixar assim**; a LLA ainda tem `video:` (a pessoa só confirmou "deixar as alterações que fiz").
- **EXPERIMENTO: SISTEMA DE DESIGN (07/10) — NÃO PUBLICADO NA `main`:** a pessoa pediu "um teste, não bote isso na main" ao aplicar uma lista de "evitar cara de site feito por IA". Foi aplicado um **sistema de design** (tokens de raio, espaço, tipografia, peso, entrelinha, sombra, movimento, ícone, no começo do `main.css`; ver `DESIGN-SYSTEM.md`) + estados de carregamento (botão Enviar, busca com esqueleto, vídeo). **A `main` continua em `cecc99d` (estado seguro antes do experimento).** **Só publicar na `main` se a pessoa aprovar o experimento;** a autorização permanente "pode sempre publicar" **não vale para este experimento**. Se precisar publicar OUTRA mudança na `main` antes da aprovação, **não envie `HEAD`: faça cherry-pick só do commit necessário sobre a `main`** (os commits do experimento começam em "Sistema de design"). Para desfazer: voltar a `cecc99d`.
- **Modelos para a pessoa copiar (07/10):** pasta `_modelos/` (`projeto-modelo.md` e `producao-modelo.md`, com cada campo comentado em português). Pastas que começam com `_` e não são coleções **não são publicadas nem entram na busca** (conferido no build). Testado: copiar o modelo para `_projetos/`/`_producoes/` gera a página e o cartão sem erro (as imagens do modelo são de exemplo e precisam ser trocadas por imagens já preparadas). Se mudar os campos de projeto/produção, **atualize os modelos também**.
- **PÁGINAS DE TESTE REMOVIDAS (07/10, "pode tirar as páginas teste"):** `inicio-novo.html` e `projetos-criativo.html` foram apagadas, junto com os blocos de CSS delas (`.novo-*`, `.lista-prod`, `.cr-*`); `inicio-moderno.html` já tinha virado a inicial. **Não existe mais nenhuma página de teste publicada.** As descrições "PÁGINA DE TESTE `/inicio-novo/`", "PROTÓTIPO CRIATIVO `/projetos-criativo/`" e "PÁGINA DE TESTE `/inicio-moderno/`" mais abaixo neste arquivo são **só histórico** (do que foi testado e rejeitado/aprovado). Ainda há CSS antigo da inicial sem uso (`.abertura`, `.banner-topo`, `.apresentacao`, `.quem-faz`, `.projeto-destaque`, `.busca-home`) que pode ser apagado com cuidado.
- **PÁGINA INICIAL OFICIAL (07/10):** a pessoa escolheu a direção "moderno e colorido": o conteúdo de `/inicio-moderno/` foi copiado para `index.html` (e `inicio-moderno.html` foi apagado). Ordem: cartão verde-escuro de abertura ("Portal TrAce", subtítulo, parágrafo) → "Avisos e novidades" (carrossel) → 5 atalhos coloridos (Projetos, Produções, Membros, Quem somos, Contato) → "Projetos em destaque" (só versão PP) → "Produções recentes" (3) → faixa "Quem faz o TrAce" com **9 fotos sorteadas, Manoela sempre primeira** (mesmo `data-sorteio` de Quem somos). **A descrição antiga da inicial mais acima neste arquivo (faixa `.abertura`, banner, `.quem-faz`, `.projeto-destaque`) é HISTÓRICO**: o CSS `.mod-*` é o que vale; o CSS antigo (`.abertura`, `.banner-topo`, `.apresentacao`, `.quem-faz`, `.projeto-destaque`, `.busca-home`) ficou sem uso e pode ser apagado. `/inicio-novo/` e `/projetos-criativo/` continuam como páginas de teste.
- **Cartão de projeto (07/10, "1234"):** a cor dos cartões é um **azul-índigo próprio** (`#4a56c4`; o azul acinzentado da página foi rejeitado; opções vistas: azul-céu, ciano, índigo), corpo em **tom suave** dele; **ano em etiqueta forte e situação em etiqueta suave** (`.meta-ano`, `.meta-sit`; cantos assimétricos); até **3 etiquetas de tema, sempre alinhadas ao pé**; e um **"Conhecer o projeto →"** no pé (`.cartao-mais`, decorativo `aria-hidden`; a seta anda 4 px ao passar o mouse, desligado em menos movimento). Classe `.cartao-proj` em `projeto-item.html`.
- **Página de projeto v2 (07/10):** **capa recortada como BANNER largo no topo** (3:1 no computador, 3:2 no celular, `object-fit: cover`; a pessoa rejeitou a capa pequena à direita e também a capa grande ao lado do texto: "ficou pior"), depois **texto ("Sobre o projeto" no recado suave) + Downloads à esquerda e ficha à direita** (22rem) — a capa é uma imagem arredondada simples, sem o bloco deslocado que a pessoa achou "estranho", + **ficha com topo colorido**: situação e ano grande, temas em chips); Galeria, Vídeo, Equipe (cartões) e Produções relacionadas na largura inteira embaixo (`.sec-larga`). No celular a ordem é capa → texto → downloads → ficha → seções.; ele só aparece se `video:` estiver preenchido. **Livros têm duas versões para baixar**: campo `downloads:` (lista de `sigla` + `rotulo` + `arquivo`) no projeto: hoje **PP** = Português padrão e **LLA** = Linguagem literária acessível (nomes e siglas pedidos pela pessoa). Ficam **logo abaixo do resumo, sem título "Downloads"** (a pessoa pediu para tirar a seção). Aparece um **aviso em tons de AMARELO** explicando as siglas (montado a partir dos dados) e dois **botões pequenos** "Baixar versão PP" / "Baixar versão LLA" (os cartões grandes foram trocados: "muito grande"); sem `sigla`, o botão usa o `rotulo` em O Príncipe Lindworm e Livro 2, ambos com o PDF de teste; projetos que não são livros continuam usando `pdf:` (botão na ficha). A página reaproveita classes da produção (`prod-pagina`, `resumo`, `ficha-prod`, `ficha-topo`).
- **Download único e vídeo removido (07/10):** como cada versão (PP/LLA) tem a sua página, **cada página tem UM botão de download** no rodapé da ficha, com o campo `pdf:` da própria página; o texto do botão é sempre **"Baixar PDF"** (a pessoa pediu; para leitor de tela o nome completo da versão vem junto, entre parênteses). **O campo `downloads:` e o aviso amarelo com as siglas foram REMOVIDOS.** **Vídeo e seletor de versões só aparecem quando existem** ("nem todo projeto vai ter mais de uma versão ou vídeo"): a seção "Vídeo" só aparece com `video:` preenchido, e o seletor PP/LLA só aparece se o projeto tiver uma versão LLA (`par:`). Cuidado Liquid: `where: "title", nil` casa com qualquer projeto, por isso a página PP só procura o par se `page.par` existir.
- **Página de produção (07/10):** **Resumo** com título grande e barrinha e o texto dentro de um **recado suave** (fundo na cor da página, cantos assimétricos, como o 2º parágrafo de Membros; `.resumo-texto`); **ficha com topo colorido** (ícone do tipo em círculo + ano grande; tipo e ano saíram da lista da ficha) e **"Como citar" em bloco próprio**; **palavras-chave como chips abaixo do resumo** (sem caixa) e **faixa do topo só com tipo e ano**. O bloco **"Outras produções deste projeto" e o botão "Voltar para Produções" foram testados e REMOVIDOS a pedido da pessoa.**
- **Produções (07/10):** cartões de produção (`.cartao-ref`, usados também na inicial e nas páginas de projeto) agora têm **topo na cor forte** do tema com formas, **ícone do tipo grande em círculo branco** e **ano grande**; corpo em tom suave (não branco); etiquetas brancas. Os filtros mostram **contagem** — "Artigo (3)" (`.opcao-n`, calculada em Liquid em `producoes.html`). O selo "PDF" no cartão foi sugerido e **não foi pedido** (a pessoa escolheu só as opções 1 e 3).
- **Texto inicial de Membros (07/10):** sem caixa branca; texto solto com **barra vertical na cor da página**, 1º parágrafo grande e em negrito leve, 2º parágrafo num **recado** (fundo suave da cor da página, cantos assimétricos) — a seta foi testada e removida a pedido da pessoa (nenhuma palavra mudada). **Contadores (22 membros / 7 consultores / egressos) foram testados e REJEITADOS.**
- **Egressos (07/10):** cada nome vira um chip branco com um **círculo de iniciais** (primeira letra do 1º e do último nome, calculadas em Liquid em `membros.html`; decorativo, `aria-hidden`). Escolhido entre 3 testes (cartão escuro / iniciais / lista em colunas). Se a lista crescer muito, a lista em colunas é a alternativa.
- **Membros v4 (07/10):** cartões de pessoas **verticais e coloridos** escolhidos entre 3 testes (vertical / horizontal com círculo / horizontal com foto inteira). **Cartões de membros em violeta (`#6a4bb8`, só nos cartões; a página segue verde), consultores em azul** (`data-cat="consultoria"`); formas: membros = faixa diagonal + triângulo, consultores = círculos; corpo em tom suave da cor (nunca branco puro: a pessoa achou os brancos sem graça); tema escuro e alto contraste tratados. Horizontais (com e sem círculo) foram testados e preteridos; a introdução ao lado da orientadora foi rejeitada (ficam empilhadas; `.membros-topo` é só invólucro). Cartão da orientadora: verde-escuro com pontinhos.
- **Quem somos, texto com fundo (07/10):** o texto da apresentação (`.historia-texto`) usa o mesmo **recado suave** da página de produção (fundo `--t-banda` a 40% sobre o cartão, cantos assimétricos, sem sombra).
- **Quem somos: ordem final (07/10):** apresentação → faixa "Quem faz o TrAce" → galeria → apoio (se houver) → "Onde nos encontrar". **O mapa do Google foi REMOVIDO a pedido da pessoa ("coisa demais")**: não existe mais `_includes/mapa.html`, `mapa:` no front matter nem `localizacao:` no `_config.yml`. A faixa "Quem faz o TrAce" tem fundo verde-escuro na **cor temática de Membros** (`--f-membros`) com pontinhos e brilho. As fotos são **sorteadas a cada visita** (`data-sorteio` + `sortearPessoas` no `main.js`): **a orientadora (Manoela) fica sempre em 1º** (`data-fixos`) e as outras 8 vêm aleatórias entre os membros com foto real (sem placeholder, sem consultoria). Sem JavaScript aparecem as 9 primeiras na ordem do `membros.yml`.
- **Instagram** (`redes.instagram` em `_config.yml`): `https://www.instagram.com/tracegrupo/`, no rodapé e em um botão em "Sobre nós"
  (`redes: true` no front matter da página). YouTube só aparece se `redes.youtube` for preenchido.
- **Vídeo**: o player do YouTube (`youtube-nocookie.com`) só é carregado depois do clique (leve e sem rastreadores).
- **Galeria**: miniaturas com lupa no canto + `<dialog>` com a imagem ampliada; **legenda e botões (Anterior · Fechar · Próxima) ficam centralizados embaixo da imagem**. Vale para toda galeria (um só include). Sem JavaScript os links abrem a imagem direto.
- **Filtros** das listas (projetos: status e temas; produções: tipo e ano) + busca de texto; renderizados no HTML e filtrados por
  JavaScript. Temas funcionam em "E" (todos os selecionados); os demais em "OU".
- **Busca geral** (`/busca/`) lê `search.json`; funciona só no site publicado (não por duplo clique em arquivo).
- **Formulário de contato**: demonstrativo (`formulario_url` vazio). Para ficar real: criar formulário (Formspree etc.) e colocar o endereço.

---

## 6. Acessibilidade — o que já existe e deve ser preservado

- HTML semântico, um `h1` por página, migalhas de pão, `aria-current`, rótulos em todos os campos, `alt` em todas as imagens,
  link "Pular para o conteúdo", `lang="pt-BR"`, `main tabindex="-1"`.
- Contraste: o piso é **WCAG AA** (texto 4,5:1; texto grande, bordas e ícones 3:1). As cores atuais passam com folga (texto ≥ 16:1, links ≥ 6:1, branco sobre botões ≥ 5:1); **não é obrigatório manter essas folgas**, pode-se usar cores mais vivas e ousadas desde que continue AA. Ao mexer em cores, **recalcule**.
- Foco visível em dois anéis (escuro + amarelo), alvos de toque ≥ 44 px, cor nunca é a única pista (cada página tem nome e item de menu).
- **Painel "Acessibilidade"** (botão no cabeçalho): tamanho do texto (90–150%, via `--escala` em `html`, respeita o zoom do
  navegador), **tema escuro**, **fonte de leitura**, **mais contraste**, **leitura confortável** (mais espaço), **menos movimento**
  e restaurar. Salvo em `localStorage` na chave `trace-a11y` (`escala`, `escuro`, `contraste`, `fonte`, `espaco`, `movimento`);
  aplicado antes da página aparecer por um script em `_includes/head.html`. Atributos em `<html>`: `data-escuro`, `data-contraste`,
  `data-fonte`, `data-espaco`, `data-movimento`.
- Respeita `prefers-reduced-motion`, `forced-colors`, reflow (zoom 200–400%), impressão (`@media print`).
- Tudo funciona **sem JavaScript** (conteúdo, listas, links, menus em modo básico); o JS só acrescenta recursos.
- Padrões usados: botões de abrir/fechar com `aria-expanded`/`aria-controls`; `<dialog>` com foco devolvido ao elemento de origem;
  regiões `role="status"` para contagem de resultados e avisos.

---

## 7. CSS e JavaScript — mapa rápido

### `assets/css/main.css`
Seções: 1 fontes · 2 variáveis (cores, tipografia, medidas) · 3 base · 4 estrutura (`.container`, `.caixa`, `.faixa-titulo`, migalhas) ·
5 cabeçalho e menus (breakpoint do menu completo: `64em`) · 6 componentes (botões, cartões, ficha, filtros) · 7 páginas (início,
galeria, vídeo, membros, formulários, busca) · 8 rodapé · 9 movimento e acessibilidade · 10 impressão.
Breakpoints principais: `64em` (menu completo, 4 colunas de membros), `56em` (ficha ao lado, filtros ao lado, 2 colunas), `40em`, `30em`/`24em`
(ajustes do cabeçalho em celulares pequenos).
Usa `color-mix()` (faixa em degradê; navegadores antigos usam a cor sólida), `:has()` (um ajuste do menu) e `dvh`; todos têm alternativa aceitável.

### `assets/js/main.js` (sem dependências, tudo opcional/progressivo)
1 painel de acessibilidade · 2 menu no celular · 2b submenus · 3 filtros e busca nas listas · 4 galeria com imagem ampliada ·
5 vídeo sob demanda · 6 busca geral · 6b janela de e-mail · 7 formulário demonstrativo. Os filtros fecham o `<details>` em telas pequenas.

---

## 7b. Cuidados com Liquid/Jekyll (GitHub Pages)

- O GitHub Pages usa **Jekyll 3.x + Liquid 4** (gem `github-pages`). Não usar plugins fora da lista permitida, nem `{% liquid %}` ou `{% render %}`.
- **String vazia é verdadeira em Liquid.** Para testar "preenchido" use `{% if x != '' %}` (vários includes já fazem `| default: ''` antes).
- `assign` dentro de `include` vaza para quem chamou. Parâmetros do include são lidos como `include.nome`.
- Ordenação: `sort: "ordem"` exige `ordem` em todos os itens (nil complica a ordenação no Jekyll 3).
- `where: "destaque", true` e `where: "projeto", page.title` são usados; `slugify` mantém letras acentuadas (valores dos filtros usam isso nos dois lados).

---

**Bug corrigido (cabeçalho a 1024–1056 px):** o botão "Acessibilidade" passava da borda (rolagem lateral de 28 px) por causa dos botões de submenu mais largos; a busca do menu agora tem base de 9 rem entre 64 em e 72 em (11 rem acima disso). Sempre testar a rolagem lateral em 1024 px depois de mexer no cabeçalho.

**Nota para capturas de tela:** as fotos de membros usam `loading="lazy"`; em captura de página inteira saem brancas se não forem carregadas antes (forçar `img.loading="eager"` e `decode()` no script). No site real carregam ao rolar.

## 7c. Diagnóstico de acessibilidade e peso (07/10)
Ver `DIAGNOSTICO.md` (axe-core + html-validate + medições): 0 violações axe em 14 páginas × 3 temas × 2 larguras; contraste sobre degradê medido pixel a pixel; filtros fixos agora rolam por dentro; alvos de toque ≥ 24 px (maioria 44). **Regra aprendida:** texto branco sobre as formas claras dos topos coloridos precisa de forma bem suave (opacidade ≤ 0,06). Ferramentas ficam fora do projeto (pasta temporária); para repetir: `npm install axe-core html-validate` numa pasta à parte.

## 8. O que NÃO foi verificado (importante!)

- **O site já foi construído pelo Jekyll 3.10 (o do GitHub Pages) sem erros** (texto antigo abaixo ficou como histórico). Aqui o comando `jekyll serve` não existia; usou-se um pequeno script Ruby chamando `Jekyll::Commands::Build` e um servidor estático.
- (Histórico) **O site nunca foi construído pelo Jekyll de verdade.** Na época não havia Ruby/Jekyll nem internet. Foi testado com um simulador
  de Liquid escrito à mão + Chromium (Playwright): links, imagens, `alt`, ids, filtros, painel, menus, galeria, janela de e-mail,
  busca, `baseurl` e larguras de 320 a 1280 px. **O primeiro passo útil do Claude Code é rodar `bundle install` e
  `bundle exec jekyll build --trace` / `jekyll serve` e corrigir qualquer erro de Liquid/Jekyll** (erros prováveis: sintaxe Liquid,
  diferença entre kramdown e o Markdown simulado, ordenação).
- **Nunca testado com leitor de tela** (NVDA, VoiceOver, TalkBack) nem em aparelhos reais; só em Chromium.
- "Copiar e-mail" usa a API de área de transferência (exige página segura/HTTPS; há alternativa com `execCommand`). Confirmar no site publicado.
- Nunito/Atkinson não incluídas (ver seção 5).

---

## 9. Pendências de conteúdo (decisão da pessoa; não resolver sozinho)

- **Fotos reais prontas, mas não usadas**: Matheus, Letícia (a da Manoela já está em uso desde o item 3) — o `membros.yml` aponta para imagem genérica
  (`placeholders/a`); as fotos estão em `assets/img/membros/` (`manoela-cristina`, `matheus-goncalves`, `leticia-pimentel`). Há comentários no arquivo.
- **Imagem de cabeçalho do projeto AD de Libras** (`capa`) é um placeholder "LIVRO 2"; a imagem correta é `projetos/ad-libras-capa`.
- **Os dois projetos usam o mesmo vídeo de teste** (`tgbNymZ7vqY`).
- **Todos os botões "Baixar PDF"** (projetos e as 5 produções) apontam para `assets/docs/placeholder-projeto.pdf`.
- O texto de **"Quem somos" parece ser um trecho da descrição do projeto Lindworm** (veio assim do site antigo).
- Nos projetos Lindworm e AD de Libras foi usada a **descrição completa** (o site antigo mostrava só um trecho). Se a pessoa quiser o trecho, é só editar.
- O `alt` do banner da página inicial foi **reescrito** para descrever a imagem de verdade (o original não descrevia).
- Formulário de contato demonstrativo; YouTube do rodapé sem endereço.
- "Manoel Negraes" (consultor) usa imagem genérica porque não há foto disponível.
- Dados que estavam duplicados no site antigo (JSON e `data-inline.js`) já divergiam; usamos o JSON e o HTML publicado como fonte.
- Textos "Equipe e manutenção" e "Egressos" são placeholders do grupo.

---

## 10. Como trabalhar neste repositório

1. **Antes de mudar**: leia este arquivo e o `README.md`. Rode o site (`bundle exec jekyll serve`, abrir `http://localhost:4000/site-trace-teste/`
   — note o `baseurl`; para testar na raiz, rode com `--baseurl ""`).
2. **Ao mudar CSS/HTML**: confira em larguras de 320, 390, 768, 1280 px; teste teclado (Tab, Esc nos menus/janelas); confira contraste
   se mexer em cores; teste os modos "tema escuro", "mais contraste" e "menos movimento".
3. **Ao mudar conteúdo**: não reescreva textos da pessoa; use os campos descritos na seção 4.
4. **Ao adicionar imagem**: use `ferramentas/otimizar-imagens.py`; escreva `alt` real (ou `""` se for decorativa).
5. **Mantenha leve**: nada de dependências; confira o peso das páginas depois de grandes mudanças.
6. **Documente**: atualize `README.md`/`TUTORIAL-GITHUB.md` se mudar o processo, e este `CLAUDE.md` se mudar decisões.
7. **Explique para a pessoa em português simples**, e diga o que ela precisa fazer (por exemplo, "faça commit" ou "atualize a página").


- **EXPERIMENTO 2 (08/10) — "menos cara de template" — SÓ NA BRANCH, NÃO NA `main`:** bloco no FIM do `main.css` ("TESTE menos cara de template"; para desfazer, apagar dele até o fim): fonte Atkinson Hyperlegible no site todo, sem barrinha sob a maioria dos títulos (fica só nos títulos de seção da inicial), fundo neutro `#fbfaf7`, sombras discretas, cartões escuros lisos (sem pontinhos, brilho ou círculo), atalhos da inicial sem quadradinho de ícone nem seta, cartões de projeto/produção brancos com borda fina e sem "Conhecer o projeto →". Só publicar na `main` se a pessoa aprovar.

  - **Atualização do EXPERIMENTO 2 (08/10):** a pessoa pediu para voltar a **Poppins**, as **cores** (fundo e cartões) e as **formas/brilhos das faixas**. Ficaram só: sem barrinha sob a maioria dos títulos, sombras discretas, atalhos da inicial sem ícone em quadradinho/seta, cartão de projeto sem "Conhecer o projeto →". Continua só na branch.

  - **EXPERIMENTO 3 (08/10) — teste v3 "com intenção", SÓ NA BRANCH:** a pessoa achou a versão de cantos retos "enxuta" demais; arredondado não é problema, o ponto é usar com intenção. Bloco "TESTE v3" no fim do `main.css` (paleta `--pa-*` de 4 cores, atalhos em cores variadas, projeto principal em linha inteira, faixa de produções de ponta a ponta) + `index.html` com `.mod-faixa` e `.mod-destaques`. Três paletas candidatas (verde-azulado+mostarda, argila+musgo, tomate+preto) aguardando escolha; a padrão no CSS é a 1. Contraste AA ainda não conferido. Não publicar na `main` sem aprovação.

  - **EXPERIMENTO 4 (08/10) — inicial refeita do zero em 3 direções, SÓ NA BRANCH (a inicial oficial `index.html` NÃO foi trocada):** páginas de teste `/inicio-a/` (Bloom: creme, verde-escuro, Nunito, pílulas), `/inicio-b/` (Escuro: noite com teal/amarelo/coral) e `/inicio-c/` (Blocos de cor, uma cor por seção) — arquivos `inicio-a.html`, `inicio-b.html`, `inicio-c.html`, `assets/css/v5.css`, `assets/js/v5.js`, fontes `assets/fonts/nunito-*.woff2` (+ `LICENSE-Nunito.txt`, baixadas via npm `@fontsource/nunito`). Conceito comum: título enorme + demonstração "O mesmo texto, de outros jeitos" (parágrafo do grupo em Padrão / Letra ampliada / Braille automático / Contraste / Ouvir), mural (carrossel centralizado), "Explore o portal", projetos, produções em linhas, equipe. "O mesmo texto, de outros jeitos" e "Explore o portal" são textos de interface meus. A versão anterior ("mesa de leitura", papel+tinta+mostarda) foi REJEITADA ("horroroso"). Se nenhuma agradar, apagar esses arquivos. O JS do carrossel agora centraliza pelo slide.

  - **EXPERIMENTO 5 (08/10) — inicial refeita do zero de novo, SÓ NA BRANCH, em `/inicio-teste/` (`inicio-teste.html`, `assets/css/inicio.css`; a inicial oficial `index.html` NÃO foi trocada):** pedido da pessoa: menu e rodapé como estão; faixa verde de ponta a ponta com a etiqueta "Portal" sobre o título "TrAce" e o texto do grupo na direita; símbolo da logo (dois balões) vetorizado (`_includes/simbolo.html`, `assets/img/logo/simbolo.svg`, traçado da logo com potrace, só decorativo, bem fraquinho na faixa); blocos de atalho brancos e minimalistas sobrepostos à borda da faixa (ordem do menu: Quem somos, Membros, Projetos, Produções, Contato); **Mural de avisos** (carrossel centralizado cujos slides são links + lista de linhas); **projetos em destaque como botões horizontais** (imagem à esquerda, texto à direita, `_includes/projeto-linha.html`); **produções em lista de links** (`producao-linha.html`). Verdes testados para a faixa: `#0e4a38`, `#146c4f` (escolhido provisoriamente), `#2a5a45`, `#8fd0a8`, `#cfe3d2`. Fonte: Nunito (a pessoa gostou). **Nova coleção `avisos`** (`_avisos/*.md`, layout `_layouts/aviso.html`, modelo `_modelos/aviso-modelo.md`; hoje 3 avisos "placeholder" com a mesma imagem); o include do carrossel agora aceita slides com link (`g.url`). As páginas de teste `/inicio-a/`, `/inicio-b/`, `/inicio-c/` e `v5.css/js` foram APAGADAS (fonte Nunito mantida em `assets/fonts/`). Os textos "Mural de avisos", "Produções em destaque" e "Ver todos/Ver todas" são textos de interface.

  - **REGRA (08/10, dita pela pessoa): NENHUMA das mudanças dos EXPERIMENTOS 2, 3, 4 e 5 (sistema de design, "menos cara de template", paletas, páginas de teste, coleção `avisos`, fonte Nunito, carrossel centralizado, símbolo da logo, cabeçalho) deve ir para a `main`.** A autorização permanente "pode sempre publicar" **não vale para nada disso**. Só publicar na `main` se a pessoa pedir de novo, de forma explícita, dizendo o quê. Se for preciso publicar OUTRA correção, fazer cherry-pick só do commit necessário sobre a `main` (nunca enviar `HEAD`).
  - **Atualização do EXPERIMENTO 5 (08/10):** símbolo da logo retraçado com traços mais finos e mostrado INTEIRO e maior na faixa (antes cortado); atalhos coloridos na cor de cada página (`--f-*`); **carrossel de volta a uma imagem por vez** (o bloco "slide central com vizinhos" foi REMOVIDO do `main.css`; o JS continua centralizando pelo slide, funciona nos dois casos); **projetos colados** num bloco só com linhas separando; **transições entre seções** com arcos (`.in-arco`: faixa verde-clara `#dcebe2` atrás dos projetos e arco de papel de volta; arco de papel no fim da faixa do título). Só na branch.
  - **Atualização 2 do EXPERIMENTO 5 (08/10):** os arcos entre seções foram REJEITADOS ("tente algo mais simples"): agora a cor muda em linha reta. Numeração combinada com a pessoa: **sessão 1 = título, sessão 2 = botões para as outras páginas, sessão 3 = carrossel + avisos, sessão 4 = projetos, sessão 5 = produções.** A sessão 2 agora é uma faixa de ponta a ponta com os 5 botões COLADOS (sem espaço entre eles), cada um na cor da sua página.
  - **Atualização 3 do EXPERIMENTO 5 (08/10):** fundos ESCUROS pedidos pela pessoa: faixa do título em verde-floresta `#0e4a38`, e cada sessão (3, 4 e 5) com um verde diferente escurecendo até o rodapé (`#0f3b2e`, `#0b2f24`, `#07221a`; a pessoa estranhou 3 e 5 iguais com a 4 diferente); **borda amarela** (`--in-brilho`) entre as sessões 1 e 2; textos claros nas sessões escuras; projetos continuam num bloco branco. Só na branch.
  - **Atualização 4 do EXPERIMENTO 5 (08/10):** fundo ÚNICO para a página toda (o `#07221a` das produções, pedido da pessoa); transição entre sessões = divisor com o símbolo da logo no meio de uma linha fina (`.in-divisor`); **avisos num painel claro** (`.in-painel`, creme) para dar destaque; projetos com cantos mais quadrados e divisória de 4 px; **sessão 2 redesenhada** (ícone grande, nome embaixo, seta em círculo, barra amarela ao passar o mouse); **sessão 1: duas opções de enfeite** (`.in-hero--logos` = várias logos esvaecendo; `.in-hero--acess` = símbolos de acessibilidade como braille, Aa, som, legenda, olho, acesso, AD, mão; troque a classe do `<section class="in-hero">` e apague o enfeite que sobrar). Símbolos definidos uma vez em `_includes/simbolos-defs.html` (o antigo `simbolo.html` foi apagado). Só na branch.
  - **Atualização 5 do EXPERIMENTO 5 (08/10):** `inicio.css` foi REESCRITO limpo. Sessão 1: escolhida a opção dos **símbolos de acessibilidade**, agora organizados a partir do canto inferior direito, muito densos ali e esvaecendo para a esquerda/cima (padrão gerado por script, `<svg class="in-padrao">` no HTML, símbolos em `simbolos-defs.html`; as logos esvaecendo foram removidas). Sessão 2: **botões redondos** (círculo colorido com ícone branco e nome embaixo; anel amarelo ao passar o mouse), no lugar dos blocos. Sessão 3: sem fundo na sessão toda; **avisos em cartões brancos** (data em etiqueta, título, resumo; referência: exemplo 1 da pessoa) em `aviso-linha.html`. Sessão 4: **projetos em cartões** com imagem em cima e bloco de texto embaixo (ano · situação · primeiro tema; referência: exemplo 2) em `projeto-card.html` (o `projeto-linha.html` foi apagado). Só na branch.
  - **Atualização 6 do EXPERIMENTO 5 (08/10):** sessão 1: **símbolos de acessibilidade REMOVIDOS** (faixa lisa). Sessão 2: **quadrados brancos colados** (ícone na cor da página, nome, seta em círculo; barra amarela ao passar o mouse). Sessão 3 (referência: "exemplo 1" da pessoa, a lista com imagem grande ao lado): **mural de avisos em acordeão** — lista de cartões brancos à esquerda (um aviso aberto por vez, com data, resumo e botão "Ler o aviso") e a **imagem do aviso aberto à direita** (`_includes/aviso-acordeao.html`, `assets/js/inicio.js`; sem JavaScript todos ficam abertos e aparece só a 1ª imagem; no celular a imagem vem abaixo do item); o carrossel NÃO está mais nesta página (continua no `index.html` oficial). Sessão 4 (referência: "exemplo 2", cartões de eventos): **projetos como imagem alta (4:5) com etiqueta da situação no canto, ano em letras pequenas amarelas, título e frase, sem caixa**, e "Ver todos" com seta redonda (`_includes/projeto-card.html`). Só na branch.
  - **Atualização 7 do EXPERIMENTO 5 (08/10):** sessão 1 refeita no estilo do exemplo "eventspark" da pessoa: **tudo centralizado** (etiqueta "Portal", "TrAce" enorme, subtítulo com a última palavra em itálico amarelo, texto do grupo), **4 fotos inclinadas nos cantos** (capas de 3 projetos e do primeiro aviso, em moldura branca com etiqueta "Projeto"/"Aviso"; cortadas pela borda da tela; só aparecem a partir de 56em) e **formas coloridas** (círculos, triângulos, quadrados e traços nas cores das páginas) espalhadas; sem botão. Decorativo (`aria-hidden`). Só na branch.
  - **Atualização 8 do EXPERIMENTO 5 (08/10):** as fotos inclinadas do título foram REMOVIDAS (ficam as formas coloridas); a etiqueta "Portal" agora fica alinhada à esquerda do "T" (estranhava em cima do A); **botões da sessão 2 de uma borda à outra da página** (sem `container`). Só na branch.
  - **Atualização 9 do EXPERIMENTO 5 (08/10):** sessão 1: formas coloridas REMOVIDAS; fonte do título trocada para **Poppins** (700) e fundo igual ao da versão atual da `main` (pontinhos, brilho amarelo no canto, anel à esquerda). Sessão 3: **imagem à esquerda e avisos à direita; a imagem NÃO muda** ao abrir outro aviso (a pessoa achou inacessível; ela mostra o aviso mais recente e leva até ele); o acordeão só abre/fecha o texto. Sessão 4: texto de cada cartão num **bloco de fundo arredondado** verde um pouco mais claro (`#123d30`). Só na branch.
  - **Atualização 10 do EXPERIMENTO 5 (08/10):** fundo da página num verde um pouco mais claro (`--in-fundo: #0f3d2f`); sessão 4: bloco de texto dos cartões agora **claro** (`#f7f6f1`, texto escuro); sessão 5 (referência: lista de notícias com cartões brancos da pessoa): produções como **cartões brancos empilhados** com etiqueta do tipo (verde-menta) + ano em fonte monoespaçada, título, autoria e seta à direita (`producao-linha.html`, `.in-pr-*`). Só na branch.
  - **Atualização 11 do EXPERIMENTO 5 (08/10):** botão "Ver todos" dos projetos padronizado com o das produções (pílula amarela `.in-pilula`; o estilo com seta redonda foi removido); fundo da página ainda mais claro (`--in-fundo: #1b5e47`). Só na branch.
  - **Atualização 12 do EXPERIMENTO 5 (08/10):** fundo da página em **verde pastel suave** (`--in-fundo: #d3e6d9`), com títulos e divisores em verde escuro; a faixa do título (verde-floresta) e o rodapé continuam escuros. Só na branch.
