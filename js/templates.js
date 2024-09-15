function generateLoadingSpinner() {
    return `
        <div class="pokeball-container">
            <div class="pokeball"></div>
        </div>
    `;
}


function generateLittlePokemonCardContainer(pokemon, i) {
    let mainType = pokemon.types[0].type.name;
    let backgroundColor = typeColors[mainType] || '#f5f5f5';
    let types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    return `
        <div onclick="toggleOverlay(${i})" id="littlePokemonCard${i}" class="little-pokemon-card" style="background-color: ${backgroundColor};">
            <div class="d-flex-sb-c">
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


function generateBigPokemonCardContainer(pokemon, i) {
    return `
        <div class="big-pokemon-card" style="background-color: ${backgroundColor};">
            <img id="arrowLeft" class="arrow" onclick="previousPokemon${i}" src="" alt="previous pokemon">
            <img id="pokemon${i}" class="" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <img id="arrowRight" class="arrow" onclick="nextPokemon${i}" src="" alt="next pokemon">
        </div>
    `;
}
