// Caracteres permitidos no Little Big Snake
const allowedChars = [
    '~','!','@','#','%','^','&','(',')','=','+','"',''',',','‚','.','/',':',';','<','‹','›','>','?','[',']','`','{','|','}','€','ƒ','„','…','†','‡','‰',''','Š','Œ','Ž','"','"','•','™','š','œ','ž',
    '¡','¢','£','¤','¥','§','©','®','ª','«','»','¹','º','¸','·','¶','¼','½','¾','²','³','´','±','°','¯','ˆ','Ÿ','¬','µ','×','÷',
    '$','*','–','_',' ',
    '0','1','2','3','4','5','6','7','8','9',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'À','Á','Â','Ã','Ä','Å','Æ','Ç','Ð','È','É','Ê','Ë','Ì','Í','Î','Ï','Ñ','Ò','Ó','Ô','Õ','Ö','Ø','Ù','Ú','Û','Ü','Ý','Ÿ',
    'à','á','â','ã','ä','å','æ','ç','ð','è','é','ê','ë','ì','í','î','ï','ñ','ò','ó','ô','õ','ö','ø','ù','ú','û','ü','ý','ÿ',
    'А','а','Б','б','В','в','Г','г','Д','д','Ж','ж','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н','О','о','П','п',
    'Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ч','ч','Ш','ш','Щ','щ','Ъ','ъ','Ы','ы','Ь','ь','Э','э','Ю','ю','Я','я',
    'Ў','Є','І','Ѣ','Ѥ','Ѫ','Ѭ','Ѧ','Ѩ','Ѯ','Ѱ','Ѳ','Ѵ','Ҁ'
];

// Mapeamento de caracteres
const charVariations = {
    'a': ['а', 'ą', 'ä', 'å', 'à', 'á', 'â', 'ã', 'Д', 'Λ'],
    'A': ['А', 'Ą', 'Ä', 'Å', 'À', 'Á', 'Â', 'Ã', 'Д', 'Λ'],
    'b': ['Ъ', 'ь', 'Б', 'ß', 'в'],
    'B': ['В', 'Б', 'ß', 'Ъ', 'Ь'],
    'c': ['с', 'ç', '¢', 'ć', 'č', 'С'],
    'C': ['С', 'Ç', '¢', 'Ć', 'Č'],
    'd': ['д', 'ð', 'đ', 'ď'],
    'D': ['Д', 'Ð', 'Đ', 'Ď'],
    'e': ['е', 'є', 'ё', 'è', 'é', 'ê', 'ë', 'ę', 'ě', 'Є'],
    'E': ['Е', 'Є', 'Ё', 'È', 'É', 'Ê', 'Ë', 'Ę', 'Ě'],
    'f': ['ф', 'ƒ'],
    'F': ['Ф', 'ƒ'],
    'g': ['г', 'ğ', 'ģ'],
    'G': ['Г', 'Ğ', 'Ģ'],
    'h': ['н', 'ħ', 'ђ'],
    'H': ['Н', 'Ħ', 'Ђ'],
    'i': ['і', 'ï', 'í', 'ì', 'î', 'ı', 'į', 'ī'],
    'I': ['І', 'Ï', 'Í', 'Ì', 'Î', 'İ', 'Į', 'Ī'],
    'j': ['ј', 'ĵ'],
    'J': ['Ј', 'Ĵ'],
    'k': ['к', 'ķ', 'ĸ'],
    'K': ['К', 'Ķ', 'ĸ'],
    'l': ['л', 'ł', 'ľ', 'ļ', '|'],
    'L': ['Л', 'Ł', 'Ľ', 'Ļ', '£'],
    'm': ['м', 'ṁ'],
    'M': ['М', 'Ṁ'],
    'n': ['п', 'ñ', 'ń', 'ň', 'ņ', 'ŋ'],
    'N': ['П', 'Ñ', 'Ń', 'Ň', 'Ņ', 'Ŋ'],
    'o': ['о', 'ø', 'ö', 'ò', 'ó', 'ô', 'õ', '°', 'ő', 'ō'],
    'O': ['О', 'Ø', 'Ö', 'Ò', 'Ó', 'Ô', 'Õ', '°', 'Ő', 'Ō'],
    'p': ['р', 'þ', 'ρ'],
    'P': ['Р', 'Þ', 'Ρ'],
    'q': ['ǫ', 'ǭ'],
    'Q': ['Ǫ', 'Ǭ'],
    'r': ['г', 'ŕ', 'ř', 'ŗ', 'я'],
    'R': ['Г', 'Ŕ', 'Ř', 'Ŗ', 'Я'],
    's': ['ѕ', 'š', 'ś', 'ş', 'ș', '$'],
    'S': ['Ѕ', 'Š', 'Ś', 'Ş', 'Ș', '$'],
    't': ['т', 'ť', 'ţ', 'ț', '†'],
    'T': ['Т', 'Ť', 'Ţ', 'Ț', '†'],
    'u': ['ц', 'ü', 'ù', 'ú', 'û', 'ū', 'ů', 'ű', 'ų', 'µ'],
    'U': ['Ц', 'Ü', 'Ù', 'Ú', 'Û', 'Ū', 'Ů', 'Ű', 'Ų'],
    'v': ['ѵ', 'ν'],
    'V': ['Ѵ', 'Ѵ'],
    'w': ['ш', 'ẃ', 'ẁ', 'ŵ', 'ẅ'],
    'W': ['Ш', 'Ẃ', 'Ẁ', 'Ŵ', 'Ẅ'],
    'x': ['х', '×', 'ж'],
    'X': ['Х', '×', 'Ж'],
    'y': ['у', 'ý', 'ÿ', 'ў', 'ỳ', 'ŷ'],
    'Y': ['У', 'Ý', 'Ÿ', 'Ў', 'Ỳ', 'Ŷ'],
    'z': ['з', 'ž', 'ź', 'ż', 'ʐ'],
    'Z': ['З', 'Ž', 'Ź', 'Ż', 'Ʒ']
};

