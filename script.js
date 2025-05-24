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

  items = items.filter(item => item !== nameToRemove);
  localStorage.setItem("items", JSON.stringify(items));

  list.innerHTML = "";
  items.forEach(item => addItem(item));

  // clear input
  document.getElementById("removePlayerName").value = "";
}


// match tracking

function loadPlayersToDropdown() {
  var players = JSON.parse(localStorage.getItem("items")) || [];

  var playerA = document.getElementById("playerA");
  var playerB = document.getElementById("playerB");
  var winner = document.getElementById("winner");

  if (!playerA || !playerB || !winner) return;

  playerA.innerHTML = "";
  playerB.innerHTML = "";
  winner.innerHTML = "";

  for (var i = 0; i < players.length; i++) {
    var optionA = document.createElement("option");
    optionA.value = players[i];
    optionA.text = players[i];
    playerA.appendChild(optionA);

    var optionB = document.createElement("option");
    optionB.value = players[i];
    optionB.text = players[i];
    playerB.appendChild(optionB);

    var optionW = document.createElement("option");
    optionW.value = players[i];
    optionW.text = players[i];
    winner.appendChild(optionW);
  }
}

function recordMatch() {
  var a = document.getElementById("playerA").value;
  var b = document.getElementById("playerB").value;
  var win = document.getElementById("winner").value;

  if (a === b) {
    alert("Select two different players.");
    return;
  }

  var lose = (win === a) ? b : a;

  var stats = JSON.parse(localStorage.getItem("matchStats")) || {};

  if (!stats[win]) {
    stats[win] = { wins: 0, losses: 0 };
  }
  if (!stats[lose]) {
    stats[lose] = { wins: 0, losses: 0 };
  }

  stats[win].wins += 1;
  stats[lose].losses += 1;

  localStorage.setItem("matchStats", JSON.stringify(stats));

  showStats();
  alert("Match recorded successfully.");
}

function showStats() {
  var stats = JSON.parse(localStorage.getItem("matchStats")) || {};
  var table = document.getElementById("statsTable");
  if (!table) return;

  table.innerHTML = "";

  for (var player in stats) {
    var row = "<tr>";
    row += "<td>" + player + "</td>";
    row += "<td>" + stats[player].wins + "</td>";
    row += "<td>" + stats[player].losses + "</td>";
    row += "</tr>";
    table.innerHTML += row;
  }
}

window.onload = function () {
  const savedItems = JSON.parse(localStorage.getItem("items")) || [];
  if (typeof addItem === "function" && document.getElementById("itemList")) {
    savedItems.forEach(item => addItem(item));
  }

  loadPlayersToDropdown();
  showStats();
};