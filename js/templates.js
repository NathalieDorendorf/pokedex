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
        <div onclick="openOverlay(${i})" id="littlePokemonCard${i}" class="little-pokemon-card" style="background-color: ${backgroundColor};">
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


function generateBigPokemonCardContainer(i) {
    return `
        <div class="big-pokemon-card">
            <div class="d-flex-sb-c section-pad">
                <img id="arrowBack" class="arrow-back" onclick="closeOverlay(${i})" src="./assets/icons/arrow_back.png" alt="back">
                <h2>Pokemon Name</h2>
                <p># ID</p>
            </div>
            <div>
                <img id="arrowLeft" class="arrow" onclick="previousPokemon${i}" src="./assets/icons/chevron_left.png" alt="previous pokemon">
                <img id="pokemon${i}" class="logo" src="./assets/img/pokeball.png" alt="Pokemon Name">
                <img id="arrowRight" class="arrow" onclick="nextPokemon${i}" src="./assets/icons/chevron_right.png" alt="next pokemon">
            </div>
            <div class="pokemon-information">
                <div>
                    <div>type</div>
                </div>
                <h3>About</h3>
                <div class="d-flex-c-c">
                    <div>
                        <div class="d-flex-c-c">
                            <img id="weight" class="icon" src="" alt="weight">
                            <p>kg</p>
                        </div>
                        <p>Weight</p>
                    </div>
                    <div class="line"></div>
                    <div>
                        <div class="d-flex-c-c">
                            <img id="height" class="icon" src="" alt="height">
                            <p>m</p>
                        </div>
                        <p>Height</p>
                    </div>
                    <div class="line"></div>
                    <div></div>
                </div>
                <p>lorem ipsum</p>
                <div class="d-flex-c-c">
                    <h3>Base Stats</h3>
                    <h3>Evolution</h3>
                </div>
                <div>
                    <h4>HP</h4>
                    <h4>ATK</h4>
                    <h4>DEF</h4>
                    <h4>SATK</h4>
                    <h4>SDEF</h4>
                    <h4>SPD</h4>
            </div>
        </div>
    `;
}
