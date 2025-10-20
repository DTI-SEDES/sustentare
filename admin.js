function login(e) {
  e.preventDefault();
  if (user.value==="admin" && pass.value==="senha123") location="admin.html";
  else alert("Acesso negado");
}
function importar() {
  let f = document.getElementById('file').files[0];
  // Utilizar PapaParse (csv) ou xlsx.js para excel
  alert("Arquivo importado");
  // Processar e atualizar 'dados', salvar no localStorage
}
function incluir(e) {
  e.preventDefault();
  // Pega valores dos inputs e adiciona nos dados
  alert("Incluído");
  // Salva no localStorage e atualiza
}
