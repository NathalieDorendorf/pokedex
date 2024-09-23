const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const TYPE_URL = 'https://pokeapi.co/api/v2/type';

let allPokemon = [];
let currentPokemon = [];
let offset = 0;
let limit = 25;
let type = 1;

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


async function fetchPokemonType() {
    try {
        let response = await fetch(TYPE_URL);
        let responseAsJson = await response.json();
        let allTypes = responseAsJson.results;
        console.log('Pokemon Types: ', allTypes);
        return allTypes;
    } catch (error) {
        console.error('Typen konnten nicht geladen werden', error);
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
    currentPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(search));
    console.log(currentPokemon);
    renderFilteredLittlePokemonCard();
}


async function loadMorePokemon() {
    offset += limit;
    await fetchAllPokemonData();
}


function openOverlay(i) {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    let body = document.getElementById('body');
    body.classList.add('overflow');
    overlay.innerHTML = generateBigPokemonCardContainer(i);
}


function closeOverlay() {
    let overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
    let body = document.getElementById('body');
    body.classList.remove('overflow');
}



