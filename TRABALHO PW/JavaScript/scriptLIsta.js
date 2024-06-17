// scriptLIsta.js
window.onload = function() {
  carregarListaCompras();
};

function carregarListaCompras() {
  let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
  let usuarioLogado = userLogado.email;

  if (!usuarioLogado) {
    console.error('Nenhum usuário logado encontrado.');
    return;
  }

  let listaCompras = JSON.parse(localStorage.getItem(usuarioLogado + '_listaCompras') || '[]');
  listaCompras.forEach(item => {
    addItemToDOM(item.name, item.quantity);
  });
}

function addItemToDOM(itemName, itemQuantity) {
  let listaComprasDiv = document.getElementById('listaCompras');
  let itemDiv = document.createElement('div');
  itemDiv.textContent = `${itemName} - Quantidade: ${itemQuantity}`;
  itemDiv.className = 'item';

  let removeButton = document.createElement('button');
  removeButton.textContent = 'Remover';
  removeButton.onclick = function() {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
    let usuarioLogado = userLogado.email;
    let listaCompras = JSON.parse(localStorage.getItem(usuarioLogado + '_listaCompras') || '[]');
    listaCompras = listaCompras.filter(item => item.name !== itemName);
    localStorage.setItem(usuarioLogado + '_listaCompras', JSON.stringify(listaCompras));
    listaComprasDiv.removeChild(itemDiv);
  };

  itemDiv.appendChild(removeButton);
  listaComprasDiv.appendChild(itemDiv);
}

function voltarParaDispensa() {
  window.location.href = '/ProjectD/TRABALHO PW/HTML/Dispensa.html';
}

function baixarListaDeCompras() {
  let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
  let usuarioLogado = userLogado.email;

  if (!usuarioLogado) {
    console.error('Nenhum usuário logado encontrado.');
    return;
  }

  let listaCompras = JSON.parse(localStorage.getItem(usuarioLogado + '_listaCompras') || '[]');
  let listaTexto = listaCompras.map(item => `${item.name} - Quantidade: ${item.quantity} - Prioridade: ${item.priority ? 'Alta' : 'Baixa'}`).join('\n');

  let blob = new Blob([listaTexto], { type: 'text/plain' });
  let link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'ListaDeCompras.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function toggleUserMenu() {
  var userMenu = document.getElementById('userDropdown');
  userMenu.classList.toggle('show');
}

function logout() {
  window.location.href = "/ProjectD/TRABALHO PW/HTML/Login.html";
}

