export function createChip(text: string): HTMLButtonElement {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.classList.add("btn", "chip", "filters-chip");
  chip.innerText = text;
  chip.addEventListener("click", () => {
    chip.classList.toggle("on");
  });
  return chip;
}
