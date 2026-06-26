import { processData } from "./processData.js";
export async function getLocation(inputValue) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue}?key=6SLFWM87BKPAEXLZGMRRX8MJX`,
    );
    if (!response.ok) {
      throw new Error(`City not found: ${response.status}`);
    }
    const data = await response.json();

    const processed = processData(data);

    return processed

  } catch (error) {

    console.error(error);
  }

}
async function init() {
  const data = await getLocation("cairo");
  console.log(data);
}

init();


