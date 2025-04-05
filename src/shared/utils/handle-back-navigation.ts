export function handleBackNavigation() {
  const backButton = document.querySelector(".link-btn.link-btn-back");
  backButton?.addEventListener("click", () => {
    window.history.go(-1);
  });
}
