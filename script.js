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
        renderLittlePokemonCard(0, displayedPokemonCount);
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
    displayedPokemonCount += 25;
    renderLittlePokemonCard(offset, displayedPokemonCount);
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
    showSection(index, 'about');
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
        document.getElementById('pokemonInfoSection').innerHTML = fetchEvolutionChain(index);
    }
}


function filterKantoPokemon(pokemonList) {
    return pokemonList.filter(pokemon => pokemon.id >= 1 && pokemon.id <= 151);
}


function renderKantoPokemon() {
    const kantoPokemon = filterKantoPokemon(allPokemon);
    console.log('Kanto Pokemon: ', kantoPokemon);
    currentPokemon = kantoPokemon;
    renderFilteredLittlePokemonCard(kantoPokemon);
}


function filterJohtoPokemon(pokemonList) {
    return pokemonList.filter(pokemon => pokemon.id >= 152 && pokemon.id <= 251);    
}


function renderJohtoPokemon() {
    const johtoPokemon = filterJohtoPokemon(allPokemon);
    console.log('Johto Pokemon: ', johtoPokemon);
    currentPokemon = johtoPokemon;
    renderFilteredLittlePokemonCard(johtoPokemon);
}


function filterHoennPokemon(pokemonList) {
    return pokemonList.filter(pokemon => pokemon.id >= 252 && pokemon.id <= 386);
}


function renderHoennPokemon() {
    const hoennPokemon = filterHoennPokemon(allPokemon);
    console.log('Hoenn Pokemon: ', hoennPokemon);
    currentPokemon = hoennPokemon;
    renderFilteredLittlePokemonCard(hoennPokemon);
}


function filterSinnohPokemon(pokemonList) {
    return pokemonList.filter(pokemon => pokemon.id >= 387 && pokemon.id <= 493);
}


function renderSinnohPokemon() {
    const sinnohPokemon = filterSinnohPokemon(allPokemon);
    console.log('Sinnoh Pokemon: ', sinnohPokemon);
    currentPokemon = sinnohPokemon;
    renderFilteredLittlePokemonCard(sinnohPokemon);
}


function filterUnovaPokemon(pokemonList) {
    return pokemonList.filter(pokemon => pokemon.id >= 494 && pokemon.id <= 649);
}


function renderUnovaPokemon() {
    const unovaPokemon = filterUnovaPokemon(allPokemon);
    console.log('Unova Pokemon: ', unovaPokemon);
    currentPokemon = unovaPokemon;
    renderFilteredLittlePokemonCard(unovaPokemon);
}


function filterKalosPokemon(pokemonList) {
    return pokemonList.filter(pokemon => pokemon.id >= 650 && pokemon.id <= 721);
}


function renderKalosPokemon() {
    const kalosPokemon = filterKalosPokemon(allPokemon);
    console.log('Kalos Pokemon: ', kalosPokemon);
    currentPokemon = kalosPokemon;
    renderFilteredLittlePokemonCard(kalosPokemon);
}


function filterAlolaPokemon(pokemonList) {
    return pokemonList.filter(pokemon => pokemon.id >= 800 && pokemon.id <= 898);
}


function renderAlolaPokemon() {
    const alolaPokemon = filterAlolaPokemon(allPokemon);
    console.log('Alola Pokemon: ', alolaPokemon);
    currentPokemon = alolaPokemon;
    renderFilteredLittlePokemonCard(alolaPokemon);
}


function filterGalarPokemon(pokemonList) {
    return pokemonList.filter(pokemon => pokemon.id >= 900 && pokemon.id <= 969);
}


function renderGalarPokemon() {
    const galarPokemon = filterGalarPokemon(allPokemon);
    console.log('Galar Pokemon: ', galarPokemon);
    currentPokemon = galarPokemon;
    renderFilteredLittlePokemonCard(galarPokemon);
}


function filterPaldeaPokemon(pokemonList) {
    return pokemonList.filter(pokemon => pokemon.id >= 906 && pokemon.id <= 1010);
}


function renderPaldeaPokemon() {
    const paldeaPokemon = filterPaldeaPokemon(allPokemon);
    console.log('Paldea Pokemon: ', paldeaPokemon);
    currentPokemon = paldeaPokemon;
    renderFilteredLittlePokemonCard(paldeaPokemon);
}


function filterAllPokemon(pokemonList) {
    return pokemonList;
}


function renderAllPokemon() {
    currentPokemon = allPokemon;
    renderFilteredLittlePokemonCard(allPokemon);
}


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// function showBackToTopButton() {
//     if (window.scrollY > 20) {
//         document.getElementById('back-to-top').classList.remove('d-none');
//     }
// }


window.onscroll = function () {
    scrollFunction() 
};


function scrollFunction() {
    let backToTopButton = document.getElementById('back-to-top');
    if (window.scrollY > 20) {
        backToTopButton.classList.remove('d-none');
    } else {
        backToTopButton.classList.add('d-none');
    }
}
