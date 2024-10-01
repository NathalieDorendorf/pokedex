function generateLoadingSpinner() {
    return /*html*/`
        <div class="pokeball-container">
            <div class="pokeball"></div>
        </div>
    `;
}


function generateLittlePokemonCardContainer(pokemon) {
    let mainType = pokemon.types[0].type.name;
    let backgroundColor = typeColors[mainType] || '#f5f5f5';
    let type1 = typeImages[mainType];
    let type2 = pokemon.types[1] ? typeImages[pokemon.types[1].type.name] : null;
    return /*html*/`
        <div onclick="openOverlay(${pokemon.id - 1})" id="littlePokemonCard${pokemon.id}" class="little-pokemon-card" style="background-color: ${backgroundColor};">
            <img class="bg-pokeball" src="./assets/icons/pokedex.svg" alt="">
            <div class="d-flex-sb-c">
                <h2 class="z-index">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <p>#${pokemon.id}</p>
            </div>
            <div class="d-flex-sb-c">
                <div>
                    <img class="z-index type-image" src="${type1}" alt="${mainType}"></img>
                    ${type2 ? /*html */`<img class="z-index type-image" src="${type2}" alt="${pokemon.types[1].type.name}"></img>` : ''}
                </div>
                <img class="image-pokemon z-index" src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">  
            </div>
        </div>
    `;
}


function generateBigPokemonCardContainer(index) {
    let pokemon = allPokemon[index];
    let mainType = pokemon.types[0].type.name;
    let backgroundColor = typeColors[mainType] || '#f5f5f5';
    let type1 = typeImages[mainType];
    let type2 = pokemon.types[1] && typeImages[pokemon.types[1].type.name] || '';
    return /*html*/`
        <div class="big-pokemon-card" style="background-color: ${backgroundColor};">
            <header class="section-pad">
                <img class="bg-pokeball-2" src="./assets/icons/pokedex.svg" alt="">
                <div class="d-flex-sb-c padding-16">
                    <img id="arrowBack" class="arrow-back" onclick="closeOverlay(${index})" src="./assets/icons/back-to-home.svg" alt="back">
                    <h2 class="c-white ft-size-32">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                    <p class="c-white ft-size-24">#${pokemon.id}</p>
                </div>
                <div class="d-flex-sb-c p-relative">
                    <img id="arrowLeft" class="" onclick="previousPokemon(${index})" src="./assets/icons/chevron_left.svg" alt="previous pokemon">
                    <img id="pokemon${index}" class="image-pokemon-2 p-absolute" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                    <img id="arrowRight" class="" onclick="nextPokemon(${index})" src="./assets/icons/chevron_right.svg" alt="next pokemon">
                </div>
            </header>
            <main class="pokemon-information d-flex-se-c">
                <div>
                    <img class="type-image" src="${type1}"></img>
                    <img class="type-image" src="${type2}"></img>
                </div>
                <h3 style="color: ${backgroundColor};">About</h3>
                <div class="d-flex-c-c gap-16">
                    <div>
                        <div class="d-flex-c-c">
                            <img id="weight" class="icon" src="./assets/icons/weight.svg" alt="weight">
                            <p>${pokemon.weight / 10} kg</p>
                        </div>
                        <p>Weight</p>
                    </div>
                    <div class="line"></div>
                    <div>
                        <div class="d-flex-c-c">
                            <img id="height" class="icon" src="./assets/icons/height.svg" alt="height">
                            <p>${pokemon.height / 10} m</p>
                        </div>
                        <p>Height</p>
                    </div>
                    <div class="line"></div>
                    <div></div>
                </div>
                <p id="pokemon-info">lorem ipsum</p>
                <div class="d-flex-c-c">
                    <h3 style="color: ${backgroundColor};">Base Stats</h3>
                    <h3 style="color: ${backgroundColor};">Evolution</h3>
                </div>
                <div class="base-stats-container">
                    <div>
                        <h4 style="color: ${backgroundColor};">HP</h4>
                        <p>${pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                    </div>
                    <div>
                        <h4 style="color: ${backgroundColor};">Attack</h4>
                        <p>${pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                    </div>
                    <div>
                        <h4 style="color: ${backgroundColor};">Defense</h4>
                        <p>${pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                    </div>
                    <div>
                        <h4 style="color: ${backgroundColor};">Special Attack</h4>
                        <p>${pokemon.stats.find(stat => stat.stat.name === 'special-attack').base_stat}</p>
                    </div>
                    <div>
                        <h4 style="color: ${backgroundColor};">Special Defense</h4>                    
                        <p>${pokemon.stats.find(stat => stat.stat.name === 'special-defense').base_stat}</p>
                    </div>
                    <div>
                        <h4 style="color: ${backgroundColor};">Speed</h4>
                        <p>${pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
                    </div>
                </div>
            </main>
        </div>
    `;
}
