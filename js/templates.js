function generateLittlePokemonCardContainer(pokemon) {
    let types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    return `
        <div class="pokemon-card-container">
            <div class="d-flex-sb-c">
                <h2>${pokemon.name}</h2>
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
