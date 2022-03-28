//wrapping the code in IIFE

let pokemonRepository = (function () {
let modalContainer = document.querySelector('#modal-container');
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
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
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    })

    .then(function (details) {

      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.types, pokemon.imageUrl);
      console.log("pokemon selected: " + pokemon.name + "is" + pokemon.height + "and with the abilities of" + pokemon.types);

    });
  }

  function showModal(details) {
    var $modalContainer = document.querySelector("#modal-container");
    $modalContainer.innerHTML = "";

    var modal = document.createElement("div");
    modal.classList.add("modal");

    var closeButton = document.createElement("button");
    closeButton.classList.add("modal-close");
    closeButton.innerText = "X";
    closeButton.addEventListener("click", hideModal);

    var titleContent = document.createElement("h1");
    titleContent.innerText = details.name;

    var content = document.createElement("p");
    content.innerText = "Height: " + details.height;

    var img = document.createElement("img");
    img.src = details.imageUrl;
    img.classList.add("pokemon-image");

    modal.appendChild(closeButton);
    modal.appendChild(titleContent);
    modal.appendChild(img);
    modal.appendChild(content);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add("is-visible");

    window.addEventListener("keydown", e => {
      var $modalContainer = document.querySelector("#modal-container");
      if (
        e.key === "Escape" &&
        $modalContainer.classList.contains("is-visible")
      ) {
        hideModal();
      }
    });

    $modalContainer.addEventListener("click", e => {
      var target = e.target;
      if (target === $modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    var $modalContainer = document.querySelector("#modal-container");
    $modalContainer.classList.remove("is-visible");
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal

  };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
