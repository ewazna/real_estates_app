export function createSubsection(
  title: string,
  content: HTMLElement,
): HTMLElement {
  const subsection = document.createElement("div");
  subsection.classList.add("subsection");

  const subsectionHeader = document.createElement("div");
  subsectionHeader.classList.add("subsection-header");

  const subsectionTitle = document.createElement("h3");
  subsectionTitle.classList.add("subsection-title");
  subsectionTitle.textContent = title;

  const subsectionToggle = document.createElement("button");
  subsectionToggle.type = "button";
  subsectionToggle.classList.add("btn", "btn-icon", "subsection-toggle");
  subsectionToggle.addEventListener("click", () => {
    subsectionToggle.classList.toggle("open");
    subsectionContent.classList.toggle("open");
  });

  const subsectionToggleImge = document.createElement("img");
  subsectionToggleImge.src = "/icons/arrow_up.svg";

  const subsectionContent = document.createElement("div");
  subsectionContent.classList.add("subsection-content");
  subsectionContent.appendChild(content);

  subsectionToggle.appendChild(subsectionToggleImge);
  subsectionHeader.appendChild(subsectionTitle);
  subsectionHeader.appendChild(subsectionToggle);
  subsection.appendChild(subsectionHeader);
  subsection.appendChild(subsectionContent);

  return subsection;
}
