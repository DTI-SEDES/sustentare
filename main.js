// Exemplo de dados
let dados = [
  // Carregar por importação dinâmica
  // ["NOME","Municipio","Tipo","Qtd","Total","Data"]
];
function popularTabela() {
  let tabela = document.querySelector("#table tbody");
  tabela.innerHTML = "";
  for (let linha of dados) {
    let tr = document.createElement("tr");
    tr.className = linha[3] > 10 ? "success" : linha[3] < 3 ? "low" : "";
    tr.innerHTML = linha.map(td => `<td>${td}</td>`).join("");
    tabela.appendChild(tr);
  }
}
function filtrar() {
  let mes = document.getElementById("mes").value;
  let ano = document.getElementById("ano").value;
  let qtdMin = +document.getElementById("qtdMin").value || 0;
  let filtrado = dados.filter(l => l[5].includes(mes) && l[5].includes(ano) && l[3] >= qtdMin);
  let tabela = document.querySelector("#table tbody");
  tabela.innerHTML = "";
  for (let linha of filtrado) {
    let tr = document.createElement("tr");
    tr.className = linha[3] > 10 ? "success" : linha[3] < 3 ? "low" : "";
    tr.innerHTML = linha.map(td => `<td>${td}</td>`).join("");
    tabela.appendChild(tr);
  }
}
