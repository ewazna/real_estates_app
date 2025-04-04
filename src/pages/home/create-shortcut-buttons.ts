import { isWideScreen } from "../../shared/utils/is-wide-screen";

export function createShortcutButtons(): void {
  const buttonsContainer = document.querySelector(".link-container");

  if (isWideScreen()) {
    const rentButton = document.createElement("a");
    rentButton.classList.add("link-btn", "link-btn-green");
    rentButton.setAttribute("href", "/realestates/");

    const rentIcon = document.createElement("img");
    rentIcon.setAttribute("src", "/icons/rent.svg");
    rentIcon.classList.add("icon-32", "icon-rent");

    const rentText = document.createElement("span");
    rentText.innerText = " For rent";

    rentButton.append(rentIcon, rentText);

    const buyButton = document.createElement("a");
    buyButton.classList.add("link-btn", "link-btn-secondary");
    buyButton.setAttribute("href", "/realestates/");

    const buyIcon = document.createElement("img");
    buyIcon.setAttribute("src", "/icons/buy.svg");
    buyIcon.classList.add("icon-32");

    const buyText = document.createElement("span");
    buyText.innerText = " For buy";

    buyButton.append(buyIcon, buyText);

    buttonsContainer?.append(rentButton, buyButton);
  }
}
