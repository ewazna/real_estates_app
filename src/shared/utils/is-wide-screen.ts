export function isWideScreen(): boolean {
  return window.matchMedia("(min-width: 768px)").matches;
}
