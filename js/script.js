// IIFE
let pokemonRepository = (function () {
  let pokemonList = [{
  name: 'Bulbasaur',
  height: 0.7,
  weight: 6.9,
  type: ['grass', 'poison']
},

{
  name: 'Charmilion',
  height: 1.1,
  weight: 19,
  type: ['fire']
},

{
  name: 'Dratini',
  height: 1.8,
  weight: 3.3,
  type: ['dragpn']
},

{
  name: 'Rayquaza',
  height: 7,
  weight: 206.5,
  type: ['dragon']
},
];
// Public functions
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();
// Updated forEach loop
pokemonRepository.getAll().forEach(function(pokemon){
  document.write(pokemon.name + " height: "+ pokemon.height + ", ");
  document.write ("<br/>");
});
// Add object
console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Raichu' });
console.log(pokemonRepository.getAll());
