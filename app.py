# app.py - Aplicativo Principal do Programa Sustentare
import streamlit as st
import pandas as pd
import plotly.express as px
from datetime import datetime
import io

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
</style>
""", unsafe_allow_html=True)

@st.cache_data
def load_sample_data():
    """Carrega dados de exemplo para demonstração"""
    # Dados de exemplo simplificados
    dest_data = {
        'Ano': [2023, 2023, 2023, 2024, 2024, 2024],
        'Mês': ['JAN', 'FEV', 'MAR', 'JAN', 'FEV', 'MAR'],
        'Peso_kg': [24488, 5615, 32052, 17913, 11009, 12368]
    }
    
    doacao_data = {
        'Ano': [2023, 2023, 2023, 2024, 2024, 2024],
        'Mês': ['JAN', 'FEV', 'MAR', 'JAN', 'FEV', 'MAR'],
        'Quantidade': [120, 42, 49, 91, 174, 115]
    }
    
    recebedores_data = {
        'Ano': [2023, 2023, 2023, 2024, 2024, 2024],
        'Recebedor': [
            'Secretaria Municipal de Educação',
            'Corpo de Bombeiros Militar', 
            'Hospital Beneficência',
            'Prefeitura Municipal',
            'Secretaria Estadual',
            'Fundação Social'
        ],
        'Quantidade': [15, 30, 25, 20, 35, 28]
    }
    
    dest_df = pd.DataFrame(dest_data)
    doacao_df = pd.DataFrame(doacao_data)
    recebedores_df = pd.DataFrame(recebedores_data)
    
    return dest_df, doacao_df, recebedores_df

def create_template_file():
    """Cria um template Excel para download"""
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
    
    output = io.BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        template_dest.to_excel(writer, sheet_name='destinacao', index=False)
        template_doacao.to_excel(writer, sheet_name='doacao', index=False)
        template_recebedores.to_excel(writer, sheet_name='recebedores', index=False)
    
    output.seek(0)
    return output

def main():
    """Função principal"""
    
    st.sidebar.title("♻️ Sustentare - DTI/SEDES")
    
    # Template download
    template = create_template_file()
    st.sidebar.download_button(
        label="📥 Baixar Template",
        data=template,
        file_name="template_sustentare.xlsx",
        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    
    # Modo de operação
    modo = st.sidebar.radio(
        "Modo de Operação:",
        ["📊 Usar Dados de Exemplo", "📁 Upload de Planilha"]
    )
    
    if modo == "📊 Usar Dados de Exemplo":
        dest_df, doacao_df, recebedores_df = load_sample_data()
        data_source = "exemplo"
        st.success("✅ Dados de exemplo carregados com sucesso!")
    else:
        uploaded_file = st.file_uploader(
            "Selecione o arquivo Excel:",
            type=['xlsx', 'xls'],
            help="Arquivo Excel com as abas: destinacao, doacao, recebedores"
        )
        
        if uploaded_file is not None:
            try:
                # Ler arquivo Excel
                dest_df = pd.read_excel(uploaded_file, sheet_name='destinacao')
                doacao_df = pd.read_excel(uploaded_file, sheet_name='doacao')
                recebedores_df = pd.read_excel(uploaded_file, sheet_name='recebedores')
                data_source = "upload"
                st.success("✅ Arquivo carregado com sucesso!")
            except Exception as e:
                st.error(f"❌ Erro ao carregar arquivo: {e}")
                return
        else:
            st.info("📝 Faça upload de um arquivo Excel ou use os dados de exemplo")
            return
    
    # Filtros
    st.sidebar.markdown("---")
    st.sidebar.markdown("### 🔧 Filtros")
    
    anos_disponiveis = sorted(dest_df['Ano'].unique())
    ano_selecionado = st.sidebar.selectbox(
        "Selecione o Ano:",
        options=anos_disponiveis,
        index=len(anos_disponiveis)-1
    )
    
    meses = ['TODOS'] + ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
    mes_selecionado = st.sidebar.selectbox("Selecione o Mês:", options=meses)
    
    # Aplicar filtros
    dest_filtrado = dest_df[dest_df['Ano'] == ano_selecionado]
    doacao_filtrado = doacao_df[doacao_df['Ano'] == ano_selecionado]
    recebedores_filtrado = recebedores_df[recebedores_df['Ano'] == ano_selecionado]
    
    if mes_selecionado != 'TODOS':
        dest_filtrado = dest_filtrado[dest_filtrado['Mês'] == mes_selecionado]
        doacao_filtrado = doacao_filtrado[doacao_filtrado['Mês'] == mes_selecionado]
    
    # Métricas
    st.markdown(f'<div class="main-header">📊 Dashboard Sustentare - {ano_selecionado}</div>', unsafe_allow_html=True)
    
    if mes_selecionado != 'TODOS':
        st.subheader(f"Filtro Ativo: {mes_selecionado}/{ano_selecionado}")
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        total_peso = dest_filtrado['Peso_kg'].sum()
        st.metric("📦 Total Destinado (kg)", f"{total_peso:,.0f}")
    
    with col2:
        total_doacoes = doacao_filtrado['Quantidade'].sum()
        st.metric("🎁 Total de Doações", f"{total_doacoes:,.0f}")
    
    with col3:
        total_recebedores = recebedores_filtrado['Recebedor'].nunique()
        st.metric("🏢 Recebedores Únicos", f"{total_recebedores}")
    
    with col4:
        if not dest_filtrado.empty:
            media_mensal = dest_filtrado.groupby('Mês')['Peso_kg'].sum().mean()
            st.metric("📈 Média Mensal (kg)", f"{media_mensal:,.0f}")
    
    # Abas principais
    tab1, tab2, tab3 = st.tabs(["📈 Gráficos", "🔍 Busca", "📋 Dados"])
    
    with tab1:
        st.markdown('<div class="section-header">📈 Visualizações</div>', unsafe_allow_html=True)
        
        # Gráfico de barras - Destinação
        if not dest_filtrado.empty:
            ordem_meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
            dest_filtrado['Mês'] = pd.Categorical(dest_filtrado['Mês'], categories=ordem_meses, ordered=True)
            dest_agrupado = dest_filtrado.groupby('Mês')['Peso_kg'].sum().reset_index()
            
            fig1 = px.bar(
                dest_agrupado, 
                x='Mês', 
                y='Peso_kg',
                title="Peso Destinado por Mês",
                color='Peso_kg'
            )
            st.plotly_chart(fig1, use_container_width=True)
        
        # Gráfico de recebedores
        if not recebedores_filtrado.empty:
            top_recebedores = recebedores_filtrado.groupby('Recebedor')['Quantidade'].sum().nlargest(10).reset_index()
            
            fig2 = px.bar(
                top_recebedores,
                x='Quantidade',
                y='Recebedor',
                orientation='h',
                title="Top 10 Recebedores",
                color='Quantidade'
            )
            st.plotly_chart(fig2, use_container_width=True)
    
    with tab2:
        st.markdown('<div class="section-header">🔍 Busca por Recebedor</div>', unsafe_allow_html=True)
        
        termo_busca = st.text_input("Digite o nome do recebedor:")
        
        if termo_busca:
            resultados = recebedores_filtrado[
                recebedores_filtrado['Recebedor'].str.contains(termo_busca, case=False, na=False)
            ]
            
            if not resultados.empty:
                st.success(f"✅ Encontrados {len(resultados)} resultados")
                st.dataframe(resultados, use_container_width=True)
            else:
                st.warning("❌ Nenhum resultado encontrado")
    
    with tab3:
        st.markdown('<div class="section-header">📋 Dados Brutos</div>', unsafe_allow_html=True)
        
        dataset = st.selectbox(
            "Selecione o conjunto de dados:",
            ["Destinação", "Doações", "Recebedores"]
        )
        
        if dataset == "Destinação":
            st.dataframe(dest_filtrado, use_container_width=True)
        elif dataset == "Doações":
            st.dataframe(doacao_filtrado, use_container_width=True)
        else:
            st.dataframe(recebedores_filtrado, use_container_width=True)

if __name__ == "__main__":
    main()
