// Controlador da interface do usuário
class UIController {
    constructor() {
        this.elements = {};
        this.isGenerating = false;
        this.pendingGeneration = null;
        this.generationCount = parseInt(localStorage.getItem('generationCount') || '0');
        
        this.initializeElements();
        this.bindEvents();
        this.initializeUI();
    }

    // Inicializar elementos do DOM
    initializeElements() {
        this.elements = {
            nickInput: document.getElementById('nickInput'),
            charCounter: document.querySelector('.char-counter'),
            generateBtn: document.getElementById('generateBtn'),
            warningModal: document.getElementById('warningModal'),
            warningText: document.getElementById('warningText'),
            cancelBtn: document.getElementById('cancelBtn'),
            continueBtn: document.getElementById('continueBtn'),
            resultsContainer: document.getElementById('resultsContainer'),
            nicksList: document.getElementById('nicksList'),
            ideasBtn: document.getElementById('ideasBtn'),
            ideasContainer: document.getElementById('ideasContainer'),
            ideasList: document.getElementById('ideasList')
        };
    }

    // Vincular eventos
    bindEvents() {
        // Input do nick
        this.elements.nickInput.addEventListener('input', this.handleInputChange.bind(this));
        this.elements.nickInput.addEventListener('keypress', this.handleKeyPress.bind(this));

        // Botões principais
        this.elements.generateBtn.addEventListener('click', this.handleGenerateClick.bind(this));
        this.elements.ideasBtn.addEventListener('click', this.handleIdeasClick.bind(this));

        // Modal
        this.elements.cancelBtn.addEventListener('click', this.handleCancelClick.bind(this));
        this.elements.continueBtn.addEventListener('click', this.handleContinueClick.bind(this));
        this.elements.warningModal.addEventListener('click', this.handleModalClick.bind(this));

        // Efeitos sonoros nos botões
        this.addSoundEffects();

        // Eventos de teclado
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    // Inicializar UI
    initializeUI() {
        // Recuperar último nick
        const lastNick = localStorage.getItem('lastNick');
        if (lastNick) {
            this.elements.nickInput.value = lastNick;
            this.updateCharCounter();
        }

        // Inicializar animações
        this.initializeAnimations();

        // Mostrar dica para novos usuários
        this.showFirstVisitTip();

        console.log('🐍 TOCA-Nicks Gerador carregado com sucesso!');
        console.log('💚 Feito com amor para a comunidade LBS');
    }

    // Atualizar contador de caracteres
    updateCharCounter() {
        const length = this.elements.nickInput.value.length;
        this.elements.charCounter.textContent = `${length}/${CONFIG.MAX_NICK_LENGTH}`;
        this.elements.charCounter.style.color = length > CONFIG.MAX_NICK_LENGTH ? 'var(--danger-color)' : 'var(--text-secondary)';
    }

    // Manipular mudança no input
    handleInputChange(e) {
        this.updateCharCounter();
        localStorage.setItem('lastNick', e.target.value);
        // Resetar botão ao limpar input
        if (this.elements.nickInput.value.trim() === "") {
            this.elements.generateBtn.textContent = "Gerar";
            this.elements.nicksList.innerHTML = "";
        }

    }

    // Manipular tecla pressionada
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleGenerateClick();
        }
    }

    // Manipular teclas especiais
    handleKeyDown(e) {
        // Konami Code
        this.checkKonamiCode(e.key);
    }

    // Manipular click no gerar
    handleGenerateClick() {
        if (this.isGenerating) return;

        audioManager.playClick();
        this.generateNicks();
    }

    // Manipular click nas ideias
    handleIdeasClick() {
        audioManager.playClick();
        this.generateIdeas();
    }

    // Manipular click no cancelar
    handleCancelClick() {
        audioManager.playClick();
        this.closeModal();
    }

    // Manipular click no continuar
    handleContinueClick() {
        audioManager.playClick();
        if (this.pendingGeneration) {
            this.pendingGeneration();
        }
    }

    // Manipular click no modal
    handleModalClick(e) {
        if (e.target === this.elements.warningModal) {
            this.closeModal();
        }
    }

    // Gerar nicks
    generateNicks() {
        const nick = this.elements.nickInput.value.trim();
        const validation = nickValidator.validate(nick);

        // Verificar erros críticos
        if (!validation.isValid) {
            this.showAlert(validation.errors.join('\n'), 'error');
            return;
        }

        // Verificar avisos
        if (validation.warnings.length > 0) {
            const warning = validation.warnings.find(w => typeof w === 'object');
            if (warning) {
                this.showWarning(warning.message, () => this.performGeneration(validation.nick));
                return;
            }
        }

        // Gerar diretamente
        this.performGeneration(validation.nick);
    }

    // Realizar geração
    performGeneration(nick) {
        this.closeModal();
        this.isGenerating = true;

        // Tocar som de sucesso
        audioManager.playSuccess();

        // Incrementar contador
        this.incrementGenerationCount();

        // Gerar variações
        const variations = nickGenerator.generateNewSet(nick);

        // Resetar botão após nova geração
        if (this.elements.generateBtn.textContent === "Gerar") {
            this.elements.generateBtn.textContent = "Gerar novamente";
        }

        // Limpar resultados anteriores
        this.elements.nicksList.innerHTML = '';

        // Adicionar variações com animação
        variations.forEach((variation, index) => {
            setTimeout(() => {
                this.addNickItem(variation);
            }, index * CONFIG.ANIMATION_DELAY);
        });

        // Mostrar container de resultados
        this.showResults();

        this.isGenerating = false;
    }

    // Adicionar item de nick
    addNickItem(nick) {
        const nickItem = document.createElement('div');
        nickItem.className = 'nick-item';
        nickItem.innerHTML = `
            <span class="nick-text">${nick}</span>
            <button class="copy-btn cyber-btn" onclick="uiController.copyToClipboard('${nick.replace(/'/g, "\\'")}', this)">
                📋 Copiar
            </button>
        `;
        
        this.elements.nicksList.appendChild(nickItem);
    }

    // Gerar ideias
    generateIdeas() {
        // Limpar lista anterior
        this.elements.ideasList.innerHTML = '';

        // Gerar ideias
        const ideas = nickGenerator.generateIdeas();

        // Adicionar com animação
        ideas.forEach((idea, index) => {
            setTimeout(() => {
                this.addIdeaItem(idea);
            }, index * CONFIG.ANIMATION_DELAY);
        });

        // Mostrar container
        this.elements.ideasContainer.classList.remove('hidden');
    }

    // Adicionar item de ideia
    addIdeaItem(idea) {
        const ideaItem = document.createElement('div');
        ideaItem.className = 'idea-item';
        ideaItem.textContent = idea;
        ideaItem.onclick = () => {
            audioManager.playClick();
            this.elements.nickInput.value = idea;
            this.updateCharCounter();
            this.elements.nickInput.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        
        this.elements.ideasList.appendChild(ideaItem);
    }

    // Copiar para clipboard
    copyToClipboard(text, button) {
        audioManager.playClick();
        
        navigator.clipboard.writeText(text).then(() => {
            this.showCopySuccess(button);
        }).catch(() => {
            // Fallback
            this.fallbackCopy(text);
            this.showCopySuccess(button);
        });
    }

    // Fallback para cópia
    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    // Mostrar sucesso da cópia
    showCopySuccess(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Copiado!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 2000);
    }

    // Mostrar aviso
    showWarning(message, callback) {
        this.elements.warningText.textContent = message;
        this.elements.warningModal.classList.remove('hidden');
        this.pendingGeneration = callback;
    }

    // Fechar modal
    closeModal() {
        this.elements.warningModal.classList.add('hidden');
        this.pendingGeneration = null;
    }

    // Mostrar resultados
    showResults() {
        this.elements.resultsContainer.classList.remove('hidden');
        
        setTimeout(() => {
            this.elements.resultsContainer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 300);
    }

    // Mostrar alerta
    showAlert(message, type = 'info') {
        alert(`${type === 'error' ? '❌' : 'ℹ️'} ${message}`);
    }

    // Incrementar contador de gerações
    incrementGenerationCount() {
        this.generationCount++;
        localStorage.setItem('generationCount', this.generationCount.toString());
        
        // Comemoração a cada 100 gerações
        if (this.generationCount % CONFIG.CELEBRATION_THRESHOLD === 0) {
            this.showCelebration();
        }
    }

    // Mostrar comemoração
    showCelebration() {
        const celebration = document.createElement('div');
        celebration.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: rgba(0, 0, 0, 0.9); padding: 2rem; border-radius: 20px; 
                        border: 2px solid var(--primary-color); text-align: center; z-index: 9999;">
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">🎉 Parabéns! 🎉</h2>
                <p style="font-size: 1.2rem;">Você já gerou ${this.generationCount} nicks!</p>
                <p style="margin-top: 1rem; color: var(--text-secondary);">Continue criando nicks incríveis!</p>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            celebration.style.transition = 'opacity 0.5s ease';
            celebration.style.opacity = '0';
            setTimeout(() => celebration.remove(), 500);
        }, 3000);
    }

    // Adicionar efeitos sonoros
    addSoundEffects() {
        document.querySelectorAll('button, .idea-item').forEach(element => {
            element.addEventListener('mouseenter', () => {
                audioManager.playHover();
            });
        });
    }

    // Inicializar animações
    initializeAnimations() {
        // Animação de entrada
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.8s ease';
            document.body.style.opacity = '1';
        }, 100);

        // Partículas
        this.startParticles();

        // Placeholder animado
        this.animatePlaceholder();
    }

    // Iniciar partículas
    startParticles() {
        setInterval(() => {
            this.createParticle();
        }, CONFIG.PARTICLE_INTERVAL);
    }

    // Criar partícula
    createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: hsl(${Math.random() * 60 + 120}, 100%, 50%);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight}px;
            z-index: 0;
            box-shadow: 0 0 6px currentColor;
        `;
        
        document.body.appendChild(particle);
        
        particle.animate([
            { transform: 'translateY(0) scale(0)', opacity: 0 },
            { transform: `translateY(-${window.innerHeight + 100}px) scale(1)`, opacity: 1, offset: 0.1 },
            { transform: `translateY(-${window.innerHeight + 100}px) scale(1)`, opacity: 1, offset: 0.9 },
            { transform: `translateY(-${window.innerHeight + 100}px) scale(0)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 5000,
            easing: 'linear'
        }).onfinish = () => particle.remove();
    }

    // Animar placeholder
    animatePlaceholder() {
        const placeholders = ['Insira seu Nick', 'Digite aqui...', 'Seu nick aqui', 'Crie algo único!'];
        let placeholderIndex = 0;
        
        setInterval(() => {
            if (this.elements.nickInput.value === '') {
                placeholderIndex = (placeholderIndex + 1) % placeholders.length;
                this.elements.nickInput.placeholder = placeholders[placeholderIndex];
            }
        }, 3000);
    }

    // Mostrar dica para primeira visita
    showFirstVisitTip() {
        if (!localStorage.getItem('firstVisit')) {
            localStorage.setItem('firstVisit', 'false');
            
            setTimeout(() => {
                const tip = document.createElement('div');
                tip.innerHTML = `
                    <div style="position: fixed; bottom: 20px; right: 20px; background: var(--surface-color); 
                                padding: 1.5rem; border-radius: 15px; border: 1px solid var(--primary-color); 
                                max-width: 300px; z-index: 1000; animation: slideInRight 0.5s ease;">
                        <h4 style="color: var(--primary-color); margin-bottom: 0.5rem;">💡 Dica</h4>
                        <p style="font-size: 0.9rem;">Digite seu nick e clique em "GERAR" para criar 10 variações únicas!</p>
                        <button onclick="this.parentElement.parentElement.remove()" 
                                style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); 
                                       color: black; border: none; border-radius: 5px; cursor: pointer;">
                            Entendi!
                        </button>
                    </div>
                `;
                document.body.appendChild(tip);
            }, 2000);
        }
    }

    // Verificar Konami Code
    checkKonamiCode(key) {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        
        if (!this.konamiIndex) this.konamiIndex = 0;

        if (key === konamiCode[this.konamiIndex]) {
            this.konamiIndex++;
            if (this.konamiIndex === konamiCode.length) {
                this.activateEasterEgg();
                this.konamiIndex = 0;
            }
        } else {
            this.konamiIndex = 0;
        }
    }

    // Ativar Easter Egg
    activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s linear infinite';
        audioManager.playSuccess();
        
        // Explosão de partículas
        for (let i = 0; i < 50; i++) {
            setTimeout(() => this.createParticle(), i * 20);
        }
        
        // Mensagem especial
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        font-size: 3rem; font-weight: bold; color: #00ff41; text-shadow: 0 0 30px #00ff41; 
                        z-index: 9999; animation: pulse 1s ease-in-out infinite;">
                🐍 SNAKE MODE ACTIVATED! 🐍
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            document.body.style.animation = '';
        }, 3000);
    }
}

// Instância global
const uiController = new UIController();
