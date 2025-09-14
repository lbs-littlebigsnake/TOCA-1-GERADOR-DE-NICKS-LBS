// Aplicação principal
class App {
    constructor() {
        this.version = '2.0.0';
        this.initialize();
    }

    // Inicializar aplicação
    initialize() {
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.onDOMReady.bind(this));
        } else {
            this.onDOMReady();
        }
    }

    // DOM pronto
    onDOMReady() {
        try {
            this.setupErrorHandling();
            this.setupPerformanceMonitoring();
            this.setupServiceWorker();
            this.addCustomCSS();
            this.logStartup();
        } catch (error) {
            console.error('App initialization failed:', error);
        }
    }

    // Configurar tratamento de erros
    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Script error:', event.error);
            this.logError(event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.logError(event.reason);
        });
    }

    // Log de erros
    logError(error) {
        // Em produção, você poderia enviar para um serviço de monitoramento
        if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
            // Não fazer log em produção para evitar spam no console
            return;
        }
        console.error('Error logged:', error);
    }

    // Monitoramento de performance
    setupPerformanceMonitoring() {
        if (window.performance && performance.mark) {
            performance.mark('app-start');
            
            window.addEventListener('load', () => {
                performance.mark('app-loaded');
                performance.measure('app-load-time', 'app-start', 'app-loaded');
                
                const measure = performance.getEntriesByName('app-load-time')[0];
                console.log(`App loaded in ${measure.duration.toFixed(2)}ms`);
            });
        }
    }

    // Configurar Service Worker (para futuro PWA)
    setupServiceWorker() {
        if ('serviceWorker' in navigator && location.protocol === 'https:') {
            navigator.serviceWorker.register('/sw.js').then(() => {
                console.log('Service Worker registered successfully');
            }).catch(() => {
                // Service worker não é crítico, apenas log silencioso
            });
        }
    }

    // Adicionar CSS customizado dinamicamente
    addCustomCSS() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
            }

            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }

            /* Melhorias de acessibilidade */
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }

            /* Tema alto contraste */
            @media (prefers-contrast: high) {
                :root {
                    --primary-color: #00ff00;
                    --text-primary: #ffffff;
                    --bg-color: #000000;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Log de inicialização
    logStartup() {
        const messages = [
            `🐍 TOCA-Nicks Generator v${this.version}`,
            '💚 Feito com amor para a comunidade LBS',
            '🚀 Todos os sistemas funcionando',
            '🎵 Áudio inicializado',
            '🎨 Interface carregada',
            '⚡ Pronto para gerar nicks incríveis!'
        ];

        messages.forEach((message, index) => {
            setTimeout(() => {
                console.log(message);
            }, index * 200);
        });
    }

    // Método para atualizar configurações
    updateConfig(newConfig) {
        Object.assign(CONFIG, newConfig);
        console.log('Configuration updated:', newConfig);
    }

    // Método para obter estatísticas
    getStats() {
        return {
            version: this.version,
            generationCount: localStorage.getItem('generationCount') || '0',
            lastNick: localStorage.getItem('lastNick') || '',
            firstVisit: localStorage.getItem('firstVisit') || 'true',
            audioEnabled: audioManager.isEnabled,
            performanceEntries: performance.getEntriesByType('measure')
        };
    }

    // Método para resetar dados
    resetUserData() {
        localStorage.clear();
        location.reload();
    }

    // Método para exportar dados do usuário
    exportUserData() {
        const data = {
            generationCount: localStorage.getItem('generationCount'),
            lastNick: localStorage.getItem('lastNick'),
            firstVisit: localStorage.getItem('firstVisit'),
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'toca-nicks-data.json';
        a.click();
        
        URL.revokeObjectURL(url);
    }
}

// Inicializar aplicação
const app = new App();

// Tornar disponível globalmente para debug
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    window.tocaApp = {
        app,
        audioManager,
        nickValidator,
        nickGenerator,
        uiController,
        constants: { CHAR_VARIATIONS, NICK_IDEAS, CONFIG }
    };
}

// Prevenir erros de console em produção
if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    console.log = console.warn = console.error = () => {};
}