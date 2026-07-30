/* ══════════════════════════════════════════════════════════
   Stappando · carrello a finestra con i quattro passi
   Si apre da qualunque elemento con [data-carrello] — in barra
   è l'icona del carrello — su tutte le pagine del sito.

   Aggancio per le pagine: window.aggiungiAlCarrello({...})
   aggiunge una bottiglia e apre la finestra.
   ══════════════════════════════════════════════════════════ */
(function(){
'use strict';

var SOGLIA = 69;   /* ogni cantina spedisce per conto suo: gratis da 69 € su QUELLA cantina */
var COSTO_SPED = 6.9;
var BUONI = {BENVENUTO10:{tipo:'perc', v:10}, STAPP5:{tipo:'fisso', v:5}};

var HUE = {rosso:'#8f2222', bianco:'#d3c179', rosato:'#dd97a8',
           spumante:'#5c7d92', dolce:'#c39a4a'};
var VETRO = {rosso:'#5c1717', bianco:'#8d7333', rosato:'#a8546a',
             spumante:'#2b4a63', dolce:'#7a5321'};
var TAPPO = {rosso:'#7f1d1d', bianco:'#a8814f', rosato:'#9d174d',
             spumante:'#c9a87c', dolce:'#a16207'};

/* il carrello di partenza del mockup */
var RIGHE = [
 {id:'k1', nome:'Barolo Bussia 2019', cantina:'Cascina Vergne', stile:'rosso',
  prezzo:48.00, prima:56.00, q:1, scorte:24, nota:'Spedito dal nostro magazzino climatizzato'},
 {id:'k2', nome:'Verdicchio Superiore 2022', cantina:'Tenuta Sant’Urbano', stile:'bianco',
  prezzo:16.50, prima:null, q:2, scorte:61, nota:'Disponibile, pronto per la spedizione'},
 {id:'k3', nome:'Franciacorta Brut Millesimato', cantina:'Ca’ del Lago', stile:'spumante',
  prezzo:32.00, prima:38.00, q:1, scorte:4, nota:'Ultime 4 bottiglie in cantina', poche:true}
];

var passo = 1, buono = null, ritiro = false, uid = 0;

var eur = function(n){return '€ ' + Number(n).toLocaleString('it-IT',
  {minimumFractionDigits:2, maximumFractionDigits:2});};
var esc = function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');};

function bottiglia(stile){
  var id = 'cb' + (++uid);
  return '<svg class="btl" viewBox="0 0 56 172" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+
   '<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="0">'+
   '<stop offset="0%" stop-color="'+VETRO[stile]+'"/><stop offset="42%" stop-color="'+HUE[stile]+'"/>'+
   '<stop offset="58%" stop-color="'+HUE[stile]+'"/><stop offset="100%" stop-color="'+VETRO[stile]+'"/>'+
   '</linearGradient></defs>'+
   '<path d="M22 6 h12 v20 h-12 z" fill="'+TAPPO[stile]+'"/>'+
   '<rect x="21" y="4" width="14" height="5" rx="1.5" fill="'+TAPPO[stile]+'"/>'+
   '<path d="M23 24 h10 v16 c6 4 8 10 8 18 v96 a10 10 0 0 1 -10 10 h-14 a10 10 0 0 1 -10 -10 v-96 c0 -8 2 -14 8 -18 z" '+
   'fill="url(#'+id+')" stroke="rgba(0,0,0,.3)" stroke-width="1"/>'+
   '<rect x="12" y="86" width="32" height="56" rx="2" fill="#f7f3ee"/>'+
   '<rect x="12" y="92" width="32" height="2.4" fill="'+TAPPO[stile]+'"/>'+
   '<rect x="12" y="133" width="32" height="2.4" fill="'+TAPPO[stile]+'"/></svg>';
}

/* ── conti ────────────────────────────────────────────── */
function bottiglie(){return RIGHE.reduce(function(n,r){return n + r.q}, 0)}
function subtotale(){return RIGHE.reduce(function(s,r){return s + r.prezzo * r.q}, 0)}
function sconto(sub){
  if(!buono) return 0;
  return buono.tipo === 'perc' ? sub * buono.v / 100 : Math.min(buono.v, sub);
}

/* Ogni cantina spedisce dal suo magazzino: il conto della spedizione
   si fa cantina per cantina, non sul totale del carrello. */
function perCantina(){
  var g = {};
  RIGHE.forEach(function(r){
    if(!g[r.cantina]) g[r.cantina] = {cantina:r.cantina, tot:0, righe:0};
    g[r.cantina].tot += r.prezzo * r.q;
    g[r.cantina].righe += r.q;
  });
  return Object.keys(g).map(function(k){
    var x = g[k];
    x.gratis = x.tot >= SOGLIA;
    x.sped = x.gratis ? 0 : COSTO_SPED;
    x.manca = Math.max(0, SOGLIA - x.tot);
    return x;
  });
}
function spedizioneTotale(){
  if(ritiro) return 0;                         /* ritiro in enoteca: nessuna spedizione */
  return perCantina().reduce(function(s,x){return s + x.sped}, 0);
}

/* ── la finestra ──────────────────────────────────────── */
var back, cart, corpo, piede, stepEl;

function guscio(){
  back = document.createElement('div');
  back.className = 'cart-backdrop';
  cart = document.createElement('aside');
  cart.className = 'cart';
  cart.setAttribute('role','dialog');
  cart.setAttribute('aria-modal','true');
  cart.setAttribute('aria-label','Carrello e ordine');
  cart.innerHTML =
    '<div class="cart-head">'+
      '<div class="cart-top"><h2 id="cartTitolo">Il tuo carrello</h2>'+
      '<button class="cart-x" type="button" aria-label="Chiudi">'+
      '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>'+
      '</button></div>'+
      '<div class="cart-steps" id="cartPassi"></div>'+
    '</div>'+
    '<div class="cart-body" id="cartCorpo"></div>'+
    '<div class="cart-foot" id="cartPiede"></div>';
  document.body.appendChild(back);
  document.body.appendChild(cart);
  corpo = cart.querySelector('#cartCorpo');
  piede = cart.querySelector('#cartPiede');
  stepEl = cart.querySelector('#cartPassi');

  back.addEventListener('click', chiudi);
  cart.querySelector('.cart-x').addEventListener('click', chiudi);
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && cart.classList.contains('on')) chiudi();
  });
  cart.addEventListener('click', click);
  cart.addEventListener('change', change);
}

