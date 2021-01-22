const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener("DOMContentLoaded", () => {
  fetchTrainers();
});

//Make fetch request to trainers
function fetchTrainers() {
  fetch("http://localhost:3000/trainers")
    .then((resp) => resp.json())
    .then((trainers) =>
      trainers.forEach((trainer) => {
        renderTrainer(trainer);
      })
    );
}

//Render a trainer
function renderTrainer(trainer) {
  let divCard = document.createElement("div");
  divCard.className = "card";
  divCard.setAttribute("data-id", trainer.id);
  let p = document.createElement("p");
  p.textContent = trainer.name;
  let button = document.createElement("button");
  button.setAttribute("data-trainer-id", trainer.id);
  button.textContent = "Add Pokemon";
  button.addEventListener("click", addPokemon);
  let ul = document.createElement("ul");
  trainer.pokemons.forEach((pokemon) => renderPokemon(pokemon, ul));
  divCard.append(p, button, ul);
  let main = document.querySelector("main");
  main.appendChild(divCard);
}

//render a pokemon
function renderPokemon(pokemon, ul) {
  let li = document.createElement("li");
  li.innerText = `${pokemon.nickname} (${pokemon.species})`;
  let button = document.createElement("button");
  button.className = "release";
  button.setAttribute("data-pokemon-id", pokemon.id);
  button.textContent = "Release";
  button.addEventListener("click", handleRelease);
  li.appendChild(button);
  ul.appendChild(li);
}

//creating a new pokemon
function addPokemon(event) {
  let ul = event.target.parentElement.querySelector("ul");
  if (ul.childNodes.length < 6) {
    fetch("http://localhost:3000/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        trainer_id: event.target.dataset.trainerId,
      }),
    })
      .then((resp) => resp.json())
      .then((pokemon) => renderPokemon(pokemon, ul))
      .catch((error) => console.log(error));
  } else {
    alert("Pokemon Full");
  }
}

//releasing a pokemon
function handleRelease(event) {
  fetch(`http://localhost:3000/pokemons/${event.target.dataset.pokemonId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(event.target.parentElement.remove());
}
