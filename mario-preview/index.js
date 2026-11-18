const NINTENDO_ASSET = "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/Marketing/mIgD42QBmpzD4gE5jvZ209LSevumbPiS8VyXfbGH9907X4EoUyE7QAx5ROGsaQrp/characters/";
const portraits = {
  mario: NINTENDO_ASSET + "character-mario",
  luigi: NINTENDO_ASSET + "character-luigi",
  peach: NINTENDO_ASSET + "character-peach",
  toad: NINTENDO_ASSET + "character-toad",
  bowser: NINTENDO_ASSET + "character-bowser",
  yoshi: NINTENDO_ASSET + "character-yoshi",
  daisy: NINTENDO_ASSET + "character-daisy",
  wario: NINTENDO_ASSET + "character-wario",
  waluigi: NINTENDO_ASSET + "character-waluigi",
  rosalina: NINTENDO_ASSET + "character-rosalina",
  bowserJr: NINTENDO_ASSET + "character-bowser-jr-2",
  boo: NINTENDO_ASSET + "character-boo",
  donkeyKong: NINTENDO_ASSET + "character-donkey-kong",
  diddyKong: NINTENDO_ASSET + "character-diddy-kong"
};

const games = [
  {id:"donkey-kong",title:"Donkey Kong",year:1981,series:"other",label:"ARCADE",platform:"Arcade",symbol:"DK",colors:["#a64c2f","#542a27"],art:"donkeyKong",description:"El arcade que presentó a Jumpman, el personaje que más tarde se convertiría en Mario. Una persecución vertical entre barriles, plataformas y vigas."},
  {id:"mario-bros",title:"Mario Bros.",year:1983,series:"platform",label:"ARCADE",platform:"Arcade · NES",symbol:"MB",colors:["#2c69bd","#15355e"],art:"mario",description:"Mario y Luigi se unen para limpiar las tuberías de criaturas que aparecen en las alcantarillas. Aquí comenzó la dupla de los hermanos."},
  {id:"wrecking-crew",title:"Wrecking Crew",year:1984,series:"other",label:"PUZZLE / ACCIÓN",platform:"NES",symbol:"WC",colors:["#edb934","#774b1c"],art:"mario",description:"Mario trabaja como demoledor: hay que destruir paredes y obstáculos en escenarios que exigen planificar cada movimiento."},
  {id:"smb",title:"Super Mario Bros.",year:1985,series:"platform",label:"PLATAFORMAS 2D",platform:"NES",symbol:"1—1",colors:["#2692b6","#164c70"],art:"mario",description:"El clásico que llevó a Mario al centro de la cultura popular. El Reino Champiñón, los Goombas y Bowser quedaron grabados para siempre."},
  {id:"lost-levels",title:"Super Mario Bros.: The Lost Levels",year:1986,series:"platform",label:"PLATAFORMAS 2D",platform:"Famicom Disk System",symbol:"LL",colors:["#b33d36","#651f2b"],art:"luigi",description:"La secuela japonesa original de Super Mario Bros., con niveles más exigentes, viento y nuevas trampas."},
  {id:"smb2",title:"Super Mario Bros. 2",year:1988,series:"platform",label:"PLATAFORMAS 2D",platform:"NES",symbol:"2",colors:["#3d8b65","#184b3c"],art:"toad",description:"Una aventura diferente en el mundo de los sueños Subcon. Mario, Luigi, Peach y Toad tienen habilidades propias."},
  {id:"smb3",title:"Super Mario Bros. 3",year:1988,series:"platform",label:"PLATAFORMAS 2D",platform:"NES",symbol:"3",colors:["#e2a92d","#754a27"],art:"mario",description:"Un mapa de mundos, trajes inolvidables y la primera aparición de los Koopalings en una de las entregas más influyentes."},
  {id:"super-mario-land",title:"Super Mario Land",year:1989,series:"platform",label:"PLATAFORMAS 2D",platform:"Game Boy",symbol:"LAND",colors:["#7f9950","#35452b"],art:"mario",description:"Mario viaja a Sarasaland para rescatar a Daisy. Una aventura portátil con escenarios y enemigos únicos."},
  {id:"super-mario-world",title:"Super Mario World",year:1990,series:"platform",label:"PLATAFORMAS 2D",platform:"Super Nintendo",symbol:"WORLD",colors:["#3b88a5","#1d455e"],art:"yoshi",description:"La aventura de Dinosaur Land introduce a Yoshi y expande la exploración con rutas secretas y salidas alternativas."},
  {id:"dr-mario",title:"Dr. Mario",year:1990,series:"other",label:"PUZZLE",platform:"NES · Game Boy",symbol:"DR",colors:["#d24a43","#792d38"],art:"mario",description:"Mario cambia la fontanería por la medicina en un rompecabezas de cápsulas y virus de colores."},
  {id:"land-2",title:"Super Mario Land 2: 6 Golden Coins",year:1992,series:"platform",label:"PLATAFORMAS 2D",platform:"Game Boy",symbol:"6",colors:["#c48e3a","#5d492e"],art:"wario",description:"Mario debe recuperar su castillo de las manos de Wario. La aventura introduce al rival que se convertiría en protagonista de su propia saga."},
  {id:"super-mario-kart",title:"Super Mario Kart",year:1992,series:"kart",label:"CARRERAS",platform:"Super Nintendo",symbol:"KART",colors:["#268d83","#13554f"],art:"mario",description:"El primer torneo de karts de Mario. Presentó objetos, circuitos coloridos y carreras multijugador que dieron origen a una saga."},
  {id:"wario-land",title:"Wario Land: Super Mario Land 3",year:1994,series:"other",label:"PLATAFORMAS 2D",platform:"Game Boy",symbol:"W",colors:["#be9e26","#625021"],art:"wario",description:"Wario se convierte en protagonista y sale a buscar tesoros para construir su propio castillo."},
  {id:"donkey-kong-country",title:"Donkey Kong Country",year:1994,series:"other",label:"PLATAFORMAS 2D",platform:"Super Nintendo",symbol:"DKC",colors:["#638e3e","#26442c"],art:"donkeyKong",description:"Donkey Kong y Diddy Kong recorren la isla para recuperar el tesoro de bananas robado por King K. Rool."},
  {id:"yoshis-island",title:"Super Mario World 2: Yoshi's Island",year:1995,series:"other",label:"PLATAFORMAS 2D",platform:"Super Nintendo",symbol:"YOSHI",colors:["#7d9c57","#375c43"],art:"yoshi",description:"Yoshi protege al bebé Mario en una aventura de dibujo, huevos arrojadizos y mundos llenos de personalidad."},
  {id:"mario-tennis",title:"Mario's Tennis",year:1995,series:"sports",label:"TENIS",platform:"Virtual Boy",symbol:"ACE",colors:["#c44d39","#6f2e36"],art:"mario",description:"Una de las primeras incursiones de Mario en el tenis, con personajes del Reino Champiñón en la cancha."},
  {id:"mario-64",title:"Super Mario 64",year:1996,series:"platform",label:"PLATAFORMAS 3D",platform:"Nintendo 64",symbol:"64",colors:["#3c78be","#1d3c75"],art:"mario",description:"Un salto decisivo a las tres dimensiones. El castillo de Peach conecta mundos abiertos para explorar y descubrir estrellas."},
  {id:"super-mario-rpg",title:"Super Mario RPG: Legend of the Seven Stars",year:1996,series:"rpg",label:"ROL",platform:"Super Nintendo",symbol:"RPG",colors:["#b34b3a","#5b2b38"],art:"mario",description:"Una aventura de rol por turnos con compañeros nuevos como Geno y Mallow, humor y combates con acciones temporizadas."},
  {id:"mario-kart-64",title:"Mario Kart 64",year:1996,series:"kart",label:"CARRERAS",platform:"Nintendo 64",symbol:"64",colors:["#2e91a0","#174a63"],art:"mario",description:"El salto de las carreras de Mario a las pistas tridimensionales, con atajos, objetos y multijugador de cuatro participantes."},
  {id:"mario-party",title:"Mario Party",year:1998,series:"party",label:"FIESTA",platform:"Nintendo 64",symbol:"MP",colors:["#db9c33","#78442b"],art:"mario",description:"Un tablero de juego de mesa con minijuegos competitivos. El comienzo de una de las sagas multijugador más reconocibles de Nintendo."},
  {id:"mario-golf-64",title:"Mario Golf",year:1999,series:"sports",label:"GOLF",platform:"Nintendo 64",symbol:"GOLF",colors:["#76a34d","#315f37"],art:"luigi",description:"Mario y sus amigos llevan sus habilidades al campo de golf, con controles accesibles y opciones para profundizar."},
  {id:"mario-party-2",title:"Mario Party 2",year:1999,series:"party",label:"FIESTA",platform:"Nintendo 64",symbol:"2",colors:["#c85a4a","#752a3e"],art:"toad",description:"La fórmula de tableros y minijuegos regresa con nuevos escenarios temáticos y disfraces para los personajes."},
  {id:"mario-tennis-64",title:"Mario Tennis",year:2000,series:"sports",label:"TENIS",platform:"Nintendo 64",symbol:"ACE",colors:["#d8ad38","#725329"],art:"waluigi",description:"La entrega de Nintendo 64 presenta a Waluigi y amplía la competencia deportiva entre los personajes."},
  {id:"paper-mario",title:"Paper Mario",year:2000,series:"rpg",label:"ROL / PAPEL",platform:"Nintendo 64",symbol:"PAPER",colors:["#d47e37","#75402f"],art:"mario",description:"Un RPG en el que el mundo y sus habitantes parecen recortados en papel. Combina exploración, compañeros y combates por turnos."},
  {id:"luigis-mansion",title:"Luigi's Mansion",year:2001,series:"other",label:"ACCIÓN / AVENTURA",platform:"Nintendo GameCube",symbol:"LM",colors:["#438a78","#214c4b"],art:"luigi",description:"Luigi debe explorar una mansión encantada y rescatar a Mario con la ayuda de una aspiradora especial creada por el profesor E. Gadd."},
  {id:"mario-kart-super-circuit",title:"Mario Kart: Super Circuit",year:2001,series:"kart",label:"CARRERAS",platform:"Game Boy Advance",symbol:"GBA",colors:["#438e9a","#23485d"],art:"mario",description:"La velocidad de Mario Kart llega a Game Boy Advance con circuitos nuevos y pistas clásicas recuperadas."},
  {id:"sunshine",title:"Super Mario Sunshine",year:2002,series:"platform",label:"PLATAFORMAS 3D",platform:"Nintendo GameCube",symbol:"SUN",colors:["#2f87bd","#164b72"],art:"mario",description:"En Isla Delfino, Mario utiliza el dispositivo acuático ACUAC para limpiar grafitis y resolver el misterio de Mario Oscuro."},
  {id:"mario-party-4",title:"Mario Party 4",year:2002,series:"party",label:"FIESTA",platform:"Nintendo GameCube",symbol:"4",colors:["#d58b35","#6d3b2b"],art:"toad",description:"La saga debuta en GameCube con tableros tridimensionales y una nueva colección de minijuegos."},
  {id:"mario-golf-toadstool",title:"Mario Golf: Toadstool Tour",year:2003,series:"sports",label:"GOLF",platform:"Nintendo GameCube",symbol:"GOLF",colors:["#6c9c54","#264f3d"],art:"luigi",description:"Golf arcade con personajes, campos temáticos y golpes especiales del universo Mario."},
  {id:"mario-party-5",title:"Mario Party 5",year:2003,series:"party",label:"FIESTA",platform:"Nintendo GameCube",symbol:"5",colors:["#9c71b4","#49375f"],art:"rosalina",description:"Los tableros de ensueño y las cápsulas de objetos renuevan las estrategias de la fiesta."},
  {id:"mario-kart-double-dash",title:"Mario Kart: Double Dash!!",year:2003,series:"kart",label:"CARRERAS",platform:"Nintendo GameCube",symbol:"2X",colors:["#d66a37","#753e36"],art:"mario",description:"Dos personajes comparten cada kart: uno conduce y el otro utiliza objetos. Una de las ideas más particulares de la saga."},
  {id:"mario-luigi-superstar",title:"Mario & Luigi: Superstar Saga",year:2003,series:"rpg",label:"ROL / AVENTURA",platform:"Game Boy Advance",symbol:"M&L",colors:["#5b8a53","#294d40"],art:"luigi",description:"Los hermanos viajan al Reino de los Frijoles para recuperar la voz de Peach. Presenta a Fawful y Cackletta."},
  {id:"warioware",title:"WarioWare, Inc.: Mega Microgame$!",year:2003,series:"other",label:"MICROJUEGOS",platform:"Game Boy Advance",symbol:"W!",colors:["#c4a529","#6d4e21"],art:"wario",description:"Una colección frenética de microjuegos de pocos segundos que da inicio al estilo impredecible de WarioWare."},
  {id:"mario-party-6",title:"Mario Party 6",year:2004,series:"party",label:"FIESTA",platform:"Nintendo GameCube",symbol:"6",colors:["#427bba","#24416f"],art:"mario",description:"El ciclo de día y noche cambia reglas y tableros en una entrega centrada en la variedad multijugador."},
  {id:"mario-vs-dk",title:"Mario vs. Donkey Kong",year:2004,series:"other",label:"PUZZLE / ACCIÓN",platform:"Game Boy Advance",symbol:"VS",colors:["#cb5a3f","#693038"],art:"mario",description:"Una aventura de plataformas y rompecabezas en la que Mario debe recuperar los Mini-Marios que Donkey Kong se llevó."},
  {id:"paper-mario-ttyD",title:"Paper Mario: The Thousand-Year Door",year:2004,series:"rpg",label:"ROL / PAPEL",platform:"Nintendo GameCube",symbol:"TTYD",colors:["#b98243","#6b3e35"],art:"mario",description:"Una búsqueda de siete tesoros que expande el universo de papel con aliados memorables, pueblos singulares y mucho humor."},
  {id:"mario-power-tennis",title:"Mario Power Tennis",year:2004,series:"sports",label:"TENIS",platform:"Nintendo GameCube",symbol:"ACE",colors:["#c45a44","#6f2a3b"],art:"waluigi",description:"Tenis arcade con canchas interactivas, golpes de poder y un elenco amplio de personajes."},
  {id:"mario-party-7",title:"Mario Party 7",year:2005,series:"party",label:"FIESTA",platform:"Nintendo GameCube",symbol:"7",colors:["#458a9a","#204d60"],art:"yoshi",description:"Una fiesta a bordo de un crucero con tableros temáticos, minijuegos y modos para varios jugadores."},
  {id:"mario-kart-ds",title:"Mario Kart DS",year:2005,series:"kart",label:"CARRERAS",platform:"Nintendo DS",symbol:"DS",colors:["#4186aa","#1f456a"],art:"mario",description:"La serie llega a Nintendo DS con juego en línea, modo Batalla y un conjunto amplio de circuitos clásicos."},
  {id:"partners-in-time",title:"Mario & Luigi: Partners in Time",year:2005,series:"rpg",label:"ROL / AVENTURA",platform:"Nintendo DS",symbol:"M&L",colors:["#8a6bb2","#433b70"],art:"luigi",description:"Los hermanos adultos viajan junto a sus versiones bebé para enfrentar una invasión alienígena."},
  {id:"super-princess-peach",title:"Super Princess Peach",year:2005,series:"other",label:"PLATAFORMAS 2D",platform:"Nintendo DS",symbol:"PEACH",colors:["#d66a8e","#7c3d69"],art:"peach",description:"Peach protagoniza su propia aventura y utiliza emociones para cambiar sus habilidades y superar obstáculos."},
  {id:"mario-strikers",title:"Super Mario Strikers",year:2005,series:"sports",label:"FÚTBOL",platform:"Nintendo GameCube",symbol:"STRK",colors:["#519b56","#235133"],art:"bowser",description:"Fútbol arcade sin árbitros, con entradas contundentes, objetos y tiros especiales."},
  {id:"new-super-mario-bros",title:"New Super Mario Bros.",year:2006,series:"platform",label:"PLATAFORMAS 2D",platform:"Nintendo DS",symbol:"NEW",colors:["#3c88b2","#1f4c75"],art:"mario",description:"El regreso de Mario al desplazamiento lateral tradicional, con gráficos tridimensionales y nuevos potenciadores."},
  {id:"mario-galaxy",title:"Super Mario Galaxy",year:2007,series:"platform",label:"PLATAFORMAS 3D",platform:"Wii",symbol:"★",colors:["#43558d","#20284f"],art:"rosalina",description:"Mario recorre galaxias y pequeños planetas para reunir estrellas y rescatar a Peach. Introduce a Rosalina y los Destellos."},
  {id:"super-paper-mario",title:"Super Paper Mario",year:2007,series:"rpg",label:"ACCIÓN / ROL",platform:"Wii",symbol:"PAPER",colors:["#bd5c3e","#6c3041"],art:"luigi",description:"Una aventura que mezcla plataformas y rol, con la capacidad de alternar entre perspectivas 2D y 3D. Presenta a Dimentio y Count Bleck."},
  {id:"mario-party-8",title:"Mario Party 8",year:2007,series:"party",label:"FIESTA",platform:"Wii",symbol:"8",colors:["#b58d42","#64432c"],art:"mario",description:"La primera entrega principal de Mario Party para Wii, con controles por movimiento y tableros nuevos."},
  {id:"mario-kart-wii",title:"Mario Kart Wii",year:2008,series:"kart",label:"CARRERAS",platform:"Wii",symbol:"Wii",colors:["#328c94","#194b5d"],art:"luigi",description:"Las motos se suman a los karts y el volante Wii acerca las carreras a una nueva generación de jugadores."},
  {id:"wario-land-shake",title:"Wario Land: The Shake Dimension",year:2008,series:"other",label:"PLATAFORMAS 2D",platform:"Wii",symbol:"SHAKE",colors:["#b6a12e","#685122"],art:"wario",description:"Wario emprende una aventura de plataformas con animación dibujada a mano y escenarios que reaccionan al movimiento."},
  {id:"mario-super-sluggers",title:"Mario Super Sluggers",year:2008,series:"sports",label:"BÉISBOL",platform:"Wii",symbol:"BALL",colors:["#438d59","#1e523d"],art:"mario",description:"Béisbol arcade con personajes, estadios temáticos y controles de movimiento."},
  {id:"new-super-mario-bros-wii",title:"New Super Mario Bros. Wii",year:2009,series:"platform",label:"PLATAFORMAS 2D",platform:"Wii",symbol:"Wii",colors:["#3289b5","#194975"],art:"luigi",description:"El regreso de las plataformas 2D incorpora cooperativo local para hasta cuatro jugadores."},
  {id:"bowsers-inside-story",title:"Mario & Luigi: Bowser's Inside Story",year:2009,series:"rpg",label:"ROL / AVENTURA",platform:"Nintendo DS",symbol:"BOWSER",colors:["#b65a36","#682c35"],art:"bowser",description:"Mario y Luigi recorren el interior de Bowser mientras él intenta salvar el Reino Champiñón desde afuera."},
  {id:"mario-vs-dk-minis",title:"Mario vs. Donkey Kong: Minis March Again!",year:2009,series:"other",label:"PUZZLE",platform:"Nintendo DSi",symbol:"MINI",colors:["#4a8a9c","#244a65"],art:"mario",description:"Los Mini-Marios vuelven en una aventura de puzles diseñada alrededor de rutas, interruptores y movimientos precisos."},
  {id:"galaxy-2",title:"Super Mario Galaxy 2",year:2010,series:"platform",label:"PLATAFORMAS 3D",platform:"Wii",symbol:"★ 2",colors:["#495aa4","#252c62"],art:"yoshi",description:"La fórmula galáctica se amplía con nuevos planetas, desafíos y la posibilidad de recorrer niveles montado en Yoshi."},
  {id:"dk-country-returns",title:"Donkey Kong Country Returns",year:2010,series:"other",label:"PLATAFORMAS 2D",platform:"Wii",symbol:"DK",colors:["#708c39","#384a2b"],art:"donkeyKong",description:"Donkey Kong y Diddy regresan a la aventura de plataformas para recuperar su reserva de bananas."},
  {id:"super-mario-3d-land",title:"Super Mario 3D Land",year:2011,series:"platform",label:"PLATAFORMAS 3D",platform:"Nintendo 3DS",symbol:"3D",colors:["#5b9954","#28533d"],art:"mario",description:"Un Mario tridimensional pensado para jugar en portátil, con niveles compactos y el regreso del traje Tanooki."},
  {id:"mario-kart-7",title:"Mario Kart 7",year:2011,series:"kart",label:"CARRERAS",platform:"Nintendo 3DS",symbol:"7",colors:["#3b899a","#214d62"],art:"mario",description:"La serie incorpora planeadores y secciones submarinas, además de personalización de vehículos."},
  {id:"mario-party-9",title:"Mario Party 9",year:2012,series:"party",label:"FIESTA",platform:"Wii",symbol:"9",colors:["#c18a44","#6a442c"],art:"toad",description:"Una nueva estructura de tablero lleva a todos los jugadores en el mismo vehículo y renueva el ritmo de la competencia."},
  {id:"new-super-mario-bros-2",title:"New Super Mario Bros. 2",year:2012,series:"platform",label:"PLATAFORMAS 2D",platform:"Nintendo 3DS",symbol:"2",colors:["#d8a936","#805224"],art:"mario",description:"Una aventura centrada en la recolección de monedas, con desafíos y niveles especiales."},
  {id:"new-super-mario-bros-u",title:"New Super Mario Bros. U",year:2012,series:"platform",label:"PLATAFORMAS 2D",platform:"Wii U",symbol:"U",colors:["#4385b2","#1d4b73"],art:"mario",description:"Una aventura cooperativa en el Reino Champiñón, con nuevos desafíos y un mapa conectado de mundos."},
  {id:"paper-mario-sticker-star",title:"Paper Mario: Sticker Star",year:2012,series:"rpg",label:"ROL / PAPEL",platform:"Nintendo 3DS",symbol:"PAPER",colors:["#bd8143","#68402d"],art:"mario",description:"Una aventura de papel en la que las pegatinas sirven como recursos para combatir y resolver puzles."},
  {id:"luigis-mansion-dark-moon",title:"Luigi's Mansion: Dark Moon",year:2013,series:"other",label:"ACCIÓN / AVENTURA",platform:"Nintendo 3DS",symbol:"LM 2",colors:["#39897a","#214d49"],art:"luigi",description:"Luigi explora varias mansiones para recuperar fragmentos de la Luna Oscura y detener a los fantasmas."},
  {id:"mario-3d-world",title:"Super Mario 3D World",year:2013,series:"platform",label:"PLATAFORMAS 3D",platform:"Wii U",symbol:"3D",colors:["#65a35c","#285844"],art:"mario",description:"Mario, Luigi, Peach y Toad recorren el Reino de las Hadas en una aventura cooperativa con el traje de gato."},
  {id:"dream-team",title:"Mario & Luigi: Dream Team",year:2013,series:"rpg",label:"ROL / AVENTURA",platform:"Nintendo 3DS",symbol:"DREAM",colors:["#8074b9","#41416f"],art:"luigi",description:"Luigi se convierte en el centro de una aventura onírica que mezcla el mundo real con escenarios de sueños."},
  {id:"mario-golf-world-tour",title:"Mario Golf: World Tour",year:2014,series:"sports",label:"GOLF",platform:"Nintendo 3DS",symbol:"GOLF",colors:["#66a15a","#315d3e"],art:"mario",description:"Una experiencia de golf accesible y competitiva con campos, torneos y opciones de personalización."},
  {id:"mario-kart-8",title:"Mario Kart 8",year:2014,series:"kart",label:"CARRERAS",platform:"Wii U",symbol:"8",colors:["#258b9d","#194a67"],art:"mario",description:"La antigravedad transforma los circuitos y permite competir por paredes y techos. Su diseño visual marcó una nueva etapa de la saga."},
  {id:"captain-toad",title:"Captain Toad: Treasure Tracker",year:2014,series:"other",label:"PUZZLE / AVENTURA",platform:"Wii U",symbol:"TOAD",colors:["#bd8c3e","#62452d"],art:"toad",description:"El Capitán Toad protagoniza rompecabezas tridimensionales basados en explorar escenarios y encontrar tesoros."},
  {id:"mario-party-10",title:"Mario Party 10",year:2015,series:"party",label:"FIESTA",platform:"Wii U",symbol:"10",colors:["#b95c4b","#6d3040"],art:"mario",description:"Tableros, minijuegos y un modo especial protagonizado por Bowser con soporte para figuras amiibo."},
  {id:"mario-maker",title:"Super Mario Maker",year:2015,series:"platform",label:"CREACIÓN",platform:"Wii U",symbol:"MAKE",colors:["#d2a13e","#77502c"],art:"mario",description:"Una caja de herramientas para diseñar, compartir y jugar niveles propios inspirados en distintas épocas de Mario."},
  {id:"mario-tennis-ultra",title:"Mario Tennis: Ultra Smash",year:2015,series:"sports",label:"TENIS",platform:"Wii U",symbol:"ACE",colors:["#c75646","#6e3340"],art:"waluigi",description:"Una entrega de tenis arcade con el modo Mega Batalla y partidos de ritmo rápido."},
  {id:"paper-mario-color-splash",title:"Paper Mario: Color Splash",year:2016,series:"rpg",label:"ROL / PAPEL",platform:"Wii U",symbol:"COLOR",colors:["#d36d45","#784038"],art:"mario",description:"Mario utiliza pintura para devolver el color a Isla Prisma en una aventura con estética de manualidades."},
  {id:"super-mario-run",title:"Super Mario Run",year:2016,series:"platform",label:"PLATAFORMAS",platform:"iOS · Android",symbol:"RUN",colors:["#c64d3a","#742d39"],art:"mario",description:"Una aventura de avance automático diseñada para pantallas táctiles, con modos de carrera y construcción del reino."},
  {id:"mario-odyssey",title:"Super Mario Odyssey",year:2017,series:"platform",label:"PLATAFORMAS 3D",platform:"Nintendo Switch",symbol:"ODYSSEY",colors:["#2d65aa","#193a70"],art:"mario",description:"Un viaje por reinos muy distintos en el que Mario utiliza a Cappy para capturar criaturas, objetos y enemigos."},
  {id:"mario-kart-8-deluxe",title:"Mario Kart 8 Deluxe",year:2017,series:"kart",label:"CARRERAS",platform:"Nintendo Switch",symbol:"8 DX",colors:["#278e9b","#164a66"],art:"mario",description:"La edición ampliada de Mario Kart 8 reúne circuitos, personajes y modos en una de las entregas más completas de la saga."},
  {id:"mario-rabbids",title:"Mario + Rabbids Kingdom Battle",year:2017,series:"rpg",label:"ESTRATEGIA",platform:"Nintendo Switch",symbol:"RABBIDS",colors:["#4977b0","#243b6a"],art:"mario",description:"Un cruce de mundos que combina personajes de Mario con Rabbids en combates tácticos por turnos."},
  {id:"super-mario-party",title:"Super Mario Party",year:2018,series:"party",label:"FIESTA",platform:"Nintendo Switch",symbol:"PARTY",colors:["#c68c3b","#683e2b"],art:"yoshi",description:"Tableros clásicos, minijuegos y nuevas formas de jugar en Nintendo Switch, tanto en televisión como en modo portátil."},
  {id:"mario-tennis-aces",title:"Mario Tennis Aces",year:2018,series:"sports",label:"TENIS",platform:"Nintendo Switch",symbol:"ACE",colors:["#c84e48","#702e43"],art:"waluigi",description:"Una entrega de tenis con modo historia, golpes especiales y duelos competitivos."},
  {id:"mario-maker-2",title:"Super Mario Maker 2",year:2019,series:"platform",label:"CREACIÓN",platform:"Nintendo Switch",symbol:"MAKE 2",colors:["#cc9b3c","#704e29"],art:"mario",description:"Amplía la creación de niveles con más estilos visuales, piezas, condiciones y un modo historia."},
  {id:"mario-kart-tour",title:"Mario Kart Tour",year:2019,series:"kart",label:"CARRERAS",platform:"iOS · Android",symbol:"TOUR",colors:["#258b98","#164961"],art:"mario",description:"La fórmula de Mario Kart llega a dispositivos móviles con circuitos inspirados en ciudades del mundo."},
  {id:"luigis-mansion-3",title:"Luigi's Mansion 3",year:2019,series:"other",label:"ACCIÓN / AVENTURA",platform:"Nintendo Switch",symbol:"LM 3",colors:["#448c76","#1e504b"],art:"luigi",description:"Luigi explora un hotel repleto de fantasmas y usa a Gomiluigi para resolver puzles y rescatar a sus amigos."},
  {id:"origami-king",title:"Paper Mario: The Origami King",year:2020,series:"rpg",label:"ROL / PAPEL",platform:"Nintendo Switch",symbol:"ORIGAMI",colors:["#d47f43","#784035"],art:"mario",description:"Una aventura de papel y origami con un sistema de combate basado en alinear enemigos y resolver rompecabezas."},
  {id:"mario-kart-live",title:"Mario Kart Live: Home Circuit",year:2020,series:"kart",label:"CARRERAS / REALIDAD MIXTA",platform:"Nintendo Switch",symbol:"LIVE",colors:["#328f9c","#194960"],art:"mario",description:"Combina una consola con karts físicos y realidad aumentada para convertir cualquier habitación en un circuito."},
  {id:"super-mario-3d-all-stars",title:"Super Mario 3D All-Stars",year:2020,series:"platform",label:"COMPILACIÓN",platform:"Nintendo Switch",symbol:"3D ★",colors:["#4d71a0","#223a69"],art:"mario",description:"Una recopilación que reúne Super Mario 64, Super Mario Sunshine y Super Mario Galaxy en Nintendo Switch."},
  {id:"super-mario-35",title:"Super Mario Bros. 35",year:2020,series:"platform",label:"PLATAFORMAS / ONLINE",platform:"Nintendo Switch",symbol:"35",colors:["#bd493d","#672d35"],art:"mario",description:"Una experiencia competitiva temporal que enfrentaba a 35 jugadores en niveles inspirados en el Super Mario Bros. original."},
  {id:"super-mario-3d-world-bowser",title:"Super Mario 3D World + Bowser's Fury",year:2021,series:"platform",label:"PLATAFORMAS 3D",platform:"Nintendo Switch",symbol:"FURY",colors:["#4e8b65","#244a40"],art:"bowser",description:"La versión ampliada de 3D World suma Bowser's Fury, una aventura de mundo abierto con un Bowser gigantesco."},
  {id:"mario-golf-super-rush",title:"Mario Golf: Super Rush",year:2021,series:"sports",label:"GOLF",platform:"Nintendo Switch",symbol:"RUSH",colors:["#67a35b","#315b3c"],art:"mario",description:"Golf de ritmo rápido con modos como Speed Golf, desafíos de movimiento y un modo historia."},
  {id:"mario-party-superstars",title:"Mario Party Superstars",year:2021,series:"party",label:"FIESTA",platform:"Nintendo Switch",symbol:"★",colors:["#c98a3d","#73432b"],art:"toad",description:"Una colección de tableros y minijuegos clásicos de la historia de Mario Party, adaptados a Nintendo Switch."},
  {id:"warioware-get-it-together",title:"WarioWare: Get It Together!",year:2021,series:"other",label:"MICROJUEGOS",platform:"Nintendo Switch",symbol:"W!",colors:["#c2a12c","#705023"],art:"wario",description:"Wario y sus amigos entran en los microjuegos y cada personaje los resuelve con habilidades distintas."},
  {id:"mario-rabbids-sparks",title:"Mario + Rabbids Sparks of Hope",year:2022,series:"rpg",label:"ESTRATEGIA",platform:"Nintendo Switch",symbol:"SPARKS",colors:["#4b75aa","#26365e"],art:"rosalina",description:"Una aventura táctica por planetas en la que Mario y sus aliados deben detener una amenaza cósmica."},
  {id:"mario-strikers-battle",title:"Mario Strikers: Battle League",year:2022,series:"sports",label:"FÚTBOL",platform:"Nintendo Switch",symbol:"STRK",colors:["#539c57","#244f35"],art:"bowser",description:"Fútbol arcade de cinco contra cinco, con equipamiento, objetos y remates especiales."},
  {id:"super-mario-bros-wonder",title:"Super Mario Bros. Wonder",year:2023,series:"platform",label:"PLATAFORMAS 2D",platform:"Nintendo Switch",symbol:"WONDER",colors:["#338eac","#1c4b70"],art:"mario",description:"Una aventura de desplazamiento lateral en el Reino Flor, con Flores Maravilla que transforman las reglas de cada nivel."},
  {id:"super-mario-rpg-remake",title:"Super Mario RPG",year:2023,series:"rpg",label:"ROL · REMAKE",platform:"Nintendo Switch",symbol:"RPG",colors:["#b5523e","#652e39"],art:"mario",description:"Una nueva versión del clásico de Super Nintendo, con gráficos renovados y el mismo sistema de rol con acciones temporizadas."},
  {id:"warioware-move-it",title:"WarioWare: Move It!",year:2023,series:"other",label:"MICROJUEGOS",platform:"Nintendo Switch",symbol:"MOVE",colors:["#c5a32d","#6f4c20"],art:"wario",description:"Microjuegos controlados con movimiento en una colección diseñada para jugar de pie y en grupo."},
  {id:"princess-peach-showtime",title:"Princess Peach: Showtime!",year:2024,series:"other",label:"ACCIÓN / AVENTURA",platform:"Nintendo Switch",symbol:"SHOW",colors:["#d66b94","#713b65"],art:"peach",description:"Peach protagoniza una aventura en un teatro y cambia de estilo para asumir papeles con habilidades únicas."},
  {id:"paper-mario-ttyD-remake",title:"Paper Mario: The Thousand-Year Door",year:2024,series:"rpg",label:"ROL · REMAKE",platform:"Nintendo Switch",symbol:"TTYD",colors:["#c28544","#70402e"],art:"mario",description:"El remake de la aventura de GameCube actualiza su presentación y conserva los compañeros, el humor y los combates del original."},
  {id:"luigis-mansion-2-hd",title:"Luigi's Mansion 2 HD",year:2024,series:"other",label:"ACCIÓN / AVENTURA",platform:"Nintendo Switch",symbol:"LM 2",colors:["#448978","#214b48"],art:"luigi",description:"Una versión en alta definición de Luigi's Mansion: Dark Moon, con varias mansiones, fantasmas y exploración cooperativa."},
  {id:"mario-party-jamboree",title:"Super Mario Party Jamboree",year:2024,series:"party",label:"FIESTA",platform:"Nintendo Switch",symbol:"JAM",colors:["#c88b38","#734329"],art:"yoshi",description:"Una gran colección de tableros y minijuegos para una de las entregas más extensas de Mario Party."},
  {id:"mario-luigi-brothership",title:"Mario & Luigi: Brothership",year:2024,series:"rpg",label:"ROL / AVENTURA",platform:"Nintendo Switch",symbol:"M&L",colors:["#4d8b6b","#214d48"],art:"luigi",description:"Los hermanos exploran un archipiélago conectado por una isla-barco, con combates cooperativos y nuevos compañeros."},
  {id:"mario-vs-dk-remake",title:"Mario vs. Donkey Kong",year:2024,series:"other",label:"PUZZLE · REMAKE",platform:"Nintendo Switch",symbol:"VS",colors:["#c65d40","#6c2e39"],art:"mario",description:"Una nueva versión del juego de puzles de Game Boy Advance, con escenarios renovados y cooperativo local."},
  {id:"mario-kart-world",title:"Mario Kart World",year:2025,series:"kart",label:"CARRERAS",platform:"Nintendo Switch 2",symbol:"WORLD",colors:["#238e9c","#164d68"],art:"mario",description:"Una nueva etapa de la saga de carreras, con un mundo conectado y recorridos que enlazan distintas regiones."},
  {id:"mario-galaxy-collection",title:"Super Mario Galaxy + Super Mario Galaxy 2",year:2025,series:"platform",label:"COMPILACIÓN",platform:"Nintendo Switch",symbol:"GALAXY",colors:["#4557a0","#222b60"],art:"rosalina",description:"Las dos aventuras galácticas llegan juntas a Nintendo Switch con mejoras para volver a explorar el espacio."},
  {id:"mario-tennis-fever",title:"Mario Tennis Fever",year:2026,series:"sports",label:"TENIS",platform:"Nintendo Switch 2",symbol:"FEVER",colors:["#c64c48","#6d2e3b"],art:"waluigi",description:"La saga de tenis vuelve con raquetas Fever, efectos especiales y una selección de 38 personajes jugables."},
  {id:"wonder-switch2",title:"Super Mario Bros. Wonder – Switch 2 Edition",year:2026,series:"platform",label:"PLATAFORMAS / EDICIÓN AMPLIADA",platform:"Nintendo Switch 2",symbol:"WONDER+",colors:["#338eac","#1b456f"],art:"mario",description:"Una edición ampliada con Bellabel Park, nuevas atracciones multijugador y contenido adicional para el Reino Flor."},
  {id:"yoshi-mysterious-book",title:"Yoshi and the Mysterious Book",year:2026,series:"other",label:"AVENTURA",platform:"Nintendo Switch 2",symbol:"YOSHI",colors:["#7a9b57","#365b40"],art:"yoshi",description:"Yoshi explora las páginas de un libro parlante y descubre criaturas y misterios dentro de sus ilustraciones."}
];

