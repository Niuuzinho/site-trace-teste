---
# =====================================================================
# MODELO DE PROJETO
# Como usar:
#   1. Copie TODO o texto deste arquivo.
#   2. Na pasta _projetos, clique em "Add file" > "Create new file".
#   3. Dê um nome em letras minúsculas, com hifens, terminando em .md
#      (exemplo: meu-novo-projeto.md)
#   4. Cole o texto, troque as informações e clique em "Commit changes".
# As linhas que começam com # são só explicações: pode apagar.
# Não mude a palavra antes dos dois pontos (title, ano, temas...).
# Os recuos (espaços no começo da linha) importam: copie igual.
# =====================================================================
layout: projeto

# Nome do projeto (as produções do projeto precisam repetir ESTE nome
# exatamente, no campo "projeto:")
title: Nome do projeto

# Frase que aparece embaixo do título na página
subtitulo: Uma frase curta sobre o projeto

# Resumo curto, usado no cartão da lista
resumo: Resumo curto do projeto.

# Ano (número) ou texto, como "Em breve"
ano: 2026

# Exemplos: Em andamento, Concluído, Em breve
situacao: Em andamento

# Temas (cada um começa com "- "). Aparecem como etiquetas e nos filtros.
# Se algum tema tiver a palavra "livro" (por exemplo "livro multiformato"), o cartão do projeto na página inicial de teste mostra um livrinho no lugar da lâmpada.
temas:
- tema um
- tema dois

# Posição na lista e no menu. Use um número que ainda NÃO exista.
# (Os projetos de hoje usam 1, 2, 3, 4. Obrigatório.)
ordem: 5

# Aparecer na página inicial? Deixe "true". Para não aparecer, APAGUE a linha.
destaque: true

# Imagens: só o nome, SEM tamanho e SEM ".webp" (exemplo: projetos/meu-projeto-capa).
# Elas precisam ter sido preparadas antes: peça ajuda para gerar os tamanhos.
imagem: projetos/nome-da-imagem-do-cartao
capa: projetos/nome-da-imagem-do-banner
capa_alt: Descreva em uma frase o que aparece na imagem do banner.

# Ficha do projeto (cada item tem "rotulo" e "valor")
ficha:
- rotulo: Parceria
  valor: Nome da parceria
- rotulo: Formato
  valor: Impresso e digital

# Galeria de imagens. Se não tiver, APAGUE todo este bloco "galeria:".
galeria:
- imagem: projetos/nome-da-foto-1
  alt: Descreva a foto para quem não consegue ver.
  legenda: Legenda da foto 1

# Vídeo do YouTube: só o código (o que vem depois de "v=" no endereço).
# Se não tiver vídeo, APAGUE esta linha (a seção some sozinha).
video: codigoDoVideo

# PDF do projeto. Se não tiver, APAGUE esta linha.
pdf: /assets/docs/nome-do-arquivo.pdf

# Equipe do projeto. Se não tiver, APAGUE todo este bloco "equipe:".
equipe:
- nome: Nome da pessoa
  texto: O que a pessoa fez no projeto.
  foto: membros/nome-da-foto
  alt: Foto de Nome da pessoa.

# ---------------------------------------------------------------------
# LIVRO COM DUAS VERSÕES (Português padrão e Linguagem literária acessível)?
# Veja o passo a passo no README.md, na parte "Versão Linguagem literária
# acessível". Resumo: crie uma cópia deste arquivo com
#   title: Nome do projeto (versão LLA)
#   par: Nome do projeto
#   permalink: /projetos/nome-do-projeto/lla/
# e, na cópia, troque "ordem" por um número logo depois do original.
# ---------------------------------------------------------------------
---
Aqui embaixo vai o texto "Sobre o projeto", em parágrafos normais.

Para começar outro parágrafo, deixe uma linha em branco.
