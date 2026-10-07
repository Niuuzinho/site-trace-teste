# Site do TrAce

Site estático do grupo de pesquisa TrAce (Tradução e Acessibilidade), feito com [Jekyll](https://jekyllrb.com).
Cada projeto, produção e membro é um arquivo de texto simples; o Jekyll monta as páginas sozinho.

## Como o site está organizado

| Onde | O que tem |
|---|---|
| `_projetos/` | Um arquivo por projeto (ex.: `o-principe-lindworm.md`) |
| `_producoes/` | Um arquivo por artigo, capítulo, TCC, dissertação, videolivro... |
| `_data/membros.yml` | Lista de membros, consultores e orientadora |
| `_data/egressos.yml` | Nomes de egressos |
| `_data/galeria_grupo.yml` | Fotos da galeria da página "Quem somos" |
| `_data/navegacao.yml` | Itens do menu |
| `_config.yml` | Título, formulário de contato, redes sociais, texto do rodapé |
| `assets/img/` | Imagens já otimizadas (WebP) |
| `assets/css/main.css` | Aparência (cores, fontes e medidas ficam na seção 2, no começo do arquivo) |
| `assets/js/main.js` | Painel de acessibilidade, filtros, galeria, busca |
| `index.html`, `projetos.html`... | Páginas |

## Testar no seu computador

1. Instale o Ruby (https://www.ruby-lang.org) e depois o Bundler: `gem install bundler`.
2. Na pasta do site: `bundle install` (só na primeira vez).
3. `bundle exec jekyll serve` e abra http://localhost:4000.

Se aparecer algum erro, copie a mensagem inteira e envie para quem está ajudando com o site.

## Publicar no GitHub Pages

O passo a passo completo, para o repositório `site-trace-teste`, está em **TUTORIAL-GITHUB.md**. O resumo:

1. Crie um repositório no GitHub e envie todos os arquivos desta pasta.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, a branch `main` e a pasta `/ (root)`.
3. O `_config.yml` já vem com `baseurl: "/site-trace-teste"`. Se o repositório tiver outro nome, troque aqui pelo nome certo; se o endereço for só `https://usuario.github.io`, deixe vazio (`""`).

## Tarefas comuns

**Menu e submenus:** edite `_data/navegacao.yml`. O submenu "Projetos" lista os projetos sozinho; o submenu "TrAce" (Sobre nós e Membros) é uma lista que você pode alterar.

**Adicionar um projeto:** copie um arquivo de `_projetos/`, renomeie (use letras minúsculas e hifens) e edite os campos entre os `---`. O texto da seção "Sobre o projeto" fica abaixo do segundo `---`. `ordem` define a posição na lista; `destaque: true` faz o projeto aparecer na página inicial.

**Adicionar uma produção:** copie um arquivo de `_producoes/`. O campo `projeto` deve ter exatamente o título de um projeto para a produção aparecer na página dele e ganhar o link. No computador o botão "Baixar PDF" abre o PDF em outra guia; no celular ele baixa direto. Para a produção ter botão "Baixar PDF", coloque `pdf: /assets/docs/nome-do-arquivo.pdf` no começo do arquivo (sem esse campo, o botão não aparece).

**Adicionar um membro:** copie um bloco de `_data/membros.yml`. Campos vazios (`""`) não aparecem.

**Trocar ou incluir uma imagem:** coloque a foto original em qualquer pasta e rode
`python3 ferramentas/otimizar-imagens.py foto.jpg membros/nome-da-pessoa 240,400`
(precisa de `pip install pillow pyyaml`). Depois use `membros/nome-da-pessoa` no campo `foto`. Para fotos de pessoas, prefira quadradas.

**Formulário de contato:** por enquanto é demonstrativo. Para receber mensagens, crie um formulário gratuito (Formspree, Getform...) e cole o endereço em `formulario_url` no `_config.yml`.

**Redes sociais:** o Instagram do grupo já está em `redes` no `_config.yml` e aparece no rodapé e na página Sobre nós. Preencha o YouTube se quiser; só aparecem as redes com endereço.

**Contato dos membros:** os ícones de e-mail, Lattes e LinkedIn aparecem só quando o campo está preenchido em `_data/membros.yml`. O ícone de e-mail abre uma janelinha com o endereço, o botão "Copiar e-mail" e o botão "Escrever e-mail" (que abre o programa de e-mail); sem JavaScript, ele abre o programa de e-mail direto.

**Vídeo do projeto:** o campo `video` recebe só o código do YouTube (o que vem depois de `v=`). Apague a linha para esconder a seção.

## Cores de cada página

Cada seção tem a sua cor, que aparece na faixa do topo, nos títulos, nos links e na barrinha colorida do menu:
Início (verde-azulado), Sobre nós (rosa), Membros (verde), Projetos (azul), Produções (roxo) e Contato (laranja). O fundo é o mesmo azul bem clarinho em todas as páginas (variável `--fundo`), e os textos ficam em caixas brancas (classe `caixa`) para dar contraste.
Projetos e produções usam sozinhos a cor de Projetos e de Produções. Para mudar uma cor, edite as linhas `--f-...`, `--i-...` e `--s-...`
no começo do `main.css` (f = botões e bordas, i = texto e links, s = fundo suave, b = faixa do topo, g = fundo da página). Se trocar, mantenha o contraste: texto branco sobre a faixa e links sobre fundo branco precisam de pelo menos 4,5:1 (use um verificador como o contrastchecker.com).
Para dar cor a uma página nova, coloque `tema: sobre` (ou `membros`, `projetos`, `producoes`, `contato`) no começo do arquivo dela.

## Acessibilidade e leveza

- Menu fixo no topo (acompanha a rolagem), compacto no celular e que deixa de ser fixo em janelas muito baixas. Os links de âncora não ficam escondidos atrás dele.
- Texto escuro sobre fundo branco (contraste acima de 16:1), texto escuro sobre as faixas coloridas (acima de 13:1), links com pelo menos 6:1 e botões com texto branco acima de 5:1. A cor nunca é a única pista: cada página também tem título e item de menu com o seu nome.
- Fonte: Poppins (redonda e amigável), hospedada no próprio site. Para usar a Nunito, que é realmente arredondada (a que o site antigo pedia, mas não carregava), veja o começo do `main.css`: baixe a fonte, salve em `assets/fonts/` e remova os comentários.
- A ficha de projetos e produções é um cartão ao lado do texto no computador; no celular ela vem logo depois do texto principal. A ordem de leitura é a mesma para todos e a ficha não atrapalha com zoom ou texto ampliado.
- O site é sempre claro por padrão, mesmo que o aparelho esteja em modo escuro. O tema escuro é uma opção do painel "Acessibilidade".
- Sem animações quando a página abre. Só há pequenas transições ao passar o mouse e submenus que aparecem suavemente; tudo é desligado pela opção "Menos movimento" e pela preferência do sistema.
- HTML semântico, link "pular para o conteúdo", um `h1` por página, migalhas de pão, rótulos em todos os campos e `alt` em todas as imagens.
- Listas, filtros e conteúdo já vêm prontos no HTML: tudo funciona sem JavaScript (os filtros e a galeria ampliada são um extra).
- Painel "Acessibilidade": tamanho do texto, fonte de leitura, contraste, espaçamento e menos movimento. As escolhas ficam salvas no navegador.
- Respeita as preferências do sistema: modo escuro, "reduzir movimento" e cores forçadas.
- Imagens em WebP em vários tamanhos, com tamanho reservado para a página não "pular".
- Sem frameworks; uma fonte hospedada no próprio site; o vídeo só carrega depois do clique.
- Para a "Fonte de leitura" usar a Atkinson Hyperlegible, baixe os arquivos .woff2 (licença livre) para `assets/fonts/` e remova os comentários do `@font-face` no começo do `main.css`. Sem isso, o site usa Verdana/Tahoma, que também são fontes de boa legibilidade.

Sugestão: depois de publicar, teste com o Lighthouse (no Chrome: F12 → Lighthouse) e com um leitor de tela (NVDA no Windows, VoiceOver no Mac/iPhone, TalkBack no Android).

## Pendências do conteúdo (não resolvi para não alterar o seu texto)

- Em `_data/membros.yml`, duas pessoas (Matheus e Letícia) usam imagem genérica, mas há foto real pronta em `assets/img/membros/`. Os comentários no arquivo dizem qual trocar.
- O texto de "Quem somos" parece ser um trecho da descrição do projeto Lindworm.
- A imagem de cabeçalho do projeto AD de Libras é um placeholder ("LIVRO 2"); a imagem correta do projeto é `projetos/ad-libras-capa`. Troque o campo `capa` no arquivo do projeto.
- Os dois projetos usam o mesmo vídeo de teste (`tgbNymZ7vqY`).
- Todos os botões "Baixar PDF" (de projetos e de produções) apontam para `assets/docs/placeholder-projeto.pdf`.
- Digitação a revisar: "Prince Lindworm", "século XIX é originalmente" (projeto Lindworm) e "Liguagem Fácil" (membros).
- Redes sociais e formulário ainda não configurados.

## Licenças

A fonte Lora é licenciada sob a SIL OFL 1.1 (veja `LICENSE-fontes.txt`).

## Apoio no rodapé
Para mostrar logos de instituições que apoiam o grupo, edite `_data/apoio.yml` (há um exemplo comentado no próprio arquivo). Enquanto a lista estiver vazia, a faixa "Apoio" não aparece.


### Projetos que são livros: duas versões para baixar
No começo do arquivo do projeto, no lugar de `pdf:`, use `downloads:` com uma linha para cada versão:

```
downloads:
  - rotulo: Português padrão
    arquivo: /assets/docs/nome-do-arquivo.pdf
  - rotulo: Linguagem literária acessível
    arquivo: /assets/docs/outro-arquivo.pdf
```
Cada versão vira um cartão com o botão "Baixar PDF". Projetos que não são livros continuam usando só `pdf:`.
