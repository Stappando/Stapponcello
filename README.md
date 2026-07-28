# Nuovo look dashboard stapp

Mockup e prototipi HTML per Stap.

## 🔗 Sito online

**https://stappando.github.io/Stapponcello/**

La homepage è pubblicata con GitHub Pages dal branch `main`: da lì si cliccano e si aprono
direttamente tutte le dashboard, senza scaricare nulla.

## Struttura

- **`index.html`** — homepage con i link a tutti i mockup.
- **`Dashboards/`** — mockup delle dashboard (Manager Admin, Vendor Owner, Vendor Manager, Horeca).
- **`Pagine/`** — mockup delle pagine del sito: homepage, catalogo, scheda prodotto,
  scheda cantina, carrello/checkout e Regioni del vino. Le pagine sono collegate fra loro,
  quindi si naviga dall'una all'altra come nel sito vero.

- **`Pagine/temi.html`** — confronto fra tre direzioni grafiche (Noir, Bold, Soft).
  Il markup è uno solo: il tema si cambia dal selettore in basso, che sostituisce il file CSS.
- **`Pagine/temi/`** — i tre fogli di stile: `noir.css`, `bold.css`, `soft.css`. Sono
  intercambiabili perché usano le stesse classi, quindi si possono provare su una qualsiasi
  pagina costruita con quel markup.

## Struttura dei branch

- **`main`** — branch pubblicato da GitHub Pages. Deve contenere `index.html` e i mockup da mostrare online.
- **`dashboards`** — mockup delle dashboard (cartella `Dashboards/`), caricato separatamente.
- **`pagine`** — mockup delle pagine (cartella `Pagine/`), caricato separatamente.

Per pubblicare un aggiornamento basta portarlo su `main`: GitHub Pages ricostruisce il sito
automaticamente in circa un minuto.

## Aggiungere un nuovo mockup

1. Aggiungi il file `.html` nella cartella giusta (`Dashboards/` o `Pagine/`).
2. Aggiungi la relativa card in `index.html` (basta duplicare una delle esistenti e cambiare
   `href`, titolo e descrizione).
3. Fai commit e push su `main`.
