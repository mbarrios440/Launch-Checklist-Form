window.addEventListener("load", function () {
  const form = document.getElementById("launchForm");

  async function getPlanet() {
    const response = await fetch(
      "https://handlers.education.launchcode.org/static/planets.json"
    );
    const planets = await response.json();
    const missionTarget = document.getElementById("missionTarget");
    const randomPlanet = Math.floor(Math.random() * planets.length);

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
    const pilot = document.querySelector("input[name=pilotName]");
    const copilot = document.querySelector("input[name=copilotName]");
    const fuel = document.querySelector("input[name=fuelLevel]");
    const cargokg = document.querySelector("input[name=cargoMass]");
    const pilotStatus = document.getElementById("pilotStatus");
    const copilotStatus = document.getElementById("copilotStatus");
    const faultyItems = document.getElementById("faultyItems");
    const fuelStatus = document.getElementById("fuelStatus");
    const launchStatus = document.getElementById("launchStatus");
    const cargoStatus = document.getElementById("cargoStatus");

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
      faultyItems.style.visibility = "visible";
      if (fuel.value >= 10000 && cargokg.value < 10000) {
        launchStatus.innerHTML = `Shuttle is ready for launch`;
        launchStatus.style.color = `green`;
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
      } else {
        launchStatus.style.color = `red`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        if (fuel.value < 10000) {
          fuelStatus.innerHTML = `There is not enough fuel for the journey`;
        } else {
          fuelStatus.innerHTML = `Fuel level high enough for launch`;
        }
        if (cargokg.value >= 10000) {
          cargoStatus.innerHTML = `There is too much mass to take off`;
        } else {
          cargoStatus.innerHTML = `Cargo mass low enough for launch`;
        }
      }
    } else {
      faultyItems.style.visibility = "";
      launchStatus.style.color = "";
      launchStatus.innerHTML = "Awaiting Information Before Launch";
      if (
        pilot.value === "" ||
        copilot.value === "" ||
        fuel.value === "" ||
        cargokg.value === ""
      ) {
        alert("All fields are required");
      }
      if (isNaN(fuel.value)) {
        alert("Invalid Entry. Fuel Level must be a number");
      }
      if (isNaN(cargokg.value)) {
        alert("Invalid Entry. Cargo Mass must be a number");
      }
    }
  });
});
