export function indicateNavigationButton() {
  const navButtons = document.querySelectorAll(
    ".navigation .link-btn.link-btn-nav",
  );
  const path = window.location.pathname;
  if (path.startsWith("/home")) {
    navButtons[0].classList.toggle("selected");
  } else if (path.startsWith("/contact")) {
    navButtons[1].classList.toggle("selected");
  } else if (path.startsWith("/realestates")) {
    navButtons[2].classList.toggle("selected");
  }
}