function apri(){
  if(!cart) guscio();
  disegna();
  back.classList.add('on');
  cart.classList.add('on');
  document.body.style.overflow = 'hidden';
  setTimeout(function(){ var b = cart.querySelector('.cart-btn.go') || cart.querySelector('.cart-x'); if(b) b.focus(); }, 60);
}
function chiudi(){
  back.classList.remove('on');
  cart.classList.remove('on');
  document.body.style.overflow = '';
  if(passo === 4){ passo = 1; }        /* ordine chiuso: si riparte dal carrello */
}

/* ── i quattro passi ──────────────────────────────────── */
var NOMI = ['Carrello','Indirizzo','Pagamento','Conferma'];
var TICK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

function passiHTML(){
  var out = [];
  for(var i = 1; i <= 4; i++){
    var cls = i < passo ? 'done' : (i === passo ? 'on' : '');
    out.push('<span class="st '+cls+'"><i>'+(i < passo ? TICK : i)+'</i><span>'+NOMI[i-1]+'</span></span>');
    if(i < 4) out.push('<span class="sep"></span>');
  }
  return out.join('');
}

function righeHTML(){
  if(!RIGHE.length){
    return '<div class="cart-empty">'+
      '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h2l1.5 11h10L20 8H7"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>'+
      '<h3>Il carrello è vuoto</h3><p>Rimettici dentro qualcosa: il catalogo è di là.</p></div>';
  }
  return RIGHE.map(function(r){
    return '<div class="cart-line">'+
      '<div class="cart-art" style="--hue:'+HUE[r.stile]+'">'+bottiglia(r.stile)+'</div>'+
      '<div class="cart-info"><span class="maker">'+esc(r.cantina)+'</span>'+
        '<h3>'+esc(r.nome)+'</h3>'+
        '<p class="note'+(r.poche?' low':'')+'">'+esc(r.nota)+'</p>'+
        '<button class="cart-rm" data-rm="'+r.id+'" type="button">Rimuovi</button></div>'+
      '<div class="cart-side">'+
        '<div class="cart-qty">'+
          '<button type="button" data-meno="'+r.id+'" aria-label="Riduci"'+(r.q<=1?' disabled':'')+'>'+
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14"/></svg></button>'+
          '<span>'+r.q+'</span>'+
          '<button type="button" data-piu="'+r.id+'" aria-label="Aumenta"'+(r.q>=r.scorte?' disabled':'')+'>'+
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>'+
        '</div>'+
        '<span class="cart-price">'+eur(r.prezzo * r.q)+
        (r.prima ? '<s>'+eur(r.prima * r.q)+'</s>' : '')+'</span>'+
      '</div></div>';
  }).join('');
}

