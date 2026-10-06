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
| `assets/css/main.css` | Aparência (cores e fontes ficam no começo do arquivo) |
| `assets/js/main.js` | Painel de acessibilidade, filtros, galeria, busca |
| `index.html`, `projetos.html`... | Páginas |

## Testar no seu computador

1. Instale o Ruby (https://www.ruby-lang.org) e depois o Bundler: `gem install bundler`.
2. Na pasta do site: `bundle install` (só na primeira vez).
3. `bundle exec jekyll serve` e abra http://localhost:4000.

Se aparecer algum erro, copie a mensagem inteira e envie para quem está ajudando com o site.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie todos os arquivos desta pasta.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, a branch `main` e a pasta `/ (root)`.
3. Se o endereço for `https://usuario.github.io/nome-do-repositorio`, edite `baseurl` no `_config.yml` para `"/nome-do-repositorio"`.

## Tarefas comuns

**Adicionar um projeto:** copie um arquivo de `_projetos/`, renomeie (use letras minúsculas e hifens) e edite os campos entre os `---`. O texto da seção "Sobre o projeto" fica abaixo do segundo `---`. `ordem` define a posição na lista; `destaque: true` faz o projeto aparecer na página inicial.

**Adicionar uma produção:** copie um arquivo de `_producoes/`. O campo `projeto` deve ter exatamente o título de um projeto para a produção aparecer na página dele e ganhar o link.

**Adicionar um membro:** copie um bloco de `_data/membros.yml`. Campos vazios (`""`) não aparecem.

**Trocar ou incluir uma imagem:** coloque a foto original em qualquer pasta e rode
`python3 ferramentas/otimizar-imagens.py foto.jpg membros/nome-da-pessoa 240,400`
(precisa de `pip install pillow pyyaml`). Depois use `membros/nome-da-pessoa` no campo `foto`. Para fotos de pessoas, prefira quadradas.

**Formulário de contato:** por enquanto é demonstrativo. Para receber mensagens, crie um formulário gratuito (Formspree, Getform...) e cole o endereço em `formulario_url` no `_config.yml`.

**Redes sociais:** preencha `redes` no `_config.yml`; só aparecem as que tiverem endereço.

**Vídeo do projeto:** o campo `video` recebe só o código do YouTube (o que vem depois de `v=`). Apague a linha para esconder a seção.

## Acessibilidade e leveza

- HTML semântico, link "pular para o conteúdo", um `h1` por página, migalhas de pão, rótulos em todos os campos e `alt` em todas as imagens.
- Listas, filtros e conteúdo já vêm prontos no HTML: tudo funciona sem JavaScript (os filtros e a galeria ampliada são um extra).
- Painel "Acessibilidade": tamanho do texto, fonte de leitura, contraste, espaçamento e menos movimento. As escolhas ficam salvas no navegador.
- Respeita as preferências do sistema: modo escuro, "reduzir movimento" e cores forçadas.
- Imagens em WebP em vários tamanhos, com tamanho reservado para a página não "pular".
- Sem frameworks; uma fonte hospedada no próprio site; o vídeo só carrega depois do clique.
- Para a "Fonte de leitura" usar a Atkinson Hyperlegible, baixe os arquivos .woff2 (licença livre) para `assets/fonts/` e remova os comentários do `@font-face` no começo do `main.css`. Sem isso, o site usa Verdana/Tahoma, que também são fontes de boa legibilidade.

Sugestão: depois de publicar, teste com o Lighthouse (no Chrome: F12 → Lighthouse) e com um leitor de tela (NVDA no Windows, VoiceOver no Mac/iPhone, TalkBack no Android).

## Pendências do conteúdo (não resolvi para não alterar o seu texto)

- Em `_data/membros.yml`, três pessoas (Manoela, Matheus e Letícia) usam imagem genérica, mas há foto real pronta em `assets/img/membros/`. Os comentários no arquivo dizem qual trocar.
- O texto de "Quem somos" parece ser um trecho da descrição do projeto Lindworm.
- Os dois projetos usam o mesmo vídeo de teste (`tgbNymZ7vqY`).
- Todos os botões "Baixar PDF" apontam para `assets/docs/placeholder-projeto.pdf`.
- Digitação a revisar: "Prince Lindworm", "século XIX é originalmente" (projeto Lindworm) e "Liguagem Fácil" (membros).
- Redes sociais e formulário ainda não configurados.

## Licenças

A fonte Lora é licenciada sob a SIL OFL 1.1 (veja `LICENSE-fontes.txt`).