const characters = [
  {id:"mario",name:"Mario",role:"hero",roleLabel:"HÉROE PRINCIPAL",first:"Donkey Kong",year:1981,color:"#ef4b36",symbol:"M",portrait:portraits.mario,bio:"El héroe del Reino Champiñón. Su habilidad para saltar, su valentía y su versatilidad lo llevaron de los arcades a aventuras de plataformas, deportes y rol."},
  {id:"luigi",name:"Luigi",role:"hero",roleLabel:"HÉROE · HERMANO DE MARIO",first:"Mario Bros. (Game & Watch)",year:1983,color:"#65b95c",symbol:"L",portrait:portraits.luigi,bio:"El hermano menor de Mario es más alto, puede saltar más y suele ser bastante más nervioso. Con el tiempo se convirtió en el protagonista de Luigi's Mansion."},
  {id:"peach",name:"Princesa Peach",role:"hero",roleLabel:"PRINCESA DEL REINO CHAMPIÑÓN",first:"Super Mario Bros.",year:1985,color:"#e88bad",symbol:"P",portrait:portraits.peach,bio:"Gobierna el Reino Champiñón y es mucho más que una figura que necesita rescate: también protagoniza aventuras propias y participa en deportes y competiciones."},
  {id:"daisy",name:"Princesa Daisy",role:"ally",roleLabel:"ALIADA · SARASALAND",first:"Super Mario Land",year:1989,color:"#e6b64d",symbol:"D",portrait:portraits.daisy,bio:"La enérgica princesa de Sarasaland debutó enfrentándose a Tatanga. Es competitiva, expresiva y una presencia habitual en los juegos deportivos y de fiesta."},
  {id:"toad",name:"Toad",role:"ally",roleLabel:"ALIADO · HABITANTE DEL REINO",first:"Super Mario Bros.",year:1985,color:"#df5147",symbol:"T",portrait:portraits.toad,bio:"Un habitante del Reino Champiñón que acompaña y ayuda a Mario. Existen muchos Toads de distintos colores, funciones y personalidades."},
  {id:"yoshi",name:"Yoshi",role:"ally",roleLabel:"ALIADO · DINOSAURIO",first:"Super Mario World",year:1990,color:"#71b65d",symbol:"Y",portrait:portraits.yoshi,bio:"El compañero dinosaurio de Mario puede usar su larga lengua para comer enemigos y frutas, y convertir ciertos objetos en huevos que luego lanza."},
  {id:"bowser",name:"Bowser",role:"villain",roleLabel:"VILLANO · REY DE LOS KOOPAS",first:"Super Mario Bros.",year:1985,color:"#d99b35",symbol:"B",portrait:portraits.bowser,bio:"Rey de los Koopas y rival histórico de Mario. Es enorme, resistente y capaz de lanzar fuego; sus planes suelen apuntar al Reino Champiñón."},
  {id:"bowser-jr",name:"Bowser Jr.",role:"villain",roleLabel:"VILLANO · HIJO DE BOWSER",first:"Super Mario Sunshine",year:2002,color:"#83b95a",symbol:"J",portrait:portraits.bowserJr,bio:"El hijo de Bowser heredó su fuerza y su temperamento. Usa una máscara pintada y distintas máquinas para intentar detener a Mario."},
  {id:"rosalina",name:"Rosalina",role:"ally",roleLabel:"ALIADA · GUARDIANA CÓSMICA",first:"Super Mario Galaxy",year:2007,color:"#8ba8dd",symbol:"R",portrait:portraits.rosalina,bio:"Una viajera del cosmos que cuida a los Destellos. Su historia está ligada al observatorio y a los viajes entre galaxias."},
  {id:"toadette",name:"Toadette",role:"ally",roleLabel:"ALIADA · TOAD",first:"Mario Kart: Double Dash!!",year:2003,color:"#e88aab",symbol:"T",bio:"Una Toad de gorro rosado que participa en carreras, fiestas y aventuras. Con el tiempo obtuvo papeles importantes en juegos como Captain Toad."},
  {id:"pauline",name:"Pauline",role:"ally",roleLabel:"ALIADA · ALCALDESA",first:"Donkey Kong",year:1981,color:"#bf5c79",symbol:"P",bio:"Uno de los personajes más antiguos de la saga. Fue la damisela de Donkey Kong y, décadas después, regresó como alcaldesa de Nueva Donk."},
  {id:"wario",name:"Wario",role:"rival",roleLabel:"RIVAL · ANTIHÉROE",first:"Super Mario Land 2: 6 Golden Coins",year:1992,color:"#ddc23e",symbol:"W",portrait:portraits.wario,bio:"El rival de Mario es codicioso, ruidoso y fanático del ajo y el dinero. Protagoniza sus propias aventuras de plataformas y microjuegos."},
  {id:"waluigi",name:"Waluigi",role:"rival",roleLabel:"RIVAL · COMPAÑERO DE WARIO",first:"Mario Tennis",year:2000,color:"#9b83c9",symbol:"W",portrait:portraits.waluigi,bio:"El autoproclamado rival de Luigi. Su figura alargada, sus gestos exagerados y su competitividad lo hicieron habitual en los juegos deportivos y de fiesta."},
  {id:"donkey-kong",name:"Donkey Kong",role:"rival",roleLabel:"RIVAL · REY DE LA JUNGLA",first:"Donkey Kong",year:1981,color:"#a9784e",symbol:"DK",portrait:portraits.donkeyKong,bio:"El poderoso gorila de la corbata roja fue el primer gran antagonista de Mario. En su propia saga protege su isla y su reserva de bananas."},
  {id:"diddy-kong",name:"Diddy Kong",role:"ally",roleLabel:"ALIADO · KONG",first:"Donkey Kong Country",year:1994,color:"#c84c43",symbol:"DK",portrait:portraits.diddyKong,bio:"El compañero ágil de Donkey Kong. Es rápido, salta alto y suele ayudar a proteger el tesoro de bananas de la familia Kong."},
  {id:"birdo",name:"Birdo",role:"ally",roleLabel:"ALIADA · CRIATURA",first:"Yume Kōjō: Doki Doki Panic",year:1987,color:"#de7c9b",symbol:"B",bio:"Una criatura reconocible por su hocico tubular y los huevos que lanza. Debutó en Doki Doki Panic, el juego que se transformó en Super Mario Bros. 2 fuera de Japón."},
  {id:"geno",name:"Geno",role:"ally",roleLabel:"ALIADO · ESPÍRITU ESTELAR",first:"Super Mario RPG: Legend of the Seven Stars",year:1996,color:"#557eaf",symbol:"G",bio:"Una estrella que toma el cuerpo de un muñeco de madera para ayudar a Mario. Es uno de los compañeros más recordados del RPG de Super Nintendo."},
  {id:"mallow",name:"Mallow",role:"ally",roleLabel:"ALIADO · COMPAÑERO DE VIAJE",first:"Super Mario RPG: Legend of the Seven Stars",year:1996,color:"#8db8b8",symbol:"M",bio:"Un joven sensible que se une a Mario en la búsqueda de las Estrellas. Sus habilidades mágicas permiten atacar a varios enemigos."},
  {id:"captain-toad",name:"Capitán Toad",role:"ally",roleLabel:"ALIADO · EXPLORADOR",first:"Super Mario Galaxy",year:2007,color:"#bc954b",symbol:"CT",bio:"Líder de la Brigada Toad, explora lugares peligrosos en busca de tesoros. Su mochila le impide saltar, así que debe resolver los escenarios con ingenio."},
  {id:"e-gadd",name:"Profesor E. Gadd",role:"ally",roleLabel:"ALIADO · INVENTOR",first:"Luigi's Mansion",year:2001,color:"#85a77d",symbol:"E",bio:"Un científico excéntrico que inventa herramientas como la Succionaentes para ayudar a Luigi a capturar fantasmas."},
  {id:"cappy",name:"Cappy",role:"ally",roleLabel:"ALIADO · GORRA VIVIENTE",first:"Super Mario Odyssey",year:2017,color:"#df5147",symbol:"C",bio:"Un ser del Reino Sombrero que acompaña a Mario en Odyssey. Le permite capturar enemigos, objetos y criaturas para utilizar sus habilidades."},
  {id:"kamek",name:"Kamek",role:"villain",roleLabel:"VILLANO · MAGIKOOPA",first:"Super Mario World 2: Yoshi's Island",year:1995,color:"#658bc2",symbol:"K",bio:"Un poderoso Magikoopa que sirve a Bowser y suele utilizar magia para alterar el tamaño, la forma y las condiciones de sus enemigos."},
  {id:"king-boo",name:"Rey Boo",role:"villain",roleLabel:"VILLANO · REY DE LOS FANTASMAS",first:"Luigi's Mansion",year:2001,color:"#aaa1d8",symbol:"B",portrait:portraits.boo,bio:"El gobernante de los Boos es el enemigo recurrente de Luigi en la saga Luigi's Mansion. Utiliza ilusiones y poderes fantasmales."},
  {id:"boo",name:"Boo",role:"enemy",roleLabel:"ENEMIGO · FANTASMA",first:"Super Mario Bros. 3",year:1988,color:"#c5b8e0",symbol:"B",portrait:portraits.boo,bio:"Un fantasma tímido que se acerca cuando no lo miran y se detiene al quedar observado. Aparece en castillos, mansiones y niveles oscuros."},
  {id:"goomba",name:"Goomba",role:"enemy",roleLabel:"ENEMIGO · ESPECIE",first:"Super Mario Bros.",year:1985,color:"#a77953",symbol:"G",bio:"Uno de los enemigos más reconocibles de la franquicia. Camina hacia Mario y suele ser derrotado con un salto sobre su cabeza."},
  {id:"koopa-troopa",name:"Koopa Troopa",role:"enemy",roleLabel:"ENEMIGO · KOOPA",first:"Super Mario Bros.",year:1985,color:"#76a75b",symbol:"K",bio:"Una tortuga del ejército de Bowser. Al saltar sobre ella queda su caparazón, que puede deslizarse y golpear a otros enemigos."},
  {id:"piranha-plant",name:"Planta Piraña",role:"enemy",roleLabel:"ENEMIGO · PLANTA",first:"Super Mario Bros.",year:1985,color:"#65a55d",symbol:"P",bio:"Una planta carnívora que suele salir de las tuberías. Sus variantes aparecen en casi todas las regiones del universo Mario."},
  {id:"lakitu",name:"Lakitu",role:"enemy",roleLabel:"ENEMIGO · KOOPA VOLADOR",first:"Super Mario Bros.",year:1985,color:"#e3ad43",symbol:"L",bio:"Un Koopa que viaja sobre una nube y arroja Spinies. En otras entregas también actúa como cámara, juez o ayudante."},
  {id:"shy-guy",name:"Shy Guy",role:"enemy",roleLabel:"ENEMIGO · CRIATURA ENMASCARADA",first:"Yume Kōjō: Doki Doki Panic",year:1987,color:"#d65a4a",symbol:"S",bio:"Una criatura enmascarada que puede aparecer con diferentes colores y trabajos. Debutó en Doki Doki Panic y se volvió un recurrente del universo Mario."},
  {id:"bob-omb",name:"Bob-omb",role:"enemy",roleLabel:"ENEMIGO · EXPLOSIVO",first:"Yume Kōjō: Doki Doki Panic",year:1987,color:"#53718d",symbol:"B",bio:"Una bomba con piernas y una mecha que se activa al recibir un golpe. Puede convertirse en un peligro o en una herramienta para abrir caminos."},
  {id:"dry-bones",name:"Huesitos",role:"enemy",roleLabel:"ENEMIGO · KOOPA ESQUELÉTICO",first:"Super Mario Bros. 3",year:1988,color:"#c2bdab",symbol:"D",bio:"Un Koopa esquelético que se recompone después de ser derribado. Es habitual en fortalezas y escenarios embrujados."},
  {id:"chain-chomp",name:"Chomp Cadenas",role:"enemy",roleLabel:"ENEMIGO · BESTIA ENCADENADA",first:"Super Mario Bros. 3",year:1988,color:"#758191",symbol:"C",bio:"Una criatura con forma de bola dentada que intenta lanzarse sobre Mario desde el extremo de una cadena."},
  {id:"hammer-bro",name:"Hermano Martillo",role:"enemy",roleLabel:"ENEMIGO · KOOPA SOLDADO",first:"Super Mario Bros.",year:1985,color:"#7da269",symbol:"H",bio:"Un Koopa soldado que lanza martillos en arcos rápidos. Es uno de los miembros más peligrosos de la tropa de Bowser."},
  {id:"monty-mole",name:"Topo Monty",role:"enemy",roleLabel:"ENEMIGO · TOPO",first:"Super Mario World",year:1990,color:"#9b785a",symbol:"M",bio:"Un topo que emerge del suelo o las paredes para sorprender al jugador. En algunos juegos también aparece en carreras y minijuegos."},
  {id:"petey-piranha",name:"Floro Piraña",role:"villain",roleLabel:"VILLANO · JEFE",first:"Super Mario Sunshine",year:2002,color:"#78a35e",symbol:"P",bio:"Una enorme Planta Piraña con brazos, alas y una personalidad feroz. Debutó como uno de los jefes de Isla Delfino."},
  {id:"nabbit",name:"Nabbit",role:"rival",roleLabel:"RIVAL · LADRÓN",first:"New Super Luigi U",year:2013,color:"#9d7ac5",symbol:"N",bio:"Un ladrón veloz que roba objetos y escapa por los niveles. En algunos juegos puede ser seleccionado como personaje jugable."},
  {id:"wart",name:"Wart",role:"villain",roleLabel:"VILLANO · REY DE SUBCON",first:"Yume Kōjō: Doki Doki Panic",year:1987,color:"#6b9e83",symbol:"W",bio:"El antagonista principal del mundo de los sueños Subcon. Fue trasladado a Super Mario Bros. 2 cuando Doki Doki Panic se adaptó al universo Mario."},
  {id:"tatanga",name:"Tatanga",role:"villain",roleLabel:"VILLANO · INVASOR ESPACIAL",first:"Super Mario Land",year:1989,color:"#8a7bb5",symbol:"T",bio:"Un alienígena que invade Sarasaland y secuestra a la princesa Daisy. Regresa como enemigo en Super Mario Land 2."},
  {id:"larry",name:"Larry Koopa",role:"villain",roleLabel:"KOOPALING",first:"Super Mario Bros. 3",year:1988,color:"#65a8a1",symbol:"L",bio:"El menor de los Koopalings, conocido por su cabello azul y su carácter impulsivo. Forma parte del grupo de hijos adoptivos de Bowser en los juegos clásicos."},
  {id:"morton",name:"Morton Koopa Jr.",role:"villain",roleLabel:"KOOPALING",first:"Super Mario Bros. 3",year:1988,color:"#8d8b82",symbol:"M",bio:"El Koopaling de gran tamaño y voz potente. Suele atacar con fuerza física y su característico martillo."},
  {id:"wendy",name:"Wendy O. Koopa",role:"villain",roleLabel:"KOOPALING",first:"Super Mario Bros. 3",year:1988,color:"#df8bb1",symbol:"W",bio:"La única Koopaling mujer, reconocible por sus lazos y pulseras. Sus ataques suelen apoyarse en anillos mágicos."},
  {id:"iggy",name:"Iggy Koopa",role:"villain",roleLabel:"KOOPALING",first:"Super Mario Bros. 3",year:1988,color:"#78a35d",symbol:"I",bio:"Un Koopaling de aspecto excéntrico y comportamiento impredecible. Es conocido por sus gafas y su risa característica."},
  {id:"roy",name:"Roy Koopa",role:"villain",roleLabel:"KOOPALING",first:"Super Mario Bros. 3",year:1988,color:"#b77a9d",symbol:"R",bio:"Uno de los Koopalings más robustos, con gafas rosadas y una actitud desafiante."},
  {id:"lemmy",name:"Lemmy Koopa",role:"villain",roleLabel:"KOOPALING",first:"Super Mario Bros. 3",year:1988,color:"#e1b84a",symbol:"L",bio:"El más pequeño de los Koopalings, famoso por su equilibrio sobre una pelota de colores."},
  {id:"ludwig",name:"Ludwig von Koopa",role:"villain",roleLabel:"KOOPALING",first:"Super Mario Bros. 3",year:1988,color:"#6687b6",symbol:"L",bio:"El mayor de los Koopalings y uno de los más orgullosos. Sus ataques suelen incluir movimientos rápidos y magia."},
  {id:"boom-boom",name:"Boom Boom",role:"villain",roleLabel:"VILLANO · JEFE",first:"Super Mario Bros. 3",year:1988,color:"#bc8654",symbol:"BB",bio:"Un poderoso enemigo recurrente que aparece como jefe de fortalezas en distintas entregas de plataformas."},
  {id:"king-k-rool",name:"King K. Rool",role:"villain",roleLabel:"VILLANO · REY DE LOS KREMLINGS",first:"Donkey Kong Country",year:1994,color:"#6ba18a",symbol:"K",bio:"El archienemigo de Donkey Kong y líder de los Kremlings. Su objetivo recurrente es robar el tesoro de bananas de los Kong."},
  {id:"cranky-kong",name:"Cranky Kong",role:"ally",roleLabel:"ALIADO · KONG ORIGINAL",first:"Donkey Kong Country",year:1994,color:"#a47b56",symbol:"CK",bio:"El Kong gruñón que aconseja a los protagonistas. Se presenta como el Donkey Kong original del arcade de 1981."},
  {id:"dixie-kong",name:"Dixie Kong",role:"ally",roleLabel:"ALIADA · KONG",first:"Donkey Kong Country 2: Diddy's Kong Quest",year:1995,color:"#d67c94",symbol:"DK",bio:"Una Kong ágil cuyo cabello funciona como hélice para planear. Es protagonista junto a Diddy en varias aventuras."},
  {id:"poochy",name:"Poochy",role:"ally",roleLabel:"ALIADO · COMPAÑERO DE YOSHI",first:"Super Mario World 2: Yoshi's Island",year:1995,color:"#c5a7a2",symbol:"P",bio:"Un perro amistoso que ayuda a Yoshi a cruzar peligros y encontrar rutas seguras. Es uno de los aliados más queridos de esa saga."},
  {id:"genie",name:"Capitán Sirope",role:"villain",roleLabel:"VILLANA · PIRATA",first:"Wario Land: Super Mario Land 3",year:1994,color:"#a77d5d",symbol:"S",bio:"La capitana de los piratas Brown Sugar, rival de Wario en sus primeras aventuras de búsqueda de tesoros."},
  {id:"cackletta",name:"Cackletta",role:"villain",roleLabel:"VILLANA · HECHICERA",first:"Mario & Luigi: Superstar Saga",year:2003,color:"#a27ec8",symbol:"C",bio:"Una hechicera del Reino de los Frijoles que roba la voz de Peach para sus propios planes. Es la antagonista principal de Superstar Saga."},
  {id:"fawful",name:"Fawful",role:"villain",roleLabel:"VILLANO · ASISTENTE DE CACKLETTA",first:"Mario & Luigi: Superstar Saga",year:2003,color:"#7da85a",symbol:"F",bio:"Un villano excéntrico de frases extravagantes y energía caótica. Evoluciona de asistente a amenaza central en la saga Mario & Luigi."},
  {id:"count-bleck",name:"Count Bleck",role:"villain",roleLabel:"VILLANO · ANTAGONISTA",first:"Super Paper Mario",year:2007,color:"#555b94",symbol:"CB",bio:"Un conde que busca crear el Corazón del Caos para provocar el fin de todos los mundos. Su historia combina tragedia y humor."},
  {id:"dimentio",name:"Dimentio",role:"villain",roleLabel:"VILLANO · BUFÓN",first:"Super Paper Mario",year:2007,color:"#c49b50",symbol:"D",bio:"Un bufón misterioso que manipula a los demás desde las sombras. Es uno de los antagonistas más impredecibles de Paper Mario."},
  {id:"olivia",name:"Olivia",role:"ally",roleLabel:"ALIADA · ORIGAMI",first:"Paper Mario: The Origami King",year:2020,color:"#e5b88c",symbol:"O",bio:"Una figura de origami que acompaña a Mario para detener los planes de su hermano, el rey Olly."},
  {id:"king-olly",name:"Rey Olly",role:"villain",roleLabel:"VILLANO · REY DEL ORIGAMI",first:"Paper Mario: The Origami King",year:2020,color:"#7c8db5",symbol:"O",bio:"El antagonista de The Origami King, decidido a plegar el Reino Champiñón a su manera y transformar a sus habitantes."},
  {id:"stella",name:"Stella",role:"ally",roleLabel:"ALIADA · GUARDIANA DEL TEATRO",first:"Princess Peach: Showtime!",year:2024,color:"#dfba6e",symbol:"S",bio:"Una cinta mágica que acompaña a Peach en el Teatro Esplendor y le permite transformarse para asumir diferentes papeles."},
  {id:"toadsworth",name:"Toadsworth",role:"ally",roleLabel:"ALIADO · MAYORDOMO",first:"Super Mario Sunshine",year:2002,color:"#d0b26e",symbol:"T",bio:"El mayordomo de Peach, de bigote blanco y gran experiencia. Acompaña a la princesa en varias aventuras."}
];

