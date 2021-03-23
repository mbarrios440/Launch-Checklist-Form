window.addEventListener("load", function () {
  let form = document.getElementById("launchForm");

  async function getPlanet() {
    const response = await fetch(
      "https://handlers.education.launchcode.org/static/planets.json"
    );
    const planets = await response.json();
    const missionTarget = document.getElementById("missionTarget");
    let randomPlanet = Math.floor(Math.random() * planets.length);

    missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${planets[randomPlanet].name}</li>
               <li>Diameter: ${planets[randomPlanet].diameter}</li>
               <li>Star: ${planets[randomPlanet].star}</li>
               <li>Distance from Earth: ${planets[randomPlanet].distance}</li>
               <li>Number of Moons: ${planets[randomPlanet].moons}</li>
            </ol>
            <img src="${planets[randomPlanet].image}"></img>
      `;
  }
  getPlanet();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let pilot = document.querySelector("input[name=pilotName]");
    let copilot = document.querySelector("input[name=copilotName]");
    let fuel = document.querySelector("input[name=fuelLevel]");
    let cargokg = document.querySelector("input[name=cargoMass]");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let faultyItems = document.getElementById("faultyItems");
    let fuelStatus = document.getElementById("fuelStatus");
    let launchStatus = document.getElementById("launchStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    if (
      pilot.value === "" ||
      copilot.value === "" ||
      fuel.value === "" ||
      cargokg.value === ""
    ) {
      faultyItems.style.visibility = "";
      launchStatus.style.color = "";
      launchStatus.innerHTML = "Awaiting Information Before Launch";
      alert("All fields are required");
    }
    if (isNaN(fuel.value) || isNaN(cargokg.value)) {
      faultyItems.style.visibility = "";
      launchStatus.style.color = "";
      launchStatus.innerHTML = "Awaiting Information Before Launch";
      alert("Values for Fuel Level and Cargo Mass must be numeric");
    }

    pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`;

    if (
      pilot.value !== "" &&
      copilot.value !== "" &&
      fuel.value !== "" &&
      cargokg.value !== "" &&
      !isNaN(fuel.value) &&
      !isNaN(cargokg.value)
    ) {
      if (fuel.value < 10000) {
        faultyItems.style.visibility = "visible";
        fuelStatus.innerHTML = `There is not enough fuel for the journey`;
        launchStatus.style.color = `red`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
      }

      if (cargokg.value >= 10000) {
        faultyItems.style.visibility = "visible";
        cargoStatus.innerHTML = `There is too much mass to take off`;
        launchStatus.style.color = `red`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
      }

      if (fuel.value >= 10000) {
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
      }

      if (cargokg.value < 10000) {
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
      }

      if (fuel.value >= 10000 && cargokg.value < 10000) {
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = `Shuttle is ready for launch`;
        launchStatus.style.color = `green`;
      }
    }
  });
});
