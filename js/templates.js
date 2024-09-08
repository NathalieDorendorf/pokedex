function generateLoadingSpinner() {
    return `
        <div class="pokeball-container">
            <div class="pokeball"></div>
        </div>
    `;
}


function generateLittlePokemonCardContainer(pokemon) {
    let mainType = pokemon.types[0].type.name;
    let backgroundColor = typeColors[mainType] || '#f5f5f5';
    let types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    return `
        <div class="pokemon-card-container" style="background-color: ${backgroundColor};">
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


