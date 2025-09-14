// Gerador de nicknames
class NickGenerator {
    constructor() {
        this.charVariations = CHAR_VARIATIONS;
        this.decorativeSymbols = DECORATIVE_SYMBOLS;
        this.maxVariations = CONFIG.MAX_VARIATIONS;
    }

    // Gerar uma única variação
    generateSingleVariation(nick, style = 'random') {
        let variation = '';

        switch (style) {
            case 'uppercase':
                variation = this.generateUppercaseVariation(nick);
                break;
            case 'lowercase':
                variation = this.generateLowercaseVariation(nick);
                break;
            case 'alternating':
                variation = this.generateAlternatingVariation(nick);
                break;
            case 'cyrillic':
                variation = this.generateCyrillicVariation(nick);
                break;
            case 'decorated':
                variation = this.generateDecoratedVariation(nick);
                break;
            case 'mixed':
                variation = this.generateMixedVariation(nick);
                break;
            case 'symbols':
                variation = this.generateSymbolVariation(nick);
                break;
            default:
                variation = this.generateRandomVariation(nick);
        }

        return variation;
    }

    // Variação maiúscula
    generateUppercaseVariation(nick) {
        let variation = '';
        for (const char of nick.toUpperCase()) {
            if (this.charVariations[char] && Math.random() > 0.3) {
                const variants = this.charVariations[char];
                variation += variants[Math.floor(Math.random() * variants.length)];
            } else {
                variation += char;
            }
        }
        return variation;
    }

    // Variação minúscula
    generateLowercaseVariation(nick) {
        let variation = '';
        for (const char of nick.toLowerCase()) {
            if (this.charVariations[char] && Math.random() > 0.3) {
                const variants = this.charVariations[char];
                variation += variants[Math.floor(Math.random() * variants.length)];
            } else {
                variation += char;
            }
        }
        return variation;
    }

    // Variação alternada
    generateAlternatingVariation(nick) {
        let variation = '';
        for (let i = 0; i < nick.length; i++) {
            const char = i % 2 === 0 ? nick[i].toUpperCase() : nick[i].toLowerCase();
            if (this.charVariations[char] && Math.random() > 0.5) {
                const variants = this.charVariations[char];
                variation += variants[Math.floor(Math.random() * variants.length)];
            } else {
                variation += char;
            }
        }
        return variation;
    }

    // Variação cirílica
    generateCyrillicVariation(nick) {
        let variation = '';
        for (const char of nick) {
            const charLower = char.toLowerCase();
            if (this.charVariations[charLower] && Math.random() > 0.3) {
                const variants = this.charVariations[charLower];
                const cyrillicChars = variants.filter(c => /[А-я]/.test(c));
                if (cyrillicChars.length > 0) {
                    variation += cyrillicChars[Math.floor(Math.random() * cyrillicChars.length)];
                } else {
                    variation += variants[0];
                }
            } else {
                variation += char;
            }
        }
        return variation;
    }

    // Variação decorada
    generateDecoratedVariation(nick) {
        let variation = '';
        for (const char of nick) {
            const charLower = char.toLowerCase();
            if (this.charVariations[charLower] && Math.random() > 0.5) {
                const variants = this.charVariations[charLower];
                variation += variants[Math.floor(Math.random() * variants.length)];
            } else {
                variation += char;
            }
        }
        return variation;
    }

    // Variação mista
    generateMixedVariation(nick) {
        let variation = '';
        for (const char of nick) {
            const charLower = char.toLowerCase();
            if (Math.random() > 0.6 && this.charVariations[charLower]) {
                const variants = this.charVariations[charLower];
                variation += variants[Math.floor(Math.random() * variants.length)];
            } else {
                variation += Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
            }
        }
        return variation;
    }

    // Variação com símbolos
    generateSymbolVariation(nick) {
        const symbol1 = this.decorativeSymbols[Math.floor(Math.random() * this.decorativeSymbols.length)];
        const symbol2 = this.decorativeSymbols[Math.floor(Math.random() * this.decorativeSymbols.length)];
        return symbol1 + nick + symbol2;
    }

    // Variação aleatória
    generateRandomVariation(nick) {
        const styles = ['uppercase', 'lowercase', 'alternating', 'cyrillic', 'decorated', 'mixed'];
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        return this.generateSingleVariation(nick, randomStyle);
    }

    // Gerar todas as variações
    generateVariations(nick) {
        const variations = [];
        const styles = ['uppercase', 'lowercase', 'alternating', 'cyrillic', 'decorated', 'mixed', 'symbols'];

        // Gerar variações definidas
        for (const style of styles) {
            const variation = this.generateSingleVariation(nick, style);
            if (!variations.includes(variation)) {
                variations.push(variation);
            }
        }

        // Completar com variações aleatórias
        while (variations.length < this.maxVariations) {
            const variation = this.generateRandomVariation(nick);
            if (!variations.includes(variation)) {
                variations.push(variation);
            }
        }

        // Adicionar decorações ocasionais
        const decoratedVariations = [];
        variations.forEach(variation => {
            if (Math.random() > 0.7 && variation.length < CONFIG.MAX_NICK_LENGTH - 2) {
                const deco = this.decorativeSymbols[Math.floor(Math.random() * this.decorativeSymbols.length)];
                if (Math.random() > 0.5) {
                    decoratedVariations.push(deco + variation);
                } else {
                    decoratedVariations.push(variation + deco);
                }
            }
        });

        // Mesclar variações decoradas
        decoratedVariations.forEach(variation => {
            if (!variations.includes(variation) && variations.length < this.maxVariations) {
                variations.push(variation);
            }
        });

        return variations.slice(0, this.maxVariations);
    }

    // Gerar ideias aleatórias
    generateIdeas(count = CONFIG.IDEAS_COUNT) {
        const ideas = [...NICK_IDEAS];
        const selectedIdeas = [];

        for (let i = 0; i < count && ideas.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * ideas.length);
            selectedIdeas.push(ideas[randomIndex]);
            ideas.splice(randomIndex, 1);
        }

        return selectedIdeas;
    }

    // Aplicar filtros de caracteres permitidos
    filterAllowedChars(nick) {
        return nick.split('').filter(char => ALLOWED_CHARS.includes(char)).join('');
    }
}

// Instância global
const nickGenerator = new NickGenerator();