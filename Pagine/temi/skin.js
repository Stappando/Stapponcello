/* ══════════════════════════════════════════════════════════
   Stappando · selettore di tema e impaginazione
   Due scelte separate che si combinano: il tema dà colori e
   caratteri, l'impaginazione dà la disposizione. Restano
   tutte e due in localStorage mentre navighi. I <link> sono
   già scritti da uno script in testa, per evitare il lampo.
   ══════════════════════════════════════════════════════════ */
(function(){
  const TEMI = [
    {id:'definitivo', nome:'Definitivo', a:'#055667', b:'#b8973f'},
    {id:'pastello',   nome:'Pastello',   a:'#c9718a', b:'#d4e5db'},
    {id:'terra',      nome:'Terra',      a:'#7a3b26', b:'#93a06a'},
    {id:'nordico',    nome:'Nordico',    a:'#25415c', b:'#b1714a'},
    {id:'notte',      nome:'Notte',      a:'#0e1113', b:'#d8b56a'},
    {id:'mercato',    nome:'Mercato',    a:'#c9281f', b:'#f2c200'},
    {id:'vigna',      nome:'Vigna',      a:'#2f5d3a', b:'#c8a15a'},
    {id:'vinile',     nome:'Vinile',     a:'#101010', b:'#c6f24a'},
  ];
  const IMPAGINAZIONI = [
    {id:'standard', nome:'Standard'},
    {id:'vetrina',  nome:'Vetrina'},
    {id:'compatto', nome:'Compatto'},
  ];

  const CHIAVE = 'stappando-tema';
  const CHIAVE_L = 'stappando-layout';
  const link = document.getElementById('skin');
  if(!link) return;

  /* la cartella dei temi cambia se la pagina sta nella radice */
  const base = link.getAttribute('href').replace(/skin-[a-z]+\.css$/, '');
  /* se in memoria c'è un tema che non esiste più, si torna al Definitivo */
  const attuale = () => {
    const t = localStorage.getItem(CHIAVE);
    return TEMI.some(x => x.id === t) ? t : 'definitivo';
  };
  const attualeL = () => {
    const l = localStorage.getItem(CHIAVE_L);
    return IMPAGINAZIONI.some(x => x.id === l) ? l : 'standard';
  };

  /* il foglio dell'impaginazione va dopo quello del tema, così vince lui */
  function linkLayout(){
    let el = document.getElementById('layout');
    if(!el){
      el = document.createElement('link');
      el.rel = 'stylesheet'; el.id = 'layout';
      document.head.appendChild(el);
    }
    return el;
  }

  function applica(id){
    link.href = base + 'skin-' + id + '.css';
    try{ localStorage.setItem(CHIAVE, id); }catch(e){}
    segna('[data-tema]', 'tema', id);
  }

  /* nella Vetrina i filtri sono tendine: vanno chiuse, altrimenti
     si aprono tutte insieme e si accavallano. Tornando allo
     Standard riprendono le aperture di partenza. */
  let apertiDiPartenza = null;
  function sistemaFiltri(id){
    const gruppi = document.querySelectorAll('.filters .fgroup');
    if(!gruppi.length) return;
    if(apertiDiPartenza === null)
      apertiDiPartenza = Array.from(gruppi).map(g => g.open);
    gruppi.forEach((g, i) => { g.open = id === 'vetrina' ? false : apertiDiPartenza[i]; });
  }

  function applicaL(id){
    const el = linkLayout();
    if(id === 'standard') el.removeAttribute('href');
    else el.href = base + 'layout-' + id + '.css';
    try{ localStorage.setItem(CHIAVE_L, id); }catch(e){}
    segna('[data-layout]', 'layout', id);
    sistemaFiltri(id);
  }

  function segna(sel, chiave, id){
    barra.querySelectorAll(sel).forEach(b => {
      const on = b.dataset[chiave] === id;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  /* ── la barretta in basso ───────────────────────────── */
  const stile = document.createElement('style');
  stile.textContent = `
    .skinbar{
      position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9000;
      display:flex;align-items:center;gap:3px;padding:6px;max-width:calc(100vw - 24px);
      flex-wrap:wrap;justify-content:center;
      background:rgba(20,20,22,.88);backdrop-filter:blur(18px) saturate(160%);
      -webkit-backdrop-filter:blur(18px) saturate(160%);
      border:1px solid rgba(255,255,255,.14);border-radius:999px;
      box-shadow:0 18px 44px -16px rgba(0,0,0,.7);
      font-family:Montserrat,system-ui,sans-serif;
    }
    .skinbar .lab{
      font-size:9.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
      color:rgba(255,255,255,.42);padding:0 8px 0 10px;white-space:nowrap;
    }
    .skinbar button{
      display:flex;align-items:center;gap:6px;padding:8px 12px;border:none;cursor:pointer;
      border-radius:999px;background:none;color:rgba(255,255,255,.72);
      font:inherit;font-size:12px;font-weight:500;transition:.18s;white-space:nowrap;
    }
    .skinbar button:hover{color:#fff;background:rgba(255,255,255,.09)}
    .skinbar button.on{background:#fff;color:#141416;font-weight:600}
    .skinbar i{width:12px;height:12px;border-radius:50%;flex:none;display:block}
    /* con otto temi restano i pallini: il nome lo mostra solo quello in uso */
    .skinbar [data-tema]{padding:8px 9px}
    .skinbar [data-tema] span{display:none}
    .skinbar [data-tema].on{padding:8px 12px}
    .skinbar [data-tema].on span{display:inline}
    .skinbar .sep{width:1px;height:20px;background:rgba(255,255,255,.16);margin:0 4px;flex:none}
    .skinbar.chiusa .sep{display:none}
    .skinbar .hide{
      width:30px;height:30px;border-radius:50%;color:rgba(255,255,255,.45);
      justify-content:center;padding:0;font-size:15px;
    }
    .skinbar.chiusa{gap:0;padding:5px}
    .skinbar.chiusa button:not(.riapri){display:none}
    .skinbar.chiusa .lab{display:none}
    .riapri{display:none}
    .skinbar.chiusa .riapri{display:flex;padding:8px 14px}
    @media(max-width:760px){
      .skinbar{left:10px;right:10px;transform:none;bottom:10px}
      .skinbar .lab{display:none}
      .skinbar button{padding:7px 10px;font-size:11.5px}
    }
    @media print{ .skinbar{display:none} }
  `;
  document.head.appendChild(stile);

  const barra = document.createElement('div');
  barra.className = 'skinbar';
  barra.setAttribute('role','group');
  barra.setAttribute('aria-label','Direzione grafica del sito');
  barra.innerHTML =
    '<span class="lab">Tema</span>' +
    TEMI.map(t => `<button type="button" data-tema="${t.id}" aria-pressed="false" title="${t.nome}" aria-label="${t.nome}">
        <i style="background:linear-gradient(135deg,${t.a} 48%,${t.b} 48%)"></i><span>${t.nome}</span>
      </button>`).join('') +
    '<span class="sep" aria-hidden="true"></span>' +
    '<span class="lab">Impaginazione</span>' +
    IMPAGINAZIONI.map(l => `<button type="button" data-layout="${l.id}" aria-pressed="false">${l.nome}</button>`).join('') +
    `<button type="button" class="hide" aria-label="Nascondi il selettore">×</button>
     <button type="button" class="riapri" aria-label="Mostra il selettore">Tema</button>`;
  document.body.appendChild(barra);

  barra.addEventListener('click', e => {
    const t = e.target.closest('[data-tema]');
    if(t){ applica(t.dataset.tema); return; }
    const l = e.target.closest('[data-layout]');
    if(l){ applicaL(l.dataset.layout); return; }
    if(e.target.closest('.hide')){ barra.classList.add('chiusa'); return; }
    if(e.target.closest('.riapri')){ barra.classList.remove('chiusa'); }
  });

  applica(attuale());
  applicaL(attualeL());

  /* se la scelta cambia in un'altra scheda, si aggiorna anche qui */
  window.addEventListener('storage', e => {
    if(e.key === CHIAVE && e.newValue) applica(e.newValue);
    if(e.key === CHIAVE_L && e.newValue) applicaL(e.newValue);
  });
})();
