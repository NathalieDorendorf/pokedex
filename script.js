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

async function init() {
    await fetchDataPokemon();
    displayDataPokemon();
}

// async function fetchDataPokemon() {
//     try {
//         let response = await fetch(BASE_URL);
//         let responseAsJson = await response.json();
//         console.log(responseAsJson);
//         displayDataPokemon(responseAsJson);
//     } catch (error) {
//         console.error('Pokemon konnten nicht geladen werden', error);
//     }
// }

// function displayDataPokemon(responseAsJson) {
//     let jsonDataDiv = document.getElementById('content');
//     jsonDataDiv.innerHTML = '';
//     for (let index = 0; index < responseAsJson.length; index++) {
//         const pokemon = responseAsJson[index];
//         jsonDataDiv.innerHTML += `<div>${pokemon}</div>`;
//     }
// }


async function fetchDataPokemon() {
    try {
        let response = await fetch(BASE_URL);
        let allPokemon = await response.json();
        console.log(allPokemon);
        let pokeName = allPokemon.results;
        console.log(pokeName);
    } catch (error) {
        console.error('Pokemon konnten nicht geladen werden', error);
    }
}

function displayDataPokemon(allPokemon) {
    let jsonDataDiv = document.getElementById('content');
    for (let index = 0; index < allPokemon.length; index++) {
        const pokemon = allPokemon[index];
        jsonDataDiv.innerHTML = `<div>${pokemon}</div>`;
    }
    
}