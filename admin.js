function importar() {
  const file = document.getElementById('file').files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, {type: 'array'});
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {header:1});
    
    // Remover cabeçalho e atualizar variável global dados
    dados = jsonData.slice(1); 
    popularTabela(); // Atualiza tabela com dados importados
  };
  reader.readAsArrayBuffer(file);
}
