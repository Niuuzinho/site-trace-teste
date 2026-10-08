/* Página inicial de teste: mural de avisos em acordeão (um aviso aberto por vez). Sem JavaScript, todos os avisos ficam abertos. */
(function () {
  'use strict';
  var lista = document.querySelector('[data-acordeao]');
  if (!lista) return;
  var itens = Array.prototype.slice.call(lista.querySelectorAll('.in-ac-item'));
  if (itens.length < 2) return;
  lista.classList.add('js');
  function abrir(n) {
    itens.forEach(function (li, i) {
      var btn = li.querySelector('.in-ac-btn');
      var painel = li.querySelector('.in-ac-painel');
      var ativo = i === n;
      li.classList.toggle('is-ativo', ativo);
      btn.setAttribute('aria-expanded', ativo ? 'true' : 'false');
      painel.hidden = !ativo;
    });
  }
  itens.forEach(function (li, i) {
    li.querySelector('.in-ac-btn').addEventListener('click', function () { abrir(i); });
  });
  abrir(0);
})();
