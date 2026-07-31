/* ══════════════════════════════════════════════════════════
   Stappando · i prodotti veri, con le foto dello shop
   Le immagini sono quelle di stappando.it, scaricate in
   Pagine/foto/. I prezzi sono indicativi: da allineare al
   listino prima di andare online.
   ══════════════════════════════════════════════════════════ */
window.PRODOTTI = [
 {id:'p01', venditore:'Antonio Buccoliero', desc:'Il rosso della domenica: caldo, schietto, senza giri di parole.', premi:['Bio', 'Luca M. 92'], nome:'Primitivo “Èja” 2022', cantina:'Antonio Buccoliero', regione:'Puglia',
  cat:'vini', tipo:'Rosso', uvaggio:'Primitivo', abv:'14,5% vol', formato:'0,75 L', scorte:31, prezzo:16.90, prima:null,
  voto:4.6, acquisti:214, foto:'foto/eja-buccoliero.png', badge:'Il più scelto', punteggio:'Luca M. 92'},

 {id:'p02', venditore:'Podere Cigli', desc:'Pesca e lampone, chiusura salina. Rosato da aperitivo lungo.', premi:['Vegan'], nome:'Roselvo Rosato 2024', cantina:'Podere Cigli', regione:'Toscana',
  cat:'vini', tipo:'Rosato', uvaggio:'Sangiovese', abv:'12,5% vol', formato:'0,75 L', scorte:22, prezzo:14.50, prima:17.00,
  voto:4.5, acquisti:96, foto:'foto/roselvo-rosato.png', badge:'−15%', badgeKind:'sale'},

 {id:'p03', venditore:'Borgo del Baccano', desc:'Malvasia di Lazio in acciaio: agrume, erbe, sorso teso.', premi:['Bio', 'SQNPI'], nome:'Bianco “Piana del Mosaico” 2024', cantina:'Borgo del Baccano', regione:'Lazio',
  cat:'vini', tipo:'Bianco', uvaggio:'Malvasia', abv:'12% vol', formato:'0,75 L', scorte:28, prezzo:15.50, prima:null,
  voto:4.4, acquisti:54, foto:'foto/piana-mosaico-bianco.png', badge:'Bio', badgeKind:'bio', bio:true},

 {id:'p04', venditore:'Stappando', desc:'Mela verde e fiori bianchi, residuo zuccherino quasi assente.', premi:['Tre Bicchieri 2025'], nome:'Prosecco Valdobbiadene Sup. Brut', cantina:'I Casali', regione:'Veneto',
  cat:'bollicine', tipo:'Spumante', uvaggio:'Glera', abv:'11,5% vol', formato:'0,75 L', scorte:74, prezzo:13.90, prima:null,
  voto:4.4, acquisti:171, foto:'foto/prosecco-valdobbiadene.png', badge:'I più venduti'},

 {id:'p05', venditore:'I Casali', desc:'Bolla fine e beva facile. Il brindisi di tutti i giorni.', premi:[], nome:'Cuvée Extra Dry', cantina:'Ai Casali', regione:'Veneto',
  cat:'bollicine', tipo:'Spumante', uvaggio:'Glera', abv:'11% vol', formato:'0,75 L', scorte:52, prezzo:12.50, prima:null,
  voto:4.3, acquisti:88, foto:'foto/cuvee-extra-dry.png'},

 {id:'p06', venditore:'Tenuta Rosato', desc:'Minutolo in metodo classico: agrume candito e crosta di pane.', premi:['Vegan', 'Slow Wine 2026'], nome:'Metodo Classico Pas Dosé', cantina:'Tenuta Rosato', regione:'Puglia',
  cat:'bollicine', tipo:'Spumante', uvaggio:'Minutolo', abv:'12,5% vol', formato:'0,75 L', scorte:11, prezzo:24.00, prima:null,
  voto:4.7, acquisti:37, foto:'foto/metodo-classico-rosato.png', badge:'Novità'},

 {id:'p07', venditore:'Torre dei Falchi', desc:'Malvasia puntinata, macerazione breve: albicocca e mandorla.', premi:['Bio'], nome:'Apa 2023', cantina:'Torre dei Falchi', regione:'Lazio',
  cat:'vini', tipo:'Bianco', uvaggio:'Malvasia puntinata', abv:'12,5% vol', formato:'0,75 L', scorte:46, prezzo:13.00, prima:null,
  voto:4.4, acquisti:62, foto:'foto/apa-torre-falchi.png'},

 {id:'p08', venditore:'Torre dei Falchi', desc:'Cesanese di collina: frutto rosso croccante, tannino gentile.', premi:['Bio', 'Vegan'], nome:'Colle Pisano', cantina:'Torre dei Falchi', regione:'Lazio',
  cat:'vini', tipo:'Rosso', uvaggio:'Cesanese', abv:'13,5% vol', formato:'0,75 L', scorte:37, prezzo:14.00, prima:null,
  voto:4.5, acquisti:73, foto:'foto/colle-pisano.png'},

 {id:'p09', venditore:'Torre dei Falchi', desc:'Rosato di Cesanese, fresco e diretto. Da bere freddo.', premi:['Bio'], nome:'Ma-Mì', cantina:'Torre dei Falchi', regione:'Lazio',
  cat:'vini', tipo:'Rosato', uvaggio:'Cesanese', abv:'12,5% vol', formato:'0,75 L', scorte:25, prezzo:13.50, prima:null,
  voto:4.4, acquisti:41, foto:'foto/ma-mi.png'},

 {id:'p10', venditore:'Torre dei Falchi', desc:'Uve appassite in pianta: miele, albicocca secca, mai stucchevole.', premi:['Cannellino DOCG'], nome:'Cannellino di Frascati', cantina:'Torre dei Falchi', regione:'Lazio',
  cat:'vini', tipo:'Dolce', uvaggio:'Malvasia', abv:'13% vol', formato:'0,50 L', scorte:14, prezzo:16.00, prima:null,
  voto:4.6, acquisti:29, foto:'foto/cannellino-torre-falchi.png', badge:'Da dessert'},

 {id:'p11', venditore:'Stappando', desc:'Chardonnay in purezza dal Capo: agrume e gesso, 36 mesi sui lieviti.', premi:['Platter’s 4½ stelle', 'Parker 92'], nome:'Blanc de Blancs', cantina:'L’Ormarins', regione:'Sudafrica',
  cat:'bollicine', tipo:'Spumante', uvaggio:'Chardonnay', abv:'12% vol', formato:'0,75 L', scorte:9, prezzo:28.00, prima:null,
  voto:4.7, acquisti:24, foto:'foto/ormarins-blanc-de-blancs.png', badge:'Consigliato', badgeKind:'gold',
  punteggio:'Parker 92'},

 {id:'p12', venditore:'Distilleria KM 0', desc:'Dodici botaniche di collina: ginepro, salvia, un soffio di menta.', premi:['Gin dell’anno 2025'], nome:'Gin KM 0', cantina:'Distilleria KM 0', regione:'Piemonte',
  cat:'distillati', tipo:'Gin', uvaggio:'12 botaniche', abv:'43% vol', formato:'0,70 L', scorte:27, prezzo:32.00, prima:null,
  voto:4.6, acquisti:48, foto:'foto/gin-km-0.png', badge:'Distillato'},

 /* ── altre etichette: stesse foto, cantine e territori diversi ── */
 {id:'p13', venditore:'Cascina Vergne', desc:'Rosa appassita, arancia sanguinella, catrame. Trenta mesi in botte grande.', premi:['Tre Bicchieri 2026', 'Luca M. 95'], nome:'Barolo Bussia 2019', cantina:'Cascina Vergne', regione:'Piemonte',
  cat:'vini', tipo:'Rosso', uvaggio:'Nebbiolo', abv:'14,5% vol', formato:'0,75 L',
  prezzo:48.00, prima:56.00, voto:4.9, acquisti:212, scorte:24, foto:'foto/colle-pisano.png',
  badge:'−14%', badgeKind:'sale', punteggio:'Luca M. 95'},

 {id:'p14', venditore:'Cascina Vergne', desc:'Il fratello agile del Barolo: più profumo, meno attesa.', premi:['Due Bicchieri 2026'], nome:'Barbaresco Roncaglie 2020', cantina:'Cascina Vergne', regione:'Piemonte',
  cat:'vini', tipo:'Rosso', uvaggio:'Nebbiolo', abv:'14% vol', formato:'0,75 L',
  prezzo:54.00, prima:null, voto:4.8, acquisti:58, scorte:14, foto:'foto/eja-buccoliero.png'},

 {id:'p15', venditore:'Tenuta Sant’Urbano', desc:'Mandorla, agrume e salinità. Il bianco che chiama il secondo bicchiere.', premi:['Bio', 'Vegan'], nome:'Verdicchio Superiore 2022', cantina:'Tenuta Sant’Urbano', regione:'Marche',
  cat:'vini', tipo:'Bianco', uvaggio:'Verdicchio', abv:'13% vol', formato:'0,75 L',
  prezzo:16.50, prima:null, voto:4.7, acquisti:168, scorte:61, bio:true,
  foto:'foto/apa-torre-falchi.png', badge:'Bio', badgeKind:'bio'},

 {id:'p16', venditore:'Palmento Nero', desc:'Vigne a 800 metri sul versante nord: frutto croccante e cenere.', premi:['Bio', 'Slow Wine 2026'], nome:'Etna Rosso Contrada 2021', cantina:'Palmento Nero', regione:'Sicilia',
  cat:'vini', tipo:'Rosso', uvaggio:'Nerello Mascalese', abv:'13,5% vol', formato:'0,75 L',
  prezzo:27.00, prima:null, voto:4.8, acquisti:63, scorte:9, bio:true,
  foto:'foto/colle-pisano.png', badge:'Bio', badgeKind:'bio'},

 {id:'p17', venditore:'Vigne di Ronco', desc:'Trenta giorni in anfora interrata: buccia d’arancia e camomilla.', premi:['Bio', 'Vino artigianale'], nome:'Ribolla Gialla in anfora 2021', cantina:'Vigne di Ronco', regione:'Friuli Venezia Giulia',
  cat:'vini', tipo:'Bianco', uvaggio:'Ribolla Gialla', abv:'13% vol', formato:'0,75 L',
  prezzo:24.00, prima:null, voto:4.6, acquisti:29, scorte:12, bio:true,
  foto:'foto/piana-mosaico-bianco.png', badge:'Macerato'},

 {id:'p18', venditore:'Podere Fontesecca', desc:'Amarena, tabacco dolce e la spina acida giusta.', premi:['Bio', 'Due Bicchieri 2026'], nome:'Chianti Classico Riserva 2020', cantina:'Podere Fontesecca', regione:'Toscana',
  cat:'vini', tipo:'Rosso', uvaggio:'Sangiovese', abv:'14% vol', formato:'0,75 L',
  prezzo:29.50, prima:null, voto:4.7, acquisti:97, scorte:33, bio:true,
  foto:'foto/eja-buccoliero.png'},

 {id:'p19', venditore:'Ca’ del Lago', desc:'Trentasei mesi sui lieviti, perlage fine, chiusura secca.', premi:['Tre Bicchieri 2025'], nome:'Franciacorta Brut Millesimato 2020', cantina:'Ca’ del Lago', regione:'Lombardia',
  cat:'bollicine', tipo:'Spumante', uvaggio:'Chardonnay', abv:'12,5% vol', formato:'0,75 L',
  prezzo:32.00, prima:38.00, voto:4.8, acquisti:141, scorte:18,
  foto:'foto/ormarins-blanc-de-blancs.png', badge:'−16%', badgeKind:'sale'},

 {id:'p20', venditore:'Maso Alteno', desc:'Sessanta mesi in quota: crosta di pane, nocciola, lunghezza.', premi:['Bio', 'Tre Bicchieri 2026'], nome:'Trentodoc Riserva 2017', cantina:'Maso Alteno', regione:'Trentino-Alto Adige',
  cat:'bollicine', tipo:'Spumante', uvaggio:'Chardonnay', abv:'12,5% vol', formato:'0,75 L',
  prezzo:44.00, prima:null, voto:4.9, acquisti:41, scorte:7, bio:true,
  foto:'foto/metodo-classico-rosato.png', badge:'60 mesi sui lieviti'},

 {id:'p21', venditore:'Colle Fiorito', desc:'Rosa intenso e ciliegia, con una struttura che regge la terra.', premi:['Bio', 'Vegan'], nome:'Cerasuolo d’Abruzzo 2023', cantina:'Colle Fiorito', regione:'Abruzzo',
  cat:'vini', tipo:'Rosato', uvaggio:'Montepulciano', abv:'13% vol', formato:'0,75 L',
  prezzo:14.50, prima:null, voto:4.6, acquisti:64, scorte:39, bio:true,
  foto:'foto/ma-mi.png', badge:'Bio', badgeKind:'bio'},

 {id:'p22', venditore:'Isola Ventosa', desc:'Zibibbo appassito al sole: albicocca secca e miele di corbezzolo.', premi:['Bio', 'Cinque Grappoli'], nome:'Passito di Pantelleria 2019', cantina:'Isola Ventosa', regione:'Sicilia',
  cat:'vini', tipo:'Dolce', uvaggio:'Zibibbo', abv:'14% vol', formato:'0,50 L',
  prezzo:34.00, prima:null, voto:4.9, acquisti:36, scorte:6, bio:true,
  foto:'foto/cannellino-torre-falchi.png', badge:'Da dessert'},

 {id:'p23', venditore:'Distilleria Vergnano', desc:'Cinque anni in barrique: frutta secca e finale asciutto.', premi:[], nome:'Grappa di Nebbiolo Riserva', cantina:'Distilleria Vergnano', regione:'Piemonte',
  cat:'distillati', tipo:'Grappa', uvaggio:'Nebbiolo', abv:'42% vol', formato:'0,70 L',
  prezzo:38.00, prima:null, voto:4.7, acquisti:64, scorte:19,
  foto:'foto/gin-km-0.png', badge:'5 anni in barrique'},

 {id:'p24', venditore:'Antico Palmento', desc:'Ventidue erbe del vulcano. Amaro vero, non dolce mascherato.', premi:['Bio'], nome:'Amaro alle erbe dell’Etna', cantina:'Antico Palmento', regione:'Sicilia',
  cat:'liquori', tipo:'Amaro', uvaggio:'22 erbe', abv:'30% vol', formato:'0,50 L',
  prezzo:26.00, prima:null, voto:4.6, acquisti:57, scorte:34, bio:true,
  foto:'foto/cuvee-extra-dry.png', badge:'Bio', badgeKind:'bio'}
];