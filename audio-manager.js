// Gerenciador de áudio
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {
            click: null,
            success: null,
            hover: null
        };
        this.isEnabled = true;
        this.volume = 0.5;
        this.initializeAudio();
    }

    // Inicializar áudio
    initializeAudio() {
        try {
            // Criar AudioContext após interação do usuário
            document.addEventListener('click', this.enableAudio.bind(this), { once: true });
            this.createSounds();
        } catch (error) {
            console.warn('Audio initialization failed:', error);
            this.isEnabled = false;
        }
    }

    // Ativar áudio após primeira interação
    enableAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.generateSounds();
        } catch (error) {
            console.warn('AudioContext creation failed:', error);
            this.isEnabled = false;
        }
    }

    // Criar sons usando Web Audio API
    generateSounds() {
        if (!this.audioContext) return;

        // Som de click
        this.sounds.click = this.createClickSound();
        
        // Som de sucesso
        this.sounds.success = this.createSuccessSound();
        
        // Som de hover
        this.sounds.hover = this.createHoverSound();
    }

    // Criar som de click
    createClickSound() {
        const buffer = this.audioContext.createBuffer(1, 4410, 44100);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < 4410; i++) {
            data[i] = Math.sin(2 * Math.PI * 800 * i / 44100) * 
                      Math.exp(-i / 2205) * 0.1;
        }
        
        return buffer;
    }

    // Criar som de sucesso
    createSuccessSound() {
        const buffer = this.audioContext.createBuffer(1, 8820, 44100);
        const data = buffer.getChannelData(0);
        
        const frequencies = [440, 554, 659, 880];
        
        for (let i = 0; i < 8820; i++) {
            let sample = 0;
            frequencies.forEach(freq => {
                sample += Math.sin(2 * Math.PI * freq * i / 44100) * 0.02;
            });
            data[i] = sample * Math.exp(-i / 4410);
        }
        
        return buffer;
    }

    // Criar som de hover
    createHoverSound() {
        const buffer = this.audioContext.createBuffer(1, 2205, 44100);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < 2205; i++) {
            data[i] = Math.sin(2 * Math.PI * 600 * i / 44100) * 
                      Math.exp(-i / 1102) * 0.05;
        }
        
        return buffer;
    }

    // Fallback usando HTML5 Audio
    createSounds() {
        // Som de click
        this.sounds.click = new Audio();
        this.sounds.click.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
        this.sounds.click.volume = this.volume;
        
        // Som de sucesso
        this.sounds.success = new Audio();
        this.sounds.success.src = 'data:audio/wav;base64,UklGRvwFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YdgFAAC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4';
        this.sounds.success.volume = this.volume;
        
        // Som de hover
        this.sounds.hover = new Audio();
        this.sounds.hover.src = 'data:audio/wav;base64,UklGRl4EAABXQVZFZm10IBAAAAABAAEAgD4AAIA+AAABAAgAZGF0YToEAAC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4';
        this.sounds.hover.volume = this.volume * 0.3;
    }

    // Tocar som
    playSound(soundName) {
        if (!this.isEnabled || !this.sounds[soundName]) return;

        try {
            if (this.audioContext && this.sounds[soundName] instanceof AudioBuffer) {
                // Usar Web Audio API
                const source = this.audioContext.createBufferSource();
                const gainNode = this.audioContext.createGain();
                
                source.buffer = this.sounds[soundName];
                source.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                gainNode.gain.value = this.volume;
                
                source.start(0);
            } else {
                // Usar HTML5 Audio
                const audio = this.sounds[soundName];
                audio.currentTime = 0;
                audio.play().catch(e => console.warn('Audio play failed:', e));
            }
        } catch (error) {
            console.warn('Sound play failed:', error);
        }
    }

    // Tocar som de click
    playClick() {
        this.playSound('click');
    }

    // Tocar som de sucesso
    playSuccess() {
        this.playSound('success');
    }

    // Tocar som de hover
    playHover() {
        this.playSound('hover');
    }

    // Definir volume
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        // Atualizar volume dos sons HTML5
        Object.values(this.sounds).forEach(sound => {
            if (sound && sound.volume !== undefined) {
                sound.volume = this.volume;
            }
        });
    }

    // Ativar/desativar áudio
    toggle() {
        this.isEnabled = !this.isEnabled;
        return this.isEnabled;
    }
}

// Instância global
const audioManager = new AudioManager();