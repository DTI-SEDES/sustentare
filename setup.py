from setuptools import setup, find_packages

setup(
    name="sustentare",
    version="1.0.0",
    description="Programa Sustentare - DTI/SEDES",
    packages=find_packages(),
    install_requires=[
        "streamlit>=1.28.0",
        "pandas>=2.0.3",
        "plotly>=5.15.0",
        "numpy>=1.24.3",
    ],
    python_requires=">=3.8",
)
