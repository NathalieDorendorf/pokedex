// async function fetchAllPokemonData() {
//     try {
//         let response = await fetch(`${BASE_URL}?limit=100000&offset=0`);
//         let responseAsJson = await response.json();
//         let allPokemonData = responseAsJson.results;
//         let promises = allPokemonData.map(pokemon => fetchSinglePokemonData(pokemon.url));
//         let allPokemonDetails = await Promise.all(promises);
//         allPokemon = [...allPokemon, ...allPokemonDetails];
//         renderLittlePokemonCard(0, displayedPokemonCount);
//     } catch (error) {
//         console.error('Pokemon konnten nicht geladen werden', error);
//     }
// }


async function fetchAllPokemonData() {
    try {
        let response = await fetch(`${BASE_URL}?limit=100000&offset=0`);
        let responseAsJson = await response.json();
        let allPokemonData = responseAsJson.results;
        const batchSize = 50;
        for (let i = 0; i < allPokemonData.length; i += batchSize) {
            const batch = allPokemonData.slice(i, i + batchSize);
            let promises = batch.map(pokemon => fetchSinglePokemonData(pokemon.url));
            let allPokemonDetails = await Promise.all(promises);
            allPokemon = [...allPokemon, ...allPokemonDetails.filter(Boolean)];
            renderLittlePokemonCard(0, displayedPokemonCount);
        }
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
        return null;
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


async function fetchEvolutionChain(pokemonId) {
    try {
        let response = await fetch(`${SINGLE_POKEMON_URL}/${pokemonId + 1}/`);
        let responseAsJson = await response.json();
        let evolutionResponse = await fetch(responseAsJson.evolution_chain.url);
        let evolutionData = await evolutionResponse.json();
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
        generateEvolutionsSection(evolutions);
    } catch (error) {
        console.error('Evolution Chain konnte nicht geladen werden', error);
    }
}
