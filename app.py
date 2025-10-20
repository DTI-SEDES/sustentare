# app.py - Aplicativo Principal do Programa Sustentare
import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import io

# Configuração da página
st.set_page_config(
    page_title="Sustentare",
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
</style>
""", unsafe_allow_html=True)

@st.cache_data
def load_sample_data():
    """Carrega dados de exemplo para demonstração"""
    # Dados de destinação (2017-2025)
    dest_data = {
        'Ano': [2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017,
                2018, 2018, 2018, 2018, 2018, 2018, 2018, 2018, 2018, 2018, 2018, 2018,
                2019, 2019, 2019, 2019, 2019, 2019, 2019, 2019, 2019, 2019, 2019, 2019,
                2020, 2020, 2020, 2020, 2020, 2020, 2020, 2020, 2020, 2020, 2020, 2020,
                2021, 2021, 2021, 2021, 2021, 2021, 2021, 2021, 2021, 2021, 2021, 2021,
                2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022,
                2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023,
                2024, 2024, 2024, 2024, 2024, 2024, 2024, 2024, 2024, 2024, 2024, 2024,
                2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025],
        'Mês': ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'] * 8 + ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET'],
        'Peso_kg': [0, 0, 0, 656, 5195, 10285, 14281, 9392, 4837, 21930, 4588, 18267,
                    12826, 7247, 17465, 4284, 10069, 8692, 15695, 53658, 7000, 16446, 5164, 23688,
                    8215, 14810, 8322, 5038, 1177, 4409, 38880, 9425, 16944, 6692, 35531, 10698,
                    14097, 16825, 20622, 278, 9682, 7466, 53755, 9191, 32132, 15739, 38221, 22081,
                    20802, 1128, 2221, 5060, 20124, 15159, 6174, 23817, 21874, 24050, 9042, 7620,
                    11017, 14497, 25382, 10811, 9782, 22202, 19838, 33205, 19364, 15976, 6925, 15369,
                    24488, 5615, 32052, 10205, 24804, 34541, 46301, 18743, 26033, 44030, 30781, 12304,
                    17913, 11009, 12368, 15410, 12141, 13208, 28139, 36881, 23867, 30535, 13460, 14445,
                    18190, 8344, 1427, 21888, 27010, 36209, 29006, 8372, 9112]
    }
    
    # Dados de doações
    doacao_data = {
        'Ano': [2017, 2017, 2017, 2017, 2018, 2018, 2018, 2018, 2018, 2018, 2019, 2019, 2019, 2019, 2019, 2019, 2019,
                2020, 2020, 2020, 2020, 2020, 2020, 2020, 2020, 2020, 2020, 2020, 2021, 2021, 2021, 2021, 2021, 2021, 2021,
                2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023,
                2024, 2024, 2024, 2024, 2024, 2024, 2024, 2024, 2024, 2024, 2024, 2024, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025],
        'Mês': ['MAI', 'NOV', 'JAN', 'JUN', 'AGO', 'NOV', 'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'SET', 'DEZ', 'FEV', 'ABR', 'JUN', 'JUL', 'AGO', 'SET', 'MAR', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ', 'FEV', 'JUN', 'JUL', 'AGO', 'SET', 'MAR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ', 'JAN', 'FEV', 'MAR', 'ABR', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET'],
        'Quantidade': [45, 24, 11, 26, 17, 18, 10, 40, 5, 70, 20, 33, 35, 11, 2, 20, 33, 3, 5, 3, 15, 5, 15, 5, 3, 11, 4, 44, 48, 20, 10, 10, 41, 8, 21, 70, 30, 29, 10, 74, 58, 106, 39, 51, 93, 84, 70, 60, 107, 15, 74, 25, 55, 120, 42, 49, 47, 70, 99, 154, 408, 136, 51, 91, 174, 115, 123, 95, 124]
    }
    
    df_dest = pd.DataFrame(dest_data)
    df_doacao = pd.DataFrame(doacao_data)
    
    # Adicionar ordenação de meses
    meses_pt = {'JAN': 1, 'FEV': 2, 'MAR': 3, 'ABR': 4, 'MAI': 5, 'JUN': 6, 
                'JUL': 7, 'AGO': 8, 'SET': 9, 'OUT': 10, 'NOV': 11, 'DEZ': 12}
    
    df_dest['Mes_num'] = df_dest['Mês'].map(meses_pt)
    df_doacao['Mes_num'] = df_doacao['Mês'].map(meses_pt)
    
    return df_dest, df_doacao

def main():
    # Cabeçalho
    st.markdown('<h1 class="main-header">♻️ Programa Sustentare - DTI/SEDES</h1>', unsafe_allow_html=True)
    
    # Sidebar
    st.sidebar.title("Navegação")
    aba_selecionada = st.sidebar.radio("Selecione a aba:", ["🏠 Início", "📊 Dados Destinação", "🎁 Itens Doados", "ℹ️ Sobre"])
    
    # Carregar dados
    df_dest, df_doacao = load_sample_data()
    
    if "🏠 Início" in aba_selecionada:
        show_home(df_dest, df_doacao)
    elif "📊 Dados Destinação" in aba_selecionada:
        show_destinacao(df_dest)
    elif "🎁 Itens Doados" in aba_selecionada:
        show_doacoes(df_doacao)
    elif "ℹ️ Sobre" in aba_selecionada:
        show_sobre()

def show_home(df_dest, df_doacao):
    st.markdown('<h2 class="section-header">📈 Dashboard Resumido</h2>', unsafe_allow_html=True)
    
    # Métricas principais
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        total_dest = df_dest['Peso_kg'].sum()
        st.metric("Total Destinado", f"{total_dest:,.0f} kg")
    
    with col2:
        total_doacao = df_doacao['Quantidade'].sum()
        st.metric("Total Doado", f"{total_doacao:,.0f} unidades")
    
    with col3:
        anos_cobertura = df_dest['Ano'].nunique()
        st.metric("Anos de Dados", f"{anos_cobertura} anos")
    
    with col4:
        media_mensal = df_dest.groupby(['Ano', 'Mês'])['Peso_kg'].sum().mean()
        st.metric("Média Mensal", f"{media_mensal:,.0f} kg")
    
    # Gráficos resumidos
    col1, col2 = st.columns(2)
    
    with col1:
        # Destinação por ano
        dest_ano = df_dest.groupby('Ano')['Peso_kg'].sum().reset_index()
        fig_dest = px.bar(dest_ano, x='Ano', y='Peso_kg', 
                         title="📊 Destinação por Ano (kg)",
                         color='Peso_kg',
                         color_continuous_scale='Viridis')
        st.plotly_chart(fig_dest, use_container_width=True)
    
    with col2:
        # Doações por ano
        doacao_ano = df_doacao.groupby('Ano')['Quantidade'].sum().reset_index()
        fig_doacao = px.line(doacao_ano, x='Ano', y='Quantidade',
                           title="📈 Doações por Ano (unidades)",
                           markers=True)
        st.plotly_chart(fig_doacao, use_container_width=True)
    
    # Informações adicionais
    st.markdown("---")
    st.subheader("🎯 Objetivos do Programa")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.info("""
        **Destinação Sustentável**
        - Redução de resíduos em aterros
        - Reciclagem de materiais
        - Logística reversa
        """)
    
    with col2:
        st.success("""
        **Inclusão Digital**
        - Doação de equipamentos
        - Recondicionamento
        - Capacitação tecnológica
        """)

def show_destinacao(df_dest):
    st.markdown('<h2 class="section-header">📊 Dados de Destinação</h2>', unsafe_allow_html=True)
    
    # Filtros
    col1, col2 = st.columns(2)
    
    with col1:
        anos = sorted(df_dest['Ano'].unique())
        ano_selecionado = st.selectbox("Selecione o ano:", ["Todos"] + anos, key="dest_ano")
    
    with col2:
        meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
        mes_selecionado = st.selectbox("Selecione o mês:", ["Todos"] + meses, key="dest_mes")
    
    # Aplicar filtros
    df_filtrado = df_dest.copy()
    
    if ano_selecionado != "Todos":
        df_filtrado = df_filtrado[df_filtrado['Ano'] == ano_selecionado]
    
    if mes_selecionado != "Todos":
        df_filtrado = df_filtrado[df_filtrado['Mês'] == mes_selecionado]
    
    # Métricas
    total_filtrado = df_filtrado['Peso_kg'].sum()
    st.metric("Total Destinado no Período", f"{total_filtrado:,.0f} kg")
    
    # Gráficos
    if ano_selecionado == "Todos":
        dest_ano = df_filtrado.groupby('Ano')['Peso_kg'].sum().reset_index()
        fig = px.bar(dest_ano, x='Ano', y='Peso_kg', title="Destinação por Ano")
        st.plotly_chart(fig, use_container_width=True)
    else:
        dest_mes = df_filtrado.groupby('Mês')['Peso_kg'].sum().reset_index()
        ordem_meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
        dest_mes['Mês'] = pd.Categorical(dest_mes['Mês'], categories=ordem_meses, ordered=True)
        dest_mes = dest_mes.sort_values('Mês')
        
        fig = px.bar(dest_mes, x='Mês', y='Peso_kg', title=f"Destinação em {ano_selecionado}")
        st.plotly_chart(fig, use_container_width=True)
    
    # Tabela
    st.subheader("📋 Dados Detalhados")
    df_tabela = df_filtrado[['Ano', 'Mês', 'Peso_kg']].sort_values(['Ano', 'Mes_num'])
    st.dataframe(df_tabela, use_container_width=True)

def show_doacoes(df_doacao):
    st.markdown('<h2 class="section-header">🎁 Itens Doados</h2>', unsafe_allow_html=True)
    
    # Filtros
    col1, col2 = st.columns(2)
    
    with col1:
        anos = sorted(df_doacao['Ano'].unique())
        ano_selecionado = st.selectbox("Selecione o ano:", ["Todos"] + anos, key="doacao_ano")
    
    with col2:
        meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
        mes_selecionado = st.selectbox("Selecione o mês:", ["Todos"] + meses, key="doacao_mes")
    
    # Aplicar filtros
    df_filtrado = df_doacao.copy()
    
    if ano_selecionado != "Todos":
        df_filtrado = df_filtrado[df_filtrado['Ano'] == ano_selecionado]
    
    if mes_selecionado != "Todos":
        df_filtrado = df_filtrado[df_filtrado['Mês'] == mes_selecionado]
    
    # Métricas
    total_filtrado = df_filtrado['Quantidade'].sum()
    st.metric("Total Doado no Período", f"{total_filtrado:,.0f} unidades")
    
    # Gráficos
    if ano_selecionado == "Todos":
        doacao_ano = df_filtrado.groupby('Ano')['Quantidade'].sum().reset_index()
        fig = px.line(doacao_ano, x='Ano', y='Quantidade', title="Doações por Ano", markers=True)
        st.plotly_chart(fig, use_container_width=True)
    else:
        doacao_mes = df_filtrado.groupby('Mês')['Quantidade'].sum().reset_index()
        ordem_meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
        doacao_mes['Mês'] = pd.Categorical(doacao_mes['Mês'], categories=ordem_meses, ordered=True)
        doacao_mes = doacao_mes.sort_values('Mês')
        
        fig = px.bar(doacao_mes, x='Mês', y='Quantidade', title=f"Doações em {ano_selecionado}")
        st.plotly_chart(fig, use_container_width=True)
    
    # Tabela
    st.subheader("📋 Dados Detalhados")
    df_tabela = df_filtrado[['Ano', 'Mês', 'Quantidade']].sort_values(['Ano', 'Mes_num'])
    st.dataframe(df_tabela, use_container_width=True)

def show_sobre():
    st.markdown('<h2 class="section-header">ℹ️ Sobre o Programa Sustentare</h2>', unsafe_allow_html=True)
    
    st.markdown("""
    ## 🏛️ Sobre o Programa
    
    O **Programa Sustentare** é uma iniciativa do **Governo do Estado** para promover a sustentabilidade 
    através da destinação adequada de resíduos e doação de equipamentos.
    
    ## 🎯 Objetivos
    
    - **Destinação ambientalmente adequada** de resíduos eletrônicos
    - **Recondicionamento e doação** de equipamentos eletônicos
    - **Inclusão digital** através de equipamentos reutilizados
    - **Redução do impacto ambiental** do descarte inadequado
    
    ## 📊 Metodologia
    
    1. **Coleta** - Recebimento de equipamentos e materiais
    2. **Triagem** - Avaliação e classificação dos itens
    3. **Recondicionamento** - Reparo e preparação de computadores para uso
    4. **Destinação** - Doação ou reciclagem adequada para entidades cadastradas.
    
    ## 👥 Equipe
    
    - **Programa Sustentare** - Coordenação do Programa - Secretaria de Desenvolvimento Social
    
    ## 📞 Contato
    Coordenador: Dionatan Aristimunha
    coordenacao-sustentare@social.rs.gov.br
    Para mais informações: **sustentare@procergs.rs.gov.br**
    """)

if __name__ == "__main__":
    main()
