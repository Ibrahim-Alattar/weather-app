import { toCelsius } from "./convertTemp.js";
export function processData(data) {
  return {
    address: data.address,
    condition: data.currentConditions.conditions,
    tempF: data.currentConditions.temp,
    tempC: toCelsius(data.currentConditions.temp),
    humidity: data.currentConditions.humidity,
    windSpeed: data.currentConditions.windspeed,
    icon: data.currentConditions.icon,
    days: data.days.map(day => {
      return {
        datetime: day.datetime,
        conditions: day.conditions,
        tempminF: day.tempmin,
        tempminC: toCelsius(day.tempmin),
        tempmaxF: day.tempmax,
        tempmaxC: toCelsius(day.tempmax),
      }
    })
  };
}