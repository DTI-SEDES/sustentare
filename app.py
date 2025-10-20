# app.py - Aplicativo Principal do Programa Sustentare
import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime

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
    .search-box {
        background-color: #f0f2f6;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
    }
</style>
""", unsafe_allow_html=True)

@st.cache_data
def load_sample_data():
    """Carrega dados de exemplo para demonstração"""
    # Seus dados existentes aqui...
    return dest_df, doacao_df, recebedores_df

def create_dashboard():
    """Cria o dashboard principal"""
    
    # Carregar dados
    dest_df, doacao_df, recebedores_df = load_sample_data()
    
    current_year = datetime.now().year
    
    # Sidebar para filtros
    st.sidebar.title("🔧 Filtros")
    
    # Filtro por ano
    anos_disponiveis = sorted(dest_df['Ano'].unique())
    ano_selecionado = st.sidebar.selectbox(
        "Selecione o Ano:",
        options=anos_disponiveis,
        index=len(anos_disponiveis)-1  # Último ano por padrão
    )
    
    # Filtro por mês
    meses = ['TODOS'] + ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
    mes_selecionado = st.sidebar.selectbox("Selecione o Mês:", options=meses)
    
    # Aplicar filtros
    dest_filtrado = dest_df[dest_df['Ano'] == ano_selecionado]
    doacao_filtrado = doacao_df[doacao_df['Ano'] == ano_selecionado]
    recebedores_filtrado = recebedores_df[recebedores_df['Ano'] == ano_selecionado]
    
    if mes_selecionado != 'TODOS':
        dest_filtrado = dest_filtrado[dest_filtrado['Mês'] == mes_selecionado]
        doacao_filtrado = doacao_filtrado[doacao_filtrado['Mês'] == mes_selecionado]
    
    return dest_filtrado, doacao_filtrado, recebedores_filtrado, ano_selecionado, mes_selecionado

def display_metrics(dest_df, doacao_df, recebedores_df, ano, mes):
    """Exibe métricas principais"""
    st.markdown(f'<div class="main-header">📊 Dashboard Sustentare - {ano}</div>', unsafe_allow_html=True)
    
    if mes != 'TODOS':
        st.subheader(f"Filtro Ativo: {mes}/{ano}")
    
    # Métricas em colunas
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        total_peso = dest_df['Peso_kg'].sum()
        st.metric(
            label="📦 Total Destinado (kg)",
            value=f"{total_peso:,.0f}",
            delta=f"{total_peso/1000:.1f} ton"
        )
    
    with col2:
        total_doacoes = doacao_df['Quantidade'].sum()
        st.metric(
            label="🎁 Total de Doações",
            value=f"{total_doacoes:,.0f}",
            delta=None
        )
    
    with col3:
        total_recebedores = recebedores_df['Recebedor'].nunique()
        st.metric(
            label="🏢 Recebedores Únicos",
            value=f"{total_recebedores}",
            delta=None
        )
    
    with col4:
        if len(dest_df) > 0:
            media_mensal = dest_df.groupby('Mês')['Peso_kg'].sum().mean()
            st.metric(
                label="📈 Média Mensal (kg)",
                value=f"{media_mensal:,.0f}",
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
            title=f"Peso Total Destinado por Mês ({dest_df['Ano'].iloc[0]})",
            color='Peso_kg',
            color_continuous_scale='Viridis'
        )
        fig1.update_layout(
            xaxis_title="Mês",
            yaxis_title="Peso (kg)",
            showlegend=False
        )
        st.plotly_chart(fig1, use_container_width=True)
    
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
    
    # Gráfico 3: Comparação anual (se dados de múltiplos anos)
    st.markdown('<div class="section-header">📊 Comparação Anual</div>', unsafe_allow_html=True)
    
    dest_full, _, _ = load_sample_data()
    anual_comparacao = dest_full.groupby('Ano')['Peso_kg'].sum().reset_index()
    
    fig3 = px.line(
        anual_comparacao,
        x='Ano',
        y='Peso_kg',
        title="Evolução Anual do Peso Destinado",
        markers=True
    )
    fig3.update_layout(
        xaxis_title="Ano",
        yaxis_title="Peso Total (kg)"
    )
    st.plotly_chart(fig3, use_container_width=True)

def search_functionality():
    """Funcionalidade de busca"""
    st.markdown('<div class="section-header">🔍 Busca Avançada</div>', unsafe_allow_html=True)
    
    with st.expander("Buscar por Recebedor"):
        _, recebedores_df, _ = load_sample_data()
        
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

def main():
    """Função principal"""
    try:
        # Carregar dados e aplicar filtros
        dest_df, doacao_df, recebedores_df, ano, mes = create_dashboard()
        
        # Exibir métricas
        display_metrics(dest_df, doacao_df, recebedores_df, ano, mes)
        
        # Layout em abas
        tab1, tab2, tab3, tab4 = st.tabs(["📊 Dashboard", "📈 Visualizações", "🔍 Busca", "📋 Dados"])
        
        with tab1:
            st.markdown('<div class="section-header">📈 Visualizações Principais</div>', unsafe_allow_html=True)
            create_charts(dest_df, doacao_df, recebedores_df)
        
        with tab2:
            st.markdown('<div class="section-header">📊 Gráficos Detalhados</div>', unsafe_allow_html=True)
            
            # Gráfico de pizza - Distribuição por mês
            if not dest_df.empty:
                col1, col2 = st.columns(2)
                
                with col1:
                    dest_agrupado = dest_df.groupby('Mês')['Peso_kg'].sum().reset_index()
                    fig_pizza = px.pie(
                        dest_agrupado,
                        values='Peso_kg',
                        names='Mês',
                        title="Distribuição por Mês"
                    )
                    st.plotly_chart(fig_pizza, use_container_width=True)
                
                with col2:
                    # Gráfico de doações ao longo do tempo
                    doacao_agrupado = doacao_df.groupby('Mês')['Quantidade'].sum().reset_index()
                    if not doacao_agrupado.empty:
                        fig_doacoes = px.line(
                            doacao_agrupado,
                            x='Mês',
                            y='Quantidade',
                            title="Evolução das Doações",
                            markers=True
                        )
                        st.plotly_chart(fig_doacoes, use_container_width=True)
        
        with tab3:
            search_functionality()
        
        with tab4:
            st.markdown('<div class="section-header">📋 Dados Brutos</div>', unsafe_allow_html=True)
            
            dataset = st.selectbox(
                "Selecione o conjunto de dados:",
                ["Destinação", "Doações", "Recebedores"]
            )
            
            if dataset == "Destinação":
                st.dataframe(dest_df, use_container_width=True)
            elif dataset == "Doações":
                st.dataframe(doacao_df, use_container_width=True)
            else:
                st.dataframe(recebedores_df, use_container_width=True)
                
            # Estatísticas descritivas
            st.markdown("#### 📊 Estatísticas Descritivas")
            if dataset == "Destinação" and not dest_df.empty:
                st.write(dest_df['Peso_kg'].describe())
            elif dataset ==
