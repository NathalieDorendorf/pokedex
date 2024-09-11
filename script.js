const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

let allPokemon = [];
let currentPokemon = [];
let offset = 0;
let limit = 25;
// let currentIndex = 1;

const typeColors = {
    grass: "#74cb48",
    fire: "#f57d31",
    water: "#6493eb",
    bug: "#a7b723",
    normal: "#aaa67f",
    poison: "#a43e9e",
    electric: "#f9cf30",
    ground: "#dec16b",
    fairy: "#e69eac",
    fighting: "#c12239",
    psychic: "#fb5584",
    rock: "#b69e31",
    ghost: "#70559b",
    ice: "#9ad6df",
    dragon: "#7037ff",
    dark: "#75574c",
    steel: "#b7b9d0",
    flying: "#a891ec"
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


function renderFilteredLittlePokemonCard() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < currentPokemon.length; i++) {
        const filteredPokemonCard = currentPokemon[i];
        content.innerHTML += generateLittlePokemonCardContainer(filteredPokemonCard);
    }
}


function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    console.log(search);
    let filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(search));
    console.log(filteredPokemon);
    currentPokemon.push(filteredPokemon);
    console.log(currentPokemon);
    renderFilteredLittlePokemonCard();
}


function openBigPokemonCard(i) {
    let overlay = document.getElementById('bigPokemonCardOverlay');
    overlay.classList.remove('d-none');
    overlay.innerHTML = `
        <div class="">
            div class="d-flex-sb-c">
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <p>#${pokemon.id}</p>
            </div>
            <div class="d-flex-sb-c">
                <div>
                    <div>${types}</div>
                </div>
                <img class="" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            </div>
        </div>
    `;
}



// function renderLittlePokemonStats(i) {
//     let statsContent = document.getElementById(`stats${i}`);
//     statsContent.innerHTML = '';
//     for (let j = 0; j < allPokemonData[i].stats.length; j++) {
//         const pokemonStats = allPokemonData[i].stats[j];
//         statsContent.innerHTML += generatePokemonStatsContainer(i,j);
//     }
// }