const seriesNames = {platform:"PLATAFORMAS",kart:"KART",party:"PARTY",rpg:"RPG",sports:"DEPORTES",other:"OTROS"};
const roleNames = {hero:"HÉROE",ally:"ALIADO",rival:"RIVAL",villain:"VILLANO",enemy:"ENEMIGO"};
const gameGrid = document.getElementById("games-grid");
const gameSearch = document.getElementById("game-search");
const gameCount = document.getElementById("games-count");
const gamesEmpty = document.getElementById("games-empty");
const characterGrid = document.getElementById("character-grid");
const characterSearch = document.getElementById("character-search");
const characterCount = document.getElementById("characters-count");
const charactersEmpty = document.getElementById("characters-empty");
const gameDialog = document.getElementById("game-dialog");
let activeGameFilter = "all";
let activeCharacterFilter = "all";
let activeCharacterId = "mario";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  })[character]);
}

function gameCard(game) {
  const title = escapeHTML(game.title);
  const long = game.title.length > 22 ? " long" : "";
  const art = game.art && portraits[game.art] ? `<img class="cover-figure" src="${portraits[game.art]}" alt="" loading="lazy" decoding="async">` : "";
  return `
    <button class="game-card" type="button" data-game-id="${game.id}" aria-label="Ver información de ${title}">
      <div class="game-cover" style="--game-a:${game.colors[0]};--game-b:${game.colors[1]}">
        <div class="cover-top"><span>MI / ${String(game.year).slice(2)}</span><span>${escapeHTML(game.label)}</span></div>
        <span class="cover-number">${String(game.year).slice(2)}</span>
        <span class="cover-mark">${escapeHTML(game.symbol)}</span>
        ${art}
        <div class="cover-title${long}">${title}</div>
        <div class="cover-platform">${escapeHTML(game.platform)}</div>
      </div>
      <div class="game-info">
        <div class="game-info-top"><span>${seriesNames[game.series]}</span><span>${game.year}</span></div>
        <h3>${title}</h3>
        <div class="game-info-bottom"><span>${escapeHTML(game.platform)}</span><b>↗</b></div>
      </div>
    </button>`;
}