// Banco de palavras ofensivas
const offensiveWords = [
    'ass', 'fuck', 'shit', 'dick', 'cock', 'pussy', 'bitch', 'whore', 'slut',
    'fag', 'gay', 'nigger', 'nigga', 'cunt', 'piss', 'cum', 'sex', 'porn',
    'rape', 'nazi', 'hitler', 'kill', 'die', 'death', 'suicide', 'murder'
];

// Ideias de nicks
const nickIdeas = [
    'Shadow', 'Storm', 'Blaze', 'Frost', 'Viper', 'Ghost', 'Wolf', 'Eagle',
    'Dragon', 'Phoenix', 'Ninja', 'Samurai', 'Knight', 'Wizard', 'Rogue',
    'Hunter', 'Warrior', 'Mage', 'Titan', 'Legend', 'Mystic', 'Chaos',
    'Venom', 'Thunder', 'Lightning', 'Cyber', 'Neon', 'Pixel', 'Glitch',
    'Alpha', 'Omega', 'Delta', 'Echo', 'Bravo', 'Zero', 'Ace', 'King',
    'Queen', 'Joker', 'Raven', 'Hawk', 'Falcon', 'Tiger', 'Lion', 'Bear',
    'Shark', 'Snake', 'Spider', 'Scorpion', 'Reaper', 'Angel', 'Demon',
    'Soul', 'Spirit', 'Phantom', 'Specter', 'Wraith', 'Shade', 'Dark',
    'Light', 'Fire', 'Ice', 'Wind', 'Earth', 'Metal', 'Crystal', 'Diamond',
    'Ruby', 'Emerald', 'Sapphire', 'Gold', 'Silver', 'Bronze', 'Platinum',
    'Nova', 'Star', 'Moon', 'Sun', 'Comet', 'Meteor', 'Galaxy', 'Cosmos',
    'Void', 'Abyss', 'Inferno', 'Blizzard', 'Tempest', 'Cyclone', 'Tsunami',
    'Avalanche', 'Quake', 'Volt', 'Spark', 'Flash', 'Bolt', 'Strike',
    'Slash', 'Crush', 'Smash', 'Blast', 'Burst', 'Rush', 'Dash', 'Swift'
];

// Variáveis globais
let currentNick = '';
let pendingGeneration = null;

// Criar sons
const clickSound = new Audio();
clickSound.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';

const successSound = new Audio();
successSound.src = 'data:audio/wav;base64,UklGRvwFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YdgFAAC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4


// Função para tocar som
function playSound(audio) {
    try {
        audio.currentTime = 0;
        audio.play();
    } catch (e) {
        console.log('Som não pode ser reproduzido:', e);
    }
}

