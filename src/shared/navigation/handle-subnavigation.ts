import { isWideScreen } from "../utils/is-wide-screen";

type SubnavigationAction = "show" | "hide" | "toggle";
type SubnavigationDirection = "up" | "down";

export function handleSubnavigation(): void {
  const trigger = document.querySelector(
    "#subnavigation-trigger",
  ) as HTMLElement;
  const panel = document.querySelector("#subnavigation") as HTMLElement;

  if (isWideScreen()) {
    trigger.addEventListener("mouseenter", (event) =>
      setSubnavigationState(event, "show", "down"),
    );

    trigger.addEventListener("mouseleave", (event) => {
      const movedIntoPanel =
        panel &&
        event.relatedTarget &&
        panel.contains(event.relatedTarget as Node);

      if (movedIntoPanel) {
        return;
      }
      setSubnavigationState(event, "hide", "down");
    });

    panel.addEventListener("mouseleave", (event) => {
      if (trigger.contains(event.relatedTarget as Node)) {
        return;
      }
      setSubnavigationState(event, "hide", "down");
    });
  } else {
    trigger.addEventListener("click", (event) =>
      setSubnavigationState(event, "toggle", "up"),
    );
  }
}

function setSubnavigationState(
  event: MouseEvent,
  action: SubnavigationAction,
  direction: SubnavigationDirection,
): void {
  event.stopPropagation();

  const trigger = document.querySelector(
    "#subnavigation-trigger",
  ) as HTMLElement;
  const panel = document.querySelector("#subnavigation") as HTMLElement;

  const {
    top: triggerTop,
    left: triggerLeft,
    width: triggerWidth,
  } = trigger.getBoundingClientRect();
  const { width: panelWidth, height: panelHeight } =
    panel.getBoundingClientRect();

  switch (action) {
    case "show":
      panel.showPopover();
      break;
    case "hide":
      panel.hidePopover();
      break;
    case "toggle":
    default:
      panel.togglePopover();
  }

  if (trigger && panel) {
    if (direction === "down") {
      const topOffset = 36;
      panel.style.top = triggerTop + topOffset + "px";
      panel.style.left = triggerLeft + "px";
    } else if (direction === "up") {
      const navHeight = 56;
      panel.style.top = window.innerHeight - panelHeight - navHeight + "px";
      panel.style.left = triggerLeft + (triggerWidth - panelWidth) / 2 + "px";
    }
  }
}
