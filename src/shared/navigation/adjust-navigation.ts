import { isWideScreen } from "../utils/is-wide-screen";

export function adjustNavigation() {
  const navButtons = document.querySelectorAll(
    ".navigation .link-btn.link-btn-nav",
  );

  if (isWideScreen()) {
    const homeParagraph = document.createElement("span");
    homeParagraph.innerText = "Home";
    navButtons[0].append(homeParagraph);
    const homeIcon = navButtons[0].querySelector("img");
    homeIcon?.setAttribute("src", "/icons/home_primary.svg");

    const contactParagraph = document.createElement("span");
    contactParagraph.innerText = "Contact";
    navButtons[1].append(contactParagraph);
    const contactIcon = navButtons[1].querySelector("img");
    contactIcon?.setAttribute("src", "/icons/contact_primary.svg");

    const mapParagraph = document.createElement("span");
    mapParagraph.innerText = "Map";
    navButtons[2].append(mapParagraph);
    const mapIcon = navButtons[2].querySelector("img");
    mapIcon?.setAttribute("src", "/icons/map_primary.svg");

    const propertiesParagraph = document.createElement("span");
    propertiesParagraph.innerText = "Properties";
    navButtons[3].append(propertiesParagraph);
    const propertiesIcon = navButtons[3].querySelector("img");
    propertiesIcon?.setAttribute("src", "/icons/properties_primary.svg");
  }
}
