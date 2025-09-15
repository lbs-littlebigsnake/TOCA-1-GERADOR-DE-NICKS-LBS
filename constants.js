// =============================================================
// constants.js - reconstruído e validado
// =============================================================

// ----------------------
// Conjunto de caracteres
// ----------------------

// Símbolos básicos e pontuação
const SYMBOLS = [
  '$','*','–','_',' ',
];

// Dígitos 0-9
const DIGITS = Array.from({length:10}, (_,i) => String(i));

// Letras ASCII A-Z e a-z
const UPPER = Array.from({length:26}, (_,i) => String.fromCharCode(65 + i));
const LOWER = Array.from({length:26}, (_,i) => String.fromCharCode(97 + i));

// Acentos latinos estendidos
const LATIN_ACCENTS = "ÀÁÂÃÄÅÆÇÐÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝŸàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿ".split('');

// Alfabeto cirílico (0x0400 a 0x04FF)
const CYRILLIC = Array.from({length: 0x04FF - 0x0400 + 1}, (_,i) => String.fromCharCode(0x0400 + i));

// Conjunto final permitido
const ALLOWED_CHARS = [
  ...SYMBOLS,
  ...DIGITS,
  ...UPPER,
  ...LOWER,
  ...LATIN_ACCENTS,
  ...CYRILLIC
];

// ----------------------
// Variações de caracteres
// ----------------------
const CHAR_VARIATIONS = {
  a: ['a','A','@','4','α','а'], // inclui cirílico "а"
  b: ['b','B','8','ß','в'],
  c: ['c','C','<','¢','с'],
  d: ['d','D','ԁ'],
  e: ['e','E','3','€','е'],
  f: ['f','F','ƒ'],
  g: ['g','G','9'],
  h: ['h','H','н'],
  i: ['i','I','1','!','|','і'],
  j: ['j','J'],
  k: ['k','K','κ','к'],
  l: ['l','L','1','|'],
  m: ['m','M','м'],
  n: ['n','N','η','п'],
  o: ['o','O','0','°','ο','о'],
  p: ['p','P','ρ','р'],
  q: ['q','Q'],
  r: ['r','R','®','г'],
  s: ['s','S','5','$','§'],
  t: ['t','T','7','+','т'],
  u: ['u','U','υ'],
  v: ['v','V','ν'],
  w: ['w','W','ш','ω'],
  x: ['x','X','×','χ','х'],
  y: ['y','Y','¥','у'],
  z: ['z','Z','2','ž','з']
};
// ----------------------
// Palavras ofensivas (bloqueio)
// ----------------------
const OFFENSIVE_WORDS = [
  'ass','fuck','shit','dick','cock','pussy','bitch','whore','slut',
  'fag','gay','nigga','cum','porn','nazi','uicide','puta','caralho','buceta',
];

