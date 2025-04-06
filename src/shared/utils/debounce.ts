export function debounce(fn: () => void, delay = 200) {
  let timeoutId: number;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(), delay);
  };
}
