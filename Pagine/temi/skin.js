/* ══════════════════════════════════════════════════════════
   Stappando · selettore del tema, valido su tutte le pagine
   La scelta finisce in localStorage, così resta mentre navighi
   da una pagina all'altra. Il <link id="skin"> viene già
   impostato da uno script in testa, per evitare il lampo.
   ══════════════════════════════════════════════════════════ */
(function(){
  const TEMI = [
    {id:'definitivo', nome:'Definitivo', a:'#055667', b:'#b8973f'},
    {id:'pastello',   nome:'Pastello',   a:'#c9718a', b:'#d4e5db'},
    {id:'terra',      nome:'Terra',      a:'#7a3b26', b:'#93a06a'},
    {id:'nordico',    nome:'Nordico',    a:'#25415c', b:'#b1714a'},
  ];

  const CHIAVE = 'stappando-tema';
  const link = document.getElementById('skin');
  if(!link) return;

  /* la cartella dei temi cambia se la pagina sta nella radice */
  const base = link.getAttribute('href').replace(/skin-[a-z]+\.css$/, '');
  /* se in memoria c'è un tema che non esiste più, si torna al Definitivo */
  const attuale = () => {
    const t = localStorage.getItem(CHIAVE);
    return TEMI.some(x => x.id === t) ? t : 'definitivo';
  };

  function applica(id){
    link.href = base + 'skin-' + id + '.css';
    try{ localStorage.setItem(CHIAVE, id); }catch(e){}
    barra.querySelectorAll('[data-tema]').forEach(b => {
      const on = b.dataset.tema === id;
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
    .skinbar i{width:10px;height:10px;border-radius:50%;flex:none;display:block}
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
    TEMI.map(t => `<button type="button" data-tema="${t.id}" aria-pressed="false">
        <i style="background:linear-gradient(135deg,${t.a} 48%,${t.b} 48%)"></i>${t.nome}
      </button>`).join('') +
    `<button type="button" class="hide" aria-label="Nascondi il selettore">×</button>
     <button type="button" class="riapri" aria-label="Mostra il selettore">Tema</button>`;
  document.body.appendChild(barra);

  barra.addEventListener('click', e => {
    const t = e.target.closest('[data-tema]');
    if(t){ applica(t.dataset.tema); return; }
    if(e.target.closest('.hide')){ barra.classList.add('chiusa'); return; }
    if(e.target.closest('.riapri')){ barra.classList.remove('chiusa'); }
  });

  applica(attuale());

  /* se il tema cambia in un'altra scheda, si aggiorna anche qui */
  window.addEventListener('storage', e => {
    if(e.key === CHIAVE && e.newValue) applica(e.newValue);
  });
})();
