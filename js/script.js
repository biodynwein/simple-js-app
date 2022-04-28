var pokemonRepository = (function() {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var modalContainer = document.querySelector('#modal-container');

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    var pokelist = document.querySelector('.pokemon-list');
    var listItem = document.createElement('li');
    var button = document.createElement('button');

    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-secondary', 'btn-block');
    button.setAttribute('data-bs-target', '#pokedexModal')
    button.setAttribute('data-bs-toggle', 'modal');


    pokelist.appendChild(listItem);
    listItem.appendChild(button);

    button.addEventListener('click', function(){
      showDetails(pokemon);
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function(){
      showModal(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item){
    var url = item.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map(function(pokemon) {
        return pokemon.type.name;
      });
    }).catch(function(e){
      console.error(e);
    });
  }

  function showModal(text) {
    let modalTitle = document.querySelector('.modal-title')
    modalTitle.innerText = "";

    let modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = ""

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', text.imageUrl);

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + text.height;

    let typesElement = document.createElement('p');
    typesElement.innerText = 'Types: ' + text.types;

    modalTitle.innerText = text.name
    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typesElement);
  }

return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  showDetails: showDetails,
  loadList: loadList,
  loadDetails: loadDetails,
  showModal: showModal,
};
})()

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
