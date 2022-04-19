//default display pokemon method
//will check which option is selected then displays the pokemon or list of pokemon
function fetchPokemon(){
        //let term = localStorage.getItem("key");
        //if(term==null){
            let term = document.querySelector("#searchterm").value;
       // }
        displayTerm = term;
        //checks if pokemon is selected
    if(document.querySelector("#choice").value == "Pokemon"){
    const promises = [];
        let url = `https://pokeapi.co/api/v2/pokemon/${term}`;
        promises.push(fetch(url).then((res) => res.json()));
         Promise.all(promises).then((results) => {
         let pokemon = results.map((result) => ({
             name: result.name,
             image: result.sprites['front_default'],
             type: result.types.map((type) => type.type.name).join(', '),
             abilities: result.abilities.map((ability) => ability.ability.name).join(', '),
             id: result.id
         }));
         displayPokemon(pokemon);
     });
        
    }
    //checks if type option is selected
    else if(document.querySelector("#choice").value == "Type"){
        const promises = [];
            const url = `https://pokeapi.co/api/v2/type/${term}`;
            promises.push(fetch(url).then((res) => res.json()));
        Promise.all(promises).then((results) => {
            const pokemon = results.map((result) => ({
                name: result.name,
                pokemon: result.pokemon.map((pokemon) => pokemon.pokemon.name).join(', <br>'),
                id: result.id
            }));
            displayTypePokemon(pokemon);
        })
    }
    //checks if the abilities option is selected
    else if(document.querySelector("#choice").value == "Abilities"){
        const promises = [];
            const url = `https://pokeapi.co/api/v2/ability/${term}`;
            promises.push(fetch(url).then((res) => res.json()));
        Promise.all(promises).then((results) => {
            const pokemon = results.map((result) => ({
                name: result.name,
                pokemon: result.pokemon.map((pokemon) => pokemon.pokemon.name).join(', <br>'),
                id: result.id
            }));
            displayAbilityPokemon(pokemon);
        })
    }
    //localStorage.setItem("key", document.querySelector("#searchterm").value);
};
//displays a random pokemon
function fetchRandomPokemon(){
    let random = Math.floor(Math.random()*898);
    const promises = [];
    let url = `https://pokeapi.co/api/v2/pokemon/${random}`;
   promises.push(fetch(url).then((res) => res.json()));
    Promise.all(promises).then((results) => {
    let pokemon = results.map((result) => ({
        name: result.name,
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name).join(', '),
        abilities: result.abilities.map((ability) => ability.ability.name).join(', '),
        id: result.id
    }));
    displayPokemon(pokemon);
    });
};
//displays a pokemon with their id, typing, and abilities
function displayPokemon(pokemon) {
    const pokemonString = pokemon.map((pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-name">${pokeman.id}: ${pokeman.name}</h2>
            <p class="card-typing">Type: ${pokeman.type}</p>
            <p class="card-ability">Abilities: ${pokeman.abilities}</p>
        </li>`).join('');
    content.innerHTML = pokemonString;
};
//displays pokemon based on type
function displayTypePokemon(pokemon) {
    const pokemonString = pokemon.map((pokeman) => `
        <li class="card">
            <h2 class="card-name">${pokeman.id}: ${pokeman.name}</h2>
            <p class="card-Pokemon">${pokeman.pokemon}</p>
        </li>`).join('');
    content.innerHTML = pokemonString;
};
//displays pokemon with a specific ability
function displayAbilityPokemon(pokemon) {
    const pokemonString = pokemon.map((pokeman) => `
        <li class="card">
            <h2 class="card-name">${pokeman.id}: ${pokeman.name}</h2>
            <p class="card-Pokemon">${pokeman.pokemon}</p>
        </li>`).join('');
    content.innerHTML = pokemonString;
};
//commented out local storage, not sure why it wouldn't work
//localStorage.setItem("key", document.querySelector("#searchterm"));
//checks which button is clicked then calls the appropriate function
window.onload = (e) => {document.querySelector("#search").onclick = fetchPokemon, document.querySelector("#random").onclick = fetchRandomPokemon};

