const pokemonContainer = document.querySelector(".pokemon-container");

var id = document.getElementById("cod");

function traerPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id.value.toLowerCase()}/`)
    .then((res) => res.json())
    .then((data) => {
      cargarPokemon(data);
    });
}

function cargarPokemon(pokemon) {
  const card = document.createElement("div");
  card.classList.add("img");

  const contenerdorImagen = document.createElement("div");
  contenerdorImagen.classList.add("contenedorImagen");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("relleno");

  const sprite = document.createElement("img");
  sprite.classList.add("tam-imagen");
  sprite.src = pokemon.sprites.other.dream_world.front_default;

  const nombre = document.createElement("div");
  nombre.classList.add("nombre");

  const name = document.createElement("p");
  name.textContent = `${pokemon.name}`.toUpperCase();
  nombre.appendChild(name);

  contenerdorImagen.appendChild(spriteContainer);
  contenerdorImagen.appendChild(sprite);
  card.appendChild(contenerdorImagen);

  let tipo = "";
  pokemon.types.forEach((element) => {
    tipo += `${element.type.name}, `;
  });
  tipo = tipo.substring(0, tipo.length - 2);

  let habilidades = "";
  pokemon.abilities.forEach((element) => {
    habilidades += `${element.ability.name}, `;
  });
  habilidades = habilidades.substring(0, habilidades.length - 2);

  let num = 1;
  pokemon.stats.forEach((element) => {
    cargarFilas(element.base_stat, num);
    num++;
  });

  cargarFilas(tipo, num);
  cargarFilas(habilidades, num + 1);

  if ($(".pokemon-container").find(".img").length > 0) {
    pokemonContainer.removeChild(pokemonContainer.firstElementChild);
    eliminarFilas();
  }
  card.appendChild(nombre);
  pokemonContainer.appendChild(card);
}

function cargarFilas(info, num) {
  const estadisticas = document.querySelector(`.info${num}`);
  const desStat = document.createElement("td");
  desStat.textContent = info;
  desStat.classList.add("descripcion");
  estadisticas.appendChild(desStat);
}

function eliminarFilas() {
  for (let index = 1; index < 9; index++) {
    const esta = document.querySelector(`.info${index}`);
    esta.removeChild(esta.firstElementChild);
  }
}
