function generateLittlePokemonCardContainer(i) {
    let pokemon = allPokemon[i];
    return `
        <div class="pokemon-card-container">
            <div class="d-flex-sb-c">
                <h2>${pokemon.results.name}</h2>
                <p>#id</p>
            </div>
            <div class="d-flex-sb-c">
                <div>
                    <div>pokemon.types</div>
                    <div></div>
                </div>
                <img class="logo" src="../img/pokespot-paint.jpg" alt="${pokemon.name}">
            </div>
        </div>
    `;
}
// function (i,j) {
//         return `
    
//     `;
// }