function filteredGames() {
  const query = gameSearch.value.trim().toLocaleLowerCase("es");
  let list = games.filter((game) => {
    const matchesFilter = activeGameFilter === "all" || game.series === activeGameFilter;
    const haystack = `${game.title} ${game.platform} ${game.year} ${seriesNames[game.series]}`.toLocaleLowerCase("es");
    return matchesFilter && (!query || haystack.includes(query));
  });
  const sort = document.getElementById("game-sort").value;
  if (sort === "oldest") list.sort((a,b) => a.year - b.year || a.title.localeCompare(b.title));
  else if (sort === "az") list.sort((a,b) => a.title.localeCompare(b.title));
  else list.sort((a,b) => b.year - a.year || a.title.localeCompare(b.title));
  return list;
}

function renderGames() {
  const list = filteredGames();
  gameGrid.innerHTML = list.map(gameCard).join("");
  gameCount.textContent = `${String(list.length).padStart(2,"0")} DE ${String(games.length).padStart(2,"0")} JUEGOS ENCONTRADOS`;
  gamesEmpty.hidden = list.length > 0;
  document.getElementById("archive-game-total").textContent = String(games.length).padStart(2,"0");
}

function characterOption(character, index) {
  const portrait = character.portrait
    ? `<img src="${character.portrait}" alt="" loading="lazy" decoding="async" onerror="this.remove()">`
    : `<span class="character-thumb-fallback">${escapeHTML(character.symbol)}</span>`;
  const selected = character.id === activeCharacterId;
  return `
    <button class="character-option${selected ? " is-selected" : ""}" type="button" data-character-id="${character.id}" aria-pressed="${selected}" aria-label="Ver ficha de ${escapeHTML(character.name)}" style="--character-color:${character.color}">
      <span class="character-thumb">${portrait}</span>
      <span class="character-option-name">${escapeHTML(character.name)}</span>
      <span class="character-option-type">${roleNames[character.role]}</span>
    </button>`;
}

