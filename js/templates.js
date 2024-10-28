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
                <div class="d-flex-sb-c p-relative" id="arrowDiv">
                    <img id="arrowLeft${index}" class="arrow" onclick="previousPokemon(${index})" src="./assets/icons/chevron_left.svg" alt="previous pokemon">
                    <img id="pokemon${index}" class="image-pokemon-2 p-absolute" src="${pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
                    <img id="arrowRight${index}" class="arrow" onclick="nextPokemon(${index})" src="./assets/icons/chevron_right.svg" alt="next pokemon">
                </div>
            </header>
            <div class="pokemon-information d-flex-c-c">
                <div class="d-flex-c-c gap-16">
                    <img class="type-image" src="${type1}" alt="${mainType}"></img>
                    ${type2 ? /*html */`<img class="z-index type-image" src="${type2}" alt="${pokemon.types[1].type.name}"></img>` : ''}
                </div>
                <div class="d-flex-c-c sub-headline">
                    <a style="color: ${backgroundColor};" href="#" onclick="showSection(${index}, 'about')">
                        <h3 style="color: ${backgroundColor};">About</h3>
                    </a>
                    <a style="color: ${backgroundColor};" href="#" onclick="showSection(${index}, 'baseStats')">
                        <h3 style="color: ${backgroundColor};">Base Stats</h3>
                    </a>
                    <a style="color: ${backgroundColor};" href="#" onclick="showSection(${index}, 'evolutions')">
                        <h3 style="color: ${backgroundColor};">Evolutions</h3>
                    </a>
                </div>
                <div id="pokemonInfoSection">
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
                        </div>
                        <p id="pokemon-info">${pokemon.germanDescription || pokemon.englishDescription || 'Keine Beschreibung verfügbar.'}</p>
                    </section>
                </div>
            </div>
        </div>
    `;
}


function generateAboutSection(index) {
    let pokemon = allPokemon[index];
    return /*html*/`
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
            </div>
            <p id="pokemon-info">${pokemon.germanDescription || 'Keine Beschreibung verfügbar.'}</p>
        </section>
    `;
}


function generateBaseStatsSection(index) {
    let pokemon = allPokemon[index];
    let mainType = pokemon.types[0].type.name;
    let backgroundColor = typeColors[mainType] || '#f5f5f5';
    let hp = pokemon.stats[0].base_stat;
    let attack = pokemon.stats[1].base_stat;
    let defense = pokemon.stats[2].base_stat;
    let specialAttack = pokemon.stats[3].base_stat;
    let specialDefense = pokemon.stats[4].base_stat;
    let speed = pokemon.stats[5].base_stat;
    let maxStat = 255;
    return /*html*/`
        <section class="base-stats-container" id="baseStats">
            <div class="stat-row">
                <p>HP</p>
                <div class="progress-bar">
                    <div id="progressBarHp" class="progress-bar-fill" style="width: ${hp / maxStat * 100}%; background-color: ${backgroundColor};">
                        <span>${hp}</span>
                    </div>
                </div>
            </div>
            <div class="stat-row">
                <p>Attack</p>
                <div class="progress-bar">
                    <div id="progressBarAttack" class="progress-bar-fill" style="width: ${attack / maxStat * 100}%; background-color: ${backgroundColor};">
                        <span>${attack}</span>
                    </div>
                </div>
            </div>
            <div class="stat-row">
                <p>Defense</p>
                <div class="progress-bar">
                    <div id="progressBarDefense" class="progress-bar-fill" style="width: ${defense / maxStat * 100}%; background-color: ${backgroundColor};">
                        <span>${defense}</span>
                    </div>
                </div>
            </div>
            <div class="stat-row">
                <p>Special Attack</p>
                <div class="progress-bar">
                    <div id="progressBarSpecialAttack" class="progress-bar-fill" style="width: ${specialAttack / maxStat * 100}%; background-color: ${backgroundColor};">
                        <span>${specialAttack}</span>
                    </div>
                </div>
            </div>
            <div class="stat-row">
                <p>Special Defense</p>
                <div class="progress-bar">
                    <div id="progressBarSpecialDefense" class="progress-bar-fill" style="width: ${specialDefense / maxStat * 100}%; background-color: ${backgroundColor};">
                        <span>${specialDefense}</span>
                    </div>
                </div>
            </div>
            <div class="stat-row">
                <p>Speed</p>
                <div class="progress-bar">
                    <div id="progressBarSpeed" class="progress-bar-fill" style="width: ${speed / maxStat * 100}%; background-color: ${backgroundColor};">
                        <span>${speed}</span>
                    </div>
                </div>
            </div>
        </section>
    `;
}


function generateEvolutionsSection(evolutions) {
    let mainType = evolutions.base.types[0].type.name;
    let backgroundColor = typeColors[mainType] || '#f5f5f5';
    let baseHTML = `
        <div class="text-center">
            <h5>${evolutions.base.name.charAt(0).toUpperCase() + evolutions.base.name.slice(1)}</h5>
            <img class="image-pokemon-3" src="${evolutions.base.sprites.other.home.front_default}" alt="${evolutions.base.name}">
        </div>`;
    let firstHTML = evolutions.first ? `
        <svg class="icon-evolution" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="${backgroundColor}">
            <path d="m80-160 240-320L80-800h520q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H80Zm160-80h360l180-240-180-240H240l180 240-180 240Zm270-240Z"/>
        </svg>
        <div class="text-center">
            <h5>${evolutions.first.name.charAt(0).toUpperCase() + evolutions.first.name.slice(1)}</h5>
            <img class="image-pokemon-3" src="${evolutions.first.sprites.other.home.front_default}" alt="${evolutions.first.name}">
        </div>` : '';
    let secondHTML = evolutions.second ? `
        <svg class="icon-evolution" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="${backgroundColor}">
            <path d="m80-160 240-320L80-800h520q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H80Zm160-80h360l180-240-180-240H240l180 240-180 240Zm270-240Z"/>
        </svg>
        <div class="text-center">
            <h5>${evolutions.second.name.charAt(0).toUpperCase() + evolutions.second.name.slice(1)}</h5>
            <img class="image-pokemon-3" src="${evolutions.second.sprites.other.home.front_default}" alt="${evolutions.second.name}">
        </div>` : '';
    document.getElementById('evolutions').innerHTML = /*html*/`
        <section class="evolutions d-flex-c-c" id="evolutions">
            ${baseHTML}
            ${firstHTML}
            ${secondHTML}
        </section>
    `;
}


// function generateEvolutionsSection(evolutions) {
//     let mainType = pokemon.types[0].type.name;
//     let backgroundColor = typeColors[mainType] || '#f5f5f5';
    
//     if (baseEvolutionId && !firstEvolutionId && !secondEvolutionId) {
//         return /*html*/`
//             <section class="evolutions d-flex-c-c d-none" id="evolutions">
//                 <div class= "text-center">
//                     <h5>Das Pokemon kann sich nicht weiter entwickeln.</h5>
//                 </div>                
//             </section>
//         `;
//     }
    