function sogliaHTML(){
  var g = perCantina();
  var quante = g.filter(function(x){return !x.gratis}).length;
  var testa = g.length > 1
    ? '<p style="font-size:12px;color:var(--muted-fg);margin-bottom:10px">'+
      'Stai comprando da <b>'+g.length+' cantine</b>: ognuna spedisce dal suo magazzino, quindi '+
      (quante === 0 ? 'nessuna spedizione da pagare.' :
       'paghi <b>'+quante+' spedizion'+(quante===1?'e':'i')+'</b>.')+'</p>'
    : '';
  return '<div style="margin-top:16px">'+testa+ g.map(function(x){
    return '<div class="cart-free'+(x.gratis ? ' done' : '')+'" style="margin-top:8px">'+
      '<p><b>'+esc(x.cantina)+'</b> · '+eur(x.tot)+' — '+
      (x.gratis ? 'spedizione <b>gratis</b>' : 'ti mancano <b>'+eur(x.manca)+'</b>, altrimenti '+eur(COSTO_SPED))+
      '</p><div class="track"><i style="width:'+Math.min(100, Math.round(x.tot/SOGLIA*100))+'%"></i></div></div>';
  }).join('')+'</div>';
}

function paneCarrello(){
  return righeHTML() + (RIGHE.length ? sogliaHTML() +
    '<div class="cart-coupon"><input id="cartBuono" placeholder="Hai un buono sconto?" aria-label="Codice del buono">'+
    '<button type="button" data-buono>Applica</button></div>'+
    '<p class="cart-msg" id="cartMsg"></p>' : '');
}

function paneIndirizzo(){
  return '<div class="cart-row2">'+
    '<div class="cart-field"><label for="cn">Nome</label><input id="cn" value="Elena"></div>'+
    '<div class="cart-field"><label for="cc">Cognome</label><input id="cc" value="Marchetti"></div></div>'+
    '<div class="cart-field"><label for="cv">Indirizzo</label><input id="cv" value="Via Garibaldi 14"></div>'+
    '<div class="cart-row2">'+
    '<div class="cart-field"><label for="ccap">CAP</label><input id="ccap" value="20121"></div>'+
    '<div class="cart-field"><label for="ccit">Città</label><input id="ccit" value="Milano"></div></div>'+
    '<div class="cart-field"><label for="ctel">Telefono</label><input id="ctel" value="333 1234567"></div>'+
    '<p style="font-size:11.5px;color:var(--muted-fg);margin-top:8px">Serve al corriere per avvisarti della consegna.</p>'+
    '<h3 style="font-family:var(--font-display);font-size:16px;font-weight:600;margin-top:22px">Come lo spediamo</h3>'+
    '<label class="cart-opt'+(!ritiro ? ' on' : '')+'"><input type="radio" name="csp" value="corriere"'+(!ritiro?' checked':'')+'>'+
      '<span class="t"><b>Corriere espresso · 48 ore</b><span>Una spedizione per cantina, imballo antiurto</span></span>'+
      '<span class="c'+(spedizioneTotale() === 0 ? ' free' : '')+'">'+
      (spedizioneTotale() === 0 ? 'Gratis' : eur(spedizioneTotale()))+'</span></label>'+
    '<label class="cart-opt'+(ritiro ? ' on' : '')+'"><input type="radio" name="csp" value="ritiro"'+(ritiro?' checked':'')+'>'+
      '<span class="t"><b>Ritiro in enoteca · Milano</b><span>Via della Vite 12, pronto in 3 ore</span></span>'+
      '<span class="c free">Gratis</span></label>'+
    (perCantina().length > 1 && !ritiro
      ? '<div class="cart-free" style="margin-top:12px"><p>Le bottiglie arrivano in '+perCantina().length+
        ' pacchi diversi, uno per cantina: ognuno parte dal suo magazzino e può arrivare in giorni diversi.</p></div>'
      : '');
}

