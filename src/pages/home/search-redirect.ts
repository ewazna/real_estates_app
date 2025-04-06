export function installSearchRedirect(): void {
  const search = document.querySelector(
    "input#home-search",
  ) as HTMLInputElement;
  search.addEventListener("change", () => {
    const value = search.value;

    const newUrl = new URL(window.location.href);
    newUrl.pathname = "/realestates/";
    newUrl.search = `search=${value}`;

    window.location.href = newUrl.toString();
  });
}