// Verificar se o nick começa com caractere inválido
function startsWithInvalidChar(nick) {
    if (!nick) return false;
    const firstChar = nick[0];
    return /[0-9~!@#%^&()=+"',‚./:;<‹›>?```math
````{|}€ƒ„…†‡‰'ŠŒŽ""•™šœž¡¢£¤¥§©®ª«»¹º¸·¶¼½¾²³´±°¯ˆŸ¬µ×÷$*–_]/.test(firstChar);
}

// Verificar palavras ofensivas
function checkOffensiveWords(nick) {
    const lowerNick = nick.toLowerCase();
    const foundWords = [];
    
    for (const word of offensiveWords) {
        if (lowerNick.includes(word)) {
            foundWords.push(word);
        }
    }
    
    return foundWords;
}

// Gerar variações do nick
function generateVariations(nick) {
    const variations = [];
    const maxVariations = 10;
    
    // Variação 1: Tudo maiúsculo com substituições
    let var1 = '';
    for (const char of nick.toUpperCase()) {
        if (charVariations[char] && Math.random() > 0.3) {
            var1 += charVariations[char][Math.floor(Math.random() * charVariations[char].length)];
        } else {
            var1 += char;
        }
    }
    variations.push(var1);
    
    // Variação 2: Tudo minúsculo com substituições
    let var2 = '';
    for (const char of nick.toLowerCase()) {
        if (charVariations[char] && Math.random() > 0.3) {
            var2 += charVariations[char][Math.floor(Math.random() * charVariations[char].length)];
        } else {
            var2 += char;
        }
    }
    variations.push(var2);
    
    // Variação 3: Alternando maiúsculas e minúsculas
    let var3 = '';
    for (let i = 0; i < nick.length; i++) {
        const char = i % 2 === 0 ? nick[i].toUpperCase() : nick[i].toLowerCase();
        if (charVariations[char] && Math.random() > 0.5) {
            var3 += charVariations[char][Math.floor(Math.random() * charVariations[char].length)];
        } else {
            var3 += char;
        }
    }
    variations.push(var3);
    
    // Variação 4: Com símbolos decorativos
    const symbols = ['~', '•', '†', '×', '÷', '°', '¤', '§'];
    const symbol1 = symbols[Math.floor(Math.random() * symbols.length)];
    const symbol2 = symbols[Math.floor(Math.random() * symbols.length)];
    variations.push(symbol1 + nick + symbol2);
    
    // Variação 5: Estilo hacker
    let var5 = '';
    for (const char of nick) {
        const lower = char.toLowerCase();
        if (Math.random() > 0.4 && charVariations[lower]) {
            const variants = charVariations[lower];
            var5 += variants[Math.floor(Math.random() * variants.length)];
        } else {
            var5 += Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
        }
    }
    variations.push(var5);
    
    // Variações 6-10: Combinações criativas
    for (let i = variations.length; i < maxVariations; i++) {
        let variation = '';
        
        for (let j = 0; j < nick.length; j++) {
            const char = nick[j];
            const charLower = char.toLowerCase();
            
            if (Math.random() > 0.5 && charVariations[charLower]) {
                variation += charVariations[charLower][Math.floor(Math.random() * charVariations[charLower].length)];
            } else {
                variation += Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
            }
        }
        
        // Adicionar decorações ocasionais
        if (Math.random() > 0.7) {
            const decorations = ['~', '•', '×', '°', '¤', '§', '†', '‡'];
            const deco = decorations[Math.floor(Math.random() * decorations.length)];
            if (Math.random() > 0.5) {
                variation = deco + variation;
            } else {
                variation = variation + deco;
            }
        }
        
        variations.push(variation);
    }
    
    // Remover duplicatas
    const uniqueVariations = [...new Set(variations)];
    
    // Garantir 10 variações únicas
    while (uniqueVariations.length < maxVariations) {
        let newVar = '';
        for (const char of nick) {
            const charLower = char.toLowerCase();
            if (Math.random() > 0.3 && charVariations[charLower]) {
                const variants = charVariations[charLower];
                newVar += variants[Math.floor(Math.random() * variants.length)];
            } else {
                newVar += Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
            }
        }
        if (!uniqueVariations.includes(newVar)) {
            uniqueVariations.push(newVar);
        }
    }
    
    return uniqueVariations.slice(0, maxVariations);
}

// Copiar para área de transferência
function copyToClipboard(text, button) {
    playSound(clickSound);
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Copiado!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        button.innerHTML = '✅ Copiado!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerHTML = '📋 Copiar';
            button.classList.remove('copied');
        }, 2000);
    });
}

// Tornar a função global para o onclick inline
window.copyToClipboard = copyToClipboard;

