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

- **`Pagine/alberatura.html`** — la mappa di tutte le schermate del sito: le cinque voci
  della barra (Shop, Storie, Experience, Cantine, Wine Club), la barra utente, le aree
  riservate e le pagine di servizio, con lo stato di ciascuna.
- **`Pagine/ruoli.html`** — i sette ruoli della piattaforma (visitatore, cliente, Horeca,
  vendor manager, vendor owner, manager admin, admin) con la matrice dei permessi ricavata
  dalle voci di menù delle dashboard.
- **`Pagine/temi.html`** — confronto fra sei direzioni grafiche (Noir, Bold, Soft, Elegante,
  Pastello, Istituzionale).
  Il markup è uno solo: il tema si cambia dal selettore in basso, che sostituisce il file CSS.
- **`Pagine/temi/`** — i sei fogli di stile: `noir.css`, `bold.css`, `soft.css`,
  `elegante.css`, `pastello.css`, `istituzionale.css`. Sono intercambiabili perché usano le
  stesse classi, quindi si possono provare su una qualsiasi pagina costruita con quel markup.
  `istituzionale.css` riprende i colori reali di shop.stappando.it (teal `#055667`,
  oro `#b8973f`, fondo `#f8f7f5`).

## Temi

Il tema è un file solo, in `Pagine/temi/skin-*.css`: ridefinisce le variabili CSS che
tutte le pagine — pubbliche e dashboard — usano già. Il selettore in basso a ogni pagina
salva la scelta in `localStorage`, quindi si sceglie una volta e vale per tutto il sito.
I sette temi sono: classico, noir, soft, bold, elegante, pastello, istituzionale.

`Pagine/temi.html` resta il confronto "a tema pieno", con i CSS completi (`noir.css`,
`bold.css`, …) che cambiano anche l'impaginazione, non solo i colori.

## Caratteri

Niente caratteri con grazie. Il progetto usa **Bricolage Grotesque** per i titoli,
**Montserrat** per corpo e interfaccia e **Poppins** nei temi dal tono più morbido
(Soft e Pastello). Le dashboard in `Dashboards/` usano ancora Playfair Display.

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
