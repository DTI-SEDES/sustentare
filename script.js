console.log('=== PROGRAMA SUSTENTARE - CARREGANDO ===');

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
        console.log('🚀 Iniciando aplicação Sustentare...');
        this.loadAllData();
        this.setupEventListeners();
        this.initializeDashboard();
        console.log('✅ Aplicação iniciada com sucesso!');
    }

    loadAllData() {
        console.log('📂 Carregando dados...');
        this.loadDescaracterizacaoData();
        this.loadDoacoesData();
        this.loadRecebedoresData();
        this.loadMateriaisData();
    }

    loadDescaracterizacaoData() {
        this.data.descaracterizacao = [
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
            { ano: '2023', mes: 'DEZ', peso: 12304, mesNum: 12 },
            { ano: '2024', mes: 'JAN', peso: 17913, mesNum: 1 },
            { ano: '2024', mes: 'FEV', peso: 11009, mesNum: 2 },
            { ano: '2024', mes: 'MAR', peso: 12368, mesNum: 3 },
            { ano: '2024', mes: 'ABR', peso: 15410, mesNum: 4 },
            { ano: '2024', mes: 'MAI', peso: 12141, mesNum: 5 },
            { ano: '2024', mes: 'JUN', peso: 13208, mesNum: 6 },
            { ano: '2024', mes: 'JUL', peso: 28139, mesNum: 7 },
            { ano: '2024', mes: 'AGO', peso: 36881, mesNum: 8 },
            { ano: '2024', mes: 'SET', peso: 23867, mesNum: 9 },
            { ano: '2024', mes: 'OUT', peso: 30535, mesNum: 10 },
            { ano: '2024', mes: 'NOV', peso: 13460, mesNum: 11 },
            { ano: '2024', mes: 'DEZ', peso: 14445, mesNum: 12 }
        ];
    }

    loadDoacoesData() {
        this.data.doacoes = [
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
            { ano: '2023', mes: 'DEZ', quantidade: 74, programa: 'Sustentare', mesNum: 12 },
            { ano: '2024', mes: 'JAN', quantidade: 25, programa: 'Sustentare', mesNum: 1 },
            { ano: '2024', mes: 'FEV', quantidade: 55, programa: 'Sustentare', mesNum: 2 },
            { ano: '2024', mes: 'MAR', quantidade: 120, programa: 'Sustentare', mesNum: 3 },
            { ano: '2024', mes: 'ABR', quantidade: 42, programa: 'Sustentare', mesNum: 4 },
            { ano: '2024', mes: 'JUN', quantidade: 49, programa: 'Sustentare', mesNum: 6 },
            { ano: '2024', mes: 'JUL', quantidade: 47, programa: 'Sustentare', mesNum: 7 },
            { ano: '2024', mes: 'AGO', quantidade: 70, programa: 'Sustentare', mesNum: 8 },
            { ano: '2024', mes: 'SET', quantidade: 99, programa: 'Sustentare', mesNum: 9 },
            { ano: '2024', mes: 'OUT', quantidade: 154, programa: 'Sustentare', mesNum: 10 },
            { ano: '2024', mes: 'NOV', quantidade: 408, programa: 'Sustentare', mesNum: 11 }
        ];
    }

    loadRecebedoresData() {
        this.data.recebedores = [
            { entidade: 'APAE - Porto Alegre (Casa Civil)', quantidade: 25, data: '2023-02-03', ano: '2023', mes: 'FEV' },
            { entidade: 'Aldeias Infantis SOS - Porto Alegre', quantidade: 29, data: '2023-02-13', ano: '2023', mes: 'FEV' },
            { entidade: 'EMEI GIRASOL', quantidade: 4, data: '2023-02-27', ano: '2023', mes: 'FEV' },
            { entidade: 'Sec Justiça, Cidadania e DH (EDP)', quantidade: 62, data: '2023-03-08', ano: '2023', mes: 'MAR' },
            { entidade: 'APAE - Canoas (Casa Civil)', quantidade: 15, data: '2023-03-28', ano: '2023', mes: 'MAR' },
            { entidade: 'SICT (PGE)', quantidade: 30, data: '2023-04-19', ano: '2023', mes: 'ABR' },
            { entidade: 'Secretaria de Saúde de Tavares', quantidade: 10, data: '2023-05-29', ano: '2023', mes: 'MAI' },
            { entidade: 'Sec Mun de Assist Social e Hab - Candelária', quantidade: 15, data: '2023-06-26', ano: '2023', mes: 'JUN' },
            { entidade: '18º BPM Viamão', quantidade: 10, data: '2023-08-24', ano: '2023', mes: 'AGO' },
            { entidade: 'Prefeitura de Ibarama', quantidade: 20, data: '2023-10-10', ano: '2023', mes: 'OUT' },
            { entidade: 'Sec Mun de Educação de Lagoa Vermelha', quantidade: 10, data: '2024-01-24', ano: '2024', mes: 'JAN' },
            { entidade: '18º BPM Viamão', quantidade: 30, data: '2024-02-28', ano: '2024', mes: 'FEV' },
            { entidade: 'Prefeitura de Santana do Livramento', quantidade: 20, data: '2024-03-26', ano: '2024', mes: 'MAR' },
            { entidade: 'EEEM Profª Maria Rocha', quantidade: 50, data: '2024-03-26', ano: '2024', mes: 'MAR' },
            { entidade: 'FPERS', quantidade: 30, data: '2024-06-14', ano: '2024', mes: 'JUN' },
            { entidade: 'Prefeitura de Balneário Pinhal', quantidade: 30, data: '2024-07-01', ano: '2024', mes: 'JUL' },
            { entidade: 'Secretaria de Assistência Social de São Leopoldo', quantidade: 15, data: '2024-08-23', ano: '2024', mes: 'AGO' },
            { entidade: '18º BPM de Viamão', quantidade: 15, data: '2024-08-28', ano: '2024', mes: 'AGO' },
            { entidade: 'Secretaria de Desenvolvimento Social', quantidade: 81, data: '2024-09-17', ano: '2024', mes: 'SET' },
            { entidade: 'Prefeitura de Ibiaçá', quantidade: 15, data: '2024-09-19', ano: '2024', mes: 'SET' }
        ];
    }

    loadMateriaisData() {
        this.data.materiais = [
            { material: 'Ferro', peso: 663589.08, percentual: 37 },
            { material: 'Plástico', peso: 376631.64, percentual: 21 },
            { material: 'Alumínio', peso: 233152.92, percentual: 13 },
            { material: 'Cobre', peso: 143478.72, percentual: 8 },
            { material: 'Placas de Circuito', peso: 143478.72, percentual: 8 },
            { material: 'Vidro', peso: 125543.88, percentual: 7 },
            { material: 'Papelão', peso: 53804.52, percentual: 3 },
            { material: 'Outros', peso: 53804.52, percentual: 3 }
        ];
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

        // Filtros
        document.getElementById('filterAnoDescaracterizacao')?.addEventListener('change', () => this.filterDescaracterizacao());
        document.getElementById('filterMesDescaracterizacao')?.addEventListener('change', () => this.filterDescaracterizacao());
        
        document.getElementById('filterAnoDoacoes')?.addEventListener('change', () => this.filterDoacoes());
        document.getElementById('filterMesDoacoes')?.addEventListener('change', () => this.filterDoacoes());
        
        document.getElementById('filterAnoRecebedores')?.addEventListener('change', () => this.filterRecebedores());
        document.getElementById('filterEntidade')?.addEventListener('input', () => this.filterRecebedores());

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
                this.initializeDescaracterizacao();
                break;
            case 'doacoes':
                this.initializeDoacoes();
                break;
            case 'recebedores':
                this.initializeRecebedores();
                break;
            case 'materiais':
                this.initializeMateriais();
                break;
            case 'novo-dado':
                this.initializeNovoDado();
                break;
        }
    }

    initializeDashboard() {
        console.log('📈 Inicializando Dashboard...');
        this.createDashboardCharts();
        this.initializeDashboardTables();
    }

    initializeDescaracterizacao() {
        console.log('🗑️ Inicializando Descaracterização...');
        this.createDescaracterizacaoContent();
    }

    initializeDoacoes() {
        console.log('💻 Inicializando Doações...');
        this.createDoacoesContent();
    }

    initializeRecebedores() {
        console.log('🏢 Inicializando Entidades...');
        this.createRecebedoresContent();
    }

    initializeMateriais() {
        console.log('🔧 Inicializando Materiais...');
        this.createMateriaisContent();
    }

    initializeNovoDado() {
        console.log('➕ Inicializando Novo Dado...');
        this.createNovoDadoContent();
    }

    createDescaracterizacaoContent() {
        const content = document.getElementById('descaracterizacao');
        if (!content) return;

        content.innerHTML = `
            <h2>🗑️ Dados de Descaracterização</h2>
            
            <div class="filters-row">
                <select id="filterAnoDescaracterizacao">
                    <option value="">Todos os anos</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                </select>
                <select id="filterMesDescaracterizacao">
                    <option value="">Todos os meses</option>
                    <option value="JAN">Janeiro</option>
                    <option value="FEV">Fevereiro</option>
                    <option value="MAR">Março</option>
                    <option value="ABR">Abril</option>
                    <option value="MAI">Maio</option>
                    <option value="JUN">Junho</option>
                    <option value="JUL">Julho</option>
                    <option value="AGO">Agosto</option>
                    <option value="SET">Setembro</option>
                    <option value="OUT">Outubro</option>
                    <option value="NOV">Novembro</option>
                    <option value="DEZ">Dezembro</option>
                </select>
                <button id="btnExportDescaracterizacao" class="btn-export">📥 Exportar CSV</button>
            </div>

            <div class="table-responsive">
                <table id="tabelaDescaracterizacao" class="compact display" style="width:100%">
                    <thead>
                        <tr>
                            <th>Ano</th>
                            <th>Mês</th>
                            <th>Peso (Kg)</th>
                            <th>Acumulado Anual</th>
                            <th>Variação</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.data.descaracterizacao.map(item => `
                            <tr>
                                <td>${item.ano}</td>
                                <td>${item.mes}</td>
                                <td>${item.peso.toLocaleString('pt-BR')}</td>
                                <td>${this.calcularAcumuladoAnual(item.ano, item.mesNum).toLocaleString('pt-BR')}</td>
                                <td>${this.calcularVariacao(item.ano, item.mesNum)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="chart-container-full">
                <h3>Evolução Mensal da Descaracterização</h3>
                <canvas id="chartDescaracterizacaoDetalhado" width="400" height="200"></canvas>
            </div>
        `;

        // Inicializar DataTable
        this.initializeDescaracterizacaoTable();
        // Inicializar gráfico
        this.createDescaracterizacaoDetalhadoChart();
        // Reconfigurar event listeners dos filtros
        this.setupFilterListeners();
    }

    createDoacoesContent() {
        const content = document.getElementById('doacoes');
        if (!content) return;

        content.innerHTML = `
            <h2>💻 Doações de Computadores</h2>
            
            <div class="filters-row">
                <select id="filterAnoDoacoes">
                    <option value="">Todos os anos</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                </select>
                <select id="filterMesDoacoes">
                    <option value="">Todos os meses</option>
                    <option value="JAN">Janeiro</option>
                    <option value="FEV">Fevereiro</option>
                    <option value="MAR">Março</option>
                    <option value="ABR">Abril</option>
                    <option value="MAI">Maio</option>
                    <option value="JUN">Junho</option>
                    <option value="JUL">Julho</option>
                    <option value="AGO">Agosto</option>
                    <option value="SET">Setembro</option>
                    <option value="OUT">Outubro</option>
                    <option value="NOV">Novembro</option>
                    <option value="DEZ">Dezembro</option>
                </select>
                <button id="btnExportDoacoes" class="btn-export">📥 Exportar CSV</button>
            </div>

            <div class="table-responsive">
                <table id="tabelaDoacoes" class="compact display" style="width:100%">
                    <thead>
                        <tr>
                            <th>Ano</th>
                            <th>Mês</th>
                            <th>Quantidade</th>
                            <th>Programa</th>
                            <th>Acumulado Anual</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.data.doacoes.map(item => `
                            <tr>
                                <td>${item.ano}</td>
                                <td>${item.mes}</td>
                                <td>${item.quantidade}</td>
                                <td>${item.programa}</td>
                                <td>${this.calcularAcumuladoDoacoes(item.ano, item.mesNum)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="info-box">
                <h4>📋 Resumo dos Programas de Doação</h4>
                <div class="programas-grid">
                    <div class="programa-card">
                        <h5>Sustentare Direto</h5>
                        <div class="programa-value">3.616</div>
                        <div class="programa-desc">computadores</div>
                    </div>
                    <div class="programa-card">
                        <h5>Sustentare/SEDES</h5>
                        <div class="programa-value">1.290</div>
                        <div class="programa-desc">computadores</div>
                    </div>
                    <div class="programa-card">
                        <h5>Sustentare/BANRISUL</h5>
                        <div class="programa-value">9.467</div>
                        <div class="programa-desc">computadores</div>
                    </div>
                    <div class="programa-card total">
                        <h5>Total Geral</h5>
                        <div class="programa-value">14.373</div>
                        <div class="programa-desc">computadores</div>
                    </div>
                </div>
            </div>
        `;

        this.initializeDoacoesTable();
        this.setupFilterListeners();
    }

    createRecebedoresContent() {
        const content = document.getElementById('recebedores');
        if (!content) return;

        content.innerHTML = `
            <h2>🏢 Entidades Beneficiadas</h2>
            
            <div class="filters-row">
                <select id="filterAnoRecebedores">
                    <option value="">Todos os anos</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                </select>
                <input type="text" id="filterEntidade" placeholder="Buscar entidade...">
                <button id="btnExportRecebedores" class="btn-export">📥 Exportar CSV</button>
                <button id="btnImprimirLista" class="btn-print">🖨️ Imprimir Lista</button>
            </div>

            <div class="table-responsive">
                <table id="tabelaRecebedores" class="compact display" style="width:100%">
                    <thead>
                        <tr>
                            <th>Entidade</th>
                            <th>Quantidade</th>
                            <th>Data Entrega</th>
                            <th>Ano</th>
                            <th>Mês</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.data.recebedores.map(item => `
                            <tr>
                                <td>${item.entidade}</td>
                                <td>${item.quantidade}</td>
                                <td>${new Date(item.data).toLocaleDateString('pt-BR')}</td>
                                <td>${item.ano}</td>
                                <td>${item.mes}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="charts-grid">
                <div class="chart-container">
                    <h3>Top 10 Entidades por Quantidade</h3>
                    <canvas id="chartTopEntidades" width="400" height="300"></canvas>
                </div>
                <div class="chart-container">
                    <h3>Distribuição por Ano</h3>
                    <canvas id="chartEntidadesAno" width="400" height="300"></canvas>
                </div>
            </div>
        `;

        this.initializeRecebedoresTable();
        this.createRecebedoresCharts();
        this.setupFilterListeners();
    }

    createMateriaisContent() {
        const content = document.getElementById('materiais');
        if (!content) return;

        content.innerHTML = `
            <h2>🔧 Materiais Reciclados</h2>
            
            <div class="materials-grid">
                ${this.data.materiais.map(item => `
                    <div class="material-card">
                        <h3>${item.material}</h3>
                        <div class="material-value">${item.peso.toLocaleString('pt-BR')} Kg</div>
                        <div class="material-percent">${item.percentual}% do total</div>
                    </div>
                `).join('')}
            </div>

            <div class="charts-grid">
                <div class="chart-container">
                    <h3>Distribuição por Material</h3>
                    <canvas id="chartMateriaisDetalhado" width="400" height="300"></canvas>
                </div>
                <div class="chart-container">
                    <h3>Composição Percentual</h3>
                    <canvas id="chartMateriaisPercentual" width="400" height="300"></canvas>
                </div>
            </div>

            <div class="table-responsive">
                <table id="tabelaMateriaisCompleta" class="compact display" style="width:100%">
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Peso (Kg)</th>
                            <th>Percentual</th>
                            <th>Valor Estimado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.data.materiais.map(item => `
                            <tr>
                                <td>${item.material}</td>
                                <td>${item.peso.toLocaleString('pt-BR')}</td>
                                <td>${item.percentual}%</td>
                                <td>R$ ${this.calcularValorEstimado(item.peso).toLocaleString('pt-BR')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        this.initializeMateriaisTable();
        this.createMateriaisCharts();
    }

    createNovoDadoContent() {
        const content = document.getElementById('novo-dado');
        if (!content) return;

        content.innerHTML = `
            <h2>➕ Incluir Novo Dado</h2>
            
            <div class="form-container">
                <div class="form-tabs">
                    <button class="form-tab-btn active" data-form="descaracterizacao">Descaracterização</button>
                    <button class="form-tab-btn" data-form="doacao">Doação</button>
                    <button class="form-tab-btn" data-form="entidade">Nova Entidade</button>
                </div>

                <form id="formDescaracterizacao" class="data-form active">
                    <div class="form-group">
                        <label for="anoDescaracterizacao">Ano:</label>
                        <select id="anoDescaracterizacao" required>
                            <option value="">Selecione o ano</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mesDescaracterizacao">Mês:</label>
                        <select id="mesDescaracterizacao" required>
                            <option value="">Selecione o mês</option>
                            <option value="JAN">Janeiro</option>
                            <option value="FEV">Fevereiro</option>
                            <option value="MAR">Março</option>
                            <option value="ABR">Abril</option>
                            <option value="MAI">Maio</option>
                            <option value="JUN">Junho</option>
                            <option value="JUL">Julho</option>
                            <option value="AGO">Agosto</option>
                            <option value="SET">Setembro</option>
                            <option value="OUT">Outubro</option>
                            <option value="NOV">Novembro</option>
                            <option value="DEZ">Dezembro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="pesoKg">Peso (Kg):</label>
                        <input type="number" id="pesoKg" step="0.01" required>
                    </div>
                    <button type="submit" class="btn-submit">➕ Adicionar Dado</button>
                </form>

                <form id="formDoacao" class="data-form">
                    <div class="form-group">
                        <label for="anoDoacao">Ano:</label>
                        <select id="anoDoacao" required>
                            <option value="">Selecione o ano</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mesDoacao">Mês:</label>
                        <select id="mesDoacao" required>
                            <option value="">Selecione o mês</option>
                            <option value="JAN">Janeiro</option>
                            <option value="FEV">Fevereiro</option>
                            <option value="MAR">Março</option>
                            <option value="ABR">Abril</option>
                            <option value="MAI">Maio</option>
                            <option value="JUN">Junho</option>
                            <option value="JUL">Julho</option>
                            <option value="AGO">Agosto</option>
                            <option value="SET">Setembro</option>
                            <option value="OUT">Outubro</option>
                            <option value="NOV">Novembro</option>
                            <option value="DEZ">Dezembro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="quantidadeDoacao">Quantidade:</label>
                        <input type="number" id="quantidadeDoacao" required>
                    </div>
                    <div class="form-group">
                        <label for="programaDoacao">Programa:</label>
                        <select id="programaDoacao" required>
                            <option value="Sustentare">Sustentare</option>
                            <option value="Sustentare/SEDES">Sustentare/SEDES</option>
                            <option value="Sustentare/BANRISUL">Sustentare/BANRISUL</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-submit">➕ Adicionar Doação</button>
                </form>

                <form id="formEntidade" class="data-form">
                    <div class="form-group">
                        <label for="nomeEntidade">Nome da Entidade:</label>
                        <input type="text" id="nomeEntidade" required>
                    </div>
                    <div class="form-group">
                        <label for="quantidadeEntidade">Quantidade:</label>
                        <input type="number" id="quantidadeEntidade" required>
                    </div>
                    <div class="form-group">
                        <label for="dataEntrega">Data da Entrega:</label>
                        <input type="date" id="dataEntrega" required>
                    </div>
                    <div class="form-group">
                        <label for="anoEntidade">Ano:</label>
                        <select id="anoEntidade" required>
                            <option value="">Selecione o ano</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-submit">➕ Cadastrar Entidade</button>
                </form>
            </div>
        `;

        this.setupFormListeners();
    }

    // ... (os métodos restantes de inicialização de tabelas, gráficos e cálculos continuam aqui)
    // [Manter todos os outros métodos existentes: initializeDataTables, createDashboardCharts, etc.]
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CARREGADO - INICIANDO APLICAÇÃO ===');
    window.app = new GestaoResiduosApp();
});