function panePagamento(){
  return '<label class="cart-opt on"><input type="radio" name="cpg" checked>'+
      '<span class="t"><b>Carta di credito o debito</b><span>Visa, Mastercard, American Express</span></span></label>'+
    '<div class="cart-field"><label for="cpan">Numero carta</label><input id="cpan" placeholder="0000 0000 0000 0000" inputmode="numeric"></div>'+
    '<div class="cart-row2">'+
    '<div class="cart-field"><label for="csc">Scadenza</label><input id="csc" placeholder="MM/AA"></div>'+
    '<div class="cart-field"><label for="ccvv">CVV</label><input id="ccvv" placeholder="123" inputmode="numeric"></div></div>'+
    '<label class="cart-opt"><input type="radio" name="cpg">'+
      '<span class="t"><b>PayPal</b><span>Anche in 3 rate senza interessi</span></span></label>'+
    '<label class="cart-opt"><input type="radio" name="cpg">'+
      '<span class="t"><b>Satispay</b><span>Dal telefono, senza inserire la carta</span></span></label>'+
    '<label class="cart-opt"><input type="radio" name="cpg">'+
      '<span class="t"><b>Bonifico bancario</b><span>L’ordine parte quando arriva l’accredito</span></span></label>'+
    '<p style="font-size:11.5px;color:var(--muted-fg);margin-top:14px">I dati della carta non passano dai nostri server: li gestisce il circuito di pagamento.</p>';
}

function paneConferma(){
  return '<div class="cart-done">'+
    '<span class="tick"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>'+
    '<h3>Grazie, Elena.</h3>'+
    '<p>Ti abbiamo mandato l’email di riepilogo. Prepariamo il pacco e parte entro domani: '+
    'consegna stimata tra il 30 luglio e il 1 agosto.</p>'+
    '<span class="num">Ordine #ST-24817</span></div>';
}

function piedeHTML(){
  var sub = subtotale(), sc = sconto(sub);
  var sped = RIGHE.length ? spedizioneTotale() : 0;
  var gruppi = perCantina();
  var tot = Math.max(0, sub - sc + sped);

  if(passo === 4){
    return '<div class="cart-actions">'+
      '<button class="cart-btn go" type="button" data-chiudi>Continua a curiosare</button></div>';
  }
  var etichetta = passo === 1 ? 'Vai all’indirizzo'
                : passo === 2 ? 'Vai al pagamento'
                : 'Paga ' + eur(tot);
  return '<div class="cart-tot"><span>Subtotale ('+bottiglie()+' bottiglie)</span><b>'+eur(sub)+'</b></div>'+
    (sc ? '<div class="cart-tot"><span>Sconto</span><b class="sc">– '+eur(sc)+'</b></div>' : '')+
    '<div class="cart-tot"><span>Spedizione'+(gruppi.length > 1 ? ' · '+gruppi.length+' cantine' : '')+'</span>'+
    '<b'+(sped===0?' class="sc"':'')+'>'+(sped === 0 ? 'Gratis' : eur(sped))+'</b></div>'+
    '<div class="cart-tot big"><span>Totale</span><b>'+eur(tot)+'</b></div>'+
    '<div class="cart-actions">'+
      (passo > 1 ? '<button class="cart-btn back" type="button" data-indietro>Indietro</button>' : '')+
      '<button class="cart-btn go" type="button" data-avanti'+(RIGHE.length ? '' : ' disabled')+'>'+etichetta+
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg></button>'+
    '</div>'+
    '<p class="safe"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>'+
    'Pagamento sicuro · connessione cifrata</p>';
}

