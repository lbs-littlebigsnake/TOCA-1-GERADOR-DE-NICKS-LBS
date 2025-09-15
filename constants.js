// =============================================================
// constants.js - reconstruído e validado
// =============================================================

// ----------------------
// Conjunto de caracteres
// ----------------------

// Símbolos básicos e pontuação
const SYMBOLS = [
  '$','*','–','_','ß','Ð','Þ'
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
  a: ['д','A','Д','4'],
  b: ['Б','б','В','в','ß','Ы','Ъ','ъ','Ь','ь'],
  c: ['C','Č','č','Ć','ć','Ç','ç'],
  d: ['d','D','Ð','ð'],
  e: ['З','E','3','Э','э','з','Ë','Ē','ę','Ę','ë','ė'],
  f: ['F'],
  g: ['Б','6','G','9'],
  h: ['H','н'],
  i: ['I','ï','î','Ï','Į','Ī','Î','1','Ì','Í','į'],
  j: ['J'],
  k: ['K','к'],
  l: ['l','L','1'],
  m: ['M','м'],
  n: ['N','П','п','Л','л'],
  o: ['ø','O','0','ö','Ö','Ø','Ф','ф','Ю','ю'],
  p: ['P','Þ'],
  q: ['Q'],
  r: ['R','Я','я','г','Г'],
  s: ['S','5','$'],
  t: ['T','7','т'],
  u: ['U','ü','Ü','Û','û','ū','Ū','Ц','ц'],
  v: ['V'],
  w: ['W','Ш','ш','Щ','щ'],
  x: ['X','Ж','ж'],
  y: ['Y','Ч','ч'],
  z: ['Z','2']
};

// ----------------------
// Palavras ofensivas (bloqueio)
// ----------------------
const OFFENSIVE_WORDS = [
  // preencha se quiser censura — deixo vazio para evitar bloqueio excessivo
];

// ----------------------
// Símbolos decorativos
// ----------------------
const DECORATIVE_SYMBOLS = [
  '$','*','–','_','Ф','ф','Ж','ж'
];  

// ----------------------
// Ideias iniciais de nicks
// ----------------------
const NICK_IDEAS = [
  'Shadow','Viper','Neo','Nova','Specter','Rogue','Drift',
  'Blaze','Frost','Pulse','Storm','Venom','Echo','Phantom','Night'
];

// ----------------------
// Configurações globais
// ----------------------
const CONFIG = {
  MIN_NICK_LENGTH: 3,
  MAX_NICK_LENGTH: 12,
  MAX_VARIATIONS: 10,
  IDEAS_COUNT: 5,
  ANIMATION_DELAY: 100,
  PARTICLE_INTERVAL: 300,
  CELEBRATION_THRESHOLD: 100
};

// ----------------------
// Restrições
// ----------------------
// Regex: nick não pode começar com número ou pontuação
const INVALID_START_CHARS = /^[0-9~!@#%^&()=+\-"'.,\/:;<\[\]{}|`\\]/;
