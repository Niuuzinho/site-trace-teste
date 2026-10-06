# Como colocar o site no ar com o GitHub (repositório `site-trace-teste`)

Tempo estimado: 15 a 20 minutos. Você não precisa instalar nada.

## Antes de começar
- Descompacte o arquivo `site-trace-jekyll.zip`. Vai aparecer uma pasta chamada `site-trace`. **É o conteúdo dessa pasta que vai para o GitHub.**
- O repositório precisa ser **público** (Public). O GitHub Pages gratuito não publica repositórios privados.
- O arquivo `_config.yml` já vem com `baseurl: "/site-trace-teste"`, o nome do seu repositório. Não precisa mexer.

## Passo 1: enviar os arquivos
O GitHub aceita até 100 arquivos por envio pelo navegador, e o site tem mais do que isso. Por isso o envio é em **dois lotes**.

1. Abra o seu repositório `site-trace-teste` no GitHub.
2. Clique em **Add file → Upload files** (ou no link "uploading an existing file", se o repositório estiver vazio).
3. **Lote 1:** abra a pasta `site-trace` no seu computador e arraste **somente a pasta `assets`** para a janela do GitHub. Espere terminar de carregar a lista de arquivos.
4. Role a página até o fim e clique em **Commit changes** (botão verde).
5. Volte ao repositório e clique de novo em **Add file → Upload files**.
6. **Lote 2:** selecione **tudo o que sobrou** dentro da pasta `site-trace` (as pastas `_data`, `_includes`, `_layouts`, `_producoes`, `_projetos`, `ferramentas` e os arquivos soltos, como `index.html`, `_config.yml`, `README.md`...) e arraste para a janela do GitHub. Não arraste a pasta `assets` de novo.
7. Clique em **Commit changes**.

Dica: se preferir enviar tudo de uma vez, instale o **GitHub Desktop** (desktop.github.com), que não tem limite de arquivos. Mas o caminho acima funciona bem.

## Passo 2: ligar o GitHub Pages
1. No repositório, clique em **Settings** (Configurações).
2. No menu da esquerda, clique em **Pages**.
3. Em **Source** (Fonte), escolha **Deploy from a branch**.
4. Em **Branch**, escolha **main** e a pasta **/ (root)**. Clique em **Save**.

## Passo 3: esperar e abrir o site
1. Clique na aba **Actions** do repositório. Vai aparecer uma execução chamada "pages build and deployment". Espere o círculo amarelo virar um **✓ verde** (leva de 1 a 3 minutos).
2. O endereço do site é: **https://SEU-USUARIO.github.io/site-trace-teste/** (troque SEU-USUARIO pelo seu nome de usuário do GitHub).
3. Também aparece no topo da página **Settings → Pages**.

## Se algo der errado
- **Um ✗ vermelho na aba Actions:** clique na execução, depois em "build", copie a mensagem de erro inteira e envie para quem está te ajudando com o site. Esse erro mostra exatamente onde está o problema.
- **O site abre sem cores, só texto:** quase sempre é o `baseurl` do `_config.yml`. Ele precisa ser exatamente `"/site-trace-teste"` (com a barra no começo e o mesmo nome do repositório).
- **Erro 404 (página não encontrada):** confira se, em Settings → Pages, a branch é `main` e a pasta é `/ (root)`, e se o arquivo `index.html` está na raiz do repositório (não dentro de outra pasta).
- **Mudou algo e não apareceu:** espere 1 a 2 minutos e atualize a página com Ctrl+F5.

## Depois de publicado: como editar
1. No GitHub, abra o arquivo que quer mudar (por exemplo, `_projetos/o-principe-lindworm.md`).
2. Clique no ícone de **lápis** (Edit this file).
3. Faça a mudança e clique em **Commit changes**. O site se atualiza sozinho em cerca de 1 a 2 minutos.

O `README.md` explica como adicionar projetos, produções e membros e como trocar imagens.

## Quando for para o endereço definitivo
Se um dia o site mudar de repositório ou ganhar um domínio próprio, troque o `baseurl` no `_config.yml`:
- repositório com outro nome: `baseurl: "/nome-do-novo-repositorio"`;
- endereço do tipo `usuario.github.io` ou domínio próprio: `baseurl: ""`.
