# Diagnóstico do site TrAce (07/10)

Feito localmente, no site construído pelo Jekyll, com Chromium (Playwright), **axe-core** (regras WCAG 2.0/2.1/2.2 A e AA + boas práticas) e **html-validate** (HTML + regras WCAG de técnicas H). Páginas: início, Quem somos, Membros, Projetos (lista e individuais, PP e LLA), Produções (lista e individual), Contato, Busca. Temas: claro, escuro e alto contraste; computador (1280 px) e celular (390 px).

## Resultado resumido
| Área | Situação |
|---|---|
| WCAG 2.2 AA (axe, automático) | **0 violações** nas 14 páginas × 3 temas × 2 larguras (depois das correções abaixo) |
| Contraste (1.4.3 / 1.4.11) | OK. Onde o axe não consegue medir (texto sobre degradê), medi pixel a pixel: 1 problema real, corrigido |
| Reflow (1.4.10) a 320 px / zoom 400% | OK, sem rolagem lateral em nenhuma página |
| Alvos de toque (2.5.8) | OK depois da correção (nenhum menor que 24 px; a maioria ≥ 44 px) |
| Teclado e foco (2.1.1, 2.4.7, 2.4.11) | Anel de foco em 100% dos elementos; 1 problema real nos filtros, corrigido |
| Movimento reduzido | OK: nenhuma animação/transição ativa com `prefers-reduced-motion` |
| HTML | 0 erros nas páginas oficiais; só avisos de estilo (usar `<section>` no painel de acessibilidade) |
| Dependências externas | **Nenhuma** (sem CDN, sem fontes externas, sem rastreadores) |

## O que foi corrigido neste diagnóstico
1. **Ordem dos títulos** nas listas de Projetos e Produções (cartões saltavam do h1 para h3): título oculto "Lista de ...".
2. **Selo PP/LLA**: o nome acessível não continha o texto visível ("PP"); refeito. O "i" agora é desenho, não texto.
3. **Pontos de referência (landmarks) repetidos**: buscas com nome próprio ("Busca rápida", "Buscar em todo o acervo"); redes do rodapé com `role="group"`; janelinha PP/LLA com `role="dialog"`.
4. **Contraste**: formas claras atrás do texto branco dos topos coloridos baixavam o contraste para 3,9:1 em alguns temas; agora ≥ 4,5:1.
5. **Alvos de toque**: migalhas ("Início / Projetos") e "Filtrar ..." ficavam com 21–23 px de altura; agora 44 px.
6. **Filtros fixos** mais altos que a tela: o foco do teclado chegava a controles fora da tela. Agora rolam por dentro.

## Peso e velocidade
- **Primeira carga no celular (sem rolar):** 208 KB (Contato) a 360 KB (Início). Páginas com muitas fotos (Membros) chegam a ~410 KB depois de rolar (fotos carregam sob demanda).
- **HTML:** ~25 a 54 KB por página (Membros é a maior, por ter 31 fotos).
- **CSS:** 124 KB sem compactar (**~24 KB** com gzip, que o GitHub Pages aplica sozinho). Há ~116 regras de **páginas de teste** que não estão no menu (`/inicio-novo/`, `/inicio-moderno/`, `/projetos-criativo/`).
- **JavaScript:** 24 KB (~6,6 KB com gzip), um arquivo só, sem bibliotecas.
- **Fontes:** Poppins ~113 KB (woff); Atkinson Hyperlegible só baixa se a pessoa ligar "Fonte de leitura".
- **Imagens:** WebP em várias larguras, `loading="lazy"` e `width/height` (sem "pulos" de layout). A maior é a capa do Lindworm (96 KB).
- **Conclusão:** o site é **leve** para um site com tanta imagem. Os pontos de melhoria são pequenos (abaixo).

## O que ainda recomendo (nenhum bloqueia o AA)
1. ~~Apagar as páginas de teste~~ — **feito em 07/10** (`inicio-novo`, `inicio-moderno` e `projetos-criativo` removidas, com o CSS delas).
2. **Compactar o CSS/JS** antes de publicar (economiza ~40% do CSS e do JS antes do gzip). Hoje não há etapa de build; só vale se o peso virar problema.
3. **Fotos de membros e capas** são de tamanho moderado; trocar os placeholders por fotos reais já otimizadas (script em `ferramentas/`).
4. **Testar com leitor de tela de verdade** (NVDA/Windows, VoiceOver/iPhone, TalkBack/Android) e em **Firefox e Safari**: tudo aqui foi testado só em Chromium. Isso é o que mais falta.
5. **Formulário de Contato** ainda é demonstrativo e o envio real não foi testado.

## O que as ferramentas NÃO provam
O axe cobre em torno de 30–40% dos critérios WCAG. Ficam para revisão humana: qualidade dos textos alternativos (hoje são provisórios), clareza da linguagem, ordem lógica de leitura em leitor de tela, vídeos com legenda/audiodescrição quando entrarem, e uso real por pessoas com deficiência. Para declarar "conforme WCAG 2.2 AA", o ideal é uma auditoria manual com leitor de tela.
