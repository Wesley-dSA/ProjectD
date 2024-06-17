window.onload = function() {
    carregarItens();
    document.getElementById('pesquisa').addEventListener('input', pesquisarItens);
};

function carregarItens() {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
    let usuarioLogado = userLogado.email;

    if (!usuarioLogado) {
        console.error('Nenhum usuário logado encontrado.');
        return;
    }

    let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');
    items.forEach(item => {
        addItemToDOM(item.name, item.quantity, item.expiry, item.indispensable);
    });
    verificarItensFaltantes();
}

function addItem() {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
    let usuarioLogado = userLogado.email;

    if (!usuarioLogado) {
        console.error('Nenhum usuário logado encontrado.');
        return;
    }

    let itemName = document.getElementById('itemName').value.trim();
    let itemQuantity = document.getElementById('itemQuantity').value.trim();
    let itemExpiry = document.getElementById('itemExpiry').value.trim();
    let itemIndispensable = document.getElementById('itemIndispensable').checked;

    if (!itemName || !itemQuantity || !itemExpiry) {
        alert('Todos os campos são obrigatórios.');
        return;
    }

    let formattedExpiry = formatDate(itemExpiry);

    let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');
    let newItem = { name: itemName, quantity: parseInt(itemQuantity), expiry: formattedExpiry, indispensable: itemIndispensable };
    items.push(newItem);
    localStorage.setItem(usuarioLogado + '_items', JSON.stringify(items));

    addItemToDOM(itemName, itemQuantity, formattedExpiry, itemIndispensable);
    verificarItensFaltantes();

    document.getElementById('itemName').value = '';
    document.getElementById('itemQuantity').value = '';
    document.getElementById('itemExpiry').value = '';
    document.getElementById('itemIndispensable').checked = false;
}

function addItemToDOM(itemName, itemQuantity, itemExpiry, itemIndispensable) {
    let itemList = document.getElementById('itemList');
    let itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    let itemNameSpan = document.createElement('span');
    itemNameSpan.className = 'item-name';
    itemNameSpan.textContent = itemName;

    let itemQuantitySpan = document.createElement('span');
    itemQuantitySpan.className = 'item-quantity';
    itemQuantitySpan.textContent = itemQuantity;

    let itemExpirySpan = document.createElement('span');
    itemExpirySpan.className = 'item-expiry';
    itemExpirySpan.textContent = itemExpiry;

    let indispensableText = document.createElement('span');
    indispensableText.className = 'item-indispensable';
    indispensableText.textContent = itemIndispensable ? ' (Indispensável)' : '';

    itemDiv.appendChild(itemNameSpan);
    itemDiv.appendChild(itemQuantitySpan);
    itemDiv.appendChild(itemExpirySpan);
    itemDiv.appendChild(indispensableText);

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
    removeButton.innerHTML = '<span class="material-icons">delete</span>';
    removeButton.onclick = function() {
        let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
        let usuarioLogado = userLogado.email;
        let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');
        items = items.filter(item => item.name !== itemName);
        localStorage.setItem(usuarioLogado + '_items', JSON.stringify(items));
        itemList.removeChild(itemDiv);
        verificarItensFaltantes();
    };

    let editButton = document.createElement('button');
    editButton.innerHTML = '<span class="material-icons">edit</span>';
    editButton.onclick = function() {
        editarItem(itemName);
    };

    itemDiv.appendChild(increaseButton);
    itemDiv.appendChild(decreaseButton);
    itemDiv.appendChild(removeButton);
    itemDiv.appendChild(editButton);
    itemList.appendChild(itemDiv);
}