// Aguardar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado!');
    
    // Elementos DOM
    const nickInput = document.getElementById('nickInput');
    const charCounter = document.querySelector('.char-counter');
    const generateBtn = document.getElementById('generateBtn');
    const warningModal = document.getElementById('warningModal');
    const warningText = document.getElementById('warningText');
    const cancelBtn = document.getElementById('cancelBtn');
    const continueBtn = document.getElementById('continueBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const nicksList = document.getElementById('nicksList');
    const ideasBtn = document.getElementById('ideasBtn');
    const ideasContainer = document.getElementById('ideasContainer');
    const ideasList = document.getElementById('ideasList');

    // Verificar se os elementos existem
    if (!nickInput || !generateBtn) {
        console.error('Elementos essenciais não encontrados!');
        return;
    }

    // Atualizar contador de caracteres
    nickInput.addEventListener('input', function(e) {
        const length = e.target.value.length;
        charCounter.textContent = `${length}/12`;
        charCounter.style.color = length > 12 ? '#ff0040' : '#a0a0a0';
    });

    // Mostrar modal de aviso
    function showWarning(message, callback) {
        warningText.textContent = message;
        warningModal.classList.remove('hidden');
        pendingGeneration = callback;
    }

    // Fechar modal
    function closeModal() {
        warningModal.classList.add('hidden');
        pendingGeneration = null;
    }

    // Realizar a geração
    function performGeneration(nick) {
        closeModal();
        playSound(successSound);
        
        const variations = generateVariations(nick);
        
        // Limpar lista anterior
        nicksList.innerHTML = '';
        
        // Adicionar variações com animação
        variations.forEach((variation, index) => {
            setTimeout(() => {
                const nickItem = document.createElement('div');
                nickItem.className = 'nick-item';
                nickItem.innerHTML = `
                    <span class="nick-text">${variation}</span>
                    <button class="copy-btn" onclick="copyToClipboard('${variation.replace(/'/g, "\\'")}', this)">
                        📋 Copiar
                    </button>
                `;
                nicksList.appendChild(nickItem);
            }, index * 100);
        });
        
        // Mostrar container de resultados
        resultsContainer.classList.remove('hidden');
        
        // Scroll suave
        setTimeout(() => {
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }

    // Gerar nicks
    function generateNicks() {
        console.log('Botão gerar clicado!');
        playSound(clickSound);
        
        const nick = nickInput.value.trim();
        console.log('Nick inserido:', nick);
        
        // Validações
        if (nick.length < 3) {
            alert('❌ O nick deve ter no mínimo 3 caracteres!');
            return;
        }
        
        if (nick.length > 12) {
            alert('❌ O nick deve ter no máximo 12 caracteres!');
            return;
        }
        
        currentNick = nick;
        
        // Verificar caractere inicial
        if (startsWithInvalidChar(nick)) {
            const firstChar = nick[0];
            let charType = 'caractere';
            if (/[0-9]/.test(firstChar)) charType = 'número';
            else if (/[~!@#%^&()=+"',‚./:;<‹›>?```math
````{|}€ƒ„…†‡‰'ŠŒŽ""•™šœž¡¢£¤¥§©®ª«»¹º¸·¶¼½¾²³´±°¯ˆŸ¬µ×÷$*–_]/.test(firstChar)) charType = 'símbolo';
            
            showWarning(
                `O Little Big Snake não aceita nicks que começam com ${charType}. Seu nick começaria com "${firstChar}".`,
                () => performGeneration(nick)
            );
            return;
        }
        
        // Verificar palavras ofensivas
        const offensiveFound = checkOffensiveWords(nick);
        if (offensiveFound.length > 0) {
            const words = offensiveFound.map(w => `"${w}"`).join(', ');
            showWarning(
                `Risco de *Nick Ban* por conter ${words} no nick. Isso pode ser considerado ofensivo pelo jogo.`,
                () => performGeneration(nick)
            );
            return;
        }
        
        // Gerar diretamente
        performGeneration(nick);
    }

    // Gerar ideias
    function generateIdeas() {
        console.log('Botão ideias clicado!');
        playSound(clickSound);
        
        // Limpar lista
        ideasList.innerHTML = '';
        
        // Selecionar 5 ideias aleatórias
        const selectedIdeas = [];
        const availableIdeas = [...nickIdeas];
        
        for (let i = 0; i < 5 && availableIdeas.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableIdeas.length);
            selectedIdeas.push(availableIdeas[randomIndex]);
            availableIdeas.splice(randomIndex, 1);
        }
        
        // Adicionar com animação
        selectedIdeas.forEach((idea, index) => {
            setTimeout(() => {
                const ideaItem = document.createElement('div');
                ideaItem.className = 'idea-item';
                ideaItem.textContent = idea;
                ideaItem.onclick = () => {
                    playSound(clickSound);
                    nickInput.value = idea;
                    nickInput.dispatchEvent(new Event('input'));
                    nickInput.focus();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                };
                ideasList.appendChild(ideaItem);
            }, index * 100);
        });
        
        // Mostrar container
        ideasContainer.classList.remove('hidden');
    }

    // Event Listeners
    generateBtn.addEventListener('click', generateNicks);
    ideasBtn.addEventListener('click', generateIdeas);
    
    cancelBtn.addEventListener('click', closeModal);
    continueBtn.addEventListener('click', function() {
        if (pendingGeneration) {
            pendingGeneration();
        }
    });

    // Enter para gerar
    nickInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateNicks();
        }
    });

    // Fechar modal ao clicar fora
    warningModal.addEventListener('click', function(e) {
        if (e.target === warningModal) {
            closeModal();
        }
    });

    console.log('🐍 TOCA-Nicks Gerador carregado com sucesso!');
});
