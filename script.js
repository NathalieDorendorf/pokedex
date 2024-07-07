const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

const typeColors = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    flying: "#A890F0"
};

let allPokemonData = [];
let currentIndex = 1;

init();

function init() {
    fetchDataPokemon();
}

async function fetchDataPokemon() {
    try {
        let response = await fetch(BASE_URL);
        let responseAsJson = await response.json();
        displayDataPokemon(responseAsJson);
    } catch (error) {
        console.error('Pokemon konnten nicht geladen werden', error);
    }
}

function displayDataPokemon(responseAsJson) {
    let jsonDataDiv = document.getElementById('content');
    jsonDataDiv.innerHTML = `<pre>${JSON.stringify(responseAsJson, null, 2)}</pre>`;
}

