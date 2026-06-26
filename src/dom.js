import "./style.css";
import { getLocation } from "./index.js";

const input = document.querySelector("input");
const search = document.querySelector(".search");
const switchBtn = document.querySelector(".switch");
const temp = document.getElementById("temp");
const loader = document.querySelector(".loading-box")
const overlay = document.querySelector(".overlay")

let isFahrenheit = true;
let weatherData = null;
let day = null;

function renderTemp() {
  if (!weatherData) return;

  if (isFahrenheit) {
    temp.textContent = weatherData.tempF;
    switchBtn.textContent = "Switch to °C";
  } else {
    temp.textContent = weatherData.tempC;
    switchBtn.textContent = "Switch to °F";
  }
}

async function displayData() {
  const module = await import(`../node_modules/@meteocons/svg/fill/${weatherData.icon}.svg`);
  const svg = module.default;

  document.querySelector(".icon").innerHTML = svg;
  document.getElementById("location").textContent = weatherData.address;
  document.getElementById("condition").textContent = weatherData.condition;
  document.getElementById("humidity").textContent = weatherData.humidity;
  document.getElementById("windSpeed").textContent = weatherData.windSpeed;

  renderTemp();
}

search.addEventListener("click", async function () {
  const inputValue = input.value.toLowerCase();
  loader.classList.add('active');
  overlay.classList.add('active');
  try {
    weatherData = await getLocation(inputValue);
    isFahrenheit = true;
    await displayData();
    await displayDays();
  } catch {
    alert("There's no city found")
  } finally {
    loader.classList.remove('active');
    overlay.classList.remove('active');
  }

});

switchBtn.addEventListener("click", function () {
  if (!weatherData) return;
  isFahrenheit = !isFahrenheit;
  renderTemp();
  displayDays();
});

async function initData() {
  loader.classList.add('active');
  overlay.classList.add('active');
  try {
    weatherData = await getLocation("cairo");
    isFahrenheit = true;
    await displayData();
    displayDays()
  } catch {
    alert("There's no city found")
  } finally {
    loader.classList.remove('active');
    overlay.classList.remove('active');
  }

}

initData();



function displayDays() {
  const slicedDays = weatherData.days.slice(0, 7)
  const daysContainer = document.querySelector(".days-container")
  daysContainer.innerHTML = slicedDays.map((day) => {
    return `
    <div class="day-card">
      <div class="date">${day.datetime}</div>
      <div class="day-condition">${day.conditions}</div>
      <div class="day-temps">
        <div>Max: <span> ${isFahrenheit ? day.tempmaxF : day.tempmaxC}</span></div>
        <div>Min: <span>${isFahrenheit ? day.tempminF : day.tempminC}</span></div>
      </div>
    </div>
    `
  }).join("")
}

