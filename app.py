# app.py - Aplicativo Principal do Programa Sustentare
import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import io
import warnings
warnings.filterwarnings('ignore')

# Configuração da página
st.set_page_config(
    page_title="Sustentare - DTI/SEDES",
    page_icon="♻️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# CSS personalizado
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        color: #1E88E5;
        text-align: center;
        margin-bottom: 2rem;
    }
    .section-header {
        font-size: 1.5rem;
        color: #2E7D32;
        border-bottom: 2px solid #4CAF50;
        padding-bottom: 0.5rem;
        margin-top: 2rem;
    }
    .metric-card {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 10px;
        border-left: 4px solid #4CAF50;
        margin: 10px 0;
    }
    .upload-box {
        border: 2px dashed #4CAF50;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
        background-color: #f8fff8;
        margin: 10px 0;
    }
    .success-box {
        border: 2px solid #4CAF50;
        border-radius: 10px;
        padding: 15px;
        background-color: #f0fff0;
        margin: 10px 0;
    }
</style>
""", unsafe_allow_html=True)

class DataProcessor:
    """Classe para processar e validar dados do Sustentare"""
    
    @staticmethod
    def process_destinacao_data(df):
        """Processa dados de destinação"""
        required_columns = ['Ano', 'Mês', 'Peso_kg']
        
        # Verificar colunas necessárias
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            raise ValueError(f"Colunas obrigatórias faltando: {missing_columns}")
        
        # Converter tipos de dados
        df['Ano'] = pd.to_numeric(df['Ano'], errors='coerce')
        df['Peso_kg'] = pd.to_numeric(df['Peso_kg'], errors='coerce')
        
        # Remover linhas com valores NaN nas colunas críticas
        df = df.dropna(subset=['Ano', 'Peso_kg'])
        
        # Validar meses
        meses_validos = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
        df = df[df['Mês'].isin(meses_validos)]
        
        return df
    
    @staticmethod
    def process_doacao_data(df):
        """Processa dados de doação"""
        required_columns = ['Ano', 'Mês', 'Quantidade']
        
        # Verificar colunas necessárias
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            raise ValueError(f"Colunas obrigatórias faltando: {missing_columns}")
        
        # Converter tipos de dados
        df['Ano'] = pd.to_numeric(df['Ano'], errors='coerce')
        df['Quantidade'] = pd.to_numeric(df['Quantidade'], errors='coerce')
        
        # Remover linhas com valores NaN nas colunas críticas
        df = df.dropna(subset=['Ano', 'Quantidade'])
        
        # Validar meses
        meses_validos = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
        df = df[df['Mês'].isin(meses_validos)]
        
        return df
    
    @staticmethod
    def process_recebedores_data(df):
        """Processa dados de recebedores"""
        required_columns = ['Ano', 'Recebedor', 'Quantidade']
        
        # Verificar colunas necessárias
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            raise ValueError(f"Colunas obrigatórias faltando: {missing_columns}")
        
        # Converter tipos de dados
        df['Ano'] = pd.to_numeric(df['Ano'], errors='coerce')
        df['Quantidade'] = pd.to_numeric(df['Quantidade'], errors='coerce')
        
        # Remover linhas com valores NaN nas colunas críticas
        df = df.dropna(subset=['Ano', 'Recebedor', 'Quantidade'])
        
        return df

@st.cache_data
def load_sample_data():
    """Carrega dados de exemplo para demonstração"""
    # Dados de destinação (2017-2025)
    dest_data = {
        'Ano': [2023, 2023, 2023, 2023, 2024, 2024, 2024, 2024],
        'Mês': ['JAN', 'FEV', 'MAR', 'ABR', 'JAN', 'FEV', 'MAR', 'ABR'],
        'Peso_kg': [24488, 5615, 32052, 10205, 17913, 11009, 12368, 15410]
    }
    
    # Dados de doações
    doacao_data = {
        'Ano': [2023, 2023, 2023, 2023, 2024, 2024, 2024, 2024],
        'Mês': ['JAN', 'FEV', 'MAR', 'ABR', 'JAN', 'FEV', 'MAR', 'ABR'],
        'Quantidade': [120, 42, 49, 47, 91, 174, 115, 123]
    }
    
    # Dados de recebedores
    recebedores_data = {
        'Ano': [2023, 2023, 2023, 2024, 2024, 2024],
        'Recebedor': [
            'Secretaria Municipal de Educação de Porto Alegre',
            'Corpo de Bombeiros Militar do RS', 
            'Hospital Beneficência Alto Jacuí',
            'Prefeitura de Porto Alegre',
            'Secretaria Estadual da Educação',
            'Fundação O Pão dos Pobres'
        ],
        'Quantidade': [15, 30, 25, 20, 35, 28]
    }
    
    dest_df = pd.DataFrame(dest_data)
    doacao_df = pd.DataFrame(doacao_data)
    recebedores_df = pd.DataFrame(recebedores_data)
    
    return dest_df, doacao_df, recebedores_df

def create_template_file():
    """Cria um template Excel para download"""
    
    # Dados de exemplo para o template
    template_dest = pd.DataFrame({
        'Ano': [2024, 2024, 2024],
        'Mês': ['JAN', 'FEV', 'MAR'],
        'Peso_kg': [1000, 1500, 1200]
    })
    
    template_doacao = pd.DataFrame({
        'Ano': [2024, 2024, 2024],
        'Mês': ['JAN', 'FEV', 'MAR'],
        'Quantidade': [50, 75, 60]
    })
    
    template_recebedores = pd.DataFrame({
        'Ano': [2024, 2024, 2024],
        'Recebedor': ['Entidade A', 'Entidade B', 'Entidade C'],
        'Quantidade': [25, 30, 20]
    })
    
    # Criar arquivo Excel em memória
    output = io.BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        template_dest.to_excel(writer, sheet_name='destinacao', index=False)
        template_doacao.to_excel(writer, sheet_name='doacao', index=False)
        template_recebedores.to_excel(writer, sheet_name='recebedores', index=False)
    
    output.seek(0)
    return output

def setup_data_upload():
    """Configura a interface de upload de dados"""
    
    st.sidebar.markdown("---")
    st.sidebar.markdown("### 📤 Upload de Dados")
    
    # Template download
    template = create_template_file()
    st.sidebar.download_button(
        label="📥 Baixar Template",
        data=template,
        file_name="template_sustentare.xlsx",
        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        help="Baixe o template para preencher com seus dados"
    )
    
    # Modo de operação
    modo = st.sidebar.radio(
        "Modo de Operação:",
        ["📊 Usar Dados de Exemplo", "📁 Upload de Planilha"]
    )
    
    if modo == "📊 Usar Dados de Exemplo":
        return "exemplo"
    else:
        return "upload"

def handle_file_upload():
    """Gerencia o upload de arquivos Excel"""
    
    st.markdown('<div class="section-header">📁 Upload de Planilha Excel</div>', unsafe_allow_html=True)
    
    # Instruções
    with st.expander("📋 Instruções para Upload", expanded=True):
        st.markdown("""
        ### Estrutura Esperada da Planilha Excel:
        
        A planilha deve conter **3 abas** com os seguintes nomes e colunas:
        
        #### 1. Aba: `destinacao`
        - `Ano`: Ano dos dados (ex: 2024)
        - `Mês`: Mês em formato texto (JAN, FEV, MAR, ..., DEZ)
        - `Peso_kg`: Peso em quilogramas
        
        #### 2. Aba: `doacao`  
        - `Ano`: Ano dos dados
        - `Mês`: Mês em formato texto
        - `Quantidade`: Número de doações
        
        #### 3. Aba: `recebedores`
        - `Ano`: Ano dos dados
        - `Recebedor`: Nome da entidade recebedora
        - `Quantidade`: Quantidade recebida
        
        ### 📝 Dicas:
        - Use os nomes exatos das abas e colunas
        - Os meses devem estar em português (JAN, FEV, MAR, etc.)
        - Valores numéricos devem estar no formato correto
        """)
    
    # Upload do arquivo
    uploaded_file = st.file_uploader(
        "Selecione o arquivo Excel:",
        type=['xlsx', 'xls'],
        help="Arquivo Excel com as 3 abas: destinacao, doacao, recebedores"
    )
    
    if uploaded_file is not None:
        try:
            # Ler o arquivo Excel
            excel_file = pd.ExcelFile(uploaded_file)
            sheet_names = excel_file.sheet_names
            
            st.success(f"✅ Arquivo carregado com sucesso! Abas encontradas: {', '.join(sheet_names)}")
            
            # Verificar abas necessárias
            required_sheets = ['destinacao', 'doacao', 'recebedores']
            missing_sheets = [sheet for sheet in required_sheets if sheet not in sheet_names]
            
            if missing_sheets:
                st.error(f"❌ Abas faltando: {', '.join(missing_sheets)}")
                return None, None, None
            
            # Processar cada aba
            processor = DataProcessor()
            
            with st.spinner("Processando dados de destinação..."):
                dest_df = pd.read_excel(uploaded_file, sheet_name='destinacao')
                dest_df = processor.process_destinacao_data(dest_df)
                st.success(f"✅ Dados de destinação: {len(dest_df)} registros")
            
            with st.spinner("Processando dados de doação..."):
                doacao_df = pd.read_excel(uploaded_file, sheet_name='doacao')
                doacao_df = processor.process_doacao_data(doacao_df)
                st.success(f"✅ Dados de doação: {len(doacao_df)} registros")
            
            with st.spinner("Processando dados de recebedores..."):
                recebedores_df = pd.read_excel(uploaded_file, sheet_name='recebedores')
                recebedores_df = processor.process_recebedores_data(recebedores_df)
                st.success(f"✅ Dados de recebedores: {len(recebedores_df)} registros")
            
            # Resumo dos dados
            st.markdown("### 📊 Resumo dos Dados Carregados")
            col1, col2, col3 = st.columns(3)
            
            with col1:
                st.metric("Destinação", f"{len(dest_df)} registros")
            with col2:
                st.metric("Doações", f"{len(doacao_df)} registros")
            with col3:
                st.metric("Recebedores", f"{len(recebedores_df)} registros")
            
            # Pré-visualização dos dados
            with st.expander("👀 Pré-visualização dos Dados"):
                tab1, tab2, tab3 = st.tabs(["Destinação", "Doações", "Recebedores"])
                
                with tab1:
                    st.dataframe(dest_df.head(10), use_container_width=True)
                with tab2:
                    st.dataframe(doacao_df.head(10), use_container_width=True)
                with tab3:
                    st.dataframe(recebedores_df.head(10), use_container_width=True)
            
            return dest_df, doacao_df, recebedores_df
            
        except Exception as e:
            st.error(f"❌ Erro ao processar arquivo: {str(e)}")
            return None, None, None
    
    return None, None, None

def create_dashboard(dest_df, doacao_df, recebedores_df):
    """Cria o dashboard principal"""
    
    current_year = datetime.now().year
    
    # Sidebar para filtros
    st.sidebar.title("🔧 Filtros")
    
    # Filtro por ano
    anos_disponiveis = sorted(dest_df['Ano'].unique()) if not dest_df.empty else [current_year]
    ano_selecionado = st.sidebar.selectbox(
        "Selecione o Ano:",
        options=anos_disponiveis,
        index=len(anos_disponiveis)-1
    )
    
    # Filtro por mês
    meses = ['TODOS'] + ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
    mes_selecionado = st.sidebar.selectbox("Selecione o Mês:", options=meses)
    
    # Aplicar filtros
    dest_filtrado = dest_df[dest_df['Ano'] == ano_selecionado] if not dest_df.empty else dest_df
    doacao_filtrado = doacao_df[doacao_df['Ano'] == ano_selecionado] if not doacao_df.empty else doacao_df
    recebedores_filtrado = recebedores_df[recebedores_df['Ano'] == ano_selecionado] if not recebedores_df.empty else recebedores_df
    
    if mes_selecionado != 'TODOS':
        dest_filtrado = dest_filtrado[dest_filtrado['Mês'] == mes_selecionado] if not dest_filtrado.empty else dest_filtrado
        doacao_filtrado = doacao_filtrado[doacao_filtrado['Mês'] == mes_selecionado] if not doacao_filtrado.empty else doacao_filtrado
    
    return dest_filtrado, doacao_filtrado, recebedores_filtrado, ano_selecionado, mes_selecionado

def display_metrics(dest_df, doacao_df, recebedores_df, ano, mes, data_source):
    """Exibe métricas principais"""
    
    source_badge = "📊" if data_source == "exemplo" else "📁"
    st.markdown(f'<div class="main-header">{source_badge} Dashboard Sustentare - {ano}</div>', unsafe_allow_html=True)
    
    if data_source == "upload":
        st.success("✅ Dados carregados via upload")
    
    if mes != 'TODOS':
        st.subheader(f"Filtro Ativo: {mes}/{ano}")
    
    # Métricas em colunas
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        total_peso = dest_df['Peso_kg'].sum() if not dest_df.empty else 0
        st.metric(
            label="📦 Total Destinado (kg)",
            value=f"{total_peso:,.0f}",
            delta=f"{total_peso/1000:.1f} ton" if total_peso > 0 else None
        )
    
    with col2:
        total_doacoes = doacao_df['Quantidade'].sum() if not doacao_df.empty else 0
        st.metric(
            label="🎁 Total de Doações",
            value=f"{total_doacoes:,.0f}",
            delta=None
        )
    
    with col3:
        total_recebedores = recebedores_df['Recebedor'].nunique() if not recebedores_df.empty else 0
        st.metric(
            label="🏢 Recebedores Únicos",
            value=f"{total_recebedores}",
            delta=None
        )
    
    with col4:
        if not dest_df.empty and len(dest_df) > 0:
            media_mensal = dest_df.groupby('Mês')['Peso_kg'].sum().mean()
            st.metric(
                label="📈 Média Mensal (kg)",
                value=f"{media_mensal:,.0f}",
                delta=None
            )
        else:
            st.metric(
                label="📈 Média Mensal (kg)",
                value="0",
                delta=None
            )

def create_charts(dest_df, doacao_df, recebedores_df):
    """Cria visualizações gráficas"""
    
    # Gráfico 1: Evolução mensal do peso destinado
    st.markdown('<div class="section-header">📈 Evolução Mensal - Peso Destinado</div>', unsafe_allow_html=True)
    
    if not dest_df.empty:
        # Ordem correta dos meses
        ordem_meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
        dest_df['Mês'] = pd.Categorical(dest_df['Mês'], categories=ordem_meses, ordered=True)
        dest_agrupado = dest_df.groupby('Mês')['Peso_kg'].sum().reset_index()
        
        fig1 = px.bar(
            dest_agrupado, 
            x='Mês', 
            y='Peso_kg',
            title=f"Peso Total Destinado por Mês",
            color='Peso_kg',
            color_continuous_scale='Viridis'
        )
        fig1.update_layout(
            xaxis_title="Mês",
            yaxis_title="Peso (kg)",
            showlegend=False
        )
        st.plotly_chart(fig1, use_container_width=True)
    else:
        st.info("📊 Nenhum dado de destinação disponível para gráfico")
    
    # Gráfico 2: Top recebedores
    st.markdown('<div class="section-header">🏆 Top Recebedores</div>', unsafe_allow_html=True)
    
    if not recebedores_df.empty:
        top_recebedores = recebedores_df.groupby('Recebedor')['Quantidade'].sum().nlargest(10).reset_index()
        
        fig2 = px.bar(
            top_recebedores,
            x='Quantidade',
            y='Recebedor',
            orientation='h',
            title="Top 10 Recebedores por Quantidade",
            color='Quantidade',
            color_continuous_scale='Blues'
        )
        fig2.update_layout(
            yaxis={'categoryorder':'total ascending'},
            xaxis_title="Quantidade Recebida",
            yaxis_title=""
        )
        st.plotly_chart(fig2, use_container_width=True)
    else:
        st.info("📊 Nenhum dado de recebedores disponível para gráfico")

def search_functionality(recebedores_df):
    """Funcionalidade de busca"""
    st.markdown('<div class="section-header">🔍 Busca Avançada</div>', unsafe_allow_html=True)
    
    with st.expander("Buscar por Recebedor"):
        if recebedores_df is None or recebedores_df.empty:
            st.info("📝 Nenhum dado de recebedores disponível para busca")
            return
        
        col1, col2 = st.columns([2, 1])
        
        with col1:
            termo_busca = st.text_input("Digite o nome do recebedor:")
        
        with col2:
            st.write("")  # Espaçamento
            buscar = st.button("🔎 Buscar")
        
        if buscar and termo_busca:
            resultados = recebedores_df[
                recebedores_df['Recebedor'].str.contains(termo_busca, case=False, na=False)
            ]
            
            if not resultados.empty:
                st.success(f"✅ Encontrados {len(resultados)} resultados")
                
                # Agrupar por recebedor
                resumo = resultados.groupby('Recebedor').agg({
                    'Quantidade': 'sum',
                    'Ano': 'count'
                }).reset_index()
                resumo.columns = ['Recebedor', 'Total Recebido', 'Número de Ocorrências']
                
                st.dataframe(
                    resumo.sort_values('Total Recebido', ascending=False),
                    use_container_width=True
                )
            else:
                st.warning("❌ Nenhum resultado encontrado")

def show_raw_data(dest_df, doacao_df, recebedores_df, data_source):
    """Mostra dados brutos"""
    st.markdown('<div class="section-header">📋 Dados Brutos</div>', unsafe_allow_html=True)
    
    if data_source == "upload":
        st.success("✅ Dados carregados via upload")
    
    dataset = st.selectbox(
        "Selecione o conjunto de dados:",
        ["Destinação", "Doações", "Recebedores"]
    )
    
    if dataset == "Destinação" and dest_df is not None and not dest_df.empty:
        st.dataframe(dest_df, use_container_width=True)
        
        # Estatísticas descritivas
        st.markdown("#### 📊 Estatísticas Descritivas - Destinação")
        st.write(dest_df['Peso_kg'].describe())
        
    elif dataset == "Doações" and doacao_df is not None and not doacao_df.empty:
        st.dataframe(doacao_df, use_container_width=True)
        
        # Estatísticas descritivas
        st.markdown("#### 📊 Estatísticas Descritivas - Doações")
        st.write(doacao_df['Quantidade'].describe())
        
    elif dataset == "Recebedores" and recebedores_df is not None and not recebedores_df.empty:
        st.dataframe(recebedores_df, use_container_width=True)
        
        # Estatísticas descritivas
        st.markdown("#### 📊 Estatísticas Descritivas - Recebedores")
        st.write(recebedores_df['Quantidade'].describe())
    else:
        st.info("ℹ️ Nenhum dado disponível para o conjunto selecionado")

def main():
    """Função principal"""
    
    # Configurar upload de dados
    data_mode = setup_data_upload()
    
    if data_mode == "exemplo":
        # Usar dados de exemplo
        dest_df, doacao_df, recebedores_df = load_sample_data()
        data_source = "exemplo"
    else:
        # Upload de dados
        dest_df, doacao_df, recebedores_df = handle_file_upload()
        data_source = "upload"
        
        # Se não há dados carregados, mostrar instruções
        if dest_df is None and doacao_df is None and recebedores_df is None:
            st.info("📝 Faça upload de um arquivo Excel para visualizar os dados")
            return
    
    # Verificar se temos dados para mostrar
    if (dest_df is not None and not dest_df.empty) or (doacao_df is not None and not doacao_df.empty):
        
        # Criar dashboard com os dados
        dest_filtrado, doacao_filtrado, recebedores_filtrado, ano, mes = create_dashboard(
            dest_df, doacao_df, recebedores_df
        )
        
        # Exibir métricas
        display_metrics(dest_filtrado, doacao_filtrado, recebedores_filtrado, ano, mes, data_source)
        
        # Layout em abas
        tab1, tab2, tab3, tab4 = st.tabs(["📊 Dashboard", "📈 Visualizações", "🔍 Busca", "📋 Dados"])
        
        with tab1:
            st.markdown('<div class="section-header">📈 Visualizações Principais</div>', unsafe_allow_html=True)
            create_charts(dest_filtrado, doacao_filtrado, recebedores_filtrado)
        
        with tab2:
            st.markdown('<div class="section-header">📊 Gráficos Detalhados</div>', unsafe_allow_html=True)
            
            # Gráfico de pizza - Distribuição por mês
            if not dest_filtrado.empty:
                col1, col2 = st.columns(2)
                
                with col1:
                    dest_agrupado = dest_filtrado.groupby('Mês')['Peso_kg'].sum().reset_index()
                    fig_pizza = px.pie(
                        dest_agrupado,
                        values='Peso_kg',
                        names='Mês',
                        title="Distribuição por Mês"
                    )
                    st.plotly_chart(fig_pizza, use_container_width=True)
                
                with col2:
                    # Gráfico de doações ao longo do tempo
                    if not doacao_filtrado.empty:
                        doacao_agrupado = doacao_filtrado.groupby('Mês')['Quantidade'].sum().reset_index()
                        if not doacao_agrupado.empty:
                            fig_doacoes = px.line(
                                doacao_agrupado,
                                x='Mês',
                                y='Quantidade',
                                title="Evolução das Doações",
                                markers=True
                            )
                            st.plotly_chart(fig_doacoes, use_container_width=True)
                        else:
                            st.info("📊 Nenhum dado de doações disponível para gráfico")
                    else:
                        st.info("📊 Nenhum dado de doações disponível para gráfico")
            else:
                st.info("📊 Nenhum dado disponível para visualizações detalhadas")
        
        with tab3:
            search_functionality(recebedores_filtrado)
        
        with tab4:
            show_raw_data(dest_df, doacao_df, recebedores_df, data_source)
    
    else:
        st.warning("⚠️ Nenhum dado disponível para visualização. Use dados de exemplo ou faça upload de uma planilha.")

if __name__ == "__main__":
    main()
