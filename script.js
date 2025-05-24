// Adding Players
const input = document.getElementById("playerName");
const list = document.getElementById("itemList");

window.onload = function () {
  const savedItems = JSON.parse(localStorage.getItem('items')) || [];
  savedItems.forEach(item => {
    addItem(item);
  });
}




function addPlayer() {
  const text = input.value.trim();
  if (text !== '') {
    addItem(text);

    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
    input.value = '';
  } else {
    alert("Enter player name");
  }
}

function addItem(text) {
  const li = document.createElement("li");
  li.style.listStyle = "none";
  li.textContent = text;

  if (list) {
    list.appendChild(li);
  }
}


// Removing Players

function removePlayer() {
  const nameToRemove = document.getElementById("removePlayerName").value.trim();
  if (nameToRemove === "") {
    alert("Enter a name to remove.");
    return;
  }

  let items = JSON.parse(localStorage.getItem("items")) || [];

  if (!items.includes(nameToRemove)) {
    alert("Player not found.");
    return;
  }
