// =============================================================
// constants.js - reconstruído e validado
// =============================================================

// ----------------------
// Conjunto de caracteres
// ----------------------

// Símbolos básicos e pontuação
const SYMBOLS = [
  '~','!','@','#','%','^','&','(',')','=','+','"',"'",',','‚','.','/',';',':',
  '<','‹','›','>','?','[',']','`','{','}','|','}','€','ƒ','„','…','†','‡','‰',
  '‘','’','Š','Œ','Ž','“','”','•','™','š','œ','ž','¡','¢','£','¤','¥','§',
  '©','®','ª','«','»','¹','º','¸','·','¶','¼','½','¾','²','³','´','±','°',
  '¯','ˆ','Ÿ','¬','µ','×','÷','$','*','–','_'
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
  // preencha se quiser censura — deixo vazio para evitar bloqueio excessivo
];

// ----------------------
// Símbolos decorativos
// ----------------------
const DECORATIVE_SYMBOLS = [
  '~','•','†','×','÷','°','¤','§','★','☆','♦','♠','♣','♥','☯','☢','☠','⚡','🔥','🌙','❄','⚔'
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
