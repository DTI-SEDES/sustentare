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
        this.loadAllData();
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

        // Filtros
        document.getElementById('filterAnoDescaracterizacao')?.addEventListener('change', () => this.filterDescaracterizacao());
        document.getElementById('filterMesDescaracterizacao')?.addEventListener('change', () => this.filterDescaracterizacao());
        
        document.getElementById('filterAnoDoacoes')?.addEventListener('change', () => this.filterDoacoes());
        document.getElementById('filterMesDoacoes')?.addEventListener('change', () => this.filterDoacoes());
        
        document.getElementById('filterAnoRecebedores')?.addEventListener('change', () => this.filterRecebedores());
        document.getElementById('filterEntidade')?.addEventListener('input', () => this.filterRecebedores());

        // Form submissions
        document.getElementById('formDescaracterizacao')?.addEventListener('submit', (e) => this.handleFormSubmit(e, 'descaracterizacao'));
        document.getElementById('formDoacao')?.addEventListener('submit', (e) => this.handleFormSubmit(e, 'doacao'));
        document.getElementById('formEntidade')?.addEventListener('submit', (e) => this.handleFormSubmit(e, 'entidade'));

        // Botões de exportação
        document.getElementById('btnExportDescaracterizacao')?.addEventListener('click', () => this.exportToCSV('descaracterizacao'));
        document.getElementById('btnExportDoacoes')?.addEventListener('click', () => this.exportToCSV('doacoes'));
        document.getElementById('btnExportRecebedores')?.addEventListener('click', () => this.exportToCSV('recebedores'));
        document.getElementById('btnImprimirLista')?.addEventListener('click', () => this.printList());
    }

    switchTab(tabName) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        this.currentTab = tabName;
        
        // Inicializar componentes quando abrir a aba
        setTimeout(() => {
            if (tabName === 'dashboard') {
                this.initializeDashboard();
            } else if (tabName === 'descaracterizacao') {
                this.initializeDescaracterizacao();
            } else if (tabName === 'doacoes') {
                this.initializeDoacoes();
            } else if (tabName === 'recebedores') {
                this.initializeRecebedores();
            } else if (tabName === 'materiais') {
                this.initializeMateriais();
            }
        }, 100);
    }

    switchForm(formName) {
        document.querySelectorAll('.form-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.data-form').forEach(form => form.classList.remove('active'));
        
        document.querySelector(`[data-form="${formName}"]`).classList.add('active');
        const formId = `form${formName.charAt(0).toUpperCase() + formName.slice(1)}`;
        document.getElementById(formId).classList.add('active');
    }

    loadAllData() {
        // Dados de descaracterização baseados na planilha
        this.loadDescaracterizacaoData();
        this.loadDoacoesData();
        this.loadRecebedoresData();
        this.loadMateriaisData();
    }

    loadDescaracterizacaoData() {
        // Dados mensais completos de 2017-2025
        this.data.descaracterizacao = [
            // 2017
            { ano: '2017', mes: 'JAN', peso: 0, mesNum: 1 },
            { ano: '2017', mes: 'FEV', peso: 0, mesNum: 2 },
            { ano: '2017', mes: 'MAR', peso: 0, mesNum: 3 },
            { ano: '2017', mes: 'ABR', peso: 656, mesNum: 4 },
            { ano: '2017', mes: 'MAI', peso: 5195, mesNum: 5 },
            { ano: '2017', mes: 'JUN', peso: 10285, mesNum: 6 },
            { ano: '2017', mes: 'JUL', peso: 14281, mesNum: 7 },
            { ano: '2017', mes: 'AGO', peso: 9392, mesNum: 8 },
            { ano: '2017', mes: 'SET', peso: 4837, mesNum: 9 },
            { ano: '2017', mes: 'OUT', peso: 21930, mesNum: 10 },
            { ano: '2017', mes: 'NOV', peso: 4588, mesNum: 11 },
            { ano: '2017', mes: 'DEZ', peso: 18267, mesNum: 12 },
            
            // 2018
            { ano: '2018', mes: 'JAN', peso: 12826, mesNum: 1 },
            { ano: '2018', mes: 'FEV', peso: 7247, mesNum: 2 },
            { ano: '2018', mes: 'MAR', peso: 17465, mesNum: 3 },
            { ano: '2018', mes: 'ABR', peso: 4284, mesNum: 4 },
            { ano: '2018', mes: 'MAI', peso: 10069, mesNum: 5 },
            { ano: '2018', mes: 'JUN', peso: 8692, mesNum: 6 },
            { ano: '2018', mes: 'JUL', peso: 15695, mesNum: 7 },
            { ano: '2018', mes: 'AGO', peso: 53658, mesNum: 8 },
            { ano: '2018', mes: 'SET', peso: 7000, mesNum: 9 },
            { ano: '2018', mes: 'OUT', peso: 16446, mesNum: 10 },
            { ano: '2018', mes: 'NOV', peso: 5164, mesNum: 11 },
            { ano: '2018', mes: 'DEZ', peso: 23688, mesNum: 12 },

            // 2023 (exemplo - adicionar outros anos)
            { ano: '2023', mes: 'JAN', peso: 24488, mesNum: 1 },
            { ano: '2023', mes: 'FEV', peso: 5615, mesNum: 2 },
            { ano: '2023', mes: 'MAR', peso: 32052, mesNum: 3 },
            { ano: '2023', mes: 'ABR', peso: 10205, mesNum: 4 },
            { ano: '2023', mes: 'MAI', peso: 24804, mesNum: 5 },
            { ano: '2023', mes: 'JUN', peso: 34541, mesNum: 6 },
            { ano: '2023', mes: 'JUL', peso: 46301, mesNum: 7 },
            { ano: '2023', mes: 'AGO', peso: 18743, mesNum: 8 },
            { ano: '2023', mes: 'SET', peso: 26033, mesNum: 9 },
            { ano: '2023', mes: 'OUT', peso: 44030, mesNum: 10 },
            { ano: '2023', mes: 'NOV', peso: 30781, mesNum: 11 },
            { ano: '2023', mes: 'DEZ', peso: 12304, mesNum: 12 }
        ];

        // Calcular acumulados anuais
        this.calcularAcumuladosDescaracterizacao();
    }

    calcularAcumuladosDescaracterizacao() {
        const anos = [...new Set(this.data.descaracterizacao.map(item => item.ano))];
        
        anos.forEach(ano => {
            const dadosAno = this.data.descaracterizacao.filter(item => item.ano === ano)
                .sort((a, b) => a.mesNum - b.mesNum);
            
            let acumulado = 0;
            dadosAno.forEach(item => {
                acumulado += item.peso;
                item.acumuladoAno = acumulado;
            });
        });
    }

    loadDoacoesData() {
        this.data.doacoes = [
            // 2017
            { ano: '2017', mes: 'MAI', quantidade: 45, programa: 'Sustentare', mesNum: 5 },
            { ano: '2017', mes: 'NOV', quantidade: 24, programa: 'Sustentare', mesNum: 11 },
            
            // 2018
            { ano: '2018', mes: 'JAN', quantidade: 11, programa: 'Sustentare', mesNum: 1 },
            { ano: '2018', mes: 'JUN', quantidade: 26, programa: 'Sustentare', mesNum: 6 },
            { ano: '2018', mes: 'AGO', quantidade: 17, programa: 'Sustentare', mesNum: 8 },
            { ano: '2018', mes: 'NOV', quantidade: 18, programa: 'Sustentare', mesNum: 11 },
            
            // 2023
            { ano: '2023', mes: 'FEV', quantidade: 58, programa: 'Sustentare', mesNum: 2 },
            { ano: '2023', mes: 'MAR', quantidade: 106, programa: 'Sustentare', mesNum: 3 },
            { ano: '2023', mes: 'ABR', quantidade: 39, programa: 'Sustentare', mesNum: 4 },
            { ano: '2023', mes: 'MAI', quantidade: 51, programa: 'Sustentare', mesNum: 5 },
            { ano: '2023', mes: 'JUN', quantidade: 93, programa: 'Sustentare', mesNum: 6 },
            { ano: '2023', mes: 'JUL', quantidade: 84, programa: 'Sustentare', mesNum: 7 },
            { ano: '2023', mes: 'AGO', quantidade: 70, programa: 'Sustentare', mesNum: 8 },
            { ano: '2023', mes: 'SET', quantidade: 60, programa: 'Sustentare', mesNum: 9 },
            { ano: '2023', mes: 'OUT', quantidade: 107, programa: 'Sustentare', mesNum: 10 },
            { ano: '2023', mes: 'NOV', quantidade: 15, programa: 'Sustentare', mesNum: 11 },
            { ano: '2023', mes: 'DEZ', quantidade: 74, programa: 'Sustentare', mesNum: 12 }
        ];

        this.calcularAcumuladosDoacoes();
    }

    calcularAcumuladosDoacoes() {
        const anos = [...new Set(this.data.doacoes.map(item => item.ano))];
        
        anos.forEach(ano => {
            const dadosAno = this.data.doacoes.filter(item => item.ano === ano)
                .sort((a, b) => a.mesNum - b.mesNum);
            
            let acumulado = 0;
            dadosAno.forEach(item => {
                acumulado += item.quantidade;
                item.acumuladoAno = acumulado;
            });
        });
    }

    loadRecebedoresData() {
        this.data.recebedores = [
            { entidade: 'Secretaria Municipal de Educação de Porto Alegre', quantidade: 15, data: '2017-05-15', ano: '2017', mes: 'MAI' },
            { entidade: 'Superintendência dos Serviços Penitenciários', quantidade: 30, data: '2017-05-10', ano: '2017', mes: 'MAI' },
            { entidade: 'TMA Sec. do Trib. de Med. e Arbitr.Sapiranga/RS', quantidade: 4, data: '2017-11-14', ano: '2017', mes: 'NOV' },
            { entidade: 'ASS. DE ASSUNTOS MUNICIPAIS - CASA CIVIL - RS', quantidade: 20, data: '2017-11-21', ano: '2017', mes: 'NOV' },
            
            { entidade: 'Corpo de Bombeiros Militar do RS', quantidade: 5, data: '2018-01-11', ano: '2018', mes: 'JAN' },
            { entidade: 'SDSTJDH', quantidade: 6, data: '2018-01-23', ano: '2018', mes: 'JAN' },
            { entidade: 'Associação Filhos Nascidos do Coração – AFINCO', quantidade: 10, data: '2018-05-10', ano: '2018', mes: 'MAI' },
            { entidade: 'OSICOM - Obra Social Imaculada Coração de Maria', quantidade: 16, data: '2018-05-10', ano: '2018', mes: 'MAI' },
            
            { entidade: 'APAE - Porto Alegre (Casa Civil)', quantidade: 25, data: '2023-02-03', ano: '2023', mes: 'FEV' },
            { entidade: 'Aldeias Infantis SOS - Porto Alegre', quantidade: 29, data: '2023-02-13', ano: '2023', mes: 'FEV' },
            { entidade: 'EMEI GIRASOL', quantidade: 4, data: '2023-02-27', ano: '2023', mes: 'FEV' },
            { entidade: 'Sec Justiça, Cidadania e DH (EDP)', quantidade: 62, data: '2023-03-08', ano: '2023', mes: 'MAR' }
        ];
    }

    loadMateriaisData() {
        this.data.materiais = [
            { material: 'Alumínio', peso: 233152.92, percentual: 13 },
            { material: 'Cobre', peso: 143478.72, percentual: 8 },
            { material: 'Ferro', peso: 663589.08, percentual: 37 },
            { material: 'Plástico', peso: 376631.64, percentual: 21 },
            { material: 'Placas de circuito', peso: 143478.72, percentual: 8 },
            { material: 'Vidro', peso: 125543.88, percentual: 7 },
            { material: 'Papelão', peso: 53804.52, percentual: 3 },
            { material: 'Outros', peso: 53804.52, percentual: 3 }
        ];
    }

    populateYearFilters() {
        const anos = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
        const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
        
        // Popular filtros de ano
        const yearSelectors = [
            'filterAnoDescaracterizacao', 'filterAnoDoacoes', 'filterAnoRecebedores',
            'anoDescaracterizacao', 'anoDoacao', 'anoEntidade'
        ];
        
        yearSelectors.forEach(selector => {
            const element = document.getElementById(selector);
            if (element) {
                element.innerHTML = '<option value="">Todos os anos</option>' +
                    anos.map(ano => `<option value="${ano}">${ano}</option>`).join('');
            }
        });
        
        // Popular filtros de mês
        const monthSelectors = [
            'filterMesDescaracterizacao', 'filterMesDoacoes',
            'mesDescaracterizacao', 'mesDoacao'
        ];
        
        monthSelectors.forEach(selector => {
            const element = document.getElementById(selector);
            if (element) {
                element.innerHTML = '<option value="">Todos os meses</option>' +
                    meses.map((mes, index) => `<option value="${mes}">${mes}</option>`).join('');
            }
        });
    }

    initializeDashboard() {
        this.createAnnualDescaracterizacaoChart();
        this.createAnnualDoacoesChart();
        this.createMateriaisChart();
        this.updateResumoAnual();
        this.updateTopEntidades();
    }

    initializeDescaracterizacao() {
        if (this.tableDescaracterizacao) {
            this.tableDescaracterizacao.destroy();
        }
        
        this.tableDescaracterizacao = $('#tabelaDescaracterizacao').DataTable({
            data: this.data.descaracterizacao,
            columns: [
                { data: 'ano' },
                { data: 'mes' },
                { 
                    data: 'peso',
                    render: (data) => data.toLocaleString('pt-BR') + ' Kg'
                },
                { 
                    data: 'acumuladoAno',
                    render: (data) => data.toLocaleString('pt-BR') + ' Kg'
                },
                { 
                    data: null,
                    render: (data, type, row) => {
                        return this.calcularVariacaoMensal(row);
                    }
                }
            ],
            responsive: true,
            dom: 'Bfrtip',
            buttons: ['excel', 'pdf'],
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
            },
            order: [[0, 'desc'], [1, 'asc']]
        });
    }

    initializeDoacoes() {
        if (this.tableDoacoes) {
            this.tableDoacoes.destroy();
        }
        
        this.tableDoacoes = $('#tabelaDoacoes').DataTable({
            data: this.data.doacoes,
            columns: [
                { data: 'ano' },
                { data: 'mes' },
                { data: 'quantidade' },
                { 
                    data: 'acumuladoAno',
                    render: (data) => data ? data.toString() : '-'
                },
                { data: 'programa' }
            ],
            responsive: true,
            dom: 'Bfrtip',
            buttons: ['excel', 'pdf'],
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
            },
            order: [[0, 'desc'], [1, 'asc']]
        });
    }

    initializeRecebedores() {
        if (this.tableRecebedores) {
            this.tableRecebedores.destroy();
        }
        
        this.tableRecebedores = $('#tabelaRecebedores').DataTable({
            data: this.data.recebedores,
            columns: [
                { data: 'entidade' },
                { data: 'quantidade' },
                { 
                    data: 'data',
                    render: (data) => new Date(data).toLocaleDateString('pt-BR')
                },
                { data: 'ano' },
                { data: 'mes' }
            ],
            responsive: true,
            dom: 'Bfrtip',
            buttons: ['excel', 'pdf'],
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
            },
            order: [[2, 'desc']]
        });
    }

    initializeMateriais() {
        this.createMateriaisChart();
    }

    calcularVariacaoMensal(row) {
        // Encontrar mês anterior
        const mesAnterior = this.data.descaracterizacao.find(item => 
            item.ano === row.ano && item.mesNum === row.mesNum - 1
        );
        
        if (!mesAnterior || mesAnterior.peso === 0) return '-';
        
        const variacao = ((row.peso - mesAnterior.peso) / mesAnterior.peso * 100);
        const classe = variacao >= 0 ? 'variation-positive' : 'variation-negative';
        const simbolo = variacao >= 0 ? '+' : '';
        
        return `<span class="${classe}">${simbolo}${variacao.toFixed(1)}%</span>`;
    }

    createAnnualDescaracterizacaoChart() {
        const ctx = document.getElementById('chartDescaracterizacaoAnual');
        if (!ctx) return;
        
        // Destruir chart existente
        if (this.charts.descaracterizacaoAnual) {
            this.charts.descaracterizacaoAnual.destroy();
        }
        
        const anos = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
        const totais = [89431, 182234, 160141, 240089, 157071, 204368, 309897, 229376];
        
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
        const ctx = document.getElementById('chartDoacoesAnual');
        if (!ctx) return;
        
        if (this.charts.doacoesAnual) {
            this.charts.doacoesAnual.destroy();
        }
        
        const anos = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
        const totais = [69, 72, 213, 108, 126, 293, 757];
        
        this.charts.doacoesAnual = new Chart(ctx, {
            type: 'line',
            data: {
                labels: anos,
                datasets: [{
                    label: 'Computadores Doados',
                    data: totais,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
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
                        text: 'Evolução Anual das Doações'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Quantidade'
                        }
                    }
                }
            }
        });
    }

    createMateriaisChart() {
        const ctx = document.getElementById('chartMateriais');
        if (!ctx) return;
        
        if (this.charts.materiais) {
            this.charts.materiais.destroy();
        }
        
        const labels = this.data.materiais.map(item => item.material);
        const data = this.data.materiais.map(item => item.peso);
        const backgroundColors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
            '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
        ];
        
        this.charts.materiais = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: 'Distribuição dos Materiais Reciclados'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value.toLocaleString('pt-BR')} Kg (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    updateResumoAnual() {
        const anos = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
        const totais = [89431, 182234, 160141, 240089, 157071, 204368, 309897];
        
        const tabelaData = anos.map((ano, index) => {
            const total = totais[index];
            const anterior = index > 0 ? totais[index - 1] : 0;
            const variacao = index > 0 ? ((total - anterior) / anterior * 100).toFixed(1) + '%' : '-';
            const media = (total / 12).toFixed(0);
            
            return {
                ano: ano,
                total: total.toLocaleString('pt-BR') + ' Kg',
                variacao: variacao,
                media: media + ' Kg/mês'
            };
        });
        
        $('#tabelaResumoAnual').DataTable({
            data: tabelaData,
            columns: [
                { data: 'ano' },
                { data: 'total' },
                { 
                    data: 'variacao',
                    render: (data) => {
                        if (data === '-') return data;
                        const isPositive = !data.includes('-');
                        const classe = isPositive ? 'variation-positive' : 'variation-negative';
                        return `<span class="${classe}">${data}</span>`;
                    }
                },
                { data: 'media' }
            ],
            searching: false,
            paging: false,
            info: false,
            order: [[0, 'desc']]
        });
    }

    updateTopEntidades() {
        // Agrupar por entidade
        const entidadesMap = new Map();
        this.data.recebedores.forEach(item => {
            if (entidadesMap.has(item.entidade)) {
                entidadesMap.set(item.entidade, entidadesMap.get(item.entidade) + item.quantidade);
            } else {
                entidadesMap.set(item.entidade, item.quantidade);
            }
        });
        
        const topEntidades = Array.from(entidadesMap.entries())
            .map(([entidade, total]) => ({ entidade, total }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 10);
        
        $('#tabelaTopEntidades').DataTable({
            data: topEntidades,
            columns: [
                { data: 'entidade' },
                { data: 'total' },
                { 
                    data: null,
                    render: () => '2023' // Simplificado - poderia buscar a última data
                }
            ],
            searching: false,
            paging: false,
            info: false
        });
    }

    filterDescaracterizacao() {
        const ano = document.getElementById('filterAnoDescaracterizacao').value;
        const mes = document.getElementById('filterMesDescaracterizacao').value;
        
        let filteredData = this.data.descaracterizacao;
        
        if (ano) {
            filteredData = filteredData.filter(item => item.ano === ano);
        }
        
        if (mes) {
            filteredData = filteredData.filter(item => item.mes === mes);
        }
        
        this.tableDescaracterizacao.clear().rows.add(filteredData).draw();
    }

    filterDoacoes() {
        const ano = document.getElementById('filterAnoDoacoes').value;
        const mes = document.getElementById('filterMesDoacoes').value;
        
        let filteredData = this.data.doacoes;
        
        if (ano) {
            filteredData = filteredData.filter(item => item.ano === ano);
        }
        
        if (mes) {
            filteredData = filteredData.filter(item => item.mes === mes);
        }
        
        this.tableDoacoes.clear().rows.add(filteredData).draw();
    }

    filterRecebedores() {
        const ano = document.getElementById('filterAnoRecebedores').value;
        const entidade = document.getElementById('filterEntidade').value.toLowerCase();
        
        let filteredData = this.data.recebedores;
        
        if (ano) {
            filteredData = filteredData.filter(item => item.ano === ano);
        }
        
        if (entidade) {
            filteredData = filteredData.filter(item => 
                item.entidade.toLowerCase().includes(entidade)
            );
        }
        
        this.tableRecebedores.clear().rows.add(filteredData).draw();
    }

    handleFormSubmit(e, tipo) {
        e.preventDefault();
        
        switch(tipo) {
            case 'descaracterizacao':
                this.adicionarDescaracterizacao();
                break;
            case 'doacao':
                this.adicionarDoacao();
                break;
            case 'entidade':
                this.adicionarEntidade();
                break;
        }
        
        e.target.reset();
        alert('Dado adicionado com sucesso!');
    }

    adicionarDescaracterizacao() {
        const ano = document.getElementById('anoDescaracterizacao').value;
        const mes = document.getElementById('mesDescaracterizacao').value;
        const peso = parseFloat(document.getElementById('pesoKg').value);
        
        const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
        const mesNum = meses.indexOf(mes) + 1;
        
        const novoDado = { ano, mes, peso, mesNum };
        this.data.descaracterizacao.push(novoDado);
        this.calcularAcumuladosDescaracterizacao();
        
        if (this.currentTab === 'descaracterizacao') {
            this.initializeDescaracterizacao();
        }
    }

    adicionarDoacao() {
        const ano = document.getElementById('anoDoacao').value;
        const mes = document.getElementById('mesDoacao').value;
        const quantidade = parseInt(document.getElementById('quantidadeDoacao').value);
        const programa = document.getElementById('programaDoacao').value;
        
        const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
        const mesNum = meses.indexOf(mes) + 1;
        
        const novoDado = { ano, mes, quantidade, programa, mesNum };
        this.data.doacoes.push(novoDado);
        this.calcularAcumuladosDoacoes();
        
        if (this.currentTab === 'doacoes') {
            this.initializeDoacoes();
        }
    }

    adicionarEntidade() {
        const entidade = document.getElementById('nomeEntidade').value;
        const quantidade = parseInt(document.getElementById('quantidadeEntidade').value);
        const data = document.getElementById('dataEntrega').value;
        const ano = document.getElementById('anoEntidade').value;
        
        const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
        const dataObj = new Date(data);
        const mes = meses[dataObj.getMonth()];
        
        const novoDado = { entidade, quantidade, data, ano, mes };
        this.data.recebedores.push(novoDado);
        
        if (this.currentTab === 'recebedores') {
            this.initializeRecebedores();
        }
    }

    exportToCSV(tipo) {
        let data, filename;
        
        switch(tipo) {
            case 'descaracterizacao':
                data = this.data.descaracterizacao;
                filename = 'descaracterizacao.csv';
                break;
            case 'doacoes':
                data = this.data.doacoes;
                filename = 'doacoes.csv';
                break;
            case 'recebedores':
                data = this.data.recebedores;
                filename = 'recebedores.csv';
                break;
        }
        
        const csv = this.convertToCSV(data);
        this.downloadCSV(csv, filename);
    }

    convertToCSV(data) {
        if (data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        for (const row of data) {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '""');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }
        
        return csvRows.join('\n');
    }

    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    printList() {
        window.print();
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    window.app = new GestaoResiduosApp();
});