// ----------------------
// Ideias iniciais de nicks
// ----------------------
const NICK_IDEAS = [
  'Shadow','Viper','Neo','Nova','Specter','Rogue','Drift',
  'Blaze','Frost','Pulse','Storm','Venom','Echo','Phantom','Night'
  'Fxck7','KingZ','OP9','dz9','zeroone','xSlayer','Vxper','Nxght','RushX','Blitz7',
  'Zer0n3','K1ngBR','Vxpra','Sn1p3r','D3adOP','L3th4lZ','V1p3rX','K1llzR','R4z0rX','Gh0stZ',
  'Bl4ckZ','Dr4g0n7','W1ldZ','F1nalX','H1tman9','S1lentZ','Cru5hX','Z3n1th7','V01dOP','Ax10mZ',
  'zeronine','onexone','killall','headup','gogogo','nowayz','nomercy','bigboss','topgunz','fastx',
  'elitez','pureop','godmod','soloq','winall','lastone','finalx','firstz','hardop','rushin',
  'TrajadoXX','Real7','Anjinho','TralhaXzk','FuriaBR','FerozZ','Maluko','Carrasco','FenixBR','TigreZ',
  'FuriaOP','Cruzado','FalcãoX','BraboKK','Trovão7','FuriaZK','Raivoso','TigreOP','MalvadoZ','FenixOP',
  'BraboReal','FuriaSLR','AnjoNegro','ReiDoGame','FuriaKZ','TrovãoOP','Maluko7','CarrascoX','FenixZK','BraboZK',
  'FuriaGod','AnjoOP','ReiGameZ','FuriaXZ','TrovãoSL','MalukoOP','CarrascoZ','FenixKZ','BraboSLR','GokuX',
  'LuffyZ','Naruto7','SasukeOP','ItachiX','GojoSLR','Tanjiro9','ZenitsuZ','LeviBR','ErenOP','MikasaX',
  'Kakashi7','MadaraZ','ObitoSL','SaitamaX','KilluaZ','GonOP','Hisoka9','LelouchX','SpikeSLR','VashZ',
  'Alucard7','EdwardX','RoyOP','GutsBR','GriffithZ','JotaroX','DioSLR','GiornoOP','YatoBR','GokuOP',
  'LufZ','Naru7','SasuX','ItaOP','Gojo7','TanjiZ','Zeni9','LeviX','ErenZ','MikaX',
  'Kaka7','MadaZ','ObiSL','SaitaX','KillZ','GonX','HisokaX','LeloOP','SpikeZ','VashOP',
  'Alu7','EdX','RoyZ','GutsX','GriffZ','JotaX','DioOP','GiorZ','YatoX','GojoGod',
  'SasukeZ','ItachiSL','MadaraOP','DioKING','GojoXZ','LuffyOP','GokuSLR','ErenZK','LeviBR7','SpikeOP',
  'GutsXZ','RoyFlame','EdAlchZ','YatoMerc','TanjiBlade','HisokaCR','LelouchZ','ZenitsuOP','KilluaXZ','ViperX',
  'ShadowOP','RushKing','ToxicZ','FatalX','GhostZ','BlitzOP','WipeX','AceSlayer','EliteZ','ChaosX',
  'RampageZ','NoMercyX','LethalOP','SnipeGod','BoomHead','DeadlyZ','FinalBoss','AlphaSlr','ZigZagOP','CrushTail',
  'EatAll','BigMaw','BossSnek','TopCoil','GobbleR','HungryAF','WiggleW','TinyBite','YumYumGo','PinkCoil',
  'BlueFang','Rainbowz','NeonSnek','GlitchSlr','PixelTail','ZappyZ','GlowWorm','Sparklz','BriteCoil',
  'Snek7','Coil42','FangX9','Slith3r','Vip3r0','Eatr100','ZigZ4g','W0rmKing','B1gMaw','N0Mercy',
  'Macetador','CagãoReal','ZéRuela','CaraioKKK','FazFavor','TáZuado','NoisÉTop','TretaMaster','VaiTomarN','ChupaCuBR',
  'KKKKKKKK','MandaNude','CagaPau','PqpMano','ChoraNenem','FazLenda','TretaNoob','PicaDasGal','VaiSeFud','KKKKKKKKK',
  'Macetador7','CagaPau99','ZéRuelaX','Caraio420','TretaOP69','NoisTopKK','FazLenda7','PqpMano13','ChoraBB9','VsfNoobz',
  'KKKMaster','MandaFoto','CagaoReal','TretaKing','ZueiraBR','NoobChora','PicaPauBR','KKKKKK123','VaiSeFudr','TretaSlr',
  'MacetaHead','CagaSnipe','ZéKillr','CaraioOP','TretaShot','NoisSnipe','VsfSlayer','ChoraKill','FazHead7','PqpSniper',
  'KKKGodBR','TomaNoob','CagaBoss','AiMeuDeus','MeChupaOP','TretaGod','CagaRush','KKKSlayer','VsfHeadz','NoisWipe',
  'BaianoTreta','PaulistaOP','CariocaZua','Mineirinho','NordestSlr','Gauchinho','CearenseKK','BaianoCaga','Pernambuc','CapixabaX',
  'Sertanejo','Manauara','BrasiliaOP','CuritibaZ','RecifeNoob','SalvadorBR','Fortaleza','GoianoTreta','Nortista','SulistaKK',
  'CoilGod','SnekRush','SlithOP','FangX','HissLord','ViperZ','Scalez','Coil9','TailCrush','ZigZagX',
  'SnekOP','CoilSlayer','VenomR','RattleZ','WrmGod7','SnekK1ng','CoilDash','FangSlr','HissOP','ZigOP9',
  'UnicrnX','GalaxyZ','DragnOP','NeonSlr','Goldn9','ShdwKng','CandyZ','LavaGod','IceFang','NinjaXZ',
  'Rainbow7','FlameCoil','PixelWrm','ToxicSkin','MechaSnek','AuroraOP','VoidWorm','StellarZ','Glitch99','DragonX',
  'Morena','Dopamina','Chucro','K9','Feijao','Pernilong','Tartaruga','Aura','Bruto','Cafune',
  'Pipoca','Chinelo','Biscoito','Panela','Chaveiro','Canguru','Lanche','Preguica','Chuchu','Cuzcuz',
  'Gibi','Balaclava','Pirulito','Coxinha','Siri','Lagartixa','Tapioca','Banheira','Chimarrao','Fuba',
  'Caramelo','Pamonha','Galinha','Cuca','Pirata','Carrinho','Tenis','Chapeu','Manteiga','Cenoura',
  'Lixeira','Bexiga','Cafeteira','Pregador','Chuveiro','Abajur','Colher','Prego','Lousa','Cebola'
];

// ----------------------
// Configurações globais
// ----------------------
const CONFIG = {
  MIN_NICK_LENGTH: 3,
  MAX_NICK_LENGTH: 12,
  MAX_VARIATIONS: 10,
  IDEAS_COUNT: 5,
  ANIMATION_DELAY: 300,
  PARTICLE_INTERVAL: 900,
  CELEBRATION_THRESHOLD: 300
};

// ----------------------
// Restrições
// ----------------------
// Regex: nick não pode começar com número ou pontuação
const INVALID_START_CHARS = /^[0-9~!@#%^&$()=+\-"'.,\/:;<\[\]{}|`\\]/;
