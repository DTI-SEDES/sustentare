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
    
    return dest_filtrado, doacao_f
