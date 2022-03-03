//list of pokemon
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
  }
  ];

  //loops through list

  for (let i = 0; i < pokemonList.length; i++) {
     document.write(pokemonList[i].name + " height: "+ pokemonList[i].height + ", ");

  //checks height, if more than 2 it writes "...big!"

    if (pokemonList[i].height >2) {
      document.write(" - Wow that's big!");
   }
  };
