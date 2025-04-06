export interface LoadeRef {
  showLoader: () => void;
  hideLoader: () => void;
}

export function createLoader(container: HTMLElement): LoadeRef {
  const loader = document.createElement("div");
  loader.classList.add("loader");
  container.appendChild(loader);

  return {
    showLoader: () => loader.classList.add("visible"),
    hideLoader: () => loader.classList.remove("visible"),
  };
}
