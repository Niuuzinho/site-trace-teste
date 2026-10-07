# Sistema de design do site TrAce

Experimento feito em 07/10, **ainda não publicado na `main`**. Tudo no CSS (`assets/css/main.css`) referencia os valores abaixo, que ficam no bloco "SISTEMA DE DESIGN" no começo do arquivo (dentro de `:root`). Para mudar o visual do site inteiro, mude lá.

## Valores

| O quê | Valores | Para que serve |
|---|---|---|
| **Cores de página** | `--f-*` forte, `--i-*` texto, `--s-*` suave, `--b-*` faixa (uma família por página) | cada página tem a sua cor |
| **Neutros** | `--branco`, `--preto`, `--tinta`, `--tinta-2`, `--caju` (amarelo), `--tinta-caju` | texto e destaques |
| **Raios** | `--r-s` 0,25 rem · `--r-m` 0,75 rem · `--r-g` 1,5 rem · `--r-pill` · `--r-circulo` | só 3 valores + pílula + círculo |
| **Assimetrias** | `--r-etiqueta` (etiquetas, chips, avisos) · `--r-recado` (blocos grandes) | a assimetria que o grupo gosta, feita só com os raios acima |
| **Espaços** | `--e1` 0,25 · `--e2` 0,5 · `--e3` 0,75 · `--e4` 1 · `--e5` 1,5 · `--e6` 2 · `--e7` 3 · `--e8` 4,5 (rem) | margens, preenchimentos e vãos |
| **Tamanhos de texto** | `--t-xs` 0,8 · `--t-s` 0,9 · `--t-base` 1 · `--t-m` 1,125 · `--t-g` 1,375 (rem) | texto corrido e interface |
| **Títulos (fluidos)** | `--t-h4` · `--t-h3` · `--t-h2` · `--t-h1` · `--t-display` | crescem com a tela |
| **Pesos** | `--w-normal` 400 · `--w-medio` 500 · `--w-forte` 700 | só os 3 pesos da fonte |
| **Entrelinhas** | `--lh-display` 1,05 · `--lh-titulo` 1,15 · `--lh-ui` 1,4 · `--lh-texto` 1,65 | texto longo usa `--entrelinha` (o painel de acessibilidade altera) |
| **Sombras** | `--sombra-1` repouso · `--sombra-2` elevado/janelas · `--sombra-3` pequena | 3 níveis |
| **Movimento** | `--dur-1` 150 ms · `--dur-2` 250 ms · `--ease` cubic-bezier(0,22, 1, 0,36, 1) | todas as transições |
| **Elevação ao passar o mouse** | `--lift-1` 2 px (botões) · `--lift-2` 4 px (cartões) · `--mov` 4 px (setas) | no máximo 4 px |
| **Ícones** | `--ic-s` 1,1 rem · `--ic-m` 1,25 rem · `--ic-g` 1,6 rem | pequeno com texto pequeno, grande dentro de círculo |

## Regras
- **Não escrever números soltos** de cor, raio, tamanho, espaço, sombra ou tempo no CSS. Usar o valor do sistema. Se faltar um valor, **acrescentar ao sistema**, não ao componente.
- **Sem animação ao abrir a página** (regra do grupo). Só: transições ao passar o mouse, aparecer do submenu, e indicadores de carregamento. Tudo some com "Menos movimento" e `prefers-reduced-motion`.
- **Estados de carregamento só onde há espera real:** botão "Enviar" (indicador + "Enviando…"), busca (esqueleto se o índice demorar mais de 150 ms) e vídeo (aviso até o player aparecer).
- **Mudar um valor do sistema muda o site todo.** Depois de mudar, confira a rolagem lateral a 1024 px: o cabeçalho é apertado (o menu usa espaçamento próprio entre 64 e 72 em).

## Lista "evitar cara de site feito por IA": o que foi feito

| Item | Situação |
|---|---|
| Gradientes roxos genéricos | Não há. Os gradientes são verdes/da cor de cada página |
| Brilhos e emojis no título principal | Não há |
| Brilho genérico ao passar o mouse | Não há. O hover usa sombra neutra e sobe no máximo 4 px |
| **Brilho amarelo no canto dos cartões escuros** | **Existe (decoração em repouso, não hover).** Foi escolhido pelo grupo, então ficou. Dá para remover |
| Escala tipográfica definida | Feito (5 passos + 5 títulos fluidos; 37 tamanhos viraram 15, e os 15 restantes são o sistema mais 5 casos relativos) |
| Pesos consistentes | Feito (3 pesos) |
| Entrelinha uniforme | Feito (4 valores nomeados) |
| Componentes no mesmo lugar em todas as páginas | Já era assim (cabeçalho, faixa do topo, rodapé) |
| Raios consistentes (2 a 3) | Feito (3 + pílula + círculo; eram 33 combinações) |
| Hover sutil (2 a 4 px) | Feito (2 e 4 px, em variáveis) |
| Ícones proporcionais ao texto | Feito (3 tamanhos) |
| Ícones sociais que não funcionam | Não há. Só Instagram, que funciona (YouTube só aparece se houver endereço) |
| Curvas de movimento (cubic-bezier) | Feito (uma curva para tudo) |
| Escalonar animações | **Não se aplica:** o grupo pediu sem animação de entrada |
| Toda animação com propósito | Feito: só hover, submenu e carregamento |
| Estados de carregamento | Feito (botão, busca, vídeo). Páginas são estáticas |
| Barras de progresso em botões | Feito (indicador giratório no "Enviar") |
| Carrossel e alternâncias funcionais | Já eram |
| **Telas de esqueleto** | **Só na busca.** O site é estático: as imagens já reservam espaço e têm cor de fundo |
| Excesso de travessões e frases vazias | Não há na interface. Os textos do grupo não foram tocados |
| Depoimentos e rostos falsos | Não há. Os "Integrante placeholder" são provisórios do grupo |

## O que mudou de aparência (pequeno)
- Raios dos cartões e blocos: 1,4 a 1,75 rem → 1,5 rem; etiquetas assimétricas: cantos de 0,25 e 0,75 rem.
- Letras muito pequenas (0,72 a 0,85 rem) subiram para 0,8 ou 0,9 rem; as de 1,25 a 1,5 rem desceram para 1,375 rem. As páginas ficam 1 a 2% mais altas ou mais baixas.
- Menu: espaçamento horizontal entre 64 e 72 em ficou 0,5 rem (era 0,7), para caber a 1024 px.
- Filtros de Projetos e Produções: em telas com menos de 55 rem de altura deixam de acompanhar a rolagem.
