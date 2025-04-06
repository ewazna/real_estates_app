export function createShortcutButtons(): void {
  const buttonsContainer = document.querySelector(
    ".link-container",
  ) as HTMLDivElement;

  const wideScreenBreakpoint = window.matchMedia("(min-width: 768px)");

  const toggleButtons = (matches: boolean) => {
    if (matches) {
      const rentButton = document.createElement("a");
      rentButton.classList.add("link-btn", "link-btn-green");
      rentButton.setAttribute("href", "/realestates/?usage=rent");

      const rentIcon = document.createElement("img");
      rentIcon.setAttribute("src", "/icons/rent.svg");
      rentIcon.classList.add("icon-32", "icon-rent");

      const rentText = document.createElement("span");
      rentText.innerText = " For rent";

      rentButton.append(rentIcon, rentText);

      const buyButton = document.createElement("a");
      buyButton.classList.add("link-btn", "link-btn-secondary");
      buyButton.setAttribute("href", "/realestates/?usage=buy");

      const buyIcon = document.createElement("img");
      buyIcon.setAttribute("src", "/icons/buy.svg");
      buyIcon.classList.add("icon-32");

      const buyText = document.createElement("span");
      buyText.innerText = " For buy";

      buyButton.append(buyIcon, buyText);

      buttonsContainer?.append(rentButton, buyButton);
    } else {
      const rentButton =
        buttonsContainer.firstElementChild as HTMLAnchorElement;
      const buyButton = buttonsContainer.lastElementChild as HTMLAnchorElement;
      if (!rentButton && !buyButton) {
        return;
      }
      rentButton.remove();
      buyButton.remove();
    }
  };

  toggleButtons(wideScreenBreakpoint.matches);

  wideScreenBreakpoint.onchange = (e) => {
    toggleButtons(e.matches);
  };
}
