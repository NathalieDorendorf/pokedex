const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

let allPokemon = [];
let offset = 0;
let limit = 26;
let currentIndex = 1;

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


async function init() {
    showLoadingSpinner();
    await fetchAllPokemonData();
    // hideLoadingSpinner();
}


async function fetchAllPokemonData() {
    try {
        let response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
        let responseAsJson = await response.json();
        let allPokemonData = responseAsJson.results;
        for (let i = 0; i < allPokemonData.length; i++) {
            const singlePokemonData = await fetchSinglePokemonData(allPokemonData[i].url);
            allPokemon.push(singlePokemonData);
        }
        renderLittlePokemonCard();
    } catch (error) {
        console.error('Pokemon konnten nicht geladen werden', error);
    }
}


async function fetchSinglePokemonData(pokemonUrl) {
    try {
        let response = await fetch(pokemonUrl);
        let pokemonDetails = await response.json();
        return pokemonDetails;
    } catch (error) {
        console.error('Einzeldaten konnten nicht geladen werden', error);
    }
}


function showLoadingSpinner() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += generateLoadingSpinner(); 
}


function renderLittlePokemonCard() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        const pokemonCard = allPokemon[i];
        content.innerHTML += generateLittlePokemonCardContainer(pokemonCard);
        // renderLittlePokemonStats(i);
    }
}


// function renderLittlePokemonStats(i) {
//     let statsContent = document.getElementById(`stats${i}`);
//     statsContent.innerHTML = '';
//     for (let j = 0; j < allPokemonData[i].stats.length; j++) {
//         const pokemonStats = allPokemonData[i].stats[j];
//         statsContent.innerHTML += generatePokemonStatsContainer(i,j);
//     }
// }


