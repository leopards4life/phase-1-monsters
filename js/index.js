let pageNumber = 1;

document.addEventListener("DOMContentLoaded", function() {
    fetchMonsters();
}
);

// fetch 50 monsters, assign to variable
function fetchMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(res => res.json())
    .then(data => renderMonsters(data))
};

// display monsters {name, age, description}
function renderMonsters(monsters) {
    let monsterContainer = document.getElementById("monster-container");
        monsters.forEach(monster => {
        let card = document.createElement("div");
        card.className="monster-card";
        card.innerHTML=`<h3>Name: ${monster.name}</h3>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>`;
        card.style.height="150px";
        card.style.width="auto";
        monsterContainer.appendChild(card);
    })
};

// Create form with three inputs, name, age, description, and submit

function handleSubmit(event) {
    event.preventDefault();
    let newMonster = {
        name: event.target[0].value,
        age: event.target[1].value,
        description: event.target[2].value
    };
    createMonster(newMonster);
    submitButton.reset();
};

const submitButton = document.getElementById("monster-form");
submitButton.addEventListener("submit", handleSubmit);

// Post request - create new monster

function createMonster(monster) {
   fetch('http://localhost:3000/monsters', {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "name": monster.name,
            "age": monster.age,
            "description": monster.description
        })
    })
    let monsterContainer = document.getElementById("monster-container");
    let card = document.createElement("div");
        card.className="monster-card";
        card.innerHTML=`<h3>Name: ${monster.name}</h3>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>`;
        card.style.height="150px";
        card.style.width="auto";
    monsterContainer.appendChild(card);
};

const monsterCards = document.getElementsByClassName("monster-card");

function showMoreMonsters() {
    pageNumber++;
    fetchMonsters();
};

function showPreviousMonsters() {
    pageNumber--;
    fetchMonsters();
};

// Increment page number for forward
const loadMoreMonsters = document.getElementById("forward");
loadMoreMonsters.addEventListener("click", showMoreMonsters);

// Decrement page number for backward
const loadPreviousMonsters = document.getElementById("back");
loadPreviousMonsters.addEventListener("click", showPreviousMonsters);