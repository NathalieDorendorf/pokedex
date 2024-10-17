const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const TYPE_URL = 'https://pokeapi.co/api/v2/type';
const SINGLE_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon-species';

let allPokemonNames = [];
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


const typeImages = {
    grass: "./assets/img/grass.svg",
    fire: "./assets/img/fire.svg",
    water: "./assets/img/water.svg",
    bug: "./assets/img/bug.svg",
    normal: "./assets/img/normal.svg",
    poison: "./assets/img/poison.svg",
    electric: "./assets/img/electric.svg",
    ground: "./assets/img/ground.svg",
    fairy: "./assets/img/fairy.svg",
    fighting: "./assets/img/fighting.svg",
    psychic: "./assets/img/psychic.svg",
    rock: "./assets/img/rock.svg",
    ghost: "./assets/img/ghost.svg",
    ice: "./assets/img/ice.svg",
    dragon: "./assets/img/dragon.svg",
    dark: "./assets/img/dark.svg",
    steel: "./assets/img/steel.svg",
    flying: "./assets/img/flying.svg"
};


async function init() {
    showLoadingSpinner();
    await fetchPokemonName();
    await fetchAllPokemonData();
}


async function fetchAllPokemonData() {
    try {
        let response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
        let responseAsJson = await response.json();
        let allPokemonData = responseAsJson.results;
        console.log(allPokemonData);
        let promises = allPokemonData.map(pokemon => fetchSinglePokemonData(pokemon.url));
        let allPokemonDetails = await Promise.all(promises);
        allPokemon = [...allPokemon, ...allPokemonDetails];
        renderLittlePokemonCard();
    } catch (error) {
        console.error('Pokemon konnten nicht geladen werden', error);
    }
}


async function fetchSinglePokemonData(pokemonUrl) {
    try {
        let response = await fetch(pokemonUrl);
        let pokemonDetails = await response.json();
        console.log(pokemonDetails);
        return pokemonDetails;
    } catch (error) {
        console.error('Einzeldaten konnten nicht geladen werden', error);
    }
}


async function fetchPokemonName() {
    try {
        let response = await fetch(`${BASE_URL}?limit=100000&offset=0`);
        let responseAsJson = await response.json();
        let allNames = responseAsJson.results;
        console.log(allNames);
        return allPokemonNames.push(...allNames);
    } catch (error) {
        console.error('Namen konnten nicht geladen werden', error);
    }
}


async function fetchCurrentSinglePokemonData(index) {
    let singlePokemon = currentPokemon[index];
    try {
        let response = await fetch(singlePokemon.url);
        let currentPokemonDetails = await response.json();
        console.log(currentPokemonDetails);
        return currentPokemon.push(currentPokemonDetails);
    } catch (error) {
        console.error('Einzelpokemon konnten nicht geladen werden', error);
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


async function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.trim().toLowerCase();
    console.log(search);
    let matchedPokemon = allPokemonNames.filter(pokemon => pokemon.name.toLowerCase().includes(search));
    currentPokemon = [];
    console.log(matchedPokemon);
    if (search === '') {
        renderLittlePokemonCard();
        return;
    } else if (matchedPokemon.length === 0) {
        console.log('Keine Pokemon gefunden');
        document.getElementById('content').innerHTML = '<h2 class="d-flex-c-c section-pad text-center">Keine Pokemon gefunden</h2>';
        return;
        } else if (search.length >= 3) {
            let promises = matchedPokemon.map(pokemon => fetchSinglePokemonData(pokemon.url));
            currentPokemon = await Promise.all(promises);
            console.log('Pokemon gefunden: ', currentPokemon);
        }
    renderFilteredLittlePokemonCard();
}


async function loadMorePokemon() {
    offset += limit;
    await fetchAllPokemonData();
}


function openOverlay(index) {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    let body = document.getElementById('body');
    body.classList.add('overflow');
    overlay.innerHTML = generateBigPokemonCardContainer(index);
    let pokemon = allPokemon[index];
    let AUDIO_CRIES = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`);
    AUDIO_CRIES.play();
    AUDIO_CRIES.onerror = function() {
        console.error('Schrei konnte nicht abgespielt werden');
    };
}


function closeOverlay() {
    let overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
    let body = document.getElementById('body');
    body.classList.remove('overflow');
}


function previousPokemon(currentIndex) {
    if (currentIndex > 0) {
        openOverlay(currentIndex - 1);
    }
}


function nextPokemon(currentIndex) {
    if (currentIndex < allPokemon.length - 1) {
        openOverlay(currentIndex + 1);
    }
}
