console.log('=== PROGRAMA SUSTENTARE - CARREGANDO ===');

class GestaoResiduosApp {
    constructor() {
        this.currentTab = 'dashboard';
        this.charts = {};
        this.init();
    }

    init() {
        console.log('🚀 Iniciando aplicação Sustentare...');
        this.setupEventListeners();
        this.initializeDataTables();
        this.initializeCharts();
        console.log('✅ Aplicação iniciada com sucesso!');
    }

    setupEventListeners() {
        console.log('🔧 Configurando event listeners...');
        
        // Navegação por abas
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                console.log('📁 Mudando para aba:', tabName);
                this.switchTab(tabName);
            });
        });

        console.log('✅ Event listeners configurados');
    }

    switchTab(tabName) {
        // Remove active de todos os botões e conteúdos
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Adiciona active ao selecionado
        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(tabName);
        
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        if (activeContent) {
            activeContent.classList.add('active');
        }
        
        this.currentTab = tabName;
        
        // Inicializa componentes específicos da aba
        setTimeout(() => {
            this.initializeTabContent(tabName);
        }, 100);
    }

    initializeTabContent(tabName) {
        console.log('🎯 Inicializando conteúdo da aba:', tabName);
        
        switch(tabName) {
            case 'dashboard':
                this.initializeDashboard();
                break;
            case 'descaracterizacao':
                this.showInfoMessage('descaracterizacao');
                break;
            case 'doacoes':
                this.showInfoMessage('doacoes');
                break;
            case 'recebedores':
                this.showInfoMessage('recebedores');
                break;
            case 'materiais':
                this.showInfoMessage('materiais');
                break;
            case 'novo-dado':
                this.showInfoMessage('novo-dado');
                break;
        }
    }

    showInfoMessage(tabName) {
        const content = document.getElementById(tabName);
        if (content) {
            content.innerHTML = `
                <h2>${this.getTabTitle(tabName)}</h2>
                <div class="info-message">
                    <p>📋 Conteúdo da aba ${this.getTabTitle(tabName)} será implementado em breve.</p>
                    <p><small>Funcionalidade em desenvolvimento</small></p>
                </div>
            `;
        }
    }

    getTabTitle(tabName) {
        const titles = {
            'descaracterizacao': '🗑️ Dados de Descaracterização',
            'doacoes': '💻 Doações de Computadores',
            'recebedores': '🏢 Entidades Beneficiadas',
            'materiais': '🔧 Materiais Reciclados',
            'novo-dado': '➕ Incluir Novo Dado'
        };
        return titles[tabName] || tabName;
    }

    initializeDataTables() {
        console.log('📊 Inicializando DataTables...');
        
        // Tabela Top Entidades
        if ($.fn.DataTable) {
            $('#tabelaTopEntidades').DataTable({
                responsive: true,
                paging: false,
                searching: false,
                info: false,
                order: [[1, 'desc']],
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
                }
            });

            // Tabela Materiais
            $('#tabelaMateriais').DataTable({
                responsive: true,
                paging: false,
                searching: false,
                info: false,
                order: [[1, 'desc']],
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
                }
            });
        }
    }

    initializeDashboard() {
        console.log('📈 Inicializando Dashboard...');
        this.createDashboardCharts();
    }

    initializeCharts() {
        console.log('📊 Inicializando gráficos...');
        this.createDashboardCharts();
    }

    createDashboardCharts() {
        this.createDescaracterizacaoChart();
        this.createDoacoesProgramaChart();
    }

    createDescaracterizacaoChart() {
        const ctx = document.getElementById('chartDescaracterizacao2024');
        if (!ctx) {
            console.log('❌ Canvas chartDescaracterizacao2024 não encontrado');
            return;
        }

        // Destruir chart existente
        if (this.charts.descaracterizacao) {
            this.charts.descaracterizacao.destroy();
        }

        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const dados2024 = [17913, 11009, 12368, 15410, 12141, 13208, 28139, 36881, 23867, 30535, 13460, 14445];

        this.charts.descaracterizacao = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Kg Descaracterizados',
                    data: dados2024,
                    backgroundColor: '#1E6AA9',
                    borderColor: '#0D3E6B',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Kilogramos (Kg)'
                        }
                    }
                }
            }
        });

        console.log('✅ Gráfico de descaracterização criado');
    }

    createDoacoesProgramaChart() {
        const ctx = document.getElementById('chartDoacoesPrograma');
        if (!ctx) {
            console.log('❌ Canvas chartDoacoesPrograma não encontrado');
            return;
        }

        if (this.charts.doacoesPrograma) {
            this.charts.doacoesPrograma.destroy();
        }

        this.charts.doacoesPrograma = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Sustentare Direto', 'Sustentare/SEDES', 'Sustentare/BANRISUL'],
                datasets: [{
                    data: [3616, 1290, 9467],
                    backgroundColor: ['#0D3E6B', '#1E6AA9', '#28A745'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });

        console.log('✅ Gráfico de doações por programa criado');
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CARREGADO - INICIANDO APLICAÇÃO ===');
    window.app = new GestaoResiduosApp();
});

// Tratamento de erros globais
window.addEventListener('error', function(e) {
    console.error('❌ Erro global:', e.error);
});
