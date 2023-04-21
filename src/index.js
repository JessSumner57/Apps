function getAverageEmissions(countryCode) {
  let url = `https://api.v2.emissions-api.org/api/v2/carbon_footprints/average.json?country=${countryCode}&scope=electricity&measure=kwh`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.carbon_g_per_kwh)
    .catch((error) => {
      console.error(error);
    });
}

function calculateCarbonEmissions(distance, modeOfTransport) {
  let countryCode = "US"; // replace with the appropriate country code based on user input
  let averageEmissionsPromise = getAverageEmissions(countryCode);

  averageEmissionsPromise.then((averageEmissions) => {
    let carbonEmissions = distance * modeOfTransport * averageEmissions;
    let emissionsElement = document.querySelector("#emissions");
    emissionsElement.innerText = carbonEmissions;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector("#transport-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let distanceElement = document.querySelector("#distance");
    let modeOfTransportElement = document.querySelector("#mode-of-transport");
    let distance = distanceElement.value;
    let modeOfTransport = modeOfTransportElement.value;
    calculateCarbonEmissions(distance, modeOfTransport);
  });
});