var TITOLI = ['Il tuo carrello','Dove lo spediamo','Come preferisci pagare','Ordine confermato'];

function disegna(){
  stepEl.innerHTML = passiHTML();
  cart.querySelector('#cartTitolo').textContent = TITOLI[passo-1];
  corpo.innerHTML = '<div class="cart-pane on">'+
    (passo === 1 ? paneCarrello() : passo === 2 ? paneIndirizzo() :
     passo === 3 ? panePagamento() : paneConferma())+'</div>';
  piede.innerHTML = piedeHTML();
  aggiornaBadge();
}

function aggiornaBadge(){
  var n = bottiglie();
  Array.prototype.forEach.call(document.querySelectorAll('#cartCount'), function(b){
    b.textContent = n;
    b.style.display = n ? '' : 'none';
  });
}

/* ── interazioni ──────────────────────────────────────── */
function trova(id){ return RIGHE.filter(function(r){return r.id === id})[0]; }

function click(e){
  var t = e.target;
  var piu = t.closest('[data-piu]'), meno = t.closest('[data-meno]'), rm = t.closest('[data-rm]');
  if(piu){ var a = trova(piu.dataset.piu); if(a && a.q < a.scorte) a.q++; return disegna(); }
  if(meno){ var b = trova(meno.dataset.meno); if(b && b.q > 1) b.q--; return disegna(); }
  if(rm){ RIGHE = RIGHE.filter(function(r){return r.id !== rm.dataset.rm}); return disegna(); }

  if(t.closest('[data-avanti]')){
    if(passo < 4){ passo++; disegna(); corpo.scrollTop = 0; }
    return;
  }
  if(t.closest('[data-indietro]')){ if(passo > 1){ passo--; disegna(); } return; }
  if(t.closest('[data-chiudi]')){ chiudi(); return; }

  if(t.closest('[data-buono]')){
    var campo = cart.querySelector('#cartBuono');
    var msg = cart.querySelector('#cartMsg');
    var code = (campo.value || '').trim().toUpperCase();
    msg.className = 'cart-msg on';
    if(BUONI[code]){
      buono = BUONI[code]; buono.label = code;
      msg.classList.add('ok');
      msg.textContent = buono.tipo === 'perc'
        ? 'Buono '+code+' applicato: '+buono.v+'% sul subtotale.'
        : 'Buono '+code+' applicato: '+eur(buono.v)+' di sconto.';
    } else {
      buono = null; msg.classList.add('ko');
      msg.textContent = code ? 'Il codice “'+code+'” non è valido. Prova con BENVENUTO10.'
                             : 'Inserisci un codice: funzionano BENVENUTO10 e STAPP5.';
    }
    var testo = msg.textContent, classi = msg.className;
    disegna();
    var m2 = cart.querySelector('#cartMsg');
    if(m2){ m2.className = classi; m2.textContent = testo; }
    return;
  }
}

function change(e){
  var r = e.target.closest('input[name="csp"]');
  if(!r) return;
  ritiro = r.value === 'ritiro';
  disegna();
}

/* ── avvio ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function(){
  aggiornaBadge();
  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-carrello]');
    if(!t) return;
    e.preventDefault();
    apri();
  });
});

/* le pagine possono aggiungere una bottiglia e aprire la finestra */
window.aggiungiAlCarrello = function(riga){
  var esistente = RIGHE.filter(function(r){return r.nome === riga.nome})[0];
  if(esistente){ esistente.q = Math.min(esistente.scorte, esistente.q + 1); }
  else {
    RIGHE.push({id:'x'+(++uid), nome:riga.nome, cantina:riga.cantina || 'Stappando',
      stile:riga.stile || 'rosso', prezzo:riga.prezzo || 0, prima:riga.prima || null,
      q:1, scorte:riga.scorte || 24, nota:'Disponibile, pronto per la spedizione'});
  }
  passo = 1;
  apri();
};
})();
