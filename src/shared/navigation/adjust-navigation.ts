export function adjustNavigation() {
  const navButtons = document.querySelectorAll(
    ".navigation .link-btn.link-btn-nav",
  );

  const wideScreenBreakpoint = window.matchMedia("(min-width: 768px)");

  const toggleAdditionalText = (matches: boolean) => {
    if (matches) {
      const homeParagraph = document.createElement("span");
      homeParagraph.innerText = "Home";
      navButtons[0].append(homeParagraph);
      const homeIcon = navButtons[0].querySelector("img") as HTMLImageElement;
      homeIcon.setAttribute("src", "/icons/home_primary.svg");

      const contactParagraph = document.createElement("span");
      contactParagraph.innerText = "Contact";
      navButtons[1].append(contactParagraph);
      const contactIcon = navButtons[1].querySelector(
        "img",
      ) as HTMLImageElement;
      contactIcon.setAttribute("src", "/icons/contact_primary.svg");

      const propertiesParagraph = document.createElement("span");
      propertiesParagraph.innerText = "Properties";
      navButtons[2].append(propertiesParagraph);
      const propertiesIcon = navButtons[2].querySelector(
        "img",
      ) as HTMLImageElement;
      propertiesIcon.setAttribute("src", "/icons/properties_primary.svg");
    } else {
      const homeParagraph = navButtons[0].querySelector(
        "span",
      ) as HTMLSpanElement;

      const homeIcon = navButtons[0].querySelector("img") as HTMLImageElement;
      homeIcon.setAttribute("src", "/icons/home.svg");

      const contactParagraph = navButtons[1].querySelector(
        "span",
      ) as HTMLSpanElement;
      const contactIcon = navButtons[1].querySelector(
        "img",
      ) as HTMLImageElement;
      contactIcon.setAttribute("src", "/icons/contact.svg");

      const propertiesParagraph = navButtons[2].querySelector(
        "span",
      ) as HTMLSpanElement;
      const propertiesIcon = navButtons[2].querySelector(
        "img",
      ) as HTMLImageElement;
      propertiesIcon.setAttribute("src", "/icons/properties.svg");

      if (!homeParagraph && !contactParagraph && !propertiesParagraph) {
        return;
      }
      homeParagraph.remove();
      contactParagraph.remove();
      propertiesParagraph.remove();
    }
  };

  toggleAdditionalText(wideScreenBreakpoint.matches);

  wideScreenBreakpoint.onchange = (e) => {
    toggleAdditionalText(e.matches);
  };
}