function editarItem(itemName) {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
    let usuarioLogado = userLogado.email;
    let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');
    let item = items.find(item => item.name === itemName);

    if (item) {
        let itemList = document.getElementById('itemList');
        itemList.innerHTML = '';
        items.forEach(i => {
            if (i.name === itemName) {
                let editDiv = document.createElement('div');
                editDiv.className = 'edit-item';

                let nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.value = i.name;
                nameInput.id = 'editName';

                let quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = i.quantity;
                quantityInput.id = 'editQuantity';

                let expiryInput = document.createElement('input');
                expiryInput.type = 'date';
                expiryInput.value = i.expiry.split('/').reverse().join('-');
                expiryInput.id = 'editExpiry';

                let indispensableInput = document.createElement('input');
                indispensableInput.type = 'checkbox';
                indispensableInput.checked = i.indispensable;
                indispensableInput.id = 'editIndispensable';

                let saveButton = document.createElement('button');
                saveButton.innerHTML = '<span class="material-icons">done</span>';
                saveButton.onclick = function() {
                    salvarItem(itemName);
                };

                editDiv.appendChild(nameInput);
                editDiv.appendChild(quantityInput);
                editDiv.appendChild(expiryInput);
                editDiv.appendChild(indispensableInput);
                editDiv.appendChild(saveButton);
                itemList.appendChild(editDiv);
            } else {
                addItemToDOM(i.name, i.quantity, i.expiry, i.indispensable);
            }
        });
    }
}

function salvarItem(oldName) {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
    let usuarioLogado = userLogado.email;
    let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');

    let newName = document.getElementById('editName').value.trim();
    let newQuantity = document.getElementById('editQuantity').value.trim();
    let newExpiry = document.getElementById('editExpiry').value.trim();
    let newIndispensable = document.getElementById('editIndispensable').checked;

    if (!newName || !newQuantity || !newExpiry) {
        alert('Todos os campos são obrigatórios.');
        return;
    }

    let formattedExpiry = formatDate(newExpiry);
    items = items.map(item => {
        if (item.name === oldName) {
            return { name: newName, quantity: parseInt(newQuantity), expiry: formattedExpiry, indispensable: newIndispensable };
        }
        return item;
    });

    localStorage.setItem(usuarioLogado + '_items', JSON.stringify(items));
    document.getElementById('itemList').innerHTML = '';
    items.forEach(item => {
        addItemToDOM(item.name, item.quantity, item.expiry, item.indispensable);
    });
    verificarItensFaltantes();
}

function updateItemQuantity(itemName, amount) {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
    let usuarioLogado = userLogado.email;
    let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');

    items = items.map(item => {
        if (item.name === itemName) {
            return { ...item, quantity: item.quantity + amount };
        }
        return item;
    });

    localStorage.setItem(usuarioLogado + '_items', JSON.stringify(items));
    document.getElementById('itemList').innerHTML = '';
    items.forEach(item => {
        addItemToDOM(item.name, item.quantity, item.expiry, item.indispensable);
    });
    verificarItensFaltantes();
}

function verificarItensFaltantes() {
    let userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');
    let usuarioLogado = userLogado.email;
    let items = JSON.parse(localStorage.getItem(usuarioLogado + '_items') || '[]');
    let listaCompras = JSON.parse(localStorage.getItem(usuarioLogado + '_listaCompras') || '[]');

    items.forEach(item => {
        let existingItem = listaCompras.find(listaItem => listaItem.name === item.name);
        if (item.quantity <= 5 && !existingItem) {
            listaCompras.push({ name: item.name, quantity: item.quantity, priority: item.indispensable });
        } else if (item.quantity > 5 && existingItem) {
            listaCompras = listaCompras.filter(listaItem => listaItem.name !== item.name);
        }
    });

    localStorage.setItem(usuarioLogado + '_listaCompras', JSON.stringify(listaCompras));
}

function formatDate(dateString) {
    let parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function irParaLista() {
    window.location.href = "/ProjectD/TRABALHO PW/HTML/Lista.html";
}

function pesquisarItens() {
    let input = document.getElementById('pesquisa').value.toLowerCase();
    let itemList = document.getElementById('itemList');
    let items = itemList.getElementsByClassName('item');

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let textValue = item.textContent || item.innerText;
        if (textValue.toLowerCase().indexOf(input) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }
}

function MenuUser() {
    var userMenu = document.getElementById('userDropdown');
    userMenu.classList.toggle('show');
}

function sair() {
    window.location.href = "/ProjectD/TRABALHO PW/HTML/Login.html";
}
