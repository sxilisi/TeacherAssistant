const API_URL = "https://dragonball-api.com/api/characters"; //url dell'api

//funzione anonima una volta caricato tutti i dati nel dom
document.addEventListener("DOMContentLoaded", () => {
  //selezione elementi del dom
  const fetchButton = document.getElementById("fetchButton");
  const raceFilter = document.getElementById("raceFilter");
  const nameFilter = document.getElementById("nameFilter");
  const charactersList = document.getElementById("characters");
  let allCharacters = [];

  //funzione anonima asincrona per caricare la fetch tramite un bottone con l'evento click
  fetchButton.addEventListener("click", async () => {
    try {
      const response = await fetch(API_URL, { method: "GET" });
      if (!response.ok) {
        throw new Error("Errore nella richiesta dei dati");
      }
      const data = await response.json();
      console.log(data);
      allCharacters = data.items;
      displayCharacters(allCharacters);
      populateRaceSelect(allCharacters);
    } catch (error) {
      console.log(error);
    }
  });
  //funzione per visualizzare i personaggi e creazione dei vari li
  function displayCharacters(characters) {
    charactersList.innerHTML = ""; // cambiato da characters.innerHTML poiche dobbiamo smonatare cio che abbiamo nella nostra lista <ul></ul>.ps questo andava in confiltto con le funzioni per filtare le razze e cercare i personaggi tramite input
    characters.forEach((character) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <h2>${character.name}</h2>
        <img src=${character.image} alt=${character.name} class = "character-image" >
        <p><strong>Nome:</strong>${character.name}</p>
        <p><strong>Genere:</strong>${character.gender}</p>
        <p><strong>Razza:</strong>${character.race}</p>
        <p><strong>Ki:</strong>${character.ki}</p>
        <p><strong>MaxKi:</strong>${character.maxKi}</p>
        <p><strong>descrizione:</strong>${character.description}</p>
        `;
      charactersList.appendChild(listItem);
    });
  }
  //funzione per popolare la mia select
  function populateRaceSelect(characters) {
    const races = [...new Set(characters.map((character) => character.race))];
    races.forEach((race) => {
      const option = document.createElement("option");
      option.value = race;
      option.textContent = race;
      raceFilter.appendChild(option);
    });
  }
  /* //evento per filtrare le razze
  raceFilter.addEventListener("change", () => {
    const selectedRace = raceFilter.value;
    const filteredCharacters =
      selectedRace === "all"
        ? allCharacters
        : allCharacters.filter((character) => character.race === selectedRace);
    displayCharacters(filteredCharacters);
  });
  //funzione per filtrare i nomi
  function filterByName(characters, name) {
    return characters.filter((character) =>
      character.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  //evento per filtrare i personaggi per nome
  nameFilter.addEventListener("input", () => {
    const nameFilteredCharacters = filterByName(
      allCharacters,
      nameFilter.value
    );
    displayCharacters(nameFilteredCharacters);
  }); */
//unisco i due filtri in un unico filtro
  function filteredCharactersAndName() {
    //errore stava che sia il controllo del searchName che la funzione DisplayCharacters si trovavano dentro il controllo della razza
    const selectRace = raceFilter.value;
    const searchName = nameFilter.value.toLowerCase();
    let filteredCharacters = allCharacters;

    if (selectRace !== "all") {
      filteredCharacters = filteredCharacters.filter(
        (character) => character.race === selectRace
      );
    }
    if (searchName) {
      filteredCharacters = filteredCharacters.filter((character) =>
        character.name.toLowerCase().includes(searchName)
      );
    }

    displayCharacters(filteredCharacters);
  }

  raceFilter.addEventListener("change", filteredCharactersAndName);
  nameFilter.addEventListener("input", filteredCharactersAndName);
});
