export function createSlider(
  min: number,
  max: number,
  currentValue: number,
  format: (value: number) => string,
): HTMLElement {
  const sliderContainer = document.createElement("div");
  sliderContainer.classList.add("slider-container");

  const rangeFrom = document.createElement("p");
  rangeFrom.classList.add("range-from");
  rangeFrom.textContent = `From ${format(min)}`;

  const rangeTo = document.createElement("p");
  rangeTo.classList.add("range-to");
  rangeTo.textContent = `To ${format(currentValue)}`;

  const rangeInput = document.createElement("input");
  rangeInput.type = "range";
  rangeInput.min = min.toString();
  rangeInput.max = max.toString();
  rangeInput.value = currentValue.toString();
  rangeInput.classList.add("slider");
  rangeInput.addEventListener("input", (e: Event) => {
    rangeTo.innerText = `To ${format((e.target as HTMLInputElement).valueAsNumber)}`;
  });

  sliderContainer.appendChild(rangeFrom);
  sliderContainer.appendChild(rangeInput);
  sliderContainer.appendChild(rangeTo);

  return sliderContainer;
}
