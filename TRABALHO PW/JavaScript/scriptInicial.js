var items = [];

function formatDate(date) {
    var parts = date.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function addItem() {
    var itemName = document.getElementById('itemName');
    var itemQuantity = document.getElementById('itemQuantity');
    var itemExpiry = document.getElementById('itemExpiry');
    var itemList = document.getElementById('itemList');
    
    var formattedExpiry = formatDate(itemExpiry.value);

    var itemDiv = document.createElement('div');
    itemDiv.textContent = `Produto: ${itemName.value}, Quantidade: ${itemQuantity.value}, Validade: ${formattedExpiry}`;
    itemDiv.className = 'item';

    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = function() {
        var index = items.indexOf(itemName.value);
        if (index > -1) {
            items.splice(index, 1);
        }
        itemList.removeChild(itemDiv);
    };

    itemDiv.appendChild(removeButton);
    itemList.appendChild(itemDiv);

    items.push({name: itemName.value, div: itemDiv});
    itemName.value = '';
    itemQuantity.value = '';
    itemExpiry.value = '';
}

function searchItem() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();

    for (var i = 0; i < items.length; i++) {
        if (items[i].name.toLowerCase().includes(searchInput)) {
            items[i].div.style.display = '';
        } else {
            items[i].div.style.display = 'none';
        }
    }
}
