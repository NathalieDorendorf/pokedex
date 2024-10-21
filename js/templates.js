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
    let type2 = pokemon.types[1] ? typeImages[pokemon.types[1].type.name] : null;
    return /*html*/`
        <div class="big-pokemon-card" style="background-color: ${backgroundColor};">
            <header class="header-overlay">
                <img class="bg-pokeball-2" src="./assets/icons/pokedex.svg" alt="">
                <div class="d-flex-sb-c padding-16">
                    <img id="arrowBack" class="arrow-back" onclick="closeOverlay(${index})" src="./assets/icons/back-to-home.svg" alt="back">
                    <h2 class="c-white ft-size-h2">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                    <p class="c-white ft-size-p">#${pokemon.id}</p>
                </div>
                <div class="d-flex-sb-c p-relative">
                    <img id="arrowLeft" class="arrow" onclick="previousPokemon(${index})" src="./assets/icons/chevron_left.svg" alt="previous pokemon">
                    <img id="pokemon${index}" class="image-pokemon-2 p-absolute" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                    <img id="arrowRight" class="arrow" onclick="nextPokemon(${index})" src="./assets/icons/chevron_right.svg" alt="next pokemon">
                </div>
            </header>
            <div class="pokemon-information d-flex-c-c gap-16">
                <div class="d-flex-c-c gap-16">
                    <img class="type-image" src="${type1}" alt="${mainType}"></img>
                    ${type2 ? /*html */`<img class="z-index type-image" src="${type2}" alt="${pokemon.types[1].type.name}"></img>` : ''}
                </div>
                <div class="d-flex-c-c sub-headline">
                    <a style="color: ${backgroundColor};" href="#" onclick="toggleSection('about')"><h3 style="color: ${backgroundColor};">About</h3></a>
                    <a style="color: ${backgroundColor};" href="#" onclick="toggleSection('baseStats')"><h3 style="color: ${backgroundColor};">Base Stats</h3></a>
                    <a style="color: ${backgroundColor};" href="#" onclick="toggleSection('evolutions')"><h3 style="color: ${backgroundColor};">Evolutions</h3></a>
                </div>
                <section class="about" id="about">
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
                        <!-- <div class="line"></div> -->
                        <!-- <div id="moves">${pokemon.moves.map(move => move.move.name).join(', ')}</div> -->
                    </div>
                    <p id="pokemon-info">${pokemon.germanDescription || 'Keine Beschreibung verfügbar.'}</p>
                </section>
                <section class="base-stats-container d-none" id="baseStats">
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
                </section>
                <section class="evolutions d-flex-c-c d-none" id="evolutions">
                    <div class= "text-center">
                        <h5>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
                        <img class="image-pokemon-3" src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
                    </div>
                    <svg class="icon-evolution" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="${backgroundColor}"><path d="m80-160 240-320L80-800h520q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H80Zm160-80h360l180-240-180-240H240l180 240-180 240Zm270-240Z"/></svg>                    <div class= "text-center">
                        <h5>${allPokemon[index + 1].name.charAt(0).toUpperCase() + allPokemon[index + 1].name.slice(1)}</h5>
                        <img class="image-pokemon-3" src="${allPokemon[index + 1].sprites.other.home.front_default}" alt="${allPokemon[index + 1].name}">
                    </div>
                    <svg class="icon-evolution" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="${backgroundColor}"><path d="m80-160 240-320L80-800h520q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H80Zm160-80h360l180-240-180-240H240l180 240-180 240Zm270-240Z"/></svg>
                    <div class= "text-center">
                        ${allPokemon[index + 2].name.charAt(0).toUpperCase() + allPokemon[index + 2].name.slice(1) ? /*html */`<h5>${allPokemon[index + 2].name.charAt(0).toUpperCase() + allPokemon[index + 2].name.slice(1)}</h5>
                            <img class="image-pokemon-3" src="${allPokemon[index + 2].sprites.other.home.front_default}" alt="${allPokemon[index + 2].name}">` : ''}
                    </div>
                </section>
            </div>
        </div>
    `;
}
