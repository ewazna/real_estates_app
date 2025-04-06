export function resolveQueryParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function updateQueryParam(name: string, value: string) {
  const newUrl = new URL(window.location.href);
  if (value) {
    newUrl.searchParams.set(name, value);
  } else {
    newUrl.searchParams.delete(name);
  }
  window.history.replaceState(null, "", newUrl.toString());
}