function filteredCharacters() {
  const query = characterSearch.value.trim().toLocaleLowerCase("es");
  return characters.filter((character) => {
    const matchesFilter = activeCharacterFilter === "all" || character.role === activeCharacterFilter;
    const haystack = `${character.name} ${character.roleLabel} ${character.first}`.toLocaleLowerCase("es");
    return matchesFilter && (!query || haystack.includes(query));
  });
}

function renderCharacters() {
  const list = filteredCharacters();
  characterGrid.innerHTML = list.map((character) => characterOption(character)).join("");
  characterCount.textContent = `${String(list.length).padStart(2,"0")} PERSONAJES`;
  charactersEmpty.hidden = list.length > 0;
  document.getElementById("archive-character-total").textContent = String(characters.length).padStart(2,"0");
}

function selectCharacter(id) {
  const character = characters.find((item) => item.id === id);
  if (!character) return;
  activeCharacterId = id;
  const image = document.getElementById("profile-image");
  const initials = document.getElementById("profile-initials");
  document.getElementById("profile-number").textContent = `N.º ${String(characters.indexOf(character) + 1).padStart(3,"0")}`;
  document.getElementById("profile-role").textContent = character.roleLabel;
  document.getElementById("profile-name").textContent = character.name;
  document.getElementById("profile-bio").textContent = character.bio;
  document.getElementById("profile-debut").textContent = character.first;
  document.getElementById("profile-year").textContent = character.year;
  document.querySelector(".profile-art").style.setProperty("--profile-color", character.color);
  initials.textContent = character.symbol;
  initials.style.color = character.color;
  if (character.portrait) {
    image.onerror = () => { image.hidden = true; initials.hidden = false; };
    image.onload = () => { image.hidden = false; initials.hidden = true; };
    image.src = character.portrait;
    image.alt = character.name;
    image.hidden = false;
    initials.hidden = true;
  } else {
    image.hidden = true;
    image.removeAttribute("src");
    initials.hidden = false;
  }
  renderCharacters();
}

