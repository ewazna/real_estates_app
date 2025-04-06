type SubnavigationAction = "show" | "hide" | "toggle";
type SubnavigationDirection = "up" | "down";

export function handleSubnavigation(): void {
  const trigger = document.querySelector(
    "#subnavigation-trigger",
  ) as HTMLElement;
  const panel = document.querySelector("#subnavigation") as HTMLElement;

  const wideScreenBreakpoint = window.matchMedia("(min-width: 768px)");

  const handleTriggerEnter = (event: MouseEvent) => {
    setSubnavigationState(event, "show", "down");
  };

  const handleTriggerLeave = (event: MouseEvent) => {
    const movedIntoPanel =
      panel &&
      event.relatedTarget &&
      panel.contains(event.relatedTarget as Node);

    if (movedIntoPanel) {
      return;
    }
    setSubnavigationState(event, "hide", "down");
  };

  const handleTriggerClick = (event: MouseEvent) => {
    setSubnavigationState(event, "toggle", "up");
  };

  const handlePanelLeave = (event: MouseEvent) => {
    if (trigger.contains(event.relatedTarget as Node)) {
      return;
    }
    setSubnavigationState(event, "hide", "down");
  };

  const togglePopoverPlacement = (matches: boolean) => {
    if (matches) {
      trigger.addEventListener("mouseenter", handleTriggerEnter);
      trigger.addEventListener("mouseleave", handleTriggerLeave);
      panel.addEventListener("mouseleave", handlePanelLeave);

      trigger.removeEventListener("click", handleTriggerClick);
    } else {
      trigger.addEventListener("click", handleTriggerClick);

      trigger.removeEventListener("mouseenter", handleTriggerEnter);
      trigger.removeEventListener("mouseleave", handleTriggerLeave);
      panel.removeEventListener("mouseleave", handlePanelLeave);
    }
  };

  togglePopoverPlacement(wideScreenBreakpoint.matches);

  wideScreenBreakpoint.onchange = (e) => {
    togglePopoverPlacement(e.matches);
  };
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

  const {
    top: triggerTop,
    left: triggerLeft,
    width: triggerWidth,
  } = trigger.getBoundingClientRect();
  const { width: panelWidth, height: panelHeight } =
    panel.getBoundingClientRect();

  if (trigger && panel) {
    if (direction === "down") {
      const topOffset = 36;
      panel.style.top = triggerTop + topOffset + "px";
      panel.style.left = triggerLeft + "px";
    } else if (direction === "up") {
      const navHeight = 56;
      panel.style.top = window.innerHeight - panelHeight - navHeight + "px";
      panel.style.left = triggerLeft + triggerWidth / 2 - panelWidth / 2 + "px";
    }
  }
}
