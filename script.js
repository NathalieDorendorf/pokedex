const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const TYPE_URL = 'https://pokeapi.co/api/v2/type';
const SINGLE_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon-species';

let allPokemonNames = [];
let allPokemon = [];
let currentPokemon = [];
let displayedPokemonCount = 25;
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
        let response = await fetch(`${BASE_URL}?limit=100000&offset=0`);
        let responseAsJson = await response.json();
        let allPokemonData = responseAsJson.results;
        let promises = allPokemonData.map(pokemon => fetchSinglePokemonData(pokemon.url));
        let allPokemonDetails = await Promise.all(promises);
        allPokemon = [...allPokemon, ...allPokemonDetails];
        renderLittlePokemonCard(0, displayedPokemonCount);
    } catch (error) {
        console.error('Pokemon konnten nicht geladen werden', error);
    }
}


async function fetchSinglePokemonData(pokemonUrl) {
    try {
        let response = await fetch(pokemonUrl);
        let pokemonDetails = await response.json();
        let speciesResponse = await fetch(pokemonDetails.species.url);
        let speciesDetails = await speciesResponse.json();
        let englishDescription = speciesDetails.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
        pokemonDetails.englishDescription = englishDescription ? englishDescription : 'No english description available';
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


async function fetchEvolutionChain(pokemonId) {
    try {
        let response = await fetch(`${SINGLE_POKEMON_URL}/${pokemonId}/`);
        let responseAsJson = await response.json();
        let evolutionResponse = await fetch(responseAsJson.evolution_chain.url);
        let evolutionData = await evolutionResponse.json();
        console.log('Evolution Chain Data: ', evolutionData);
        
        const evolutions = {};
        const baseEvolutionParts = evolutionData.chain.species.url.split('/');
        const baseEvolutionId = baseEvolutionParts[baseEvolutionParts.length - 2];
        const baseEvolutionSprite = allPokemon[+baseEvolutionId - 1].sprites.other.home.front_default;
        evolutions.base = allPokemon[+baseEvolutionId - 1];
        const firstEvolution = evolutionData.chain.evolves_to[0];
        if (firstEvolution) {
            const firstEvolutionParts = firstEvolution.species.url.split('/');
            const firstEvolutionId = firstEvolutionParts[firstEvolutionParts.length - 2];
            const firstEvolutionSprite = allPokemon[+firstEvolutionId - 1].sprites.other.home.front_default;
            evolutions.first = allPokemon[+firstEvolutionId - 1];
            const secondEvolution = firstEvolution.evolves_to[0];
            if (secondEvolution) {
                const secondEvolutionParts = secondEvolution.species.url.split('/');
                const secondEvolutionId = secondEvolutionParts[secondEvolutionParts.length - 2];
                const secondEvolutionSprite = allPokemon[+secondEvolutionId - 1].sprites.other.home.front_default;
                evolutions.second = allPokemon[+secondEvolutionId - 1];
            }
        }
        console.log('Evolution Chain: ', evolutions);
        
        generateEvolutionsSection(evolutions);
    } catch (error) {
        console.error('Evolution Chain konnte nicht geladen werden', error);
    }
}


function showLoadingSpinner() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += generateLoadingSpinner(); 
}


function renderLittlePokemonCard(startIndex, count) {
    let content = document.getElementById('content');
    content.innerHTML = '';
    let endIndex = Math.min(startIndex + count, allPokemon.length);
    for (let i = startIndex; i < endIndex; i++) {
        const pokemonCard = allPokemon[i];
        content.innerHTML += generateLittlePokemonCardContainer(pokemonCard);
    }
    if (endIndex >= allPokemon.length) {
        document.getElementById('button').classList.add('d-none');
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
    let matchedPokemon = allPokemonNames.filter(pokemon => pokemon.name.toLowerCase().includes(search));
    currentPokemon = [];
    if (search === '') {
        renderLittlePokemonCard();
        return;
    } else if (matchedPokemon.length === 0) {
        document.getElementById('content').innerHTML = '<h2 class="d-flex-c-c section-pad text-center">Keine Pokemon gefunden</h2>';
        return;
        } else if (search.length >= 3) {
            let promises = matchedPokemon.map(pokemon => fetchSinglePokemonData(pokemon.url));
            currentPokemon = await Promise.all(promises);
        }
    renderFilteredLittlePokemonCard();
}


async function loadMorePokemon() {
    offset += limit;
    await fetchAllPokemonData(offset, limit);
}


async function openOverlay(index) {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    let body = document.getElementById('body');
    body.classList.add('overflow');
    overlay.innerHTML = generateBigPokemonCardContainer(index);
    let pokemon = allPokemon[index];
    await fetchEvolutionChain(pokemon.id);
    let AUDIO_CRIES = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`);
    AUDIO_CRIES.play();
    AUDIO_CRIES.onerror = function() {
        console.error('Schrei konnte nicht abgespielt werden');
    };
    hideFirstArrowOnCard(index);
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


function hideFirstArrowOnCard(index) {
    if (index == 0) {
        document
            .getElementById(`arrowLeft${index}`)
            .classList.add("d-none");
        document
            .getElementById(`arrowDiv`)
            .style.justifyContent = "flex-end";
    }
}


async function showSection(index, section) {
    document.getElementById('pokemonInfoSection').innerHTML = '';
    if (section === 'about') {
        document.getElementById('pokemonInfoSection').innerHTML = generateAboutSection(index);
    } else if (section === 'baseStats') {
        document.getElementById('pokemonInfoSection').innerHTML = generateBaseStatsSection(index);
    } else if (section === 'evolutions') {
        document.getElementById('pokemonInfoSection').innerHTML = generateEvolutionsSection(index);
    }
}