function openGame(id) {
  const game = games.find((item) => item.id === id);
  if (!game) return;
  const art = document.getElementById("dialog-game-art");
  art.style.setProperty("--game-a",game.colors[0]);
  art.style.setProperty("--game-b",game.colors[1]);
  document.getElementById("dialog-game-year").textContent = game.year;
  document.getElementById("dialog-game-symbol").textContent = game.symbol;
  document.getElementById("dialog-game-title").textContent = game.title;
  document.getElementById("dialog-game-description").textContent = game.description;
  document.getElementById("dialog-game-platform").textContent = game.platform;
  document.getElementById("dialog-game-series").textContent = seriesNames[game.series];
  if (typeof gameDialog.showModal === "function") gameDialog.showModal();
  else gameDialog.setAttribute("open","");
}

document.getElementById("game-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeGameFilter = button.dataset.filter;
  document.querySelectorAll("#game-filters .filter-chip").forEach((item) => {
    const selected = item === button;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  renderGames();
});

document.getElementById("character-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeCharacterFilter = button.dataset.filter;
  document.querySelectorAll("#character-filters .filter-chip").forEach((item) => {
    const selected = item === button;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  renderCharacters();
});

gameSearch.addEventListener("input", renderGames);
characterSearch.addEventListener("input", renderCharacters);
document.getElementById("game-sort").addEventListener("change", renderGames);
document.getElementById("clear-game-search").addEventListener("click", () => {
  gameSearch.value = "";
  activeGameFilter = "all";
  document.querySelectorAll("#game-filters .filter-chip").forEach((item) => {
    const selected = item.dataset.filter === "all";
    item.classList.toggle("is-active",selected);
    item.setAttribute("aria-pressed",String(selected));
  });
  renderGames();
  gameSearch.focus();
});

gameGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-game-id]");
  if (card) openGame(card.dataset.gameId);
});
characterGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-character-id]");
  if (button) selectCharacter(button.dataset.characterId);
});

document.getElementById("menu-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded",String(!expanded));
  button.setAttribute("aria-label",expanded ? "Abrir menú" : "Cerrar menú");
  document.getElementById("main-nav").classList.toggle("is-open",!expanded);
});
document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click",() => {
    document.getElementById("menu-toggle").setAttribute("aria-expanded","false");
    document.getElementById("menu-toggle").setAttribute("aria-label","Abrir menú");
    document.getElementById("main-nav").classList.remove("is-open");
  });
});
document.addEventListener("keydown",(event) => {
  if (event.key === "/" && !["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    (window.scrollY < document.getElementById("personajes").offsetTop - 150 ? gameSearch : characterSearch).focus();
  }
});
gameDialog.addEventListener("click",(event) => {
  if (event.target === gameDialog) gameDialog.close();
});
document.getElementById("current-year").textContent = new Date().getFullYear();

renderGames();
renderCharacters();
selectCharacter("mario");
