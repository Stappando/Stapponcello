/* ══════════════════════════════════════════════════════════
   Stappando · disegno della scheda prodotto
   window.schedaProdotto(p)        → una scheda
   window.grigliaProdotti(el,lista)→ una griglia
   window.caroselloProdotti(el,lista) → un carosello con frecce
   Il clic su "Aggiungi" apre il carrello a finestra.
   ══════════════════════════════════════════════════════════ */
(function(){
'use strict';
var SOGLIA_CANTINA = 69;   /* ogni cantina spedisce gratis da qui */
var esc = function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');};
var eur = function(n){return Number(n).toLocaleString('it-IT',
  {minimumFractionDigits:2,maximumFractionDigits:2}) + ' €';};

var STELLA='<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 3 2.6 5.8 6.4.7-4.8 4.3 1.3 6.2L12 17l-5.5 3 1.3-6.2L3 9.5l6.4-.7z"/></svg>';
var TREND='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 17 10 11l4 4 6-6"/><path d="M15 9h5v5"/></svg>';
var CAMION='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="13" height="10" rx="2"/><path d="M15 10h3.5l2.5 3v4h-6"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>';
var COPPA='<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3h8l-1 6a4 4 0 0 1-6 0Z"/><path d="M12 13v6"/><path d="M8 21h8"/><path d="M16 5h3v2a3 3 0 0 1-3 3"/><path d="M8 5H5v2a3 3 0 0 0 3 3"/></svg>';
var FOGLIA='<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-9 0 9-3 16-9 16Z"/><path d="M4 20c3-6 7-8 11-9"/></svg>';
var CART='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h2l1.5 11h10L20 8H7"/><circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none"/><circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none"/></svg>';

function scheda(p){
  var sconto = p.prima ? Math.round((1 - p.prezzo / p.prima) * 100) : 0;
  return '<article class="pc" data-id="'+p.id+'">'+
    '<div class="pc-foto">'+
      (p.punteggio ? '<span class="pc-l">'+esc(p.punteggio)+'</span>' : (p.bio ? '<span class="pc-l">Bio</span>' : ''))+
      (p.badge ? '<span class="pc-r '+(p.badgeKind||'')+'">'+esc(p.badge)+'</span>' : '')+
      '<img src="'+p.foto+'" alt="'+esc(p.nome)+' · '+esc(p.cantina)+'" loading="lazy">'+
    '</div>'+
    '<div class="pc-body">'+
      '<span class="pc-cantina">'+esc(p.cantina)+'</span>'+
      '<a class="pc-nome" href="prodotto.html">'+esc(p.nome)+'</a>'+
      '<div class="pc-chips">'+
        '<span class="pc-chip">'+esc(p.tipo)+'</span>'+
        '<span class="pc-chip">'+esc(p.regione)+'</span>'+
        '<span class="pc-chip voto">'+STELLA+p.voto.toLocaleString('it-IT',{minimumFractionDigits:1})+'</span>'+
      '</div>'+
      (p.premi && p.premi.length
        ? '<div class="pc-premi">'+p.premi.map(function(x){
            var bio = /bio|vegan|sqnpi/i.test(x);
            return '<span class="pc-premio'+(bio ? ' verde' : '')+'">'+
              (bio ? FOGLIA : COPPA)+esc(x)+'</span>';
          }).join('')+'</div>'
        : '')+
      (p.desc ? '<p class="pc-desc">'+esc(p.desc)+'</p>' : '')+
      '<p class="pc-sales">'+TREND+p.acquisti+' acquisti · ultimi 7 giorni</p>'+
      '<div class="pc-foot">'+
        '<span class="pc-prezzo">'+(p.prima ? '<s>'+eur(p.prima)+'</s>' : '')+eur(p.prezzo)+
        (sconto ? ' ' : '')+'</span>'+
        '<button class="pc-buy" type="button" data-add="'+p.id+'">'+CART+'<span>Aggiungi al carrello</span></button>'+
        '<p class="pc-sped">'+CAMION+'<span>Venduto e spedito da <b>'+esc(p.venditore || p.cantina)+'</b>'+
          ' · gratis da '+SOGLIA_CANTINA+' €</span></p>'+
      '</div>'+
    '</div></article>';
}

function griglia(el, lista, classe){
  if(!el) return;
  el.className = 'pgrid' + (classe ? ' ' + classe : '');
  el.innerHTML = lista.map(scheda).join('');
}

function carosello(el, lista){
  if(!el) return;
  el.classList.add('pcar');
  el.innerHTML =
    '<button class="pcar-nav prev" type="button" aria-label="Indietro">'+
    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg></button>'+
    '<div class="pcar-track">'+lista.map(scheda).join('')+'</div>'+
    '<button class="pcar-nav next" type="button" aria-label="Avanti">'+
    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg></button>';
  var track = el.querySelector('.pcar-track');
  el.querySelector('.prev').addEventListener('click', function(){ track.scrollBy({left:-track.clientWidth*0.8, behavior:'smooth'}); });
  el.querySelector('.next').addEventListener('click', function(){ track.scrollBy({left: track.clientWidth*0.8, behavior:'smooth'}); });
}

/* un solo ascoltatore per tutte le schede della pagina */
document.addEventListener('click', function(e){
  var b = e.target.closest('[data-add]');
  if(!b) return;
  e.preventDefault();
  var p = (window.PRODOTTI || []).filter(function(x){return x.id === b.dataset.add})[0];
  var et = b.querySelector('span');
  if(et){ b.classList.add('fatto'); et.textContent = 'Aggiunto';
    setTimeout(function(){ b.classList.remove('fatto'); et.textContent = 'Aggiungi al carrello'; }, 1300); }
  if(p && window.aggiungiAlCarrello){
    window.aggiungiAlCarrello({nome:p.nome, cantina:p.cantina, prezzo:p.prezzo, prima:p.prima,
      stile:(p.tipo||'').toLowerCase().indexOf('bianc')>-1 ? 'bianco'
           : (p.tipo||'').toLowerCase().indexOf('rosat')>-1 ? 'rosato'
           : (p.tipo||'').toLowerCase().indexOf('spum')>-1 ? 'spumante'
           : (p.tipo||'').toLowerCase().indexOf('dolce')>-1 ? 'dolce' : 'rosso'});
  }
});

window.schedaProdotto = scheda;
window.grigliaProdotti = griglia;
window.caroselloProdotti = carosello;
})();
