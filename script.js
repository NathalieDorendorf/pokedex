const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0';


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


init();


function init() {
    fetchAllPokemonData();
    // fetchSinglePokemonData();
    // displayDataPokemon();
    // renderLittlePokemonCard();
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


async function fetchAllPokemonData() {
    try {
        let response = await fetch(BASE_URL);
        let allPokemonData = await response.json();
        console.log(allPokemonData);
        allPokemon.push(allPokemonData);
        console.log(allPokemon);
        renderLittlePokemonCard();
    } catch (error) {
        console.error('Pokemon konnten nicht geladen werden', error);
    }
}


// async function fetchSinglePokemonData(i) {
//     try {
//         let response = await fetch(`BASE_URL${i}`);
//         let singlePokemon = await response.text();
//         console.log(singlePokemon);
//         let pokeName = singlePokemon.name;
//         console.log(pokeName);
//     } catch (error) {
//         console.error('Name konnten nicht geladen werden', error);
//     }
// }



// function displayDataPokemon(allPokemon) {
//     let jsonDataDiv = document.getElementById('content');
//     for (let index = 0; index < allPokemon.length; index++) {
//         const pokemon = allPokemon[index];
//         jsonDataDiv.innerHTML = `<div>${pokemon}</div>`;
//     }
    
// }


function renderLittlePokemonCard() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        const pokemonCard = allPokemon[i];
        content.innerHTML += generateLittlePokemonCardContainer(i);
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


