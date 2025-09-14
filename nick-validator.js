// Validador de nicknames
class NickValidator {
    constructor() {
        this.offensiveWords = OFFENSIVE_WORDS;
        this.invalidStartRegex = INVALID_START_CHARS;
    }

    // Validar comprimento
    validateLength(nick) {
        const errors = [];
        
        if (nick.length < CONFIG.MIN_NICK_LENGTH) {
            errors.push(`O nick deve ter no mínimo ${CONFIG.MIN_NICK_LENGTH} caracteres!`);
        }
        
        if (nick.length > CONFIG.MAX_NICK_LENGTH) {
            errors.push(`O nick deve ter no máximo ${CONFIG.MAX_NICK_LENGTH} caracteres!`);
        }
        
        return errors;
    }

    // Verificar se o nick começa com caractere inválido
    startsWithInvalidChar(nick) {
        if (!nick || nick.length === 0) return false;
        return this.invalidStartRegex.test(nick);
    }

    // Obter tipo do primeiro caractere
    getFirstCharType(nick) {
        if (!nick || nick.length === 0) return 'caractere';
        
        const firstChar = nick[0];
        if (/[0-9]/.test(firstChar)) return 'número';
        if (/[~!@#%^&()=+"',‚./:;<‹›>?`{|}€ƒ„…†‡‰''ŠŒŽ""•™šœž¡¢£¤¥§©®ª«»¹º¸·¶¼½¾²³´±°¯ˆŸ¬µ×÷$*–_]/.test(firstChar)) return 'símbolo';
        return 'caractere';
    }

    // Verificar palavras ofensivas
    checkOffensiveWords(nick) {
        const lowerNick = nick.toLowerCase();
        const foundWords = [];
        
        for (const word of this.offensiveWords) {
            if (lowerNick.includes(word)) {
                foundWords.push(word);
            }
        }
        
        return foundWords;
    }

    // Validar caracteres permitidos
    validateAllowedChars(nick) {
        const invalidChars = [];
        
        for (const char of nick) {
            if (!ALLOWED_CHARS.includes(char)) {
                if (!invalidChars.includes(char)) {
                    invalidChars.push(char);
                }
            }
        }
        
        return invalidChars;
    }

    // Validação completa
    validate(nick) {
        const result = {
            isValid: true,
            errors: [],
            warnings: [],
            nick: nick.trim()
        };

        if (!result.nick) {
            result.isValid = false;
            result.errors.push('Por favor, digite um nick!');
            return result;
        }

        // Validar comprimento
        const lengthErrors = this.validateLength(result.nick);
        if (lengthErrors.length > 0) {
            result.isValid = false;
            result.errors.push(...lengthErrors);
        }

        // Validar caracteres permitidos
        const invalidChars = this.validateAllowedChars(result.nick);
        if (invalidChars.length > 0) {
            result.warnings.push(`Caracteres não permitidos no jogo: ${invalidChars.join(', ')}`);
        }

        // Verificar caractere inicial
        if (this.startsWithInvalidChar(result.nick)) {
            const charType = this.getFirstCharType(result.nick);
            const firstChar = result.nick[0];
            result.warnings.push({
                type: 'invalidStart',
                message: `O Little Big Snake não aceita nicks que começam com ${charType}. Seu nick começaria com "${firstChar}".`,
                charType,
                firstChar
            });
        }

        // Verificar palavras ofensivas
        const offensiveFound = this.checkOffensiveWords(result.nick);
        if (offensiveFound.length > 0) {
            const words = offensiveFound.map(w => `"${w}"`).join(', ');
            result.warnings.push({
                type: 'offensive',
                message: `Risco de Nick Ban por conter ${words} no nick. Isso pode ser considerado ofensivo pelo jogo.`,
                words: offensiveFound
            });
        }

        return result;
    }
}

// Instância global
const nickValidator = new NickValidator();