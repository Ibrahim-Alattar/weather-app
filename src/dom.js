import { getLocation } from "./index.js";

const input = document.querySelector("input");
const btn = document.querySelector("button");
btn.addEventListener("click", async function () {
  const inputValue = input.value.toLocaleLowerCase();
  const data = await getLocation(inputValue);
});
