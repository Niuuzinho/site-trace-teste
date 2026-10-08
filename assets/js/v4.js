/* Demonstração "o mesmo texto, de outros jeitos" (página de teste v4). Tudo opcional: sem JavaScript, só o texto padrão aparece. */
(function () {
  'use strict';
  var demo = document.querySelector('[data-v4-demo]');
  if (!demo) return;
  var texto = demo.querySelector('[data-v4-texto]');
  var botoes = demo.querySelector('[data-v4-botoes]');
  var aviso = demo.querySelector('[data-v4-aviso]');
  var original = texto.textContent.trim();
  var formatos = Array.prototype.slice.call(demo.querySelectorAll('[data-formato]'));
  var ouvir = demo.querySelector('[data-ouvir]');
  var nomes = { padrao: 'padrão', ampliada: 'letra ampliada', braille: 'braille', contraste: 'alto contraste' };

  // braille do português do Brasil (grau 1): letras, letras acentuadas e pontuação simples; maiúscula = ⠠ antes
  var MAPA = {
    a: '⠁', b: '⠃', c: '⠉', d: '⠙', e: '⠑', f: '⠋', g: '⠛', h: '⠓', i: '⠊', j: '⠚', k: '⠅', l: '⠇', m: '⠍',
    n: '⠝', o: '⠕', p: '⠏', q: '⠟', r: '⠗', s: '⠎', t: '⠞', u: '⠥', v: '⠧', w: '⠺', x: '⠭', y: '⠽', z: '⠵',
    'ç': '⠯', 'á': '⠷', 'à': '⠡', 'â': '⠣', 'ã': '⠜', 'é': '⠿', 'ê': '⠫', 'í': '⠌', 'ó': '⠬', 'ô': '⠹', 'õ': '⠪', 'ú': '⠾', 'ü': '⠳',
    ',': '⠂', '.': '⠲', ';': '⠆', ':': '⠒', '?': '⠦', '!': '⠖', ' ': ' '
  };
  function emBraille(t) {
    var saida = '';
    for (var i = 0; i < t.length; i++) {
      var c = t.charAt(i), minus = c.toLowerCase();
      var cel = MAPA[minus];
      if (cel === undefined) { saida += c; continue; }
      if (minus !== c) saida += '⠠';
      saida += cel;
    }
    return saida;
  }

  function parar() { if (window.speechSynthesis) window.speechSynthesis.cancel(); }
  function ouvirFim() { if (ouvir) ouvir.setAttribute('aria-pressed', 'false'); }

  function aplicar(nome) {
    parar(); ouvirFim();
    demo.setAttribute('data-formato', nome);
    formatos.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-formato') === nome ? 'true' : 'false'); });
    if (nome === 'braille') {
      texto.textContent = emBraille(original);
      texto.setAttribute('aria-label', original);
      texto.setAttribute('role', 'img');
    } else {
      texto.textContent = original;
      texto.removeAttribute('aria-label');
      texto.removeAttribute('role');
    }
    aviso.textContent = 'Formato: ' + nomes[nome] + '.';
  }

  botoes.hidden = false;
  formatos.forEach(function (b) { b.addEventListener('click', function () { aplicar(b.getAttribute('data-formato')); }); });

  if (ouvir) {
    if (!('speechSynthesis' in window) || typeof window.SpeechSynthesisUtterance === 'undefined') {
      ouvir.hidden = true;
    } else {
      ouvir.addEventListener('click', function () {
        if (ouvir.getAttribute('aria-pressed') === 'true') { parar(); ouvirFim(); aviso.textContent = 'Leitura parada.'; return; }
        parar();
        var fala = new window.SpeechSynthesisUtterance(original);
        fala.lang = 'pt-BR';
        fala.onend = ouvirFim; fala.onerror = ouvirFim;
        ouvir.setAttribute('aria-pressed', 'true');
        window.speechSynthesis.speak(fala);
      });
    }
  }
  window.addEventListener('pagehide', parar);
})();
