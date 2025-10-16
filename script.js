class GestaoResiduosApp {
    constructor() {
        this.currentTab = 'dashboard';
        this.charts = {};
        this.data = {
            descaracterizacao: [],
            doacoes: [],
            recebedores: [],
            materiais: []
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleData();
        this.initializeDataTables();
        this.initializeCharts();
        this.populateYearFilters();
    }

    setupEventListeners() {
        // Navegação por abas
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Form tabs
        document.querySelectorAll('.form-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchForm(e.target.dataset.form);
            });
        });

        // Form submissions
        document.getElementById('formDescaracterizacao').addEventListener('submit', (e) => this.handleFormSubmit(e, 'descaracterizacao'));
        document.getElementById('formDoacao').addEventListener('submit', (e) => this.handleFormSubmit(e, 'doacao'));
        document.getElementById('formEntidade').addEventListener('submit', (e) => this.handleFormSubmit(e, 'entidade'));

        // Botões de exportação
        document.getElementById('btnExportDescaracterizacao').addEventListener('click', () => this.exportToCSV('descaracterizacao'));
        document.getElementById('btnExportDoacoes').addEventListener('click', () => this.exportToCSV('doacoes'));
        document.getElementById('btnExportRecebedores').addEventListener('click', () => this.exportToCSV('recebedores'));
        document.getElementById('btnImprimirLista').addEventListener('click', () => this.printList());
    }

    switchTab(tabName) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        this.currentTab = tabName;
        
        // Atualizar charts quando abrir dashboard
        if (tabName === 'dashboard') {
            setTimeout(() => {
                this.updateCharts();
            }, 100);
        }
    }

    switchForm(formName) {
        document.querySelectorAll('.form-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.data-form').forEach(form => form.classList.remove('active'));
        
        document.querySelector(`[data-form="${formName}"]`).classList.add('active');
        document.getElementById(`form${formName.charAt(0).toUpperCase() + formName.slice(1)}`).classList.add('active');
    }

    loadSampleData() {
        // Dados de descaracterização (baseados na planilha)
        this.data.descaracterizacao = [
            { ano: '2017', mes: 'JAN', peso: 0, acumuladoAno: 0 },
            { ano: '2017', mes: 'FEV', peso: 0, acumuladoAno: 0 },
            { ano: '2017', mes: 'MAR', peso: 0, acumuladoAno: 0 },
            { ano: '2017', mes: 'ABR', peso: 656, acumuladoAno: 656 },
            { ano: '2017', mes: 'MAI', peso: 5195, acumuladoAno: 5851 },
            { ano: '2017', mes: 'JUN', peso: 10285, acumuladoAno: 16136 },
            { ano: '2017', mes: 'JUL', peso: 14281, acumuladoAno: 30417 },
            { ano: '2017', mes: 'AGO', peso: 9392, acumuladoAno: 39809 },
            { ano: '2017', mes: 'SET', peso: 4837, acumuladoAno: 44646 },
            { ano: '2017', mes: 'OUT', peso: 21930, acumuladoAno: 66576 },
            { ano: '2017', mes: 'NOV', peso: 4588, acumuladoAno: 71164 },
            { ano: '2017', mes: 'DEZ', peso: 18267, acumuladoAno: 89431 },
            // ... continuar com outros anos
        ];

        // Dados de doações
        this.data.doacoes = [
            { ano: '2017', mes: 'MAI', quantidade: 45, programa: 'Sustentare' },
            { ano: '2017', mes: 'NOV', quantidade: 24, programa: 'Sustentare' },
            // ... continuar com outros anos
        ];

        // Dados de recebedores
        this.data.recebedores = [
            { entidade: 'Secretaria Municipal de Educação de Porto Alegre', quantidade: 15, data: '2017-05-15', ano: '2017', mes: 'MAI' },
            { entidade: 'Superintendência dos Serviços Penitenciários', quantidade: 30, data: '2017-05-10', ano: '2017', mes: 'MAI' },
            // ... continuar com outros dados
        ];
    }

    initializeDataTables() {
        // Tabela de descaracterização
        if ($.fn.DataTable.isDataTable('#tabelaDescaracterizacao')) {
            $('#tabelaDescaracterizacao').DataTable().destroy();
        }
        
        this.tableDescaracterizacao = $('#tabelaDescaracterizacao').DataTable({
            data: this.data.descaracterizacao,
            columns: [
                { data: 'ano' },
                { data: 'mes' },
                { data: 'peso', render: $.fn.dataTable.render.number('.', ',', 0, '', ' Kg') },
                { data: 'acumuladoAno', render: $.fn.dataTable.render.number('.', ',', 0, '', ' Kg') },
                { 
                    data: null,
                    render: function(data, type, row) {
                        return '<span class="variation-positive">+5.2%</span>';
                    }
                }
            ],
            responsive: true,
            dom: 'Bfrtip',
            buttons: ['excel', 'pdf'],
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
            }
        });

        // Inicializar outras tabelas de forma similar...
    }

    initializeCharts() {
        this.createAnnualDescaracterizacaoChart();
        this.createAnnualDoacoesChart();
        this.createMateriaisChart();
    }

    createAnnualDescaracterizacaoChart() {
        const ctx = document.getElementById('chartDescaracterizacaoAnual').getContext('2d');
        
        const anos = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
        const totais = [89431, 182234, 160141, 240089, 157071, 204368, 309897, 229376, 159558];

        this.charts.descaracterizacaoAnual = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: anos,
                datasets: [{
                    label: 'Kg Descaracterizados',
                    data: totais,
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    borderColor: 'rgba(54, 162, 235, 1)',
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
                        display: true,
                        text: 'Evolução Anual da Descaracterização'
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
    }

    createAnnualDoacoesChart() {
        const ctx = document.getElementById('chartDoacoesAnual').getContext('2d');
        
        const anos =