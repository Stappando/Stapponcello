/* ══════════════════════════════════════════════════════════
   Stappando · testata unica del sito
   Costruisce tendine, ricerca e menù mobile a partire dal
   markup identico presente su ogni pagina.

   Due agganci per le pagine:
   · body[data-nav="shop|storie|experience|cantine|wineclub"]
     segna la voce attiva.
   · window.onHeaderSearch(testo) — se definita, la ricerca
     filtra la pagina invece di aprire i suggerimenti
     (è quello che fa il catalogo).
   ══════════════════════════════════════════════════════════ */
(function(){
'use strict';
var esc = function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');};
var norm = function(s){return String(s).toLowerCase().normalize('NFD')
  .replace(/[̀-ͯ]/g,'').replace(/[’'`]/g,' ').replace(/\s+/g,' ').trim();};

var ARROW='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>';
var CARET='<svg class="caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
var CHEV='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

/* ── le voci del menù ─────────────────────────────────── */
var MENU = [
 {id:'shop', label:'Shop', href:'catalogo.html',
  cols:[
   {title:'Vini', items:[
     {l:'Vini Rossi', h:'catalogo.html?cat=vini'},
     {l:'Vini Bianchi', h:'catalogo.html?cat=vini'},
     {l:'Vini Rosati', h:'catalogo.html?cat=vini'},
     {l:'Vini Ramati', h:'catalogo.html?cat=vini'},
     {l:'Vini Liquorosi', h:'catalogo.html?cat=vini'}],
    all:{l:'Tutto il catalogo', h:'catalogo.html'}},
   {title:'Bollicine', items:[
     {l:'Spumanti', h:'catalogo.html?cat=bollicine'},
     {l:'Franciacorta', h:'catalogo.html?cat=bollicine'},
     {l:'Prosecco', h:'catalogo.html?cat=bollicine'},
     {l:'Trento DOC', h:'catalogo.html?cat=bollicine'},
     {l:'Alta Langa DOCG', h:'catalogo.html?cat=bollicine'},
     {l:'Champagne', h:'catalogo.html?cat=bollicine'},
     {l:'Spumanti analcolici', h:'catalogo.html?cat=bollicine'}]},
   {title:'Distillati', items:[
     {l:'Gin', h:'catalogo.html?cat=distillati'},
     {l:'Grappe', h:'catalogo.html?cat=distillati'},
     {l:'Rum', h:'catalogo.html?cat=distillati'},
     {l:'Vodka', h:'catalogo.html?cat=distillati'},
     {l:'Whisky', h:'catalogo.html?cat=distillati'},
     {l:'Cognac', h:'catalogo.html?cat=distillati'},
     {l:'Brandy', h:'catalogo.html?cat=distillati'},
     {l:'Armagnac', h:'catalogo.html?cat=distillati'},
     {l:'Calvados', h:'catalogo.html?cat=distillati'},
     {l:'Tequila', h:'catalogo.html?cat=distillati'},
     {l:'Tequila Reposado', h:'catalogo.html?cat=distillati'},
     {l:'Mezcal', h:'catalogo.html?cat=distillati'},
     {l:'Assenzio', h:'catalogo.html?cat=distillati'}]},
   {title:'Liquori, amari e aperitivi', items:[
     {l:'Amari', h:'catalogo.html?cat=liquori'},
     {l:'Bitter', h:'catalogo.html?cat=liquori'},
     {l:'Liquori', h:'catalogo.html?cat=liquori'},
     {l:'Limoncello', h:'catalogo.html?cat=liquori'},
     {l:'Mirto', h:'catalogo.html?cat=liquori'},
     {l:'Sambuca', h:'catalogo.html?cat=liquori'},
     {l:'Anice', h:'catalogo.html?cat=liquori'},
     {l:'Ratafià', h:'catalogo.html?cat=liquori'},
     {l:'Genepy', h:'catalogo.html?cat=liquori'},
     {l:'Genziana', h:'catalogo.html?cat=liquori'},
     {l:'Aperitivi', h:'catalogo.html?cat=aperitivi'},
     {l:'Vermouth', h:'catalogo.html?cat=aperitivi'},
     {l:'Porto', h:'catalogo.html?cat=aperitivi'},
     {l:'Sherry', h:'catalogo.html?cat=aperitivi'}]},
   /* ultima colonna: tre gruppetti impilati */
   {groups:[
     {title:'Per occasione', items:[
       {l:'Da regalare', h:'da-regalare.html'},
       {l:'Per tutti i giorni', h:'per-tutti-i-giorni.html'},
       {l:'Sotto i 15 €', h:'catalogo.html?prezzo=15'}]},
     {title:'Sostenibilità', items:[
       {l:'Biologici', h:'catalogo.html?tag=bio'},
       {l:'Biodinamici', h:'catalogo.html?tag=biodinamico'},
       {l:'SQNPI', h:'catalogo.html?tag=sqnpi'},
       {l:'Vegan', h:'catalogo.html?tag=vegan'}]},
     {title:'In evidenza', items:[
       {l:'Novità', h:'catalogo.html'},
       {l:'I più venduti', h:'catalogo.html'},
       {l:'In offerta', h:'catalogo.html'}]}]}]},

 {id:'storie', label:'Storie', href:'storie.html',
  cols:[
   /* Storie sono gli ultimi articoli del blog: escono per primi */
   {title:'Ultimi dal blog', items:[
     {l:'Le Langhe in cinque cantine', h:'storia.html', n:'2 lug'},
     {l:'Se hai bevuto un Chianti, conosci già il Sangiovese', h:'storie-enocultura.html', n:'28 giu'},
     {l:'Il rosso della domenica dell’arrosto', h:'storie-abbinamenti.html', n:'21 giu'},
     {l:'«Il mio vino lo faccio così»', h:'storia.html', n:'14 giu'},
     {l:'L’Etna non è una regione', h:'storie-territori.html', n:'7 giu'}],
    all:{l:'Tutti gli articoli', h:'storie.html'}},
   {title:'Le rubriche', items:[
     {l:'Territori', h:'storie-territori.html'},
     {l:'Enocultura', h:'storie-enocultura.html'},
     {l:'Abbinamenti', h:'storie-abbinamenti.html'},
     {l:'Interviste ai produttori', h:'storie.html'}]}],
  promo:{eyebrow:'La lettera del giovedì', title:'Una storia a settimana',
   text:'Una cantina, le persone che la mandano avanti, il territorio da cui nasce. Mai un volantino.',
   cta:'Iscriviti', h:'homepage.html', from:'#003d4d', to:'#005f73'}},

 /* Experience non ha tendina: è una pagina ponte */
 {id:'experience', label:'Experience', href:'experience.html', nomenu:true},

 {id:'cantine', label:'Cantine', href:'cantine.html',
  cols:[
   /* solo due voci: l'elenco e una scheda d'esempio */
   {title:'Le cantine', items:[
     {l:'Indice delle cantine', h:'cantine.html', n:'320'},
     {l:'Scheda cantina', h:'cantina.html'}],
    all:{l:'Cercale sulla mappa', h:'cantine.html'}}],
  promo:{eyebrow:'Cantina del mese', title:'Cascina Rivetto',
   text:'Piemonte · Langhe · dal 1919. Nebbiolo in purezza da una collina sola.',
   cta:'Visita la cantina', h:'cantina.html', from:'#6d1f2c', to:'#40121b'}},

 /* Wine Club è una landing: ci si abbona ai tre piani lì, niente tendina */
 {id:'wineclub', label:'Wine Club', href:'wineclub.html', nomenu:true}
];

/* ── indice della ricerca: uvaggio, regione, produttore ── */
var INDICE = [
 {t:'uvaggio', l:'Nebbiolo', s:'Piemonte · 34 etichette', k:'barolo barbaresco langhe rosso'},
 {t:'uvaggio', l:'Sangiovese', s:'Toscana ed Emilia · 41 etichette', k:'chianti brunello romagna rosso'},
 {t:'uvaggio', l:'Primitivo', s:'Puglia · 18 etichette', k:'manduria rosso'},
 {t:'uvaggio', l:'Corvina', s:'Veneto · 22 etichette', k:'amarone valpolicella ripasso rosso'},
 {t:'uvaggio', l:'Nerello Mascalese', s:'Sicilia · 12 etichette', k:'etna rosso vulcanico'},
 {t:'uvaggio', l:'Verdicchio', s:'Marche · 14 etichette', k:'jesi matelica bianco'},
 {t:'uvaggio', l:'Ribolla Gialla', s:'Friuli Venezia Giulia · 9 etichette', k:'collio anfora macerato bianco'},
 {t:'uvaggio', l:'Vermentino', s:'Sardegna e Liguria · 16 etichette', k:'gallura bianco'},
 {t:'uvaggio', l:'Glera', s:'Veneto · 11 etichette', k:'prosecco bollicine spumante'},
 {t:'uvaggio', l:'Chardonnay', s:'Lombardia e Trentino · 19 etichette', k:'franciacorta trentodoc bollicine metodo classico'},
 {t:'uvaggio', l:'Zibibbo', s:'Sicilia · 5 etichette', k:'pantelleria passito moscato dolce'},
 {t:'uvaggio', l:'Sagrantino', s:'Umbria · 6 etichette', k:'montefalco rosso tannico'},
 {t:'regione', l:'Piemonte', s:'22 cantine · 96 etichette', k:'langhe barolo barbaresco nebbiolo'},
 {t:'regione', l:'Toscana', s:'19 cantine · 88 etichette', k:'chianti bolgheri maremma sangiovese'},
 {t:'regione', l:'Veneto', s:'14 cantine · 71 etichette', k:'valpolicella amarone prosecco'},
 {t:'regione', l:'Sicilia', s:'11 cantine · 54 etichette', k:'etna pantelleria nero d avola'},
 {t:'regione', l:'Lombardia', s:'9 cantine · 42 etichette', k:'franciacorta oltrepo'},
 {t:'regione', l:'Marche', s:'8 cantine · 33 etichette', k:'verdicchio jesi'},
 {t:'regione', l:'Friuli Venezia Giulia', s:'7 cantine · 31 etichette', k:'collio ribolla'},
 {t:'regione', l:'Emilia-Romagna', s:'7 cantine · 29 etichette', k:'lambrusco sangiovese di romagna'},
 {t:'regione', l:'Puglia', s:'6 cantine · 27 etichette', k:'primitivo manduria salento'},
 {t:'regione', l:'Campania', s:'6 cantine · 24 etichette', k:'greco di tufo fiano aglianico'},
 {t:'produttore', l:'Cascina Rivetto', s:'La Morra, Piemonte · 34 etichette'},
 {t:'produttore', l:'Cascina Vergne', s:'La Morra, Piemonte · 6 etichette'},
 {t:'produttore', l:'Podere Cigli', s:'Maremma, Toscana · 22 etichette'},
 {t:'produttore', l:'Tenuta Coccapane', s:'Emilia · 18 etichette'},
 {t:'produttore', l:'Casale Marchese', s:'Frascati, Lazio · 16 etichette'},
 {t:'produttore', l:'Borgo del Baccano', s:'Lazio · 12 etichette'},
 {t:'produttore', l:'Antonio Buccoliero', s:'Manduria, Puglia · 9 etichette'},
 {t:'produttore', l:'Tenuta Sant’Urbano', s:'Jesi, Marche · 5 etichette'},
 {t:'produttore', l:'Ca’ del Lago', s:'Erbusco, Lombardia · 4 etichette'},
 {t:'produttore', l:'Palmento Nero', s:'Etna, Sicilia · 7 etichette'},
 {t:'produttore', l:'Vigne di Ronco', s:'Collio, Friuli · 4 etichette'},
 {t:'produttore', l:'Domaine François 1er', s:'Beaujolais (FR) · 20 etichette'}
];
var GRUPPO = {uvaggio:'Uvaggio', regione:'Regione', produttore:'Produttore'};
var ICONA = {
 uvaggio:'<path d="M12 3v4"/><circle cx="9" cy="10" r="2.1"/><circle cx="15" cy="10" r="2.1"/><circle cx="12" cy="14" r="2.1"/><circle cx="8" cy="17" r="2.1"/><circle cx="16" cy="17" r="2.1"/>',
 regione:'<path d="M12 2a7 7 0 0 0-7 7c0 1.6.6 2.7 1.2 3.4L12 22l5.8-9.6c.6-.7 1.2-1.8 1.2-3.4a7 7 0 0 0-7-7Z"/><circle cx="12" cy="9" r="2.4"/>',
 produttore:'<path d="M3 21V10l9-6 9 6v11"/><path d="M9 21v-6h6v6"/>'
};

document.addEventListener('DOMContentLoaded', function(){
  var topbar = document.querySelector('.topbar');
  var topnav = document.querySelector('.topnav');
  if(!topbar || !topnav) return;

  /* ── voci della barra ──────────────────────────────── */
  var attiva = document.body.dataset.nav || '';
  topnav.innerHTML = MENU.map(function(v){
    return '<a href="'+v.href+'"'+(v.id===attiva?' class="on" aria-current="page"':'')+
      ' data-menu="'+v.id+'">'+esc(v.label)+(v.nomenu?'':CARET)+'</a>';
  }).join('');

  /* ── pannelli ──────────────────────────────────────── */
  function voce(it){
    return '<li><a href="'+(it.h||'javascript:void(0)')+'">'+esc(it.l)+
      (it.n?'<em>'+it.n+'</em>':'')+'</a></li>';
  }
  function pannello(v){
    var cols = v.cols.map(function(c){
      /* una colonna può raccogliere più gruppetti, uno sotto l'altro */
      var blocchi = (c.groups || [c]).map(function(g){
        return '<h4>'+esc(g.title)+'</h4><ul>'+g.items.map(voce).join('')+'</ul>'+
          (g.all?'<a class="all" href="'+g.all.h+'">'+esc(g.all.l)+' '+ARROW+'</a>':'');
      }).join('');
      return '<div class="mega-col">'+blocchi+'</div>';
    }).join('');
    var p = v.promo;
    var promo = p ? '<a class="mega-promo" href="'+p.h+'" style="background:linear-gradient(155deg,'+p.from+','+p.to+')">'+
      '<span class="eyebrow">'+esc(p.eyebrow)+'</span><h5>'+esc(p.title)+'</h5>'+
      '<p>'+esc(p.text)+'</p><span class="go">'+esc(p.cta)+' '+ARROW+'</span></a>' : '';
    var griglia = 'repeat('+v.cols.length+',minmax(0,1fr))'+(p ? ' 320px' : '');
    return '<div class="mega-panel" id="panel-'+v.id+'" role="region" aria-label="'+esc(v.label)+'">'+
      '<div class="mega-in" style="grid-template-columns:'+griglia+'">'+cols+promo+'</div></div>';
  }
  var mega = document.createElement('div');
  mega.className = 'mega'; mega.id = 'mega';
  mega.innerHTML = MENU.filter(function(v){return !v.nomenu}).map(pannello).join('');
  topbar.appendChild(mega);

  var trigger = {}, aperto = null, tApri, tChiudi;
  MENU.forEach(function(v){
    if(v.nomenu) return;
    var a = topnav.querySelector('[data-menu="'+v.id+'"]');
    if(!a) return;
    a.setAttribute('aria-expanded','false');
    a.setAttribute('aria-controls','panel-'+v.id);
    trigger[v.id] = a;
  });
  function apri(id){
    clearTimeout(tChiudi);
    if(aperto === id) return;
    aperto = id;
    Array.prototype.forEach.call(mega.querySelectorAll('.mega-panel'), function(p){
      p.classList.toggle('on', p.id === 'panel-'+id);
    });
    mega.classList.add('open');
    Object.keys(trigger).forEach(function(k){
      trigger[k].setAttribute('aria-expanded', String(k === id));
    });
  }
  function chiudi(){
    clearTimeout(tApri); aperto = null; mega.classList.remove('open');
    Object.keys(trigger).forEach(function(k){ trigger[k].setAttribute('aria-expanded','false'); });
  }
  Object.keys(trigger).forEach(function(id){
    var a = trigger[id];
    a.addEventListener('mouseenter', function(){ clearTimeout(tApri); tApri = setTimeout(function(){apri(id)}, 90); });
    a.addEventListener('focus', function(){ apri(id); });
    a.addEventListener('keydown', function(e){
      if(e.key === 'ArrowDown'){ e.preventDefault(); apri(id);
        var f = mega.querySelector('.mega-panel.on a'); if(f) f.focus(); }
    });
  });
  topbar.addEventListener('mouseleave', function(){ clearTimeout(tApri); tChiudi = setTimeout(chiudi, 180); });
  mega.addEventListener('mouseenter', function(){ clearTimeout(tChiudi); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') chiudi(); });
  document.addEventListener('click', function(e){ if(!e.target.closest('.topbar')) chiudi(); });

  /* ── menù mobile ───────────────────────────────────── */
  var mob = document.querySelector('.mobnav');
  var burger = document.querySelector('.burger');
  if(mob){
    mob.innerHTML = MENU.map(function(v){
      if(v.nomenu) return '<div class="acc"><a href="'+v.href+'">'+esc(v.label)+'</a></div>';
      var body = v.cols.map(function(c){
        /* anche qui una colonna può avere più gruppetti */
        return (c.groups || [c]).map(function(g){
          return '<p class="grp">'+esc(g.title)+'</p>'+
            g.items.map(function(i){return '<a href="'+(i.h||'javascript:void(0)')+'">'+esc(i.l)+'</a>'}).join('');
        }).join('');
      }).join('');
      return '<div class="acc"><button type="button" aria-expanded="false">'+esc(v.label)+CHEV+'</button>'+
        '<div class="acc-body">'+body+'</div></div>';
    }).join('') +
    '<div class="acc"><a href="carrello.html">Carrello</a></div>' +
    '<div class="acc"><a href="accedi.html">Area personale</a></div>';
    mob.addEventListener('click', function(e){
      var b = e.target.closest('.acc > button');
      if(!b) return;
      var on = b.parentElement.classList.toggle('open');
      b.setAttribute('aria-expanded', String(on));
    });
  }
  if(burger && mob){
    burger.addEventListener('click', function(){
      var on = mob.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(on));
      burger.setAttribute('aria-label', on ? 'Chiudi il menu' : 'Apri il menu');
    });
  }

  /* ── ricerca ───────────────────────────────────────── */
  var q = document.getElementById('hq');
  var box = document.getElementById('hbox');
  var res = document.getElementById('hres');
  if(!q) return;

  /* se la pagina gestisce la ricerca per conto suo (il catalogo),
     il campo filtra la pagina e i suggerimenti non servono */
  var suPagina = typeof window.onHeaderSearch === 'function';

  function trova(term){
    var t = norm(term.trim());
    if(!t) return [
      INDICE.filter(function(x){return x.t==='uvaggio'}).slice(0,3),
      INDICE.filter(function(x){return x.t==='regione'}).slice(0,2),
      INDICE.filter(function(x){return x.t==='produttore'}).slice(0,2)
    ].reduce(function(a,b){return a.concat(b)},[]);
    return INDICE.filter(function(x){
      return norm(x.l).indexOf(t)>-1 || norm(x.s).indexOf(t)>-1 ||
             norm(x.k||'').indexOf(t)>-1 || norm(GRUPPO[x.t]).indexOf(t)>-1;
    }).slice(0,10);
  }
  function disegna(term){
    var out = trova(term);
    if(!out.length){
      res.innerHTML = '<p class="res-empty">Nessun risultato per “'+esc(term)+'”.<br>'+
        'Prova con un uvaggio (Nebbiolo), una regione (Toscana) o un produttore.</p>';
      return;
    }
    var html = term.trim() ? '' : '<p class="res-group">Suggerimenti</p>', last = null;
    out.forEach(function(x){
      if(term.trim() && x.t !== last){ html += '<p class="res-group">'+GRUPPO[x.t]+'</p>'; last = x.t; }
      html += '<a class="res-item" href="catalogo.html"><span class="res-ic">'+
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" '+
        'stroke-linecap="round" stroke-linejoin="round">'+ICONA[x.t]+'</svg></span>'+
        '<span class="res-txt"><b>'+esc(x.l)+'</b><span>'+esc(x.s)+'</span></span></a>';
    });
    res.innerHTML = html;
  }
  function apriRes(){ if(suPagina) return; disegna(q.value); res.classList.add('open'); }
  function chiudiRes(){ res.classList.remove('open'); }

  q.addEventListener('focus', apriRes);
  q.addEventListener('input', function(){
    box.classList.toggle('filled', q.value.length > 0);
    if(suPagina) window.onHeaderSearch(q.value); else apriRes();
  });
  q.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ chiudiRes(); q.blur(); } });
  document.addEventListener('click', function(e){ if(!e.target.closest('.search')) chiudiRes(); });
  var clear = document.getElementById('hclear');
  if(clear) clear.addEventListener('click', function(){
    q.value=''; box.classList.remove('filled');
    if(suPagina) window.onHeaderSearch(''); else apriRes();
    q.focus();
  });
});
})();
