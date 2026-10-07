/* ==========================================================================
   TrAce · comportamentos do site
   Todo o conteúdo já vem pronto no HTML. Este arquivo só ADICIONA recursos
   (filtros, galeria ampliada, painel de leitura...). Sem JavaScript, o site
   continua inteiro e navegável.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var CHAVE = 'trace-a11y';

  function normalizar(texto) {
    return String(texto || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  function todos(seletor, base) {
    return Array.prototype.slice.call((base || doc).querySelectorAll(seletor));
  }

  /* 1. Painel de ajustes de leitura ----------------------------------------- */
  function iniciarPainelAcessibilidade() {
    var botao = doc.querySelector('[data-acess-botao]');
    var painel = doc.getElementById('painel-acess');
    if (!botao || !painel) return;

    var PASSOS = [0.9, 1, 1.1, 1.25, 1.4, 1.5];
    var padrao = { escala: 1, escuro: false, contraste: false, fonte: false, espaco: false, movimento: false };
    var estado = padrao;
    try { estado = Object.assign({}, padrao, JSON.parse(localStorage.getItem(CHAVE) || '{}')); } catch (e) { estado = Object.assign({}, padrao); }

    var menos = painel.querySelector('[data-acess-menos]');
    var mais = painel.querySelector('[data-acess-mais]');
    var valor = painel.querySelector('[data-acess-valor]');
    var restaurar = painel.querySelector('[data-acess-restaurar]');
    var opcoes = todos('[data-opcao]', painel);

    function passoAtual() {
      var melhor = 0;
      PASSOS.forEach(function (p, i) { if (Math.abs(p - estado.escala) < Math.abs(PASSOS[melhor] - estado.escala)) melhor = i; });
      return melhor;
    }

    function aplicar() {
      root.style.setProperty('--escala', estado.escala);
      toggleAttr('escuro', estado.escuro, 'sim');
      toggleAttr('contraste', estado.contraste, 'alto');
      toggleAttr('fonte', estado.fonte, 'leitura');
      toggleAttr('espaco', estado.espaco, 'amplo');
      toggleAttr('movimento', estado.movimento, 'reduzido');
      opcoes.forEach(function (o) { o.checked = !!estado[o.getAttribute('data-opcao')]; });
      var i = passoAtual();
      valor.textContent = Math.round(PASSOS[i] * 100) + '%';
      menos.disabled = i === 0;
      mais.disabled = i === PASSOS.length - 1;
      var mudou = estado.escala !== 1 || estado.escuro || estado.contraste || estado.fonte || estado.espaco || estado.movimento;
      restaurar.disabled = !mudou;
    }
    function toggleAttr(nome, ligado, valorAttr) {
      if (ligado) root.setAttribute('data-' + nome, valorAttr); else root.removeAttribute('data-' + nome);
    }
    function salvar() {
      try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* navegação privada */ }
      aplicar();
    }

    menos.addEventListener('click', function () { estado.escala = PASSOS[Math.max(0, passoAtual() - 1)]; salvar(); });
    mais.addEventListener('click', function () { estado.escala = PASSOS[Math.min(PASSOS.length - 1, passoAtual() + 1)]; salvar(); });
    opcoes.forEach(function (o) {
      o.addEventListener('change', function () { estado[o.getAttribute('data-opcao')] = o.checked; salvar(); });
    });
    restaurar.addEventListener('click', function () { estado = Object.assign({}, padrao); salvar(); });

    function abrir() {
      painel.hidden = false;
      botao.setAttribute('aria-expanded', 'true');
      var primeiro = painel.querySelector('button:not([disabled]), input');
      if (primeiro) primeiro.focus();
    }
    function fechar(devolverFoco) {
      painel.hidden = true;
      botao.setAttribute('aria-expanded', 'false');
      if (devolverFoco) botao.focus();
    }
    botao.addEventListener('click', function () { if (painel.hidden) abrir(); else fechar(true); });
    painel.querySelector('[data-acess-fechar]').addEventListener('click', function () { fechar(true); });
    painel.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.stopPropagation(); fechar(true); } });
    doc.addEventListener('click', function (e) {
      if (!painel.hidden && !painel.contains(e.target) && !botao.contains(e.target)) fechar(false);
    });

    aplicar();
  }

  /* 2. Menu em telas pequenas ----------------------------------------------- */
  function iniciarMenu() {
    var botao = doc.querySelector('[data-nav-botao]');
    var nav = doc.querySelector('[data-nav]');
    if (!botao || !nav) return;
    nav.hidden = true;                       // em telas grandes o CSS mantém o menu visível
    botao.setAttribute('aria-expanded', 'false');
    botao.addEventListener('click', function () {
      var abrir = nav.hidden;
      nav.hidden = !abrir;
      botao.setAttribute('aria-expanded', String(abrir));
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !nav.hidden && getComputedStyle(botao).display !== 'none') {
        nav.hidden = true;
        botao.setAttribute('aria-expanded', 'false');
        botao.focus();
      }
    });
  }

  /* 2b. Submenus do menu principal ------------------------------------------ */
  function iniciarSubmenus() {
    var itens = todos('.tem-submenu');
    if (!itens.length) return;
    function fechar(item) {
      item.classList.remove('aberto');
      var b = item.querySelector('[data-sub-botao]');
      if (b) b.setAttribute('aria-expanded', 'false');
    }
    function abrir(item) {
      itens.forEach(function (o) { if (o !== item) fechar(o); });
      item.classList.add('aberto');
      item.querySelector('[data-sub-botao]').setAttribute('aria-expanded', 'true');
    }
    itens.forEach(function (item) {
      var botao = item.querySelector('[data-sub-botao]');
      botao.addEventListener('click', function () {
        if (item.classList.contains('aberto')) fechar(item); else abrir(item);
      });
      item.addEventListener('focusout', function (e) {
        if (e.relatedTarget && !item.contains(e.relatedTarget)) fechar(item);
      });
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      itens.forEach(function (item) {
        if (item.classList.contains('aberto')) {
          var tinhaFoco = item.contains(doc.activeElement);
          fechar(item);
          if (tinhaFoco) item.querySelector('[data-sub-botao]').focus();
        }
      });
    });
    doc.addEventListener('click', function (e) {
      itens.forEach(function (item) { if (!item.contains(e.target)) fechar(item); });
    });
  }

  /* 3. Busca e filtros nas listas ------------------------------------------- */
  function iniciarFiltros(bloco) {
    var itens = todos('[data-item]', bloco);
    var campo = bloco.querySelector('[data-busca]');
    var contagem = bloco.querySelector('[data-contagem]');
    var vazio = bloco.querySelector('[data-vazio]');
    var limpar = bloco.querySelector('[data-limpar]');
    var caixas = todos('input[type="checkbox"][data-grupo]', bloco);
    var unidade = bloco.getAttribute('data-unidade') || 'item(ns) exibido(s).';

    var inicial = new URLSearchParams(window.location.search).get('q');
    if (campo && inicial) campo.value = inicial;

    function valoresDoItem(item, grupo) {
      return (item.getAttribute('data-' + grupo) || '').split('|');
    }

    function aplicar() {
      var termo = normalizar(campo ? campo.value : '').trim();
      var grupos = {};
      caixas.forEach(function (c) {
        if (!c.checked) return;
        var g = c.getAttribute('data-grupo');
        (grupos[g] = grupos[g] || []).push(c.value);
      });

      var visiveis = 0;
      itens.forEach(function (item) {
        var ok = !termo || normalizar(item.getAttribute('data-texto')).indexOf(termo) !== -1;
        Object.keys(grupos).forEach(function (g) {
          if (!ok) return;
          var doItem = valoresDoItem(item, g);
          var modoTodos = bloco.querySelector('[data-modo="todos"] [data-grupo="' + g + '"]');
          ok = modoTodos
            ? grupos[g].every(function (v) { return doItem.indexOf(v) !== -1; })
            : grupos[g].some(function (v) { return doItem.indexOf(v) !== -1; });
        });
        item.hidden = !ok;
        if (ok) visiveis += 1;
      });

      if (contagem) contagem.textContent = visiveis + ' ' + unidade;
      if (vazio) vazio.hidden = visiveis !== 0;
    }

    if (campo) campo.addEventListener('input', aplicar);
    caixas.forEach(function (c) { c.addEventListener('change', aplicar); });
    if (limpar) limpar.addEventListener('click', function () {
      caixas.forEach(function (c) { c.checked = false; });
      if (campo) { campo.value = ''; campo.focus(); }
      aplicar();
    });
    aplicar();
  }

  /* 4. Galeria com imagem ampliada ------------------------------------------ */
  function iniciarGaleria(lista) {
    var dlg = doc.querySelector('[data-lightbox]');
    if (!dlg || typeof dlg.showModal !== 'function') return;   // sem suporte: os links abrem a imagem direto
    var links = todos('a', lista);
    var img = dlg.querySelector('img');
    var legenda = dlg.querySelector('[data-lb-legenda]');
    var posicao = dlg.querySelector('[data-lb-posicao]');
    var anterior = dlg.querySelector('[data-lb-anterior]');
    var proxima = dlg.querySelector('[data-lb-proxima]');
    var fechar = dlg.querySelector('[data-lb-fechar]');
    var atual = 0;
    var origem = null;

    if (links.length < 2) { anterior.hidden = true; proxima.hidden = true; }

    function mostrar(n) {
      atual = (n + links.length) % links.length;
      var a = links[atual];
      img.src = a.getAttribute('href');
      img.alt = a.getAttribute('data-alt') || '';
      legenda.textContent = a.getAttribute('data-legenda') || '';
      posicao.textContent = (atual + 1) + ' de ' + links.length;
    }

    links.forEach(function (a, n) {
      a.setAttribute('aria-haspopup', 'dialog');
      a.addEventListener('click', function (e) {
        e.preventDefault();
        origem = a;
        mostrar(n);
        dlg.showModal();
      });
    });
    anterior.addEventListener('click', function () { mostrar(atual - 1); });
    proxima.addEventListener('click', function () { mostrar(atual + 1); });
    fechar.addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); mostrar(atual - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); mostrar(atual + 1); }
    });
    dlg.addEventListener('close', function () { if (origem) origem.focus(); });
  }

  /* 5. Vídeo: o player só é carregado depois do clique ---------------------- */
  function iniciarVideo(caixa) {
    var botao = caixa.querySelector('button');
    if (!botao) return;
    botao.addEventListener('click', function () {
      var quadro = doc.createElement('iframe');
      quadro.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(caixa.getAttribute('data-video')) + '?autoplay=1&rel=0';
      quadro.title = caixa.getAttribute('data-titulo') || 'Vídeo';
      quadro.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
      quadro.setAttribute('allowfullscreen', '');
      caixa.textContent = '';
      caixa.classList.add('carregado');
      caixa.appendChild(quadro);
      quadro.focus();
    });
  }

  /* 6. Página de busca ------------------------------------------------------- */
  function iniciarBuscaGeral() {
    var form = doc.querySelector('[data-busca-pagina]');
    if (!form) return;
    var campo = form.querySelector('input[type="search"]');
    var saida = doc.querySelector('[data-resultados]');
    var status = doc.querySelector('[data-status-busca]');
    var indice = null;

    function carregar(depois) {
      if (indice) { depois(); return; }
      fetch(form.getAttribute('data-indice'))
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (dados) { indice = dados; depois(); })
        .catch(function () { status.textContent = 'Não foi possível carregar o índice de busca.'; });
    }

    function buscar() {
      var termos = normalizar(campo.value).trim().split(/\s+/).filter(Boolean);
      saida.textContent = '';
      if (!termos.length) { status.textContent = ''; return; }
      var achados = indice.filter(function (d) {
        var palheiro = normalizar([d.titulo, d.resumo, d.tipo, d.ano, d.projeto || '', (d.temas || []).join(' ')].join(' '));
        return termos.every(function (t) { return palheiro.indexOf(t) !== -1; });
      });
      achados.forEach(function (d) {
        var li = doc.createElement('li');
        var h = doc.createElement('h2');
        var a = doc.createElement('a');
        a.href = d.url; a.textContent = d.titulo; h.appendChild(a);
        var meta = doc.createElement('p');
        meta.className = 'ref-tipo';
        meta.textContent = d.tipo + (d.ano ? ' · ' + d.ano : '');
        var p = doc.createElement('p');
        p.textContent = d.resumo || '';
        li.appendChild(h); li.appendChild(meta); li.appendChild(p);
        saida.appendChild(li);
      });
      status.textContent = achados.length
        ? achados.length + ' resultado(s) encontrado(s).'
        : 'Nenhum resultado para essa busca.';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      try { history.replaceState(null, '', '?q=' + encodeURIComponent(campo.value)); } catch (err) { /* ignora */ }
      carregar(buscar);
    });
    var inicial = new URLSearchParams(window.location.search).get('q');
    if (inicial) { campo.value = inicial; carregar(buscar); }
  }

  /* 6b. Janela com o e-mail da pessoa (sem JavaScript, o ícone abre o programa de e-mail) */
  function iniciarJanelaEmail() {
    var dlg = doc.querySelector('[data-dialogo-email]');
    if (!dlg || typeof dlg.showModal !== 'function') return;
    var nome = dlg.querySelector('[data-dlg-nome]');
    var email = dlg.querySelector('[data-dlg-email]');
    var aviso = dlg.querySelector('[data-dlg-aviso]');
    var abrirApp = dlg.querySelector('[data-dlg-abrir]');
    var origem = null;

    todos('[data-email]').forEach(function (a) {
      a.setAttribute('role', 'button');
      a.setAttribute('aria-haspopup', 'dialog');
      a.addEventListener('click', function (e) {
        e.preventDefault();
        origem = a;
        nome.textContent = a.getAttribute('data-nome');
        email.textContent = a.getAttribute('data-email');
        abrirApp.setAttribute('href', 'mailto:' + a.getAttribute('data-email'));
        aviso.textContent = '';
        dlg.showModal();
      });
      a.addEventListener('keydown', function (e) { if (e.key === ' ') { e.preventDefault(); a.click(); } });
    });

    dlg.querySelector('[data-dlg-copiar]').addEventListener('click', function () {
      var texto = email.textContent;
      function deu() { aviso.textContent = 'E-mail copiado.'; }
      function falhou() { aviso.textContent = 'Não foi possível copiar sozinho. Selecione o e-mail acima e copie.'; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(deu, falhou);
      } else {
        try {
          var faixa = doc.createRange(); faixa.selectNodeContents(email);
          var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(faixa);
          if (doc.execCommand('copy')) deu(); else falhou();
        } catch (err) { falhou(); }
      }
    });
    dlg.querySelector('[data-dlg-fechar]').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () { if (origem) origem.focus(); });
  }

  /* 7. Formulário de contato demonstrativo ---------------------------------- */
  function iniciarFormularioDemo(form) {
    var aviso = form.querySelector('[data-aviso]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (aviso) aviso.textContent = 'Formulário demonstrativo. Os dados não são enviados nesta versão do site.';
    });
  }

  /* 8. Botão "Voltar ao topo" (aparece depois de rolar a página) ------------ */
  function iniciarVoltarAoTopo() {
    var b = doc.querySelector('[data-topo]');
    if (!b) return;
    // o cabeçalho é fixo, então "#topo" não rola nada: rolamos até o início e levamos o foco para a logo
    todos('[data-topo], [data-topo-link]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo(0, 0);
        var logo = doc.querySelector('.marca');
        if (logo) logo.focus({ preventScroll: true });
      });
    });
    var agendado = false;
    function atualizar() {
      agendado = false;
      var mostrar = (window.pageYOffset || doc.documentElement.scrollTop) > 600;
      if (b.hidden === mostrar) b.hidden = !mostrar;
    }
    window.addEventListener('scroll', function () {
      if (!agendado) { agendado = true; window.requestAnimationFrame(atualizar); }
    }, { passive: true });
    atualizar();
  }

  /* 9. Botão "Baixar PDF": no computador abre o PDF em outra guia; no celular só baixa */
  function iniciarPdf() {
    var celular = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (!celular) return;
    todos('a[data-pdf]').forEach(function (a) {
      a.setAttribute('download', '');
      a.removeAttribute('target');
      var dica = a.querySelector('[data-pdf-dica]');
      if (dica) dica.textContent = '';
    });
  }

  /* 10. Carrossel acessível (não troca sozinho) ------------------------------ */
  function iniciarCarrossel(raiz) {
    var trilho = raiz.querySelector('[data-car-trilho]');
    var slides = todos('[data-car-slide]', raiz);
    var pontos = todos('[data-car-ponto]', raiz);
    var anterior = raiz.querySelector('[data-car-anterior]');
    var proximo = raiz.querySelector('[data-car-proximo]');
    var info = raiz.querySelector('[data-car-info]');
    if (!trilho || slides.length < 2 || !anterior || !proximo) return;
    raiz.classList.add('car-js');
    var atual = 0;

    function reduzido() {
      return (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
        doc.documentElement.getAttribute('data-movimento') === 'reduzido';
    }
    function mostrar(n, avisar) {
      atual = n;
      slides.forEach(function (s, i) { s.setAttribute('aria-hidden', i === n ? 'false' : 'true'); });
      pontos.forEach(function (p, i) { if (i === n) p.setAttribute('aria-current', 'true'); else p.removeAttribute('aria-current'); });
      // o aviso "Slide X de Y" só é falado depois que a pessoa troca de slide (não ao abrir a página)
      if (avisar) info.textContent = 'Slide ' + (n + 1) + ' de ' + slides.length;
    }
    function ir(n) {
      n = (n + slides.length) % slides.length;
      trilho.scrollTo({ left: n * trilho.clientWidth, behavior: reduzido() ? 'auto' : 'smooth' });
      mostrar(n, true);
    }
    var agendado = false;
    trilho.addEventListener('scroll', function () {
      if (agendado) return;
      agendado = true;
      window.requestAnimationFrame(function () {
        agendado = false;
        var n = Math.round(trilho.scrollLeft / trilho.clientWidth);
        if (n !== atual && n >= 0 && n < slides.length) mostrar(n, true);
      });
    }, { passive: true });
    anterior.addEventListener('click', function () { ir(atual - 1); });
    proximo.addEventListener('click', function () { ir(atual + 1); });
    pontos.forEach(function (p, i) { p.addEventListener('click', function () { ir(i); }); });
    trilho.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); ir(atual - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); ir(atual + 1); }
    });
    window.addEventListener('resize', function () { trilho.scrollLeft = atual * trilho.clientWidth; });
    mostrar(0, false);
  }

  /* 11. Botão "Copiar citação" nas produções ----------------------------------- */
  function iniciarCopiarCitacao() {
    var botao = doc.querySelector('[data-copiar-citacao]');
    var texto = doc.querySelector('[data-citacao]');
    var aviso = doc.querySelector('[data-citacao-aviso]');
    if (!botao || !texto) return;
    var rotulo = botao.textContent;
    var volta = null;
    function avisar(msg, ok) {
      aviso.textContent = msg;
      botao.textContent = ok ? 'Citação copiada' : rotulo;
      window.clearTimeout(volta);
      volta = window.setTimeout(function () { botao.textContent = rotulo; aviso.textContent = ''; }, 2500);
    }
    botao.addEventListener('click', function () {
      var t = texto.textContent.trim();
      function deu() { avisar('Citação copiada.', true); }
      function falhou() { avisar('Não foi possível copiar sozinho. Selecione a citação e copie.', false); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).then(deu, falhou);
      } else {
        try {
          var faixa = doc.createRange(); faixa.selectNodeContents(texto);
          var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(faixa);
          if (doc.execCommand('copy')) deu(); else falhou();
        } catch (err) { falhou(); }
      }
    });
  }

  /* Início ------------------------------------------------------------------ */
  function iniciar() {
    iniciarPainelAcessibilidade();
    iniciarMenu();
    iniciarSubmenus();
    todos('[data-filtravel]').forEach(iniciarFiltros);
    todos('details.filtros-det').forEach(function (d) { if (window.matchMedia('(max-width: 55.99em)').matches) d.removeAttribute('open'); });
    todos('[data-galeria]').forEach(iniciarGaleria);
    todos('[data-video]').forEach(iniciarVideo);
    todos('form[data-demo]').forEach(iniciarFormularioDemo);
    iniciarBuscaGeral();
    iniciarJanelaEmail();
    iniciarVoltarAoTopo();
    iniciarPdf();
    iniciarCopiarCitacao();
    todos('[data-carrossel]').forEach(iniciarCarrossel);
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', iniciar); else iniciar();
}());