//     return /*html*/`
//         <section class="evolutions d-flex-c-c d-none" id="evolutions">
//             <div class= "text-center">
//                 <h5>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
//                 <img class="image-pokemon-3" src="${baseEvolutionSprite}" alt="${pokemon.name}">
//             </div>
//             <svg class="icon-evolution" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="${backgroundColor}"><path d="m80-160 240-320L80-800h520q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H80Zm160-80h360l180-240-180-240H240l180 240-180 240Zm270-240Z"/></svg>                    
//             <div class= "text-center">
//                 <h5>${allPokemon[+firstEvolutionId].name.charAt(0).toUpperCase() + allPokemon[+firstEvolutionId].name.slice(1)}</h5>
//                 <img class="image-pokemon-3" src="${firstEvolutionSprite}" alt="${allPokemon[+firstEvolutionId].name}">
//             </div>
//             <svg class="icon-evolution" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="${backgroundColor}"><path d="m80-160 240-320L80-800h520q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H80Zm160-80h360l180-240-180-240H240l180 240-180 240Zm270-240Z"/></svg>
//             <div class="text-center">
//                 ${allPokemon[+secondEvolutionId] && allPokemon[+secondEvolutionId].name ?
//                     /*html*/`<h5>${allPokemon[+secondEvolutionId].name.charAt(0).toUpperCase() + allPokemon[+secondEvolutionId].name.slice(1)}</h5>
//                     <img class="image-pokemon-3" src="${secondEvolutionSprite}" alt="${allPokemon[+secondEvolutionId].name}">`
//                     : ''}
//             </div>
//         </section>
//     `;
// }