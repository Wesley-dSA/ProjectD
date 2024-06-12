// scriptInicial.js
window.onload = function() {
    carregarItens();
    document.getElementById('pesquisa').addEventListener('input', pesquisarItens);
  };
  
  function carregarItens() {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
    let usuarioLogado = userLogado.user;
  
    if (!usuarioLogado) {
      console.error('Nenhum usuário logado encontrado.');
      return;
    }
  
    let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');
    items.forEach(item => {
      addItemToDOM(item.name, item.quantity, item.expiry);
    });
  }
  
  function addItem() {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
    let usuarioLogado = userLogado.user;
  
    if (!usuarioLogado) {
      console.error('Nenhum usuário logado encontrado.');
      return;
    }
  
    let itemName = document.getElementById('itemName').value.trim();
    let itemQuantity = document.getElementById('itemQuantity').value.trim();
    let itemExpiry = document.getElementById('itemExpiry').value.trim();
  
    if (!itemName || !itemQuantity || !itemExpiry) {
      alert('Todos os campos são obrigatórios.');
      return;
    }
  
    let formattedExpiry = formatDate(itemExpiry);
  
    let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');
    let newItem = { name: itemName, quantity: parseInt(itemQuantity), expiry: formattedExpiry };
    items.push(newItem);
    localStorage.setItem(usuarioLogado + '_items', JSON.stringify(items));
  
    addItemToDOM(itemName, itemQuantity, formattedExpiry);
    verificarItensFaltantes();
  
    document.getElementById('itemName').value = '';
    document.getElementById('itemQuantity').value = '';
    document.getElementById('itemExpiry').value = '';
  }
  
  function addItemToDOM(itemName, itemQuantity, itemExpiry) {
    let itemList = document.getElementById('itemList');
    let itemDiv = document.createElement('div');
    itemDiv.className = 'item';
  
    let itemText = document.createElement('span');
    itemText.textContent = `${itemName} ${itemQuantity} ${itemExpiry}`;
    itemDiv.appendChild(itemText);
  
    let increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.onclick = function() {
      updateItemQuantity(itemName, 1);
    };
  
    let decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.onclick = function() {
      updateItemQuantity(itemName, -1);
    };
  
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = function() {
      let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
      let usuarioLogado = userLogado.user;
      let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');
      items = items.filter(item => item.name !== itemName);
      localStorage.setItem(usuarioLogado + '_items', JSON.stringify(items));
      itemList.removeChild(itemDiv);
      verificarItensFaltantes();
    };
  
    itemDiv.appendChild(increaseButton);
    itemDiv.appendChild(decreaseButton);
    itemDiv.appendChild(removeButton);
    itemList.appendChild(itemDiv);
  }
  
  function updateItemQuantity(itemName, quantityChange) {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
    let usuarioLogado = userLogado.user;
  
    if (!usuarioLogado) {
      console.error('Nenhum usuário logado encontrado.');
      return;
    }
  
    let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');
    let item = items.find(item => item.name === itemName);
    if (item) {
      item.quantity += quantityChange;
      if (item.quantity < 0) item.quantity = 0;
      localStorage.setItem(usuarioLogado + '_items', JSON.stringify(items));
      document.getElementById('itemList').innerHTML = '';
      carregarItens();
      verificarItensFaltantes();
    }
  }
  
  function verificarItensFaltantes() {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
    let usuarioLogado = userLogado.user;
  
    if (!usuarioLogado) {
      console.error('Nenhum usuário logado encontrado.');
      return;
    }
  
    let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');
    let listaCompras = JSON.parse(localStorage.getItem(usuarioLogado + '_listaCompras') || '[]');
  
    items.forEach(item => {
      if (item.quantity <= 5 && !listaCompras.find(i => i.name === item.name)) {
        listaCompras.push({ name: item.name, quantity: 1 }); // Adiciona com quantidade padrão
      }
    });
  
    localStorage.setItem(usuarioLogado + '_listaCompras', JSON.stringify(listaCompras));
  }
  
  function pesquisarItens() {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
    let usuarioLogado = userLogado.user;
    let searchQuery = document.getElementById('pesquisa').value.toLowerCase();
    
    let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');
    let itemList = document.getElementById('itemList');
  
    itemList.innerHTML = '';
  
    items.forEach(item => {
      if (item.name.toLowerCase().includes(searchQuery)) {
        addItemToDOM(item.name, item.quantity, item.expiry);
      }
    });
  }
  
  function formatDate(date) {
    let parts = date.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  function irParaLista(){
    window.location.href = "/ProjectD/TRABALHO PW/HTML/Lista.html"
  }
  